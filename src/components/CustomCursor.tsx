
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const mouseMoveEvent = (e: MouseEvent) => {
    if (dotRef.current && outlineRef.current) {
      dotRef.current.style.top = `${e.clientY}px`;
      dotRef.current.style.left = `${e.clientX}px`;
      
      // Slight delay for outline cursor for smooth effect
      outlineRef.current.style.top = `${e.clientY}px`;
      outlineRef.current.style.left = `${e.clientX}px`;
    }
  };
  
  const mouseDownEvent = () => {
    if (dotRef.current && outlineRef.current) {
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
  };
  
  const mouseUpEvent = () => {
    if (dotRef.current && outlineRef.current) {
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };
  
  const mouseEnterLinkEvent = () => {
    if (dotRef.current && outlineRef.current) {
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
      outlineRef.current.style.borderColor = '#7f56fd';
      outlineRef.current.style.backgroundColor = 'rgba(127, 86, 253, 0.1)';
    }
  };
  
  const mouseLeaveLinkEvent = () => {
    if (dotRef.current && outlineRef.current) {
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      outlineRef.current.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      outlineRef.current.style.backgroundColor = 'transparent';
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveEvent);
    document.addEventListener('mousedown', mouseDownEvent);
    document.addEventListener('mouseup', mouseUpEvent);
    
    // Add event listeners to clickable elements
    const links = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', mouseEnterLinkEvent);
      link.addEventListener('mouseleave', mouseLeaveLinkEvent);
    });
    
    // Handle cursor becoming hidden when leaving window
    document.addEventListener('mouseleave', () => {
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.opacity = '0';
        outlineRef.current.style.opacity = '0';
      }
    });
    
    document.addEventListener('mouseenter', () => {
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.opacity = '1';
        outlineRef.current.style.opacity = '1';
      }
    });
    
    return () => {
      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mousedown', mouseDownEvent);
      document.removeEventListener('mouseup', mouseUpEvent);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', mouseEnterLinkEvent);
        link.removeEventListener('mouseleave', mouseLeaveLinkEvent);
      });
      
      document.removeEventListener('mouseleave', () => {});
      document.removeEventListener('mouseenter', () => {});
    };
  }, []);
  
  return (
    <>
      <div ref={dotRef} className="cursor-dot bg-white hidden md:block" style={{ opacity: 0 }}></div>
      <div ref={outlineRef} className="cursor-outline hidden md:block" style={{ opacity: 0 }}></div>
    </>
  );
};

export default CustomCursor;
