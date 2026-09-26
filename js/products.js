/**
 * js/products.js
 * Smart Cart AI — Product & inventory data via Supabase
 *
 * All queries match the schema exactly:
 *   products(id, barcode, name, description, category, price,
 *            expected_weight, unit, location_id, image_url, is_active)
 *   inventory(id, product_id, stock_quantity, is_available, updated_at)
 *   store_locations(id, location_name, aisle, section, shelf, map_x, map_y, is_active)
 */

import { supabaseClient } from './supabase-client.js';

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * Fetch all active products, optionally joined with their store location.
 * RLS: customers see is_active = true only.
 * @returns {Promise<{products: Array, error}>}
 */
export async function getActiveProducts() {
  const { data, error } = await supabaseClient
    .from('products')
    .select(`
      id,
      barcode,
      name,
      description,
      category,
      price,
      expected_weight,
      unit,
      image_url,
      location_id,
      store_locations (
        id,
        location_name,
        aisle,
        section,
        shelf,
        map_x,
        map_y
      )
    `)
    .eq('is_active', true)
    .order('category')
    .order('name');

  return { products: data ?? [], error };
}

/**
 * Fetch a single product by its barcode.
 * Used by the barcode scanner after a scan event.
 * @param {string} barcode
 * @returns {Promise<{product, error}>}
 */
export async function getProductByBarcode(barcode) {
  const { data, error } = await supabaseClient
    .from('products')
    .select(`
      id,
      barcode,
      name,
      description,
      category,
      price,
      expected_weight,
      unit,
      image_url,
      location_id,
      store_locations (
        id,
        location_name,
        aisle,
        section,
        shelf,
        map_x,
        map_y
      )
    `)
    .eq('barcode', barcode)
    .eq('is_active', true)
    .maybeSingle();

  return { product: data, error };
}

/**
 * Fetch a single product by its UUID.
 * @param {string} productId
 * @returns {Promise<{product, error}>}
 */
export async function getProductById(productId) {
  const { data, error } = await supabaseClient
    .from('products')
    .select(`
      id,
      barcode,
      name,
      description,
      category,
      price,
      expected_weight,
      unit,
      image_url,
      location_id,
      store_locations (
        id,
        location_name,
        aisle,
        section,
        shelf,
        map_x,
        map_y
      )
    `)
    .eq('id', productId)
    .eq('is_active', true)
    .maybeSingle();

  return { product: data, error };
}

/**
 * Fetch products by category.
 * @param {string} category - e.g. 'Dairy', 'Snacks'
 * @returns {Promise<{products: Array, error}>}
 */
export async function getProductsByCategory(category) {
  const { data, error } = await supabaseClient
    .from('products')
    .select(`
      id, barcode, name, description, category,
      price, expected_weight, unit, image_url, location_id,
      store_locations ( location_name, aisle, section, shelf )
    `)
    .eq('is_active', true)
    .eq('category', category)
    .order('name');

  return { products: data ?? [], error };
}

/**
 * Search active products by name (case-insensitive partial match).
 * @param {string} query
 * @returns {Promise<{products: Array, error}>}
 */
export async function searchProducts(query) {
  const { data, error } = await supabaseClient
    .from('products')
    .select(`
      id, barcode, name, description, category,
      price, expected_weight, unit, image_url, location_id,
      store_locations ( location_name, aisle, section, shelf, map_x, map_y )
    `)
    .eq('is_active', true)
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(20);

  return { products: data ?? [], error };
}

/**
 * Get the list of distinct active categories.
 * @returns {Promise<{categories: string[], error}>}
 */
export async function getCategories() {
  const { data, error } = await supabaseClient
    .from('products')
    .select('category')
    .eq('is_active', true)
    .order('category');

  if (error) return { categories: [], error };
  const unique = [...new Set(data.map(r => r.category))];
  return { categories: unique, error: null };
}

// ─── Inventory ────────────────────────────────────────────────────────────────

/**
 * Check inventory availability for a product.
 * @param {string} productId
 * @returns {Promise<{inventory, error}>}
 */
export async function getInventory(productId) {
  const { data, error } = await supabaseClient
    .from('inventory')
    .select('product_id, stock_quantity, is_available, updated_at')
    .eq('product_id', productId)
    .maybeSingle();

  return { inventory: data, error };
}

// ─── Store Locations ──────────────────────────────────────────────────────────

/**
 * Fetch all active store locations, ordered for the digital map display.
 * @returns {Promise<{locations: Array, error}>}
 */
export async function getStoreLocations() {
  const { data, error } = await supabaseClient
    .from('store_locations')
    .select('id, location_name, aisle, section, shelf, map_x, map_y')
    .eq('is_active', true)
    .order('map_y')
    .order('map_x');

  return { locations: data ?? [], error };
}

/**
 * Find which store location a product is in.
 * Returns the location row joined from store_locations.
 * @param {string} productName
 * @returns {Promise<{location, error}>}
 */
export async function findProductLocation(productName) {
  const { data, error } = await supabaseClient
    .from('products')
    .select(`
      name,
      store_locations (
        id, location_name, aisle, section, shelf, map_x, map_y
      )
    `)
    .eq('is_active', true)
    .ilike('name', `%${productName}%`)
    .limit(1)
    .maybeSingle();

  return {
    location: data?.store_locations ?? null,
    productName: data?.name ?? null,
    error,
  };
}

// ─── Carry Bag Options ────────────────────────────────────────────────────────

/**
 * Fetch all active carry bag options for the checkout screen.
 * Matches schema: carry_bag_options(id, name, price, is_active)
 * @returns {Promise<{bags: Array, error}>}
 */
export async function getCarryBagOptions() {
  const { data, error } = await supabaseClient
    .from('carry_bag_options')
    .select('id, name, price')
    .eq('is_active', true)
    .order('price');

  return { bags: data ?? [], error };
}
