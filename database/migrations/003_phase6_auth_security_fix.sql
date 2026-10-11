-- =============================================================
-- Smart Cart AI — Migration 003: Phase 6 Auth & Cart Ownership Security Fix
-- Platform  : Supabase (PostgreSQL 15+)
-- Description: Hardens cart ownership validation in Phase 6 PL/pgSQL
--              functions to prevent unauthenticated access when auth.uid()
--              is NULL, and prevents cross-customer cart access.
-- =============================================================

-- -------------------------------------------------------------
-- 1. checkout_cart (Hardened Ownership & Explicit Auth Check)
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION checkout_cart(
    p_cart_id UUID,
    p_payment_method TEXT DEFAULT 'cash'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_cart RECORD;
    v_order_id UUID;
    v_order_number TEXT;
    v_item_count INTEGER;
    v_caller_id UUID;
    v_caller_is_admin BOOLEAN;
BEGIN
    -- Validate payment method
    IF p_payment_method NOT IN ('cash', 'upi', 'card', 'demo') THEN
        RAISE EXCEPTION 'Invalid payment method: %', p_payment_method;
    END IF;

    -- Explicit Authentication Check:
    -- In SQL/PostgreSQL, NULL <> UUID evaluates to NULL (truthy-falsy edge case in AND/OR logic).
    -- We explicitly capture the caller and verify authentication.
    v_caller_id := auth.uid();
    v_caller_is_admin := is_admin();

    IF v_caller_id IS NULL AND NOT v_caller_is_admin THEN
        RAISE EXCEPTION 'Unauthorized: Caller is not authenticated';
    END IF;

    -- Fetch active cart
    SELECT * INTO v_cart
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cart % not found or is not active', p_cart_id;
    END IF;

    -- Enforce ownership: only the cart owner or an active admin can proceed
    IF (v_caller_id IS NULL OR v_cart.user_id <> v_caller_id) AND NOT v_caller_is_admin THEN
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
-- 2. add_to_cart (Hardened Ownership & Explicit Auth Check)
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION add_to_cart(
    p_cart_id UUID,
    p_product_id UUID,
    p_quantity INT DEFAULT 1
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_cart_user_id UUID;
    v_caller_id UUID;
    v_caller_is_admin BOOLEAN;
BEGIN
    v_caller_id := auth.uid();
    v_caller_is_admin := is_admin();

    IF v_caller_id IS NULL AND NOT v_caller_is_admin THEN
        RAISE EXCEPTION 'Unauthorized: Caller is not authenticated';
    END IF;

    SELECT user_id INTO v_cart_user_id
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Active cart % not found', p_cart_id;
    END IF;

    IF (v_caller_id IS NULL OR v_cart_user_id <> v_caller_id) AND NOT v_caller_is_admin THEN
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

-- -------------------------------------------------------------
-- 3. remove_from_cart (Hardened Ownership & Explicit Auth Check)
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION remove_from_cart(
    p_cart_id UUID,
    p_product_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_cart_user_id UUID;
    v_caller_id UUID;
    v_caller_is_admin BOOLEAN;
BEGIN
    v_caller_id := auth.uid();
    v_caller_is_admin := is_admin();

    IF v_caller_id IS NULL AND NOT v_caller_is_admin THEN
        RAISE EXCEPTION 'Unauthorized: Caller is not authenticated';
    END IF;

    SELECT user_id INTO v_cart_user_id
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Active cart % not found', p_cart_id;
    END IF;

    IF (v_caller_id IS NULL OR v_cart_user_id <> v_caller_id) AND NOT v_caller_is_admin THEN
        RAISE EXCEPTION 'Unauthorized: Cannot modify cart %', p_cart_id;
    END IF;

    DELETE FROM public.cart_items
    WHERE cart_id = p_cart_id AND product_id = p_product_id;

    RETURN jsonb_build_object('success', true, 'cart_id', p_cart_id, 'product_id', p_product_id);
END;
$$;

-- -------------------------------------------------------------
-- 4. set_cart_carry_bag (Hardened Ownership & Explicit Auth Check)
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_cart_carry_bag(
    p_cart_id UUID,
    p_bag_option_id UUID,
    p_quantity INT DEFAULT 1
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_cart_user_id UUID;
    v_caller_id UUID;
    v_caller_is_admin BOOLEAN;
BEGIN
    v_caller_id := auth.uid();
    v_caller_is_admin := is_admin();

    IF v_caller_id IS NULL AND NOT v_caller_is_admin THEN
        RAISE EXCEPTION 'Unauthorized: Caller is not authenticated';
    END IF;

    SELECT user_id INTO v_cart_user_id
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Active cart % not found', p_cart_id;
    END IF;

    IF (v_caller_id IS NULL OR v_cart_user_id <> v_caller_id) AND NOT v_caller_is_admin THEN
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

-- Ensure permissions remain in place
GRANT EXECUTE ON FUNCTION checkout_cart(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION add_to_cart(UUID, UUID, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION remove_from_cart(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION set_cart_carry_bag(UUID, UUID, INT) TO authenticated;
