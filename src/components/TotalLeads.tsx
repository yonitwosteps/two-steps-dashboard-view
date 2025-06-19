
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const TotalLeads = () => {
  // Mock data - replace with real data integration
  const totalLeads = 1247;
  const monthlyGrowth = 12.5;

  return (
    <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 rounded-xl shadow-lg h-[300px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium text-slate-300">Total Leads</CardTitle>
        <Users className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="text-6xl font-extrabold text-white mb-2">{totalLeads.toLocaleString()}</div>
        <p className="text-sm text-slate-400">
          <span className="text-green-400">+{monthlyGrowth}%</span> from last month
        </p>
      </CardContent>
    </Card>
  );
};

export default TotalLeads;
