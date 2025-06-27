
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('https://twosteps.app.n8n.cloud/webhook/167477c9-c4a2-47a3-8823-f5067705b880', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

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
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      }
      
      return { success: false, error: 'Incorrect email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      // Split name into first and last name
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Convert phone to number if provided, otherwise use empty string
      const phoneNumber = phone && phone.trim() ? parseInt(phone.replace(/\D/g, ''), 10) : '';

      // Create payload matching exact Supabase field mapping
      const payload = {
        email_address: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
      };

      console.log('Signup payload:', payload);

      const response = await fetch('https://twosteps.app.n8n.cloud/webhook/236f4d2c-7eb7-4f01-80cd-f4bb24703944', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
