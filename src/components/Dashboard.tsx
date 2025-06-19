
import React from 'react';
import LeadScraper from './LeadScraper';
import RecentLeadsTable from './RecentLeadsTable';

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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Lead Scraper - Takes up 1 column */}
        <div className="xl:col-span-1">
          <LeadScraper />
        </div>
        
        {/* Recent Leads Table - Takes up 2 columns for more space */}
        <div className="xl:col-span-2">
          <RecentLeadsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
