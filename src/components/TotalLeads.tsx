
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const TotalLeads = () => {
  // Mock data - replace with real data integration
  const totalLeads = 1247;
  const monthlyGrowth = 12.5;

  return (
    <Card className="card-interactive bg-card/95 backdrop-blur-xl border border-border/50 hover:border-border shadow-md hover:shadow-lg transition-all duration-300 rounded-xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 flex-shrink-0">
        <CardTitle className="text-sm font-medium font-dm-sans text-muted-foreground">Total Leads</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Users className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center space-y-2">
        <div className="text-3xl font-bold text-foreground font-dm-sans tracking-tight">
          {totalLeads.toLocaleString()}
        </div>
        <div className="flex items-center text-sm">
          <span className="text-success font-medium">+{monthlyGrowth}%</span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalLeads;
