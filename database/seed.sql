-- =============================================================
-- Smart Cart AI — seed.sql
-- Platform  : Supabase (PostgreSQL 15+)
-- Run this file AFTER schema.sql and rls.sql.
-- Inserts realistic demo data for an Indian supermarket.
-- NO real personal data is used.
-- =============================================================

-- =============================================================
-- 1. STORE LOCATIONS  (8 predefined zones for the digital map)
-- =============================================================
INSERT INTO store_locations (id, location_name, aisle, section, shelf, map_x, map_y)
VALUES
    ('10000000-0000-0000-0000-000000000001', 'Entrance',           'Entrance',  NULL,            NULL,      0, 0),
    ('10000000-0000-0000-0000-000000000002', 'Aisle 1 – Dairy',    'Aisle 1',   'Dairy',         'Shelf A', 1, 1),
    ('10000000-0000-0000-0000-000000000003', 'Aisle 1 – Bakery',   'Aisle 1',   'Bakery',        'Shelf B', 1, 2),
    ('10000000-0000-0000-0000-000000000004', 'Aisle 2 – Grains',   'Aisle 2',   'Grains & Pulses','Shelf A',2, 1),
    ('10000000-0000-0000-0000-000000000005', 'Aisle 2 – Spices',   'Aisle 2',   'Spices & Masala','Shelf B',2, 2),
    ('10000000-0000-0000-0000-000000000006', 'Aisle 3 – Snacks',   'Aisle 3',   'Snacks',        'Shelf A', 3, 1),
    ('10000000-0000-0000-0000-000000000007', 'Aisle 3 – Beverages','Aisle 3',   'Beverages',     'Shelf B', 3, 2),
    ('10000000-0000-0000-0000-000000000008', 'Aisle 4 – Personal Care','Aisle 4','Personal Care','Shelf A', 4, 1),
    ('10000000-0000-0000-0000-000000000009', 'Aisle 4 – Household','Aisle 4',   'Household',     'Shelf B', 4, 2),
    ('10000000-0000-0000-0000-000000000010', 'Aisle 5 – Frozen',   'Aisle 5',   'Frozen Foods',  'Shelf A', 5, 1),
    ('10000000-0000-0000-0000-000000000011', 'Aisle 5 – Packaged', 'Aisle 5',   'Packaged Foods','Shelf B', 5, 2),
    ('10000000-0000-0000-0000-000000000012', 'Aisle 6 – Baby Care','Aisle 6',   'Baby Care',     'Shelf A', 6, 1),
    ('10000000-0000-0000-0000-000000000013', 'Fresh Produce',       'Produce',   'Fruits & Veg',  'Open',    0, 3),
    ('10000000-0000-0000-0000-000000000014', 'Checkout Counter',    'Checkout',  NULL,            NULL,      7, 0);

-- =============================================================
-- 2. PRODUCTS (20 Indian supermarket products)
-- =============================================================
-- expected_weight is in grams per one unit (pcs/pack/bottle)
INSERT INTO products
    (id, barcode, name, description, category, price, expected_weight, unit, location_id, is_active)
