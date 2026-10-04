// Smart Cart AI - Main Frontend Application Entrypoint
import './styles/theme.css';
import { getIcon } from './components/icons.js';
import { store } from './store/state.js';

// Customer Views
import { renderCustomerStartShopping, bindStartShoppingEvents } from './views/customer/StartShoppingView.js';
import { renderCustomerHome, bindHomeEvents } from './views/customer/HomeView.js';
import { renderCustomerScan, bindScanEvents, stopScanner } from './views/customer/ScanView.js';
import { renderCustomerProductDetails, bindProductDetailsEvents } from './views/customer/ProductDetailsView.js';
import { renderCustomerNavigate, bindNavigateEvents } from './views/customer/NavigateView.js';
import { renderCustomerAi, bindAiEvents } from './views/customer/AiView.js';
import { renderCustomerCart, bindCartEvents } from './views/customer/CartView.js';
import {
  renderFinalBillReview, bindFinalBillReviewEvents,
  renderPaymentScreen, bindPaymentScreenEvents,
  renderPaymentSuccessScreen, bindPaymentSuccessEvents,
  renderDigitalReceiptScreen, bindDigitalReceiptEvents
} from './views/customer/CheckoutFlowView.js';

// Admin Views
import { renderAdminDashboard, bindAdminDashboardEvents } from './views/admin/DashboardView.js';
import { renderAdminProducts, bindAdminProductsEvents } from './views/admin/ProductsView.js';
import { renderAdminInventory, bindAdminInventoryEvents } from './views/admin/InventoryView.js';
import { renderAdminStoreMap, bindAdminStoreMapEvents } from './views/admin/StoreMapView.js';
import { renderAdminSmartCarts, bindAdminSmartCartsEvents } from './views/admin/SmartCartsView.js';
import { renderAdminOrders, bindAdminOrdersEvents } from './views/admin/OrdersView.js';
import { renderAdminAiRecommendations, bindAdminAiRecommendationsEvents } from './views/admin/AiRecommendationsView.js';
import { renderAdminCarryBags, bindAdminCarryBagsEvents } from './views/admin/CarryBagsView.js';
import { renderAdminAnalytics, bindAdminAnalyticsEvents } from './views/admin/AnalyticsView.js';
import { renderAdminSettings, bindAdminSettingsEvents } from './views/admin/SettingsView.js';

const appEl = document.querySelector('#app');

function renderApp() {
  const isCustomer = store.activeRole === 'customer';
  const cartItemCount = store.getCartItemCount();

  if (!isCustomer) {
    stopScanner();
  }

  appEl.innerHTML = `
    <div class="app-shell">
      
      <!-- Top Navigation & Role Switcher Header -->
      <header class="top-nav">
        <div class="brand-badge">
          <div class="brand-icon">SC</div>
          <div>
            <span style="font-weight: 700; font-size: 15px; color: var(--text-primary);">SMART CART</span>
            <span style="font-size: 10px; color: var(--cyan-hover); font-weight: 600; display: block; margin-top: -3px;">AI SUPERMARKET</span>
          </div>
        </div>

        <!-- Role Mode Switcher Pill -->
        <div class="role-switcher">
          <button class="role-btn ${isCustomer ? 'active' : ''}" id="btn-mode-customer">
            📱 Customer App
          </button>
          <button class="role-btn ${!isCustomer ? 'active' : ''}" id="btn-mode-admin">
            🖥️ Admin Portal
          </button>
        </div>
      </header>

      <!-- Toast Notification Container -->
      ${store.toast ? `
        <div class="toast-container">
          <div class="toast" style="${store.toast.type === 'error' ? 'background: #991B1B;' : ''}">
            <span>${getIcon(store.toast.type === 'error' ? 'alert-triangle' : 'check-circle', 16)}</span>
            <span>${store.toast.message}</span>
          </div>
        </div>
      ` : ''}

      <!-- Main Body Container -->
      ${isCustomer ? renderCustomerShell(cartItemCount) : renderAdminShell()}

    </div>
  `;

  bindGlobalEvents();
}

// Render Customer Mobile Shell Layout
function renderCustomerShell(cartItemCount) {
  const tab = store.customerTab;
  if (tab !== 'scan') {
    stopScanner();
  }

  let contentHtml = '';
  if (tab === 'start-shopping') contentHtml = renderCustomerStartShopping();
  else if (tab === 'home') contentHtml = renderCustomerHome();
  else if (tab === 'scan') contentHtml = renderCustomerScan();
  else if (tab === 'product-details') contentHtml = renderCustomerProductDetails();
  else if (tab === 'navigate') contentHtml = renderCustomerNavigate();
  else if (tab === 'ai') contentHtml = renderCustomerAi();
  else if (tab === 'cart') contentHtml = renderCustomerCart();
  else if (tab === 'review-bill') contentHtml = renderFinalBillReview();
  else if (tab === 'payment') contentHtml = renderPaymentScreen();
  else if (tab === 'payment-success') contentHtml = renderPaymentSuccessScreen();
  else if (tab === 'receipt') contentHtml = renderDigitalReceiptScreen();

  const isCheckoutStep = ['start-shopping', 'review-bill', 'payment', 'payment-success', 'receipt'].includes(tab);

  return `
    <div class="customer-wrapper">
      
      <!-- Customer Content View -->
      <div id="customer-view-container">
        ${contentHtml}
      </div>

      <!-- Customer Bottom Navigation Bar (Hidden during full checkout steps) -->
      ${!isCheckoutStep ? `
        <nav class="customer-bottom-nav">
          <button class="nav-item ${tab === 'home' ? 'active' : ''}" data-tab="home">
            ${getIcon('home', 20)}
            <span>Home</span>
          </button>

          <button class="nav-item ${tab === 'scan' ? 'active' : ''}" data-tab="scan">
            ${getIcon('scan', 20)}
            <span>Scan</span>
          </button>

          <button class="nav-item ${tab === 'cart' ? 'active' : ''}" data-tab="cart">
            ${getIcon('cart', 20)}
            ${cartItemCount > 0 ? `<span class="nav-badge">${cartItemCount}</span>` : ''}
            <span>Cart</span>
          </button>

          <button class="nav-item ${tab === 'navigate' ? 'active' : ''}" data-tab="navigate">
            ${getIcon('navigate', 20)}
            <span>Navigate</span>
          </button>

          <button class="nav-item ${tab === 'ai' ? 'active' : ''}" data-tab="ai">
            ${getIcon('ai', 20)}
            <span>AI</span>
          </button>
        </nav>
      ` : ''}

    </div>
  `;
}

