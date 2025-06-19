
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  iconColor: string;
  className?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  iconColor,
  className 
}: MetricCardProps) => {
  return (
    <div className={cn(
      "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6 hover:bg-gray-800/30 transition-all duration-300 group",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={cn("p-2 rounded-lg", iconColor)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
          {value}
        </div>
        <div className="flex items-center space-x-2">
          <span className={cn(
            "px-2 py-1 rounded-md text-xs font-medium",
            changeType === 'positive' 
              ? "bg-green-500/20 text-green-400" 
              : "bg-red-500/20 text-red-400"
          )}>
            {change}
          </span>
          <span className="text-gray-500 text-xs">From 204,234</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
