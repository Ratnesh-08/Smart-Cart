# Smart Cart AI — Database

PostgreSQL database for the Smart Cart AI system.
Platform: **Supabase** (PostgreSQL 15+).

---

## Files

| File | Purpose | Run Order |
|------|---------|-----------|
| `schema.sql` | Creates all tables, constraints, indexes, triggers | **1st** |
| `rls.sql` | Enables Row Level Security and creates all policies | **2nd** |
| `seed.sql` | Inserts demo store locations, products, inventory, carry bag options | **3rd** |

---

## Tables

### `profiles`
Extends Supabase `auth.users`. Stores customer and admin profile information.

| Column | Description |
|--------|-------------|
| `id` | UUID — matches `auth.users.id` |
| `full_name` | Customer's display name |
| `phone` | Optional contact number |
| `role` | `customer` / `admin` / `superadmin` |
| `is_active` | Soft-disable accounts without deleting |

A database trigger (`on_auth_user_created`) automatically creates a `profiles` row whenever a new user signs up through Supabase Auth.

---

### `store_locations`
Defines the supermarket's predefined digital map zones.
**No GPS, no Bluetooth, no RFID.** The map is a sorted list of zones.

| Column | Description |
|--------|-------------|
| `location_name` | Human-readable name, e.g. "Aisle 2 – Grains" |
| `aisle` | Aisle label |
| `section` | Section within the aisle |
| `shelf` | Shelf identifier |
| `map_x` / `map_y` | Integer grid coordinates for future visual map rendering |

---

### `products`
The product catalogue. Managed exclusively by admins.

| Column | Description |
|--------|-------------|
| `barcode` | Unique barcode string — scanned by camera |
| `category` | e.g. "Dairy", "Snacks", "Beverages" |
| `price` | Current selling price in INR (≥ 0) |
| `expected_weight` | Weight per unit in **grams** — used by ESP32/HX711 for verification |
| `unit` | e.g. "500 g", "1 L", "pcs" |
| `location_id` | FK → `store_locations` — where this product sits on the map |
| `is_active` | Customers only see active products |

---

### `inventory`
One row per product. Tracks stock quantity and availability.

| Column | Description |
|--------|-------------|
| `product_id` | FK → `products` (unique — one row per product) |
| `stock_quantity` | Current stock count (≥ 0) |
| `is_available` | Quick toggle for out-of-stock items |

---

### `carry_bag_options`
Admin-managed list of carry bag types offered at checkout.

| Column | Description |
|--------|-------------|
| `name` | e.g. "Large Cloth Bag" |
| `price` | Price in INR (≥ 0) |
| `is_active` | Show/hide from customers |

---

### `carts`
One active cart per customer per shopping session.

| Column | Description |
|--------|-------------|
| `user_id` | FK → `profiles` |
| `status` | `active` / `checked_out` / `abandoned` |
| `subtotal` | Running total of cart items |
| `carry_bag_option_id` | FK → `carry_bag_options` |
| `carry_bag_quantity` | Number of bags selected |
| `carry_bag_charge` | Bag cost (quantity × bag price) |
| `total` | subtotal + carry_bag_charge |

---

### `cart_items`
Individual products added to a cart during a shopping session.

| Column | Description |
|--------|-------------|
| `cart_id` | FK → `carts` |
| `product_id` | FK → `products` |
| `quantity` | Must be > 0 |
| `unit_price` | **Price locked at time of adding** — not live product price |
| `expected_weight` | Weight locked at time of adding — used for weight verification |

A `(cart_id, product_id)` unique constraint ensures one row per product per cart.

---

### `weight_readings`
Raw weight events posted by the ESP32 + HX711 load cells.

| Column | Description |
|--------|-------------|
| `cart_id` | FK → `carts` |
| `expected_weight` | Computed from `cart_items` (sum of qty × expected_weight) |
| `actual_weight` | Raw reading from the HX711 sensor (grams) |
| `tolerance` | Acceptable variance in grams |
| `difference` | **Generated column** — `actual_weight - expected_weight` |
| `verification_status` | `pending` / `verified` / `mismatch` / `error` |
| `trigger_event` | What caused the reading: `item_added`, `item_removed`, `checkout_verify`, `periodic` |

> **ESP32 writes via the Supabase service-role key only.** See Security Notes below.

---

### `orders`
Immutable bill created at checkout. One order per cart.

| Column | Description |
|--------|-------------|
| `order_number` | Human-readable: `SC-YYYYMMDD-XXXXXX` |
| `user_id` | FK → `profiles` |
| `cart_id` | FK → `carts` (unique — one order per cart) |
| `subtotal` | Item total |
| `tax` | Tax amount in INR |
| `carry_bag_charge` | Bag cost snapshot |
| `total_amount` | Final amount paid |
| `payment_method` | `cash` / `upi` / `card` / `demo` |
| `status` | `pending` / `confirmed` / `paid` / `failed` / `refunded` |
| `weight_verified` | Whether ESP32 weight check passed at checkout |

