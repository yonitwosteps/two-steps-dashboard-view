
import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface LeadScraperProps {
  className?: string;
}

const LeadScraper = ({ className }: LeadScraperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendQuery = async () => {
    if (!searchQuery.trim()) {
      console.log('No search query entered');
      return;
    }

    setIsLoading(true);
    console.log('Sending search query:', searchQuery);
    
    try {
      const response = await fetch('https://twosteps.app.n8n.cloud/webhook/118da37f-9a78-4335-b2df-c001629ca8c1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery
        })
      });
      
      if (response.ok) {
        console.log('Search query sent successfully');
        setSearchQuery(''); // Clear the input after successful send
      } else {
        console.error('Failed to send search query');
      }
    } catch (error) {
      console.error('Error sending search query:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn(
      "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 rounded-xl shadow-lg h-[300px] flex flex-col",
      className
    )}>
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-white">Lead Scraper</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6 pt-0">
        <div className="flex flex-col h-full space-y-4">
          <Textarea
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Describe the leads you want, e.g. 'mid-sized tech startups in Tel Aviv' or 'small marketing agencies in Haifa'"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 resize-none flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendQuery}
            disabled={isLoading || !searchQuery.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full gap-2 flex-shrink-0"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadScraper;
