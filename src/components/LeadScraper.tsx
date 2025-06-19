
import React, { useState } from 'react';
import { Play, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadScraperProps {
  className?: string;
}

const LeadScraper = ({ className }: LeadScraperProps) => {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className={cn(
      "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/30 transition-all duration-300 group cursor-pointer",
      className
    )}>
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-green-500/20 rounded-xl group-hover:scale-105 transition-transform">
          {isLoading ? (
            <Loader className="w-8 h-8 text-green-400 animate-spin" />
          ) : (
            <Play className="w-8 h-8 text-green-400" />
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Lead Scraper</h3>
          <p className="text-gray-400 text-sm mb-4">
            Find new potential leads automatically
          </p>
        </div>
        
        <button
          onClick={handleScrapeLeads}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full"
        >
          {isLoading ? 'Scraping...' : 'Scrape New Leads'}
        </button>
      </div>
    </div>
  );
};

export default LeadScraper;