VALUES
    -- DAIRY
    ('20000000-0000-0000-0000-000000000001', '8901030864512', 'Amul Toned Milk 500 mL',
     'Pasteurised toned milk, 500 mL pouch', 'Dairy', 28.00, 510.0, '500 mL',
     '10000000-0000-0000-0000-000000000002', TRUE),

    ('20000000-0000-0000-0000-000000000002', '8901030861023', 'Amul Butter 100 g',
     'Pasteurised butter, salted, 100 g pack', 'Dairy', 55.00, 105.0, '100 g',
     '10000000-0000-0000-0000-000000000002', TRUE),

    ('20000000-0000-0000-0000-000000000003', '8906001301014', 'Nestle Dahi 400 g',
     'Fresh yogurt, 400 g cup', 'Dairy', 44.00, 415.0, '400 g',
     '10000000-0000-0000-0000-000000000002', TRUE),

    -- BAKERY
    ('20000000-0000-0000-0000-000000000004', '8901063026490', 'Britannia Bread 400 g',
     'Soft sandwich bread, 400 g loaf', 'Bakery', 42.00, 410.0, '400 g',
     '10000000-0000-0000-0000-000000000003', TRUE),

    ('20000000-0000-0000-0000-000000000005', '8901063064188', 'Britannia Marie Gold 250 g',
     'Classic tea biscuits, 250 g pack', 'Bakery', 30.00, 255.0, '250 g',
     '10000000-0000-0000-0000-000000000003', TRUE),

    -- GRAINS & PULSES
    ('20000000-0000-0000-0000-000000000006', '8906073570017', 'India Gate Basmati Rice 1 kg',
     'Premium aged basmati rice, 1 kg bag', 'Grains', 120.00, 1010.0, '1 kg',
     '10000000-0000-0000-0000-000000000004', TRUE),

    ('20000000-0000-0000-0000-000000000007', '8901058850073', 'Aashirvaad Atta 1 kg',
     'Whole wheat flour, 1 kg pack', 'Grains', 58.00, 1010.0, '1 kg',
     '10000000-0000-0000-0000-000000000004', TRUE),

    ('20000000-0000-0000-0000-000000000008', '8906014190024', 'Tata Dal Masoor 500 g',
     'Red lentils, 500 g pack', 'Pulses', 72.00, 510.0, '500 g',
     '10000000-0000-0000-0000-000000000004', TRUE),

    -- SPICES & MASALA
    ('20000000-0000-0000-0000-000000000009', '8901253001050', 'MDH Garam Masala 100 g',
     'Blended spice mix, 100 g pack', 'Spices', 55.00, 105.0, '100 g',
     '10000000-0000-0000-0000-000000000005', TRUE),

    ('20000000-0000-0000-0000-000000000010', '8901252010019', 'Catch Red Chilli Powder 200 g',
     'Ground red chilli powder, 200 g pack', 'Spices', 40.00, 205.0, '200 g',
     '10000000-0000-0000-0000-000000000005', TRUE),

    -- SNACKS
    ('20000000-0000-0000-0000-000000000011', '8901071032730', 'Lay''s Classic Salted 26 g',
     'Potato chips, classic salted, 26 g pack', 'Snacks', 20.00, 26.0, '26 g',
     '10000000-0000-0000-0000-000000000006', TRUE),

    ('20000000-0000-0000-0000-000000000012', '8906017950015', 'Haldiram''s Aloo Bhujia 200 g',
     'Traditional namkeen, 200 g pack', 'Snacks', 60.00, 205.0, '200 g',
     '10000000-0000-0000-0000-000000000006', TRUE),

    -- BEVERAGES
    ('20000000-0000-0000-0000-000000000013', '8901063141217', 'Tata Tea Premium 250 g',
     'Blended black tea, 250 g pack', 'Beverages', 130.00, 255.0, '250 g',
     '10000000-0000-0000-0000-000000000007', TRUE),

    ('20000000-0000-0000-0000-000000000014', '8901030009499', 'Nescafé Classic 50 g',
     'Instant coffee, 50 g jar', 'Beverages', 165.00, 60.0, '50 g',
     '10000000-0000-0000-0000-000000000007', TRUE),

    ('20000000-0000-0000-0000-000000000015', '8901725100038', 'Real Fruit Juice Orange 1 L',
     'Fruit drink, no added colour, 1 L Tetra Pak', 'Beverages', 95.00, 1050.0, '1 L',
     '10000000-0000-0000-0000-000000000007', TRUE),

    -- PERSONAL CARE
    ('20000000-0000-0000-0000-000000000016', '8901030002483', 'Head & Shoulders Shampoo 180 mL',
     'Anti-dandruff shampoo, 180 mL bottle', 'Personal Care', 199.00, 195.0, '180 mL',
     '10000000-0000-0000-0000-000000000008', TRUE),

    ('20000000-0000-0000-0000-000000000017', '8901396012060', 'Dettol Soap 75 g',
     'Antibacterial soap bar, 75 g', 'Personal Care', 39.00, 78.0, '75 g',
     '10000000-0000-0000-0000-000000000008', TRUE),

    ('20000000-0000-0000-0000-000000000018', '8901030987869', 'Colgate Strong Teeth 200 g',
     'Fluoride toothpaste, 200 g tube', 'Personal Care', 85.00, 215.0, '200 g',
     '10000000-0000-0000-0000-000000000008', TRUE),

    -- HOUSEHOLD
    ('20000000-0000-0000-0000-000000000019', '8901063071391', 'Vim Dishwash Bar 200 g',
     'Dishwashing bar with lime, 200 g', 'Household', 22.00, 205.0, '200 g',
     '10000000-0000-0000-0000-000000000009', TRUE),

    -- PACKAGED FOODS
    ('20000000-0000-0000-0000-000000000020', '8906002420047', 'Maggi Noodles 70 g',
     'Masala instant noodles, 70 g pack', 'Packaged Foods', 14.00, 72.0, '70 g',
     '10000000-0000-0000-0000-000000000011', TRUE);

-- =============================================================
-- 3. INVENTORY — one row per product
-- =============================================================
INSERT INTO inventory (product_id, stock_quantity, is_available)
VALUES
    ('20000000-0000-0000-0000-000000000001', 120, TRUE),
    ('20000000-0000-0000-0000-000000000002',  80, TRUE),
    ('20000000-0000-0000-0000-000000000003',  60, TRUE),
    ('20000000-0000-0000-0000-000000000004',  75, TRUE),
    ('20000000-0000-0000-0000-000000000005', 100, TRUE),
    ('20000000-0000-0000-0000-000000000006',  50, TRUE),
    ('20000000-0000-0000-0000-000000000007',  90, TRUE),
    ('20000000-0000-0000-0000-000000000008',  70, TRUE),
    ('20000000-0000-0000-0000-000000000009', 110, TRUE),
    ('20000000-0000-0000-0000-000000000010',  85, TRUE),
    ('20000000-0000-0000-0000-000000000011', 200, TRUE),
    ('20000000-0000-0000-0000-000000000012', 150, TRUE),
    ('20000000-0000-0000-0000-000000000013',  45, TRUE),
    ('20000000-0000-0000-0000-000000000014',  55, TRUE),
    ('20000000-0000-0000-0000-000000000015',  65, TRUE),
    ('20000000-0000-0000-0000-000000000016',  40, TRUE),
    ('20000000-0000-0000-0000-000000000017', 130, TRUE),
    ('20000000-0000-0000-0000-000000000018',  95, TRUE),
    ('20000000-0000-0000-0000-000000000019', 180, TRUE),
    ('20000000-0000-0000-0000-000000000020', 300, TRUE);

-- =============================================================
-- 4. CARRY BAG OPTIONS
-- =============================================================
INSERT INTO carry_bag_options (name, price, is_active)
VALUES
    ('No Bag',              0.00, TRUE),
    ('Small Paper Bag',     2.00, TRUE),
    ('Large Paper Bag',     3.00, TRUE),
    ('Small Cloth Bag',     5.00, TRUE),
    ('Large Cloth Bag',     8.00, TRUE),
    ('Biodegradable Bag',   4.00, TRUE);
