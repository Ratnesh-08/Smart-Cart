-- =============================================================
-- Smart Cart AI — Migration 002: Phase 7 Admin Product & Inventory
-- Platform  : Supabase (PostgreSQL 15+)
-- Description: Adds automated inventory record creation trigger on product
--              insertion. Safe to run against an existing Phase 6 database.
--
-- What this migration does:
--   1. Creates (or replaces) the trigger function
--      auto_create_inventory_for_product()
--   2. Creates the trigger trg_auto_create_inventory on the products table
--      — only if the trigger does not already exist.
--
-- What this migration does NOT do:
--   - Does NOT drop any table, column, schema, or user data
--   - Does NOT delete any products, inventory rows, carts, or orders
--   - Does NOT truncate any table
--   - Does NOT drop any existing trigger (no DROP TRIGGER statement)
--   - Does NOT modify Phase 6 billing logic in any way
--
-- Idempotency:
--   The function uses CREATE OR REPLACE — safe to re-run.
--   The trigger is created conditionally using a DO block that checks
--   pg_trigger first, so re-running this migration on a database that
--   already has the trigger is a no-op for that step.
-- =============================================================

-- -------------------------------------------------------------
-- STEP 1: Create or replace the trigger function.
--         CREATE OR REPLACE FUNCTION is always safe to re-run.
--         SECURITY DEFINER is required so the function can INSERT
--         into `inventory` even though the calling session only has
--         INSERT permission on `products`.
--         SET search_path = public prevents search_path injection.
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION auto_create_inventory_for_product()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create the inventory row for the new product.
    -- ON CONFLICT (product_id) DO NOTHING makes the body idempotent:
    -- if an inventory row already exists for this product, this is a no-op.
    INSERT INTO public.inventory (product_id, stock_quantity, is_available)
    VALUES (NEW.id, 0, TRUE)
    ON CONFLICT (product_id) DO NOTHING;

    RETURN NEW;
END;
$$;

-- -------------------------------------------------------------
-- STEP 2: Attach the trigger to the products table.
--         PostgreSQL does not support CREATE OR REPLACE TRIGGER.
--         Instead, we use a DO block to check pg_trigger first
--         and only CREATE the trigger when it is not already present.
--         This avoids any DROP TRIGGER statement entirely.
-- -------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger t
        JOIN pg_class c ON c.oid = t.tgrelid
        WHERE t.tgname = 'trg_auto_create_inventory'
          AND c.relname = 'products'
          AND c.relnamespace = 'public'::regnamespace
    ) THEN
        CREATE TRIGGER trg_auto_create_inventory
            AFTER INSERT ON public.products
            FOR EACH ROW EXECUTE FUNCTION auto_create_inventory_for_product();
    END IF;
END;
$$;
