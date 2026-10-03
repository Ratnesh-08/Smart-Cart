// Smart Cart AI - Admin AI Recommendations View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';

export function renderAdminAiRecommendations() {
  const recs = store.aiRecommendations;

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">AI Recommendation Engine & Cross-Sell Rules</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Manage automated product pairings, meal deal combos, and conversion performance</p>
        </div>
        <button id="btn-open-add-ai-rule" class="btn-primary" style="background: #0F172A;">
          ${getIcon('plus', 14)} Add AI Pairing Rule
        </button>
      </div>

      <!-- Performance KPI Overview -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #9333EA;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Pairing Rules</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${recs.length} Active Rules
          </div>
          <div style="font-size: 10px; color: #7E22CE; margin-top: 2px;">Gemini Engine Synced</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #10B981;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Avg Sales Conversion Boost</div>
          <div style="font-size: 22px; font-weight: 700; color: #10B981; margin-top: 4px;">
            +23.5%
          </div>
          <div style="font-size: 10px; color: #166534; margin-top: 2px;">Basket Size Increase</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #0EA5E9;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Top Recommended Pair</div>
          <div style="font-size: 16px; font-weight: 700; color: #0284C7; margin-top: 4px;">
            Milk ➔ Bread (+35%)
          </div>
          <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">Breakfast Combo</div>
        </div>
      </div>

      <!-- AI Rules Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Trigger Cart Product</th>
              <th>AI Suggested Cross-Sell</th>
              <th>Recommendation Rationale</th>
              <th>Conversion Boost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${recs.map(r => `
              <tr>
                <td><strong style="color: var(--text-primary);">${r.triggerProduct}</strong></td>
                <td><strong style="color: #0284C7;">${r.suggestedProduct}</strong></td>
                <td><span style="font-size: 12px; color: var(--text-secondary);">${r.reason}</span></td>
                <td><span class="stitch-badge badge-green">+${r.boostPercentage || 20}% Conversion</span></td>
                <td>
                  <span class="stitch-badge ${r.isActive ? 'badge-cyan' : 'badge-red'}">
                    ${r.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn-toggle-ai-rule btn-secondary" data-id="${r.id}" style="padding: 4px 8px; font-size: 11px;">
                      ${r.isActive ? 'Pause' : 'Activate'}
                    </button>
                    <button class="btn-delete-ai-rule btn-danger" data-id="${r.id}" style="padding: 4px 8px; font-size: 11px;">
                      ${getIcon('trash', 12)}
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Add AI Rule Modal Form -->
      <div id="ai-rule-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 style="font-size: 16px; font-weight: 700;">Add AI Cross-Sell Rule</h3>
            <button id="btn-close-ai-modal" style="border: none; background: transparent; cursor: pointer;">
              ${getIcon('x', 20)}
            </button>
          </div>

          <form id="form-ai-rule" style="display: flex; flex-direction: column; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Trigger Product (When in Cart)</label>
              <select id="ai-form-trigger" class="form-select" required>
                ${store.products.map(p => `<option value="${p.name}">${p.name} (₹${p.price})</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Suggested Product (To Recommend)</label>
              <select id="ai-form-suggested" class="form-select" required>
                ${store.products.map(p => `<option value="${p.name}">${p.name} (₹${p.price})</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Recommendation Rationale</label>
              <input type="text" id="ai-form-reason" class="form-input" placeholder="e.g. Perfect meal pairing for quick lunch" required/>
            </div>

            <div class="form-group">
              <label class="form-label">Expected Conversion Boost (%)</label>
              <input type="number" id="ai-form-boost" class="form-input" placeholder="25" value="25" required/>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 8px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save AI Pairing Rule
            </button>
          </form>
        </div>
      </div>

    </div>
  `;
}

export function bindAdminAiRecommendationsEvents(container) {
  const modal = container.querySelector('#ai-rule-modal');
  const closeModalBtn = container.querySelector('#btn-close-ai-modal');
  const form = container.querySelector('#form-ai-rule');
  const openBtn = container.querySelector('#btn-open-add-ai-rule');

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      form.reset();
      modal.style.display = 'flex';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const trigger = container.querySelector('#ai-form-trigger').value;
      const suggested = container.querySelector('#ai-form-suggested').value;
      const reason = container.querySelector('#ai-form-reason').value.trim();
      const boost = parseInt(container.querySelector('#ai-form-boost').value || 20);

      store.addAiRecommendation({
        triggerProduct: trigger,
        suggestedProduct: suggested,
        reason: reason || 'Popular pair',
        boostPercentage: boost
      });
      modal.style.display = 'none';
    });
  }

  container.querySelectorAll('.btn-toggle-ai-rule').forEach(btn => {
    btn.addEventListener('click', () => {
      const rule = store.aiRecommendations.find(r => r.id === btn.dataset.id);
      if (rule) {
        rule.isActive = !rule.isActive;
        store.showToast(`Rule is now ${rule.isActive ? 'active' : 'paused'}`, 'info');
        store.notify();
      }
    });
  });

  container.querySelectorAll('.btn-delete-ai-rule').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Remove this recommendation rule?')) {
        store.deleteAiRecommendation(btn.dataset.id);
      }
    });
  });
}
