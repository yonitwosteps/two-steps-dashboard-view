
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown, Bell, Ban, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
      const response = await fetch('https://twosteps.app.n8n.cloud/webhook/072ecdd7-9882-452c-a82f-f60373aa8afc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `${lead.name || 'Lead'} has been added to follow-up reminders.`,
        });
      } else {
        throw new Error('Failed to add to follow-up reminders');
      }
    } catch (error) {
      console.error('Error adding to follow-up:', error);
      toast({
        title: "Error",
        description: "Failed to add lead to follow-up reminders. Please try again.",
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
      const response = await fetch('https://twosteps.app.n8n.cloud/webhook/fa7497e1-8e4f-4866-99e7-5973d713c0e3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `${lead.name || 'Lead'} has been added to the blacklist.`,
        });
      } else {
        throw new Error('Failed to add to blacklist');
      }
    } catch (error) {
      console.error('Error adding to blacklist:', error);
      toast({
        title: "Error",
        description: "Failed to add lead to blacklist. Please try again.",
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
