
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
      case 'new': return 'bg-blue-500/20 text-blue-300';
      case 'qualified': return 'bg-purple-500/20 text-purple-300';
      case 'contacted': return 'bg-cyan-500/20 text-cyan-300';
      case 'converted': return 'bg-indigo-500/20 text-indigo-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  return (
    <div className={cn(
      "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300",
      className
    )}>
      <h3 className="text-slate-300 text-sm font-medium mb-6">Recent Leads</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-slate-300 text-xs font-medium pb-3">Name</th>
              <th className="text-left text-slate-300 text-xs font-medium pb-3">Source</th>
              <th className="text-left text-slate-300 text-xs font-medium pb-3">Date</th>
              <th className="text-left text-slate-300 text-xs font-medium pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="py-3 text-white font-medium">{lead.name}</td>
                <td className="py-3 text-slate-200">{lead.source}</td>
                <td className="py-3 text-slate-200 text-sm">{lead.date}</td>
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
