import React from 'react';
import { Badge } from '../types';
import Icon from './Icon';

interface BadgesScreenProps {
  allBadges: Badge[];
  earnedBadges: string[];
}

const BadgeCard: React.FC<{ badge: Badge, earned: boolean }> = ({ badge, earned }) => (
  <div className={`bg-dark-card p-4 rounded-xl border ${earned ? 'border-accent-cyan/50' : 'border-dark-border'} flex items-center space-x-4 transition-all duration-300 ${earned ? 'opacity-100' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}>
    <div className={`p-3 rounded-lg ${earned ? 'bg-accent-cyan/10' : 'bg-dark-border/50'}`}>
      <Icon name={badge.icon} className={`w-8 h-8 ${earned ? 'text-accent-cyan' : 'text-medium-text'}`} />
    </div>
    <div>
      <h3 className={`font-bold ${earned ? 'text-light-text' : 'text-medium-text'}`}>{badge.name}</h3>
      <p className="text-sm text-medium-text">{badge.description}</p>
    </div>
  </div>
);

const BadgesScreen: React.FC<BadgesScreenProps> = ({ allBadges, earnedBadges }) => {
  const earnedCount = earnedBadges.length;
  const totalCount = allBadges.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-light-text">Debug Badges</h2>
        <p className="text-medium-text mt-1">You've unlocked {earnedCount} of {totalCount} badges. Keep committing to your health!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allBadges.map(badge => (
          <BadgeCard key={badge.id} badge={badge} earned={earnedBadges.includes(badge.id)} />
        ))}
      </div>
    </div>
  );
};

export default BadgesScreen;