// Render Admin Desktop Dashboard Layout with Left Sidebar
function renderAdminShell() {
  const tab = store.adminTab;

  let contentHtml = '';
  if (tab === 'dashboard') contentHtml = renderAdminDashboard();
  else if (tab === 'products') contentHtml = renderAdminProducts();
  else if (tab === 'inventory') contentHtml = renderAdminInventory();
  else if (tab === 'store-map') contentHtml = renderAdminStoreMap();
  else if (tab === 'smart-carts') contentHtml = renderAdminSmartCarts();
  else if (tab === 'orders') contentHtml = renderAdminOrders();
  else if (tab === 'ai-recommendations') contentHtml = renderAdminAiRecommendations();
  else if (tab === 'carry-bags') contentHtml = renderAdminCarryBags();
  else if (tab === 'analytics') contentHtml = renderAdminAnalytics();
  else if (tab === 'settings') contentHtml = renderAdminSettings();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'products', label: 'Products', icon: 'products' },
    { id: 'inventory', label: 'Inventory', icon: 'inventory' },
    { id: 'store-map', label: 'Store Map', icon: 'map' },
    { id: 'smart-carts', label: 'Smart Carts', icon: 'smart-cart' },
    { id: 'orders', label: 'Orders / Bills', icon: 'orders' },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: 'recommendations' },
    { id: 'carry-bags', label: 'Carry Bags', icon: 'bags' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return `
    <div class="admin-shell">
      
      <!-- Left Sidebar -->
      <aside class="admin-sidebar">
        <div class="sidebar-title">Supermarket Admin</div>
        ${sidebarItems.map(item => `
          <button class="sidebar-item ${tab === item.id ? 'active' : ''}" data-admin-tab="${item.id}">
            ${getIcon(item.icon, 18)}
            <span>${item.label}</span>
          </button>
        `).join('')}
      </aside>

      <!-- Admin Main View Content -->
      <main class="admin-content" id="admin-view-container">
        ${contentHtml}
      </main>

    </div>
  `;
}

function bindGlobalEvents() {
  // Mode Switcher
  const custBtn = document.querySelector('#btn-mode-customer');
  const adminBtn = document.querySelector('#btn-mode-admin');

  if (custBtn) custBtn.addEventListener('click', () => store.setRole('customer'));
  if (adminBtn) adminBtn.addEventListener('click', () => store.setRole('admin'));

  // Customer Bottom Nav Tabs
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      store.setCustomerTab(btn.dataset.tab);
    });
  });

  // Admin Sidebar Nav Tabs
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      store.setAdminTab(btn.dataset.adminTab);
    });
  });

  // Bind view-specific events
  const customerContainer = document.querySelector('#customer-view-container');
  const adminContainer = document.querySelector('#admin-view-container');

  if (customerContainer) {
    const tab = store.customerTab;
    if (tab === 'start-shopping') bindStartShoppingEvents(customerContainer);
    else if (tab === 'home') bindHomeEvents(customerContainer);
    else if (tab === 'scan') bindScanEvents(customerContainer);
    else if (tab === 'product-details') bindProductDetailsEvents(customerContainer);
    else if (tab === 'navigate') bindNavigateEvents(customerContainer);
    else if (tab === 'ai') bindAiEvents(customerContainer);
    else if (tab === 'cart') bindCartEvents(customerContainer);
    else if (tab === 'review-bill') bindFinalBillReviewEvents(customerContainer);
    else if (tab === 'payment') bindPaymentScreenEvents(customerContainer);
    else if (tab === 'payment-success') bindPaymentSuccessEvents(customerContainer);
    else if (tab === 'receipt') bindDigitalReceiptEvents(customerContainer);
  }

  if (adminContainer) {
    const tab = store.adminTab;
    if (tab === 'dashboard') bindAdminDashboardEvents(adminContainer);
    else if (tab === 'products') bindAdminProductsEvents(adminContainer);
    else if (tab === 'inventory') bindAdminInventoryEvents(adminContainer);
    else if (tab === 'store-map') bindAdminStoreMapEvents(adminContainer);
    else if (tab === 'smart-carts') bindAdminSmartCartsEvents(adminContainer);
    else if (tab === 'orders') bindAdminOrdersEvents(adminContainer);
    else if (tab === 'ai-recommendations') bindAdminAiRecommendationsEvents(adminContainer);
    else if (tab === 'carry-bags') bindAdminCarryBagsEvents(adminContainer);
    else if (tab === 'analytics') bindAdminAnalyticsEvents(adminContainer);
    else if (tab === 'settings') bindAdminSettingsEvents(adminContainer);
  }
}

// Subscribe store state changes to automatically re-render UI
store.subscribe(() => {
  renderApp();
});

// Initial Render
renderApp();
