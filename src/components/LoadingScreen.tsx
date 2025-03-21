
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 600);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-elite-bg-darker transition-opacity duration-600",
        fadeOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative w-40 h-40 mb-4">
        {/* Logo Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-gradient animate-glow">ESC</div>
        </div>
        
        {/* Progress Ring */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-elite-surface"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="progress-ring-circle"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="url(#gradient)"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7f56fd" />
              <stop offset="100%" stopColor="#3a8af3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <p className="text-elite-text/70 font-medium animate-pulse-subtle">
        Loading elite site design...
      </p>
      
      <div className="absolute bottom-8 flex flex-col items-center">
        <p className="text-sm text-elite-text/50 mb-1">ELITE SITE CREATION</p>
        <div className="w-16 h-0.5 bg-elite-gradient rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
