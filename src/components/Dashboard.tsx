import React from 'react';
import { Download } from 'lucide-react';
import PipelineBoard from './PipelineBoard';
import LeadScraper from './LeadScraper';
import RecentLeadsTable from './RecentLeadsTable';
import TotalLeads from './TotalLeads';
import FollowUpReminders from './FollowUpReminders';
import LeadsChart from './LeadsChart';
import TeamActivity from './TeamActivity';
import BlacklistChecker from './BlacklistChecker';
import ScrapingHistory from './ScrapingHistory';
import DashboardOverview from './DashboardOverview';
import AnalyticsDashboard from './AnalyticsDashboard';
import SettingsPage from './SettingsPage';
import { Button } from './ui/button';

interface DashboardProps {
  activeView: string;
}

const Dashboard = ({ activeView }: DashboardProps) => {
  // Get the title and description based on active view
  const getViewConfig = () => {
    switch (activeView) {
      case 'pipeline':
        return {
          title: 'Sales Pipeline',
          description: 'Manage your entire sales pipeline with visual deal tracking and advanced insights'
        };
      case 'leads':
        return {
          title: 'All Leads',
          description: 'Comprehensive view of all your leads and prospects'
        };
      case 'qualified':
        return {
          title: 'Qualified Leads',
          description: 'Focus on your most promising leads and opportunities'
        };
      case 'analytics':
        return {
          title: 'Analytics Dashboard',
          description: 'Deep insights into your sales performance and lead generation'
        };
      case 'activity':
        return {
          title: 'Lead Activity',
          description: 'Track all interactions and activities with your leads'
        };
      case 'communications':
        return {
          title: 'Communications',
          description: 'Manage all your communications and follow-ups'
        };
      case 'scraping':
        return {
          title: 'Scraping History',
          description: 'View and manage your lead scraping activities'
        };
      case 'settings':
        return {
          title: 'Settings',
          description: 'Configure your CRM preferences and integrations'
        };
      default:
        return {
          title: 'CRM Dashboard',
          description: 'Manage your entire sales pipeline with visual deal tracking and advanced insights'
        };
    }
  };

  const { title, description } = getViewConfig();

  const renderContent = () => {
    switch (activeView) {
      case 'pipeline':
        return <PipelineBoard />;
      
      case 'leads':
        return (
          <div className="space-y-6">
            <RecentLeadsTable />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <TotalLeads />
              <TeamActivity />
              <FollowUpReminders />
            </div>
          </div>
        );
      
      case 'qualified':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <TotalLeads />
              <BlacklistChecker />
              <TeamActivity />
              <FollowUpReminders />
            </div>
            <RecentLeadsTable />
          </div>
        );
      
      case 'analytics':
        return <AnalyticsDashboard />;
      
      case 'activity':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <TeamActivity />
              <FollowUpReminders />
              <TotalLeads />
            </div>
            <RecentLeadsTable />
          </div>
        );
      
      case 'communications':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <FollowUpReminders />
              <TeamActivity />
              <TotalLeads />
            </div>
            <RecentLeadsTable />
          </div>
        );
      
      case 'scraping':
        return (
          <div className="space-y-6">
            <ScrapingHistory />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <LeadScraper />
              <TotalLeads />
              <BlacklistChecker />
            </div>
          </div>
        );
      
      case 'settings':
        return <SettingsPage />;
      
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto min-h-screen">
      {/* Enhanced Header Section - Responsive */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-dm-sans bg-gradient-to-r from-foreground via-primary/80 to-primary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-full sm:max-w-2xl font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Enhanced Export Button */}
        <div className="flex gap-3">
          <Button 
            className="bg-gradient-secondary text-success-foreground font-medium font-dm-sans transition-all duration-300 shadow-lg hover:shadow-success border-0 rounded-xl px-6 py-3 text-sm sm:text-base w-full sm:w-auto group"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {renderContent()}
          </div>
    </div>
  );
};

export default Dashboard;
