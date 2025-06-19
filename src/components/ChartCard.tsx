
import React from 'react';
import CircularProgress from './CircularProgress';
import { cn } from '@/lib/utils';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface ChartCardProps {
  title: string;
  mainValue: string;
  data: ChartData[];
  type: 'circular' | 'list';
  className?: string;
}

const ChartCard = ({ title, mainValue, data, type, className }: ChartCardProps) => {
  if (type === 'circular') {
    const mainPercentage = parseInt(mainValue.replace('%', ''));
    return (
      <div className={cn(
        "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6 hover:bg-gray-800/30 transition-all duration-300",
        className
      )}>
        <h3 className="text-gray-400 text-sm font-medium mb-6">{title}</h3>
        
        <div className="flex items-center justify-center mb-6">
          <CircularProgress 
            percentage={mainPercentage} 
            color={data[0]?.color || "#10B981"}
          />
        </div>
        
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-300 text-sm">{item.label}</span>
              </div>
              <span className="text-white font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6 hover:bg-gray-800/30 transition-all duration-300",
      className
    )}>
      <h3 className="text-gray-400 text-sm font-medium mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{item.label}</span>
              <span className="text-white font-bold">{item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000"
                style={{ 
                  backgroundColor: item.color, 
                  width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartCard;
