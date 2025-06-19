
import React from 'react';
import { Users, Target, TrendingUp, UserCheck } from 'lucide-react';
import MetricCard from './MetricCard';
import LeadScraper from './LeadScraper';
import RecentLeadsTable from './RecentLeadsTable';
import LeadSourcesChart from './LeadSourcesChart';
import ConversionRate from './ConversionRate';
import ScrapingHistory from './ScrapingHistory';

const Dashboard = () => {
  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Lead Management Dashboard
          </h1>
          <p className="text-slate-300 mt-2">Track and manage your leads effectively</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
          Export Data
        </button>
      </div>

      {/* Key Metrics Grid - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Leads Metric */}
        <MetricCard
          title="Total Leads"
          value="1,247"
          change="+18.2%"
          changeType="positive"
          icon={Users}
          iconColor="bg-blue-500/20"
        />
        
        {/* Qualified Leads Metric */}
        <MetricCard
          title="Qualified Leads"
          value="342"
          change="+24.1%"
          changeType="positive"
          icon={Target}
          iconColor="bg-purple-500/20"
        />
        
        {/* Active Leads Metric */}
        <MetricCard
          title="Active Leads"
          value="156"
          change="+12.8%"
          changeType="positive"
          icon={UserCheck}
          iconColor="bg-indigo-500/20"
        />
        
        {/* Monthly Growth Metric */}
        <MetricCard
          title="Monthly Growth"
          value="32%"
          change="+8.4%"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-cyan-500/20"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Lead Scraper Widget */}
        <LeadScraper className="lg:col-span-1" />
        
        {/* Lead Sources Pie Chart */}
        <LeadSourcesChart className="lg:col-span-1" />
        
        {/* Conversion Rate Widget */}
        <ConversionRate className="lg:col-span-1" />
      </div>

      {/* Bottom Section Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Leads Table - Takes up 2 columns on larger screens */}
        <RecentLeadsTable className="xl:col-span-2" />
        
        {/* Scraping History Log - Takes up 1 column */}
        <ScrapingHistory className="xl:col-span-1" />
      </div>
    </div>
  );
};

export default Dashboard;
