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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1 lg:mt-2 text-sm lg:text-base">{description}</p>
          </div>
          <div className="flex gap-2 lg:gap-4">
            <Button variant="outline" size="sm" className="lg:size-default">
              <Download className="h-4 w-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Export Data</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
        
        <main className="space-y-6 lg:space-y-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
