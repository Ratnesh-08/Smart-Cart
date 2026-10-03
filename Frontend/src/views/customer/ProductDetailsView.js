// Smart Cart AI - Customer Product Details View (Exact Google Stitch UI Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderCustomerProductDetails() {
  const product = store.selectedProduct || store.products[0];
  const spent = store.getAmountSpent();
  const remaining = store.getRemainingBudget();
  const location = store.locations.find(l => l.id === product.locationId) || store.locations[1];

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #FFFFFF; min-height: 100%;">
      
      <!-- Top Back Header Navigation -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <button id="btn-back-from-details" class="btn-secondary" style="padding: 6px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;">
          ← Back to Catalog
        </button>
        <span class="stitch-badge badge-cyan">EAN: ${product.barcode}</span>
      </div>

      <!-- Hero Product Image -->
      <div style="position: relative; width: 100%; height: 230px; border-radius: var(--radius-lg); overflow: hidden; background: #F8FAFC; border: 1px solid var(--border-light);">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;"/>
        <span class="stitch-badge badge-green" style="position: absolute; top: 12px; left: 12px; font-size: 11px; padding: 4px 10px; box-shadow: var(--shadow-sm);">
          In Stock (${product.stock} units)
        </span>
        <span class="stitch-badge badge-cyan" style="position: absolute; top: 12px; right: 12px; font-size: 11px; padding: 4px 10px;">
          ${product.category}
        </span>
      </div>

      <!-- Product Name & Price Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
        <div>
          <h1 style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.3;">
            ${product.name}
          </h1>
          <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
            ${product.description}
          </p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary);">
            ₹${product.price.toFixed(2)}
          </div>
          <div style="font-size: 10px; color: var(--text-muted);">${product.unit}</div>
        </div>
      </div>

      <!-- Attributes Card (Aisle/Location, Expected Weight, Scale Status) -->
      <div class="stitch-card" style="background: var(--bg-subtle); display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 14px;">
        
        <div>
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Store Aisle / Location</span>
          <div style="font-size: 13px; font-weight: 700; color: var(--cyan-hover); margin-top: 2px;">
            📍 ${product.locationName}
          </div>
          <div style="font-size: 10px; color: var(--text-secondary);">${location.section || 'General'} • ${location.shelf || 'Shelf A'}</div>
        </div>

        <div>
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Expected Weight (Scale)</span>
          <div style="font-size: 13px; font-weight: 700; color: var(--green-hover); margin-top: 2px;">
            ⚖️ ${product.expectedWeight}g
          </div>
          <div style="font-size: 10px; color: var(--text-secondary);">HX711 Scale Verified</div>
        </div>

      </div>

      <!-- Budget Impact Preview Callout -->
      <div style="background: #F0F9FF; border: 1px solid #BAE6FD; border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #0369A1;">
        <div style="display: flex; align-items: center; gap: 8px;">
          ${getIcon('sparkles', 18)}
          <span>Trip Budget Impact: <strong>Remaining ₹${remaining.toFixed(2)}</strong></span>
        </div>
        <span style="font-weight: 700;">Cap ₹${store.budgetCap}</span>
      </div>

      <!-- Quantity Selector -->
      <div class="stitch-card" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Quantity to Add</span>
        <div style="display: flex; align-items: center; gap: 14px;">
          <button id="details-qty-minus" class="btn-secondary" style="width: 36px; height: 36px; border-radius: 8px; font-size: 18px; font-weight: 700; padding: 0; display: flex; align-items: center; justify-content: center;">-</button>
          <span id="details-qty-val" style="font-size: 16px; font-weight: 700; min-width: 24px; text-align: center;">1</span>
          <button id="details-qty-plus" class="btn-secondary" style="width: 36px; height: 36px; border-radius: 8px; font-size: 18px; font-weight: 700; padding: 0; display: flex; align-items: center; justify-content: center;">+</button>
        </div>
      </div>

      <!-- Action Buttons: ADD TO CART & FIND IN STORE -->
      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
        <button id="btn-details-add-to-cart" class="btn-primary" style="width: 100%; padding: 14px; font-size: 15px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);">
          ${getIcon('plus', 18)} ADD TO CART (₹<span id="details-total-price">${product.price.toFixed(2)}</span>)
        </button>

        <button id="btn-details-find-in-store" class="btn-secondary" style="width: 100%; padding: 12px; font-size: 13px; font-weight: 600; border-radius: 12px;">
          ${getIcon('navigate', 16)} FIND IN STORE (Turn-by-Turn Route)
        </button>
      </div>

    </div>
  `;
}

export function bindProductDetailsEvents(container) {
  const product = store.selectedProduct || store.products[0];
  let qty = 1;

  const backBtn = container.querySelector('#btn-back-from-details');
  const qtyVal = container.querySelector('#details-qty-val');
  const minusBtn = container.querySelector('#details-qty-minus');
  const plusBtn = container.querySelector('#details-qty-plus');
  const totalPriceElem = container.querySelector('#details-total-price');
  const addToCartBtn = container.querySelector('#btn-details-add-to-cart');
  const findInStoreBtn = container.querySelector('#btn-details-find-in-store');

  const updatePriceDisplay = () => {
    if (qtyVal && totalPriceElem) {
      qtyVal.innerText = qty;
      totalPriceElem.innerText = (product.price * qty).toFixed(2);
    }
  };

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      store.setCustomerTab('home');
    });
  }

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (qty > 1) {
        qty -= 1;
        updatePriceDisplay();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      qty += 1;
      updatePriceDisplay();
    });
  }

  // ADD TO CART action
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      store.addToCart(product, qty);
      store.setCustomerTab('cart');
    });
  }

  // FIND IN STORE action
  if (findInStoreBtn) {
    findInStoreBtn.addEventListener('click', () => {
      store.setCustomerTab('navigate', { productId: product.id });
    });
  }
}
