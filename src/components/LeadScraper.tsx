
import React, { useState } from 'react';
import { Play, Loader, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface LeadScraperProps {
  className?: string;
}

const LeadScraper = ({ className }: LeadScraperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleScrapeLeads = async () => {
    setIsLoading(true);
    console.log('Starting lead scraping...');
    
    try {
      // Replace with your actual n8n webhook URL
      const response = await fetch('https://your-n8n-url/webhook/lead-scraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: 'dashboard'
        })
      });
      
      if (response.ok) {
        console.log('Lead scraping initiated successfully');
      } else {
        console.error('Failed to initiate lead scraping');
      }
    } catch (error) {
      console.error('Error scraping leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <CardContent className="space-y-6">
          {/* Search Query Section */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search keywords…"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendQuery}
                disabled={isLoading || !searchQuery.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4"
              >
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>

          {/* Original Lead Scraper Section */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 pt-4 border-t border-slate-700/50">
            <div className="p-4 bg-blue-500/20 rounded-xl group-hover:scale-105 transition-transform">
              {isLoading ? (
                <Loader className="w-8 h-8 text-blue-400 animate-spin" />
              ) : (
                <Play className="w-8 h-8 text-blue-400" />
              )}
            </div>
            
            <div>
              <p className="text-slate-300 text-sm mb-4">
                Find new potential leads automatically
              </p>
            </div>
            
            <button
              onClick={handleScrapeLeads}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-500/50 disabled:to-blue-600/50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Scraping...' : 'Scrape New Leads'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadScraper;
