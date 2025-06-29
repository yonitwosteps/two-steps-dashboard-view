
import React from 'react';
import { Card, CardContent } from './ui/card';
import { DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';

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

interface Pipeline {
  id: string;
  name: string;
  stages: Stage[];
}

interface PipelineStatsProps {
  pipeline: Pipeline;
}

const PipelineStats: React.FC<PipelineStatsProps> = ({ pipeline }) => {
  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = (deals: Deal[], probability: number) => {
    return deals.reduce((sum, deal) => sum + (deal.value * probability / 100), 0);
  };

  const totalPipelineValue = pipeline.stages.reduce((sum, stage) => sum + getTotalValue(stage.deals), 0);
  const weightedPipelineValue = pipeline.stages.reduce((sum, stage) => sum + getWeightedValue(stage.deals, stage.probability), 0);
  const totalDeals = pipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0);
  const avgDealAge = Math.round(pipeline.stages.reduce((sum, stage) => 
    sum + stage.deals.reduce((dealSum, deal) => dealSum + deal.age, 0), 0
  ) / totalDeals || 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 hover:bg-gray-900/80 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Total Pipeline Value</p>
              <p className="text-2xl font-bold text-white">
                ${totalPipelineValue.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 hover:bg-gray-900/80 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Weighted Pipeline</p>
              <p className="text-2xl font-bold text-white">
                ${weightedPipelineValue.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 hover:bg-gray-900/80 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Total Deals</p>
              <p className="text-2xl font-bold text-white">
                {totalDeals}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 hover:bg-gray-900/80 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/30 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Avg. Deal Age</p>
              <p className="text-2xl font-bold text-white">
                {avgDealAge} days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelineStats;
