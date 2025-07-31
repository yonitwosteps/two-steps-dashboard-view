
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
      isMobile ? 'w-72 snap-center' : 'w-80'
    }`}>
      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 h-full shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-4">
          <StageHeader stage={stage} />
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
