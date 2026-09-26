-- =============================================================
-- Smart Cart AI — rls.sql
-- Platform  : Supabase (PostgreSQL 15+)
-- Run this file AFTER schema.sql.
-- =============================================================
-- Helper: check if the calling user is an admin or superadmin.
-- =============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
          AND role IN ('admin', 'superadmin')
          AND is_active = TRUE
    );
$$;

-- =============================================================
-- PROFILES
-- =============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Customers: read and update their own profile only.
CREATE POLICY "profiles_select_own"
    ON profiles FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "profiles_update_own"
    ON profiles FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (
        id = auth.uid()
        -- Customers cannot elevate their own role
        AND role = (SELECT role FROM profiles WHERE id = auth.uid())
    );

-- Admins: full read access across all profiles.
CREATE POLICY "profiles_admin_select"
    ON profiles FOR SELECT
    USING (is_admin());

-- Superadmins: can update any profile (e.g. promote to admin).
CREATE POLICY "profiles_superadmin_update"
    ON profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'superadmin' AND is_active = TRUE
        )
    );

-- =============================================================
-- STORE LOCATIONS
-- =============================================================
ALTER TABLE store_locations ENABLE ROW LEVEL SECURITY;

-- All authenticated users: read active locations (needed for map).
CREATE POLICY "store_locations_select_all"
    ON store_locations FOR SELECT
    USING (is_active = TRUE);

-- Admins: full management.
CREATE POLICY "store_locations_admin_all"
    ON store_locations FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- =============================================================
-- PRODUCTS
-- =============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Customers: read active products only.
CREATE POLICY "products_select_active"
    ON products FOR SELECT
    USING (is_active = TRUE);

-- Admins: full CRUD — manage prices, barcodes, weights, etc.
CREATE POLICY "products_admin_all"
    ON products FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- =============================================================
-- INVENTORY
-- =============================================================
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Customers: read availability of active products only.
CREATE POLICY "inventory_select_customers"
    ON inventory FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products
            WHERE products.id = inventory.product_id
              AND products.is_active = TRUE
        )
    );

-- Admins: full management (update stock, toggle availability).
CREATE POLICY "inventory_admin_all"
    ON inventory FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- =============================================================
-- CARRY BAG OPTIONS
-- =============================================================
ALTER TABLE carry_bag_options ENABLE ROW LEVEL SECURITY;

-- Customers: read active bag options.
CREATE POLICY "carry_bags_select_active"
    ON carry_bag_options FOR SELECT
    USING (is_active = TRUE);

-- Admins: full management.
CREATE POLICY "carry_bags_admin_all"
    ON carry_bag_options FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- =============================================================
-- CARTS
-- =============================================================
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Customers: access only their own carts.
CREATE POLICY "carts_select_own"
    ON carts FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "carts_insert_own"
    ON carts FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "carts_update_own"
    ON carts FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Customers cannot delete carts (abandoned = status update only).
-- Admins: full read access for order/weight management.
CREATE POLICY "carts_admin_select"
    ON carts FOR SELECT
    USING (is_admin());

-- =============================================================
-- CART ITEMS
-- =============================================================
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Customers: access only items in their own carts.
CREATE POLICY "cart_items_select_own"
    ON cart_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = cart_items.cart_id
              AND carts.user_id = auth.uid()
        )
    );

CREATE POLICY "cart_items_insert_own"
    ON cart_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = cart_items.cart_id
              AND carts.user_id = auth.uid()
              AND carts.status = 'active'
        )
    );

CREATE POLICY "cart_items_update_own"
    ON cart_items FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = cart_items.cart_id
              AND carts.user_id = auth.uid()
              AND carts.status = 'active'
        )
    );

CREATE POLICY "cart_items_delete_own"
    ON cart_items FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = cart_items.cart_id
              AND carts.user_id = auth.uid()
              AND carts.status = 'active'
        )
    );

-- Admins: read all cart items.
CREATE POLICY "cart_items_admin_select"
    ON cart_items FOR SELECT
    USING (is_admin());

-- =============================================================
-- WEIGHT READINGS
-- =============================================================
ALTER TABLE weight_readings ENABLE ROW LEVEL SECURITY;

-- Customers: read readings only for their own carts.
CREATE POLICY "weight_readings_select_own"
    ON weight_readings FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = weight_readings.cart_id
              AND carts.user_id = auth.uid()
        )
    );

-- ESP32 inserts via Supabase service-role key (bypasses RLS).
-- Authenticated customers cannot INSERT weight readings directly.

-- Admins: full read access.
CREATE POLICY "weight_readings_admin_select"
    ON weight_readings FOR SELECT
    USING (is_admin());

-- =============================================================
-- ORDERS
-- =============================================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Customers: access only their own orders.
CREATE POLICY "orders_select_own"
    ON orders FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "orders_insert_own"
    ON orders FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Customers cannot UPDATE or DELETE orders (immutable bills).

-- Admins: full management of all orders.
CREATE POLICY "orders_admin_all"
    ON orders FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- =============================================================
-- ORDER ITEMS
-- =============================================================
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Customers: read items for their own orders only.
CREATE POLICY "order_items_select_own"
    ON order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
              AND orders.user_id = auth.uid()
        )
    );

-- Order items are inserted during checkout only (server-side / trusted client).
CREATE POLICY "order_items_insert_own"
    ON order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
              AND orders.user_id = auth.uid()
        )
    );

-- Customers cannot update or delete order items.

-- Admins: full read access.
CREATE POLICY "order_items_admin_select"
    ON order_items FOR SELECT
    USING (is_admin());

-- =============================================================
-- FEEDBACK
-- =============================================================
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Customers: submit and read their own feedback.
CREATE POLICY "feedback_insert_own"
    ON feedback FOR INSERT
    WITH CHECK (
        user_id = auth.uid()
        -- Can only give feedback for their own completed orders.
        AND EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = feedback.order_id
              AND orders.user_id = auth.uid()
              AND orders.status = 'paid'
        )
    );

CREATE POLICY "feedback_select_own"
    ON feedback FOR SELECT
    USING (user_id = auth.uid());

-- Admins: full read access for analytics.
CREATE POLICY "feedback_admin_select"
    ON feedback FOR SELECT
    USING (is_admin());
