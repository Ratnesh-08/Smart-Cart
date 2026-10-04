// Smart Cart AI - Customer Barcode Scanner View (Exact Google Stitch UI Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';
import { fetchProductByBarcode } from '../../services/apiService.js';
import { BrowserMultiFormatReader } from '@zxing/browser';

let activeControls = null;
let currentMediaStream = null;
let isProcessingBarcode = false;
let lastScannedBarcode = null;
let lastScannedTime = 0;
let cameraPermissionDenied = false;
let cameraErrorMessage = '';

export function stopScanner() {
  if (activeControls) {
    try {
      activeControls.stop();
    } catch (e) {
      console.warn('[Scanner] Error stopping controls:', e);
    }
    activeControls = null;
  }
  if (currentMediaStream) {
    try {
      currentMediaStream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.warn('[Scanner] Error stopping media tracks:', e);
    }
    currentMediaStream = null;
  }
}

export function renderCustomerScan() {
  const scannerState = store.scannerState; // 'scanning' | 'found' | 'not-found' | 'error' | 'permission-denied'
  const scanned = store.scannedProduct;
  const scannedBarcode = store.scannedBarcode;
  const isFound = scannerState === 'found' && scanned;
  const isNotFound = scannerState === 'not-found';
  const isDenied = cameraPermissionDenied || scannerState === 'permission-denied';

  return `
    <div style="display: flex; flex-direction: column; min-height: 100%; background: #0F172A; color: white; position: relative;">
      
      <!-- Top Scanner Bar Controls -->
      <div style="padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; z-index: 20; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="brand-icon" style="width: 24px; height: 24px; font-size: 11px;">SC</div>
          <div>
            <div style="font-size: 13px; font-weight: 700;">BARCODE CAMERA SCANNER</div>
            <div style="font-size: 10px; color: #38BDF8;">Cart ${store.cart.cartId} • Supabase Connected</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-toggle-flash" title="Toggle Flash" style="width: 32px; height: 32px; border-radius: 99px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            ⚡
          </button>
          <button id="btn-toggle-cam-stream" title="Camera Status" style="padding: 4px 10px; border-radius: 99px; border: 1px solid ${isDenied ? '#EF4444' : '#0EA5E9'}; background: ${isDenied ? '#EF4444' : '#0EA5E9'}; color: white; font-size: 11px; font-weight: 600; cursor: pointer;">
            ${isDenied ? '❌ Camera Off' : '📷 Camera Live'}
          </button>
        </div>
      </div>

      <!-- Viewfinder / Scanner Frame Area -->
      <div style="position: relative; flex: 1; min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #020617;">
        
        <!-- Video Camera Stream Element -->
        <video id="scanner-video-element" autoplay playsinline muted style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.8;"></video>

        <!-- Viewfinder Scanning Box Frame (Active when scanning) -->
        ${!isDenied ? `
          <div style="position: relative; z-index: 10; width: 260px; height: 170px; border: 2px dashed ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#0EA5E9'}; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.75); transition: border-color 0.3s ease;">
            
            ${scannerState === 'scanning' ? `
              <!-- Animated Laser Scanning Line -->
              <div class="laser-scanner-line" style="position: absolute; width: 100%; height: 2px; background: #38BDF8; box-shadow: 0 0 10px #38BDF8, 0 0 20px #0EA5E9; top: 0; animation: scanLaser 2s infinite ease-in-out;"></div>
            ` : ''}

            <!-- Crosshair corners -->
            <div style="position: absolute; top: -2px; left: -2px; width: 18px; height: 18px; border-top: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-left: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-top-left-radius: 12px;"></div>
            <div style="position: absolute; top: -2px; right: -2px; width: 18px; height: 18px; border-top: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-right: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-top-right-radius: 12px;"></div>
            <div style="position: absolute; bottom: -2px; left: -2px; width: 18px; height: 18px; border-bottom: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-left: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-bottom-left-radius: 12px;"></div>
            <div style="position: absolute; bottom: -2px; right: -2px; width: 18px; height: 18px; border-bottom: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-right: 3px solid ${isFound ? '#10B981' : isNotFound ? '#EF4444' : '#38BDF8'}; border-bottom-right-radius: 12px;"></div>

            <div style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: ${isFound ? 'rgba(16,185,129,0.5)' : isNotFound ? 'rgba(239,68,68,0.5)' : 'rgba(14,165,233,0.4)'}; padding: 4px 10px; border-radius: 6px; text-align: center;">
              ${isFound ? '✓ BARCODE MATCHED' : isNotFound ? '⚠️ ITEM NOT FOUND' : 'Point camera at barcode'}
            </div>
          </div>
        ` : `
          <!-- Permission Denied / No Camera Fallback Overlay -->
          <div style="position: relative; z-index: 10; padding: 24px; text-align: center; background: rgba(15,23,42,0.9); border: 1px solid rgba(239,68,68,0.4); border-radius: 16px; max-width: 85%;">
            <div style="font-size: 32px; margin-bottom: 8px;">📷</div>
            <div style="font-size: 14px; font-weight: 700; color: #F87171; margin-bottom: 6px;">Camera Access Unavailable</div>
            <div style="font-size: 11px; color: #94A3B8; margin-bottom: 14px;">
              ${cameraErrorMessage || 'Please allow camera permissions in your browser, or use the manual barcode lookup below.'}
            </div>
            <button id="btn-restart-camera" style="padding: 8px 16px; border-radius: 99px; background: #0EA5E9; color: white; border: none; font-size: 12px; font-weight: 600; cursor: pointer;">
              🔄 Retry Camera Stream
            </button>
          </div>
        `}

        <!-- Scanning Status Indicator -->
        <div style="position: absolute; bottom: 12px; z-index: 10; font-size: 11px; color: #94A3B8; background: rgba(0,0,0,0.6); padding: 4px 12px; border-radius: 99px; backdrop-filter: blur(4px);">
          ${scannerState === 'scanning' ? 'ZXing Barcode Engine Active • Live Feed' : isFound ? 'Product Loaded from Supabase DB' : 'Lookup Complete'}
        </div>

      </div>

      <!-- Quick Preset Barcode Simulation Taps (Populated from Supabase database) -->
      <div style="padding: 10px 16px; background: #0F172A; border-top: 1px solid rgba(255,255,255,0.1);">
        <div style="font-size: 10px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
          <span>Quick Tap Barcode Simulator</span>
          <span style="color: #38BDF8; font-weight: 500;">(Real EAN-13 Codes)</span>
        </div>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
          ${store.products.slice(0, 5).map(p => `
            <button class="btn-scan-preset btn-secondary" data-barcode="${p.barcode}" style="font-size: 11px; white-space: nowrap; padding: 6px 10px; border-radius: 99px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); cursor: pointer;">
              ${p.name.split(' ')[0]} (${p.barcode})
            </button>
          `).join('')}
          <button class="btn-scan-preset btn-secondary" data-barcode="9999999999999" style="font-size: 11px; white-space: nowrap; padding: 6px 10px; border-radius: 99px; background: rgba(239,68,68,0.2); color: #FCA5A5; border: 1px solid rgba(239,68,68,0.4); cursor: pointer;">
            Unknown (Test 404)
          </button>
        </div>
      </div>

      <!-- Manual Barcode Search Fallback Input -->
      <div style="padding: 12px 16px; background: #1E293B; border-top: 1px solid rgba(255,255,255,0.05);">
        <div style="display: flex; gap: 8px;">
          <input type="text" id="scanner-search-input" class="form-input" placeholder="Enter barcode number (e.g. 8901030864512)..." value="${scannedBarcode || ''}" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: white; font-size: 12px; flex: 1;"/>
          <button id="btn-scanner-search" class="btn-primary" style="padding: 8px 14px; font-size: 12px; white-space: nowrap; cursor: pointer;">
            Supabase Lookup
          </button>
        </div>
      </div>

      <!-- Product Found or Error Slide-Up Card Sheet -->
      <div id="product-found-sheet" style="background: #FFFFFF; color: var(--text-primary); border-top-left-radius: 20px; border-top-right-radius: 20px; padding: 16px; box-shadow: 0 -10px 25px rgba(0,0,0,0.3);">
        
        ${isFound ? `
          <!-- FOUND PRODUCT SHEET CONTENT -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="stitch-badge badge-green" style="font-size: 10px; padding: 4px 8px;">
              ✓ Supabase Match (EAN: ${scanned.barcode})
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
                ${scanned.category} • ${scanned.unit} • ${scanned.locationName || 'Aisle 1'}
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
              <button id="scan-qty-minus" class="btn-secondary" style="width: 32px; height: 32px; border-radius: 8px; padding: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; cursor: pointer;">-</button>
              <span id="scan-qty-val" style="font-size: 14px; font-weight: 700; min-width: 20px; text-align: center;">1</span>
              <button id="scan-qty-plus" class="btn-secondary" style="width: 32px; height: 32px; border-radius: 8px; padding: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; cursor: pointer;">+</button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; gap: 8px;">
              <button id="btn-scan-add-to-cart" class="btn-primary" style="flex: 1; padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 12px; cursor: pointer;">
                ${getIcon('plus', 16)} ADD TO CART
              </button>
              <button id="btn-scan-next-product" class="btn-secondary" style="padding: 12px 14px; font-size: 12px; font-weight: 600; border-radius: 12px; background: #E2E8F0; color: #0F172A; white-space: nowrap; cursor: pointer;">
                📷 Scan Next
              </button>
            </div>
            
            <button id="btn-scan-find-in-store" class="btn-secondary" style="width: 100%; padding: 10px; font-size: 12px; font-weight: 600; border-radius: 10px; cursor: pointer;">
              ${getIcon('navigate', 14)} FIND IN STORE (Aisle Navigation)
            </button>
          </div>
        ` : isNotFound ? `
          <!-- BARCODE NOT FOUND ERROR SHEET CONTENT -->
          <div style="text-align: center; padding: 8px 0;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 99px; background: #FEE2E2; color: #DC2626; font-size: 20px; margin-bottom: 8px;">
              ⚠️
            </div>
            <h3 style="font-size: 15px; font-weight: 700; color: #991B1B; margin-bottom: 4px;">
              Product Not Found
            </h3>
            <div style="font-size: 12px; color: #4B5563; margin-bottom: 14px; line-height: 1.4;">
              Barcode <strong>${scannedBarcode || 'Unknown'}</strong> was not found in the Supabase PostgreSQL database.
            </div>
            
            <div style="display: flex; gap: 8px;">
              <button id="btn-scan-retry" class="btn-primary" style="flex: 1; padding: 12px; font-size: 13px; font-weight: 700; background: #0EA5E9; border-radius: 10px; border: none; color: white; cursor: pointer;">
                🔄 Retry / Scan Next Product
              </button>
            </div>
          </div>
        ` : `
          <!-- DEFAULT SCANNING INSTRUCTIONS -->
          <div style="text-align: center; padding: 12px 0; color: var(--text-secondary);">
            <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">
              📷 Ready for Live Barcode Scanning
            </div>
            <div style="font-size: 11px;">
              Point your device camera at any product EAN-13 barcode to fetch product details from Supabase.
            </div>
          </div>
        `}

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
  const scanNextBtn = container.querySelector('#btn-scan-next-product');
  const retryBtn = container.querySelector('#btn-scan-retry');
  const findInStoreBtn = container.querySelector('#btn-scan-find-in-store');
  const searchInput = container.querySelector('#scanner-search-input');
  const searchBtn = container.querySelector('#btn-scanner-search');
  const videoElem = container.querySelector('#scanner-video-element');
  const restartCamBtn = container.querySelector('#btn-restart-camera');
  const camStreamToggle = container.querySelector('#btn-toggle-cam-stream');

  // Quantity Stepper
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

  // Handle barcode processing helper
  const handleScannedBarcode = async (barcodeText) => {
    if (!barcodeText) return;
    const cleanBarcode = String(barcodeText).trim();

    // Prevent duplicate triggers if already processing or recently scanned
    if (isProcessingBarcode) return;
    if (lastScannedBarcode === cleanBarcode && Date.now() - lastScannedTime < 2500) return;

    isProcessingBarcode = true;
    lastScannedBarcode = cleanBarcode;
    lastScannedTime = Date.now();

    store.showToast(`Scanning barcode ${cleanBarcode}...`, 'info');

    const result = await fetchProductByBarcode(cleanBarcode);
    if (result.success && result.data) {
      store.setScannedProduct(result.data);
    } else {
      store.setScannerNotFound(cleanBarcode, result.error);
    }
  };

  // Initialize ZXing Real Camera Barcode Recognition
  const initZXingScanner = async () => {
    if (!videoElem) return;
    stopScanner();

    try {
      const codeReader = new BrowserMultiFormatReader();
      
      // Request camera feed with preferred rear facing mode
      const hints = new Map();
      
      const controls = await codeReader.decodeFromConstraints(
        { video: { facingMode: { ideal: 'environment' } } },
        videoElem,
        (result, error, ctrls) => {
          if (result && !isProcessingBarcode) {
            const barcodeText = result.getText();
            handleScannedBarcode(barcodeText);
          }
        }
      );

      activeControls = controls;
      if (videoElem.srcObject) {
        currentMediaStream = videoElem.srcObject;
      }
      cameraPermissionDenied = false;
      cameraErrorMessage = '';

    } catch (err) {
      console.warn('[Scanner] Constraints camera access failed, trying default video device:', err);
      try {
        const codeReader = new BrowserMultiFormatReader();
        const controls = await codeReader.decodeFromVideoDevice(
          undefined,
          videoElem,
          (result, error, ctrls) => {
            if (result && !isProcessingBarcode) {
              const barcodeText = result.getText();
              handleScannedBarcode(barcodeText);
            }
          }
        );
        activeControls = controls;
        if (videoElem.srcObject) {
          currentMediaStream = videoElem.srcObject;
        }
        cameraPermissionDenied = false;
        cameraErrorMessage = '';
      } catch (fallbackErr) {
        console.error('[Scanner Error] Camera permission denied or unavailable:', fallbackErr);
        cameraPermissionDenied = true;
        cameraErrorMessage = fallbackErr.message || 'Camera permission denied or camera device missing.';
        store.notify();
      }
    }
  };

  // Start scanner if video element exists and we are in scanning mode
  if (videoElem && !cameraPermissionDenied) {
    initZXingScanner();
  }

  // Camera Retry Button
  if (restartCamBtn) {
    restartCamBtn.addEventListener('click', () => {
      cameraPermissionDenied = false;
      cameraErrorMessage = '';
      store.resetScannerState();
    });
  }

  if (camStreamToggle) {
    camStreamToggle.addEventListener('click', () => {
      if (cameraPermissionDenied) {
        cameraPermissionDenied = false;
        store.resetScannerState();
      } else {
        initZXingScanner();
      }
    });
  }

  // Preset Barcode Simulator Buttons
  container.querySelectorAll('.btn-scan-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const barcode = btn.dataset.barcode;
      isProcessingBarcode = false;
      handleScannedBarcode(barcode);
    });
  });

  // Manual Search / Barcode Input
  const doLookup = () => {
    const q = searchInput.value.trim();
    if (!q) return;
    isProcessingBarcode = false;
    handleScannedBarcode(q);
  };

  if (searchBtn) searchBtn.addEventListener('click', doLookup);
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doLookup();
    });
  }

  // ADD TO CART action
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const prod = store.scannedProduct;
      if (prod) {
        store.addToCart(prod, currentQty);
        isProcessingBarcode = false;
        lastScannedBarcode = null;
        store.showToast(`Added ${currentQty}x ${prod.name} to Cart`, 'success');
      }
    });
  }

  // SCAN NEXT PRODUCT action
  if (scanNextBtn) {
    scanNextBtn.addEventListener('click', () => {
      isProcessingBarcode = false;
      lastScannedBarcode = null;
      store.resetScannerState();
    });
  }

  // RETRY SCAN action
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      isProcessingBarcode = false;
      lastScannedBarcode = null;
      store.resetScannerState();
    });
  }

  // FIND IN STORE action -> opens Navigate View with target item
  if (findInStoreBtn) {
    findInStoreBtn.addEventListener('click', () => {
      const prod = store.scannedProduct;
      if (prod) {
        stopScanner();
        store.setCustomerTab('navigate', { productId: prod.id });
      }
    });
  }
}
