
import { Badge, AudioMode } from './types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'FIXED',
    name: 'Bug Squasher',
    description: 'Walked 10,000 steps after fixing a critical bug.',
    icon: 'bug',
  },
  {
    id: 'REFACTOR',
    name: 'Refactor Pro',
    description: 'Completed a 7-day walking streak.',
    icon: 'gitBranch',
  },
  {
    id: 'MERGE_CONFLICT',
    name: 'Merge Conflict',
    description: 'Walked off a rage-quit moment.',
    icon: 'gitConflict',
  },
  {
    id: 'DEPLOY_MASTER',
    name: 'Deploy Master',
    description: 'Walked for 30 minutes before a major deployment.',
    icon: 'rocket'
  },
  {
    id: 'STREAK_FIRE',
    name: 'Streak Fire',
    description: 'Maintained a 30-day walking streak.',
    icon: 'flame'
  },
];


export const AUDIO_MODES: AudioMode[] = [
    {
        id: 'lofi',
        name: 'CodeFlow Lofi',
        description: 'Lofi beats + terminal rain sounds to keep you focused.',
        icon: 'code'
    },
    {
        id: 'techtalk',
        name: 'Tech Micro-doses',
        description: '3-min summaries of tech papers from arXiv.',
        icon: 'podcast',
    },
    {
        id: 'silent',
        name: 'Haptic Metronome',
        description: 'Silent mode with a metronome synced to your WPM.',
        icon: 'silent',
    }
];