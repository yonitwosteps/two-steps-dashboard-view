
import React from 'react';
import CircularProgress from './CircularProgress';
import { cn } from '@/lib/utils';

interface LeadSource {
  label: string;
  value: number;
  color: string;
}

interface LeadSourcesChartProps {
  className?: string;
}

const LeadSourcesChart = ({ className }: LeadSourcesChartProps) => {
  // Sample lead sources data - replace with actual data
  const leadSources: LeadSource[] = [
    { label: 'Web', value: 45, color: '#10B981' },
    { label: 'Facebook', value: 30, color: '#3B82F6' },
    { label: 'Campaign', value: 15, color: '#8B5CF6' },
    { label: 'Manual', value: 10, color: '#F59E0B' }
  ];

  const totalLeads = leadSources.reduce((sum, source) => sum + source.value, 0);
  const mainPercentage = Math.round((leadSources[0].value / totalLeads) * 100);

  return (
    <div className={cn(
      "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/30 transition-all duration-300",
      className
    )}>
      <h3 className="text-gray-400 text-sm font-medium mb-6">Lead Sources</h3>
      
      <div className="flex items-center justify-center mb-6">
        <CircularProgress 
          percentage={mainPercentage} 
          color={leadSources[0].color}
          size={120}
        />
      </div>
      
      <div className="space-y-3">
        {leadSources.map((source, index) => {
          const percentage = Math.round((source.value / totalLeads) * 100);
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-gray-300 text-sm">{source.label}</span>
              </div>
              <span className="text-white font-medium">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadSourcesChart;
