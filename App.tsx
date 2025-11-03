import React, { useState, useCallback, useEffect } from 'react';
import { View, Walk, WalkSummaryData } from './types';
import { ALL_BADGES } from './constants';
import Dashboard from './components/Dashboard';
import WalkInProgress from './components/WalkInProgress';
import WalkSummary from './components/WalkSummary';
import BadgesScreen from './components/BadgesScreen';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import TeamsScreen from './components/TeamsScreen';
import CommitsScreen from './components/CommitsScreen';
import WelcomeModal from './components/WelcomeModal';

// Mock initial history
const initialHistory: WalkSummaryData[] = [
  {
    duration: 900,
    distance: 1.2,
    steps: 1805,
    commitMessage: 'feat(stride): +1.2km pre-refactor brain dump',
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    duration: 1200,
    distance: 1.8,
    steps: 2410,
    commitMessage: 'fix(stride): +1.8km walked off a nasty bug',
    date: new Date(Date.now() - 86400000), // yesterday
  },
];


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [activeWalk, setActiveWalk] = useState<Walk | null>(null);
  const [lastWalkSummary, setLastWalkSummary] = useState<WalkSummaryData | null>(null);
  const [walkHistory, setWalkHistory] = useState<WalkSummaryData[]>(initialHistory);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('stridecode_has_seen_welcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    localStorage.setItem('stridecode_has_seen_welcome', 'true');
    setShowWelcome(false);
  };

  // Mock user stats
  const [stats, setStats] = useState({
    steps: 6543,
    streak: 7,
    kmThisWeek: 21.4,
  });

  const [earnedBadges, setEarnedBadges] = useState<string[]>(['FIXED', 'REFACTOR']);

  const startWalk = useCallback((duration: number) => {
    const walk: Walk = {
      startTime: Date.now(),
      duration,
    };
    setActiveWalk(walk);
    setCurrentView(View.Walking);
  }, []);

  const finishWalk = useCallback((distance: number, steps: number) => {
    if (activeWalk) {
      const summary: WalkSummaryData = {
        duration: activeWalk.duration,
        distance,
        steps,
        commitMessage: `feat(stride): +${distance.toFixed(1)}km post-deploy decompression`,
        date: new Date(),
      };
      setLastWalkSummary(summary);
      
      // Update history
      setWalkHistory(prevHistory => [summary, ...prevHistory]);

      // Update stats
      setStats(prevStats => ({
        ...prevStats,
        steps: prevStats.steps + steps,
        kmThisWeek: prevStats.kmThisWeek + distance,
      }));

      // Award a new badge conditionally
      if (!earnedBadges.includes('MERGE_CONFLICT')) {
        setEarnedBadges(prev => [...prev, 'MERGE_CONFLICT']);
      }
      
      setActiveWalk(null);
      setCurrentView(View.Summary);
    }
  }, [activeWalk, earnedBadges]);

  const navigate = (view: View) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    const key = currentView; // Use view as key to force re-mount and trigger animations
    return (
      <div key={key} className="animate-fade-in">
        {
          {
            [View.Dashboard]: <Dashboard stats={stats} onStartWalk={startWalk} />,
            [View.Walking]: activeWalk && <WalkInProgress walk={activeWalk} onFinish={finishWalk} />,
            [View.Summary]: lastWalkSummary && <WalkSummary summary={lastWalkSummary} onDone={() => navigate(View.Commits)} />,
            [View.Badges]: <BadgesScreen allBadges={ALL_BADGES} earnedBadges={earnedBadges} />,
            [View.Teams]: <TeamsScreen />,
            [View.Commits]: <CommitsScreen history={walkHistory} />,
          }[currentView]
        }
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 pb-28">
        {renderContent()}
      </main>
      <BottomNav currentView={currentView} navigate={navigate} onStartWalk={() => startWalk(15 * 60)} />
    </div>
  );
};

export default App;