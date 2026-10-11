-- =============================================================
-- Smart Cart AI — Test Suite: Phase 7 Admin Product & Inventory
-- Platform  : Supabase (PostgreSQL 15+)
-- Description: Automated test assertions for Phase 7 requirements:
--              product CRUD, inventory auto-provisioning, constraint
--              validation, administrative inventory control, Phase 6
--              checkout regression (with simulated admin JWT context),
--              and schema cascade verification.
--
-- Execution context: Supabase SQL Editor.
--
-- Transaction-Safe Test Design:
-- 1. All fixture records are inserted using deterministic, isolated test UUIDs.
-- 2. If all assertions pass, explicit targeted DELETE statements remove the
--    test fixtures at the end of the block.
-- 3. If any assertion fails or an unexpected exception occurs, re-raising the
--    exception aborts the execution block, causing PostgreSQL to automatically
--    ROLL BACK all uncommitted database changes made by this script.
--    No orphaned fixture data can persist in the database.
-- 4. Real application products, inventory, users, carts, or orders are never touched.
-- =============================================================

DO $$
DECLARE
    -- Isolated UUIDs for test fixtures
    v_admin_id    UUID := gen_random_uuid();
    v_customer_id UUID := gen_random_uuid();
    v_location_id UUID := gen_random_uuid();
    v_prod_id     UUID := gen_random_uuid();
    v_prod_b_id   UUID := gen_random_uuid();
    v_bag_id      UUID := gen_random_uuid();
    v_cart_id     UUID := gen_random_uuid();

    v_inv_rec     RECORD;
    v_prod_rec    RECORD;
    v_cart_rec    RECORD;
    v_checkout_res JSONB;
    v_err_caught  BOOLEAN;
    v_inv_count   INT;
