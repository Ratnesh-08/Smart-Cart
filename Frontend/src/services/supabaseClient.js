import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in frontend/.env');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
/**
 * Looks up a product by barcode in the Supabase PostgreSQL `products` table.
 * Supabase is the primary source of truth for Phase 5 barcode lookups.
 */
export async function getProductByBarcodeFromSupabase(barcode) {
  if (!barcode) {
    return { success: false, error: 'Barcode parameter is required', data: null };
  }

  const cleanedBarcode = String(barcode).trim();

  try {
    const { data, error } = await supabase
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
        location_id,
        image_url,
        is_active,
        store_locations (
          id,
          location_name,
          aisle,
          section,
          shelf
        )
      `)
      .eq('barcode', cleanedBarcode)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase Warning] Product query returned error:', error.message);
      return { success: false, error: error.message, data: null };
    }

    if (!data) {
      return {
        success: false,
        error: `No product found matching barcode ${cleanedBarcode}`,
        data: null
      };
    }

    // Format location display string
    const loc = data.store_locations;
    let locationName = 'Aisle 1 – Dairy';
    let aisle = 'Aisle 1';
    let shelf = 'Shelf A';

    if (loc) {
      locationName = loc.location_name || `${loc.aisle || 'Aisle 1'} – ${loc.shelf || 'Shelf A'}`;
      aisle = loc.aisle || 'Aisle 1';
      shelf = loc.shelf || 'Shelf A';
    }

    const formattedProduct = {
      id: data.id,
      barcode: data.barcode,
      name: data.name,
      description: data.description || '',
      category: data.category || 'General',
      price: parseFloat(data.price || 0),
      expectedWeight: parseFloat(data.expected_weight || 0),
      unit: data.unit || 'pcs',
      locationId: data.location_id || 'loc-1',
      locationName: locationName,
      aisle: aisle,
      shelf: shelf,
      image: data.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      stock: 50,
      isActive: data.is_active !== undefined ? data.is_active : true
    };

    return { success: true, data: formattedProduct };

  } catch (err) {
    console.error('[Supabase Error] getProductByBarcodeFromSupabase exception:', err);
    return { success: false, error: err.message || 'Database lookup failed', data: null };
  }
}
