
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/config/supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { authRateLimiter, LoginSchema, SignupSchema } from '@/utils/authValidation';

interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const userData = createUserFromSupabaseUser(session.user);
        setUser(userData);
      }
      
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData = createUserFromSupabaseUser(session.user);
          setUser(userData);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Helper function to create User from Supabase user
  const createUserFromSupabaseUser = (supabaseUser: SupabaseUser): User => {
    const firstName = supabaseUser.user_metadata?.first_name || 
                     supabaseUser.email?.split('@')[0] || 
                     'User';
    
    return {
      id: supabaseUser.id,
      name: firstName,
      email: supabaseUser.email || '',
      firstName: firstName,
    };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate input
      const validatedData = LoginSchema.parse({ email, password });
      
      // Check rate limiting
      if (authRateLimiter.isRateLimited(email)) {
        const remainingTime = Math.ceil(authRateLimiter.getRemainingTime(email) / 60000);
        return { 
          success: false, 
          error: `Too many failed attempts. Please try again in ${remainingTime} minutes.` 
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        return { 
          success: false, 
          error: error.message === 'Invalid login credentials' 
            ? 'Incorrect email or password' 
            : error.message 
        };
      }

      if (data.user) {
        const userData = createUserFromSupabaseUser(data.user);
        setUser(userData);
        return { success: true };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const firstError = error.errors[0];
        return { success: false, error: firstError.message };
      }
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      // Split name into first and last name
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Validate input
      const validatedData = SignupSchema.parse({
        firstName,
        lastName,
        email_address: email,
        password,
        phone_number: phone || ''
      });

      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email_address,
        password: validatedData.password,
        options: {
          data: {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            phone_number: validatedData.phone_number || null,
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return false;
      }

      return !!data.user;
    } catch (error: any) {
      console.error('Signup validation error:', error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
