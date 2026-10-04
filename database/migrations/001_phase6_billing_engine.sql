-- =============================================================
-- Smart Cart AI — Migration 001: Phase 6 Cart & Billing Engine
-- Platform  : Supabase (PostgreSQL 15+)
-- Description: Adds automated triggers, PL/pgSQL billing engine functions,
--              atomic checkout processing, and cart RPC helpers.
-- =============================================================

-- -------------------------------------------------------------
-- 1. Sync cart_items.unit_price and expected_weight from products
--    Enforces that product price and weight come authoritatively
--    from the products table and prevents client price manipulation.
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_cart_item_price_and_weight()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_price NUMERIC(10, 2);
    v_weight NUMERIC(10, 3);
    v_is_active BOOLEAN;
BEGIN
    SELECT price, expected_weight, is_active
    INTO v_price, v_weight, v_is_active
    FROM public.products
    WHERE id = NEW.product_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Product with ID % does not exist', NEW.product_id;
    END IF;

    IF NOT v_is_active THEN
        RAISE EXCEPTION 'Product with ID % is inactive and cannot be added to cart', NEW.product_id;
    END IF;

    IF NEW.quantity <= 0 THEN
        RAISE EXCEPTION 'Cart item quantity must be greater than zero';
    END IF;

    -- Authoritative price and weight from products table
    NEW.unit_price := v_price;
    NEW.expected_weight := v_weight;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_cart_item_price_and_weight ON cart_items;
CREATE TRIGGER trg_sync_cart_item_price_and_weight
    BEFORE INSERT OR UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION sync_cart_item_price_and_weight();

