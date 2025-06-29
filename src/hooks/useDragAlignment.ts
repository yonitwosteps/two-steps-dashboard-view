
import { useState, useCallback, useRef } from 'react';

interface DragOffset {
  x: number;
  y: number;
}

interface DragAlignmentConfig {
  onDragStart?: (draggedId: string, offset: DragOffset) => void;
  onDragEnd?: () => void;
}

export const useDragAlignment = (config?: DragAlignmentConfig) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const initialOffsetRef = useRef<DragOffset>({ x: 0, y: 0 });

  const handleDragStart = useCallback((event: MouseEvent | TouchEvent, itemId: string) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    // Calculate initial offset from cursor to element center
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

    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    
    const offsetX = clientX - elementCenterX;
    const offsetY = clientY - elementCenterY;
    
    const initialOffset = { x: offsetX, y: offsetY };
    
    setDraggedItemId(itemId);
    setDragOffset(initialOffset);
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

    // Apply the stored offset to maintain cursor position relative to element center
    const adjustedOffset = {
      x: initialOffsetRef.current.x,
      y: initialOffsetRef.current.y
    };
    
    setDragOffset(adjustedOffset);
  }, [draggedItemId]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
    setDragOffset({ x: 0, y: 0 });
    initialOffsetRef.current = { x: 0, y: 0 };
    
    config?.onDragEnd?.();
  }, [config]);

  const getDragStyle = useCallback((itemId: string) => {
    if (draggedItemId !== itemId) return {};
    
    return {
      transform: `translate(${-dragOffset.x}px, ${-dragOffset.y}px)`,
      transformOrigin: 'center',
    };
  }, [draggedItemId, dragOffset]);

  return {
    draggedItemId,
    dragOffset,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getDragStyle,
    isDragging: !!draggedItemId,
  };
};
