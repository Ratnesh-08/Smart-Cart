// Smart Cart AI - Customer Barcode Scanner View (Exact Google Stitch UI Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderCustomerScan() {
  const scanned = store.scannedProduct || store.products[0]; // default preview product
  const scannerState = store.scannerState; // 'idle' | 'scanning' | 'found'

  return `
    <div style="display: flex; flex-direction: column; min-height: 100%; background: #0F172A; color: white; position: relative;">
      
      <!-- Top Scanner Bar Controls -->
      <div style="padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; z-index: 20; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="brand-icon" style="width: 24px; height: 24px; font-size: 11px;">SC</div>
          <div>
            <div style="font-size: 13px; font-weight: 700;">BARCODE CAMERA SCANNER</div>
            <div style="font-size: 10px; color: #38BDF8;">Cart ${store.cart.cartId} • Scale Connected</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-toggle-flash" title="Toggle Flash" style="width: 32px; height: 32px; border-radius: 99px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            ⚡
          </button>
          <button id="btn-toggle-cam-stream" title="Camera Feed" style="padding: 4px 10px; border-radius: 99px; border: 1px solid #0EA5E9; background: #0EA5E9; color: white; font-size: 11px; font-weight: 600; cursor: pointer;">
            📷 Camera Live
          </button>
        </div>
      </div>

      <!-- Viewfinder / Scanner Frame Area -->
      <div style="position: relative; flex: 1; min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #020617;">
        
        <!-- Video Camera Stream Element -->
        <video id="scanner-video-element" autoplay playsinline muted style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.75;"></video>

        <!-- Scanning Frame Viewfinder -->
        <div style="position: relative; z-index: 10; width: 250px; height: 160px; border: 2px dashed #0EA5E9; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.75);">
          
          <!-- Animated Laser Scanning Line -->
          <div class="laser-scanner-line" style="position: absolute; width: 100%; height: 2px; background: #38BDF8; box-shadow: 0 0 10px #38BDF8, 0 0 20px #0EA5E9; top: 0; animation: scanLaser 2s infinite ease-in-out;"></div>

          <!-- Crosshair corners -->
          <div style="position: absolute; top: -2px; left: -2px; width: 16px; height: 16px; border-top: 3px solid #38BDF8; border-left: 3px solid #38BDF8; border-top-left-radius: 12px;"></div>
          <div style="position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; border-top: 3px solid #38BDF8; border-right: 3px solid #38BDF8; border-top-right-radius: 12px;"></div>
          <div style="position: absolute; bottom: -2px; left: -2px; width: 16px; height: 16px; border-bottom: 3px solid #38BDF8; border-left: 3px solid #38BDF8; border-bottom-left-radius: 12px;"></div>
          <div style="position: absolute; bottom: -2px; right: -2px; width: 16px; height: 16px; border-bottom: 3px solid #38BDF8; border-right: 3px solid #38BDF8; border-bottom-right-radius: 12px;"></div>

          <div style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: rgba(14,165,233,0.4); padding: 4px 10px; border-radius: 6px; text-align: center;">
            Point camera at barcode
          </div>
        </div>

        <!-- Scanning Status Indicator -->
        <div style="position: absolute; bottom: 12px; z-index: 10; font-size: 11px; color: #94A3B8; background: rgba(0,0,0,0.6); padding: 4px 12px; border-radius: 99px;">
          CV Barcode Recognition Engine Active
        </div>

      </div>

      <!-- Quick Preset Demo Barcode Quick Taps -->
      <div style="padding: 12px 16px; background: #0F172A; border-top: 1px solid rgba(255,255,255,0.1);">
        <div style="font-size: 10px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin-bottom: 6px;">
          Quick Tap Barcode Simulation
        </div>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
          ${store.products.slice(0, 5).map(p => `
            <button class="btn-scan-preset btn-secondary" data-id="${p.id}" style="font-size: 11px; white-space: nowrap; padding: 6px 10px; border-radius: 99px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
              ${p.name.split(' ')[0]} (₹${p.price})
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Manual Product Search Fallback Input -->
      <div style="padding: 12px 16px; background: #1E293B;">
        <div style="display: flex; gap: 8px;">
          <input type="text" id="scanner-search-input" class="form-input" placeholder="Or enter barcode / search item name..." style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: white; font-size: 12px;"/>
          <button id="btn-scanner-search" class="btn-primary" style="padding: 8px 14px; font-size: 12px; white-space: nowrap;">
            Lookup
          </button>
        </div>
      </div>

      <!-- Product Found Slide-Up Card Sheet (Matching Stitch Screenshot) -->
      <div id="product-found-sheet" style="background: #FFFFFF; color: var(--text-primary); border-top-left-radius: 20px; border-top-right-radius: 20px; padding: 16px; box-shadow: 0 -10px 25px rgba(0,0,0,0.3);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="stitch-badge badge-green" style="font-size: 10px; padding: 4px 8px;">
            ✓ Barcode Recognized (EAN: ${scanned.barcode})
          </span>
          <span style="font-size: 11px; color: var(--cyan-hover); font-weight: 600;">Scale Ready (+${scanned.expectedWeight}g)</span>
        </div>

        <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 14px;">
          <img src="${scanned.image}" alt="${scanned.name}" style="width: 72px; height: 72px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-light);"/>
          <div style="flex: 1;">
            <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.3;">
              ${scanned.name}
            </h3>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
              ${scanned.category} • ${scanned.unit} • ${scanned.locationName}
            </div>
            <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
              ₹${scanned.price.toFixed(2)}
            </div>
          </div>
        </div>

        <!-- Quantity Stepper -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-subtle); padding: 10px 14px; border-radius: 10px; margin-bottom: 14px;">
          <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Select Quantity</span>
          <div style="display: flex; align-items: center; gap: 12px;">
            <button id="scan-qty-minus" class="btn-secondary" style="width: 32px; height: 32px; border-radius: 8px; padding: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">-</button>
            <span id="scan-qty-val" style="font-size: 14px; font-weight: 700; min-width: 20px; text-align: center;">1</span>
            <button id="scan-qty-plus" class="btn-secondary" style="width: 32px; height: 32px; border-radius: 8px; padding: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">+</button>
          </div>
        </div>

        <!-- Primary Actions: ADD TO CART & FIND IN STORE -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button id="btn-scan-add-to-cart" class="btn-primary" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 12px;">
            ${getIcon('plus', 16)} ADD TO CART
          </button>
          
          <button id="btn-scan-find-in-store" class="btn-secondary" style="width: 100%; padding: 10px; font-size: 12px; font-weight: 600; border-radius: 10px;">
            ${getIcon('navigate', 14)} FIND IN STORE (Aisle Navigation)
          </button>
        </div>

      </div>

    </div>

    <style>
      @keyframes scanLaser {
        0% { top: 0; }
        50% { top: calc(100% - 2px); }
        100% { top: 0; }
      }
    </style>
  `;
}

export function bindScanEvents(container) {
  let currentQty = 1;
  const qtyVal = container.querySelector('#scan-qty-val');
  const minusBtn = container.querySelector('#scan-qty-minus');
  const plusBtn = container.querySelector('#scan-qty-plus');
  const addToCartBtn = container.querySelector('#btn-scan-add-to-cart');
  const findInStoreBtn = container.querySelector('#btn-scan-find-in-store');
  const searchInput = container.querySelector('#scanner-search-input');
  const searchBtn = container.querySelector('#btn-scanner-search');
  const videoElem = container.querySelector('#scanner-video-element');
  const camStreamBtn = container.querySelector('#btn-toggle-cam-stream');

  if (minusBtn && qtyVal) {
    minusBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty -= 1;
        qtyVal.innerText = currentQty;
      }
    });
  }

  if (plusBtn && qtyVal) {
    plusBtn.addEventListener('click', () => {
      currentQty += 1;
      qtyVal.innerText = currentQty;
    });
  }

  // Camera Stream
  if (camStreamBtn && videoElem) {
    camStreamBtn.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoElem.srcObject = stream;
        camStreamBtn.innerText = '📷 Camera Active';
        camStreamBtn.style.background = '#10B981';
      } catch (err) {
        store.showToast('Camera simulation active', 'info');
      }
    });
  }

  // Preset quick barcodes
  container.querySelectorAll('.btn-scan-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = store.products.find(prod => prod.id === btn.dataset.id);
      if (p) {
        store.scannedProduct = p;
        store.notify();
      }
    });
  });

  // Lookup manual search
  const doLookup = () => {
    const q = searchInput.value.toLowerCase().trim();
    if (!q) return;
    const found = store.products.find(p => p.name.toLowerCase().includes(q) || p.barcode.includes(q));
    if (found) {
      store.scannedProduct = found;
      store.notify();
    } else {
      store.showToast(`No item matching "${q}"`, 'error');
    }
  };

  if (searchBtn) searchBtn.addEventListener('click', doLookup);
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doLookup();
    });
  }

  // ADD TO CART action -> updates actual application state!
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const prod = store.scannedProduct || store.products[0];
      store.addToCart(prod, currentQty);
      store.setCustomerTab('cart');
    });
  }

  // FIND IN STORE action -> opens Navigate View with target item!
  if (findInStoreBtn) {
    findInStoreBtn.addEventListener('click', () => {
      const prod = store.scannedProduct || store.products[0];
      store.setCustomerTab('navigate', { productId: prod.id });
    });
  }
}
