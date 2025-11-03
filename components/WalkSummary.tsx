import React, { useState } from 'react';
import { WalkSummaryData } from '../types';
import Icon from './Icon';

interface WalkSummaryProps {
  summary: WalkSummaryData;
  onDone: () => void;
}

const SummaryStat: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <div className="bg-dark-card p-4 rounded-xl border border-dark-border">
    <p className="text-sm text-medium-text">{label}</p>
    <p className="text-2xl font-bold font-mono text-light-text">{value}</p>
  </div>
);

const WalkSummary: React.FC<WalkSummaryProps> = ({ summary, onDone }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.commitMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
    alert("Sharing to Slack... (simulation)");
  }

  return (
    <div className="flex flex-col items-center text-center p-2">
      <h2 className="text-3xl font-bold text-light-text mb-2">Walk Complete</h2>
      <p className="text-medium-text mb-8">You've successfully debugged your body.</p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-10">
        <SummaryStat label="Duration" value={`${Math.floor(summary.duration / 60)} min`} />
        <SummaryStat label="Distance" value={`${summary.distance.toFixed(1)} km`} />
        <SummaryStat label="Steps" value={summary.steps.toLocaleString()} />
      </div>
      
      <div className="w-full max-w-md bg-dark-card rounded-2xl border border-dark-border p-5 text-left">
          <h3 className="font-semibold text-lg mb-3">Commit Your Strides</h3>
          <p className="text-medium-text text-sm mb-4">Share this 'Pull Request' with your team to keep the commit streak chain alive.</p>
          <div className="bg-[#0D1117] p-4 rounded-lg font-mono text-sm overflow-x-auto border border-dark-border">
             <span className="text-accent-green">{summary.commitMessage}</span>
          </div>
          <div className="flex space-x-3 mt-4">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-dark-border hover:bg-[#444] text-light-text font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Icon name={copied ? 'check' : 'copy'} className="w-5 h-5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
               <button 
                onClick={handleShare}
                className="flex-1 bg-accent-cyan hover:bg-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Icon name="share" className="w-5 h-5" />
                <span>Share</span>
              </button>
          </div>
      </div>

      <button
        onClick={onDone}
        className="mt-10 bg-dark-card border border-dark-border hover:border-medium-text/50 text-light-text font-bold py-3 px-8 rounded-xl transition-colors"
      >
        View Commits
      </button>
    </div>
  );
};

export default WalkSummary;