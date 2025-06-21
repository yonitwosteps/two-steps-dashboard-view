
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  MessageSquare, 
  Settings, 
  Clock,
  Search,
  Target,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className={cn(
      "bg-gray-950/95 backdrop-blur-xl border-r border-gray-800/50 h-screen flex flex-col transition-all duration-300 ease-out relative shadow-2xl",
      isCollapsed ? "w-20" : "w-64",
      className
    )}>
      {/* Enhanced Logo Section */}
      <div className={cn(
        "p-6 border-b border-gray-800/50 flex items-center justify-center relative",
        isCollapsed && "p-4"
      )}>
        <div className={cn(
          "flex items-center transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-center"
        )}>
          <img 
            src="/lovable-uploads/ce3a6514-7cbb-4d33-83c6-9ef9f05ded13.png" 
            alt="Logo" 
            className={cn(
              "object-contain transition-all duration-300",
              isCollapsed ? "h-8 w-8" : "h-12 w-auto"
            )}
          />
        </div>
        
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-200 shadow-lg"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-gray-300" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-gray-300" />
          )}
        </button>
      </div>

      {/* Enhanced Search */}
      {!isCollapsed && (
        <div className="p-4 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Enhanced Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <div className={cn(
          "space-y-1 mb-6",
          isCollapsed && "space-y-2"
        )}>
          {!isCollapsed && (
            <div className="text-gray-500 text-xs font-medium font-dm-sans uppercase tracking-wider mb-3 px-3">
              Lead Management
            </div>
          )}
          {menuItems.slice(0, 4).map((item, index) => (
            <a
              key={index}
              href="#"
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium font-inter transition-all duration-200 group relative",
                item.active 
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg" 
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-white",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn(
                "flex-shrink-0 transition-all duration-200",
                item.active ? "w-5 h-5 text-blue-400" : "w-4 h-4 group-hover:w-5 group-hover:h-5"
              )} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-jetbrains-mono shadow-lg">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-gray-700">
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </a>
          ))}
        </div>

        <div className={cn(
          "space-y-1",
          isCollapsed && "space-y-2"
        )}>
          {!isCollapsed && (
            <div className="text-gray-500 text-xs font-medium font-dm-sans uppercase tracking-wider mb-3 px-3">
              Tools & Settings
            </div>
          )}
          {menuItems.slice(4).map((item, index) => (
            <a
              key={index + 4}
              href="#"
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium font-inter text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all duration-200 group relative",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0 group-hover:w-5 group-hover:h-5 transition-all duration-200" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-gray-700">
                  {item.label}
                </div>
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Enhanced User Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800/50 animate-fade-in">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-dm-sans font-medium text-sm shadow-lg">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@company.com</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
