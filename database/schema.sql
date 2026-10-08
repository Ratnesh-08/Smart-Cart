-- =============================================================
-- Smart Cart AI — schema.sql
-- Platform  : Supabase (PostgreSQL 15+)
-- Run this file FIRST, before seed.sql and rls.sql.
-- =============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================
-- 1. PROFILES
--    Extends Supabase auth.users with customer/admin info.
-- =============================================================
CREATE TABLE IF NOT EXISTS profiles (
    id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name   TEXT        NOT NULL DEFAULT '',
    phone       TEXT,
    role        TEXT        NOT NULL DEFAULT 'customer'
                            CHECK (role IN ('customer', 'admin', 'superadmin')),
    is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on new auth user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-update updated_at on profiles
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================
-- 2. STORE LOCATIONS
--    Predefined supermarket digital map — NO GPS, NO Bluetooth.
--    Each location represents an aisle / section / shelf.
-- =============================================================
CREATE TABLE IF NOT EXISTS store_locations (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    location_name   TEXT        NOT NULL,
    aisle           TEXT        NOT NULL,   -- e.g. "Aisle 1"
    section         TEXT,                   -- e.g. "Dairy"
    shelf           TEXT,                   -- e.g. "Shelf A"
    map_x           INTEGER     NOT NULL DEFAULT 0 CHECK (map_x >= 0),
    map_y           INTEGER     NOT NULL DEFAULT 0 CHECK (map_y >= 0),
    is_active       BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_store_locations_aisle ON store_locations (aisle);

-- =============================================================
-- 3. PRODUCTS
-- =============================================================
CREATE TABLE IF NOT EXISTS products (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    barcode         TEXT            NOT NULL UNIQUE,
    name            TEXT            NOT NULL,
    description     TEXT,
    category        TEXT            NOT NULL,   -- e.g. "Dairy", "Snacks"
    price           NUMERIC(10, 2)  NOT NULL CHECK (price >= 0),
    expected_weight NUMERIC(10, 3)  NOT NULL DEFAULT 0 CHECK (expected_weight >= 0),
                                                -- weight in grams per unit
    unit            TEXT            NOT NULL DEFAULT 'pcs',
                                                -- e.g. "500g", "1L", "pcs"
    location_id     UUID            REFERENCES store_locations(id) ON DELETE SET NULL,
    image_url       TEXT,
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_barcode    ON products (barcode);
CREATE INDEX IF NOT EXISTS idx_products_category   ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_location   ON products (location_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active  ON products (is_active);

CREATE TRIGGER products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================
-- 4. INVENTORY
--    One-to-one with products. Managed by admin only.
-- =============================================================
CREATE TABLE IF NOT EXISTS inventory (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID        NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    stock_quantity  INTEGER     NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    is_available    BOOLEAN     NOT NULL DEFAULT TRUE,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory (product_id);

CREATE TRIGGER inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================
-- 5. CARRY BAG OPTIONS
--    Admin-managed list of bag types offered at checkout.
-- =============================================================
CREATE TABLE IF NOT EXISTS carry_bag_options (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT            NOT NULL,           -- e.g. "Small Cloth Bag"
    price       NUMERIC(6, 2)   NOT NULL CHECK (price >= 0),
    is_active   BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- =============================================================
-- 6. CARTS
--    One active cart per customer at a time.
-- =============================================================
CREATE TABLE IF NOT EXISTS carts (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID            NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status              TEXT            NOT NULL DEFAULT 'active'
                                        CHECK (status IN ('active', 'checked_out', 'abandoned')),
    subtotal            NUMERIC(10, 2)  NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    carry_bag_option_id UUID            REFERENCES carry_bag_options(id) ON DELETE SET NULL,
    carry_bag_quantity  INTEGER         NOT NULL DEFAULT 0 CHECK (carry_bag_quantity >= 0),
    carry_bag_charge    NUMERIC(10, 2)  NOT NULL DEFAULT 0 CHECK (carry_bag_charge >= 0),
    total               NUMERIC(10, 2)  NOT NULL DEFAULT 0 CHECK (total >= 0),
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts (user_id);
CREATE INDEX IF NOT EXISTS idx_carts_status  ON carts (status);

CREATE TRIGGER carts_updated_at
    BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================
-- 7. CART ITEMS
-- =============================================================
CREATE TABLE IF NOT EXISTS cart_items (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id         UUID            NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id      UUID            NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity        INTEGER         NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price      NUMERIC(10, 2)  NOT NULL CHECK (unit_price >= 0),
                                    -- price at time of adding (price-lock)
    expected_weight NUMERIC(10, 3)  NOT NULL DEFAULT 0 CHECK (expected_weight >= 0),
                                    -- grams per unit at time of adding
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    UNIQUE (cart_id, product_id)    -- one row per product per cart
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart    ON cart_items (cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items (product_id);

-- =============================================================
-- 8. WEIGHT READINGS
--    Raw data from ESP32 + HX711 load cells.
--    Posted per-event (item added, removed, checkout verify).
-- =============================================================
CREATE TABLE IF NOT EXISTS weight_readings (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id             UUID            NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    expected_weight     NUMERIC(10, 3)  NOT NULL DEFAULT 0 CHECK (expected_weight >= 0),
                                        -- computed from cart_items
    actual_weight       NUMERIC(10, 3)  NOT NULL CHECK (actual_weight >= 0),
                                        -- measured by HX711
    tolerance           NUMERIC(10, 3)  NOT NULL DEFAULT 50 CHECK (tolerance >= 0),
                                        -- acceptable variance in grams
    difference          NUMERIC(10, 3)  GENERATED ALWAYS AS
                            (actual_weight - expected_weight) STORED,
    verification_status TEXT            NOT NULL DEFAULT 'pending'
                                        CHECK (verification_status IN
                                            ('pending', 'verified', 'mismatch', 'error')),
    trigger_event       TEXT            NOT NULL DEFAULT 'item_added'
                                        CHECK (trigger_event IN
                                            ('item_added', 'item_removed',
                                             'checkout_verify', 'periodic')),
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weight_readings_cart   ON weight_readings (cart_id);
CREATE INDEX IF NOT EXISTS idx_weight_readings_status ON weight_readings (verification_status);
CREATE INDEX IF NOT EXISTS idx_weight_readings_time   ON weight_readings (created_at DESC);

-- =============================================================
-- 9. ORDERS
--    Created when a cart is checked out. Immutable after creation.
-- =============================================================
CREATE TABLE IF NOT EXISTS orders (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number        TEXT            NOT NULL UNIQUE
                                        DEFAULT 'SC-' || to_char(NOW(), 'YYYYMMDD') || '-' ||
                                                upper(substring(gen_random_uuid()::TEXT, 1, 6)),
    user_id             UUID            NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    cart_id             UUID            NOT NULL UNIQUE REFERENCES carts(id) ON DELETE RESTRICT,
    subtotal            NUMERIC(10, 2)  NOT NULL CHECK (subtotal >= 0),
    tax                 NUMERIC(10, 2)  NOT NULL DEFAULT 0 CHECK (tax >= 0),
    carry_bag_charge    NUMERIC(10, 2)  NOT NULL DEFAULT 0 CHECK (carry_bag_charge >= 0),
    total_amount        NUMERIC(10, 2)  NOT NULL CHECK (total_amount >= 0),
    payment_method      TEXT            NOT NULL DEFAULT 'cash'
                                        CHECK (payment_method IN ('cash', 'upi', 'card', 'demo')),
    status              TEXT            NOT NULL DEFAULT 'pending'
                                        CHECK (status IN
                                            ('pending', 'confirmed', 'paid', 'failed', 'refunded')),
    weight_verified     BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id      ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at   ON orders (created_at DESC);

-- =============================================================
-- 10. ORDER ITEMS
--     Historical snapshot — NOT linked to live product price.
--     product_name is stored so bills remain correct even if
--     the product is renamed or deleted.
-- =============================================================
CREATE TABLE IF NOT EXISTS order_items (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID            NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id      UUID            REFERENCES products(id) ON DELETE SET NULL,
                                    -- NULLable: product can be deleted; bill still stands
    product_name    TEXT            NOT NULL,   -- snapshot
    quantity        INTEGER         NOT NULL CHECK (quantity > 0),
    unit_price      NUMERIC(10, 2)  NOT NULL CHECK (unit_price >= 0),
    total_price     NUMERIC(10, 2)  NOT NULL CHECK (total_price >= 0)
                                    -- stored: quantity * unit_price
);

CREATE INDEX IF NOT EXISTS idx_order_items_order   ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items (product_id);

-- =============================================================
-- 11. FEEDBACK
-- =============================================================
CREATE TABLE IF NOT EXISTS feedback (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    order_id    UUID        NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
                            -- one feedback per order
    rating      SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_user  ON feedback (user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_order ON feedback (order_id);

-- =============================================================
-- 12. PHASE 6 — CART & BILLING ENGINE FUNCTIONS & TRIGGERS
-- =============================================================

-- Sync cart_items price and weight from products table
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

    NEW.unit_price := v_price;
    NEW.expected_weight := v_weight;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_cart_item_price_and_weight ON cart_items;
CREATE TRIGGER trg_sync_cart_item_price_and_weight
    BEFORE INSERT OR UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION sync_cart_item_price_and_weight();

-- Recalculate cart subtotal, carry_bag_charge, and total
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
    SELECT COALESCE(SUM(quantity * unit_price), 0.00)
    INTO v_subtotal
    FROM public.cart_items
    WHERE cart_id = p_cart_id;

    SELECT carry_bag_option_id, COALESCE(carry_bag_quantity, 0)
    INTO v_bag_option_id, v_bag_qty
    FROM public.carts
    WHERE id = p_cart_id;

    IF v_bag_option_id IS NOT NULL AND v_bag_qty > 0 THEN
        SELECT COALESCE(price, 0.00)
        INTO v_bag_price
        FROM public.carry_bag_options
        WHERE id = v_bag_option_id AND is_active = TRUE;

        v_bag_charge := v_bag_price * v_bag_qty;
    ELSE
        v_bag_charge := 0.00;
    END IF;

    v_total := v_subtotal + v_bag_charge;

    UPDATE public.carts
    SET subtotal = v_subtotal,
        carry_bag_charge = v_bag_charge,
        total = v_total,
        updated_at = NOW()
    WHERE id = p_cart_id;
END;
$$;

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

CREATE OR REPLACE FUNCTION trg_carts_validate_and_calc_totals()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_bag_price NUMERIC(6, 2) := 0.00;
BEGIN
    IF NEW.carry_bag_quantity < 0 THEN
        RAISE EXCEPTION 'Carry bag quantity cannot be negative';
    END IF;

    IF NEW.carry_bag_option_id IS NOT NULL AND NEW.carry_bag_quantity > 0 THEN
        SELECT COALESCE(price, 0.00)
        INTO v_bag_price
        FROM public.carry_bag_options
        WHERE id = NEW.carry_bag_option_id AND is_active = TRUE;

        NEW.carry_bag_charge := v_bag_price * NEW.carry_bag_quantity;
    ELSE
        NEW.carry_bag_charge := 0.00;
    END IF;

    SELECT COALESCE(SUM(quantity * unit_price), 0.00)
    INTO NEW.subtotal
    FROM public.cart_items
    WHERE cart_id = NEW.id;

    NEW.total := NEW.subtotal + NEW.carry_bag_charge;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_carts_validate_and_calc_totals ON carts;
CREATE TRIGGER trg_carts_validate_and_calc_totals
    BEFORE INSERT OR UPDATE OF carry_bag_option_id, carry_bag_quantity ON carts
    FOR EACH ROW EXECUTE FUNCTION trg_carts_validate_and_calc_totals();

-- Atomic Checkout Procedure
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
    IF p_payment_method NOT IN ('cash', 'upi', 'card', 'demo') THEN
        RAISE EXCEPTION 'Invalid payment method: %', p_payment_method;
    END IF;

    SELECT * INTO v_cart
    FROM public.carts
    WHERE id = p_cart_id AND status = 'active';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cart % not found or is not active', p_cart_id;
    END IF;

    IF v_cart.user_id <> auth.uid() AND NOT is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: You do not own cart %', p_cart_id;
    END IF;

    SELECT COUNT(*) INTO v_item_count
    FROM public.cart_items
    WHERE cart_id = p_cart_id;

    IF v_item_count = 0 THEN
        RAISE EXCEPTION 'Cannot checkout an empty cart';
    END IF;

    PERFORM update_cart_totals(p_cart_id);

    SELECT * INTO v_cart
    FROM public.carts
    WHERE id = p_cart_id;

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

    UPDATE public.inventory inv
    SET stock_quantity = GREATEST(0, inv.stock_quantity - ci.quantity),
        updated_at = NOW()
    FROM public.cart_items ci
    WHERE ci.cart_id = p_cart_id
      AND inv.product_id = ci.product_id;

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

-- Cart RPC Helper Functions
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

-- =============================================================
-- 13. PHASE 7 — ADMIN PRODUCT & INVENTORY MANAGEMENT TRIGGER
-- =============================================================
-- Automatic inventory provisioning:
--   When an admin inserts a new product into `products`, this trigger
--   creates the required `inventory` row automatically with:
--     stock_quantity = 0
--     is_available   = TRUE
--
-- Uses ON CONFLICT (product_id) DO NOTHING so the trigger body is idempotent
-- (safe if an inventory row already exists for this product).
--
-- Note: `is_available` is intentionally independent of `stock_quantity`.
-- Admins control both fields separately through the `inventory` table.
-- No automatic availability-sync trigger is added here.
--
-- Note on schema.sql vs migration:
--   schema.sql is the full-reset reference (run on a fresh database).
--   For an existing Phase 6 database, run migrations/002_phase7_admin_product_inventory.sql
--   which uses a DO-block conditional CREATE TRIGGER instead of DROP+CREATE.
-- =============================================================

CREATE OR REPLACE FUNCTION auto_create_inventory_for_product()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.inventory (product_id, stock_quantity, is_available)
    VALUES (NEW.id, 0, TRUE)
    ON CONFLICT (product_id) DO NOTHING;
    RETURN NEW;
END;
$$;

-- schema.sql is always run on a fresh/empty database, so DROP + CREATE
-- is safe here. For incremental deployment, use the migration file instead.
DROP TRIGGER IF EXISTS trg_auto_create_inventory ON products;
CREATE TRIGGER trg_auto_create_inventory
    AFTER INSERT ON products
    FOR EACH ROW EXECUTE FUNCTION auto_create_inventory_for_product();

