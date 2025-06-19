
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
      const response = await fetch('https://twosteps.app.n8n.cloud/webhook-test/118da37f-9a78-4335-b2df-c001629ca8c1', {
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
    <div className={cn(
      "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-all duration-300 group",
      className
    )}>
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white">Lead Scraper</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search keywords…"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 min-h-[120px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendQuery}
              disabled={isLoading || !searchQuery.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white w-full gap-2"
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
    </div>
  );
};

export default LeadScraper;
