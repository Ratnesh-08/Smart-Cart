// Smart Cart AI - Customer Checkout Flow (Exact Google Stitch UI Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

// =========================================================================
// 1. FINAL BILL REVIEW SCREEN
// =========================================================================
export function renderFinalBillReview() {
  const cartItems = store.cart.items;
  const itemCount = store.getCartItemCount();
  const subtotal = store.getProductsSubtotal();
  const selectedBag = store.getSelectedBag();
  const bagQty = store.getBagQuantity();
  const bagTotal = store.getBagTotal();
  const discount = store.getDiscount();
  const tax = store.getTax();
  const total = store.getCartTotal();
  const budgetCap = store.budgetCap;
  const remaining = store.getRemainingBudget();
  const verification = store.getWeightVerificationStatus();

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 10px; font-weight: 700; color: #0284C7; text-transform: uppercase;">Step 1 of 2 • Pre-Payment Review</span>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Review Your Bill</h2>
        </div>
        <span class="stitch-badge badge-green">Cart #07 Verified</span>
      </div>

      <!-- IoT Scale Verification Banner -->
      <div style="background: #E0F2FE; border: 1px solid #BAE6FD; padding: 12px; border-radius: 12px; display: flex; align-items: center; gap: 10px; color: #0369A1; font-size: 11px;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: #0284C7; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ${getIcon('shield-check', 18)}
        </div>
        <div>
          <div style="font-weight: 700; font-size: 12px;">Pre-Payment IoT Weight Scale Validation</div>
          <div>Scale reading: <strong>${store.cart.simulatedActualWeight}g</strong> (100% Weight Match)</div>
        </div>
      </div>

      <!-- Supermarket Store Info Header -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="font-size: 14px; font-weight: 700;">SuperMart — Hazratganj</h3>
          <div style="font-size: 11px; color: var(--text-secondary);">100 Feet Road, Lucknow • Terminal #07</div>
        </div>
        <div style="font-size: 11px; font-weight: 600; color: var(--text-muted);">
          Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <!-- Itemized Products List -->
      <div class="stitch-card" style="background: #FFFFFF;">
        <h4 style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
          Scanned Items (${itemCount})
        </h4>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${cartItems.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 36px; height: 36px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-light);"/>
                <div>
                  <div style="font-weight: 700; color: var(--text-primary);">${item.name}</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Qty: ${item.quantity} • ₹${item.price.toFixed(2)}/unit</div>
                </div>
              </div>
              <div style="font-weight: 700; color: var(--text-primary);">
                ₹${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          `).join('')}

          ${selectedBag.id !== 'bag-none' ? `
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; border-top: 1px dashed var(--border-medium); padding-top: 6px; margin-top: 2px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #0284C7;">🛍️</span>
                <div>
                  <div style="font-weight: 700; color: #0284C7;">${selectedBag.name} (×${bagQty})</div>
                  <div style="font-size: 10px; color: var(--text-muted);">${selectedBag.description}</div>
                </div>
              </div>
              <div style="font-weight: 700; color: #0284C7;">
                ₹${bagTotal.toFixed(2)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Financial Summary Breakdown Card (Matching Stitch Layout) -->
      <div class="stitch-card" style="background: #FFFFFF;">
        <h4 style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 10px;">
          Final Financial Ledger
        </h4>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Items Subtotal (${itemCount} items)</span>
            <span style="font-weight: 600;">₹${subtotal.toFixed(2)}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Carry Bags (${selectedBag.name} × ${bagQty})</span>
            <span style="font-weight: 600; color: ${bagTotal > 0 ? '#0284C7' : 'inherit'};">₹${bagTotal.toFixed(2)}</span>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Promotional Discounts</span>
            <span style="font-weight: 600; color: #10B981;">-₹${discount.toFixed(2)}</span>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Estimated GST / Taxes (5%)</span>
            <span style="font-weight: 600;">₹${tax.toFixed(2)}</span>
          </div>

          <div style="height: 1px; background: var(--border-light); margin: 6px 0;"></div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700;">
            <span>Total Payable Amount</span>
            <span style="color: #0284C7; font-size: 20px;">₹${total.toFixed(2)}</span>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 4px; background: var(--bg-subtle); padding: 6px 10px; border-radius: 6px;">
            <span>Active Budget Cap: ₹${budgetCap.toFixed(2)}</span>
            <span class="${remaining < 0 ? 'text-red-600 font-bold' : 'text-emerald-700 font-bold'}">
              Remaining: ₹${remaining.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <!-- Buttons: EDIT CART & CONFIRM & PAY -->
      <div style="display: flex; gap: 10px; margin-top: 4px;">
        <button id="btn-edit-cart" class="btn-secondary" style="flex: 1; padding: 12px; font-size: 13px; font-weight: 700; border-radius: 12px;">
          ← EDIT CART
        </button>
        <button id="btn-confirm-pay" class="btn-primary" style="flex: 2; padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);">
          CONFIRM & PAY (₹${total.toFixed(2)}) →
        </button>
      </div>

    </div>
  `;
}

export function bindFinalBillReviewEvents(container) {
  const editBtn = container.querySelector('#btn-edit-cart');
  const confirmBtn = container.querySelector('#btn-confirm-pay');

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      store.setCustomerTab('cart');
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      store.setCustomerTab('payment');
    });
  }
}

// =========================================================================
// 2. PAYMENT SCREEN (Matching Stitch Payment Screenshot Layout)
// =========================================================================
export function renderPaymentScreen() {
  const total = store.getCartTotal();
  const itemCount = store.getCartItemCount();
  const selectedBag = store.getSelectedBag();
  const bagQty = store.getBagQuantity();
  const selectedMethod = store.selectedPaymentMethod || 'upi';

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 10px; font-weight: 700; color: #0284C7; text-transform: uppercase;">Step 2 of 2 • Payment Gateway</span>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Select Payment Mode</h2>
        </div>
        <button id="btn-back-to-review" class="btn-secondary" style="padding: 4px 8px; font-size: 11px;">
          ← Back to Review
        </button>
      </div>

      <!-- Exact Amount Banner (Matching Stitch Screenshot) -->
      <div class="stitch-card" style="background: #0F172A; color: white; border: none; padding: 16px; text-align: center; border-radius: 14px;">
        <div style="font-size: 11px; color: #94A3B8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
          TOTAL AMOUNT TO PAY
        </div>
        <div style="font-size: 28px; font-weight: 700; color: #38BDF8; margin: 4px 0;">
          ₹${total.toFixed(2)}
        </div>
        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 99px; font-size: 11px; color: #34D399;">
          ✓ ${itemCount} Items + ${bagQty} ${selectedBag.name} • Cart #07 Scale Verified
        </div>
      </div>

      <!-- Payment Accordion Options List (Matching Stitch Screenshot) -->
      <div style="display: flex; flex-direction: column; gap: 10px;" id="payment-options-list">
        
        <!-- UPI & Instant QR -->
        <div class="pay-option-card ${selectedMethod === 'upi' ? 'active-pay-card' : ''}" data-method="upi" style="background: #FFFFFF; border: 1px solid ${selectedMethod === 'upi' ? '#0EA5E9' : 'var(--border-light)'}; border-radius: 12px; padding: 14px; cursor: pointer; transition: all 0.15s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="upi" ${selectedMethod === 'upi' ? 'checked' : ''} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Popular UPI & Instant QR</div>
                <div style="font-size: 10px; color: var(--text-muted);">Google Pay, PhonePe, Paytm, or Any UPI App</div>
              </div>
            </div>
            <span class="stitch-badge badge-green" style="font-size: 9px;">Instant Unlock</span>
          </div>

          ${selectedMethod === 'upi' ? `
            <div style="margin-top: 14px; border-top: 1px solid var(--border-light); padding-top: 12px; text-align: center;">
              <div style="background: #FFFFFF; border: 2px solid var(--border-light); padding: 12px; border-radius: 12px; display: inline-block; margin-bottom: 8px;">
                <div style="width: 140px; height: 140px; background: #0F172A; border-radius: 8px; color: white; font-family: monospace; font-size: 10px; display: flex; align-items: center; justify-content: center; padding: 8px; text-align: center; line-height: 1.4;">
                  [UPI QR CODE]<br/>₹${total.toFixed(2)}<br/>SmartCart@hazratganj
                </div>
              </div>
              <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary);">Scan QR with any UPI app to pay ₹${total.toFixed(2)}</div>
            </div>
          ` : ''}
        </div>

        <!-- Credit / Debit Cards -->
        <div class="pay-option-card ${selectedMethod === 'card' ? 'active-pay-card' : ''}" data-method="card" style="background: #FFFFFF; border: 1px solid ${selectedMethod === 'card' ? '#0EA5E9' : 'var(--border-light)'}; border-radius: 12px; padding: 14px; cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="card" ${selectedMethod === 'card' ? 'checked' : ''} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Credit / Debit Cards</div>
                <div style="font-size: 10px; color: var(--text-muted);">Visa, MasterCard, RuPay, HDFC Premium</div>
              </div>
            </div>
            <span style="font-size: 11px; font-weight: 600;">💳</span>
          </div>
        </div>

        <!-- Net Banking -->
        <div class="pay-option-card ${selectedMethod === 'netbanking' ? 'active-pay-card' : ''}" data-method="netbanking" style="background: #FFFFFF; border: 1px solid ${selectedMethod === 'netbanking' ? '#0EA5E9' : 'var(--border-light)'}; border-radius: 12px; padding: 14px; cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="netbanking" ${selectedMethod === 'netbanking' ? 'checked' : ''} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Net Banking</div>
                <div style="font-size: 10px; color: var(--text-muted);">HDFC, ICICI, SBI, Axis, Kotak Bank</div>
              </div>
            </div>
            <span style="font-size: 11px; font-weight: 600;">🏛️</span>
          </div>
        </div>

        <!-- SuperMart Smart Wallet -->
        <div class="pay-option-card ${selectedMethod === 'wallet' ? 'active-pay-card' : ''}" data-method="wallet" style="background: #FFFFFF; border: 1px solid ${selectedMethod === 'wallet' ? '#0EA5E9' : 'var(--border-light)'}; border-radius: 12px; padding: 14px; cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="wallet" ${selectedMethod === 'wallet' ? 'checked' : ''} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">SuperMart Smart Wallet</div>
                <div style="font-size: 10px; color: #10B981; font-weight: 600;">Sufficient Balance: ₹500.00 Available</div>
              </div>
            </div>
            <span style="font-size: 11px; font-weight: 600;">👛</span>
          </div>
        </div>

      </div>

      <!-- Action Button: PROCEED TO PAY -->
      <button id="btn-execute-payment" class="btn-primary" style="width: 100%; margin-top: 8px; padding: 14px; font-size: 15px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);">
        PROCEED TO PAY ₹${total.toFixed(2)} →
      </button>

    </div>
  `;
}

export function bindPaymentScreenEvents(container) {
  const backBtn = container.querySelector('#btn-back-to-review');
  const payBtn = container.querySelector('#btn-execute-payment');

  if (backBtn) {
    backBtn.addEventListener('click', () => store.setCustomerTab('review-bill'));
  }

  container.querySelectorAll('.pay-option-card').forEach(card => {
    card.addEventListener('click', () => {
      store.selectedPaymentMethod = card.dataset.method;
      store.notify();
    });
  });

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const order = store.processPayment(store.selectedPaymentMethod || 'upi');
      if (order) {
        store.showToast('Payment processing successful!', 'success');
      }
    });
  }
}

