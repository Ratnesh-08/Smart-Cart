/**
 * js/cart.js
 * Smart Cart AI — Cart & order operations via Supabase
 *
 * Schema tables used:
 *   carts(id, user_id, status, subtotal, carry_bag_option_id,
 *         carry_bag_quantity, carry_bag_charge, total, created_at, updated_at)
 *   cart_items(id, cart_id, product_id, quantity, unit_price,
 *              expected_weight, created_at)
 *   orders(id, order_number, user_id, cart_id, subtotal, tax,
 *          carry_bag_charge, total_amount, payment_method, status,
 *          weight_verified, created_at)
 *   order_items(id, order_id, product_id, product_name, quantity,
 *               unit_price, total_price)
 *   weight_readings(id, cart_id, expected_weight, actual_weight,
 *                   tolerance, difference[generated], verification_status,
 *                   trigger_event, created_at)
 */

import { supabaseClient, getCurrentUser } from './supabase-client.js';

// ─── Cart ─────────────────────────────────────────────────────────────────────

/**
 * Get (or create) the single active cart for the current user.
 * @returns {Promise<{cart, error}>}
 */
export async function getOrCreateActiveCart() {
  const user = await getCurrentUser();
  if (!user) return { cart: null, error: new Error('Not authenticated') };

  // Try to find an existing active cart
  const { data: existing, error: fetchError } = await supabaseClient
    .from('carts')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) return { cart: null, error: fetchError };
  if (existing)   return { cart: existing, error: null };

  // Create a new active cart
  const { data: created, error: createError } = await supabaseClient
    .from('carts')
    .insert({ user_id: user.id })
    .select()
    .single();

  return { cart: created, error: createError };
}

/**
 * Fetch the active cart with all its items and product details.
 * @returns {Promise<{cart, items, error}>}
 */
export async function getCartWithItems() {
  const { cart, error: cartError } = await getOrCreateActiveCart();
  if (cartError || !cart) return { cart: null, items: [], error: cartError };

  const { data: items, error: itemsError } = await supabaseClient
    .from('cart_items')
    .select(`
      id,
      quantity,
      unit_price,
      expected_weight,
      created_at,
      products (
        id,
        barcode,
        name,
        category,
        unit,
        image_url,
        store_locations ( location_name, aisle )
      )
    `)
    .eq('cart_id', cart.id)
    .order('created_at');

  return { cart, items: items ?? [], error: itemsError };
}

// ─── Cart Items ───────────────────────────────────────────────────────────────

/**
 * Add a product to the active cart.
 * If the product is already in the cart, increments quantity.
 * Locks price and expected_weight at the time of adding.
 *
 * @param {string} productId
 * @param {number} price          - current price from products table
 * @param {number} expectedWeight - current expected_weight from products table
 * @param {number} [quantity=1]
 * @returns {Promise<{item, error}>}
 */
export async function addToCart(productId, price, expectedWeight, quantity = 1) {
  const { cart, error: cartError } = await getOrCreateActiveCart();
  if (cartError || !cart) return { item: null, error: cartError };

  // Check if this product is already in the cart (upsert on unique constraint)
  const { data: existing } = await supabaseClient
    .from('cart_items')
    .select('id, quantity')
    .eq('cart_id', cart.id)
    .eq('product_id', productId)
    .maybeSingle();

  let item, error;

  if (existing) {
    // Increment quantity
    ({ data: item, error } = await supabaseClient
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single());
  } else {
    // Insert new row — price-lock and weight-lock at add time
    ({ data: item, error } = await supabaseClient
      .from('cart_items')
      .insert({
        cart_id: cart.id,
        product_id: productId,
        quantity,
        unit_price: price,
        expected_weight: expectedWeight,
      })
      .select()
      .single());
  }

  if (!error) await refreshCartTotals(cart.id);
  return { item, error };
}

/**
 * Update the quantity of a cart item.
 * If quantity drops to 0 or below, removes the item.
 * @param {string} cartItemId
 * @param {number} newQuantity
 * @returns {Promise<{error}>}
 */
export async function updateCartItemQuantity(cartItemId, newQuantity) {
  if (newQuantity <= 0) {
    return removeFromCart(cartItemId);
  }

  const { data: item } = await supabaseClient
    .from('cart_items')
    .select('cart_id')
    .eq('id', cartItemId)
    .single();

  const { error } = await supabaseClient
    .from('cart_items')
    .update({ quantity: newQuantity })
    .eq('id', cartItemId);

  if (!error && item) await refreshCartTotals(item.cart_id);
  return { error };
}

