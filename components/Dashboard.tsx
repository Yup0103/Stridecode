import React from 'react';
import { Stats, AudioMode } from '../types';
import { AUDIO_MODES } from '../constants';
import Icon from './Icon';
import FocusGraph from './FocusGraph';

interface DashboardProps {
  stats: Stats;
  onStartWalk: (duration: number) => void;
}

const StatItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
  <div className="text-center">
    <p className="text-sm text-medium-text">{label}</p>
    <p className="text-2xl font-bold font-mono text-light-text">
      {value}
      {unit && <span className="text-lg font-sans text-dark-text ml-1">{unit}</span>}
    </p>
  </div>
);

const AudioModeCard: React.FC<{ mode: AudioMode }> = ({ mode }) => (
    <button
        className="bg-dark-card p-4 rounded-xl border border-dark-border text-left w-full transition-all duration-200 hover:border-accent-cyan/50 hover:bg-dark-card/50 relative group"
    >
        <div className="flex items-center space-x-3">
            <div className="bg-dark-border/50 p-2 rounded-lg">
                <Icon name={mode.icon} className="w-5 h-5 text-medium-text group-hover:text-accent-cyan" />
            </div>
            <div>
                <h4 className="font-semibold text-light-text">{mode.name}</h4>
                <p className="text-xs text-medium-text">{mode.description}</p>
            </div>
        </div>
    </button>
)

const Dashboard: React.FC<DashboardProps> = ({ stats, onStartWalk }) => {
  return (
    <div className="space-y-8">
      <section className="bg-dark-card p-4 rounded-2xl border border-dark-border">
        <h2 className="text-sm font-semibold text-medium-text mb-4 px-2">Weekly Sprint</h2>
        <div className="grid grid-cols-3 gap-1">
          <StatItem label="Steps" value={stats.steps.toLocaleString()} />
          <StatItem label="Streak" value={`${stats.streak}`} unit="days" />
          <StatItem label="Distance" value={stats.kmThisWeek.toFixed(1)} unit="km" />
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-3 px-2">
            <h2 className="text-lg font-semibold text-light-text">Focus Graph</h2>
            <p className="text-xs font-mono text-accent-green">LIVE</p>
        </div>
        <FocusGraph />
      </section>
      
      <section>
         <div className="bg-dark-card p-4 rounded-2xl border border-dark-border space-y-3">
          <p className="text-medium-text text-center text-sm">A 15-min walk can boost focus by ~23%.</p>
          <button
            onClick={() => onStartWalk(15 * 60)}
            className="w-full bg-accent-green hover:bg-green-500 text-dark-bg font-bold py-3 px-4 rounded-xl transition-colors text-base"
          >
            Start Pomodoro Walk
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-light-text mb-3 px-2">CodeFlow Audio</h2>
        <div className="space-y-3">
            {AUDIO_MODES.map(mode => (
                <AudioModeCard key={mode.id} mode={mode} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;