
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface WorkLoopProps {
  children?: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // Pixels per second
}

export default function WorkLoop({ children, direction = 'left', speed = 40 }: WorkLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  
  const offsetRef = useRef(0);
  const requestRef = useRef<number>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const contentWidthRef = useRef(0);

  // Sync the DOM transform with our internal offset
  const updateTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
  }, []);

  // Calculate dimensions and handle resizing
  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        contentWidthRef.current = contentRef.current.offsetWidth;
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    
    updateWidth();
    return () => resizeObserver.disconnect();
  }, [children]);

  const animate = useCallback((timestamp: number) => {
    if (lastTimestampRef.current === null) {
      lastTimestampRef.current = timestamp;
    }
    
    const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = timestamp;

    if (!isDragging && contentWidthRef.current > 0) {
      const moveAmount = (direction === 'left' ? speed : -speed) * deltaTime;
      offsetRef.current += moveAmount;

      // Infinite Loop Logic
      // If we go past the end of the first set of content, wrap around
      if (offsetRef.current >= contentWidthRef.current) {
        offsetRef.current -= contentWidthRef.current;
      } else if (offsetRef.current < 0) {
        offsetRef.current += contentWidthRef.current;
      }
      
      updateTransform();
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [direction, speed, isDragging, updateTransform]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  // Dragging Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartOffset(offsetRef.current);
    lastTimestampRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setStartOffset(offsetRef.current);
    lastTimestampRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (startX - x) * 1.2; // Drag sensitivity
    offsetRef.current = startOffset + walk;
    
    // Maintain wrap-around during dragging
    if (contentWidthRef.current > 0) {
      if (offsetRef.current >= contentWidthRef.current) {
        offsetRef.current -= contentWidthRef.current;
        setStartX(x);
        setStartOffset(offsetRef.current);
      } else if (offsetRef.current < 0) {
        offsetRef.current += contentWidthRef.current;
        setStartX(x);
        setStartOffset(offsetRef.current);
      }
    }
    updateTransform();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (startX - x) * 1.2;
    offsetRef.current = startOffset + walk;
    
    if (contentWidthRef.current > 0) {
      if (offsetRef.current >= contentWidthRef.current) {
        offsetRef.current -= contentWidthRef.current;
        setStartX(x);
        setStartOffset(offsetRef.current);
      } else if (offsetRef.current < 0) {
        offsetRef.current += contentWidthRef.current;
        setStartX(x);
        setStartOffset(offsetRef.current);
      }
    }
    updateTransform();
  };

  const stopDragging = () => {
    setIsDragging(false);
    lastTimestampRef.current = null;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopDragging}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap py-4 w-max"
        style={{ willChange: 'transform' }}
      >
        {/* First set of content */}
        <div ref={contentRef} className="flex gap-6 md:gap-10 px-4">
          {children}
        </div>
        {/* Seamless Duplicate */}
        <div className="flex gap-6 md:gap-10 px-4" aria-hidden="true">
          {children}
        </div>
        {/* Third set to ensure no gaps on extremely wide screens during wrap */}
        <div className="flex gap-6 md:gap-10 px-4" aria-hidden="true">
          {children}
        </div>
      </div>
      
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/40 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
