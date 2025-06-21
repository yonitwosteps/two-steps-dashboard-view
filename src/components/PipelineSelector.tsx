
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
import { Plus, Settings } from 'lucide-react';

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
      <Select value={selectedPipeline} onValueChange={onPipelineChange}>
        <SelectTrigger className="w-64 bg-gray-800/50 border-gray-700 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {pipelines.map(pipeline => {
            const pipelineDeals = pipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0);
            return (
              <SelectItem 
                key={pipeline.id} 
                value={pipeline.id}
                className="text-white hover:bg-gray-700 focus:bg-gray-700"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{pipeline.name}</span>
                  <Badge variant="secondary" className="ml-2 bg-gray-700 text-gray-300">
                    {pipelineDeals}
                  </Badge>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
          <Plus className="h-4 w-4 mr-2" />
          New Pipeline
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PipelineSelector;
