import React from 'react';
import { View } from '../types';
import Icon, { IconName } from './Icon';

interface BottomNavProps {
  currentView: View;
  navigate: (view: View) => void;
  onStartWalk: () => void;
}

const NavItem: React.FC<{
    view: View,
    label: string,
    icon: IconName,
    currentView: View,
    navigate: (view: View) => void
}> = ({ view, label, icon, currentView, navigate }) => {
    const isActive = currentView === view;
    return (
        <button
            onClick={() => navigate(view)}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-accent-cyan' : 'text-medium-text hover:text-light-text'}`}
        >
            <Icon name={icon} className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium tracking-tight">{label}</span>
        </button>
    );
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, navigate, onStartWalk }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 p-2">
      <div className="container mx-auto h-20 max-w-lg bg-dark-card/70 backdrop-blur-xl border border-dark-border rounded-2xl flex items-center justify-around px-2 shadow-2xl shadow-black/30">
        <NavItem view={View.Dashboard} label="Home" icon="dashboard" currentView={currentView} navigate={navigate} />
        <NavItem view={View.Badges} label="Badges" icon="badge" currentView={currentView} navigate={navigate} />
        
        <div className="w-20 flex justify-center">
            <button
              onClick={onStartWalk}
              className="w-16 h-16 bg-accent-cyan rounded-full flex items-center justify-center text-white shadow-lg transform -translate-y-4 animate-pulse-glow"
              aria-label="Start Walk"
            >
              <Icon name="walking" className="w-8 h-8" />
            </button>
        </div>

        <NavItem view={View.Teams} label="Teams" icon="team" currentView={currentView} navigate={navigate} />
        <NavItem view={View.Commits} label="Commits" icon="commit" currentView={currentView} navigate={navigate} />
      </div>
    </footer>
  );
};

export default BottomNav;