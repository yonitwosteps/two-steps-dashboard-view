import React, { useState, useCallback, useMemo } from 'react';
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
import { useIsMobile } from '../hooks/use-mobile';
import { useDealsStore, type Deal } from '../hooks/useDealsStore';



const PipelineBoard = () => {
  const isMobile = useIsMobile();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);

  const {
    pipelines,
    currentPipeline,
    selectedPipelineId,
    setSelectedPipelineId,
    moveDeal,
    updateDeal,
    searchDeals
  } = useDealsStore();


  // Filter deals based on search term
  const displayPipeline = useMemo(() => {
    return filterValue ? searchDeals(filterValue) : currentPipeline;
  }, [currentPipeline, filterValue, searchDeals]);

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination || !currentPipeline) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    moveDeal(
      draggableId,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  }, [currentPipeline, moveDeal]);

  const handleDealClick = useCallback((deal: Deal) => {
    setSelectedDeal(deal);
    setIsQuickViewOpen(true);
  }, []);

  if (!displayPipeline) return <div>Pipeline not found</div>;

  return (
    <div className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <PipelineSelector 
            pipelines={pipelines}
            selectedPipeline={selectedPipelineId}
            onPipelineChange={setSelectedPipelineId}
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

      <PipelineStats pipeline={displayPipeline} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={`flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 ${
          isMobile ? 'snap-x snap-mandatory' : ''
        }`}>
          {displayPipeline.stages.map(stage => (
            <StageColumn
              key={stage.id}
              stage={stage}
              selectedDeals={selectedDeals}
              onDealClick={handleDealClick}
              isMobile={isMobile}
            />
          ))}
        </div>
      </DragDropContext>

      <DealQuickView
        deal={selectedDeal}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onSave={(updatedDeal) => {
          updateDeal(updatedDeal);
          setIsQuickViewOpen(false);
        }}
      />
    </div>
  );
};

export default PipelineBoard;
