
import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex w-full">
      {/* Enhanced Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-20">
        <Sidebar />
      </div>
      
      {/* Main Content with proper spacing for sidebar */}
      <div className="flex-1 transition-all duration-300 ease-out" style={{ marginLeft: '256px' }}>
        <Dashboard />
      </div>
      
      {/* Enhanced Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Primary gradient orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary/20 via-secondary/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-info/15 via-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-2xl" />
        
        {/* Additional ambient lighting */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-bl from-success/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-tl from-warning/10 to-transparent rounded-full blur-2xl" />
      </div>
      
      {/* Global Toaster with enhanced styling */}
      <Toaster />
    </div>
  );
};

export default Index;
