export enum View {
  Dashboard = 'DASHBOARD',
  Walking = 'WALKING',
  Summary = 'SUMMARY',
  Badges = 'BADGES',
  Teams = 'TEAMS',
  Commits = 'COMMITS',
}

export interface Walk {
  startTime: number;
  duration: number; // in seconds
}

export interface WalkSummaryData {
  duration: number;
  distance: number; // in km
  steps: number;
  commitMessage: string;
  date?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'bug' | 'gitBranch' | 'gitConflict' | 'flame' | 'rocket';
}

export interface Stats {
  steps: number;
  streak: number;
  kmThisWeek: number;
}

export interface AudioMode {
  id: string;
  name: string;
  description: string;
  icon: 'code' | 'podcast' | 'silent';
}