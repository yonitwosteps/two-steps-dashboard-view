
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
  ChevronRight,
  Menu,
  X,
  GitBranch,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarProps {
  className?: string;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ className, activeView, onViewChange }: SidebarProps) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: GitBranch, label: 'Pipeline', view: 'pipeline' },
    { icon: Users, label: 'All Leads', view: 'leads' },
    { icon: Target, label: 'Qualified Leads', view: 'qualified', badge: '342' },
    { icon: TrendingUp, label: 'Analytics', view: 'analytics' },
    { icon: Activity, label: 'Lead Activity', view: 'activity' },
    { icon: MessageSquare, label: 'Communications', view: 'communications' },
    { icon: Clock, label: 'Scraping History', view: 'scraping' },
    { icon: Settings, label: 'Settings', view: 'settings' },
  ];

  const handleMenuClick = (view: string) => {
    onViewChange(view);
    setIsMobileOpen(false); // Close mobile menu when item is clicked
  };

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
  };

  const handleSettingsClick = () => {
    onViewChange('settings');
    setIsMobileOpen(false);
  };

  // Display user's first name or fallback to name
  const displayName = user?.firstName || user?.name || 'User';

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-gray-950/95 backdrop-blur-xl border-r border-gray-800/50 h-screen flex flex-col transition-all duration-300 ease-out relative shadow-2xl",
        // Desktop sizing
        "hidden lg:flex",
        isCollapsed ? "w-20" : "w-64",
        // Mobile sizing and positioning
        "lg:relative lg:translate-x-0",
        isMobileOpen ? "fixed inset-y-0 left-0 z-50 w-64 flex" : "lg:flex",
        className
      )}>
        
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Enhanced Logo Section */}
        <div className={cn(
          "p-4 sm:p-6 border-b border-gray-800/50 flex items-center justify-center relative",
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
                isCollapsed ? "h-6 w-6 sm:h-8 sm:w-8" : "h-8 sm:h-12 w-auto"
              )}
            />
          </div>
          
          {/* Collapse Toggle Button - Desktop only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-200 shadow-lg"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3 text-gray-300" />
            ) : (
              <ChevronLeft className="w-3 h-3 text-gray-300" />
            )}
          </button>
        </div>

        {/* Enhanced Search */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="p-3 sm:p-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 sm:py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Enhanced Navigation */}
        <nav className="flex-1 px-3 sm:px-4 space-y-2 overflow-y-auto">
          <div className={cn(
            "space-y-1 mb-4 sm:mb-6",
            isCollapsed && !isMobileOpen && "space-y-2"
          )}>
            {(!isCollapsed || isMobileOpen) && (
              <div className="text-gray-500 text-xs font-medium font-dm-sans uppercase tracking-wider mb-3 px-3">
                Lead Management
              </div>
            )}
            {menuItems.slice(0, 6).map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.view)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-sm font-medium font-inter transition-all duration-200 group relative",
                  activeView === item.view 
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg" 
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white",
                  (isCollapsed && !isMobileOpen) && "justify-center px-2"
                )}
              >
                <item.icon className={cn(
                  "flex-shrink-0 transition-all duration-200",
                  activeView === item.view ? "w-4 h-4 sm:w-5 sm:h-5 text-blue-400" : "w-4 h-4 group-hover:w-5 group-hover:h-5"
                )} />
                {(!isCollapsed || isMobileOpen) && (
                  <>
                    <span className="flex-1 truncate text-sm text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-jetbrains-mono shadow-lg">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                
                {/* Tooltip for collapsed state */}
                {(isCollapsed && !isMobileOpen) && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-gray-700">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className={cn(
            "space-y-1",
            isCollapsed && !isMobileOpen && "space-y-2"
          )}>
            {(!isCollapsed || isMobileOpen) && (
              <div className="text-gray-500 text-xs font-medium font-dm-sans uppercase tracking-wider mb-3 px-3">
                Tools & Settings
              </div>
            )}
            {menuItems.slice(6).map((item, index) => (
              <button
                key={index + 6}
                onClick={() => handleMenuClick(item.view)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 sm:py-2.5 rounded-lg text-sm font-medium font-inter transition-all duration-200 group relative",
                  activeView === item.view 
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg" 
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white",
                  (isCollapsed && !isMobileOpen) && "justify-center px-2"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0 group-hover:w-5 group-hover:h-5 transition-all duration-200" />
                {(!isCollapsed || isMobileOpen) && <span className="truncate text-sm text-left">{item.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {(isCollapsed && !isMobileOpen) && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-gray-700">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Enhanced User Section with Dropdown */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="p-3 sm:p-4 border-t border-gray-800/50 animate-fade-in">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-dm-sans font-medium text-xs sm:text-sm shadow-lg">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-white truncate">{displayName}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-gray-800 border-gray-700 text-white" 
                align="end" 
                sideOffset={5}
              >
                <DropdownMenuItem 
                  onClick={handleSettingsClick}
                  className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700 text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
