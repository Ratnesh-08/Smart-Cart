// Smart Cart AI - Admin Products View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminProducts() {
  const products = store.products;
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <!-- Top Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Product Catalog & Carry Bag Configuration</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Manage supermarket inventory barcodes, prices, taxes, aisle placement & scale weights</p>
        </div>
        <button id="btn-open-add-product" class="btn-primary" style="background: #0F172A;">
          ${getIcon('plus', 14)} Add New Product
        </button>
      </div>

      <!-- Search & Filters Card -->
      <div class="stitch-card" style="padding: 12px; background: #FFFFFF; display: flex; gap: 12px; align-items: center;">
        <div style="flex: 1; position: relative;">
          <input type="text" id="input-search-products" class="form-input" placeholder="Search product name or EAN-13 barcode..." style="padding-left: 32px;"/>
          <div style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);">${getIcon('search', 14)}</div>
        </div>

        <select id="select-filter-category" class="form-select" style="width: 180px;">
          ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        </select>
      </div>

      <!-- Products Data Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Aisle / Shelf</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="table-products-body">
            ${renderProductRows(products)}
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Product Modal Form (With all requested fields) -->
      <div id="product-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 540px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
            <h3 id="modal-product-title" style="font-size: 16px; font-weight: 700;">Add New Product Catalog Item</h3>
            <button id="btn-close-prod-modal" style="border: none; background: transparent; cursor: pointer;">
              ${getIcon('x', 20)}
            </button>
          </div>

          <form id="form-product" style="display: flex; flex-direction: column; gap: 10px;">
            <input type="hidden" id="prod-form-id"/>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Product Name</label>
                <input type="text" id="prod-form-name" class="form-input" placeholder="Amul Toned Milk 500 mL" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Barcode (EAN-13)</label>
                <input type="text" id="prod-form-barcode" class="form-input" placeholder="8901030864512" required/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Category</label>
                <select id="prod-form-category" class="form-select">
                  <option value="Dairy">Dairy</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Grains">Grains</option>
                  <option value="Spices">Spices</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Household">Household</option>
                  <option value="Packaged Foods">Packaged Foods</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Unit Type / Size</label>
                <input type="text" id="prod-form-unit" class="form-input" placeholder="500 mL / 1 kg" required/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Price (₹)</label>
                <input type="number" step="0.01" id="prod-form-price" class="form-input" placeholder="28.00" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Discount (%)</label>
                <input type="number" step="0.1" id="prod-form-discount" class="form-input" placeholder="0"/>
              </div>
              <div class="form-group">
                <label class="form-label">GST Tax (%)</label>
                <input type="number" step="0.1" id="prod-form-tax" class="form-input" placeholder="5.0"/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Stock Quantity</label>
                <input type="number" id="prod-form-stock" class="form-input" placeholder="100" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Store Aisle</label>
                <select id="prod-form-location" class="form-select">
                  ${store.locations.map(loc => `<option value="${loc.id}">${loc.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Shelf Bay</label>
                <input type="text" id="prod-form-shelf" class="form-input" placeholder="Shelf A, Bay 2"/>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Scale Expected Weight (Grams)</label>
              <input type="number" step="0.1" id="prod-form-weight" class="form-input" placeholder="510.0" required/>
            </div>

            <div class="form-group">
              <label class="form-label">Image URL</label>
              <input type="text" id="prod-form-image" class="form-input" placeholder="https://images.unsplash.com/..."/>
            </div>

            <div class="form-group">
              <label class="form-label">Product Description</label>
              <textarea id="prod-form-description" class="form-textarea" rows="2" placeholder="Item description and nutritional details..."></textarea>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 10px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save Product Catalog Item
            </button>
          </form>
        </div>
      </div>

    </div>
  `;
}

function renderProductRows(products) {
  if (products.length === 0) {
    return `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 20px;">No products found</td></tr>`;
  }
  return products.map(p => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${p.image}" alt="${p.name}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-light);"/>
          <div>
            <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${p.name}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${p.unit} • ${p.expectedWeight}g</div>
          </div>
        </div>
      </td>
      <td><span style="font-family: monospace; font-size: 11px; font-weight: 600; color: var(--text-secondary);">${p.barcode}</span></td>
      <td><span class="stitch-badge badge-cyan">${p.category}</span></td>
      <td><strong style="color: var(--text-primary);">₹${p.price.toFixed(2)}</strong></td>
      <td>
        <strong style="${p.stock < 50 ? 'color: var(--amber-warning);' : 'color: var(--text-primary);'}">
          ${p.stock} pcs
        </strong>
      </td>
      <td><span style="font-size: 11px;">${p.locationName.split('–')[0]} (${p.shelf || 'Shelf A'})</span></td>
      <td>
        <span class="stitch-badge ${p.isActive ? 'badge-green' : 'badge-red'}">
          ${p.isActive ? 'Active' : 'Disabled'}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn-edit-prod btn-secondary" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">
            ${getIcon('edit', 12)} Edit
          </button>
          <button class="btn-toggle-prod btn-secondary" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">
            ${p.isActive ? 'Disable' : 'Enable'}
          </button>
          <button class="btn-delete-prod btn-danger" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">
            ${getIcon('trash', 12)}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

export function bindAdminProductsEvents(container) {
  const searchInput = container.querySelector('#input-search-products');
  const catSelect = container.querySelector('#select-filter-category');
  const tableBody = container.querySelector('#table-products-body');
  const modal = container.querySelector('#product-modal');
  const openModalBtn = container.querySelector('#btn-open-add-product');
  const closeModalBtn = container.querySelector('#btn-close-prod-modal');
  const form = container.querySelector('#form-product');

  const filterTable = () => {
    const q = searchInput.value.toLowerCase().trim();
    const cat = catSelect.value;
    const filtered = store.products.filter(p => {
      const matchQ = p.name.toLowerCase().includes(q) || p.barcode.includes(q);
      const matchCat = cat === 'All' || p.category === cat;
      return matchQ && matchCat;
    });
    tableBody.innerHTML = renderProductRows(filtered);
    bindRowButtons();
  };

  if (searchInput) searchInput.addEventListener('input', filterTable);
  if (catSelect) catSelect.addEventListener('change', filterTable);

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      form.reset();
      container.querySelector('#prod-form-id').value = '';
      container.querySelector('#modal-product-title').innerText = 'Add New Product Catalog Item';
      modal.style.display = 'flex';
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = container.querySelector('#prod-form-id').value;
      const locId = container.querySelector('#prod-form-location').value;
      const locObj = store.locations.find(l => l.id === locId);

      const prodData = {
        name: container.querySelector('#prod-form-name').value.trim(),
        barcode: container.querySelector('#prod-form-barcode').value.trim(),
        category: container.querySelector('#prod-form-category').value,
        unit: container.querySelector('#prod-form-unit').value.trim(),
        price: container.querySelector('#prod-form-price').value,
        discount: container.querySelector('#prod-form-discount').value || 0,
        tax: container.querySelector('#prod-form-tax').value || 5.0,
        stock: container.querySelector('#prod-form-stock').value || 100,
        locationId: locId,
        locationName: locObj ? locObj.name : 'Aisle 1',
        shelf: container.querySelector('#prod-form-shelf').value || 'Shelf A',
        expectedWeight: container.querySelector('#prod-form-weight').value,
        image: container.querySelector('#prod-form-image').value.trim(),
        description: container.querySelector('#prod-form-description').value.trim()
      };

      if (id) {
        store.updateProduct(id, prodData);
      } else {
        store.addProduct(prodData);
      }
      modal.style.display = 'none';
      filterTable();
    });
  }

  const bindRowButtons = () => {
    container.querySelectorAll('.btn-edit-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = store.products.find(p => p.id === btn.dataset.id);
        if (prod) {
          container.querySelector('#prod-form-id').value = prod.id;
          container.querySelector('#prod-form-name').value = prod.name;
          container.querySelector('#prod-form-barcode').value = prod.barcode;
          container.querySelector('#prod-form-category').value = prod.category;
          container.querySelector('#prod-form-unit').value = prod.unit;
          container.querySelector('#prod-form-price').value = prod.price;
          container.querySelector('#prod-form-discount').value = prod.discount || 0;
          container.querySelector('#prod-form-tax').value = prod.tax || 5.0;
          container.querySelector('#prod-form-stock').value = prod.stock;
          container.querySelector('#prod-form-shelf').value = prod.shelf || 'Shelf A';
          container.querySelector('#prod-form-weight').value = prod.expectedWeight;
          container.querySelector('#prod-form-image').value = prod.image;
          container.querySelector('#prod-form-description').value = prod.description || '';
          container.querySelector('#modal-product-title').innerText = 'Edit Product Catalog Item';
          modal.style.display = 'flex';
        }
      });
    });

    container.querySelectorAll('.btn-toggle-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        store.toggleProductStatus(btn.dataset.id);
        filterTable();
      });
    });

    container.querySelectorAll('.btn-delete-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove this product?')) {
          store.deleteProduct(btn.dataset.id);
          filterTable();
        }
      });
    });
  };

  bindRowButtons();
}
