import { createClient } from '@supabase/supabase-js';

// For Lovable's native Supabase integration, these environment variables are automatically provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a fallback client if environment variables are not available
// This handles cases where the Supabase integration might not be fully configured
let supabase: any;

try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } else {
    // Create a mock client for development/testing
    console.warn('Supabase environment variables not found. Using mock client.');
    supabase = {
      auth: {
        signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        resetPasswordForEmail: async () => ({ error: { message: 'Supabase not configured' } }),
        updateUser: async () => ({ error: { message: 'Supabase not configured' } }),
        setSession: async () => ({ error: null })
      }
    };
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Provide a basic mock for graceful degradation
  supabase = {
    auth: {
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase initialization failed' } }),
      signUp: async () => ({ data: null, error: { message: 'Supabase initialization failed' } }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      resetPasswordForEmail: async () => ({ error: { message: 'Supabase initialization failed' } }),
      updateUser: async () => ({ error: { message: 'Supabase initialization failed' } }),
      setSession: async () => ({ error: null })
    }
  };
}

export { supabase };
export type { User } from '@supabase/supabase-js';