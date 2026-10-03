// Smart Cart AI - Admin Store Map View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminStoreMap() {
  const locations = store.locations;

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Interactive Supermarket Floorplan & Aisle Map</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Configure indoor digital map locations, section placement & shelf bay coordinates</p>
        </div>
        <button id="btn-add-location" class="btn-primary" style="background: #0F172A;">
          ${getIcon('plus', 14)} Add New Location Zone
        </button>
      </div>

      <!-- Supermarket Grid Map Layout Card -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 14px; font-weight: 700;">Supermarket Floorplan Grid</h3>
          <span class="stitch-badge badge-cyan">${locations.length} Active Store Zones</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #F1F5F9; padding: 14px; border-radius: 12px; border: 1px solid var(--border-light);">
          ${locations.map(loc => {
            const prodCount = store.products.filter(p => p.locationId === loc.id).length;
            return `
              <div class="store-zone-card" data-id="${loc.id}" style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 10px; border-radius: 8px; cursor: pointer; transition: all 0.15s ease;">
                <div style="font-size: 11px; font-weight: 700; color: var(--text-primary);">${loc.name}</div>
                <div style="font-size: 10px; color: #0284C7; font-weight: 600; margin-top: 2px;">${loc.aisle} • ${loc.section || 'General'}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 9px; color: var(--text-muted);">
                  <span>Shelf: ${loc.shelf || 'Shelf A'}</span>
                  <span class="stitch-badge badge-green" style="font-size: 8px;">${prodCount} Items</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Store Locations Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Zone Name</th>
              <th>Aisle Tag</th>
              <th>Section</th>
              <th>Shelf</th>
              <th>Map Coordinates (X, Y)</th>
              <th>Assigned Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${locations.map(loc => {
              const count = store.products.filter(p => p.locationId === loc.id).length;
              return `
                <tr>
                  <td><div style="font-weight: 700; color: var(--text-primary);">${loc.name}</div></td>
                  <td><span class="stitch-badge badge-cyan">${loc.aisle}</span></td>
                  <td>${loc.section || '-'}</td>
                  <td>${loc.shelf || 'Shelf A'}</td>
                  <td><span style="font-family: monospace; font-size: 11px;">(${loc.x !== undefined ? loc.x : 0}, ${loc.y !== undefined ? loc.y : 0})</span></td>
                  <td><span class="stitch-badge badge-green">${count} products</span></td>
                  <td>
                    <button class="btn-edit-location btn-secondary" data-id="${loc.id}" style="padding: 4px 8px; font-size: 11px;">
                      ${getIcon('edit', 12)} Edit
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Store Zone Modal Form -->
      <div id="location-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 id="loc-modal-title" style="font-size: 16px; font-weight: 700;">Edit Location Zone</h3>
            <button id="btn-close-loc-modal" style="border: none; background: transparent; cursor: pointer;">
              ${getIcon('x', 20)}
            </button>
          </div>

          <form id="form-location" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="hidden" id="loc-form-id"/>

            <div class="form-group">
              <label class="form-label">Zone Display Name</label>
              <input type="text" id="loc-form-name" class="form-input" placeholder="e.g. Aisle 6 – Baby Care" required/>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Aisle Label</label>
                <input type="text" id="loc-form-aisle" class="form-input" placeholder="Aisle 6" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Department / Section</label>
                <input type="text" id="loc-form-section" class="form-input" placeholder="Baby Care"/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Shelf Bay</label>
                <input type="text" id="loc-form-shelf" class="form-input" placeholder="Shelf A"/>
              </div>
              <div class="form-group">
                <label class="form-label">Grid X</label>
                <input type="number" id="loc-form-x" class="form-input" placeholder="6"/>
              </div>
              <div class="form-group">
                <label class="form-label">Grid Y</label>
                <input type="number" id="loc-form-y" class="form-input" placeholder="1"/>
              </div>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 8px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save Location Zone
            </button>
          </form>
        </div>
      </div>

    </div>
  `;
}

export function bindAdminStoreMapEvents(container) {
  const modal = container.querySelector('#location-modal');
  const closeModalBtn = container.querySelector('#btn-close-loc-modal');
  const form = container.querySelector('#form-location');
  const addBtn = container.querySelector('#btn-add-location');

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      form.reset();
      container.querySelector('#loc-form-id').value = '';
      container.querySelector('#loc-modal-title').innerText = 'Add New Location Zone';
      modal.style.display = 'flex';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = container.querySelector('#loc-form-id').value;
      const name = container.querySelector('#loc-form-name').value.trim();
      const aisle = container.querySelector('#loc-form-aisle').value.trim();
      const section = container.querySelector('#loc-form-section').value.trim();
      const shelf = container.querySelector('#loc-form-shelf').value.trim() || 'Shelf A';
      const x = parseInt(container.querySelector('#loc-form-x').value || 0);
      const y = parseInt(container.querySelector('#loc-form-y').value || 0);

      if (id) {
        const loc = store.locations.find(l => l.id === id);
        if (loc) {
          Object.assign(loc, { name, aisle, section, shelf, x, y });
          store.showToast(`Zone "${name}" updated`, 'success');
          store.notify();
        }
      } else {
        const newLoc = {
          id: `loc-${Date.now()}`,
          name,
          aisle,
          section,
          shelf,
          x,
          y
        };
        store.locations.push(newLoc);
        store.showToast(`Zone "${name}" created`, 'success');
        store.notify();
      }
      modal.style.display = 'none';
    });
  }

  container.querySelectorAll('.btn-edit-location').forEach(btn => {
    btn.addEventListener('click', () => {
      const loc = store.locations.find(l => l.id === btn.dataset.id);
      if (loc) {
        container.querySelector('#loc-form-id').value = loc.id;
        container.querySelector('#loc-form-name').value = loc.name;
        container.querySelector('#loc-form-aisle').value = loc.aisle;
        container.querySelector('#loc-form-section').value = loc.section || '';
        container.querySelector('#loc-form-shelf').value = loc.shelf || 'Shelf A';
        container.querySelector('#loc-form-x').value = loc.x !== undefined ? loc.x : 0;
        container.querySelector('#loc-form-y').value = loc.y !== undefined ? loc.y : 0;
        container.querySelector('#loc-modal-title').innerText = `Edit ${loc.name}`;
        modal.style.display = 'flex';
      }
    });
  });
}
