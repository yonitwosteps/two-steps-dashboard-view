
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  MessageSquare, 
  Settings, 
  Clock,
  Search,
  Target,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'All Leads', active: false },
    { icon: Target, label: 'Qualified Leads', active: false, badge: '342' },
    { icon: TrendingUp, label: 'Analytics', active: false },
    { icon: Activity, label: 'Lead Activity', active: false },
    { icon: MessageSquare, label: 'Communications', active: false },
    { icon: Clock, label: 'Scraping History', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className={cn("w-64 bg-slate-900/60 backdrop-blur-xl border-r border-slate-700/50 h-screen flex flex-col", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/ce3a6514-7cbb-4d33-83c6-9ef9f05ded13.png" 
            alt="Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">
            Lead Management
          </div>
          {menuItems.slice(0, 4).map((item, index) => (
            <a
              key={index}
              href="#"
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                item.active 
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30" 
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">
            Tools & Settings
          </div>
          {menuItems.slice(4).map((item, index) => (
            <a
              key={index + 4}
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
