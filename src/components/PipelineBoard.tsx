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
    <div className="h-full">
      <div className="flex flex-col h-full p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <PipelineSelector 
              pipelines={pipelines}
              selectedPipeline={selectedPipelineId}
              onPipelineChange={setSelectedPipelineId}
            />
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deals..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Filter className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Settings className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>

        <PipelineStats pipeline={displayPipeline} />

        <div className="flex-1 mt-6 min-h-0">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-3 lg:gap-6 overflow-x-auto pb-4 h-full">
              {displayPipeline.stages.map((stage) => (
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
        </div>
      </div>

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
