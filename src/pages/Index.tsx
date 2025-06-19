
import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex w-full">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-10">
        <Sidebar />
      </div>
      
      {/* Main Content with left margin for sidebar */}
      <div className="flex-1 ml-64">
        <Dashboard />
      </div>
      
      {/* Background decoration - Subtle gradients matching the new theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
      </div>
      
      {/* Global Toaster */}
      <Toaster />
    </div>
  );
};

export default Index;
