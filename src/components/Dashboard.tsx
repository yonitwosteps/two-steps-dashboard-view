
import React from 'react';
import LeadScraper from './LeadScraper';
import RecentLeadsTable from './RecentLeadsTable';
import TotalLeads from './TotalLeads';
import FollowUpReminders from './FollowUpReminders';
import LeadsChart from './LeadsChart';
import TeamActivity from './TeamActivity';
import BlacklistChecker from './BlacklistChecker';

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

      {/* Main widgets grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Row 1: Stats and key metrics */}
        <div className="xl:col-span-1">
          <TotalLeads />
        </div>
        <div className="xl:col-span-1">
          <BlacklistChecker />
        </div>
        <div className="md:col-span-2 xl:col-span-2">
          <LeadsChart />
        </div>

        {/* Row 2: Team and follow-ups */}
        <div className="md:col-span-1 xl:col-span-1">
          <TeamActivity />
        </div>
        <div className="md:col-span-1 xl:col-span-1">
          <FollowUpReminders />
        </div>
        <div className="md:col-span-2 xl:col-span-2">
          <LeadScraper />
        </div>
      </div>

      {/* Recent Leads Table - Full width at bottom */}
      <div className="w-full">
        <RecentLeadsTable />
      </div>
    </div>
  );
};

export default Dashboard;
