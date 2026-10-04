import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file from parent directory (root Smart-Cart directory)
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '');
  const supabaseUrl = env.SUPABASE_URL || '';
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || '';

  return {
    envDir: '..',
    envPrefix: ['VITE_', 'SUPABASE_'],
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
      'process.env.SUPABASE_URL': JSON.stringify(supabaseUrl),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
    }
  };
});
