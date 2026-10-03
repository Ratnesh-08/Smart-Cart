// Smart Cart AI - Admin Settings View (Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminSettings() {
  const settings = store.settings;

  return `
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 640px;">
      
      <div>
        <h1 style="font-size: 20px; font-weight: 700;">System Configuration & Settings</h1>
        <p style="font-size: 12px; color: var(--text-secondary);">Hardware sensor calibration, Supabase backend keys & store profile</p>
      </div>

      <div class="stitch-card">
        <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          ${getIcon('settings', 16)} Hardware Weight Scale Settings
        </h3>

        <form id="form-settings" style="display: flex; flex-direction: column; gap: 12px;">
          
          <div class="form-group">
            <label class="form-label">HX711 Load Cell Tolerance Threshold (Grams)</label>
            <input type="number" id="setting-tolerance" class="form-input" value="${settings.weightToleranceGrams}"/>
            <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">
              Acceptable weight variance before triggering checkout anomaly warning (Default: 50g)
            </span>
          </div>

          <div class="form-group">
            <label class="form-label">Supermarket Store Name</label>
            <input type="text" id="setting-store-name" class="form-input" value="${settings.storeName}"/>
          </div>

          <div class="form-group">
            <label class="form-label">Store Address</label>
            <input type="text" id="setting-store-address" class="form-input" value="${settings.storeAddress}"/>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 4px;">
            <h4 style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">
              Supabase Backend API Configuration
            </h4>

            <div class="form-group">
              <label class="form-label">Supabase URL</label>
              <input type="text" id="setting-supabase-url" class="form-input" value="${settings.supabaseUrl}" style="font-family: monospace;"/>
            </div>

            <div class="form-group">
              <label class="form-label">Supabase Anon Public Key</label>
              <input type="password" id="setting-supabase-key" class="form-input" value="${settings.supabaseKey}" style="font-family: monospace;"/>
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button type="submit" class="btn-primary" style="flex: 1; padding: 10px;">
              Save System Settings
            </button>
            <button type="button" id="btn-reset-seed" class="btn-secondary" style="color: var(--red-danger); border-color: #FCA5A5;">
              Reset Seed Data
            </button>
          </div>

        </form>
      </div>

    </div>
  `;
}

export function bindAdminSettingsEvents(container) {
  const form = container.querySelector('#form-settings');
  const resetBtn = container.querySelector('#btn-reset-seed');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      store.updateSettings({
        weightToleranceGrams: parseFloat(container.querySelector('#setting-tolerance').value),
        storeName: container.querySelector('#setting-store-name').value.trim(),
        storeAddress: container.querySelector('#setting-store-address').value.trim(),
        supabaseUrl: container.querySelector('#setting-supabase-url').value.trim(),
        supabaseKey: container.querySelector('#setting-supabase-key').value.trim()
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset local storage to original seed database?')) {
        localStorage.clear();
        location.reload();
      }
    });
  }
}
