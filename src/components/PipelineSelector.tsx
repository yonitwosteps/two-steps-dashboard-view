
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Settings, BarChart3 } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  stages: any[];
}

interface PipelineSelectorProps {
  pipelines: Pipeline[];
  selectedPipeline: string;
  onPipelineChange: (pipelineId: string) => void;
}

const PipelineSelector: React.FC<PipelineSelectorProps> = ({ 
  pipelines, 
  selectedPipeline, 
  onPipelineChange 
}) => {
  const currentPipeline = pipelines.find(p => p.id === selectedPipeline);
  const totalDeals = currentPipeline?.stages.reduce((sum, stage) => sum + stage.deals.length, 0) || 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-xl flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-blue-400" />
        </div>
        
        <Select value={selectedPipeline} onValueChange={onPipelineChange}>
          <SelectTrigger className="w-72 bg-gray-800/60 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-800/80 transition-all duration-300 shadow-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800/95 backdrop-blur-sm border-gray-700 shadow-2xl">
            {pipelines.map(pipeline => {
              const pipelineDeals = pipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0);
              return (
                <SelectItem 
                  key={pipeline.id} 
                  value={pipeline.id}
                  className="text-white hover:bg-gray-700/80 focus:bg-gray-700/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{pipeline.name}</span>
                    <Badge 
                      variant="secondary" 
                      className="ml-3 bg-gray-700/80 text-gray-300 px-2 py-1 text-xs"
                    >
                      {pipelineDeals} deals
                    </Badge>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 ml-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white hover:bg-gray-700/80 transition-all duration-300 px-3 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Pipeline
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white hover:bg-gray-700/80 transition-all duration-300 px-3 py-2"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PipelineSelector;
