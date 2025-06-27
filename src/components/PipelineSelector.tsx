
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
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-400/20 to-purple-600/40 rounded-2xl flex items-center justify-center shadow-xl">
          <BarChart3 className="h-7 w-7 text-blue-400" />
        </div>
        
        <Select value={selectedPipeline} onValueChange={onPipelineChange}>
          <SelectTrigger className="w-80 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-xl rounded-2xl text-lg font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl">
            {pipelines.map(pipeline => {
              const pipelineDeals = pipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0);
              return (
                <SelectItem 
                  key={pipeline.id} 
                  value={pipeline.id}
                  className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer transition-colors rounded-xl py-3"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-lg">{pipeline.name}</span>
                    <Badge 
                      variant="secondary" 
                      className="ml-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 font-semibold rounded-full"
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

      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="lg"
          className="text-slate-300 hover:text-white hover:bg-white/20 transition-all duration-300 px-6 py-3 rounded-2xl font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Pipeline
        </Button>
        <Button 
          variant="ghost" 
          size="lg"
          className="text-slate-300 hover:text-white hover:bg-white/20 transition-all duration-300 px-4 py-3 rounded-2xl"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PipelineSelector;
