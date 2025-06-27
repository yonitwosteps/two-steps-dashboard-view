
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

  const handleDragEnd = (result: any) => {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-8">
      {/* Modern Header with Glass Morphism Effect */}
      <div className="mb-12">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <PipelineSelector 
                pipelines={pipelines}
                selectedPipeline={selectedPipeline}
                onPipelineChange={setSelectedPipeline}
              />
              
              {/* Enhanced Search Bar */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    placeholder="Search deals..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="pl-12 w-80 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl text-lg"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="h-12 px-6 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white hover:text-white rounded-2xl transition-all duration-300"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            {/* Premium Action Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="h-12 px-6 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white hover:text-white rounded-2xl transition-all duration-300"
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
              <Button 
                size="lg" 
                className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl transform hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Deal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Cards with Glass Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-emerald-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400 mb-2 font-medium">Total Pipeline Value</p>
                <p className="text-3xl font-bold text-white">
                  ${currentPipeline.stages.reduce((sum, stage) => sum + getTotalValue(stage.deals), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400 mb-2 font-medium">Weighted Pipeline</p>
                <p className="text-3xl font-bold text-white">
                  ${currentPipeline.stages.reduce((sum, stage) => sum + getWeightedValue(stage.deals, stage.probability), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-purple-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400 mb-2 font-medium">Total Deals</p>
                <p className="text-3xl font-bold text-white">
                  {currentPipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400 mb-2 font-medium">Avg. Deal Age</p>
                <p className="text-3xl font-bold text-white">
                  {Math.round(currentPipeline.stages.reduce((sum, stage) => 
                    sum + stage.deals.reduce((dealSum, deal) => dealSum + deal.age, 0), 0
                  ) / currentPipeline.stages.reduce((sum, stage) => sum + stage.deals.length, 0) || 0)} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ultra-Modern Pipeline Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {currentPipeline.stages.map(stage => (
            <div key={stage.id} className="flex-shrink-0 w-96 animate-fade-in">
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl h-full rounded-3xl overflow-hidden">
                <CardHeader className="pb-6 bg-gradient-to-r from-white/5 to-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full ${stage.color} shadow-lg ring-4 ring-white/20`} />
                      <CardTitle className="text-white text-xl font-bold">
                        {stage.name}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 text-sm font-semibold rounded-full"
                      >
                        {stage.deals.length}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-10 w-10 p-0 text-slate-400 hover:text-white hover:bg-white/20 rounded-full transition-all duration-300"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl">
                        <DropdownMenuItem className="text-white hover:bg-white/20 focus:bg-white/20 rounded-xl">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Deal
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-white/20 focus:bg-white/20 rounded-xl">
                          <Settings className="h-4 w-4 mr-2" />
                          Stage Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Premium Stage Stats */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">Total Value:</span>
                      <span className="font-bold text-white text-lg">${getTotalValue(stage.deals).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">Weighted:</span>
                      <span className="font-bold text-white text-lg">${getWeightedValue(stage.deals, stage.probability).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">Win Rate:</span>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold">
                        {stage.probability}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-4 min-h-[400px] rounded-2xl p-4 transition-all duration-300 ${
                          snapshot.isDraggingOver 
                            ? 'bg-white/10 border-2 border-dashed border-white/30' 
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
                                className={`transition-all duration-300 ${
                                  snapshot.isDragging 
                                    ? 'rotate-6 scale-110 shadow-2xl z-50' 
                                    : 'hover:scale-105'
                                }`}
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
                        
                        {/* Premium Empty State */}
                        {stage.deals.length === 0 && (
                          <div className="flex items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-2xl hover:border-white/50 transition-all duration-300 group">
                            <Button 
                              variant="ghost" 
                              size="lg"
                              className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/20 rounded-2xl transition-all duration-300"
                            >
                              <Plus className="h-5 w-5 mr-2" />
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
