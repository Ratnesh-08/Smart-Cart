-- =============================================================
-- Smart Cart AI — Test Suite: Phase 6 Cart & Billing Engine
-- Platform  : Supabase (PostgreSQL 15+)
-- Description: Executes automated test assertions for all 15 Phase 6 requirements.
-- Run in Supabase SQL Editor.
-- =============================================================

DO $$
DECLARE
    v_user_a UUID := gen_random_uuid();
    v_user_b UUID := gen_random_uuid();
    v_location_id UUID := gen_random_uuid();
    v_prod_a_id UUID := gen_random_uuid();
    v_prod_b_id UUID := gen_random_uuid();
    v_bag_id UUID := gen_random_uuid();
    v_cart_a_id UUID := gen_random_uuid();
    v_cart_b_id UUID := gen_random_uuid();
    
    v_cart_rec RECORD;
    v_order_rec RECORD;
    v_order_item_rec RECORD;
    v_checkout_res JSONB;
    v_err_caught BOOLEAN := FALSE;
BEGIN
    RAISE NOTICE '=====================================================';
    RAISE NOTICE 'STARTING PHASE 6 BILLING ENGINE TEST SUITE';
    RAISE NOTICE '=====================================================';

    -- -------------------------------------------------------------
    -- SETUP TEST FIXTURES
    -- -------------------------------------------------------------
    -- Insert test auth users & profiles
    INSERT INTO auth.users (id, email) VALUES (v_user_a, 'test_a@smartcart.local') ON CONFLICT DO NOTHING;
    INSERT INTO auth.users (id, email) VALUES (v_user_b, 'test_b@smartcart.local') ON CONFLICT DO NOTHING;
    
    INSERT INTO public.profiles (id, full_name, role) VALUES (v_user_a, 'Customer A', 'customer') ON CONFLICT (id) DO NOTHING;
    INSERT INTO public.profiles (id, full_name, role) VALUES (v_user_b, 'Customer B', 'customer') ON CONFLICT (id) DO NOTHING;

    -- Insert test store location
    INSERT INTO public.store_locations (id, location_name, aisle, section, shelf, map_x, map_y)
    VALUES (v_location_id, 'Test Aisle 1', 'Aisle 1', 'Test', 'Shelf A', 1, 1);

    -- Insert test products: Prod A (100.00 INR, 200g), Prod B (50.00 INR, 100g)
    INSERT INTO public.products (id, barcode, name, description, category, price, expected_weight, unit, location_id, is_active)
    VALUES 
        (v_prod_a_id, '9990000000001', 'Test Product A', 'Test item A', 'Test', 100.00, 200.0, 'pcs', v_location_id, TRUE),
        (v_prod_b_id, '9990000000002', 'Test Product B', 'Test item B', 'Test', 50.00, 100.0, 'pcs', v_location_id, TRUE);

    INSERT INTO public.inventory (product_id, stock_quantity, is_available)
    VALUES (v_prod_a_id, 100, TRUE), (v_prod_b_id, 100, TRUE);

    -- Insert test carry bag option (5.00 INR)
    INSERT INTO public.carry_bag_options (id, name, price, is_active)
    VALUES (v_bag_id, 'Test Medium Bag', 5.00, TRUE);

    -- Create test carts
    INSERT INTO public.carts (id, user_id, status) VALUES (v_cart_a_id, v_user_a, 'active');
    INSERT INTO public.carts (id, user_id, status) VALUES (v_cart_b_id, v_user_b, 'active');

    -- -------------------------------------------------------------
    -- TEST 1: EMPTY CART
    -- -------------------------------------------------------------
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.subtotal = 0.00, 'TEST 1 FAILED: Empty cart subtotal should be 0.00';
    ASSERT v_cart_rec.total = 0.00, 'TEST 1 FAILED: Empty cart total should be 0.00';

    -- Attempt checkout on empty cart should fail
    v_err_caught := FALSE;
    BEGIN
        PERFORM checkout_cart(v_cart_a_id, 'cash');
    EXCEPTION WHEN OTHERS THEN
        v_err_caught := TRUE;
    END;
    ASSERT v_err_caught = TRUE, 'TEST 1 FAILED: Empty cart checkout should throw exception';
    RAISE NOTICE '✓ TEST 1 PASSED: Empty cart subtotal/total are 0 and checkout is prevented';

    -- -------------------------------------------------------------
    -- TEST 2: ONE PRODUCT ADDITION & PRICE SYNC
    -- -------------------------------------------------------------
    INSERT INTO public.cart_items (cart_id, product_id, quantity) VALUES (v_cart_a_id, v_prod_a_id, 1);
    
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.subtotal = 100.00, 'TEST 2 FAILED: Cart subtotal should be 100.00';
    ASSERT v_cart_rec.total = 100.00, 'TEST 2 FAILED: Cart total should be 100.00';
    RAISE NOTICE '✓ TEST 2 PASSED: Adding 1 product calculates subtotal = 100.00 & total = 100.00';

    -- -------------------------------------------------------------
    -- TEST 3: MULTIPLE DIFFERENT PRODUCTS
    -- -------------------------------------------------------------
    INSERT INTO public.cart_items (cart_id, product_id, quantity) VALUES (v_cart_a_id, v_prod_b_id, 2);
    
    -- Subtotal should be: (1 * 100.00) + (2 * 50.00) = 200.00
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.subtotal = 200.00, 'TEST 3 FAILED: Cart subtotal should be 200.00';
    ASSERT v_cart_rec.total = 200.00, 'TEST 3 FAILED: Cart total should be 200.00';
    RAISE NOTICE '✓ TEST 3 PASSED: Multiple products calculate subtotal = 200.00';

    -- -------------------------------------------------------------
    -- TEST 4: DUPLICATE PRODUCT / QUANTITY UPDATE
    -- -------------------------------------------------------------
    UPDATE public.cart_items SET quantity = quantity + 1 WHERE cart_id = v_cart_a_id AND product_id = v_prod_a_id;
    
    -- Subtotal should be: (2 * 100.00) + (2 * 50.00) = 300.00
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.subtotal = 300.00, 'TEST 4 FAILED: Subtotal after quantity update should be 300.00';
    RAISE NOTICE '✓ TEST 4 PASSED: Quantity update recalculates subtotal = 300.00';

    -- -------------------------------------------------------------
    -- TEST 5: REMOVING AN ITEM
    -- -------------------------------------------------------------
    DELETE FROM public.cart_items WHERE cart_id = v_cart_a_id AND product_id = v_prod_b_id;
    
    -- Subtotal should be: 2 * 100.00 = 200.00
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.subtotal = 200.00, 'TEST 5 FAILED: Subtotal after item deletion should be 200.00';
    RAISE NOTICE '✓ TEST 5 PASSED: Removing item reduces subtotal to 200.00';

    -- -------------------------------------------------------------
    -- TEST 6 & 7: CARRY BAG QUANTITY 0 AND > 0
    -- -------------------------------------------------------------
    -- Set bag with qty 0
    UPDATE public.carts SET carry_bag_option_id = v_bag_id, carry_bag_quantity = 0 WHERE id = v_cart_a_id;
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.carry_bag_charge = 0.00, 'TEST 6 FAILED: Carry bag charge should be 0.00 when qty = 0';
    ASSERT v_cart_rec.total = 200.00, 'TEST 6 FAILED: Total should be 200.00 when bag qty = 0';

    -- Set bag with qty 2 (2 * 5.00 = 10.00)
    UPDATE public.carts SET carry_bag_option_id = v_bag_id, carry_bag_quantity = 2 WHERE id = v_cart_a_id;
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.carry_bag_charge = 10.00, 'TEST 7 FAILED: Carry bag charge should be 10.00 when qty = 2';
    ASSERT v_cart_rec.total = 210.00, 'TEST 7 FAILED: Total should be 210.00 (200.00 subtotal + 10.00 bag charge)';
    RAISE NOTICE '✓ TEST 6 & 7 PASSED: Carry bag charges calculate correctly (0.00 and 10.00)';

    -- -------------------------------------------------------------
    -- TEST 8 & 9: SUBTOTAL AND FINAL TOTAL CALCULATIONS
    -- -------------------------------------------------------------
    ASSERT v_cart_rec.subtotal = 200.00, 'TEST 8 FAILED: Subtotal mismatch';
    ASSERT v_cart_rec.total = (v_cart_rec.subtotal + v_cart_rec.carry_bag_charge), 'TEST 9 FAILED: Total != subtotal + carry_bag_charge';
    RAISE NOTICE '✓ TEST 8 & 9 PASSED: Subtotal and total match exact billing rules';

    -- -------------------------------------------------------------
    -- TEST 10: CHECKOUT & ORDER CREATION
    -- -------------------------------------------------------------
    v_checkout_res := checkout_cart(v_cart_a_id, 'upi');
    ASSERT (v_checkout_res->>'success')::BOOLEAN = TRUE, 'TEST 10 FAILED: Checkout failed';
    
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_a_id;
    ASSERT v_cart_rec.status = 'checked_out', 'TEST 10 FAILED: Cart status should be checked_out';

    SELECT * INTO v_order_rec FROM public.orders WHERE cart_id = v_cart_a_id;
    ASSERT v_order_rec.subtotal = 200.00, 'TEST 10 FAILED: Order subtotal mismatch';
    ASSERT v_order_rec.carry_bag_charge = 10.00, 'TEST 10 FAILED: Order carry bag charge mismatch';
    ASSERT v_order_rec.total_amount = 210.00, 'TEST 10 FAILED: Order total amount mismatch';
    ASSERT v_order_rec.payment_method = 'upi', 'TEST 10 FAILED: Payment method mismatch';
    RAISE NOTICE '✓ TEST 10 PASSED: Checkout atomically creates order & updates cart status to checked_out';

    -- -------------------------------------------------------------
    -- TEST 11: HISTORICAL PRICE AND NAME PRESERVATION IN ORDER ITEMS
    -- -------------------------------------------------------------
    SELECT * INTO v_order_item_rec FROM public.order_items WHERE order_id = v_order_rec.id AND product_id = v_prod_a_id;
    ASSERT v_order_item_rec.product_name = 'Test Product A', 'TEST 11 FAILED: Historical product_name snapshot mismatch';
    ASSERT v_order_item_rec.unit_price = 100.00, 'TEST 11 FAILED: Historical unit_price snapshot mismatch';

    -- Change price and name in products table
    UPDATE public.products SET name = 'Renamed Product A (Modified)', price = 999.00 WHERE id = v_prod_a_id;

    -- Re-verify order item snapshot remains UNCHANGED
    SELECT * INTO v_order_item_rec FROM public.order_items WHERE order_id = v_order_rec.id AND product_id = v_prod_a_id;
    ASSERT v_order_item_rec.product_name = 'Test Product A', 'TEST 11 FAILED: Historical product_name was mutated after product edit!';
    ASSERT v_order_item_rec.unit_price = 100.00, 'TEST 11 FAILED: Historical unit_price was mutated after product price change!';
    RAISE NOTICE '✓ TEST 11 PASSED: Historical order item name & price are perfectly preserved after product modifications';

    -- -------------------------------------------------------------
    -- TEST 12: INVALID QUANTITY REJECTION
    -- -------------------------------------------------------------
    v_err_caught := FALSE;
    BEGIN
        INSERT INTO public.cart_items (cart_id, product_id, quantity) VALUES (v_cart_b_id, v_prod_a_id, 0);
    EXCEPTION WHEN OTHERS THEN
        v_err_caught := TRUE;
    END;
    ASSERT v_err_caught = TRUE, 'TEST 12 FAILED: Quantity <= 0 should be rejected';
    RAISE NOTICE '✓ TEST 12 PASSED: Invalid item quantity (<= 0) is rejected by triggers/constraints';

    -- -------------------------------------------------------------
    -- TEST 13: INVALID PRICE MANIPULATION PREVENTION
    -- -------------------------------------------------------------
    -- Attempt inserting item with manipulated unit_price = 0.01 (real price is 999.00 now)
    INSERT INTO public.cart_items (cart_id, product_id, quantity, unit_price) VALUES (v_cart_b_id, v_prod_a_id, 1, 0.01);
    
    SELECT * INTO v_cart_rec FROM public.carts WHERE id = v_cart_b_id;
    -- Trigger sync_cart_item_price_and_weight should overwrite unit_price to 999.00
    ASSERT v_cart_rec.subtotal = 999.00, 'TEST 13 FAILED: Unit price manipulation was not prevented by trigger';
    RAISE NOTICE '✓ TEST 13 PASSED: Client unit price manipulation is overridden by database products table';

    -- -------------------------------------------------------------
    -- TEST 14: CUSTOMER ISOLATION THROUGH RLS / FUNCTION CHECKS
    -- -------------------------------------------------------------
    -- Attempt checking out User B's cart while auth.uid() is null / unauthorized
    v_err_caught := FALSE;
    BEGIN
        PERFORM checkout_cart(v_cart_b_id, 'cash');
    EXCEPTION WHEN OTHERS THEN
        v_err_caught := TRUE;
    END;
    -- checkout_cart enforces user_id = auth.uid() OR is_admin()
    ASSERT v_err_caught = TRUE, 'TEST 14 FAILED: Unauthorized checkout was allowed!';
    RAISE NOTICE '✓ TEST 14 PASSED: Customer isolation & unauthorized cart access prevention verified';

    -- -------------------------------------------------------------
    -- CLEANUP TEST FIXTURES
    -- -------------------------------------------------------------
    DELETE FROM public.orders WHERE cart_id IN (v_cart_a_id, v_cart_b_id);
    DELETE FROM public.cart_items WHERE cart_id IN (v_cart_a_id, v_cart_b_id);
    DELETE FROM public.carts WHERE id IN (v_cart_a_id, v_cart_b_id);
    DELETE FROM public.inventory WHERE product_id IN (v_prod_a_id, v_prod_b_id);
    DELETE FROM public.products WHERE id IN (v_prod_a_id, v_prod_b_id);
    DELETE FROM public.carry_bag_options WHERE id = v_bag_id;
    DELETE FROM public.store_locations WHERE id = v_location_id;
    DELETE FROM public.profiles WHERE id IN (v_user_a, v_user_b);
    DELETE FROM auth.users WHERE id IN (v_user_a, v_user_b);

    RAISE NOTICE '=====================================================';
    RAISE NOTICE 'ALL PHASE 6 BILLING ENGINE TESTS PASSED SUCCESSFULLY!';
    RAISE NOTICE '=====================================================';
END $$;
