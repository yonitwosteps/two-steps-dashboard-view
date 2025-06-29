
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WEBHOOK_CONFIG } from '@/config/webhooks';
import { SessionSecurity } from '@/utils/sessionSecurity';
import { authRateLimiter, LoginSchema, SignupSchema } from '@/utils/authValidation';
import { SecureHttpClient } from '@/utils/httpClient';

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
    // Check for stored user data on app load using secure session management
    const storedUser = SessionSecurity.getSession();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

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

      const response = await SecureHttpClient.post(WEBHOOK_CONFIG.LOGIN_WEBHOOK, validatedData);

      const responseText = await response.text();
      
      // Try to parse as JSON first
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        // If not JSON, treat as string
        result = responseText;
      }
      
      // Handle both JSON response format and string response format
      const isSuccess = result === 'true' || result?.result === 'true' || result?.result === true;
      
      if (isSuccess) {
        // Extract first name from response if available, otherwise from email
        const firstName = result?.first_name || result?.firstName || email.split('@')[0];
        
        const userData: User = {
          id: Date.now().toString(),
          name: firstName,
          email: email,
          firstName: firstName,
        };
        
        setUser(userData);
        SessionSecurity.setSession(userData);
        return { success: true };
      }
      
      return { success: false, error: 'Incorrect email or password' };
    } catch (error) {
      // Don't log sensitive information
      return { success: false, error: 'Network error. Please try again.' };
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

      // Convert phone to number if provided, otherwise use empty string
      const phoneNumber = validatedData.phone_number && validatedData.phone_number.trim() ? 
        parseInt(validatedData.phone_number.replace(/\D/g, ''), 10) : '';

      // Create payload matching exact Supabase field mapping
      const payload = {
        email_address: validatedData.email_address,
        password: validatedData.password,
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        phone_number: phoneNumber
      };

      const response = await SecureHttpClient.post(WEBHOOK_CONFIG.SIGNUP_WEBHOOK, payload);

      return response.ok;
    } catch (error) {
      // Don't log sensitive information
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    SessionSecurity.clearSession();
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
