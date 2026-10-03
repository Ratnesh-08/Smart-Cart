// Smart Cart AI - Admin Smart Carts Hardware Monitor View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminSmartCarts() {
  const carts = store.smartCarts;

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Smart Cart Fleet Management & Indoor Positioning</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Live telemetry, ESP32 BLE Mesh health, load cell calibration, and customer cart positioning</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="btn-ping-carts" class="btn-secondary" style="font-size: 12px;">
            ${getIcon('wifi', 14)} Ping Fleet
          </button>
          <button id="btn-emergency-unlock" class="btn-danger" style="font-size: 12px;">
            🚨 Emergency Gate Release
          </button>
        </div>
      </div>

      <!-- Connected Smart Carts Grid (Matching Stitch Screenshot) -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        ${carts.map(cart => `
          <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid ${cart.weightStatus === 'verified' ? '#10B981' : cart.weightStatus === 'mismatch' ? '#F59E0B' : '#0EA5E9'};">
            
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              <div>
                <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">IoT Microcontroller</div>
                <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${cart.cartId} (${cart.hardwareId})</h3>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="stitch-badge ${cart.status === 'active' || cart.status === 'checked_out' ? 'badge-green' : 'badge-cyan'}">
                  ${cart.status === 'active' ? '🟢 Online' : cart.status === 'checked_out' ? '✓ Checked Out' : '⚪ Idle'}
                </span>
              </div>
            </div>

            <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 12px; margin-bottom: 12px;">
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">CURRENT SESSION</span>
                <div style="font-weight: 700; color: var(--text-primary);">${cart.customerName}</div>
                <div style="font-size: 9px; color: var(--text-secondary);">${cart.customerPhone}</div>
              </div>
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">CART ITEMS</span>
                <div style="font-weight: 700; color: #0284C7;">${cart.itemCount} items inside</div>
              </div>
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">EXPECTED SCALE WEIGHT</span>
                <div style="font-weight: 700; color: #166534;">${cart.expectedWeightGrams}g</div>
              </div>
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">HX711 LOAD CELL READING</span>
                <div style="font-weight: 700; color: ${cart.weightStatus === 'verified' ? '#16A34A' : '#DC2626'};">
                  ${cart.actualWeightGrams}g (${cart.weightStatus === 'verified' ? 'Verified' : 'Mismatch'})
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-secondary);">
              <span>🔋 Battery: <strong>${cart.batteryLevel}%</strong></span>
              <span>📶 Wi-Fi Signal: <strong>${cart.rssi}</strong></span>
              <span style="color: var(--text-muted);">Last activity: ${cart.lastPing}</span>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}

export function bindAdminSmartCartsEvents(container) {
  const pingBtn = container.querySelector('#btn-ping-carts');
  const unlockBtn = container.querySelector('#btn-emergency-unlock');

  if (pingBtn) {
    pingBtn.addEventListener('click', () => store.showToast('Ping request sent to ESP32 node mesh', 'success'));
  }

  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => store.showToast('Emergency Turnstile Gate Release Triggered', 'info'));
  }
}
