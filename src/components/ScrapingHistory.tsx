
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrapingEvent {
  id: number;
  timestamp: string;
  status: 'success' | 'failed' | 'running';
  leadsFound: number;
}

interface ScrapingHistoryProps {
  className?: string;
}

const ScrapingHistory = ({ className }: ScrapingHistoryProps) => {
  // Sample scraping history data - replace with actual data
  const scrapingEvents: ScrapingEvent[] = [
    { id: 1, timestamp: '2024-06-19 14:30', status: 'success', leadsFound: 15 },
    { id: 2, timestamp: '2024-06-19 10:15', status: 'success', leadsFound: 8 },
    { id: 3, timestamp: '2024-06-18 16:45', status: 'failed', leadsFound: 0 },
    { id: 4, timestamp: '2024-06-18 09:20', status: 'success', leadsFound: 12 },
    { id: 5, timestamp: '2024-06-17 15:10', status: 'success', leadsFound: 6 },
  ];

  const getStatusColor = (status: ScrapingEvent['status']) => {
    switch (status) {
      case 'success': return 'bg-blue-500/20 text-blue-300';
      case 'failed': return 'bg-red-500/20 text-red-400';
      case 'running': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  return (
    <div className={cn(
      "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300",
      className
    )}>
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-4 h-4 text-slate-300" />
        <h3 className="text-slate-300 text-sm font-medium">Scraping History</h3>
      </div>
      
      <div className="space-y-3">
        {scrapingEvents.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
            <div className="flex-1">
              <div className="text-white text-sm font-medium">
                {event.timestamp}
              </div>
              {event.status === 'success' && (
                <div className="text-slate-300 text-xs">
                  {event.leadsFound} leads found
                </div>
              )}
            </div>
            <span className={cn(
              "px-2 py-1 rounded-md text-xs font-medium capitalize",
              getStatusColor(event.status)
            )}>
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrapingHistory;