/**
 * Remove a specific item from the cart.
 * @param {string} cartItemId
 * @returns {Promise<{error}>}
 */
export async function removeFromCart(cartItemId) {
  const { data: item } = await supabaseClient
    .from('cart_items')
    .select('cart_id')
    .eq('id', cartItemId)
    .single();

  const { error } = await supabaseClient
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);

  if (!error && item) await refreshCartTotals(item.cart_id);
  return { error };
}

/**
 * Clear all items from the active cart (does not delete the cart).
 * @param {string} cartId
 * @returns {Promise<{error}>}
 */
export async function clearCart(cartId) {
  const { error } = await supabaseClient
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId);

  if (!error) await refreshCartTotals(cartId);
  return { error };
}

// ─── Cart Totals ──────────────────────────────────────────────────────────────

/**
 * Recompute and update the cart's subtotal and total from its items.
 * Called internally after any item mutation.
 * @param {string} cartId
 */
async function refreshCartTotals(cartId) {
  const { data: items } = await supabaseClient
    .from('cart_items')
    .select('quantity, unit_price')
    .eq('cart_id', cartId);

  const subtotal = (items ?? []).reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.unit_price), 0
  );

  // Get current carry bag charge to keep total accurate
  const { data: cart } = await supabaseClient
    .from('carts')
    .select('carry_bag_charge')
    .eq('id', cartId)
    .single();

  const carryCharge = parseFloat(cart?.carry_bag_charge ?? 0);

  await supabaseClient
    .from('carts')
    .update({
      subtotal: subtotal.toFixed(2),
      total:    (subtotal + carryCharge).toFixed(2),
    })
    .eq('id', cartId);
}

/**
 * Set carry bag selection on the active cart.
 * @param {string} cartId
 * @param {string|null} carryBagOptionId  - FK to carry_bag_options
 * @param {number}      quantity
 * @param {number}      bagPrice          - price per bag from carry_bag_options
 * @returns {Promise<{error}>}
 */
export async function setCarryBag(cartId, carryBagOptionId, quantity, bagPrice) {
  const charge = (quantity * bagPrice).toFixed(2);

  const { data: cart } = await supabaseClient
    .from('carts')
    .select('subtotal')
    .eq('id', cartId)
    .single();

  const subtotal = parseFloat(cart?.subtotal ?? 0);

  const { error } = await supabaseClient
    .from('carts')
    .update({
      carry_bag_option_id: carryBagOptionId,
      carry_bag_quantity:  quantity,
      carry_bag_charge:    charge,
      total:               (subtotal + parseFloat(charge)).toFixed(2),
    })
    .eq('id', cartId);

  return { error };
}

// ─── Weight Readings ──────────────────────────────────────────────────────────

/**
 * Fetch the most recent weight reading for a cart.
 * (ESP32 writes these via service-role key; customers only read.)
 * @param {string} cartId
 * @returns {Promise<{reading, error}>}
 */
