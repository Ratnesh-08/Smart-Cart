// Smart Cart AI - Admin Dashboard View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminDashboard() {
  const orders = store.orders;
  const products = store.products;
  const smartCarts = store.smartCarts;
  const activeCarts = smartCarts.filter(c => c.status === 'active');
  const mismatches = smartCarts.filter(c => c.weightStatus === 'mismatch');
  const lowStock = products.filter(p => p.stock < 50);

  const totalSalesToday = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 124500;
  const totalProductsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0) + 148;

  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Store Performance & Live Cart Fleet Operations</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Real-time IoT load-cell tracking, checkout velocity, and store analytics</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="btn-admin-broadcast" class="btn-secondary" style="font-size: 12px;">
            📢 Broadcast Banner
          </button>
          <button id="btn-admin-export" class="btn-primary" style="font-size: 12px; background: #0F172A;">
            ${getIcon('orders', 14)} Export Report
          </button>
        </div>
      </div>

      <!-- KPI Cards Grid (Matching Stitch Screenshot) -->
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px;">
        
        <div class="stitch-card" style="border-top: 3px solid #0EA5E9; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Sales</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹${totalSalesToday.toLocaleString()}
          </div>
          <div style="font-size: 10px; color: var(--green-hover); font-weight: 600; margin-top: 4px;">
            ↑ +14.2% vs yesterday
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #10B981; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Sessions</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            42 Shoppers
          </div>
          <div style="font-size: 10px; color: #0284C7; font-weight: 600; margin-top: 4px;">
            In-Store Footfall
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #6366F1; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Carts</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            18 Online
          </div>
          <div style="font-size: 10px; color: #10B981; font-weight: 600; margin-top: 4px;">
            ESP32 Mesh Synced
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #F59E0B; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Bill</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹968.00
          </div>
          <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">
            Per Shopping Trip
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #EC4899; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Products Sold</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${totalProductsSold} Units
          </div>
          <div style="font-size: 10px; color: var(--green-hover); font-weight: 600; margin-top: 4px;">
            High Velocity
          </div>
        </div>

      </div>

      <!-- Main Operations Grid (Sales Chart & Hardware Monitor) -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        
        <!-- Left Column: Sales Chart & Live Active Checkouts -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Sales & Footfall Velocity Chart Card -->
          <div class="stitch-card" style="background: #FFFFFF;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div>
                <h3 style="font-size: 14px; font-weight: 700;">Real-Time Sales & Footfall Velocity</h3>
                <div style="font-size: 11px; color: var(--text-secondary);">Hourly checkout revenue aggregation</div>
              </div>
              <span class="stitch-badge badge-cyan">Live Hourly Stream</span>
            </div>

            <!-- Bar Chart Visual -->
            <div style="height: 160px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              ${[
                { hour: '09 AM', val: 8400, height: 40 },
                { hour: '10 AM', val: 14200, height: 65 },
                { hour: '11 AM', val: 19800, height: 90 },
                { hour: '12 PM', val: 24500, height: 115 },
                { hour: '01 PM', val: 21000, height: 100 },
                { hour: '02 PM', val: 16500, height: 75 },
                { hour: '03 PM', val: 28900, height: 135 },
                { hour: '04 PM', val: 32400, height: 150 }
              ].map(bar => `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                  <span style="font-size: 9px; font-weight: 700; color: var(--text-secondary);">₹${(bar.val/1000).toFixed(1)}k</span>
                  <div style="width: 100%; height: ${bar.height}px; background: linear-gradient(180deg, #0EA5E9 0%, #0284C7 100%); border-radius: 4px;"></div>
                  <span style="font-size: 9px; color: var(--text-muted);">${bar.hour}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Live Active Checkouts & Express Gate Log Table -->
          <div class="stitch-card" style="background: #FFFFFF; padding: 0; overflow: hidden;">
            <div style="padding: 14px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 14px; font-weight: 700;">Live Active Checkouts & Express Gate Log</h3>
                <div style="font-size: 11px; color: var(--text-secondary);">Automated turnstile unlocks and IoT scale audits</div>
              </div>
              <span class="stitch-badge badge-green">Turnstile Active</span>
            </div>

            <table class="stitch-table">
              <thead>
                <tr>
                  <th>Cart ID</th>
                  <th>Customer</th>
                  <th>Cart Items</th>
                  <th>Scale Weight</th>
                  <th>Gate Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                ${smartCarts.map(c => `
                  <tr>
                    <td><strong style="color: #0284C7; font-family: monospace;">${c.cartId}</strong></td>
                    <td>
                      <div style="font-weight: 600;">${c.customerName}</div>
                      <div style="font-size: 10px; color: var(--text-muted);">${c.customerPhone}</div>
                    </td>
                    <td><span class="stitch-badge badge-cyan">${c.itemCount} items</span></td>
                    <td>
                      <div style="font-weight: 700;">${c.actualWeightGrams}g</div>
                      <div style="font-size: 9px; color: ${c.weightStatus === 'verified' ? '#16A34A' : '#DC2626'}; font-weight: 600;">
                        ${c.weightStatus === 'verified' ? '✓ 100% Match' : '⚠️ Weight Mismatch'}
                      </div>
                    </td>
                    <td>
                      <span class="stitch-badge ${c.status === 'checked_out' ? 'badge-green' : 'badge-amber'}">
                        ${c.status === 'checked_out' ? '🔓 Unlocked' : '🔒 Locked'}
                      </span>
                    </td>
                    <td><span style="font-size: 11px; color: var(--text-muted);">${c.lastPing}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

        </div>

        <!-- Right Column: Hardware Health Monitor & Top Scan Right Now -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Hardware Health Monitor Card -->
          <div class="stitch-card" style="background: #FFFFFF;">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
              Hardware Health Monitor
            </h3>

            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">ESP32 BLE Mesh Protocol</span>
                <span style="font-weight: 700; color: #10B981;">Online (18 Nodes)</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">Average Battery Level</span>
                <span style="font-weight: 700;">86% (Good)</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">HX711 Load Cell Drift</span>
                <span style="font-weight: 700; color: #0284C7;">&lt; 2.1g Variance</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">Express Gate Response</span>
                <span style="font-weight: 700;">140 ms</span>
              </div>
            </div>
          </div>

          <!-- Top Scan Right Now / Popular Products List -->
          <div class="stitch-card" style="background: #FFFFFF;">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
              Top Scanned Products Right Now
            </h3>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${products.slice(0, 4).map(p => `
                <div style="display: flex; items-center; justify-content: space-between; font-size: 12px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${p.image}" alt="${p.name}" style="width: 32px; height: 32px; border-radius: 4px; object-fit: cover;"/>
                    <div>
                      <div style="font-weight: 600;">${p.name}</div>
                      <div style="font-size: 9px; color: var(--text-muted);">${p.locationName.split('–')[0]}</div>
                    </div>
                  </div>
                  <div style="font-weight: 700; color: var(--text-primary);">₹${p.price.toFixed(2)}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

export function bindAdminDashboardEvents(container) {
  const refreshBtn = container.querySelector('#btn-admin-broadcast');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => store.showToast('Broadcast notification sent to active carts', 'info'));
  }
}
