// Smart Cart AI - Customer Digital Store Map & Indoor Navigation (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderCustomerNavigate() {
  const products = store.products;
  const targetId = store.navTargetProductId || 'p-6';
  const targetProduct = products.find(p => p.id === targetId) || products[0];

  const aisleMapping = [
    { title: 'Aisle 1', category: 'Dairy & Bakery', color: '#E0F2FE', border: '#BAE6FD', matchLoc: 'loc-2', example: 'Milk, Bread, Butter, Dahi' },
    { title: 'Aisle 2', category: 'Grains, Pulses & Spices', color: '#FEF3C7', border: '#FDE68A', matchLoc: 'loc-4', example: 'Rice, Atta, Masoor Dal, Garam Masala' },
    { title: 'Aisle 3', category: 'Snacks & Beverages', color: '#FCE7F3', border: '#FBCFE8', matchLoc: 'loc-6', example: "Chips, Bhujia, Tea, Coffee, Juice" },
    { title: 'Aisle 4', category: 'Personal Care & Home', color: '#E0E7FF', border: '#C7D2FE', matchLoc: 'loc-8', example: 'Shampoo, Soap, Toothpaste, Vim Bar' },
    { title: 'Aisle 5', category: 'Frozen & Packaged Foods', color: '#F3E8FF', border: '#E9D5FF', matchLoc: 'loc-11', example: 'Maggi Noodles, Packaged Meals' },
    { title: 'Fresh Produce', category: 'Fruits & Vegetables', color: '#DCFCE7', border: '#86EFAC', matchLoc: 'loc-13', example: 'Fresh Apples, Bananas, Potatoes' }
  ];

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Indoor Store Map Navigation</h2>
          <p style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • Digital Sensor Mesh Positioning</p>
        </div>
        <span class="stitch-badge badge-green">Optical Scale Sync</span>
      </div>

      <!-- Product Search & Locator Selector Card -->
      <div class="stitch-card" style="padding: 12px; background: #FFFFFF;">
        <label class="form-label" style="font-size: 10px;">Find Product Indoor Location</label>
        <div style="display: flex; gap: 8px;">
          <select id="select-map-product" class="form-select" style="font-size: 12px;">
            ${products.map(p => `
              <option value="${p.id}" ${targetProduct.id === p.id ? 'selected' : ''}>
                ${p.name} ➔ ${p.locationName.split('–')[0]}
              </option>
            `).join('')}
          </select>
          <button id="btn-highlight-route" class="btn-primary" style="white-space: nowrap; font-size: 12px; padding: 8px 14px; background: #0F172A;">
            ${getIcon('navigate', 14)} Locate
          </button>
        </div>
      </div>

      <!-- Turn-by-Turn Route Direction Banner (Matching Stitch Screenshot) -->
      <div class="stitch-card" style="background: #E0F2FE; border: 1px solid #BAE6FD; display: flex; align-items: center; gap: 12px; padding: 12px;">
        <div style="width: 40px; height: 40px; border-radius: 10px; background: #0284C7; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
          ${getIcon('navigate', 20)}
        </div>
        <div style="flex: 1;">
          <div style="font-size: 10px; font-weight: 700; color: #0284C7; text-transform: uppercase; letter-spacing: 0.05em;">
            Turn-by-Turn Route: ${targetProduct.name}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #0369A1; margin-top: 2px;">
            Start at Entrance ➔ Walk straight into <strong>${targetProduct.locationName}</strong>
          </div>
          <div style="font-size: 10px; color: #0369A1; margin-top: 1px;">
            Item location: Shelf A, Bay 2 • Price: ₹${targetProduct.price.toFixed(2)}
          </div>
        </div>
      </div>

      <!-- Interactive Digital Supermarket Floorplan Map Card -->
      <div class="stitch-card" style="padding: 14px; background: #FFFFFF; border: 1px solid var(--border-light);">
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">
            📍 Supermarket Floorplan Grid
          </span>
          <span class="stitch-badge badge-cyan" style="font-size: 9px;">Cart Sensor Position: Entrance</span>
        </div>

        <!-- Store Map Grid -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: #F1F5F9; padding: 12px; border-radius: 12px; border: 1px solid var(--border-light); position: relative;">
          
          <!-- Entrance Zone -->
          <div style="grid-column: span 1; background: #E2E8F0; padding: 10px; border-radius: 8px; text-align: center; border: 2px dashed #94A3B8;">
            <div style="font-size: 11px; font-weight: 700; color: #334155;">ENTRANCE 🚪</div>
            <div style="font-size: 9px; color: #0284C7; font-weight: 600; margin-top: 2px;">Current Cart Position 📍</div>
          </div>

          <!-- Checkout Zone -->
          <div style="grid-column: span 1; background: #DCFCE7; padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #86EFAC;">
            <div style="font-size: 11px; font-weight: 700; color: #15803D;">CHECKOUT COUNTER 💳</div>
            <div style="font-size: 9px; color: #166534;">IoT Scale Gate</div>
          </div>

          <!-- Aisle Cards Grid -->
          ${aisleMapping.map(aisle => {
            const isTarget = targetProduct.locationName.toLowerCase().includes(aisle.title.toLowerCase()) || 
                             targetProduct.category.toLowerCase().includes(aisle.category.split(' ')[0].toLowerCase());
            return `
              <div class="map-aisle-zone" style="grid-column: span 1; background: ${isTarget ? '#0EA5E9' : aisle.color}; color: ${isTarget ? '#FFFFFF' : 'var(--text-primary)'}; padding: 12px; border-radius: 10px; border: 2px ${isTarget ? 'solid #0284C7' : 'solid ' + aisle.border}; position: relative; transition: all 0.2s ease;">
                ${isTarget ? `
                  <div style="position: absolute; top: -10px; right: -6px; background: #EF4444; color: white; border-radius: 99px; padding: 2px 8px; font-size: 9px; font-weight: 700; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);">
                    TARGET PIN📍
                  </div>
                ` : ''}
                <div style="font-size: 12px; font-weight: 700;">${aisle.title}</div>
                <div style="font-size: 10px; opacity: 0.95; font-weight: 600;">${aisle.category}</div>
                <div style="font-size: 9px; opacity: 0.8; margin-top: 4px; font-family: monospace;">e.g. ${aisle.example}</div>
              </div>
            `;
          }).join('')}

        </div>
      </div>

      <!-- Selected Product Location Details Card -->
      <div class="stitch-card" style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${targetProduct.image}" alt="${targetProduct.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-light);"/>
          <div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${targetProduct.name}</div>
            <div style="font-size: 11px; color: #0284C7; font-weight: 600;">📍 ${targetProduct.locationName}</div>
            <div style="font-size: 10px; color: var(--text-muted);">Price: ₹${targetProduct.price.toFixed(2)} • Stock: ${targetProduct.stock} units</div>
          </div>
        </div>

        <button class="btn-primary btn-add-from-nav" data-id="${targetProduct.id}" style="padding: 8px 12px; font-size: 12px; font-weight: 700; background: #0F172A; border-radius: 8px;">
          ${getIcon('plus', 14)} Add
        </button>
      </div>

    </div>
  `;
}

export function bindNavigateEvents(container) {
  const selectProd = container.querySelector('#select-map-product');
  const navBtn = container.querySelector('#btn-highlight-route');
  const addBtn = container.querySelector('.btn-add-from-nav');

  if (selectProd && navBtn) {
    navBtn.addEventListener('click', () => {
      const prodId = selectProd.value;
      store.setCustomerTab('navigate', { productId: prodId });
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const id = addBtn.dataset.id;
      const product = store.products.find(p => p.id === id);
      if (product) store.addToCart(product, 1);
    });
  }
}
