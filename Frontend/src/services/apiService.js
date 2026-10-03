// Smart Cart AI - Centralized API Service Layer
// Abstracts mock/local state so it can be swapped for:
// - Backend: Node.js / Express REST API
// - Database: PostgreSQL / Supabase
// - AI: Google Gemini API Core
// - Hardware: ESP32 BLE / WiFi Mesh & HX711 Load Cell Telemetry
// - Payments: UPI / Razorpay / Stripe Gateway

import { store } from '../store/state.js';
import { askSmartCartAi as callGeminiAi } from './geminiService.js';

// Simulated network latency helper
const simulateLatency = (ms = 60) => new Promise(resolve => setTimeout(resolve, ms));

// =========================================================================
// 1. PRODUCTS API (REST: /api/v1/products)
// =========================================================================

/**
 * Fetches all supermarket products with optional search and category filters.
 * Real endpoint: GET /api/v1/products?search=&category=
 */
export async function fetchProducts(filters = {}) {
  await simulateLatency(50);
  try {
    let list = [...store.products];
    if (filters.category) {
      list = list.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.barcode.includes(q));
    }
    return { success: true, data: list, count: list.length };
  } catch (error) {
    console.error('[API Error] fetchProducts failed:', error);
    return { success: false, error: error.message, data: [] };
  }
}

/**
 * Fetches a single product by its unique identifier.
 * Real endpoint: GET /api/v1/products/:id
 */
export async function fetchProductById(id) {
  await simulateLatency(40);
  try {
    const product = store.products.find(p => p.id === id);
    if (!product) throw new Error(`Product with ID ${id} not found`);
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: error.message, data: null };
  }
}

/**
 * Looks up a product by EAN-13 barcode scanned via camera or optical scanner.
 * Real endpoint: GET /api/v1/products/barcode/:barcode
 */
export async function fetchProductByBarcode(barcode) {
  await simulateLatency(60);
  try {
    const product = store.products.find(p => p.barcode === barcode);
    if (!product) throw new Error(`No product found matching barcode ${barcode}`);
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: error.message, data: null };
  }
}

/**
 * Creates a new product catalog entry (Admin).
 * Real endpoint: POST /api/v1/products
 */
