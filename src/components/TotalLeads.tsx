
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const TotalLeads = () => {
  // Mock data - replace with real data integration
  const totalLeads = 1247;
  const monthlyGrowth = 12.5;

  return (
    <Card className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl h-full flex flex-col group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 flex-shrink-0">
        <CardTitle className="text-sm font-medium font-dm-sans text-gray-400">Total Leads</CardTitle>
        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
          <Users className="h-5 w-5 text-blue-400" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center space-y-3">
        <div className="text-3xl font-bold text-white font-dm-sans tracking-tight group-hover:scale-105 transition-transform duration-300">
          {totalLeads.toLocaleString()}
        </div>
        <div className="flex items-center text-sm">
          <span className="text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded-md">+{monthlyGrowth}%</span>
          <span className="text-gray-400 ml-2">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalLeads;
