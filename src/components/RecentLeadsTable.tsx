
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Mail, Loader } from 'lucide-react';

interface Lead {
  Name?: string;
  'LinkedIn URL'?: string;
  Title?: string;
  Organization?: string;
  Country?: string;
  State?: string;
  Phone?: string;
  Email?: string;
  'Twitter URL'?: string;
}

interface RecentLeadsTableProps {
  className?: string;
}

const RecentLeadsTable = ({ className }: RecentLeadsTableProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching leads from webhook...');
        
        const response = await fetch('https://twosteps.app.n8n.cloud/webhook/4e9c82bb-4de3-4212-ad72-a1c82b148cc1');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch leads: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leads fetched successfully:', data);
        
        // Ensure data is an array
        const leadsArray = Array.isArray(data) ? data : [];
        setLeads(leadsArray);
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch leads');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const getSource = (lead: Lead) => {
    if (lead['LinkedIn URL']) return 'LinkedIn';
    if (lead.Email) return 'Email';
    return 'Manual';
  };

  const getDate = () => {
    return new Date().toISOString().split('T')[0]; // Today's date as fallback
  };

  const getRandomStatus = () => {
    const statuses = ['new', 'qualified', 'contacted', 'converted'];
    return statuses[Math.floor(Math.random() * statuses.length)] as 'new' | 'qualified' | 'contacted' | 'converted';
  };

  const getStatusColor = (status: 'new' | 'qualified' | 'contacted' | 'converted') => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-300';
      case 'qualified': return 'bg-purple-500/20 text-purple-300';
      case 'contacted': return 'bg-cyan-500/20 text-cyan-300';
      case 'converted': return 'bg-indigo-500/20 text-indigo-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  const renderNameWithLinks = (lead: Lead) => {
    const name = lead.Name || 'Unknown';
    const linkedinUrl = lead['LinkedIn URL'];
    const email = lead.Email;

    return (
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">{name}</span>
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
            title="LinkedIn Profile"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-green-400 hover:text-green-300 transition-colors"
            title={`Email: ${email}`}
          >
            <Mail className="w-3 h-3" />
          </a>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 h-[500px] flex flex-col",
      className
    )}>
      <h3 className="text-slate-300 text-sm font-medium mb-6">Recent Leads</h3>
      
      <div className="overflow-x-auto flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2 text-slate-300">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Loading leads...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-400 text-center">
              <p className="font-medium mb-2">Error loading leads</p>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400">No leads found</p>
          </div>
        ) : (
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
              {leads.map((lead, index) => {
                const status = getRandomStatus();
                return (
                  <tr key={index} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3">
                      {renderNameWithLinks(lead)}
                    </td>
                    <td className="py-3 text-slate-200">{getSource(lead)}</td>
                    <td className="py-3 text-slate-200 text-sm">{getDate()}</td>
                    <td className="py-3">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium capitalize",
                        getStatusColor(status)
                      )}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentLeadsTable;
