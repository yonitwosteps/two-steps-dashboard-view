
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown, Bell, Ban, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

interface LeadDropdownMenuProps {
  lead: Lead;
  children: React.ReactNode;
}

const LeadDropdownMenu = ({ lead, children }: LeadDropdownMenuProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFollowUp = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    console.log('Adding lead to follow-up reminder:', lead);
    
    try {
      // Validate and sanitize lead data
      const sanitizedLead = validateAndSanitizeLead(lead);
      
      await SecureHttpClient.post(WEBHOOK_CONFIG.FOLLOW_UP_WEBHOOK, sanitizedLead);

      toast({
        title: "Success",
        description: `${sanitizedLead.name || 'Lead'} has been added to follow-up reminders.`,
      });
    } catch (error) {
      console.error('Error adding to follow-up:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to add lead to follow-up reminders. Please try again.';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlacklist = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    console.log('Adding lead to blacklist:', lead);
    
    try {
      // Validate and sanitize lead data
      const sanitizedLead = validateAndSanitizeLead(lead);
      
      await SecureHttpClient.post(WEBHOOK_CONFIG.BLACKLIST_WEBHOOK, sanitizedLead);

      toast({
        title: "Success",
        description: `${sanitizedLead.name || 'Lead'} has been added to the blacklist.`,
      });
    } catch (error) {
      console.error('Error adding to blacklist:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to add lead to blacklist. Please try again.';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-white font-medium hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-sm">
          {children}
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-slate-800 border-slate-700 shadow-xl rounded-lg"
        align="start"
        sideOffset={5}
      >
        <DropdownMenuItem
          onClick={handleFollowUp}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer focus:bg-slate-700 focus:text-white transition-colors"
        >
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Bell className="w-4 h-4 text-blue-400" />
          )}
          <span>Add to Follow-up Reminder</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleBlacklist}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer focus:bg-slate-700 focus:text-white transition-colors"
        >
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Ban className="w-4 h-4 text-red-400" />
          )}
          <span>Add to Blacklist</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeadDropdownMenu;
