import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://rkfwxdkqeohjgppizomb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZnd4ZGtxZW9oamdwcGl6b21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTYwMjUsImV4cCI6MjA2NjYzMjAyNX0.fmbBFRvWxT_u46WkujxmMyoCtHyw9YKkV8Zs0DFmPBM';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export type { User } from '@supabase/supabase-js';