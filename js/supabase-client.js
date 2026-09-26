/**
 * js/supabase-client.js
 * Smart Cart AI — Browser-safe Supabase client
 *
 * SECURITY RULES:
 *  - Only the anon/public key is used here. It is safe for the browser.
 *  - The service-role/secret key must NEVER appear in this file or any
 *    frontend file. It belongs only in ESP32 firmware or a secure backend.
 *
 * HOW TO CONFIGURE:
 *  Option 1 (.env file with build tools / bundler):
 *    Copy .env.example → .env and set SUPABASE_URL & SUPABASE_ANON_KEY.
 *  Option 2 (Static browser / HTML without build tools):
 *    Add an env.js (copied from env.example.js) before this script:
 *      <script src="env.js"></script>
 *    or set window.__ENV__ = { SUPABASE_URL: "...", SUPABASE_ANON_KEY: "..." };
 *    or in browser console:
 *      localStorage.setItem('SUPABASE_URL', 'https://...');
 *      localStorage.setItem('SUPABASE_ANON_KEY', 'ey...');
 *
 * The Supabase JS library can be loaded via CDN script in HTML:
 *   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
 * or will automatically be imported via ES module CDN if not present on window.
 */

// ─── Environment Variables Resolution ─────────────────────────────────────────
function resolveEnv(key, placeholder) {
  if (typeof window !== 'undefined') {
    if (window.__ENV__ && window.__ENV__[key]) return window.__ENV__[key];
    if (window.ENV && window.ENV[key]) return window.ENV[key];
    try {
      const stored = localStorage.getItem(key);
      if (stored) return stored;
    } catch (_) {}
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return placeholder;
}

export let SUPABASE_URL = resolveEnv('SUPABASE_URL', 'https://your-project-ref.supabase.co');
export let SUPABASE_ANON_KEY = resolveEnv('SUPABASE_ANON_KEY', 'your-anon-public-key-here');

/**
 * Checks whether Supabase has been configured with real credentials.
 * @returns {boolean}
 */
export function isSupabaseConfigured() {
  return (
    SUPABASE_URL.startsWith('https://') &&
    !SUPABASE_URL.includes('your-project-ref') &&
    SUPABASE_ANON_KEY !== 'your-anon-public-key-here' &&
    SUPABASE_ANON_KEY.length > 20
  );
}

if (!isSupabaseConfigured()) {
  console.warn(
    '[SmartCart] Supabase is running with placeholder credentials.\n' +
    'To connect to your live database:\n' +
    '1. Set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file or window.__ENV__\n' +
    '2. Or set them in localStorage: localStorage.setItem("SUPABASE_URL", "...")'
  );
}

// ─── Client Initialization ────────────────────────────────────────────────────
const globalScope = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : {});

let clientInstance = null;

