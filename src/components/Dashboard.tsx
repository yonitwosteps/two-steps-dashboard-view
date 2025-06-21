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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
const Dashboard = () => {
  return <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen">
      {/* Enhanced Header Section - Responsive */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-dm-sans bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            CRM Dashboard
          </h1>
          <p className="text-gray-400 max-w-full sm:max-w-2xl font-inter text-sm sm:text-base lg:text-lg leading-relaxed">
            Manage your entire sales pipeline with visual deal tracking and advanced insights
          </p>
        </div>
        
        {/* Enhanced Export Button */}
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium font-dm-sans transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 border-0 rounded-xl px-6 py-3 text-sm sm:text-base w-full sm:w-auto group" size="lg">
            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Enhanced Content Tabs - Responsive */}
      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 p-1.5 w-full sm:w-auto grid grid-cols-2 sm:flex shadow-lg rounded-xl">
          <TabsTrigger value="pipeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-400 hover:text-gray-200 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-300">
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-400 hover:text-gray-200 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-300">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <PipelineBoard />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Enhanced Stats Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {/* Key Metrics Row */}
            <div className="animate-fade-in">
              <TotalLeads />
            </div>
            <div className="animate-fade-in" style={{
            animationDelay: '0.1s'
          }}>
              <BlacklistChecker />
            </div>
            <div className="animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <TeamActivity />
            </div>
            <div className="animate-fade-in" style={{
            animationDelay: '0.3s'
          }}>
              <FollowUpReminders />
            </div>

            {/* Charts Row - Responsive grid spanning */}
            <div className="sm:col-span-2 xl:col-span-2 animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
              <LeadsChart />
            </div>
            <div className="sm:col-span-2 xl:col-span-2 animate-fade-in" style={{
            animationDelay: '0.5s'
          }}>
              <LeadScraper />
            </div>
          </div>

          {/* Recent Leads Section - Responsive */}
          <div className="w-full animate-slide-up" style={{
          animationDelay: '0.6s'
        }}>
            <RecentLeadsTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Dashboard;