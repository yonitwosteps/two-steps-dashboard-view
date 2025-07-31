import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  sidebarWidth: number;
  collapsedWidth: number;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const sidebarWidth = 256; // 64 * 4 = w-64
  const collapsedWidth = 80; // 20 * 4 = w-20

  return (
    <LayoutContext.Provider 
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        sidebarWidth,
        collapsedWidth
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};