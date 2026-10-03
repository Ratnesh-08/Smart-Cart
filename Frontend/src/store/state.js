// Smart Cart AI - Reactive Centralized Store
import {
  INITIAL_PRODUCTS,
  INITIAL_LOCATIONS,
  INITIAL_CARRY_BAGS,
  INITIAL_SMART_CARTS,
  INITIAL_ORDERS,
  INITIAL_AI_RECOMMENDATIONS
} from '../data/seedData.js';

class SmartCartStore {
  constructor() {
    this.listeners = new Set();
    this.loadInitialState();
  }

  loadInitialState() {
    const savedProducts = localStorage.getItem('sc_products');
    const savedCart = localStorage.getItem('sc_customer_cart');
    const savedOrders = localStorage.getItem('sc_orders');
    const savedBags = localStorage.getItem('sc_bags');
    const savedTolerance = localStorage.getItem('sc_weight_tolerance');
    const savedBudget = localStorage.getItem('sc_budget_cap');
    const savedRecs = localStorage.getItem('sc_ai_recs');

    this.products = (savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS).map(p => {
      const parts = p.locationName ? p.locationName.split('–') : ['Aisle 1', 'Shelf A'];
      const aisle = p.aisle || (parts[0] ? parts[0].trim() : 'Aisle 1');
      const shelf = p.shelf || (parts[1] ? parts[1].trim() : 'Shelf A');
      return {
        id: p.id,
        name: p.name,
        barcode: p.barcode,
        price: parseFloat(p.price),
        category: p.category,
        image: p.image,
        stock: p.stock !== undefined ? parseInt(p.stock) : 50,
        aisle: aisle,
        shelf: shelf,
        unit: p.unit || '1 unit',
        expectedWeight: parseFloat(p.expectedWeight || 200.0),
        description: p.description || '',
        locationId: p.locationId || 'loc-2',
        locationName: p.locationName || `${aisle} – ${shelf}`,
        isActive: p.isActive !== undefined ? p.isActive : true,
        discount: parseFloat(p.discount || 0),
        tax: parseFloat(p.tax || 5.0)
      };
    });

    this.locations = INITIAL_LOCATIONS;
    
    // Carry Bags Catalog: id, name, price, stock, enabled (with inventory/isEnabled backward compat)
    this.carryBags = savedBags ? JSON.parse(savedBags).map(b => ({
      ...b,
      stock: b.stock !== undefined ? b.stock : (b.inventory !== undefined ? b.inventory : 100),
      inventory: b.inventory !== undefined ? b.inventory : (b.stock !== undefined ? b.stock : 100),
      enabled: b.enabled !== undefined ? b.enabled : (b.isEnabled !== undefined ? b.isEnabled : true),
      isEnabled: b.isEnabled !== undefined ? b.isEnabled : (b.enabled !== undefined ? b.enabled : true)
    })) : [
      { id: 'bag-none', name: 'No Bag', price: 0.00, stock: 9999, inventory: 9999, enabled: true, isEnabled: true, description: 'Bring your own bag / carry items' },
      { id: 'bag-paper-small', name: 'Paper Bag', price: 5.00, stock: 450, inventory: 450, enabled: true, isEnabled: true, description: 'Eco-friendly • Holds up to 5kg' },
      { id: 'bag-paper-large', name: 'Large Paper Bag', price: 10.00, stock: 280, inventory: 280, enabled: true, isEnabled: true, description: 'High strength • Holds up to 10kg' },
      { id: 'bag-reusable', name: 'Reusable Bag', price: 25.00, stock: 150, inventory: 150, enabled: true, isEnabled: true, description: 'Heavy duty washable cotton bag' }
    ];

    this.smartCarts = INITIAL_SMART_CARTS;
    this.orders = savedOrders ? JSON.parse(savedOrders) : INITIAL_ORDERS;
    this.aiRecommendations = savedRecs ? JSON.parse(savedRecs) : INITIAL_AI_RECOMMENDATIONS;

    // Budget Cap State
    this.budgetCap = savedBudget ? parseFloat(savedBudget) : 1500.0;

    // Customer navigation state
    this.activeRole = 'customer'; // 'customer' | 'admin'
    this.customerTab = 'home';
    this.adminTab = 'dashboard';

    // Active product & order states
    this.selectedProduct = this.products[0];
    this.navTargetProductId = 'p-6';
    this.lastCompletedOrder = null;

    // Customer live shopping cart
    this.cart = savedCart ? JSON.parse(savedCart) : {
      cartId: 'CART #07',
      items: [
        { ...INITIAL_PRODUCTS[0], quantity: 1, addedAt: new Date().toISOString() }, // Amul Milk (₹68)
        { ...INITIAL_PRODUCTS[5], quantity: 1, addedAt: new Date().toISOString() }, // Basmati Rice (₹90)
        { ...INITIAL_PRODUCTS[7], quantity: 1, addedAt: new Date().toISOString() }  // Toor Dal (₹75)
      ],
      selectedBagId: 'bag-paper-large',
      selectedBagQuantity: 1,
      simulatedActualWeight: 2030.0,
      toleranceGrams: savedTolerance ? parseFloat(savedTolerance) : 50.0
    };

    // Store settings
    this.settings = {
      storeName: 'SuperMart — Hazratganj',
      storeAddress: '100 Feet Road, Hazratganj, Lucknow',
      weightToleranceGrams: savedTolerance ? parseFloat(savedTolerance) : 50.0,
      enableLoadCellSimulation: true,
      currencySymbol: '₹',
      supabaseUrl: localStorage.getItem('sc_supabase_url') || 'https://xyzcompany.supabase.co',
      supabaseKey: localStorage.getItem('sc_supabase_key') || 'anon-public-key-placeholder'
    };

    // UI state
    this.toast = null;
    this.scannerState = 'idle';
    this.scannedProduct = null;
    this.itemToRemove = null;
    this.selectedPaymentMethod = 'upi';
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
    this.persist();
  }