-- -------------------------------------------------------------
-- 2. Recalculate cart subtotal, carry_bag_charge, and total
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_cart_totals(p_cart_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_subtotal NUMERIC(10, 2) := 0.00;
    v_bag_option_id UUID;
    v_bag_qty INTEGER := 0;
    v_bag_price NUMERIC(6, 2) := 0.00;
    v_bag_charge NUMERIC(10, 2) := 0.00;
    v_total NUMERIC(10, 2) := 0.00;
BEGIN
    -- Compute item subtotal
    SELECT COALESCE(SUM(quantity * unit_price), 0.00)
    INTO v_subtotal
    FROM public.cart_items
    WHERE cart_id = p_cart_id;

    -- Get carry bag config from cart
    SELECT carry_bag_option_id, COALESCE(carry_bag_quantity, 0)
    INTO v_bag_option_id, v_bag_qty
    FROM public.carts
    WHERE id = p_cart_id;

    -- Compute carry bag charge
    IF v_bag_option_id IS NOT NULL AND v_bag_qty > 0 THEN
        SELECT COALESCE(price, 0.00)
        INTO v_bag_price
        FROM public.carry_bag_options
        WHERE id = v_bag_option_id AND is_active = TRUE;

        v_bag_charge := v_bag_price * v_bag_qty;
    ELSE
        v_bag_charge := 0.00;
    END IF;

    -- Compute total
    v_total := v_subtotal + v_bag_charge;

    -- Update carts table
    UPDATE public.carts
    SET subtotal = v_subtotal,
        carry_bag_charge = v_bag_charge,
        total = v_total,
        updated_at = NOW()
    WHERE id = p_cart_id;
END;
$$;

-- Trigger on cart_items changes (INSERT / UPDATE / DELETE)
CREATE OR REPLACE FUNCTION trg_cart_items_recalculate_cart()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        PERFORM update_cart_totals(OLD.cart_id);
        RETURN OLD;
    ELSE
        PERFORM update_cart_totals(NEW.cart_id);
        IF (TG_OP = 'UPDATE' AND OLD.cart_id <> NEW.cart_id) THEN
            PERFORM update_cart_totals(OLD.cart_id);
        END IF;
        RETURN NEW;
    END IF;
END;
$$;

DROP TRIGGER IF EXISTS trg_cart_items_recalculate_cart ON cart_items;
CREATE TRIGGER trg_cart_items_recalculate_cart
    AFTER INSERT OR UPDATE OR DELETE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION trg_cart_items_recalculate_cart();

-- Trigger on carts carry bag updates
CREATE OR REPLACE FUNCTION trg_carts_validate_and_calc_totals()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_bag_price NUMERIC(6, 2) := 0.00;
BEGIN
    -- Validate non-negative bag quantity
    IF NEW.carry_bag_quantity < 0 THEN
        RAISE EXCEPTION 'Carry bag quantity cannot be negative';
    END IF;

    -- Compute carry bag charge
    IF NEW.carry_bag_option_id IS NOT NULL AND NEW.carry_bag_quantity > 0 THEN
        SELECT COALESCE(price, 0.00)
        INTO v_bag_price
        FROM public.carry_bag_options
        WHERE id = NEW.carry_bag_option_id AND is_active = TRUE;

        NEW.carry_bag_charge := v_bag_price * NEW.carry_bag_quantity;
    ELSE
        NEW.carry_bag_charge := 0.00;
    END IF;

    -- Recompute subtotal from cart_items
    SELECT COALESCE(SUM(quantity * unit_price), 0.00)
    INTO NEW.subtotal
    FROM public.cart_items
    WHERE cart_id = NEW.id;

    -- Set total
    NEW.total := NEW.subtotal + NEW.carry_bag_charge;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_carts_validate_and_calc_totals ON carts;
CREATE TRIGGER trg_carts_validate_and_calc_totals
    BEFORE INSERT OR UPDATE OF carry_bag_option_id, carry_bag_quantity ON carts
    FOR EACH ROW EXECUTE FUNCTION trg_carts_validate_and_calc_totals();

-- -------------------------------------------------------------
-- 3. Atomic Checkout Procedure: checkout_cart
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION checkout_cart(
    p_cart_id UUID,
    p_payment_method TEXT DEFAULT 'cash'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_cart RECORD;
    v_order_id UUID;
    v_order_number TEXT;
    v_item_count INTEGER;
BEGIN
    -- Validate payment method
    IF p_payment_method NOT IN ('cash', 'upi', 'card', 'demo') THEN
        RAISE EXCEPTION 'Invalid payment method: %', p_payment_method;
    END IF;

    -- Fetch active cart
    SELECT * INTO v_cart
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cart % not found or is not active', p_cart_id;
    END IF;

    -- Check ownership or admin status
    IF v_cart.user_id <> auth.uid() AND NOT is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: You do not own cart %', p_cart_id;
    END IF;

    -- Count cart items
    SELECT COUNT(*) INTO v_item_count
    FROM public.cart_items
    WHERE cart_id = p_cart_id;

    IF v_item_count = 0 THEN
        RAISE EXCEPTION 'Cannot checkout an empty cart';
    END IF;

    -- Ensure cart totals are fresh
    PERFORM update_cart_totals(p_cart_id);

    -- Re-fetch updated cart
    SELECT * INTO v_cart
    FROM public.carts
    WHERE id = p_cart_id;

    -- Insert Order
    INSERT INTO public.orders (
        user_id,
        cart_id,
        subtotal,
        tax,
        carry_bag_charge,
        total_amount,
        payment_method,
        status,
        weight_verified
    ) VALUES (
        v_cart.user_id,
        p_cart_id,
        v_cart.subtotal,
        0.00,
        v_cart.carry_bag_charge,
        v_cart.total,
        p_payment_method,
        'paid',
        TRUE
    )
    RETURNING id, order_number INTO v_order_id, v_order_number;

    -- Insert Order Items preserving snapshot of product name and price
    INSERT INTO public.order_items (
        order_id,
        product_id,
        product_name,
        quantity,
        unit_price,
        total_price
    )
    SELECT
        v_order_id,
        ci.product_id,
        p.name AS product_name,
        ci.quantity,
        ci.unit_price,
        (ci.quantity * ci.unit_price) AS total_price
    FROM public.cart_items ci
    JOIN public.products p ON p.id = ci.product_id
    WHERE ci.cart_id = p_cart_id;

    -- Deduct Inventory stock
    UPDATE public.inventory inv
    SET stock_quantity = GREATEST(0, inv.stock_quantity - ci.quantity),
        updated_at = NOW()
    FROM public.cart_items ci
    WHERE ci.cart_id = p_cart_id
      AND inv.product_id = ci.product_id;

    -- Mark cart as checked out
    UPDATE public.carts
    SET status = 'checked_out',
        updated_at = NOW()
    WHERE id = p_cart_id;

    RETURN jsonb_build_object(
        'success', true,
        'order_id', v_order_id,
        'order_number', v_order_number,
        'subtotal', v_cart.subtotal,
        'carry_bag_charge', v_cart.carry_bag_charge,
        'total_amount', v_cart.total,
        'payment_method', p_payment_method,
        'item_count', v_item_count
    );
END;
$$;

-- -------------------------------------------------------------
-- 4. Cart RPC Helper Functions
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION add_to_cart(
    p_cart_id UUID,
    p_product_id UUID,
    p_quantity INT DEFAULT 1
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_cart_user_id UUID;
BEGIN
    SELECT user_id INTO v_cart_user_id
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Active cart % not found', p_cart_id;
    END IF;

    IF v_cart_user_id <> auth.uid() AND NOT is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Cannot modify cart %', p_cart_id;
    END IF;

    IF p_quantity <= 0 THEN
        RAISE EXCEPTION 'Quantity must be positive';
    END IF;

    INSERT INTO public.cart_items (cart_id, product_id, quantity)
    VALUES (p_cart_id, p_product_id, p_quantity)
    ON CONFLICT (cart_id, product_id)
    DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity;

    RETURN jsonb_build_object('success', true, 'cart_id', p_cart_id, 'product_id', p_product_id);
END;
$$;

CREATE OR REPLACE FUNCTION remove_from_cart(
    p_cart_id UUID,
    p_product_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_cart_user_id UUID;
BEGIN
    SELECT user_id INTO v_cart_user_id
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Active cart % not found', p_cart_id;
    END IF;

    IF v_cart_user_id <> auth.uid() AND NOT is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Cannot modify cart %', p_cart_id;
    END IF;

    DELETE FROM public.cart_items
    WHERE cart_id = p_cart_id AND product_id = p_product_id;

    RETURN jsonb_build_object('success', true, 'cart_id', p_cart_id, 'product_id', p_product_id);
END;
$$;

CREATE OR REPLACE FUNCTION set_cart_carry_bag(
    p_cart_id UUID,
    p_bag_option_id UUID,
    p_quantity INT DEFAULT 1
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_cart_user_id UUID;
BEGIN
    SELECT user_id INTO v_cart_user_id
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Active cart % not found', p_cart_id;
    END IF;

    IF v_cart_user_id <> auth.uid() AND NOT is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Cannot modify cart %', p_cart_id;
    END IF;

    IF p_quantity < 0 THEN
        RAISE EXCEPTION 'Carry bag quantity cannot be negative';
    END IF;

    UPDATE public.carts
    SET carry_bag_option_id = p_bag_option_id,
        carry_bag_quantity = p_quantity
    WHERE id = p_cart_id;

    RETURN jsonb_build_object('success', true, 'cart_id', p_cart_id);
END;
$$;
