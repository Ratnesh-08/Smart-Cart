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
