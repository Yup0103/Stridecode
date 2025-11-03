import React from 'react';
import Icon from './Icon';

interface WelcomeModalProps {
  onClose: () => void;
}

const FeatureItem: React.FC<{ icon: any, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-accent-cyan/10 p-2 rounded-lg mt-1">
      <Icon name={icon} className="w-6 h-6 text-accent-cyan" />
    </div>
    <div>
      <h3 className="font-semibold text-light-text">{title}</h3>
      <p className="text-sm text-medium-text">{description}</p>
    </div>
  </div>
);

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-dark-card border border-dark-border rounded-2xl max-w-md w-full p-8 shadow-2xl shadow-black/30 m-4">
        <div className="text-center">
            <Icon name="sparkles" className="w-10 h-10 text-accent-cyan mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-light-text">Welcome to StrideCode!</h2>
          <p className="text-medium-text mt-2 mb-8">Move your body. Ship better code.</p>
        </div>
        
        <div className="space-y-6 text-left">
          <FeatureItem 
            icon="walking"
            title="Sprint-Synced Walks"
            description="Auto-suggested 15-min Pomodoro walks during your natural breaks to boost focus."
          />
          <FeatureItem 
            icon="podcast"
            title="CodeFlow Audio"
            description="Listen to developer-centric audio, from lo-fi beats to summaries of tech papers."
          />
          <FeatureItem 
            icon="badge"
            title="Debug Badges"
            description="Earn gamified badges like 'Bug Squasher' and 'Refactor Pro' for your walking streaks."
          />
          <FeatureItem 
            icon="commit"
            title="Commit Your Strides"
            description="End every walk by generating a git-style commit message to share with your team."
          />
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-10 bg-accent-cyan hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-xl transition-colors text-base"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;