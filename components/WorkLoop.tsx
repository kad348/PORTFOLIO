import React from 'react';
import './WorkLoop.css';

interface WorkLoopProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
}

export default function WorkLoop({ children, direction = 'left', speed = 'normal' }: WorkLoopProps) {
  const speedClass = {
    slow: '60s',
    normal: '40s',
    fast: '20s',
  }[speed];

  const animationStyle = {
    animationDuration: speedClass,
  };

  return (
    <div className="work-loop-container">
      <div 
        className={`work-loop-inner ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={animationStyle}
      >
        {children}
      </div>
      {/* Duplicate content for seamless loop */}
      <div 
        className={`work-loop-inner ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={animationStyle}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}