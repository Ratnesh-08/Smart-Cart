/**
 * env.example.js
 * Smart Cart AI — Optional browser-side environment configuration template.
 *
 * For plain HTML/JS development without build tools:
 * 1. Copy this file to `env.js`:
 *      cp env.example.js env.js
 * 2. Replace with your actual Supabase project credentials.
 * 3. Include it in your HTML before other scripts:
 *      <script src="env.js"></script>
 *
 * NOTE: env.js is included in .gitignore and will never be committed.
 * NEVER put your service-role/secret key here!
 */

window.__ENV__ = {
  // Your Supabase project URL (Settings → API → Project URL)
  SUPABASE_URL: 'https://your-project-ref.supabase.co',

  // Your Supabase anon/public key (Settings → API → Project API Keys → anon public)
  SUPABASE_ANON_KEY: 'your-anon-public-key-here',
};
