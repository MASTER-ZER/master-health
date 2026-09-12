import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  if (typeof window !== 'undefined') {
    console.warn(
      '⚠️ Supabase URL or Anon Key is missing or using placeholder values. Please check your .env.local file.'
    );
  }
}

// Client-side Supabase client (using anon key only, safe for browser)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
