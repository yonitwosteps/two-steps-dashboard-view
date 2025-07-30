import { createClient } from '@supabase/supabase-js';

// Use the actual Supabase project configuration
const supabaseUrl = 'https://rkfwxdkqeohjgppizomb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZnd4ZGtxZW9oamdwcGl6b21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTYwMjUsImV4cCI6MjA2NjYzMjAyNX0.fmbBFRvWxT_u46WkujxmMyoCtHyw9YKkV8Zs0DFmPBM';

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