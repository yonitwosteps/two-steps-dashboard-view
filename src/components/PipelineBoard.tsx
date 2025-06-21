
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MoreVertical, 
  Plus, 
  Filter, 
  Settings, 
  Users, 
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Eye,
  Edit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import DealCard from './DealCard';
import DealQuickView from './DealQuickView';
import PipelineSelector from './PipelineSelector';

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

  // Mock data - replace with real data integration
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: 'sales',
      name: 'Sales Pipeline',
      stages: [
        {
          id: 'prospecting',
          name: 'Prospecting',
          probability: 10,
          color: 'bg-gray-500',
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
          color: 'bg-yellow-500',
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
          color: 'bg-green-500',
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

  const handleDragEnd = (result: any) => {
    if (!result.destination || !currentPipeline) return;

    const { source, destination } = result;
    
    // If dropped in the same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const updatedPipelines = pipelines.map(pipeline => {
      if (pipeline.id !== selectedPipeline) return pipeline;

      const updatedStages = [...pipeline.stages];
      const sourceStage = updatedStages.find(stage => stage.id === source.droppableId);
      const destStage = updatedStages.find(stage => stage.id === destination.droppableId);

      if (!sourceStage || !destStage) return pipeline;

      // Remove deal from source stage
      const [movedDeal] = sourceStage.deals.splice(source.index, 1);
      
      // Update deal stage
      movedDeal.stage = destination.droppableId;
      movedDeal.probability = destStage.probability;

      // Add deal to destination stage
      destStage.deals.splice(destination.index, 0, movedDeal);

      return { ...pipeline, stages: updatedStages };
    });

    setPipelines(updatedPipelines);
  };

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsQuickViewOpen(true);
  };

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = (deals: Deal[], probability: number) => {
    return deals.reduce((sum, deal) => sum + (deal.value * probability / 100), 0);
  };

  if (!currentPipeline) return <div>Pipeline not found</div>;

  return (
    <div className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <PipelineSelector 
            pipelines={pipelines}
            selectedPipeline={selectedPipeline}
            onPipelineChange={setSelectedPipeline}
          />
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter deals..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-64 bg-gray-800/50 border-gray-700"
            />
            <Button variant="outline" size="sm" className="border-gray-700">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Pipeline Settings
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Pipeline Value</p>
                <p className="text-xl font-bold text-white">
                  ${currentPipeline.stages.reduce((sum, stage) => sum + getTotalValue(stage.deals), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Weighted Pipeline</p>
                <p className="text-xl font-bold text-white">
                  ${currentPipeline.stages.reduce((sum, stage) => sum + getWeightedValue(stage.deals, stage.probability), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Deals</p>
                <p className="text-xl font-bold text-white">
                  {currentPipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg. Deal Age</p>
                <p className="text-xl font-bold text-white">
                  {Math.round(currentPipeline.stages.reduce((sum, stage) => 
                    sum + stage.deals.reduce((dealSum, deal) => dealSum + deal.age, 0), 0
                  ) / currentPipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0) || 0)} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {currentPipeline.stages.map(stage => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <Card className="bg-gray-900/50 border-gray-700 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <CardTitle className="text-white text-sm font-medium">
                        {stage.name}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        {stage.deals.length}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Deal
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                          <Settings className="h-4 w-4 mr-2" />
                          Stage Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-medium">${getTotalValue(stage.deals).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weighted:</span>
                      <span className="font-medium">${getWeightedValue(stage.deals, stage.probability).toLocaleString()}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[200px] rounded-lg transition-colors ${
                          snapshot.isDraggingOver ? 'bg-gray-800/50' : ''
                        }`}
                      >
                        {stage.deals.map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${snapshot.isDragging ? 'rotate-2 scale-105' : ''}`}
                              >
                                <DealCard 
                                  deal={deal} 
                                  onClick={() => handleDealClick(deal)}
                                  isSelected={selectedDeals.includes(deal.id)}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Deal Quick View */}
      <DealQuickView
        deal={selectedDeal}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onSave={(updatedDeal) => {
          // Update deal in pipelines
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
