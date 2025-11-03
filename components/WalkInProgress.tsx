import React, { useState, useEffect } from 'react';
import { Walk } from '../types';

interface WalkInProgressProps {
  walk: Walk;
  onFinish: (distance: number, steps: number) => void;
}

const WalkInProgress: React.FC<WalkInProgressProps> = ({ walk, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(walk.duration);

  useEffect(() => {
    if (timeLeft === 0) {
      handleFinish();
    }
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const progress = (walk.duration - timeLeft) / walk.duration;
  const circumference = 2 * Math.PI * 120;
  
  const mockSteps = Math.floor(progress * 1800); // approx 120 steps/min for 15 min
  const mockDistance = (progress * 1.2).toFixed(2); // approx 1.2km for 15 min walk

  const handleFinish = () => {
    const finalDistance = parseFloat(( (walk.duration - Math.max(0, timeLeft)) / walk.duration * 1.2).toFixed(2));
    const finalSteps = Math.floor((walk.duration - Math.max(0, timeLeft)) / walk.duration * 1800);
    onFinish(finalDistance, finalSteps);
  }

  return (
    <div className="flex flex-col items-center justify-center text-center h-full pt-4">
      <h2 className="text-xl font-bold text-light-text mb-2">Walk in Progress</h2>
      <p className="text-medium-text mb-8">Clear your head, then ship the code.</p>
      
      <div className="relative w-72 h-72 flex items-center justify-center">
         <svg className="absolute w-full h-full transform -rotate-90">
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00A9B0" />
                    <stop offset="100%" stopColor="#3FB950" />
                </linearGradient>
            </defs>
            <circle cx="144" cy="144" r="130" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-dark-border" />
            <circle
                cx="144" cy="144" r="130"
                stroke="url(#progressGradient)" strokeWidth="8" fill="transparent"
                strokeDasharray={2 * Math.PI * 130}
                strokeDashoffset={(2 * Math.PI * 130) * (1 - progress)}
                className="transition-all duration-1000"
                strokeLinecap="round"
            />
        </svg>
        <div className="font-mono text-7xl font-bold text-white z-10">
            {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="flex justify-around w-full max-w-sm mt-12">
        <div className="text-center">
            <p className="text-medium-text text-xs uppercase tracking-widest">Distance</p>
            <p className="font-mono font-bold text-3xl text-light-text">{mockDistance}<span className="text-lg text-dark-text ml-1">km</span></p>
        </div>
        <div className="text-center">
            <p className="text-medium-text text-xs uppercase tracking-widest">Steps</p>
            <p className="font-mono font-bold text-3xl text-light-text">{mockSteps}</p>
        </div>
      </div>

      <button
        onClick={handleFinish}
        className="mt-12 bg-dark-card border border-dark-border hover:border-red-500/50 text-light-text font-bold py-3 px-8 rounded-xl transition-colors"
      >
        Finish Walk
      </button>
    </div>
  );
};

export default WalkInProgress;