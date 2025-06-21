
import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex w-full relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-4 lg:right-10 w-48 h-48 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-4 lg:left-10 w-40 h-40 lg:w-80 lg:h-80 bg-gradient-to-tr from-purple-500/6 via-blue-500/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Additional ambient lighting */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 lg:w-48 lg:h-48 bg-gradient-to-br from-emerald-500/6 to-teal-500/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 lg:w-40 lg:h-40 bg-gradient-to-tr from-orange-500/5 to-red-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Sidebar - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-20">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Overlay - Will be implemented later */}
      
      {/* Main Content - Responsive margins */}
      <div className="flex-1 transition-all duration-300 ease-out lg:ml-64 w-full">
        <Dashboard />
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;
