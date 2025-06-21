
import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex w-full">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-20">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 ease-out ml-64">
        <Dashboard />
      </div>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-info/8 via-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-2xl" />
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;
