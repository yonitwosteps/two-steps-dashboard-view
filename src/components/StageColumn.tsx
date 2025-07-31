
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader } from './ui/card';
import EnhancedDealCard from './EnhancedDealCard';
import StageHeader from './StageHeader';
import AddDealButton from './AddDealButton';
import { type Deal, type Stage } from '../hooks/useDealsStore';

interface StageColumnProps {
  stage: Stage;
  selectedDeals: string[];
  onDealClick: (deal: Deal) => void;
  isMobile?: boolean;
}

const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  selectedDeals,
  onDealClick,
  isMobile = false
}) => {
  return (
    <div className={`flex-shrink-0 animate-fade-in ${
      isMobile ? 'w-72 snap-center' : 'min-w-[280px] lg:w-80 xl:w-96'
    }`}>
      <Card className="bg-card/60 backdrop-blur-sm border h-full shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <StageHeader stage={stage} />
        </CardHeader>
        
        <CardContent className="p-3 lg:p-4 pt-0">
          <Droppable droppableId={stage.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 lg:space-y-3 min-h-[300px] max-h-[500px] overflow-y-auto rounded-lg p-2 transition-all duration-300 ${
                  snapshot.isDraggingOver 
                    ? 'bg-muted/50 border-2 border-dashed border-primary/40' 
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
                        className={`transition-all duration-200 ${
                          snapshot.isDragging && "rotate-1 scale-105 shadow-lg"
                        }`}
                      >
                        <EnhancedDealCard 
                          deal={deal} 
                          onClick={() => onDealClick(deal)}
                          isSelected={selectedDeals.includes(deal.id)}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                
                {stage.deals.length === 0 && <AddDealButton />}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </div>
  );
};

export default StageColumn;
