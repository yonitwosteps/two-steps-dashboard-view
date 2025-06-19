
import React from 'react';
import { cn } from '@/lib/utils';

interface Lead {
  id: number;
  name: string;
  source: string;
  date: string;
  status: 'new' | 'qualified' | 'contacted' | 'converted';
}

interface RecentLeadsTableProps {
  className?: string;
}

const RecentLeadsTable = ({ className }: RecentLeadsTableProps) => {
  // Sample lead data - replace with actual data from your backend
  const leads: Lead[] = [
    { id: 1, name: 'John Smith', source: 'Web', date: '2024-06-19', status: 'new' },
    { id: 2, name: 'Sarah Johnson', source: 'Facebook', date: '2024-06-19', status: 'qualified' },
    { id: 3, name: 'Mike Davis', source: 'Campaign', date: '2024-06-18', status: 'contacted' },
    { id: 4, name: 'Emma Wilson', source: 'Manual', date: '2024-06-18', status: 'converted' },
    { id: 5, name: 'Alex Brown', source: 'Web', date: '2024-06-17', status: 'new' },
  ];

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400';
      case 'qualified': return 'bg-yellow-500/20 text-yellow-400';
      case 'contacted': return 'bg-purple-500/20 text-purple-400';
      case 'converted': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className={cn(
      "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/30 transition-all duration-300",
      className
    )}>
      <h3 className="text-gray-400 text-sm font-medium mb-6">Recent Leads</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800/50">
              <th className="text-left text-gray-400 text-xs font-medium pb-3">Name</th>
              <th className="text-left text-gray-400 text-xs font-medium pb-3">Source</th>
              <th className="text-left text-gray-400 text-xs font-medium pb-3">Date</th>
              <th className="text-left text-gray-400 text-xs font-medium pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-800/20 transition-colors">
                <td className="py-3 text-white font-medium">{lead.name}</td>
                <td className="py-3 text-gray-300">{lead.source}</td>
                <td className="py-3 text-gray-300 text-sm">{lead.date}</td>
                <td className="py-3">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium capitalize",
                    getStatusColor(lead.status)
                  )}>
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeadsTable;
