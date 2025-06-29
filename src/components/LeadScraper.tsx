
import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { WEBHOOK_CONFIG } from '@/config/webhooks';
import { SearchQuerySchema, sanitizeString } from '@/utils/validation';
import { SecureHttpClient } from '@/utils/httpClient';

interface LeadScraperProps {
  className?: string;
}

const LeadScraper = ({ className }: LeadScraperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSendQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Validate and sanitize the search query
      const sanitizedQuery = sanitizeString(searchQuery.trim());
      const validatedQuery = SearchQuerySchema.parse({ query: sanitizedQuery });
      
      await SecureHttpClient.post(WEBHOOK_CONFIG.SCRAPER_WEBHOOK, validatedQuery);
      
      toast({
        title: "Success",
        description: "Search query has been submitted successfully.",
      });
      setSearchQuery(''); // Clear the input after successful send
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send search query. Please try again.';
      
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
    <Card className={cn(
      "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 rounded-xl shadow-lg flex flex-col",
      // Responsive height
      "h-[280px] sm:h-[300px] lg:h-[320px]",
      className
    )}>
      <CardHeader className="pb-3 sm:pb-4 flex-shrink-0">
        <CardTitle className="text-base sm:text-lg font-semibold text-white">Lead Scraper</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 sm:p-6 pt-0">
        <form onSubmit={handleSendQuery} className="flex flex-col h-full space-y-3 sm:space-y-4">
          <Textarea
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Describe the leads you want, e.g. 'mid-sized tech startups in Tel Aviv' or 'small marketing agencies in Haifa'"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 resize-none flex-1 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
            disabled={isLoading}
            maxLength={500}
          />
          <Button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full gap-2 flex-shrink-0 h-10 sm:h-11 text-sm sm:text-base"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadScraper;
