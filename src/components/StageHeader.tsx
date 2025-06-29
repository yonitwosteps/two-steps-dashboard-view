
import React from 'react';
import { CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MoreVertical, Plus, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Deal {
  id: string;
  name: string;
  value: number;
  company: string;
  owner: string;
  stage: string;
  age: number;
  lastContact: string;
  nextTask: string;
  probability: number;
  avatar?: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

interface Stage {
  id: string;
  name: string;
  probability: number;
  color: string;
  deals: Deal[];
}

interface StageHeaderProps {
  stage: Stage;
}

const StageHeader: React.FC<StageHeaderProps> = ({ stage }) => {
  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = (deals: Deal[], probability: number) => {
    return deals.reduce((sum, deal) => sum + (deal.value * probability / 100), 0);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${stage.color} shadow-lg`} />
          <CardTitle className="text-white text-base font-semibold">
            {stage.name}
          </CardTitle>
          <Badge 
            variant="secondary" 
            className="bg-gray-800/80 text-gray-300 px-2 py-1 text-xs font-medium"
          >
            {stage.deals.length}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/80"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 shadow-xl">
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">
              <Settings className="h-4 w-4 mr-2" />
              Stage Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Total Value:</span>
          <span className="font-semibold text-gray-200">${getTotalValue(stage.deals).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Weighted:</span>
          <span className="font-semibold text-gray-200">${getWeightedValue(stage.deals, stage.probability).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Win Rate:</span>
          <span className="font-semibold text-gray-200">{stage.probability}%</span>
        </div>
      </div>
    </>
  );
};

export default StageHeader;
