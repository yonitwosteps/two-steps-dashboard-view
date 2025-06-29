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
  const [ghostContent, setGhostContent] = useState<string | null>(null);
  const offsetRef = useRef<DragOffset>({ x: 0, y: 0 });
  const originalElementRef = useRef<HTMLElement | null>(null);

  const handleDragStart = useCallback((e: MouseEvent | TouchEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    offsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    originalElementRef.current = target;
    setGhostContent(target.outerHTML);
    target.style.opacity = '0.3';

    setDraggedItemId(id);
    setPosition({
      x: clientX - offsetRef.current.x,
      y: clientY - offsetRef.current.y,
    });

    config?.onDragStart?.(id, offsetRef.current);
  }, [config]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggedItemId || !ghostContent) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    setPosition({
      x: clientX - offsetRef.current.x,
      y: clientY - offsetRef.current.y,
    });
  }, [draggedItemId, ghostContent]);

  const handleDragEnd = useCallback(() => {
    if (originalElementRef.current) {
      originalElementRef.current.style.opacity = '';
    }

    setDraggedItemId(null);
    setPosition(null);
    setGhostContent(null);
    originalElementRef.current = null;

    config?.onDragEnd?.();
  }, [config]);

  const renderGhost = useCallback(() => {
    if (!ghostContent || !position) return null;

    return createPortal(
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 99999, // ← ensure it's above all panels
          pointerEvents: 'none',
          opacity: 0.9,
          transform: 'rotate(3deg) scale(1.05)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        }}
        dangerouslySetInnerHTML={{ __html: ghostContent }}
      />,
      document.body
    );
  }, [ghostContent, position]);

  const getDragStyle = useCallback(() => ({}), []);

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
