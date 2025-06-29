import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Plus, 
  Filter, 
  Settings, 
  Search
} from 'lucide-react';
import DealQuickView from './DealQuickView';
import PipelineSelector from './PipelineSelector';
import PipelineStats from './PipelineStats';
import StageColumn from './StageColumn';
import { useDragAlignment } from '../hooks/useDragAlignment';

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

const PipelineBoard = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<string>('sales');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);

  // Enhanced drag alignment hook
  const {
    draggedItemId,
    handleDragStart,
    handleDragEnd,
    getDragStyle,
  } = useDragAlignment({
    onDragStart: (draggedId, offset) => {
      console.log(`Started dragging ${draggedId} with offset:`, offset);
    },
    onDragEnd: () => {
      console.log('Drag ended');
    },
  });

  // Enhanced mock data with better structure
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: 'sales',
      name: 'Sales Pipeline',
      stages: [
        {
          id: 'prospecting',
          name: 'Prospecting',
          probability: 10,
          color: 'bg-slate-500',
          deals: [
            {
              id: '1',
              name: 'Enterprise Software Deal',
              value: 150000,
              company: 'TechCorp Inc',
              owner: 'Sarah Wilson',
              stage: 'prospecting',
              age: 5,
              lastContact: '2 days ago',
              nextTask: 'Follow-up call',
              probability: 10,
              tags: ['enterprise', 'software'],
              priority: 'high'
            },
            {
              id: '2',
              name: 'Small Business Package',
              value: 25000,
              company: 'Local Bakery',
              owner: 'Mike Johnson',
              stage: 'prospecting',
              age: 12,
              lastContact: '1 week ago',
              nextTask: 'Send proposal',
              probability: 15,
              tags: ['small-business'],
              priority: 'medium'
            }
          ]
        },
        {
          id: 'qualification',
          name: 'Qualification',
          probability: 25,
          color: 'bg-blue-500',
          deals: [
            {
              id: '3',
              name: 'Marketing Automation',
              value: 75000,
              company: 'Growth Agency',
              owner: 'Alex Chen',
              stage: 'qualification',
              age: 8,
              lastContact: '1 day ago',
              nextTask: 'Demo scheduled',
              probability: 30,
              tags: ['marketing', 'automation'],
              priority: 'high'
            }
          ]
        },
        {
          id: 'proposal',
          name: 'Proposal',
          probability: 50,
          color: 'bg-amber-500',
          deals: [
            {
              id: '4',
              name: 'Cloud Migration',
              value: 200000,
              company: 'Finance Corp',
              owner: 'Sarah Wilson',
              stage: 'proposal',
              age: 15,
              lastContact: '3 days ago',
              nextTask: 'Contract review',
              probability: 60,
              tags: ['cloud', 'migration'],
              priority: 'high'
            },
            {
              id: '5',
              name: 'Security Audit',
              value: 50000,
              company: 'Healthcare Plus',
              owner: 'Mike Johnson',
              stage: 'proposal',
              age: 20,
              lastContact: '5 days ago',
              nextTask: 'Pricing discussion',
              probability: 45,
              tags: ['security', 'audit'],
              priority: 'medium'
            }
          ]
        },
        {
          id: 'negotiation',
          name: 'Negotiation',
          probability: 75,
          color: 'bg-orange-500',
          deals: [
            {
              id: '6',
              name: 'E-commerce Platform',
              value: 120000,
              company: 'Retail Giants',
              owner: 'Alex Chen',
              stage: 'negotiation',
              age: 30,
              lastContact: '1 day ago',
              nextTask: 'Final terms',
              probability: 80,
              tags: ['e-commerce', 'platform'],
              priority: 'high'
            }
          ]
        },
        {
          id: 'closed-won',
          name: 'Closed Won',
          probability: 100,
          color: 'bg-emerald-500',
          deals: [
            {
              id: '7',
              name: 'Data Analytics Suite',
              value: 300000,
              company: 'Analytics Pro',
              owner: 'Sarah Wilson',
              stage: 'closed-won',
              age: 45,
              lastContact: 'Today',
              nextTask: 'Implementation kickoff',
              probability: 100,
              tags: ['analytics', 'data'],
              priority: 'high'
            }
          ]
        }
      ]
    }
  ]);

  const currentPipeline = pipelines.find(p => p.id === selectedPipeline);

  const handleDragEndWithAlignment = (result: any) => {
    handleDragEnd();
    
    if (!result.destination || !currentPipeline) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const updatedPipelines = pipelines.map(pipeline => {
      if (pipeline.id !== selectedPipeline) return pipeline;

      const updatedStages = [...pipeline.stages];
      const sourceStage = updatedStages.find(stage => stage.id === source.droppableId);
      const destStage = updatedStages.find(stage => stage.id === destination.droppableId);

      if (!sourceStage || !destStage) return pipeline;

      const [movedDeal] = sourceStage.deals.splice(source.index, 1);
      movedDeal.stage = destination.droppableId;
      movedDeal.probability = destStage.probability;
      destStage.deals.splice(destination.index, 0, movedDeal);

      return { ...pipeline, stages: updatedStages };
    });

    setPipelines(updatedPipelines);
  };

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsQuickViewOpen(true);
  };

  if (!currentPipeline) return <div>Pipeline not found</div>;

  return (
    <div className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <PipelineSelector 
            pipelines={pipelines}
            selectedPipeline={selectedPipeline}
            onPipelineChange={setSelectedPipeline}
          />
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search deals..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="pl-10 w-64 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Pipeline Settings
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      <PipelineStats pipeline={currentPipeline} />

      <DragDropContext onDragEnd={handleDragEndWithAlignment}>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {currentPipeline.stages.map(stage => (
            <StageColumn
              key={stage.id}
              stage={stage}
              selectedDeals={selectedDeals}
              draggedItemId={draggedItemId}
              getDragStyle={getDragStyle}
              handleDragStart={handleDragStart}
              onDealClick={handleDealClick}
            />
          ))}
        </div>
      </DragDropContext>

      <DealQuickView
        deal={selectedDeal}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onSave={(updatedDeal) => {
          const updatedPipelines = pipelines.map(pipeline => ({
            ...pipeline,
            stages: pipeline.stages.map(stage => ({
              ...stage,
              deals: stage.deals.map(deal => 
                deal.id === updatedDeal.id ? updatedDeal : deal
              )
            }))
          }));
          setPipelines(updatedPipelines);
          setIsQuickViewOpen(false);
        }}
      />
    </div>
  );
};

export default PipelineBoard;
