// Smart Cart AI - Customer Home Screen (Exact Google Stitch UI Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderCustomerHome() {
  const cartItems = store.cart.items;
  const itemCount = store.getCartItemCount();
  const spent = store.getAmountSpent();
  const budgetCap = store.budgetCap;
  const remaining = store.getRemainingBudget();
  const progressPct = store.getBudgetProgressPercentage();
  const recommendations = store.getDynamicRecommendations();

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Greeting Header & Store Location -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
            Welcome to SuperMart
          </div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">
            Good Evening, Alex 👋
          </h2>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 1px;">
            Ready to shop smart today?
          </div>
        </div>
        <div style="text-align: right;">
          <span class="stitch-badge badge-cyan" style="font-size: 10px; padding: 4px 10px;">
            📍 SuperMart — Hazratganj
          </span>
        </div>
      </div>

      <!-- Connected Cart Status Banner -->
      <div class="stitch-card" style="background: #FFFFFF; border: 1px solid var(--cyan-border); padding: 12px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: #E0F2FE; color: #0284C7; display: flex; align-items: center; justify-content: center;">
            ${getIcon('smart-cart', 20)}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${store.cart.cartId} CONNECTED</h3>
              <span style="width: 8px; height: 8px; border-radius: 99px; background: #10B981; display: inline-block;"></span>
            </div>
            <p style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • ESP32 & HX711 IoT Scale Linked</p>
          </div>
        </div>
        <button id="btn-edit-budget" style="border: none; background: transparent; font-size: 11px; color: #0EA5E9; font-weight: 600; cursor: pointer;">
          Set Budget
        </button>
      </div>

      <!-- Dark Navy Trip Budget Card (Matching Google Stitch Screenshot) -->
      <div class="stitch-card" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; border: none; padding: 16px; border-radius: 16px; box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
          <div style="font-size: 11px; color: #94A3B8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
            💳 Active Shopping Budget
          </div>
          <div style="font-size: 12px; font-weight: 600; color: #38BDF8;">
            Target: ₹${budgetCap.toLocaleString()}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 14px;">
          <div>
            <div style="font-size: 11px; color: #94A3B8;">Amount Spent</div>
            <div style="font-size: 22px; font-weight: 700; color: #FFFFFF;">
              ₹${spent.toFixed(2)}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; color: #94A3B8;">Remaining Budget</div>
            <div style="font-size: 22px; font-weight: 700; color: ${remaining > 0 ? '#34D399' : '#F87171'};">
              ₹${remaining.toFixed(2)}
            </div>
          </div>
        </div>

        <!-- Budget Usage Progress Bar -->
        <div style="width: 100%; background: rgba(255,255,255,0.15); height: 8px; border-radius: 99px; overflow: hidden; margin-bottom: 12px;">
          <div style="width: ${progressPct}%; height: 100%; background: ${progressPct > 90 ? '#EF4444' : 'linear-gradient(90deg, #38BDF8 0%, #34D399 100%)'}; border-radius: 99px; transition: width 0.3s ease;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 8px; font-size: 12px;">
          <div style="display: flex; align-items: center; gap: 6px; color: #E2E8F0;">
            ${getIcon('cart', 14)}
            <span><strong>${itemCount}</strong> ${itemCount === 1 ? 'Item' : 'Items'} in Cart</span>
          </div>
          <div style="font-weight: 700; color: #38BDF8;">
            Total: ₹${spent.toFixed(2)}
          </div>
        </div>

      </div>

      <!-- Quick Actions Grid (Scan Product, Find Product, AI) -->
      <div>
        <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.03em;">
          Quick Supermarket Actions
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          
          <button id="quick-action-scan" class="stitch-card" style="border: 1px solid var(--border-light); background: #FFFFFF; text-align: center; padding: 14px 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform 0.15s ease;">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: #0EA5E9; color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(14, 165, 233, 0.25);">
              ${getIcon('scan', 22)}
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--text-primary);">Scan Product</span>
          </button>

          <button id="quick-action-find" class="stitch-card" style="border: 1px solid var(--border-light); background: #FFFFFF; text-align: center; padding: 14px 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform 0.15s ease;">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: #F1F5F9; color: #0284C7; display: flex; align-items: center; justify-content: center;">
              ${getIcon('navigate', 22)}
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--text-primary);">Find Product</span>
          </button>

          <button id="quick-action-ai" class="stitch-card" style="border: 1px solid var(--border-light); background: #FFFFFF; text-align: center; padding: 14px 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform 0.15s ease;">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: #FAF5FF; color: #9333EA; border: 1px solid #E9D5FF; display: flex; align-items: center; justify-content: center;">
              ${getIcon('sparkles', 22)}
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--text-primary);">AI Assistant</span>
          </button>

        </div>
      </div>

      <!-- Smart Suggestions / Recommended Products (Matching Stitch Screenshot) -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <span style="color: #0EA5E9;">✨ Smart Suggestions</span>
          </h3>
          <span style="font-size: 11px; color: var(--cyan-hover); font-weight: 600;">Based on Budget</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;" id="recommendations-list">
          ${recommendations.map(p => `
            <div class="stitch-card btn-open-details" data-id="${p.id}" style="padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${p.image}" alt="${p.name}" style="width: 46px; height: 46px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0;"/>
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="stitch-badge badge-cyan" style="font-size: 9px; padding: 2px 6px;">${p.tag}</span>
                    <span style="font-size: 10px; color: var(--text-muted);">${p.locationName.split('–')[0]}</span>
                  </div>
                  <h4 style="font-size: 12px; font-weight: 700; margin-top: 2px;">${p.name}</h4>
                  <div style="font-size: 11px; color: var(--text-secondary);">₹${p.price.toFixed(2)} • ${p.unit}</div>
                </div>
              </div>

              <button class="btn-primary btn-add-rec" data-id="${p.id}" style="padding: 6px 12px; font-size: 11px; font-weight: 700; border-radius: 8px; background: #0F172A; white-space: nowrap;">
                + ADD
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Current / Recent In-Cart Items (Matching Stitch Screenshot) -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-size: 14px; font-weight: 700;">In-Cart Items (${itemCount})</h3>
          <button id="btn-view-full-cart" style="border: none; background: transparent; font-size: 11px; color: var(--cyan-hover); font-weight: 600; cursor: pointer;">
            View Full Cart (${itemCount}) →
          </button>
        </div>

        ${cartItems.length === 0 ? `
          <div class="stitch-card" style="text-align: center; padding: 20px; color: var(--text-muted);">
            No items in cart yet. Tap <strong>Scan Product</strong> to start scanning!
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${cartItems.slice(0, 3).map(item => `
              <div class="stitch-card" style="padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;"/>
                  <div>
                    <h4 style="font-size: 12px; font-weight: 700;">${item.name}</h4>
                    <div style="font-size: 10px; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
                      <span>Qty: ${item.quantity}</span> •
                      <span class="stitch-badge badge-green" style="font-size: 8px; padding: 1px 4px;">✓ Scale Verified</span>
                    </div>
                  </div>
                </div>

                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">
                  ₹${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

    </div>
  `;
}

export function bindHomeEvents(container) {
  // Quick Actions
  const scanBtn = container.querySelector('#quick-action-scan');
  const findBtn = container.querySelector('#quick-action-find');
  const aiBtn = container.querySelector('#quick-action-ai');
  const viewCartBtn = container.querySelector('#btn-view-full-cart');
  const editBudgetBtn = container.querySelector('#btn-edit-budget');

  if (scanBtn) scanBtn.addEventListener('click', () => store.setCustomerTab('scan'));
  if (findBtn) findBtn.addEventListener('click', () => store.setCustomerTab('navigate'));
  if (aiBtn) aiBtn.addEventListener('click', () => store.setCustomerTab('ai'));
  if (viewCartBtn) viewCartBtn.addEventListener('click', () => store.setCustomerTab('cart'));

  if (editBudgetBtn) {
    editBudgetBtn.addEventListener('click', () => {
      store.setCustomerTab('start-shopping');
    });
  }

  // Add recommendation click
  container.querySelectorAll('.btn-add-rec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.dataset.id;
      const product = store.products.find(p => p.id === pId);
      if (product) store.addToCart(product, 1);
    });
  });

  // Open product details click
  container.querySelectorAll('.btn-open-details').forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.dataset.id;
      const product = store.products.find(p => p.id === pId);
      if (product) store.openProductDetails(product);
    });
  });
}