// =========================================================================
// 3. PAYMENT SUCCESS SCREEN
// =========================================================================
export function renderPaymentSuccessScreen() {
  const order = store.lastCompletedOrder || store.orders[0] || {
    orderNumber: 'SC-DEMO-001',
    txnId: 'TXN-984321',
    customerName: 'Alex Sharma',
    customerPhone: '+91 98765 43210',
    cartId: store.cart.cartId,
    items: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    carryBagName: 'No Bag',
    carryBagQuantity: 0,
    carryBagCharge: 0,
    totalAmount: 0,
    paymentMethod: 'upi',
    status: 'paid',
    createdAt: new Date().toLocaleString()
  };

  return `
    <div style="padding: 24px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100%; background: #F8FAFC; text-align: center;">
      
      <!-- Big Checkmark Animation Badge -->
      <div style="width: 72px; height: 72px; border-radius: 99px; background: #DCFCE7; color: #15803D; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 25px rgba(21, 128, 61, 0.25); border: 2px solid #86EFAC;">
        ${getIcon('check-circle', 40)}
      </div>

      <h1 style="font-size: 22px; font-weight: 700; color: var(--text-primary);">Payment Successful!</h1>
      <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px; margin-bottom: 20px;">
        Thank you for shopping at SuperMart Hazratganj
      </p>

      <!-- Order Details Summary Card -->
      <div class="stitch-card" style="width: 100%; max-width: 380px; background: #FFFFFF; text-align: left; padding: 16px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 10px; margin-bottom: 10px;">
          <div>
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">TRANSACTION ID</div>
            <div style="font-family: monospace; font-size: 12px; font-weight: 700; color: #0284C7;">${order.txnId || 'TXN-984321'}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">ORDER #</div>
            <div style="font-family: monospace; font-size: 12px; font-weight: 700;">${order.orderNumber}</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Store Location:</span>
            <span style="font-weight: 600;">SuperMart Hazratganj</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Payment Method:</span>
            <span style="font-weight: 700; color: #15803D;">${order.paymentMethod.toUpperCase()} ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Paid Amount:</span>
            <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">₹${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div style="margin-top: 12px; background: #F0F9FF; border: 1px solid #BAE6FD; padding: 10px; border-radius: 8px; font-size: 11px; color: #0369A1; text-align: center;">
          🔓 <strong>Express Turnstile Gate Unlocked</strong><br/>
          Present your phone screen at turnstile scanner to exit.
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 380px;">
        <button id="btn-view-digital-receipt" class="btn-primary" style="padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 12px;">
          ${getIcon('orders', 16)} VIEW DIGITAL RECEIPT →
        </button>
        <button id="btn-success-home" class="btn-secondary" style="padding: 10px; font-size: 13px; font-weight: 600; border-radius: 12px;">
          Return to Home
        </button>
      </div>

    </div>
  `;
}

