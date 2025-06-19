
import React, { useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const BlacklistChecker = () => {
  const [checkCount, setCheckCount] = useState(0);
  
  // Mock data - replace with real data integration
  const blacklistStats = {
    totalChecked: 1247,
    blacklisted: 23,
    suspicious: 45,
  };

  const handleQuickCheck = () => {
    // Mock function - replace with real blacklist checking logic
    setCheckCount(prev => prev + 1);
    console.log('Running blacklist check...');
  };

  return (
    <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 rounded-xl shadow-lg h-[300px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-sm font-medium text-slate-300">Blacklist Checker</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded bg-slate-700/30">
            <p className="text-xs text-slate-400">Checked</p>
            <p className="text-sm font-bold text-white">{blacklistStats.totalChecked}</p>
          </div>
          <div className="p-2 rounded bg-red-500/20">
            <p className="text-xs text-red-400">Blacklisted</p>
            <p className="text-sm font-bold text-red-400">{blacklistStats.blacklisted}</p>
          </div>
          <div className="p-2 rounded bg-yellow-500/20">
            <p className="text-xs text-yellow-400">Suspicious</p>
            <p className="text-sm font-bold text-yellow-400">{blacklistStats.suspicious}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleQuickCheck}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Quick Check ({checkCount})
          </Button>
          
          {blacklistStats.blacklisted > 0 && (
            <div className="flex items-center gap-2 p-2 bg-red-500/20 rounded text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">
                {blacklistStats.blacklisted} leads require attention
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlacklistChecker;
