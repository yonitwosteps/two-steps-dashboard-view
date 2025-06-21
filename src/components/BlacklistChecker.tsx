
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
    <Card className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl h-full flex flex-col group">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-sm font-medium text-gray-400 font-dm-sans">Blacklist Checker</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-gray-800/50">
            <p className="text-xs text-gray-400 mb-1">Checked</p>
            <p className="text-lg font-bold text-white">{blacklistStats.totalChecked}</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
            <p className="text-xs text-red-400 mb-1">Blacklisted</p>
            <p className="text-lg font-bold text-red-400">{blacklistStats.blacklisted}</p>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
            <p className="text-xs text-yellow-400 mb-1">Suspicious</p>
            <p className="text-lg font-bold text-yellow-400">{blacklistStats.suspicious}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleQuickCheck}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Quick Check ({checkCount})
          </Button>
          
          {blacklistStats.blacklisted > 0 && (
            <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
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
