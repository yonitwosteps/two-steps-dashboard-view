
import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
  const [ghostElement, setGhostElement] = useState<HTMLElement | null>(null);
  const offsetRef = useRef<DragOffset>({ x: 0, y: 0 });
  const originalElementRef = useRef<HTMLElement | null>(null);

  const handleDragStart = useCallback((e: MouseEvent | TouchEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    // Calculate offset between cursor and element top-left
    offsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    // Store reference to original element
    originalElementRef.current = target;

    // Create ghost element by cloning the original
    const ghost = target.cloneNode(true) as HTMLElement;
    ghost.style.position = 'fixed';
    ghost.style.top = `${rect.top}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.zIndex = '9999';
    ghost.style.pointerEvents = 'none';
    ghost.style.transform = 'rotate(3deg) scale(1.05)';
    ghost.style.opacity = '0.9';
    ghost.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.8)';
    ghost.style.transition = 'none';

    // Hide original element
    target.style.opacity = '0.3';

    setGhostElement(ghost);
    setDraggedItemId(id);
    
    // Initial position
    setPosition({
      x: clientX - offsetRef.current.x,
      y: clientY - offsetRef.current.y,
    });

    config?.onDragStart?.(id, offsetRef.current);
  }, [config]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggedItemId || !ghostElement) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const newPosition = {
      x: clientX - offsetRef.current.x,
      y: clientY - offsetRef.current.y,
    };

    setPosition(newPosition);
  }, [draggedItemId, ghostElement]);

  const handleDragEnd = useCallback(() => {
    // Restore original element visibility
    if (originalElementRef.current) {
      originalElementRef.current.style.opacity = '';
    }

    setDraggedItemId(null);
    setPosition(null);
    setGhostElement(null);
    originalElementRef.current = null;
    config?.onDragEnd?.();
  }, [config]);

  // Update ghost element position when position changes
  useEffect(() => {
    if (ghostElement && position) {
      ghostElement.style.left = `${position.x}px`;
      ghostElement.style.top = `${position.y}px`;
    }
  }, [ghostElement, position]);

  // Create portal for ghost element
  const renderGhost = useCallback(() => {
    if (!ghostElement) return null;
    return createPortal(ghostElement, document.body);
  }, [ghostElement]);

  const getDragStyle = useCallback((id: string) => {
    // Return empty style since we're using portal now
    return {};
  }, []);

  return {
    draggedItemId,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getDragStyle,
    renderGhost,
    isDragging: !!draggedItemId,
  };
};
