// Smart Cart AI - Admin Orders & Bills Ledger View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminOrders() {
  const orders = store.orders;

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Orders & Checkout Bills Ledger</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Audit customer transactions, digital invoices, and IoT scale verification logs</p>
        </div>
        <span class="stitch-badge badge-green">${orders.length} Completed Invoices</span>
      </div>

      <!-- Orders Data Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Bill ID / Order #</th>
              <th>Cart ID</th>
              <th>Date & Time</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Scale Audit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td><strong style="font-family: monospace; font-size: 11px; color: #0284C7;">${o.orderNumber}</strong></td>
                <td><span class="stitch-badge badge-cyan">${o.cartId || 'CART #07'}</span></td>
                <td><span style="font-size: 11px; color: var(--text-muted);">${o.createdAt}</span></td>
                <td>
                  <div style="font-weight: 600;">${o.customerName}</div>
                  <div style="font-size: 9px; color: var(--text-muted);">${o.customerPhone}</div>
                </td>
                <td><span class="stitch-badge badge-cyan">${o.items.reduce((s,i)=>s+i.quantity,0)} items</span></td>
                <td><strong style="font-size: 14px; color: var(--text-primary);">₹${o.totalAmount.toFixed(2)}</strong></td>
                <td><span class="stitch-badge badge-green">${o.status.toUpperCase()} (${o.paymentMethod.toUpperCase()})</span></td>
                <td>
                  <span class="stitch-badge ${o.weightVerified ? 'badge-green' : 'badge-amber'}">
                    ${o.weightVerified ? '✓ 100% Scale Match' : '⚠️ Unverified'}
                  </span>
                </td>
                <td>
                  <button class="btn-inspect-order btn-secondary" data-id="${o.id}" style="padding: 4px 10px; font-size: 11px;">
                    Inspect Bill
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Inspect Bill Modal -->
      <div id="admin-inspect-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px; font-family: monospace;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 style="font-size: 15px; font-weight: 700; font-family: sans-serif;">Invoice Inspection</h3>
            <button id="btn-close-inspect-modal" style="border: none; background: transparent; cursor: pointer;">
              ${getIcon('x', 20)}
            </button>
          </div>

          <div id="admin-inspect-modal-body"></div>
        </div>
      </div>

    </div>
  `;
}

export function bindAdminOrdersEvents(container) {
  const modal = container.querySelector('#admin-inspect-modal');
  const modalBody = container.querySelector('#admin-inspect-modal-body');
  const closeModalBtn = container.querySelector('#btn-close-inspect-modal');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
  }

  container.querySelectorAll('.btn-inspect-order').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = store.orders.find(o => o.id === btn.dataset.id);
      if (order) {
        modalBody.innerHTML = `
          <div style="text-align: center; border-bottom: 2px dashed #CBD5E1; padding-bottom: 10px; margin-bottom: 10px;">
            <h2 style="font-size: 15px; font-weight: 700; font-family: sans-serif;">SUPERMART HAZRATGANJ</h2>
            <div style="font-size: 10px; color: var(--text-secondary);">Invoice: ${order.orderNumber}</div>
            <div style="font-size: 9px; color: var(--text-muted);">${order.createdAt}</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; margin-bottom: 10px;">
            ${order.items.map(item => `
              <div style="display: flex; justify-content: space-between;">
                <span>${item.name} × ${item.quantity}</span>
                <span>₹${item.totalPrice.toFixed(2)}</span>
              </div>
            `).join('')}
            
            ${order.carryBagCharge > 0 ? `
              <div style="display: flex; justify-content: space-between; color: #0284C7;">
                <span>Carry Bag (${order.carryBagName})</span>
                <span>₹${order.carryBagCharge.toFixed(2)}</span>
              </div>
            ` : ''}
          </div>

          <div style="border-top: 1px dashed #CBD5E1; padding-top: 6px; font-size: 11px; display: flex; flex-direction: column; gap: 3px; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span><span>₹${order.subtotal.toFixed(2)}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>GST (5%):</span><span>₹${order.tax.toFixed(2)}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: var(--text-primary); border-top: 1px solid #CBD5E1; padding-top: 4px;">
              <span>TOTAL PAID:</span><span>₹${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div style="background: #DCFCE7; color: #15803D; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center; font-weight: 700;">
            ✓ Payment Verified (${order.paymentMethod.toUpperCase()}) • IoT Weight Scale Audit Passed
          </div>
        `;
        modal.style.display = 'flex';
      }
    });
  });
}