---

### `order_items`
Snapshot of each line item on a completed order.
**Historical bills do not depend on the current product price or name.**

| Column | Description |
|--------|-------------|
| `order_id` | FK → `orders` |
| `product_id` | FK → `products` (NULLable — product can be deleted; bill is preserved) |
| `product_name` | Snapshot of name at time of purchase |
| `quantity` | Must be > 0 |
| `unit_price` | Price at time of purchase |
| `total_price` | `quantity × unit_price` stored explicitly |

---

### `feedback`
One feedback submission per completed order.

| Column | Description |
|--------|-------------|
| `user_id` | FK → `profiles` |
| `order_id` | FK → `orders` (unique — one review per order) |
| `rating` | Integer 1–5 (CHECK constraint enforced) |
| `comment` | Optional free-text |

---

## Relationships

```
profiles ──< carts ──< cart_items >── products
                  └──< weight_readings
                  └──── orders ──< order_items >── products
                                └──── feedback

products >── inventory          (1-to-1)
products >── store_locations    (many-to-1)
carry_bag_options ──< carts     (1-to-many)
```

---

## Phase 6 — Cart & Billing Engine Architecture

Phase 6 implements a 100% database-level billing and checkout engine via PostgreSQL triggers and PL/pgSQL procedures. **No Gemini AI or client-side calculation is involved in billing decisions.**

### Billing Engine Components

1. **`sync_cart_item_price_and_weight()` (Trigger)**
   - Automatically triggered `BEFORE INSERT OR UPDATE` on `cart_items`.
   - Looks up authoritative `price` and `expected_weight` from `products`.
   - Prevents client-side price tampering.

2. **`update_cart_totals(p_cart_id)` (Function & Triggers)**
   - Triggered `AFTER INSERT OR UPDATE OR DELETE` on `cart_items`, and `BEFORE UPDATE` on `carts` carry bag fields.
   - Calculates `subtotal = SUM(quantity × unit_price)`.
   - Calculates `carry_bag_charge = carry_bag_options.price × carry_bag_quantity`.
   - Calculates `total = subtotal + carry_bag_charge`.

3. **`checkout_cart(p_cart_id, p_payment_method)` (Atomic Procedure)**
   - Validates cart ownership, active status, and non-empty items.
   - Recalculates final cart subtotal, bag charge, and total amount.
   - Atomically inserts `orders` record.
   - Atomically copies items into `order_items`, creating immutable snapshots of `product_name` and `unit_price`.
   - Decrements product stock in `inventory`.
   - Marks cart status as `checked_out`.

4. **Cart RPC Helpers**
   - `add_to_cart(p_cart_id, p_product_id, p_quantity)`
   - `remove_from_cart(p_cart_id, p_product_id)`
   - `set_cart_carry_bag(p_cart_id, p_bag_option_id, p_quantity)`

---

## How to Execute in Supabase

### Full Setup (Fresh Database)

Run the files in order in the Supabase SQL Editor:
1. `schema.sql` (Creates tables, indexes, triggers, and billing engine)
2. `rls.sql` (Enables Row Level Security and RPC permissions)
3. `seed.sql` (Inserts seed locations, products, inventory, carry bags)

### Incremental Migration (Existing Database)

Run the migration script in the Supabase SQL Editor:
- `migrations/001_phase6_billing_engine.sql`

### Running Test Suite

To verify all 15 Phase 6 requirements, run:
- `tests/phase6_billing_tests.sql`

Output will display `✓ TEST N PASSED` for all test cases and report `ALL PHASE 6 BILLING ENGINE TESTS PASSED SUCCESSFULLY!`.

---

## Security Notes

### Row Level Security
RLS is **enabled on every table**. Policies enforce:

- Customers can only see and modify **their own** carts, cart items, orders, order items, and feedback.
- Customers can **read** active products, store locations, inventory availability, and carry bag options — but cannot modify any of them.
- Customers **cannot** modify product prices, expected weights, stock quantities, or store locations.
- Customers **cannot** promote themselves to admin (`role` is protected in the update policy).
- Admins (`role = 'admin'` or `'superadmin'`) have broad read/write access via the `is_admin()` helper function.
- Only a **superadmin** can change another user's role.

### ESP32 Weight Readings
The ESP32 device must write to `weight_readings` using the **Supabase service-role key**.
The service-role key bypasses RLS and should be:
- Stored securely in ESP32 firmware (flashed, not hard-coded in source files).
- **Never** placed in any frontend JavaScript, HTML, or public repository.
- **Never** stored in `schema.sql`, `rls.sql`, `seed.sql`, or this README.

### API Keys
No API keys, passwords, or secrets are stored anywhere in the `database/` folder.
Supabase credentials are configured in the frontend via environment variables or a `.env` file that is **git-ignored**.