export async function createProduct(productData) {
  await simulateLatency(100);
  try {
    store.addProduct(productData);
    return { success: true, data: store.products[0], message: 'Product created successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Updates an existing product catalog entry (Admin).
 * Real endpoint: PUT /api/v1/products/:id
 */
export async function updateProduct(id, updatedFields) {
  await simulateLatency(80);
  try {
    store.updateProduct(id, updatedFields);
    const updated = store.products.find(p => p.id === id);
    return { success: true, data: updated, message: 'Product updated successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Deletes a product catalog entry (Admin).
 * Real endpoint: DELETE /api/v1/products/:id
 */
export async function deleteProduct(id) {
  await simulateLatency(80);
  try {
    store.deleteProduct(id);
    return { success: true, message: 'Product deleted' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// =========================================================================
// 2. SHOPPING CART API (REST: /api/v1/cart / WebSocket: ws://cart)
// =========================================================================

/**
 * Adds an item to the active smart cart and syncs expected scale weight.
 * Real endpoint: POST /api/v1/cart/items
 */
export async function addToCart(product, quantity = 1) {
  await simulateLatency(40);
  try {
    store.addToCart(product, quantity);
    return { success: true, cart: store.cart, summary: getCartSummary() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Updates line item quantity in cart (+1 / -1).
 * Real endpoint: PATCH /api/v1/cart/items/:id
 */
export async function updateCartQuantity(productId, delta) {
  await simulateLatency(30);
  try {
    store.updateQuantity(productId, delta);
    return { success: true, cart: store.cart, summary: getCartSummary() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Confirms removal of an item from cart.
 * Real endpoint: DELETE /api/v1/cart/items/:id
 */
export async function removeFromCart(productId) {
  await simulateLatency(40);
  try {
    store.promptRemoveItem(productId);
    store.confirmRemoveItem();
    return { success: true, cart: store.cart, summary: getCartSummary() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Returns current computed financial totals for the cart.
 */
export function getCartSummary() {
  return {
    itemCount: store.getCartItemCount(),
    items: store.cart.items,
    subtotal: store.getProductsSubtotal(),
    selectedBag: store.getSelectedBag(),
    bagQuantity: store.getBagQuantity(),
    bagTotal: store.getBagTotal(),
    discount: store.getDiscount(),
    tax: store.getTax(),
    total: store.getCartTotal(),
    budgetCap: store.budgetCap,
    remainingBudget: store.getRemainingBudget(),
    budgetStatus: store.getBudgetStatus(),
    weightVerification: store.getWeightVerificationStatus()
  };
}

// =========================================================================
// 3. CARRY BAG API (REST: /api/v1/carry-bags)
// =========================================================================

/**
 * Fetches available carry bag catalog options.
 * Real endpoint: GET /api/v1/carry-bags
 */
export async function fetchCarryBags() {
  await simulateLatency(40);
  return { success: true, data: store.carryBags };
}

/**
 * Sets selected carry bag option for current trip.
 * Real endpoint: POST /api/v1/cart/carry-bag
 */
export async function setCarryBag(bagId) {
  await simulateLatency(30);
  store.setCarryBagOption(bagId);
  return { success: true, selectedBag: store.getSelectedBag(), bagTotal: store.getBagTotal() };
}

/**
 * Updates selected carry bag quantity.
 * Real endpoint: PATCH /api/v1/cart/carry-bag/quantity
 */
export async function updateCarryBagQuantity(delta) {
  await simulateLatency(30);
  store.updateCarryBagQuantity(delta);
  return { success: true, quantity: store.getBagQuantity(), bagTotal: store.getBagTotal() };
}

// =========================================================================
// 4. CHECKOUT & ORDERS API (REST: /api/v1/orders, Payment Gateway)
// =========================================================================

/**
 * Initiates payment execution with chosen payment method (UPI / Card / NetBanking / Wallet).
 * Real endpoint: POST /api/v1/payments/process
 */
export async function processPayment(paymentMethod = 'upi') {
  await simulateLatency(120);
  try {
    const order = store.processPayment(paymentMethod);
    if (!order) throw new Error('Cart is empty, cannot process payment');
    return { success: true, data: order, message: 'Payment completed successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Fetches historical supermarket orders ledger (Admin/Customer).
 * Real endpoint: GET /api/v1/orders
 */
export async function fetchOrders() {
  await simulateLatency(50);
  return { success: true, data: store.orders, count: store.orders.length };
}

/**
 * Fetches a single order / receipt by order ID or receipt number.
 * Real endpoint: GET /api/v1/orders/:id
 */
export async function fetchOrderById(id) {
  await simulateLatency(40);
  const order = store.orders.find(o => o.id === id || o.orderNumber === id);
  if (!order) return { success: false, error: 'Order not found', data: null };
  return { success: true, data: order };
}

// =========================================================================
// 5. INVENTORY & STOCK API (REST: /api/v1/inventory)
// =========================================================================

/**
 * Updates stock levels for a product.
 * Real endpoint: PATCH /api/v1/inventory/:productId
 */
export async function updateStock(productId, newStock) {
  await simulateLatency(60);
  store.updateStock(productId, newStock);
  const p = store.products.find(item => item.id === productId);
  return { success: true, data: p };
}

/**
 * Fetches inventory summary KPIs (Healthy, Low Stock, Out of Stock).
 * Real endpoint: GET /api/v1/inventory/kpis
 */
export async function fetchInventoryStats() {
  await simulateLatency(40);
  const total = store.products.length;
  const outOfStock = store.products.filter(p => p.stock === 0).length;
  const lowStock = store.products.filter(p => p.stock > 0 && p.stock <= 20).length;
  const healthy = total - outOfStock - lowStock;
  return { success: true, data: { total, healthy, lowStock, outOfStock } };
}

// =========================================================================
// 6. IOT SMART CARTS & SENSOR TELEMETRY (REST / MQTT / WebSocket)
// =========================================================================

/**
 * Fetches fleet status of connected ESP32-HX711 smart carts.
 * Real endpoint: GET /api/v1/smart-carts
 */
export async function fetchSmartCarts() {
  await simulateLatency(50);
  return { success: true, data: store.smartCarts };
}

/**
 * Simulates incoming load cell telemetry weight update from ESP32.
 * Real protocol: MQTT message on topic `smartcart/07/telemetry`
 */
export async function syncScaleWeight(weightGrams) {
  store.setSimulatedActualWeight(weightGrams);
  return { success: true, weight: weightGrams, verification: store.getWeightVerificationStatus() };
}

// =========================================================================
// 7. AI ASSISTANT & RECOMMENDATIONS (Gemini API Integration)
// =========================================================================

/**
 * Queries conversational assistant with supermarket context.
 * Real endpoint: POST /api/v1/ai/ask (Google Gemini Flash 2.5 API)
 */
export async function askAiAssistant(userMessage) {
  return await callGeminiAi(userMessage);
}

/**
 * Fetches dynamic cross-sell recommendations based on active cart contents.
 * Real endpoint: GET /api/v1/recommendations/dynamic
 */
export async function fetchRecommendations() {
  await simulateLatency(40);
  return { success: true, data: store.getDynamicRecommendations() };
}

// =========================================================================
// 8. TRIP BUDGET API
// =========================================================================

/**
 * Sets trip budget cap and validates current spending.
 */
export async function setBudgetCap(amount) {
  store.setBudgetCap(amount);
  return { success: true, budgetCap: store.budgetCap, remaining: store.getRemainingBudget() };
}

// =========================================================================
// 9. SYSTEM SETTINGS API (REST: /api/v1/settings)
// =========================================================================

/**
 * Fetches store system settings.
 */
export async function fetchSettings() {
  await simulateLatency(30);
  return { success: true, data: store.settings };
}

/**
 * Updates store system configuration.
 */
export async function updateSettings(newSettings) {
  await simulateLatency(60);
  store.updateSettings(newSettings);
  return { success: true, data: store.settings };
}
