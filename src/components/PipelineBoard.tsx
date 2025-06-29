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
  Edit,
  Search,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import DealCard from './DealCard';
import EnhancedDealCard from './EnhancedDealCard';
import DealQuickView from './DealQuickView';
import PipelineSelector from './PipelineSelector';
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
    renderGhost,
    isDragging,
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

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = (deals: Deal[], probability: number) => {
    return deals.reduce((sum, deal) => sum + (deal.value * probability / 100), 0);
  };

  if (!currentPipeline) return <div>Pipeline not found</div>;

  return (
    <div className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 sm:p-6">
      {/* Enhanced Header with better spacing and visual hierarchy */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <PipelineSelector 
            pipelines={pipelines}
            selectedPipeline={selectedPipeline}
            onPipelineChange={setSelectedPipeline}
          />
          
          {/* Enhanced Search and Filter */}
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
        
        {/* Enhanced Action Buttons */}
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

      {/* Enhanced Pipeline Summary Cards */}
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
                  ${currentPipeline.stages.reduce((sum, stage) => sum + getTotalValue(stage.deals), 0).toLocaleString()}
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
                  ${currentPipeline.stages.reduce((sum, stage) => sum + getWeightedValue(stage.deals, stage.probability), 0).toLocaleString()}
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
                  {currentPipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0)}
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
                  {Math.round(currentPipeline.stages.reduce((sum, stage) => 
                    sum + stage.deals.reduce((dealSum, deal) => dealSum + deal.age, 0), 0
                  ) / currentPipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0) || 0)} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Pipeline Board with improved drag alignment */}
      <DragDropContext onDragEnd={handleDragEndWithAlignment}>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {currentPipeline.stages.map(stage => (
            <div key={stage.id} className="flex-shrink-0 w-80 animate-fade-in">
              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 h-full shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
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
                  
                  {/* Enhanced Stage Stats */}
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
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[300px] rounded-lg p-2 transition-all duration-300 ${
                          snapshot.isDraggingOver 
                            ? 'bg-gray-800/60 border-2 border-dashed border-gray-600' 
                            : 'bg-transparent'
                        }`}
                      >
                        {stage.deals.map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="transition-all duration-200"
                              >
                                <EnhancedDealCard 
                                  deal={deal} 
                                  onClick={() => handleDealClick(deal)}
                                  isSelected={selectedDeals.includes(deal.id)}
                                  isDragging={snapshot.isDragging || draggedItemId === deal.id}
                                  onDragHandleMouseDown={(e) => {
                                    handleDragStart(e.nativeEvent, deal.id);
                                  }}
                                  onDragHandleTouchStart={(e) => {
                                    handleDragStart(e.nativeEvent, deal.id);
                                  }}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {/* Add Deal Button in Empty State */}
                        {stage.deals.length === 0 && (
                          <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400 hover:text-white"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Deal
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Render ghost element via portal */}
      {renderGhost()}

      {/* Deal Quick View Modal */}
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