export function bindPaymentSuccessEvents(container) {
  const receiptBtn = container.querySelector('#btn-view-digital-receipt');
  const homeBtn = container.querySelector('#btn-success-home');

  if (receiptBtn) {
    receiptBtn.addEventListener('click', () => store.setCustomerTab('receipt'));
  }

  if (homeBtn) {
    homeBtn.addEventListener('click', () => store.setCustomerTab('home'));
  }
}

// =========================================================================
// 4. DIGITAL RECEIPT SCREEN
// =========================================================================
export function renderDigitalReceiptScreen() {
  const order = store.lastCompletedOrder || store.orders[0] || {
    orderNumber: 'SC-DEMO-001',
    txnId: 'TXN-984321',
    customerName: 'Alex Sharma',
    customerPhone: '+91 98765 43210',
    cartId: store.cart.cartId,
    items: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    carryBagName: 'No Bag',
    carryBagQuantity: 0,
    carryBagCharge: 0,
    totalAmount: 0,
    paymentMethod: 'upi',
    status: 'paid',
    createdAt: new Date().toLocaleString()
  };

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Official Digital Receipt</h2>
        <span class="stitch-badge badge-green">✓ PAID</span>
      </div>

      <!-- Printable Invoice Paper Card -->
      <div class="stitch-card" style="background: #FFFFFF; border: 1px solid var(--border-medium); font-family: monospace; padding: 20px;">
        
        <div style="text-align: center; border-bottom: 2px dashed #CBD5E1; padding-bottom: 14px; margin-bottom: 14px;">
          <h2 style="font-size: 16px; font-weight: 700; font-family: sans-serif; color: var(--text-primary);">SMART CART SUPERMARKET</h2>
          <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">100 Feet Road, Hazratganj, Lucknow</div>
          <div style="font-size: 10px; color: var(--text-secondary);">GSTIN: 29AABCU9603R1ZM • Phone: +91 98765 43210</div>
          
          <div style="font-size: 12px; font-weight: 700; margin-top: 10px; color: #0284C7;">INVOICE #${order.orderNumber}</div>
          <div style="font-size: 10px; color: var(--text-muted);">${order.createdAt}</div>
        </div>

        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; font-family: sans-serif; color: var(--text-secondary);">
          Itemized Products
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; margin-bottom: 14px;">
          ${order.items.map(item => `
            <div style="display: flex; justify-content: space-between;">
              <span>${item.name} × ${item.quantity}</span>
              <span style="font-weight: 700;">₹${item.totalPrice.toFixed(2)}</span>
            </div>
          `).join('')}

          ${order.carryBagCharge > 0 ? `
            <div style="display: flex; justify-content: space-between; color: #0284C7; border-top: 1px dashed #CBD5E1; padding-top: 4px; margin-top: 2px;">
              <span>Carry Bag (${order.carryBagName})</span>
              <span style="font-weight: 700;">₹${order.carryBagCharge.toFixed(2)}</span>
            </div>
          ` : ''}
        </div>

        <div style="border-top: 2px dashed #CBD5E1; padding-top: 10px; font-size: 11px; display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span><span>₹${order.subtotal.toFixed(2)}</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Estimated GST (5%):</span><span>₹${order.tax.toFixed(2)}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; margin-top: 6px; border-top: 1px solid #CBD5E1; padding-top: 6px; color: var(--text-primary);">
            <span>TOTAL PAID:</span><span style="color: #0284C7;">₹${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div style="text-align: center; background: #DCFCE7; color: #15803D; padding: 8px; border-radius: 6px; font-size: 10px; font-weight: 700; font-family: sans-serif;">
          ✓ Verified by IoT Weight Scale • Paid via ${order.paymentMethod.toUpperCase()}
        </div>

      </div>

      <!-- Receipt Actions: Download / Done -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button id="btn-download-receipt" class="btn-primary" style="padding: 12px; font-size: 13px; font-weight: 700; background: #0EA5E9; border-radius: 12px;">
          📲 Download PDF / Send to WhatsApp
        </button>
        <button id="btn-receipt-done" class="btn-secondary" style="padding: 10px; font-size: 13px; font-weight: 600; border-radius: 12px;">
          Done & Start New Shopping
        </button>
      </div>

    </div>
  `;
}

export function bindDigitalReceiptEvents(container) {
  const downloadBtn = container.querySelector('#btn-download-receipt');
  const doneBtn = container.querySelector('#btn-receipt-done');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      store.showToast('Receipt PDF sent to registered WhatsApp (+91 98765 43210)', 'success');
    });
  }

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      store.setCustomerTab('start-shopping');
    });
  }
}