export async function getLatestWeightReading(cartId) {
  const { data, error } = await supabaseClient
    .from('weight_readings')
    .select(`
      id,
      expected_weight,
      actual_weight,
      tolerance,
      difference,
      verification_status,
      trigger_event,
      created_at
    `)
    .eq('cart_id', cartId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return { reading: data, error };
}

/**
 * Record a new weight reading (used by checkout scale verification or hardware polling).
 * @param {string} cartId
 * @param {number} expectedWeight
 * @param {number} actualWeight
 * @param {number} [tolerance=50]
 * @param {'pending'|'verified'|'mismatch'|'error'} [status='pending']
 * @param {'item_added'|'item_removed'|'checkout_verify'|'periodic'} [triggerEvent='checkout_verify']
 * @returns {Promise<{reading, error}>}
 */
export async function recordWeightReading(cartId, expectedWeight, actualWeight, tolerance = 50, status = 'pending', triggerEvent = 'checkout_verify') {
  const { data, error } = await supabaseClient
    .from('weight_readings')
    .insert({
      cart_id: cartId,
      expected_weight: expectedWeight,
      actual_weight: actualWeight,
      tolerance: tolerance,
      verification_status: status,
      trigger_event: triggerEvent,
    })
    .select()
    .single();

  return { reading: data, error };
}


/**
 * Fetch all weight readings for a cart (for the weight history panel).
 * @param {string} cartId
 * @returns {Promise<{readings: Array, error}>}
 */
export async function getWeightReadings(cartId) {
  const { data, error } = await supabaseClient
    .from('weight_readings')
    .select(`
      id,
      expected_weight,
      actual_weight,
      tolerance,
      difference,
      verification_status,
      trigger_event,
      created_at
    `)
    .eq('cart_id', cartId)
    .order('created_at', { ascending: false });

  return { readings: data ?? [], error };
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

/**
 * Convert an active cart into an order.
 * Creates the orders row, order_items snapshot rows, and marks the cart as checked_out.
 *
 * @param {string} cartId
 * @param {'cash'|'upi'|'card'|'demo'} paymentMethod
 * @param {boolean} weightVerified
 * @returns {Promise<{order, error}>}
 */
export async function checkout(cartId, paymentMethod, weightVerified = false) {
  const user = await getCurrentUser();
  if (!user) return { order: null, error: new Error('Not authenticated') };

  // 1. Fetch cart totals
  const { data: cart, error: cartError } = await supabaseClient
    .from('carts')
    .select('subtotal, carry_bag_charge, total')
    .eq('id', cartId)
    .eq('status', 'active')
    .single();

  if (cartError || !cart) return { order: null, error: cartError ?? new Error('Cart not found') };

  const subtotal       = parseFloat(cart.subtotal);
  const carryBagCharge = parseFloat(cart.carry_bag_charge);
  const tax            = 0;                        // tax logic can be added later
  const totalAmount    = subtotal + tax + carryBagCharge;

  // 2. Fetch cart items for the snapshot
  const { data: items, error: itemsError } = await supabaseClient
    .from('cart_items')
    .select('product_id, quantity, unit_price, products(name)')
    .eq('cart_id', cartId);

  if (itemsError) return { order: null, error: itemsError };
  if (!items || items.length === 0) return { order: null, error: new Error('Cart is empty') };

  // 3. Create the order row
  const { data: order, error: orderError } = await supabaseClient
    .from('orders')
    .insert({
      user_id:          user.id,
      cart_id:          cartId,
      subtotal:         subtotal.toFixed(2),
      tax:              tax.toFixed(2),
      carry_bag_charge: carryBagCharge.toFixed(2),
      total_amount:     totalAmount.toFixed(2),
      payment_method:   paymentMethod,
      status:           'confirmed',
      weight_verified:  weightVerified,
    })
    .select()
    .single();

  if (orderError) return { order: null, error: orderError };

  // 4. Insert order_items snapshots
  const orderItems = items.map(item => ({
    order_id:     order.id,
    product_id:   item.product_id,
    product_name: item.products?.name ?? 'Unknown Product',  // snapshot
    quantity:     item.quantity,
    unit_price:   parseFloat(item.unit_price).toFixed(2),
    total_price:  (item.quantity * parseFloat(item.unit_price)).toFixed(2),
  }));

  const { error: itemsInsertError } = await supabaseClient
    .from('order_items')
    .insert(orderItems);

  if (itemsInsertError) return { order, error: itemsInsertError };

  // 5. Mark cart as checked_out
  await supabaseClient
    .from('carts')
    .update({ status: 'checked_out' })
    .eq('id', cartId);

  return { order, error: null };
}

// ─── Order History ────────────────────────────────────────────────────────────

/**
 * Fetch all orders for the current user, newest first.
 * @returns {Promise<{orders: Array, error}>}
 */
export async function getOrderHistory() {
  const user = await getCurrentUser();
  if (!user) return { orders: [], error: new Error('Not authenticated') };

  const { data, error } = await supabaseClient
    .from('orders')
    .select(`
      id,
      order_number,
      subtotal,
      tax,
      carry_bag_charge,
      total_amount,
      payment_method,
      status,
      weight_verified,
      created_at,
      order_items (
        id,
        product_name,
        quantity,
        unit_price,
        total_price
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return { orders: data ?? [], error };
}

/**
 * Fetch a single order with its items.
 * @param {string} orderId
 * @returns {Promise<{order, error}>}
 */
export async function getOrder(orderId) {
  const user = await getCurrentUser();
  if (!user) return { order: null, error: new Error('Not authenticated') };

  const { data, error } = await supabaseClient
    .from('orders')
    .select(`
      id,
      order_number,
      subtotal,
      tax,
      carry_bag_charge,
      total_amount,
      payment_method,
      status,
      weight_verified,
      created_at,
      order_items (
        id,
        product_id,
        product_name,
        quantity,
        unit_price,
        total_price
      )
    `)
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single();

  return { order: data, error };
}
