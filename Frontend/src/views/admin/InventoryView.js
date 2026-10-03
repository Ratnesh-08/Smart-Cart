// Smart Cart AI - Admin Inventory View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminInventory() {
  const products = store.products;
  const lowStock = products.filter(p => p.stock < 50 && p.stock > 0);
  const outOfStock = products.filter(p => p.stock === 0);
  const healthyStock = products.filter(p => p.stock >= 50);

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Inventory & Stock Levels</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Real-time shelf inventory control, restock alerts, and stock adjustments</p>
        </div>
        <button id="btn-export-inventory" class="btn-secondary" style="font-size: 12px;">
          ${getIcon('orders', 14)} Export Stock Log
        </button>
      </div>

      <!-- Inventory KPI Overview Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
        <div class="stitch-card" style="border-left: 4px solid #0EA5E9; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Products</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${products.length} Items
          </div>
          <div style="font-size: 10px; color: #0284C7; margin-top: 2px;">Catalog Total</div>
        </div>

        <div class="stitch-card" style="border-left: 4px solid #10B981; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Healthy Stock</div>
          <div style="font-size: 22px; font-weight: 700; color: #10B981; margin-top: 4px;">
            ${healthyStock.length} Items
          </div>
          <div style="font-size: 10px; color: #166534; margin-top: 2px;">Stock ≥ 50 units</div>
        </div>

        <div class="stitch-card" style="border-left: 4px solid #F59E0B; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Low Stock Warning</div>
          <div style="font-size: 22px; font-weight: 700; color: #F59E0B; margin-top: 4px;">
            ${lowStock.length} Items
          </div>
          <div style="font-size: 10px; color: #B45309; margin-top: 2px;">Stock &lt; 50 units</div>
        </div>

        <div class="stitch-card" style="border-left: 4px solid #EF4444; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Out of Stock</div>
          <div style="font-size: 22px; font-weight: 700; color: #EF4444; margin-top: 4px;">
            ${outOfStock.length} Items
          </div>
          <div style="font-size: 10px; color: #B91C1C; margin-top: 2px;">Requires Reorder</div>
        </div>
      </div>

      <!-- Inventory Data Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Aisle & Shelf</th>
              <th>Current Stock</th>
              <th>Reorder Status</th>
              <th>Availability</th>
              <th>Update Stock</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>
                  <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${p.name}</div>
                  <div style="font-size: 10px; color: var(--text-muted); font-family: monospace;">EAN: ${p.barcode}</div>
                </td>
                <td><span class="stitch-badge badge-cyan">${p.category}</span></td>
                <td><span style="font-size: 11px;">${p.locationName.split('–')[0]} (${p.shelf || 'Shelf A'})</span></td>
                <td>
                  <strong style="font-size: 14px; ${p.stock < 50 ? 'color: var(--amber-warning);' : 'color: var(--text-primary);'}">
                    ${p.stock} units
                  </strong>
                </td>
                <td>
                  <span class="stitch-badge ${p.stock === 0 ? 'badge-red' : p.stock < 50 ? 'badge-amber' : 'badge-green'}">
                    ${p.stock === 0 ? '🚨 Out of Stock' : p.stock < 50 ? '⚠️ Low Stock (<50)' : '✓ Stock Healthy'}
                  </span>
                </td>
                <td>
                  <span class="stitch-badge ${p.stock > 0 ? 'badge-green' : 'badge-red'}">
                    ${p.stock > 0 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <button class="btn-stock-sub btn-secondary" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">-10</button>
                    <button class="btn-stock-add btn-secondary" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">+50</button>
                    <button class="btn-stock-custom btn-primary" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px; background: #0F172A;">Set</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

    </div>
  `;
}

export function bindAdminInventoryEvents(container) {
  container.querySelectorAll('.btn-stock-sub').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = store.products.find(p => p.id === btn.dataset.id);
      if (prod) store.updateStock(prod.id, prod.stock - 10);
    });
  });

  container.querySelectorAll('.btn-stock-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = store.products.find(p => p.id === btn.dataset.id);
      if (prod) store.updateStock(prod.id, prod.stock + 50);
    });
  });

  container.querySelectorAll('.btn-stock-custom').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = store.products.find(p => p.id === btn.dataset.id);
      if (prod) {
        const val = prompt(`Set exact stock quantity for ${prod.name}:`, prod.stock);
        if (val !== null && !isNaN(val)) {
          store.updateStock(prod.id, parseInt(val));
        }
      }
    });
  });
}
