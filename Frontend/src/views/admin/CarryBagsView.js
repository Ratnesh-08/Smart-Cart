// Smart Cart AI - Admin Carry Bags View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminCarryBags() {
  const bags = store.carryBags.filter(b => b.id !== 'bag-none');

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Carry Bag Catalog & Pricing (Retailer Config)</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Synchronized with all in-store Smart Carts for express automated checkout</p>
        </div>
        <button id="btn-add-bag-type" class="btn-primary" style="background: #0F172A;">
          ${getIcon('plus', 14)} Add Carry Bag Option
        </button>
      </div>

      <!-- Carry Bag Option Cards Grid (Matching Stitch Screenshot) -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        ${bags.map(b => `
          <div class="stitch-card" style="background: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid ${b.isEnabled ? '#0EA5E9' : '#94A3B8'};">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${b.name}</h3>
                  <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">Bag ID: ${b.id}</div>
                </div>
                <span class="stitch-badge ${b.isEnabled ? 'badge-green' : 'badge-red'}" style="font-size: 10px;">
                  ${b.isEnabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              
              <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">${b.description}</p>
              
              <div style="background: var(--bg-subtle); padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 12px;">
                <div>
                  <span style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">UNIT PRICE</span>
                  <div style="font-size: 16px; font-weight: 700; color: #0284C7;">₹${b.price.toFixed(2)}</div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">STOCK INVENTORY</span>
                  <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${b.stock !== undefined ? b.stock : b.inventory || 200} units</div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 6px;">
              <button class="btn-edit-bag btn-secondary" data-id="${b.id}" style="flex: 1; padding: 6px; font-size: 11px;">
                ${getIcon('edit', 12)} Edit Price & Stock
              </button>
              <button class="btn-toggle-bag btn-secondary" data-id="${b.id}" style="padding: 6px 10px; font-size: 11px;">
                ${b.isEnabled ? 'Disable' : 'Enable'}
              </button>
              <button class="btn-delete-bag btn-danger" data-id="${b.id}" title="Remove" style="padding: 6px 8px; font-size: 11px;">
                ${getIcon('trash', 12)}
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Add/Edit Bag Modal Form -->
      <div id="carry-bag-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 id="bag-modal-title" style="font-size: 16px; font-weight: 700;">Edit Carry Bag Option</h3>
            <button id="btn-close-bag-modal" style="border: none; background: transparent; cursor: pointer;">
              ${getIcon('x', 20)}
            </button>
          </div>

          <form id="form-carry-bag" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="hidden" id="bag-form-id"/>

            <div class="form-group">
              <label class="form-label">Bag Name</label>
              <input type="text" id="bag-form-name" class="form-input" placeholder="e.g. Eco Paper Bag" required/>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Unit Price (₹)</label>
                <input type="number" step="0.5" id="bag-form-price" class="form-input" placeholder="5.00" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Stock Inventory</label>
                <input type="number" id="bag-form-stock" class="form-input" placeholder="250" required/>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Description / Capacity</label>
              <input type="text" id="bag-form-desc" class="form-input" placeholder="Eco-friendly • Holds up to 5kg"/>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 8px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save Carry Bag Configuration
            </button>
          </form>
        </div>
      </div>

    </div>
  `;
}

export function bindAdminCarryBagsEvents(container) {
  const modal = container.querySelector('#carry-bag-modal');
  const closeModalBtn = container.querySelector('#btn-close-bag-modal');
  const form = container.querySelector('#form-carry-bag');
  const addBtn = container.querySelector('#btn-add-bag-type');

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      form.reset();
      container.querySelector('#bag-form-id').value = '';
      container.querySelector('#bag-modal-title').innerText = 'Add New Carry Bag Option';
      modal.style.display = 'flex';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = container.querySelector('#bag-form-id').value;
      const name = container.querySelector('#bag-form-name').value.trim();
      const price = parseFloat(container.querySelector('#bag-form-price').value || 0);
      const stock = parseInt(container.querySelector('#bag-form-stock').value || 100);
      const desc = container.querySelector('#bag-form-desc').value.trim();

      if (id) {
        store.updateCarryBag(id, {
          name,
          price,
          stock,
          inventory: stock,
          description: desc
        });
      } else {
        store.addCarryBag({
          name,
          price,
          stock,
          inventory: stock,
          description: desc || 'Supermarket express carry bag'
        });
      }
      modal.style.display = 'none';
    });
  }

  container.querySelectorAll('.btn-edit-bag').forEach(btn => {
    btn.addEventListener('click', () => {
      const bag = store.carryBags.find(b => b.id === btn.dataset.id);
      if (bag) {
        container.querySelector('#bag-form-id').value = bag.id;
        container.querySelector('#bag-form-name').value = bag.name;
        container.querySelector('#bag-form-price').value = bag.price;
        container.querySelector('#bag-form-stock').value = bag.stock !== undefined ? bag.stock : (bag.inventory || 200);
        container.querySelector('#bag-form-desc').value = bag.description || '';
        container.querySelector('#bag-modal-title').innerText = `Edit ${bag.name}`;
        modal.style.display = 'flex';
      }
    });
  });

  container.querySelectorAll('.btn-toggle-bag').forEach(btn => {
    btn.addEventListener('click', () => {
      store.toggleCarryBagStatus(btn.dataset.id);
    });
  });

  container.querySelectorAll('.btn-delete-bag').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Delete this carry bag option?')) {
        store.deleteCarryBag(btn.dataset.id);
      }
    });
  });
}
