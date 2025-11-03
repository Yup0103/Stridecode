import React, { useState } from 'react';
import { WalkSummaryData } from '../types';
import Icon from './Icon';

interface CommitsScreenProps {
  history: WalkSummaryData[];
}

const CommitEntry: React.FC<{ item: WalkSummaryData }> = ({ item }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(item.commitMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <li className="relative pl-8 py-4 group">
            {/* Timeline decoration */}
            <div className="absolute left-0 top-0 h-full w-px bg-dark-border"></div>
            <div className="absolute left-[-5px] top-[26px] h-3 w-3 rounded-full bg-dark-border border-2 border-dark-bg group-first:bg-accent-cyan group-first:border-accent-cyan/30"></div>

            <div className="flex justify-between items-start">
                <div>
                    <p className="font-mono text-sm text-accent-green mb-1">{item.commitMessage}</p>
                    <p className="text-xs text-medium-text">
                        {item.date ? item.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs font-mono text-dark-text">
                        <span>{item.distance.toFixed(1)}km</span>
                        <span>{item.steps} steps</span>
                        <span>{Math.round(item.duration / 60)}min</span>
                    </div>
                </div>
                 <button
                    onClick={handleCopy}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-dark-card border border-dark-border p-2 rounded-lg text-medium-text hover:text-light-text hover:border-medium-text/50"
                    aria-label="Copy commit message"
                >
                    <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
                </button>
            </div>
        </li>
    )
}

const CommitsScreen: React.FC<CommitsScreenProps> = ({ history }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-light-text">Commit History</h2>
        <p className="text-medium-text mt-1">Your logbook of completed walks. Keep pushing new commits.</p>
      </div>

      {history.length > 0 ? (
          <ul className="border-l border-dark-border">
             {history.map((item, index) => (
                <CommitEntry key={`${item.commitMessage}-${index}`} item={item} />
             ))}
          </ul>
      ) : (
          <div className="text-center py-16 bg-dark-card border border-dark-border rounded-2xl">
              <Icon name="commit" className="w-12 h-12 text-dark-text mx-auto" />
              <h3 className="mt-4 text-lg font-semibold text-light-text">No Commits Yet</h3>
              <p className="mt-1 text-medium-text">Complete your first walk to start your logbook.</p>
          </div>
      )}
    </div>
  );
};

export default CommitsScreen;
