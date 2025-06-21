
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
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/40 hover:border-gray-600/60 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-full flex flex-col group overflow-hidden relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
      
      <CardHeader className="flex-shrink-0 p-4 sm:p-6 relative z-10">
        <CardTitle className="text-sm font-medium text-gray-300 font-dm-sans flex items-center gap-2">
          <Search className="w-4 h-4 text-orange-400" />
          Blacklist Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4 p-4 sm:p-6 pt-0 relative z-10">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/80 transition-all duration-200">
            <p className="text-xs text-gray-400 mb-2 font-medium">Checked</p>
            <p className="text-lg font-bold text-white font-jetbrains-mono">{blacklistStats.totalChecked.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/40 backdrop-blur-sm hover:from-red-500/30 hover:to-red-600/30 transition-all duration-200">
            <p className="text-xs text-red-300 mb-2 font-medium">Blacklisted</p>
            <p className="text-lg font-bold text-red-400 font-jetbrains-mono">{blacklistStats.blacklisted}</p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 backdrop-blur-sm hover:from-yellow-500/30 hover:to-amber-500/30 transition-all duration-200">
            <p className="text-xs text-yellow-300 mb-2 font-medium">Suspicious</p>
            <p className="text-lg font-bold text-yellow-400 font-jetbrains-mono">{blacklistStats.suspicious}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleQuickCheck}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 h-10 text-sm font-medium rounded-xl border-0 group"
            size="sm"
          >
            <Search className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Quick Check ({checkCount})
          </Button>
          
          {blacklistStats.blacklisted > 0 && (
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 rounded-xl text-red-300 backdrop-blur-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 animate-pulse" />
              <span className="text-xs font-medium">
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