  persist() {
    localStorage.setItem('sc_products', JSON.stringify(this.products));
    localStorage.setItem('sc_customer_cart', JSON.stringify(this.cart));
    localStorage.setItem('sc_orders', JSON.stringify(this.orders));
    localStorage.setItem('sc_bags', JSON.stringify(this.carryBags));
    localStorage.setItem('sc_ai_recs', JSON.stringify(this.aiRecommendations));
    localStorage.setItem('sc_budget_cap', this.budgetCap.toString());
    localStorage.setItem('sc_weight_tolerance', this.settings.weightToleranceGrams.toString());
  }

  // --- Financial Computations ---
  getProductsSubtotal() {
    return this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getSelectedBag() {
    return this.carryBags.find(b => b.id === this.cart.selectedBagId) || this.carryBags[0];
  }

  getBagQuantity() {
    if (this.cart.selectedBagId === 'bag-none') return 0;
    return Math.max(1, parseInt(this.cart.selectedBagQuantity || 1));
  }

  getBagTotal() {
    const bag = this.getSelectedBag();
    if (!bag || bag.id === 'bag-none') return 0;
    return bag.price * this.getBagQuantity();
  }

  getDiscount() {
    return 0.00;
  }

  getTax() {
    const subtotal = this.getProductsSubtotal();
    return Math.round((subtotal * 0.05) * 100) / 100;
  }

  getCartTotal() {
    const subtotal = this.getProductsSubtotal();
    const bagTotal = this.getBagTotal();
    const discount = this.getDiscount();
    const tax = this.getTax();
    return Math.round((subtotal + bagTotal - discount + tax) * 100) / 100;
  }

  getAmountSpent() {
    return this.getCartTotal();
  }

  getRemainingBudget() {
    const spent = this.getAmountSpent();
    return Math.round((this.budgetCap - spent) * 100) / 100;
  }

  getBudgetProgressPercentage() {
    const spent = this.getAmountSpent();
    return Math.min(100, Math.round((spent / (this.budgetCap || 1)) * 100));
  }

  getBudgetStatus() {
    const remaining = this.getRemainingBudget();
    const pct = this.getBudgetProgressPercentage();

    if (remaining < 0) {
      return {
        state: 'exceeded',
        label: `⚠️ Budget Exceeded by ₹${Math.abs(remaining).toFixed(2)}!`,
        color: 'text-red-700',
        bg: 'bg-red-50 border-red-300',
        badge: 'EXCEEDED'
      };
    } else if (pct >= 80 || remaining <= 150) {
      return {
        state: 'warning',
        label: `⚠️ Nearing Budget Limit! Only ₹${remaining.toFixed(2)} left.`,
        color: 'text-amber-800',
        bg: 'bg-amber-50 border-amber-300',
        badge: 'NEAR LIMIT'
      };
    } else {
      return {
        state: 'normal',
        label: `Within Budget Cap (₹${remaining.toFixed(2)} remaining)`,
        color: 'text-emerald-700',
        bg: 'bg-emerald-50 border-emerald-200',
        badge: 'ON TRACK'
      };
    }
  }

  setBudgetCap(newCap) {
    this.budgetCap = Math.max(100, parseFloat(newCap));
    this.showToast(`Budget cap set to ₹${this.budgetCap}`, 'success');
    this.notify();
  }

  getCartItemCount() {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getDynamicRecommendations() {
    const cartIds = new Set(this.cart.items.map(i => i.id));
    const recs = [];

    if (this.cart.items.some(i => i.name.toLowerCase().includes('milk'))) {
      const butter = this.products.find(p => p.name.toLowerCase().includes('butter') && !cartIds.has(p.id));
      if (butter) recs.push({ ...butter, reason: 'Pairs great with Milk for breakfast', tag: '+15% PAIR DEAL' });
    }

    if (this.cart.items.some(i => i.name.toLowerCase().includes('rice'))) {
      const dal = this.products.find(p => p.name.toLowerCase().includes('dal') && !cartIds.has(p.id));
      if (dal) recs.push({ ...dal, reason: 'Complete Dal-Chawal meal pairing', tag: 'BEST COMBO' });
    }

    this.products.forEach(p => {
      if (!cartIds.has(p.id) && !recs.some(r => r.id === p.id) && p.isActive) {
        recs.push({ ...p, reason: `Popular item in ${p.category} section`, tag: 'TRENDING' });
      }
    });

    return recs.slice(0, 4);
  }

  getAiContext() {
    return {
      storeName: this.settings.storeName,
      cartId: this.cart.cartId,
      items: this.cart.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price, location: i.locationName })),
      itemCount: this.getCartItemCount(),
      spent: this.getAmountSpent(),
      budgetCap: this.budgetCap,
      remaining: this.getRemainingBudget(),
      productsCatalog: this.products.map(p => ({ name: p.name, price: p.price, category: p.category, location: p.locationName, stock: p.stock }))
    };
  }

  // --- Cart Actions ---
  addToCart(product, quantity = 1) {
    const qtyToAdd = Math.max(1, parseInt(quantity));
    const existingIndex = this.cart.items.findIndex(i => i.id === product.id);
    if (existingIndex >= 0) {
      this.cart.items[existingIndex].quantity += qtyToAdd;
    } else {
      this.cart.items.push({
        ...product,
        quantity: qtyToAdd,
        addedAt: new Date().toISOString()
      });
    }

    const newExpected = this.getExpectedWeight();
    const variance = (Math.random() * 4 - 2);
    this.cart.simulatedActualWeight = Math.round((newExpected + variance) * 10) / 10;

    const remaining = this.getRemainingBudget();
    if (remaining < 0) {
      this.showToast(`⚠️ Budget Exceeded! Total: ₹${this.getCartTotal().toFixed(2)} / Cap: ₹${this.budgetCap}`, 'error');
    } else {
      this.showToast(`Added ${qtyToAdd}x ${product.name} (₹${(product.price * qtyToAdd).toFixed(2)})`, 'success');
    }

    this.notify();
  }

  updateQuantity(productId, delta) {
    const item = this.cart.items.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.promptRemoveItem(productId);
      return;
    }

    const newExpected = this.getExpectedWeight();
    const variance = (Math.random() * 4 - 2);
    this.cart.simulatedActualWeight = Math.round((newExpected + variance) * 10) / 10;
    this.notify();
  }

  promptRemoveItem(productId) {
    const item = this.cart.items.find(i => i.id === productId);
    if (item) {
      this.itemToRemove = item;
      this.notify();
    }
  }

  confirmRemoveItem() {
    if (this.itemToRemove) {
      const name = this.itemToRemove.name;
      this.cart.items = this.cart.items.filter(i => i.id !== this.itemToRemove.id);
      this.itemToRemove = null;

      const newExpected = this.getExpectedWeight();
      const variance = (Math.random() * 4 - 2);
      this.cart.simulatedActualWeight = Math.round((newExpected + variance) * 10) / 10;

      this.showToast(`Removed ${name} from cart`, 'info');
      this.notify();
    }
  }

  cancelRemoveItem() {
    this.itemToRemove = null;
    this.notify();
  }

  setCarryBagOption(bagId) {
    this.cart.selectedBagId = bagId;
    if (bagId === 'bag-none') {
      this.cart.selectedBagQuantity = 0;
    } else if (!this.cart.selectedBagQuantity || this.cart.selectedBagQuantity < 1) {
      this.cart.selectedBagQuantity = 1;
    }
    const bag = this.getSelectedBag();
    this.showToast(`Carry bag: ${bag.name}`, 'info');
    this.notify();
  }

  updateCarryBagQuantity(delta) {
    if (this.cart.selectedBagId === 'bag-none') return;
    const current = Math.max(1, parseInt(this.cart.selectedBagQuantity || 1));
    const updated = current + delta;
    if (updated <= 0) {
      this.cart.selectedBagId = 'bag-none';
      this.cart.selectedBagQuantity = 0;
    } else {
      this.cart.selectedBagQuantity = updated;
    }
    this.notify();
  }

  setSimulatedActualWeight(weightGrams) {
    this.cart.simulatedActualWeight = parseFloat(weightGrams);
    this.notify();
  }

  processPayment(paymentMethod = 'upi') {
    if (this.cart.items.length === 0) {
      this.showToast('Your cart is empty', 'error');
      return null;
    }

    this.selectedPaymentMethod = paymentMethod;
    const verification = this.getWeightVerificationStatus();
    const bag = this.getSelectedBag();
    const bagQty = this.getBagQuantity();
    const subtotal = this.getProductsSubtotal();
    const tax = this.getTax();
    const totalAmount = this.getCartTotal();

    const orderNumber = `SC-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).substring(2,7).toUpperCase()}`;
    const txnId = `TXN-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      txnId,
      customerName: 'Alex Sharma',
      customerPhone: '+91 98765 43210',
      cartId: this.cart.cartId,
      items: this.cart.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: Math.round(item.price * item.quantity * 100) / 100
      })),
      subtotal,
      discount: this.getDiscount(),
      tax,
      carryBagName: bagQty > 0 ? `${bag.name}` : 'No Bag',
      carryBagQuantity: bagQty,
      carryBagCharge: this.getBagTotal(),
      totalAmount,
      paymentMethod,
      status: 'paid',
      weightVerified: verification.status === 'verified',
      createdAt: new Date().toLocaleString()
    };

    // Deduct inventory
    this.cart.items.forEach(item => {
      const prod = this.products.find(p => p.id === item.id);
      if (prod) prod.stock = Math.max(0, prod.stock - item.quantity);
    });

    // Deduct bag inventory
    if (bag && bag.id !== 'bag-none') {
      bag.inventory = Math.max(0, bag.inventory - bagQty);
    }

    this.orders.unshift(newOrder);
    this.lastCompletedOrder = newOrder;

    this.cart.items = [];
    this.cart.simulatedActualWeight = 0;
    
    this.customerTab = 'payment-success';
    this.notify();

    return newOrder;
  }

  checkoutCart(paymentMethod = 'upi') {
    return this.processPayment(paymentMethod);
  }

  // --- Admin CRUD Actions ---
  addProduct(newProd) {
    const id = `p-${Date.now()}`;
    const parts = newProd.locationName ? newProd.locationName.split('–') : ['Aisle 1', 'Shelf A'];
    const aisle = newProd.aisle || (parts[0] ? parts[0].trim() : 'Aisle 1');
    const shelf = newProd.shelf || (parts[1] ? parts[1].trim() : 'Shelf A');
    const product = {
      ...newProd,
      id,
      name: newProd.name || 'New Item',
      barcode: newProd.barcode || `${Math.floor(8900000000000 + Math.random() * 99999999999)}`,
      category: newProd.category || 'General',
      price: parseFloat(newProd.price || 0),
      discount: parseFloat(newProd.discount || 0),
      tax: parseFloat(newProd.tax || 5.0),
      expectedWeight: parseFloat(newProd.expectedWeight || 200.0),
      stock: parseInt(newProd.stock !== undefined ? newProd.stock : 50),
      aisle: aisle,
      shelf: shelf,
      locationName: newProd.locationName || `${aisle} – ${shelf}`,
      isActive: true,
      image: newProd.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      description: newProd.description || ''
    };
    this.products.unshift(product);
    this.showToast(`Product "${product.name}" added`, 'success');
    this.notify();
  }

  updateProduct(productId, updatedFields) {
    const index = this.products.findIndex(p => p.id === productId);
    if (index >= 0) {
      const existing = this.products[index];
      const aisle = updatedFields.aisle || existing.aisle;
      const shelf = updatedFields.shelf || existing.shelf;
      const newPrice = updatedFields.price !== undefined ? parseFloat(updatedFields.price) : existing.price;
      
      this.products[index] = {
        ...existing,
        ...updatedFields,
        price: newPrice,
        discount: updatedFields.discount !== undefined ? parseFloat(updatedFields.discount) : existing.discount,
        tax: updatedFields.tax !== undefined ? parseFloat(updatedFields.tax) : existing.tax,
        expectedWeight: updatedFields.expectedWeight !== undefined ? parseFloat(updatedFields.expectedWeight) : existing.expectedWeight,
        stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock) : existing.stock,
        aisle: aisle,
        shelf: shelf
      };

      // Changing a product's price or attributes affects the customer cart data immediately
      const cartItem = this.cart.items.find(i => i.id === productId);
      if (cartItem) {
        cartItem.price = newPrice;
        if (updatedFields.name !== undefined) cartItem.name = updatedFields.name;
        if (updatedFields.expectedWeight !== undefined) cartItem.expectedWeight = parseFloat(updatedFields.expectedWeight);
        if (updatedFields.image !== undefined) cartItem.image = updatedFields.image;
        if (updatedFields.unit !== undefined) cartItem.unit = updatedFields.unit;

        const newExpected = this.getExpectedWeight();
        const variance = (Math.random() * 4 - 2);
        this.cart.simulatedActualWeight = Math.round((newExpected + variance) * 10) / 10;
      }

      if (this.selectedProduct && this.selectedProduct.id === productId) {
        this.selectedProduct = this.products[index];
      }
      if (this.scannedProduct && this.scannedProduct.id === productId) {
        this.scannedProduct = this.products[index];
      }

      this.showToast('Product updated successfully', 'success');
      this.notify();
    }
  }

  deleteProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
    this.cart.items = this.cart.items.filter(i => i.id !== productId);
    if (this.selectedProduct && this.selectedProduct.id === productId) {
      this.selectedProduct = this.products[0] || null;
    }
    if (this.scannedProduct && this.scannedProduct.id === productId) {
      this.scannedProduct = this.products[0] || null;
    }
    const newExpected = this.getExpectedWeight();
    const variance = (Math.random() * 4 - 2);
    this.cart.simulatedActualWeight = Math.round((newExpected + variance) * 10) / 10;
    this.showToast('Product removed', 'success');
    this.notify();
  }

  updateStock(productId, newStock) {
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      prod.stock = Math.max(0, parseInt(newStock));
      this.showToast(`Stock updated for ${prod.name}`, 'success');
      this.notify();
    }
  }

  toggleProductStatus(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      prod.isActive = !prod.isActive;
      this.showToast(`${prod.name} is now ${prod.isActive ? 'active' : 'disabled'}`, 'info');
      this.notify();
    }
  }

  // Carry Bag Admin Management
  addCarryBag(newBag) {
    const stockVal = parseInt(newBag.stock || newBag.inventory || 100);
    const bag = {
      ...newBag,
      id: `bag-${Date.now()}`,
      name: newBag.name || 'Custom Bag',
      price: parseFloat(newBag.price || 0),
      stock: stockVal,
      inventory: stockVal,
      enabled: newBag.enabled !== undefined ? newBag.enabled : true,
      isEnabled: newBag.enabled !== undefined ? newBag.enabled : true,
      description: newBag.description || 'Supermarket carry bag'
    };
    this.carryBags.push(bag);
    this.showToast(`Bag type "${bag.name}" added`, 'success');
    this.notify();
  }

  updateCarryBag(bagId, updated) {
    const bag = this.carryBags.find(b => b.id === bagId);
    if (bag) {
      const stockVal = updated.stock !== undefined ? parseInt(updated.stock) : (updated.inventory !== undefined ? parseInt(updated.inventory) : bag.stock);
      const enabledVal = updated.enabled !== undefined ? updated.enabled : (updated.isEnabled !== undefined ? updated.isEnabled : bag.enabled);
      Object.assign(bag, updated, {
        price: updated.price !== undefined ? parseFloat(updated.price) : bag.price,
        stock: stockVal,
        inventory: stockVal,
        enabled: enabledVal,
        isEnabled: enabledVal
      });
      this.showToast(`Carry bag updated`, 'success');
      this.notify();
    }
  }

  toggleCarryBagStatus(bagId) {
    const bag = this.carryBags.find(b => b.id === bagId);
    if (bag) {
      bag.isEnabled = !bag.isEnabled;
      bag.enabled = bag.isEnabled;
      if (!bag.isEnabled && this.cart.selectedBagId === bagId) {
        this.cart.selectedBagId = 'bag-none';
        this.cart.selectedBagQuantity = 0;
      }
      this.showToast(`${bag.name} is now ${bag.isEnabled ? 'enabled' : 'disabled'}`, 'info');
      this.notify();
    }
  }

  deleteCarryBag(bagId) {
    if (bagId === 'bag-none') return;
    this.carryBags = this.carryBags.filter(b => b.id !== bagId);
    if (this.cart.selectedBagId === bagId) {
      this.cart.selectedBagId = 'bag-none';
      this.cart.selectedBagQuantity = 0;
    }
    this.showToast('Carry bag option removed', 'success');
    this.notify();
  }

  // AI Recommendation Admin Management
  addAiRecommendation(rule) {
    const newRule = {
      id: `ai-rec-${Date.now()}`,
      ...rule,
      boostPercentage: parseInt(rule.boostPercentage || 15),
      isActive: true
    };
    this.aiRecommendations.unshift(newRule);
    this.showToast(`Recommendation rule added`, 'success');
    this.notify();
  }

  deleteAiRecommendation(recId) {
    this.aiRecommendations = this.aiRecommendations.filter(r => r.id !== recId);
    this.showToast('Rule removed', 'info');
    this.notify();
  }

  // Navigators
  setRole(role) {
    this.activeRole = role;
    this.notify();
  }

  setCustomerTab(tab, extraParam = null) {
    this.customerTab = tab;
    if (extraParam) {
      if (extraParam.productId) this.navTargetProductId = extraParam.productId;
      if (extraParam.selectedProduct) this.selectedProduct = extraParam.selectedProduct;
    }
    this.notify();
  }

  openProductDetails(product) {
    this.selectedProduct = product;
    this.customerTab = 'product-details';
    this.notify();
  }

  setAdminTab(tab) {
    this.adminTab = tab;
    this.notify();
  }

  showToast(message, type = 'success') {
    this.toast = { message, type, id: Date.now() };
    this.notify();
    setTimeout(() => {
      if (this.toast && Date.now() - this.toast.id >= 3000) {
        this.toast = null;
        this.notify();
      }
    }, 3200);
  }

  getExpectedWeight() {
    return this.cart.items.reduce((sum, item) => sum + (item.expectedWeight * item.quantity), 0);
  }

  getWeightVerificationStatus() {
    const expected = this.getExpectedWeight();
    const actual = this.cart.simulatedActualWeight;
    const diff = Math.abs(actual - expected);
    const tolerance = this.settings.weightToleranceGrams;

    if (expected === 0 && actual === 0) {
      return { status: 'empty', label: 'Cart Scale Empty', diff: 0, color: 'text-slate-500', bg: 'bg-slate-100' };
    }
    if (diff <= tolerance) {
      return {
        status: 'verified',
        label: 'IoT Scale Verified (100% Weight Match)',
        diff: diff,
        expected,
        actual,
        matchPercentage: 100,
        color: 'text-emerald-700',
        bg: 'bg-emerald-50 border-emerald-200',
        badgeColor: 'bg-emerald-500'
      };
    } else {
      const isOver = actual > expected;
      return {
        status: 'mismatch',
        label: isOver ? `Weight Alert: +${Math.round(actual - expected)}g unverified item` : `Weight Alert: -${Math.round(expected - actual)}g missing item`,
        diff: diff,
        expected,
        actual,
        color: 'text-amber-800',
        bg: 'bg-amber-50 border-amber-300',
        badgeColor: 'bg-amber-500'
      };
    }
  }

  updateSettings(newSettings) {
    Object.assign(this.settings, newSettings);
    this.cart.toleranceGrams = parseFloat(newSettings.weightToleranceGrams);
    this.showToast('System settings saved', 'success');
    this.notify();
  }
}

export const store = new SmartCartStore();
