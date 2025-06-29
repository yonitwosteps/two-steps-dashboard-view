
import { useState, useCallback, useRef } from 'react';
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
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);
  const offsetRef = useRef<DragOffset>({ x: 0, y: 0 });

  const handleDragStart = useCallback((e: MouseEvent | TouchEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    // Calculate offset from cursor to center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    offsetRef.current = {
      x: clientX - centerX,
      y: clientY - centerY,
    };

    // Clone the element for portal rendering
    const clonedElement = target.cloneNode(true) as HTMLElement;
    clonedElement.style.width = `${rect.width}px`;
    clonedElement.style.height = `${rect.height}px`;
    clonedElement.style.position = 'fixed';
    clonedElement.style.pointerEvents = 'none';
    clonedElement.style.zIndex = '99999';
    clonedElement.style.transform = 'rotate(3deg) scale(1.05)';
    clonedElement.style.opacity = '0.9';
    clonedElement.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.8)';

    setDraggedElement(clonedElement);
    setDraggedItemId(id);
    
    // Set initial position
    setPosition({
      x: clientX - offsetRef.current.x - rect.width,
      y: clientY - offsetRef.current.y - rect.height,
    });

    config?.onDragStart?.(id, offsetRef.current);
  }, [config]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggedItemId || !draggedElement) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const rect = draggedElement.getBoundingClientRect();
    
    setPosition({
      x: clientX - offsetRef.current.x - rect.width,
      y: clientY - offsetRef.current.y - rect.height,
    });
  }, [draggedItemId, draggedElement]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
    setPosition(null);
    setDraggedElement(null);
    config?.onDragEnd?.();
  }, [config]);

  const getDragStyle = useCallback((id: string) => {
    if (draggedItemId !== id) return {};
    
    // Hide the original element when dragging
    return {
      opacity: 0.3,
      transform: 'scale(0.95)',
    };
  }, [draggedItemId]);

  // Render the dragged element using portal
  const dragPortal = draggedElement && position ? createPortal(
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 99999,
        pointerEvents: 'none',
        width: draggedElement.style.width,
        height: draggedElement.style.height,
        transform: 'rotate(3deg) scale(1.05)',
        opacity: 0.9,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      }}
      dangerouslySetInnerHTML={{ __html: draggedElement.innerHTML }}
    />,
    document.body
  ) : null;

  return {
    draggedItemId,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getDragStyle,
    isDragging: !!draggedItemId,
    dragPortal,
  };
};
