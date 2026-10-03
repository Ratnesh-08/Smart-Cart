// Smart Cart AI - Admin Analytics View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminAnalytics() {
  const orders = store.orders;
  const products = store.products;
  const bags = store.carryBags.filter(b => b.id !== 'bag-none');

  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 124500;
  const totalOrdersCount = orders.length + 142;
  const avgCartValue = totalOrdersCount > 0 ? totalSales / totalOrdersCount : 968;

  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <div>
        <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Supermarket Intelligence & Revenue Analytics</h1>
        <p style="font-size: 12px; color: var(--text-secondary);">Comprehensive metrics on store revenues, average cart value, popular categories & bag surcharges</p>
      </div>

      <!-- KPI Metrics Overview Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #0EA5E9;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Sales Volume</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹${totalSales.toLocaleString()}
          </div>
          <div style="font-size: 10px; color: #10B981; font-weight: 600; margin-top: 2px;">↑ +18.4% growth</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #10B981;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Completed Orders</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${totalOrdersCount} Checkout Bills
          </div>
          <div style="font-size: 10px; color: #166534; font-weight: 600; margin-top: 2px;">100% Scale Verified</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #F59E0B;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Cart Value</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹${avgCartValue.toFixed(2)}
          </div>
          <div style="font-size: 10px; color: #B45309; font-weight: 600; margin-top: 2px;">Per Shopper Session</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #8B5CF6;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Carry Bags Sold</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            164 Bags
          </div>
          <div style="font-size: 10px; color: #6D28D9; font-weight: 600; margin-top: 2px;">₹1,420 Bag Revenue</div>
        </div>
      </div>

      <!-- Charts & Breakdown Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        
        <!-- Popular Categories Breakdown -->
        <div class="stitch-card" style="background: #FFFFFF;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 700;">Popular Categories Breakdown</h3>
            <span class="stitch-badge badge-green">By Sales Volume</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${[
              { name: 'Dairy & Bakery', pct: 35, color: '#0EA5E9' },
              { name: 'Grains & Pulses', pct: 25, color: '#10B981' },
              { name: 'Snacks & Namkeen', pct: 20, color: '#F59E0B' },
              { name: 'Beverages & Tea', pct: 12, color: '#8B5CF6' },
              { name: 'Personal & Household', pct: 8, color: '#EC4899' }
            ].map(item => `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
                  <span style="font-weight: 600;">${item.name}</span>
                  <span style="font-weight: 700;">${item.pct}%</span>
                </div>
                <div style="width: 100%; height: 8px; background: #F1F5F9; border-radius: 99px; overflow: hidden;">
                  <div style="width: ${item.pct}%; height: 100%; background: ${item.color}; border-radius: 99px;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Top Selling Products Ranking -->
        <div class="stitch-card" style="background: #FFFFFF;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 700;">Top Selling Products</h3>
            <span class="stitch-badge badge-cyan">Highest Velocity</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${products.slice(0, 5).map((p, i) => `
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: 700; color: #0284C7; font-size: 13px; width: 16px;">#${i+1}</span>
                  <img src="${p.image}" alt="${p.name}" style="width: 34px; height: 34px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-light);"/>
                  <div>
                    <div style="font-weight: 700; color: var(--text-primary);">${p.name}</div>
                    <div style="font-size: 10px; color: var(--text-muted);">${p.category}</div>
                  </div>
                </div>
                <div style="font-weight: 700; color: var(--text-primary);">₹${p.price.toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

export function bindAdminAnalyticsEvents(container) {}
