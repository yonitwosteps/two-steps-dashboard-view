import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  MessageSquare, 
  Settings, 
  Clock,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Clock, label: 'Timeline', active: false },
    { icon: LayoutDashboard, label: 'Dashboard', active: false, badge: '2' },
    { icon: Users, label: 'Users', active: false },
    { icon: Activity, label: 'Activity', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className={cn("w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50 h-screen flex flex-col", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-white font-semibold">Baligo</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">
            Application
          </div>
          {menuItems.slice(0, 4).map((item, index) => (
            <a
              key={index}
              href="#"
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                item.active 
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">
            Others
          </div>
          {menuItems.slice(4).map((item, index) => (
            <a
              key={index + 4}
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
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
