import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Toaster } from '../components/ui/toaster';
import { LayoutProvider, useLayout } from '../contexts/LayoutContext';

const MainLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const { sidebarCollapsed } = useLayout();

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen dark bg-background relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-4 lg:right-10 w-48 h-48 lg:w-96 lg:h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-4 lg:left-10 w-40 h-40 lg:w-80 lg:h-80 bg-accent/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-64 lg:h-64 bg-primary/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Additional ambient lighting */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 lg:w-48 lg:h-48 bg-success/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 lg:w-40 lg:h-40 bg-warning/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar 
          activeView={activeView} 
          onViewChange={handleViewChange}
        />
        
        {/* Main Content - Dynamically responsive to sidebar state */}
        <div className={`flex-1 transition-all duration-300 ease-out ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        } w-full`}>
          <Dashboard activeView={activeView} />
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

const Index = () => {
  return (
    <LayoutProvider>
      <MainLayout />
    </LayoutProvider>
  );
};

export default Index;
