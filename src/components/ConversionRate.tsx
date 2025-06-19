
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversionRateProps {
  className?: string;
}

const ConversionRate = ({ className }: ConversionRateProps) => {
  // Sample conversion data - replace with actual data
  const conversionRate = 24.5;
  const change = '+3.2%';
  
  // Simple line chart data points for the mini chart
  const chartData = [20, 22, 19, 25, 28, 24, 26, 24.5];

  return (
    <div className={cn(
      "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 group",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-300 text-sm font-medium">Conversion Rate</h3>
        <div className="p-2 rounded-lg bg-blue-500/20">
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform">
          {conversionRate}%
        </div>
        
        {/* Mini line chart */}
        <div className="h-16 flex items-end justify-between space-x-1">
          {chartData.map((value, index) => {
            const height = (value / Math.max(...chartData)) * 100;
            return (
              <div
                key={index}
                className="bg-gradient-to-t from-blue-500/60 to-blue-400/40 rounded-sm transition-all duration-500 hover:from-blue-500 hover:to-blue-400"
                style={{ 
                  height: `${height}%`,
                  width: '8px'
                }}
              />
            );
          })}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-300">
            {change}
          </span>
          <span className="text-slate-400 text-xs">From last month</span>
        </div>
      </div>
    </div>
  );
};

export default ConversionRate;
