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
  const [position, setPosition] = useState<Position | null>(null);
  const offsetRef = useRef<DragOffset>({ x: 0, y: 0 });

  const handleDragStart = useCallback((e: MouseEvent | TouchEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    // Offset between cursor and element top-left
    offsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    setDraggedItemId(id);
    config?.onDragStart?.(id, offsetRef.current);
  }, [config]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggedItemId) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    setPosition({
      x: clientX - offsetRef.current.x,
      y: clientY - offsetRef.current.y,
    });
  }, [draggedItemId]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
    setPosition(null);
    config?.onDragEnd?.();
  }, [config]);

  const getDragStyle = useCallback((id: string) => {
    if (draggedItemId !== id || !position) return {};

    return {
      position: 'fixed' as const,
      top: `${position.y}px`,
      left: `${position.x}px`,
      zIndex: 9999,
      pointerEvents: 'none' as const,
    };
  }, [draggedItemId, position]);

  return {
    draggedItemId,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getDragStyle,
    isDragging: !!draggedItemId,
  };
};
