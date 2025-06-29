
import { useState, useCallback, useRef } from 'react';

interface DragOffset {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface DragAlignmentConfig {
  onDragStart?: (draggedId: string, offset: DragOffset) => void;
  onDragEnd?: () => void;
}

export const useDragAlignment = (config?: DragAlignmentConfig) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const initialOffsetRef = useRef<DragOffset>({ x: 0, y: 0 });

  const handleDragStart = useCallback((event: MouseEvent | TouchEvent, itemId: string) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    // Calculate initial offset from cursor to element origin (top-left corner)
    let clientX: number, clientY: number;
    
    if ('touches' in event) {
      // Touch event
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      // Mouse event
      clientX = event.clientX;
      clientY = event.clientY;
    }

    // Offset from cursor to element origin
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    
    const initialOffset = { x: offsetX, y: offsetY };
    
    setDraggedItemId(itemId);
    setCurrentPosition({ x: rect.left, y: rect.top });
    initialOffsetRef.current = initialOffset;
    
    config?.onDragStart?.(itemId, initialOffset);
  }, [config]);

  const handleDragMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!draggedItemId) return;

    let clientX: number, clientY: number;
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    // Calculate the current element position using clientX/clientY minus the initial offset
    const newPosition = {
      x: clientX - initialOffsetRef.current.x,
      y: clientY - initialOffsetRef.current.y
    };
    
    setCurrentPosition(newPosition);
  }, [draggedItemId]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
    setCurrentPosition({ x: 0, y: 0 });
    initialOffsetRef.current = { x: 0, y: 0 };
    
    config?.onDragEnd?.();
  }, [config]);

  const getDragStyle = useCallback((itemId: string) => {
    if (draggedItemId !== itemId) return {};
    
    return {
      transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
      transformOrigin: 'top left',
      position: 'fixed' as const,
      zIndex: 1000,
      pointerEvents: 'none' as const,
    };
  }, [draggedItemId, currentPosition]);

  return {
    draggedItemId,
    currentPosition,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getDragStyle,
    isDragging: !!draggedItemId,
  };
};
