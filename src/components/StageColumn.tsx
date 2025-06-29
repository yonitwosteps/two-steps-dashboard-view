
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader } from './ui/card';
import EnhancedDealCard from './EnhancedDealCard';
import StageHeader from './StageHeader';
import AddDealButton from './AddDealButton';

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

interface StageColumnProps {
  stage: Stage;
  selectedDeals: string[];
  draggedItemId: string | null;
  getDragStyle: (id: string) => React.CSSProperties;
  handleDragStart: (e: MouseEvent | TouchEvent, id: string) => void;
  onDealClick: (deal: Deal) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  selectedDeals,
  draggedItemId,
  getDragStyle,
  handleDragStart,
  onDealClick
}) => {
  return (
    <div className="flex-shrink-0 w-80 animate-fade-in">
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
                          isDragging={snapshot.isDragging || draggedItemId === deal.id}
                          dragStyle={getDragStyle(deal.id)}
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
