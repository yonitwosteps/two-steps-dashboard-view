
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
      "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/30 transition-all duration-300 group",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">Conversion Rate</h3>
        <div className="p-2 rounded-lg bg-green-500/20">
          <TrendingUp className="w-5 h-5 text-green-400" />
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
                className="bg-gradient-to-t from-green-500/60 to-green-400/40 rounded-sm transition-all duration-500 hover:from-green-500 hover:to-green-400"
                style={{ 
                  height: `${height}%`,
                  width: '8px'
                }}
              />
            );
          })}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-400">
            {change}
          </span>
          <span className="text-gray-500 text-xs">From last month</span>
        </div>
      </div>
    </div>
  );
};

export default ConversionRate;
