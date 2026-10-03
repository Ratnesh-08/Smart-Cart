// Smart Cart AI - Customer Start Shopping & Budget Setup View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

let selectedPresetBudget = store.budgetCap || 1500;

export function renderCustomerStartShopping() {
  const currentBudget = store.budgetCap;

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 14px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Branding Header -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="brand-icon" style="width: 28px; height: 28px; font-size: 13px;">SC</div>
          <div>
            <h2 style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.1;">SMART CART</h2>
            <span style="font-size: 10px; color: var(--cyan-hover); font-weight: 600;">SUPERMARKET RETAIL OS</span>
          </div>
        </div>
        <span class="stitch-badge badge-green" style="font-size: 10px; padding: 4px 8px;">
          ● ${store.cart.cartId} LINKED
        </span>
      </div>

      <!-- Hero Welcome Card (Dark Navy Stitch Style) -->
      <div class="stitch-card" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 18px; border-radius: 16px; border: none; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);">
        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(56, 189, 248, 0.15); padding: 3px 8px; border-radius: 99px; font-size: 10px; color: #38BDF8; font-weight: 600; margin-bottom: 8px;">
          ${getIcon('sparkles', 12)} AI-Powered Supermarket Experience
        </div>
        <h1 style="font-size: 20px; font-weight: 800; line-height: 1.2; color: #FFFFFF;">
          Smarter Shopping,<br/><span style="color: #38BDF8;">Simpler Billing.</span>
        </h1>
        <p style="font-size: 11px; color: #94A3B8; margin-top: 6px; line-height: 1.4;">
          Your intelligent shopping companion for faster, contact-free supermarket supermarket trips.
        </p>
      </div>

      <!-- Current Store Location Card -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 12px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-light);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: #E0F2FE; color: #0284C7; display: flex; align-items: center; justify-content: center;">
            ${getIcon('store', 18)}
          </div>
          <div>
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">CURRENT LOCATION</div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${store.settings.storeName}</div>
            <div style="font-size: 10px; color: var(--text-secondary);">100 Feet Road • Open until 10 PM</div>
          </div>
        </div>
        <span class="stitch-badge badge-cyan" style="font-size: 9px;">GPS Verified</span>
      </div>

      <!-- CRITICAL FLOW STEP: SET BUDGET (Matching Stitch Reference) -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 16px; border: 1px solid var(--cyan-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #0EA5E9;">💳</span>
            <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Trip Budget Cap</h3>
          </div>
          <span style="font-size: 18px; font-weight: 800; color: #0284C7;" id="display-selected-budget">
            ₹${currentBudget.toLocaleString()}
          </span>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
          Live alerts when approaching your limit so you never overspend.
        </p>

        <!-- Preset Budget Buttons Grid -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 10px;">
          <button class="btn-preset-budget btn-secondary ${currentBudget === 500 ? 'active' : ''}" data-val="500" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center; border-color: ${currentBudget === 500 ? '#0EA5E9' : 'var(--border-medium)'}; background: ${currentBudget === 500 ? '#E0F2FE' : '#FFFFFF'};">
            ₹500
          </button>
          <button class="btn-preset-budget btn-secondary ${currentBudget === 1000 ? 'active' : ''}" data-val="1000" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center; border-color: ${currentBudget === 1000 ? '#0EA5E9' : 'var(--border-medium)'}; background: ${currentBudget === 1000 ? '#E0F2FE' : '#FFFFFF'};">
            ₹1,000
          </button>
          <button class="btn-preset-budget btn-secondary ${currentBudget === 1500 ? 'active' : ''}" data-val="1500" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center; border-color: ${currentBudget === 1500 ? '#0EA5E9' : 'var(--border-medium)'}; background: ${currentBudget === 1500 ? '#E0F2FE' : '#FFFFFF'};">
            ₹1,500
          </button>
          <button id="btn-custom-budget" class="btn-secondary" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center;">
            Custom
          </button>
        </div>
      </div>

      <!-- Cart Highlights (Matching Stitch Screenshot) -->
      <div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;">
          Cart Highlights
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
          
          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #0284C7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${getIcon('scan', 16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Barcode Scan</div>
              <div style="font-size: 9px; color: var(--text-muted);">Instant CV item recognition</div>
            </div>
          </div>

          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #10B981; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${getIcon('weight', 16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Budget Meter</div>
              <div style="font-size: 9px; color: var(--text-muted);">Live alerts on trip spend</div>
            </div>
          </div>

          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #8B5CF6; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${getIcon('navigate', 16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Aisle Route</div>
              <div style="font-size: 9px; color: var(--text-muted);">Optimal turn-by-turn path</div>
            </div>
          </div>

          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #F59E0B; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${getIcon('bags', 16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Bag Auto-Billing</div>
              <div style="font-size: 9px; color: var(--text-muted);">Direct zero-touch checkout</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Main Action Button: ✦ START SHOPPING → (Matching Stitch Screenshot) -->
      <button id="btn-start-shopping-action" class="btn-primary" style="width: 100%; margin-top: 6px; padding: 14px; font-size: 15px; font-weight: 800; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.3); display: flex; align-items: center; justify-content: center; gap: 8px;">
        ✦ START SHOPPING →
      </button>

      <div style="text-align: center; margin-top: -4px;">
        <span style="font-size: 11px; color: var(--text-muted); cursor: pointer;" id="btn-how-it-works">
          ⓘ How It Works (60s Demo)
        </span>
      </div>

    </div>
  `;
}

export function bindStartShoppingEvents(container) {
  const startBtn = container.querySelector('#btn-start-shopping-action');
  const customBudgetBtn = container.querySelector('#btn-custom-budget');
  const howBtn = container.querySelector('#btn-how-it-works');

  // Preset Budget Clicks
  container.querySelectorAll('.btn-preset-budget').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.dataset.val);
      store.setBudgetCap(val);
    });
  });

  // Custom Budget Prompt
  if (customBudgetBtn) {
    customBudgetBtn.addEventListener('click', () => {
      const val = prompt('Enter your trip budget cap (₹):', store.budgetCap);
      if (val && !isNaN(val) && parseFloat(val) > 0) {
        store.setBudgetCap(parseFloat(val));
      }
    });
  }

  // START SHOPPING Action -> Navigates to HOME with state ready
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      store.showToast(`Shopping session started! Budget: ₹${store.budgetCap}`, 'success');
      store.setCustomerTab('home');
    });
  }

  if (howBtn) {
    howBtn.addEventListener('click', () => {
      alert('Smart Cart Guide:\n1. Set your budget cap\n2. Scan items using Barcode Scanner\n3. Our IoT load cell confirms weight\n4. Use Digital Map & AI Assistant\n5. Select carry bags & Pay with instant express exit!');
    });
  }
}
