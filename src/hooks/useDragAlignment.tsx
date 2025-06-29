
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
  const [ghostContent, setGhostContent] = useState<string | null>(null);
  const [ghostStyles, setGhostStyles] = useState<React.CSSProperties | null>(null);
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

    // Create ghost styles
    const styles: React.CSSProperties = {
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 9999,
      pointerEvents: 'none',
      transform: 'rotate(3deg) scale(1.05)',
      opacity: 0.9,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      transition: 'none',
    };

    // Capture the HTML content of the element
    const content = target.outerHTML;

    setGhostContent(content);
    setGhostStyles(styles);

    // Hide original element
    target.style.opacity = '0.3';

    setDraggedItemId(id);
    
    // Initial position
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

    const newPosition = {
      x: clientX - offsetRef.current.x,
      y: clientY - offsetRef.current.y,
    };

    setPosition(newPosition);
  }, [draggedItemId, ghostContent]);

  const handleDragEnd = useCallback(() => {
    // Restore original element visibility
    if (originalElementRef.current) {
      originalElementRef.current.style.opacity = '';
    }

    setDraggedItemId(null);
    setPosition(null);
    setGhostContent(null);
    setGhostStyles(null);
    originalElementRef.current = null;
    config?.onDragEnd?.();
  }, [config]);

  // Create portal for ghost element
  const renderGhost = useCallback(() => {
    if (!ghostContent || !ghostStyles || !position) return null;

    const updatedStyles = {
      ...ghostStyles,
      left: position.x,
      top: position.y,
    };

    return createPortal(
      <div
        style={updatedStyles}
        dangerouslySetInnerHTML={{ __html: ghostContent }}
      />,
      document.body
    );
  }, [ghostContent, ghostStyles, position]);

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
