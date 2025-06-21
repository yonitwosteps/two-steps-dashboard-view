
import React from 'react';
import PipelineBoard from './PipelineBoard';
import LeadScraper from './LeadScraper';
import RecentLeadsTable from './RecentLeadsTable';
import TotalLeads from './TotalLeads';
import FollowUpReminders from './FollowUpReminders';
import LeadsChart from './LeadsChart';
import TeamActivity from './TeamActivity';
import BlacklistChecker from './BlacklistChecker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 lg:p-8 overflow-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen">
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold font-dm-sans bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            CRM Dashboard
          </h1>
          <p className="text-gray-400 max-w-2xl font-inter text-lg">
            Manage your entire sales pipeline with visual deal tracking and advanced insights
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium font-dm-sans transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95">
          Export Data
        </button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="bg-gray-900/50 border border-gray-700/50 p-1">
          <TabsTrigger 
            value="pipeline" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400"
          >
            Pipeline Management
          </TabsTrigger>
          <TabsTrigger 
            value="dashboard" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400"
          >
            Analytics Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <PipelineBoard />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {/* Key Metrics Row */}
            <div className="animate-fade-in">
              <TotalLeads />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <BlacklistChecker />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <TeamActivity />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <FollowUpReminders />
            </div>

            {/* Charts Row */}
            <div className="md:col-span-2 xl:col-span-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <LeadsChart />
            </div>
            <div className="md:col-span-2 xl:col-span-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <LeadScraper />
            </div>
          </div>

          {/* Recent Leads Section */}
          <div className="w-full animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <RecentLeadsTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
