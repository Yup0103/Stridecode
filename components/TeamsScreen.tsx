import React from 'react';
import Icon from './Icon';

const mockTeam = [
  { name: 'Alice', distance: 25.8, isUser: false },
  { name: 'You', distance: 21.4, isUser: true },
  { name: 'Bob', distance: 19.1, isUser: false },
  { name: 'Charlie', distance: 15.5, isUser: false },
];

const TeamsScreen: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-light-text">Team Stride</h2>
        <p className="text-medium-text mt-1">Compete with your colleagues and keep each other motivated.</p>
      </div>

      <section className="bg-dark-card p-4 rounded-2xl border border-dark-border">
        <h3 className="text-lg font-semibold text-light-text mb-4">Weekly Leaderboard</h3>
        <ul className="space-y-3">
          {mockTeam.map((member, index) => (
            <li key={member.name} className={`flex items-center justify-between p-3 rounded-lg ${member.isUser ? 'bg-accent-cyan/10' : 'bg-dark-border/20'}`}>
              <div className="flex items-center space-x-3">
                <span className="font-mono text-medium-text text-lg w-6">{index + 1}</span>
                <span className={`font-semibold ${member.isUser ? 'text-accent-cyan' : 'text-light-text'}`}>{member.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                 {index === 0 && <Icon name="crown" className="w-5 h-5 text-yellow-400" />}
                <span className="font-mono font-bold text-light-text">{member.distance.toFixed(1)} km</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-dark-card p-5 rounded-2xl border border-dark-border">
        <h3 className="text-lg font-semibold text-light-text mb-2">Commit Streak Chains</h3>
        <p className="text-medium-text text-sm mb-4">
          Tag a teammate on your walk summary to "request a review." They have 24 hours to complete a walk and push back to keep the streak alive. Merging a 7-day chain unlocks rewards!
        </p>
        <button
          className="w-full bg-dark-border hover:bg-[#444] text-light-text font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <Icon name="team" className="w-5 h-5" />
          <span>Invite Teammates</span>
        </button>
      </section>
    </div>
  );
};

export default TeamsScreen;