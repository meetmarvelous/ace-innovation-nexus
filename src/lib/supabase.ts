import { createClient } from '@supabase/supabase-js';

// Read NEXT_PUBLIC_ env variables directly with fallbacks
const supabaseUrl = 
  (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string) || 
  (import.meta.env.VITE_SUPABASE_URL as string) || 
  '';

const supabaseAnonKey = 
  (import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) || 
  (import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
