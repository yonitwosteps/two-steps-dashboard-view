import { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import Dashboard from '@/components/Dashboard';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Index() {
  const [activeView, setActiveView] = useState('dashboard');

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-muted/20">
        <AppSidebar 
          activeView={activeView} 
          onViewChange={handleViewChange}
        />
        
        <main className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b bg-background/80 backdrop-blur-sm lg:hidden">
            <SidebarTrigger className="ml-4" />
            <span className="ml-4 font-semibold">Sales CRM</span>
          </header>
          
          <div className="flex-1">
            <Dashboard activeView={activeView} />
          </div>
        </main>
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
}