function createInstance(url, key) {
  const createClientFn = globalScope.supabase?.createClient;
  if (typeof createClientFn === 'function') {
    return createClientFn(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return null;
}

// Try immediate creation if global supabase is already present
if (typeof globalScope.supabase?.createClient === 'function') {
  clientInstance = createInstance(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// If in browser and window.supabase is not yet loaded, attempt dynamic ESM import
if (typeof window !== 'undefined' && !clientInstance) {
  import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
    .then((esm) => {
      if (esm?.createClient) {
        if (!globalScope.supabase) globalScope.supabase = {};
        globalScope.supabase.createClient = esm.createClient;
        if (!clientInstance) {
          clientInstance = createInstance(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
      }
    })
    .catch(() => {
      // Offline or CDN restricted; fallback handles calls gracefully
    });
}

/**
 * Allows programmatic initialization or re-configuration of Supabase at runtime.
 * @param {string} url
 * @param {string} anonKey
 * @returns {import('@supabase/supabase-js').SupabaseClient|null}
 */
export function initSupabase(url, anonKey) {
  SUPABASE_URL = url;
  SUPABASE_ANON_KEY = anonKey;
  clientInstance = createInstance(url, anonKey);
  return clientInstance;
}

/**
 * Returns the underlying active Supabase client instance, if initialized.
 * @returns {import('@supabase/supabase-js').SupabaseClient|null}
 */
export function getSupabaseClient() {
  if (!clientInstance && typeof globalScope.supabase?.createClient === 'function') {
    clientInstance = createInstance(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return clientInstance;
}

/**
 * Exported primary client.
 * Uses a Proxy so that method calls delegate to the active instance if ready,
 * or fail gracefully with informative errors instead of crashing synchronously on import.
 */
export const supabaseClient = new Proxy({}, {
  get(_target, prop) {
    const active = getSupabaseClient();
    if (active) {
      const val = active[prop];
      return typeof val === 'function' ? val.bind(active) : val;
    }

    // Fallback stubs if called before SDK loads or without credentials
    if (prop === 'from') {
      return (tableName) => ({
        select: () => Promise.resolve({ data: null, error: new Error(`[SmartCart] Supabase not initialized. Cannot select from '${tableName}'.`) }),
        insert: () => Promise.resolve({ data: null, error: new Error(`[SmartCart] Supabase not initialized. Cannot insert into '${tableName}'.`) }),
        update: () => Promise.resolve({ data: null, error: new Error(`[SmartCart] Supabase not initialized. Cannot update '${tableName}'.`) }),
        delete: () => Promise.resolve({ data: null, error: new Error(`[SmartCart] Supabase not initialized. Cannot delete from '${tableName}'.`) }),
      });
    }

    if (prop === 'auth') {
      return {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('[SmartCart] Supabase not initialized.') }),
        signUp: () => Promise.resolve({ data: null, error: new Error('[SmartCart] Supabase not initialized.') }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      };
    }

    return undefined;
  },
});

// ─── Auth helpers ─────────────────────────────────────────────────────────────

/**
 * Returns the currently authenticated Supabase user, or null if not signed in.
 * @returns {Promise<import('@supabase/supabase-js').User|null>}
 */
export async function getCurrentUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data?.user ?? null;
}

/**
 * Returns the current session, or null.
 * @returns {Promise<import('@supabase/supabase-js').Session|null>}
 */
export async function getSession() {
  const { data } = await supabaseClient.auth.getSession();
  return data?.session ?? null;
}

/**
 * Signs a user in with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user, error}>}
 */
export async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  return { user: data?.user ?? null, error };
}

/**
 * Signs a new user up.
 * @param {string} email
 * @param {string} password
 * @param {string} fullName
 * @returns {Promise<{user, error}>}
 */
export async function signUp(email, password, fullName) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  return { user: data?.user ?? null, error };
}

/**
 * Signs the current user out.
 * @returns {Promise<{error}>}
 */
export async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  return { error };
}

/**
 * Subscribe to auth state changes (login, logout, token refresh).
 * @param {function} callback - called with (event, session)
 * @returns {function} unsubscribe function
 */
export function onAuthStateChange(callback) {
  const { data } = supabaseClient.auth.onAuthStateChange(callback);
  return () => data?.subscription?.unsubscribe();
}

// ─── Profile helpers ──────────────────────────────────────────────────────────

/**
 * Fetches the profile row for the currently signed-in user.
 * Matches schema: profiles(id, full_name, phone, role, is_active, created_at, updated_at)
 * @returns {Promise<{profile, error}>}
 */
export async function getProfile() {
  const user = await getCurrentUser();
  if (!user) return { profile: null, error: new Error('Not authenticated') };

  const { data, error } = await supabaseClient
    .from('profiles')
    .select('id, full_name, phone, role, is_active, created_at, updated_at')
    .eq('id', user.id)
    .single();

  return { profile: data, error };
}

/**
 * Updates the current user's profile.
 * Only customer-updatable fields are allowed (name, phone).
 * Role cannot be elevated from the client.
 * @param {{ full_name?: string, phone?: string }} updates
 * @returns {Promise<{profile, error}>}
 */
export async function updateProfile(updates) {
  const user = await getCurrentUser();
  if (!user) return { profile: null, error: new Error('Not authenticated') };

  const safeUpdates = {};
  if (updates.full_name !== undefined) safeUpdates.full_name = updates.full_name;
  if (updates.phone     !== undefined) safeUpdates.phone     = updates.phone;

  const { data, error } = await supabaseClient
    .from('profiles')
    .update(safeUpdates)
    .eq('id', user.id)
    .select()
    .single();

  return { profile: data, error };
}