BEGIN
    RAISE NOTICE '=======================================================';
    RAISE NOTICE 'STARTING PHASE 7 ADMIN PRODUCT & INVENTORY TEST SUITE';
    RAISE NOTICE '=======================================================';

    -- -------------------------------------------------------------------
    -- SETUP TEST FIXTURES
    -- -------------------------------------------------------------------
    -- Required auth.users columns: id, email
    INSERT INTO auth.users (id, email) VALUES
        (v_admin_id,    'test_admin_p7@smartcart.local'),
        (v_customer_id, 'test_cust_p7@smartcart.local')
    ON CONFLICT (id) DO NOTHING;

    -- Required profiles columns: id (matches auth.users.id), full_name, role, is_active
    INSERT INTO public.profiles (id, full_name, role, is_active) VALUES
        (v_admin_id,    'Test Admin P7',    'admin',    TRUE),
        (v_customer_id, 'Test Customer P7', 'customer', TRUE)
    ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, is_active = EXCLUDED.is_active;

    -- Required store_locations columns: id, location_name, aisle, section, shelf, map_x, map_y, is_active
    INSERT INTO public.store_locations (id, location_name, aisle, section, shelf, map_x, map_y, is_active)
    VALUES (v_location_id, 'Test Aisle P7', 'Aisle P7', 'Phase7', 'Shelf A', 10, 10, TRUE);

    -- Required carry_bag_options columns: id, name, price, is_active
    INSERT INTO public.carry_bag_options (id, name, price, is_active)
    VALUES (v_bag_id, 'P7 Test Bag', 3.00, TRUE);

    -- -------------------------------------------------------------------
    -- TEST 1: PRODUCT CREATION (ADMIN INSERT)
    -- Required products columns: id, barcode, name, description, category,
    -- price, expected_weight, unit, location_id, is_active
    -- -------------------------------------------------------------------
    INSERT INTO public.products (
        id, barcode, name, description, category,
        price, expected_weight, unit, location_id, is_active
    ) VALUES (
        v_prod_id, '8880000000001', 'P7 Test Product Alpha', 'Phase 7 test item',
        'TestCategory', 75.00, 150.0, 'pcs', v_location_id, TRUE
    );

    SELECT * INTO v_prod_rec FROM public.products WHERE id = v_prod_id;
    ASSERT v_prod_rec.id IS NOT NULL,             'TEST 1 FAILED: Product was not inserted';
    ASSERT v_prod_rec.price = 75.00,              'TEST 1 FAILED: Price mismatch after insert';
    ASSERT v_prod_rec.expected_weight = 150.0,    'TEST 1 FAILED: Expected weight mismatch';
    ASSERT v_prod_rec.barcode = '8880000000001',  'TEST 1 FAILED: Barcode mismatch';
    ASSERT v_prod_rec.is_active = TRUE,           'TEST 1 FAILED: is_active should default TRUE';
    RAISE NOTICE '✓ TEST 1 PASSED: Admin product creation stores all fields correctly';

    -- -------------------------------------------------------------------
    -- TEST 2: AUTO INVENTORY PROVISIONING ON PRODUCT INSERT
    -- -------------------------------------------------------------------
    SELECT * INTO v_inv_rec FROM public.inventory WHERE product_id = v_prod_id;
    ASSERT v_inv_rec.product_id IS NOT NULL, 'TEST 2 FAILED: Inventory row was NOT auto-created';
    ASSERT v_inv_rec.stock_quantity = 0,     'TEST 2 FAILED: Default stock_quantity should be 0';
    ASSERT v_inv_rec.is_available = TRUE,    'TEST 2 FAILED: Default is_available should be TRUE';
    RAISE NOTICE '✓ TEST 2 PASSED: trg_auto_create_inventory fired and created inventory row (qty=0, available=TRUE)';

    -- -------------------------------------------------------------------
    -- TEST 3: NO DUPLICATE INVENTORY ROW (IDEMPOTENCY & NON-MUTATION)
    -- -------------------------------------------------------------------
    -- 3a: Verify exactly 1 inventory row exists for this product
    SELECT COUNT(*) INTO v_inv_count FROM public.inventory WHERE product_id = v_prod_id;
    ASSERT v_inv_count = 1, 'TEST 3 FAILED: Initial inventory count is not 1';

    -- 3b: Set stock to 25 to verify ON CONFLICT DO NOTHING does not overwrite existing values
    UPDATE public.inventory SET stock_quantity = 25 WHERE product_id = v_prod_id;

    -- 3c: Execute trigger logic via duplicate conflict insert
    INSERT INTO public.inventory (product_id, stock_quantity, is_available)
    VALUES (v_prod_id, 999, FALSE)
    ON CONFLICT (product_id) DO NOTHING;

    SELECT COUNT(*) INTO v_inv_count FROM public.inventory WHERE product_id = v_prod_id;
    ASSERT v_inv_count = 1, 'TEST 3 FAILED: Duplicate inventory row was created!';

    SELECT stock_quantity, is_available INTO v_inv_rec FROM public.inventory WHERE product_id = v_prod_id;
    ASSERT v_inv_rec.stock_quantity = 25, 'TEST 3 FAILED: ON CONFLICT mutated existing stock_quantity!';
    ASSERT v_inv_rec.is_available = TRUE, 'TEST 3 FAILED: ON CONFLICT mutated existing is_available!';
    RAISE NOTICE '✓ TEST 3 PASSED: Auto-inventory trigger is idempotent — exactly 1 row exists and existing row is not overwritten';

    -- -------------------------------------------------------------------
    -- TEST 4: ADMIN CAN UPDATE PRODUCT NAME
    -- -------------------------------------------------------------------
    UPDATE public.products SET name = 'P7 Test Product Alpha (Renamed)' WHERE id = v_prod_id;
    SELECT name INTO v_prod_rec FROM public.products WHERE id = v_prod_id;
    ASSERT v_prod_rec.name = 'P7 Test Product Alpha (Renamed)',
        'TEST 4 FAILED: Product name update did not persist';
    RAISE NOTICE '✓ TEST 4 PASSED: Admin can update product name';

    -- -------------------------------------------------------------------
    -- TEST 5: ADMIN CAN UPDATE PRODUCT PRICE
    -- -------------------------------------------------------------------
    UPDATE public.products SET price = 99.50 WHERE id = v_prod_id;
    SELECT price INTO v_prod_rec FROM public.products WHERE id = v_prod_id;
    ASSERT v_prod_rec.price = 99.50, 'TEST 5 FAILED: Price update did not persist';
    RAISE NOTICE '✓ TEST 5 PASSED: Admin can update product price';

    -- -------------------------------------------------------------------
    -- TEST 6: ADMIN CAN UPDATE EXPECTED WEIGHT
    -- -------------------------------------------------------------------
    UPDATE public.products SET expected_weight = 200.0 WHERE id = v_prod_id;
    SELECT expected_weight INTO v_prod_rec FROM public.products WHERE id = v_prod_id;
    ASSERT v_prod_rec.expected_weight = 200.0, 'TEST 6 FAILED: Expected weight update did not persist';
    RAISE NOTICE '✓ TEST 6 PASSED: Admin can update expected_weight';

    -- -------------------------------------------------------------------
    -- TEST 7: ADMIN CAN UPDATE BARCODE
    -- -------------------------------------------------------------------
    UPDATE public.products SET barcode = '8880000000099' WHERE id = v_prod_id;
    SELECT barcode INTO v_prod_rec FROM public.products WHERE id = v_prod_id;
    ASSERT v_prod_rec.barcode = '8880000000099', 'TEST 7 FAILED: Barcode update did not persist';
    RAISE NOTICE '✓ TEST 7 PASSED: Admin can update product barcode';

    -- -------------------------------------------------------------------
    -- TEST 8: ADMIN CAN DEACTIVATE PRODUCT (is_active = FALSE)
    -- -------------------------------------------------------------------
    UPDATE public.products SET is_active = FALSE WHERE id = v_prod_id;
    SELECT is_active INTO v_prod_rec FROM public.products WHERE id = v_prod_id;
    ASSERT v_prod_rec.is_active = FALSE, 'TEST 8 FAILED: Deactivation did not persist';
    -- Reactivate for subsequent tests
    UPDATE public.products SET is_active = TRUE WHERE id = v_prod_id;
    RAISE NOTICE '✓ TEST 8 PASSED: Admin can deactivate and reactivate product';

    -- -------------------------------------------------------------------
    -- TEST 9: DUPLICATE BARCODE REJECTED
    -- -------------------------------------------------------------------
    v_err_caught := FALSE;
    BEGIN
        INSERT INTO public.products (
            id, barcode, name, description, category,
            price, expected_weight, unit, location_id, is_active
        ) VALUES (
            gen_random_uuid(), '8880000000099', 'Duplicate Barcode Product', 'dup',
            'TestCategory', 10.00, 50.0, 'pcs', v_location_id, TRUE
        );
    EXCEPTION WHEN unique_violation THEN
        v_err_caught := TRUE;
    END;
    ASSERT v_err_caught = TRUE,
        'TEST 9 FAILED: Duplicate barcode was accepted — UNIQUE constraint missing!';
    RAISE NOTICE '✓ TEST 9 PASSED: Duplicate barcode correctly rejected by UNIQUE constraint';

    -- -------------------------------------------------------------------
    -- TEST 10: NEGATIVE PRICE REJECTED
    -- -------------------------------------------------------------------
    v_err_caught := FALSE;
    BEGIN
        INSERT INTO public.products (
            id, barcode, name, description, category,
            price, expected_weight, unit, location_id, is_active
        ) VALUES (
            gen_random_uuid(), '8880000000091', 'Negative Price Product', 'neg',
            'TestCategory', -1.00, 50.0, 'pcs', v_location_id, TRUE
        );
    EXCEPTION WHEN check_violation THEN
        v_err_caught := TRUE;
    END;
    ASSERT v_err_caught = TRUE,
        'TEST 10 FAILED: Negative price was accepted — CHECK constraint missing!';
    RAISE NOTICE '✓ TEST 10 PASSED: Negative price correctly rejected by CHECK constraint';

    -- -------------------------------------------------------------------
    -- TEST 11: NEGATIVE EXPECTED WEIGHT REJECTED
    -- -------------------------------------------------------------------
    v_err_caught := FALSE;
    BEGIN
        INSERT INTO public.products (
            id, barcode, name, description, category,
            price, expected_weight, unit, location_id, is_active
        ) VALUES (
            gen_random_uuid(), '8880000000092', 'Negative Weight Product', 'neg',
            'TestCategory', 10.00, -5.0, 'pcs', v_location_id, TRUE
        );
    EXCEPTION WHEN check_violation THEN
        v_err_caught := TRUE;
    END;
    ASSERT v_err_caught = TRUE,
        'TEST 11 FAILED: Negative expected_weight was accepted — CHECK constraint missing!';
    RAISE NOTICE '✓ TEST 11 PASSED: Negative expected_weight correctly rejected by CHECK constraint';

    -- -------------------------------------------------------------------
    -- TEST 12: ADMIN CAN UPDATE STOCK QUANTITY IN INVENTORY
    -- -------------------------------------------------------------------
    UPDATE public.inventory SET stock_quantity = 50 WHERE product_id = v_prod_id;
    SELECT stock_quantity INTO v_inv_rec FROM public.inventory WHERE product_id = v_prod_id;
    ASSERT v_inv_rec.stock_quantity = 50, 'TEST 12 FAILED: Stock quantity update did not persist';
    RAISE NOTICE '✓ TEST 12 PASSED: Admin can update stock_quantity in inventory';

    -- -------------------------------------------------------------------
    -- TEST 13: NEGATIVE STOCK QUANTITY REJECTED
    -- -------------------------------------------------------------------
    v_err_caught := FALSE;
    BEGIN
        UPDATE public.inventory SET stock_quantity = -1 WHERE product_id = v_prod_id;
    EXCEPTION WHEN check_violation THEN
        v_err_caught := TRUE;
    END;
    ASSERT v_err_caught = TRUE,
        'TEST 13 FAILED: Negative stock_quantity was accepted — CHECK constraint missing!';
    RAISE NOTICE '✓ TEST 13 PASSED: Negative stock_quantity correctly rejected by CHECK constraint';

    -- -------------------------------------------------------------------
    -- TEST 14: ADMIN CAN INDEPENDENTLY CONTROL is_available
    -- -------------------------------------------------------------------
    -- Set stock = 50 but mark unavailable (admin override)
    UPDATE public.inventory SET stock_quantity = 50, is_available = FALSE WHERE product_id = v_prod_id;
    SELECT * INTO v_inv_rec FROM public.inventory WHERE product_id = v_prod_id;
    ASSERT v_inv_rec.stock_quantity = 50,   'TEST 14 FAILED: Stock was modified unexpectedly';
    ASSERT v_inv_rec.is_available = FALSE,  'TEST 14 FAILED: is_available override did not persist';

    -- Set stock = 0 but mark available (admin override in opposite direction)
    UPDATE public.inventory SET stock_quantity = 0, is_available = TRUE WHERE product_id = v_prod_id;
    SELECT * INTO v_inv_rec FROM public.inventory WHERE product_id = v_prod_id;
    ASSERT v_inv_rec.stock_quantity = 0,   'TEST 14 FAILED: Stock was modified unexpectedly';
    ASSERT v_inv_rec.is_available = TRUE,  'TEST 14 FAILED: is_available should remain TRUE independently';
    RAISE NOTICE '✓ TEST 14 PASSED: is_available is independent of stock_quantity — no auto-sync trigger interferes';

    -- -------------------------------------------------------------------
    -- TEST 15 (POLICY DEFINITION CHECK): PRODUCTS RLS POLICIES EXIST IN CATALOG
    -- Note: When running tests as a privileged SQL Editor connection (postgres/service_role),
    -- table RLS is bypassed by PostgreSQL superuser privileges. This test checks
    -- pg_policies to confirm policy definitions exist in the database catalog.
    -- It does NOT prove customer access denial at runtime; proving runtime RLS enforcement
    -- requires testing from an authenticated client connection using anon/authenticated bearer tokens.
    -- -------------------------------------------------------------------
    DECLARE
        v_policy_count INT;
    BEGIN
        SELECT COUNT(*) INTO v_policy_count
        FROM pg_policies
        WHERE tablename = 'products'
          AND policyname IN ('products_admin_all', 'products_select_active');
        ASSERT v_policy_count >= 2,
            'TEST 15 FAILED: Expected RLS policies for products are missing in pg_policies!';
        RAISE NOTICE '✓ TEST 15 PASSED: RLS policies products_admin_all and products_select_active are defined in catalog';
    END;

    -- -------------------------------------------------------------------
    -- TEST 16 (POLICY DEFINITION CHECK): INVENTORY RLS POLICIES EXIST IN CATALOG
    -- Note: Policy definition check in catalog (see Test 15 note).
    -- -------------------------------------------------------------------
    DECLARE
        v_inv_policy_count INT;
    BEGIN
        SELECT COUNT(*) INTO v_inv_policy_count
        FROM pg_policies
        WHERE tablename = 'inventory'
          AND policyname IN ('inventory_admin_all', 'inventory_select_customers');
        ASSERT v_inv_policy_count >= 2,
            'TEST 16 FAILED: Expected RLS policies for inventory are missing in pg_policies!';
        RAISE NOTICE '✓ TEST 16 PASSED: RLS policies inventory_admin_all and inventory_select_customers are defined in catalog';
    END;

    -- -------------------------------------------------------------------
    -- TEST 17 (POLICY DEFINITION CHECK): PROFILE ROLE RESTRICTION POLICIES EXIST IN CATALOG
    -- Note: Policy definition check in catalog (see Test 15 note).
    -- -------------------------------------------------------------------
    DECLARE
        v_role_policy_count INT;
    BEGIN
        SELECT COUNT(*) INTO v_role_policy_count
        FROM pg_policies
        WHERE tablename = 'profiles'
          AND policyname IN ('profiles_update_own', 'profiles_superadmin_update');
        ASSERT v_role_policy_count >= 2,
            'TEST 17 FAILED: Role protection policies on profiles are missing in pg_policies!';
        RAISE NOTICE '✓ TEST 17 PASSED: Role self-promotion protection policies are defined in catalog';
    END;

    -- -------------------------------------------------------------------
    -- TEST 18 (REGRESSION — PHASE 6): BILLING TRIGGER STILL WORKS
    --   Verify cart_items price and weight sync triggers fire as expected.
    -- -------------------------------------------------------------------
    -- Insert second product for billing regression
    INSERT INTO public.products (
        id, barcode, name, description, category,
        price, expected_weight, unit, location_id, is_active
    ) VALUES (
        v_prod_b_id, '8880000000002', 'P7 Test Product Beta', 'Phase 7 regression item',
        'TestCategory', 60.00, 100.0, 'pcs', v_location_id, TRUE
    );
    -- Bump stock for checkout
    UPDATE public.inventory SET stock_quantity = 100, is_available = TRUE WHERE product_id IN (v_prod_id, v_prod_b_id);
    -- Reset v_prod_id price to known value
    UPDATE public.products SET price = 75.00 WHERE id = v_prod_id;

    -- Create test cart with all required columns: id, user_id, status
    INSERT INTO public.carts (id, user_id, status) VALUES (v_cart_id, v_admin_id, 'active');

    -- Add item with tampered unit_price (0.01) — trigger must override to 75.00
    INSERT INTO public.cart_items (cart_id, product_id, quantity, unit_price)
    VALUES (v_cart_id, v_prod_id, 2, 0.01);

    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_id;
    ASSERT v_cart_rec.subtotal = 150.00,
        'TEST 18 FAILED: Phase 6 billing trigger broken — subtotal should be 150.00 (2 × 75.00)';
    RAISE NOTICE '✓ TEST 18 PASSED: Phase 6 billing trigger still correct after Phase 7 (subtotal = 150.00)';

    -- -------------------------------------------------------------------
    -- TEST 19 (REGRESSION — PHASE 6 & MIGRATION 003): CHECKOUT_CART UNDER AUTH CONTEXT
    -- Note on Simulation Limits:
    -- In Supabase PostgreSQL, auth.uid() reads (nullif(current_setting('request.jwt.claim.sub', true), ''))::uuid
    -- or (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')::uuid.
    -- Calling set_config('request.jwt.claims', ..., true) sets this session setting.
    -- is_admin() then queries public.profiles where id = auth.uid() and role IN ('admin', 'superadmin').
    -- Because v_admin_id has role='admin' in public.profiles, is_admin() evaluates to TRUE.
    -- This tests PL/pgSQL function authorization logic in SQL Editor, but does NOT simulate
    -- the HTTP PostgREST gateway, JWT cryptographic signature verification, or token expiry.
    -- -------------------------------------------------------------------
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_admin_id::text)::text, true);

    v_checkout_res := checkout_cart(v_cart_id, 'cash');
    ASSERT (v_checkout_res->>'success')::BOOLEAN = TRUE,
        'TEST 19 FAILED: checkout_cart failed under authenticated admin context';

    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_id;
    ASSERT v_cart_rec.status = 'checked_out', 'TEST 19 FAILED: Cart status was not updated to checked_out';

    -- Reset authentication context back to empty
    PERFORM set_config('request.jwt.claims', '', true);
    RAISE NOTICE '✓ TEST 19 PASSED: checkout_cart successfully executed under simulated authenticated admin context';

    -- -------------------------------------------------------------------
    -- TEST 20: PRODUCT DELETE CASCADES INVENTORY (ON DELETE CASCADE)
    -- Confirmed in database/schema.sql (line 116):
    --   product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE
    -- Deleting a product must automatically delete its corresponding inventory row.
    -- -------------------------------------------------------------------
    DELETE FROM public.products WHERE id = v_prod_b_id;
    SELECT COUNT(*) INTO v_inv_count FROM public.inventory WHERE product_id = v_prod_b_id;
    ASSERT v_inv_count = 0,
        'TEST 20 FAILED: Inventory row was NOT cascaded when product was deleted';
    RAISE NOTICE '✓ TEST 20 PASSED: Deleting a product cascades to delete its inventory row (confirmed ON DELETE CASCADE)';

    -- -------------------------------------------------------------------
    -- CLEANUP TEST FIXTURES (SUCCESSFUL PATH)
    -- Explicit targeted removal of all test records created during this run.
    -- -------------------------------------------------------------------
    DELETE FROM public.orders       WHERE cart_id = v_cart_id;
    DELETE FROM public.cart_items   WHERE cart_id = v_cart_id;
    DELETE FROM public.carts        WHERE id = v_cart_id;
    DELETE FROM public.inventory    WHERE product_id IN (v_prod_id, v_prod_b_id);
    DELETE FROM public.products     WHERE id IN (v_prod_id, v_prod_b_id);
    DELETE FROM public.carry_bag_options WHERE id = v_bag_id;
    DELETE FROM public.store_locations   WHERE id = v_location_id;
    DELETE FROM public.profiles     WHERE id IN (v_admin_id, v_customer_id);
    DELETE FROM auth.users          WHERE id IN (v_admin_id, v_customer_id);

    RAISE NOTICE '=======================================================';
    RAISE NOTICE 'ALL PHASE 7 ADMIN PRODUCT & INVENTORY TESTS PASSED!';
    RAISE NOTICE '=======================================================';

EXCEPTION WHEN OTHERS THEN
    -- Transaction-Safe Error Handling:
    -- Reset JWT claims setting so session is clean
    PERFORM set_config('request.jwt.claims', '', true);

    -- Log failure message
    RAISE NOTICE 'Phase 7 test suite failed: %. Transaction rolling back; uncommitted fixture records will not persist.', SQLERRM;

    -- Re-raising the exception aborts the DO block transaction in PostgreSQL,
    -- ensuring all uncommitted fixture changes are rolled back automatically.
    RAISE;
END $$;
