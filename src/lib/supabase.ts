import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are valid and not default placeholders
export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  rawUrl.trim() !== '' &&
  rawKey.trim() !== '' &&
  !rawUrl.includes('PASTE_YOUR_SUPABASE_URL_HERE') &&
  !rawKey.includes('PASTE_YOUR_PUBLISHABLE_KEY_HERE') &&
  rawUrl.startsWith('http')
);

// Fallback values prevent runtime crashes if env vars are placeholders
const supabaseUrl = isSupabaseConfigured ? rawUrl : 'https://glow-and-glam-demo.supabase.co';
const supabaseAnonKey = isSupabaseConfigured ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
