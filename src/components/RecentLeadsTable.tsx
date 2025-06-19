
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Mail, Phone, Loader } from 'lucide-react';
import LeadDropdownMenu from './LeadDropdownMenu';
import { Toaster } from './ui/toaster';
import { WEBHOOK_CONFIG } from '@/config/webhooks';
import { validateAndSanitizeLead } from '@/utils/validation';
import { SecureHttpClient } from '@/utils/httpClient';

interface Lead {
  name?: string;
  linkedin_url?: string;
  title?: string;
  organization?: string;
  country?: string;
  city?: string;
  sanitized_phone?: number | string;
  email?: string;
  twitter_url?: string;
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
        
        const response = await SecureHttpClient.get(WEBHOOK_CONFIG.LEADS_FETCH_WEBHOOK);
        const data = await response.json();
        
        console.log('Leads fetched successfully:', data);
        
        // Ensure data is an array and validate each lead
        const rawLeads = Array.isArray(data) ? data : [];
        const validatedLeads = rawLeads
          .map(lead => {
            try {
              return validateAndSanitizeLead(lead);
            } catch (error) {
              console.warn('Invalid lead data filtered out:', lead, error);
              return null;
            }
          })
          .filter((lead): lead is Lead => lead !== null);
        
        setLeads(validatedLeads);
      } catch (err) {
        console.error('Error fetching leads:', err);
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to fetch leads';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const renderNameWithLinks = (lead: Lead) => {
    const name = lead.name || 'Unknown';
    const linkedinUrl = lead.linkedin_url;

    return (
      <div className="flex items-center gap-2">
        <LeadDropdownMenu lead={lead}>
          <span className="text-white font-medium">{name}</span>
        </LeadDropdownMenu>
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
      </div>
    );
  };

  const renderEmail = (email?: string) => {
    if (!email) return <span className="text-slate-400">-</span>;
    
    return (
      <a
        href={`mailto:${email}`}
        className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
        title={`Email: ${email}`}
      >
        <Mail className="w-3 h-3" />
        <span className="text-xs">{email}</span>
      </a>
    );
  };

  const renderPhone = (phone?: number | string) => {
    if (!phone) return <span className="text-slate-400">-</span>;
    
    return (
      <div className="flex items-center gap-1 text-slate-200">
        <Phone className="w-3 h-3" />
        <span className="text-xs">{phone}</span>
      </div>
    );
  };

  const renderTwitter = (twitterUrl?: string) => {
    if (!twitterUrl) return <span className="text-slate-400">-</span>;
    
    return (
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 transition-colors"
        title="Twitter Profile"
      >
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  };

  return (
    <>
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[120px]">Name</th>
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[100px]">Title</th>
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[120px]">Organization</th>
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[80px]">Country</th>
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[60px]">City</th>
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[100px]">Phone</th>
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[140px]">Email</th>
                  <th className="text-left text-slate-300 text-xs font-medium pb-3 min-w-[60px]">Twitter</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {leads.map((lead, index) => (
                  <tr key={index} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3">
                      {renderNameWithLinks(lead)}
                    </td>
                    <td className="py-3 text-slate-200 text-xs">
                      {lead.title || '-'}
                    </td>
                    <td className="py-3 text-slate-200 text-xs">
                      {lead.organization || '-'}
                    </td>
                    <td className="py-3 text-slate-200 text-xs">
                      {lead.country || '-'}
                    </td>
                    <td className="py-3 text-slate-200 text-xs">
                      {lead.city || '-'}
                    </td>
                    <td className="py-3">
                      {renderPhone(lead.sanitized_phone)}
                    </td>
                    <td className="py-3">
                      {renderEmail(lead.email)}
                    </td>
                    <td className="py-3">
                      {renderTwitter(lead.twitter_url)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default RecentLeadsTable;
