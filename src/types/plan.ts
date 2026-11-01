export interface UserProfile {
  age: number;
  sex: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  current5KTime: string; // e.g. "34:00"
}

export interface DayProgress {
  checklist: boolean[]; // 12 items
  waterChecks: {
    onWaking: boolean;
    afterRun: boolean;
    morning: boolean;
    lunch: boolean;
    afternoon: boolean;
    training: boolean;
    evening: boolean;
  };
  notes: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}

export interface RunLogEntry {
  id: string;
  date: string;
  distanceKm: number;
  minutes: number;
  seconds: number;
  paceFormatted: string;
  isSub30: boolean;
  type: 'Easy' | 'Intervals' | 'Recovery' | 'Tempo' | 'Long Run' | '5K Test';
  notes: string;
}

export interface TechnicalJournalEntry {
  id: string;
  date: string;
  topic: string;
  built: string;
  solved: string;
  unsolved: string;
}

export interface ProspectEntry {
  id: string;
  name: string;
  platform: 'Instagram' | 'Email' | 'LinkedIn' | 'YouTube' | 'Other';
  service: 'Short-Form Video' | 'Website' | 'Both';
  contactedDate: string;
  status: 'Identified' | 'Contacted' | 'Sample Sent' | 'Paid Trial' | 'Completed';
  revenue: number;
  notes: string;
}

export interface WeeklyReview {
  weekNumber: number;
  dates: string;
  sleepHoursAvg: number;
  runningSessions: number;
  kickboxingSessions: number;
  gymSessions: number;
  proteinDaysMet: number;
  cyberHours: number;
  dsaHours: number;
  webHours: number;
  ctfSolved: number;
  outreachSent: number;
  notes: string;
}

export interface SourceCitation {
  id: string;
  category: 'Nutrition' | 'Fitness' | 'Cybersecurity' | 'Web & Tools' | 'Income Policy';
  title: string;
  authorOrOrg: string;
  summary: string;
  citationText: string;
  url: string;
  associatedGoals: string[];
}
