// Smart Cart AI - Customer Cart & Checkout View (Exact Google Stitch UI Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderCustomerCart() {
  const cart = store.cart;
  const items = cart.items;
  const itemCount = store.getCartItemCount();
  const subtotal = store.getProductsSubtotal();
  const selectedBag = store.getSelectedBag();
  const bagQty = store.getBagQuantity();
  const bagTotal = store.getBagTotal();
  const tax = store.getTax();
  const total = store.getCartTotal();
  const budgetCap = store.budgetCap;
  const remaining = store.getRemainingBudget();
  const budgetStatus = store.getBudgetStatus();
  const weightVerification = store.getWeightVerificationStatus();

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Bar & Continue Shopping -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Cart Items (${itemCount})</h2>
          <p style="font-size: 11px; color: var(--text-secondary);">${cart.cartId} • IoT Scale Live</p>
        </div>
        <button id="btn-continue-shopping" class="btn-secondary" style="padding: 6px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;">
          ← Continue Shopping
        </button>
      </div>

      <!-- Budget Status Alert Banner (Warning / Exceeded States) -->
      <div class="stitch-card ${budgetStatus.bg}" style="border: 1px solid; padding: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 13px; font-weight: 700;" class="${budgetStatus.color}">
              ${budgetStatus.label}
            </span>
          </div>
          <button id="btn-cart-edit-budget" style="border: none; background: transparent; font-size: 11px; color: #0EA5E9; font-weight: 700; cursor: pointer;">
            Edit Cap
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 11px; text-align: center; background: rgba(255,255,255,0.75); padding: 8px; border-radius: 8px; margin-top: 6px;">
          <div>
            <div style="color: var(--text-muted); font-size: 10px;">TRIP BUDGET CAP</div>
            <div style="font-weight: 700; font-size: 13px;">₹${budgetCap.toFixed(2)}</div>
          </div>
          <div>
            <div style="color: var(--text-muted); font-size: 10px;">AMOUNT SPENT</div>
            <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">₹${total.toFixed(2)}</div>
          </div>
          <div>
            <div style="color: var(--text-muted); font-size: 10px;">REMAINING</div>
            <div style="font-weight: 700; font-size: 13px;" class="${remaining < 0 ? 'text-red-600' : 'text-emerald-700'}">
              ₹${remaining.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <!-- Real-time HX711 Load Cell Scale Verification Bar -->
      <div class="stitch-card ${weightVerification.bg}" style="border: 1px solid; padding: 10px 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 99px;" class="${weightVerification.badgeColor}"></span>
            <span class="${weightVerification.color}" style="font-weight: 700;">${weightVerification.label}</span>
          </div>
          <span style="font-size: 10px; color: var(--text-secondary);">Scale: ${cart.simulatedActualWeight}g</span>
        </div>
      </div>

      <!-- EMPTY CART STATE -->
      ${items.length === 0 ? `
        <div class="stitch-card" style="text-align: center; padding: 36px 16px; background: #FFFFFF;">
          <div style="width: 56px; height: 56px; border-radius: 99px; background: #E0F2FE; color: #0284C7; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
            ${getIcon('cart', 28)}
          </div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">Your Cart is Currently Empty</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px; margin-bottom: 16px; max-width: 280px; margin-left: auto; margin-right: auto;">
            Scan product barcodes with your camera or add recommended grocery items to your trip.
          </p>
          <button id="btn-empty-scan-items" class="btn-primary" style="padding: 10px 20px; font-size: 13px; font-weight: 700; margin: 0 auto; background: #0F172A; border-radius: 10px;">
            ${getIcon('scan', 16)} Start Scanning Products
          </button>
        </div>
      ` : `

        <!-- Itemized Cart Products List -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${items.map(item => `
            <div class="stitch-card" style="padding: 12px; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF;">
              
              <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                <img src="${item.image}" alt="${item.name}" style="width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-light); flex-shrink: 0;"/>
                <div style="flex: 1;">
                  <h4 style="font-size: 13px; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${item.name}</h4>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                    ₹${item.price.toFixed(2)} / unit • <span class="text-emerald-700 font-semibold">✓ ${item.expectedWeight * item.quantity}g Scale Verified</span>
                  </div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; margin-left: 8px;">
                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">
                  ₹${(item.price * item.quantity).toFixed(2)}
                </div>

                <div style="display: flex; align-items: center; gap: 6px;">
                  <!-- Quantity Stepper -->
                  <div style="display: flex; align-items: center; border: 1px solid var(--border-medium); border-radius: 6px; overflow: hidden; background: #FFFFFF;">
                    <button class="btn-cart-minus btn-secondary" data-id="${item.id}" style="padding: 3px 8px; border: none; border-radius: 0; font-weight: 700;">-</button>
                    <span style="padding: 0 8px; font-size: 12px; font-weight: 700; min-width: 20px; text-align: center;">${item.quantity}</span>
                    <button class="btn-cart-plus btn-secondary" data-id="${item.id}" style="padding: 3px 8px; border: none; border-radius: 0; font-weight: 700;">+</button>
                  </div>

                  <!-- Trash Remove Icon Button -->
                  <button class="btn-cart-remove-item" data-id="${item.id}" title="Remove Item" style="border: none; background: #FEE2E2; color: #DC2626; border-radius: 6px; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    ${getIcon('trash', 14)}
                  </button>
                </div>
              </div>

            </div>
          `).join('')}
        </div>

        <!-- CRITICAL NEW FEATURE — "Need a Carry Bag?" SECTION (Exact Stitch Design) -->
        <div class="stitch-card" style="background: #FFFFFF; border: 1px solid var(--cyan-border);">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #0EA5E9;">🛍️</span>
              <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Need a Carry Bag?</h3>
            </div>
            <span class="stitch-badge badge-cyan" style="font-size: 9px;">Eco-Friendly Options</span>
          </div>
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
            Choose a suitable bag for express automated supermarket checkout.
          </p>

          <!-- Carry Bag Radio Options List -->
          <div style="display: flex; flex-direction: column; gap: 8px;" id="carry-bag-options-list">
            ${store.carryBags.filter(b => b.isEnabled !== false && b.enabled !== false).map(bag => {
              const isSelected = cart.selectedBagId === bag.id;
              const lineTotal = isSelected && bag.id !== 'bag-none' ? bag.price * bagQty : bag.price;
              return `
                <div class="bag-option-card ${isSelected ? 'selected-bag' : ''}" data-id="${bag.id}" style="border: 1px solid ${isSelected ? '#0EA5E9' : 'var(--border-light)'}; background: ${isSelected ? '#F0F9FF' : '#FFFFFF'}; padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: all 0.15s ease;">
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="radio" name="carry-bag-radio" value="${bag.id}" ${isSelected ? 'checked' : ''} style="accent-color: #0EA5E9; cursor: pointer;"/>
                      <div>
                        <div style="font-size: 12px; font-weight: 700; color: var(--text-primary);">${bag.name}</div>
                        <div style="font-size: 10px; color: var(--text-muted);">${bag.description}</div>
                      </div>
                    </div>

                    <div style="text-align: right; display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 13px; font-weight: 700; color: ${isSelected ? '#0284C7' : 'var(--text-primary)'};">
                        ${bag.price === 0 ? 'Free' : `₹${bag.price.toFixed(2)}`}
                      </span>

                      <!-- Bag Quantity Stepper (Active when selected and not 'none') -->
                      ${isSelected && bag.id !== 'bag-none' ? `
                        <div style="display: flex; align-items: center; border: 1px solid #0EA5E9; border-radius: 6px; background: #FFFFFF; overflow: hidden;" onclick="event.stopPropagation();">
                          <button id="btn-bag-minus" class="btn-secondary" style="padding: 2px 6px; border: none; border-radius: 0; font-size: 11px; font-weight: 700;">-</button>
                          <span style="padding: 0 6px; font-size: 11px; font-weight: 700; color: #0284C7;">${bagQty}</span>
                          <button id="btn-bag-plus" class="btn-secondary" style="padding: 2px 6px; border: none; border-radius: 0; font-size: 11px; font-weight: 700;">+</button>
                        </div>
                      ` : ''}
                    </div>

                  </div>

                  ${isSelected && bag.id !== 'bag-none' && bagQty > 1 ? `
                    <div style="font-size: 10px; color: #0284C7; font-weight: 600; text-align: right; margin-top: 4px;">
                      ${bag.name} × ${bagQty} = ₹${(bag.price * bagQty).toFixed(2)}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Bill Breakdown Card (Matching Stitch Screenshot) -->
        <div class="stitch-card" style="background: #FFFFFF;">
          <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
            Bill Breakdown
          </h3>

          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
            
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-secondary);">Items Subtotal (${itemCount} items)</span>
              <span style="font-weight: 700; color: var(--text-primary);">₹${subtotal.toFixed(2)}</span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-secondary);">
                Carry Bag (${selectedBag.name} ${bagQty > 0 ? `× ${bagQty}` : ''})
              </span>
              <span style="font-weight: 700; color: ${bagTotal > 0 ? '#0284C7' : 'var(--text-primary)'};">
                ${bagTotal === 0 ? '₹0.00' : `₹${bagTotal.toFixed(2)}`}
              </span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-secondary);">Estimated GST / Taxes (5%)</span>
              <span style="font-weight: 600;">₹${tax.toFixed(2)}</span>
            </div>

            <div style="height: 1px; background: var(--border-light); margin: 4px 0;"></div>

            <!-- Dynamic Final Total -->
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700;">
              <span>Total Payable</span>
              <span style="color: var(--text-primary); font-size: 20px;">₹${total.toFixed(2)}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              <span>Remaining Budget after billing:</span>
              <span class="${remaining < 0 ? 'text-red-600 font-bold' : 'text-emerald-700 font-bold'}">
                ₹${remaining.toFixed(2)}
              </span>
            </div>

          </div>

          <!-- Primary REVIEW BILL & PAY Button -->
          <button id="btn-review-bill" class="btn-primary" style="width: 100%; margin-top: 16px; padding: 14px; font-size: 15px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25); display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${getIcon('check-circle', 18)} REVIEW BILL & PAY (₹${total.toFixed(2)})
          </button>
        </div>

      `}

      <!-- Remove Item Confirmation Modal Dialog -->
      ${store.itemToRemove ? `
        <div class="modal-overlay">
          <div class="modal-card" style="max-width: 360px; text-align: center;">
            <div style="width: 48px; height: 48px; border-radius: 99px; background: #FEE2E2; color: #DC2626; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
              ${getIcon('trash', 24)}
            </div>
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">Remove Product?</h3>
            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 6px; margin-bottom: 16px;">
              Are you sure you want to remove <strong>"${store.itemToRemove.name}"</strong> from your shopping cart?
            </p>

            <div style="display: flex; gap: 10px;">
              <button id="btn-cancel-remove" class="btn-secondary" style="flex: 1; padding: 10px;">Cancel</button>
              <button id="btn-confirm-remove" class="btn-danger" style="flex: 1; padding: 10px;">Remove Item</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Review Bill & Payment Modal -->
      <div id="review-bill-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700;">Review Your Bill</h3>
              <div style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • Cart #07</div>
            </div>
            <button id="btn-close-review-modal" style="border: none; background: transparent; cursor: pointer;">
              ${getIcon('x', 20)}
            </button>
          </div>

          <div id="review-modal-body">
            
            <div style="background: var(--cyan-light); border: 1px solid var(--cyan-border); padding: 10px 12px; border-radius: 8px; margin-bottom: 14px; font-size: 11px; color: #0369A1; display: flex; align-items: center; gap: 8px;">
              ${getIcon('shield-check', 18)}
              <span>IoT Weight Scale Verified (100% Match) • Ready for Express Gate Checkout</span>
            </div>

            <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 6px;">
              Line Items
            </div>

            <div style="display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; font-size: 12px; margin-bottom: 12px; background: var(--bg-subtle); padding: 10px; border-radius: 8px;">
              ${items.map(i => `
                <div style="display: flex; justify-content: space-between;">
                  <span>${i.name} × ${i.quantity}</span>
                  <span style="font-weight: 700;">₹${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              `).join('')}
              
              ${selectedBag.id !== 'bag-none' ? `
                <div style="display: flex; justify-content: space-between; color: #0284C7; font-weight: 600; border-top: 1px dashed var(--border-medium); padding-top: 4px; margin-top: 2px;">
                  <span>Carry Bag (${selectedBag.name} × ${bagQty})</span>
                  <span>₹${bagTotal.toFixed(2)}</span>
                </div>
              ` : ''}
            </div>

            <div style="border-top: 1px solid var(--border-light); padding-top: 8px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between;"><span>Items Subtotal:</span><span>₹${subtotal.toFixed(2)}</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Carry Bag Fee:</span><span>₹${bagTotal.toFixed(2)}</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Estimated GST (5%):</span><span>₹${tax.toFixed(2)}</span></div>
              <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; color: var(--text-primary); border-top: 1px solid var(--border-medium); padding-top: 6px; margin-top: 4px;">
                <span>Total Amount:</span><span style="color: #0284C7;">₹${total.toFixed(2)}</span>
              </div>
            </div>

            <button id="btn-modal-proceed-payment" class="btn-primary" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 10px;">
              Proceed to Payment (₹${total.toFixed(2)}) →
            </button>

          </div>
        </div>
      </div>

    </div>
  `;
}

export function bindCartEvents(container) {
  // Continue Shopping button
  const continueBtn = container.querySelector('#btn-continue-shopping');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      store.setCustomerTab('home');
    });
  }

  // Edit Budget Cap
  const editBudgetBtn = container.querySelector('#btn-cart-edit-budget');
  if (editBudgetBtn) {
    editBudgetBtn.addEventListener('click', () => {
      const val = prompt('Set trip budget cap (₹):', store.budgetCap);
      if (val && !isNaN(val)) store.setBudgetCap(parseFloat(val));
    });
  }

  // Empty state button
  const emptyBtn = container.querySelector('#btn-empty-scan-items');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => {
      store.setCustomerTab('scan');
    });
  }

  // Quantity Stepper buttons
  container.querySelectorAll('.btn-cart-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      store.updateQuantity(btn.dataset.id, -1);
    });
  });

  container.querySelectorAll('.btn-cart-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      store.updateQuantity(btn.dataset.id, 1);
    });
  });

  // Remove Item buttons (triggers confirmation modal)
  container.querySelectorAll('.btn-cart-remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      store.promptRemoveItem(btn.dataset.id);
    });
  });

  // Confirm / Cancel Remove Modal
  const cancelRemoveBtn = container.querySelector('#btn-cancel-remove');
  const confirmRemoveBtn = container.querySelector('#btn-confirm-remove');

  if (cancelRemoveBtn) {
    cancelRemoveBtn.addEventListener('click', () => store.cancelRemoveItem());
  }
  if (confirmRemoveBtn) {
    confirmRemoveBtn.addEventListener('click', () => store.confirmRemoveItem());
  }

  // Carry Bag Option selection & quantity stepper
  container.querySelectorAll('.bag-option-card').forEach(card => {
    card.addEventListener('click', () => {
      store.setCarryBagOption(card.dataset.id);
    });
  });

  const bagMinus = container.querySelector('#btn-bag-minus');
  const bagPlus = container.querySelector('#btn-bag-plus');

  if (bagMinus) {
    bagMinus.addEventListener('click', (e) => {
      e.stopPropagation();
      store.updateCarryBagQuantity(-1);
    });
  }

  if (bagPlus) {
    bagPlus.addEventListener('click', (e) => {
      e.stopPropagation();
      store.updateCarryBagQuantity(1);
    });
  }

  // Review Bill Navigation (Full Screen Flow)
  const reviewBillBtn = container.querySelector('#btn-review-bill');
  const reviewModal = container.querySelector('#review-bill-modal');
  const closeReviewModalBtn = container.querySelector('#btn-close-review-modal');
  const modalProceedBtn = container.querySelector('#btn-modal-proceed-payment');

  if (reviewBillBtn) {
    reviewBillBtn.addEventListener('click', () => {
      store.setCustomerTab('review-bill');
    });
  }

  if (closeReviewModalBtn && reviewModal) {
    closeReviewModalBtn.addEventListener('click', () => {
      reviewModal.style.display = 'none';
    });
  }

  if (modalProceedBtn) {
    modalProceedBtn.addEventListener('click', () => {
      if (reviewModal) reviewModal.style.display = 'none';
      store.setCustomerTab('payment');
    });
  }
}
