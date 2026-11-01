/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroOverview } from './components/HeroOverview';
import { DailyRoutineTracker } from './components/DailyRoutineTracker';
import { FitnessTracker } from './components/FitnessTracker';
import { CyberSecurityTracker } from './components/CyberSecurityTracker';
import { CodingDsaTracker } from './components/CodingDsaTracker';
import { IncomeHustleTracker } from './components/IncomeHustleTracker';
import { WeeklyScorecard } from './components/WeeklyScorecard';
import { SourcesAndRules } from './components/SourcesAndRules';
import {
  getDayInfo,
  calculateWaterTotal,
  calculateOverallProgress,
  calculatePace
} from './utils/planCalculations';
import {
  INITIAL_PROSPECTS,
  INITIAL_JOURNAL_ENTRIES
} from './utils/planData';
import {
  UserProfile,
  DayProgress,
  WeightEntry,
  RunLogEntry,
  TechnicalJournalEntry,
  ProspectEntry,
  WeeklyReview
} from './types/plan';

const STORAGE_KEY = 'execution_plan_39_days_v1';

export default function App() {
  // Theme state: defaults to dark restful
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('theme_preference');
      return savedTheme ? savedTheme === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    } catch {
      // ignore
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Navigation & Day State
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 20,
    sex: 'male',
    heightCm: 175,
    weightKg: 70,
    current5KTime: '34:00',
  });

  // Daily Progress Map (day 1..39)
  const [dailyProgressMap, setDailyProgressMap] = useState<Record<number, DayProgress>>(() => {
    const initialMap: Record<number, DayProgress> = {};
    for (let i = 1; i <= 39; i++) {
      initialMap[i] = {
        checklist: new Array(12).fill(false),
        waterChecks: {
          onWaking: false,
          afterRun: false,
          morning: false,
          lunch: false,
          afternoon: false,
          training: false,
          evening: false,
        },
        notes: '',
      };
    }
    // Seed day 1 with some progress
    initialMap[1].checklist[0] = true; // sleep
    initialMap[1].checklist[1] = true; // water
    initialMap[1].waterChecks.onWaking = true;
    initialMap[1].waterChecks.afterRun = true;
    initialMap[1].notes = 'Day 1 kick-off: OverTheWire Bandit lab set up, 5K easy run completed.';
    return initialMap;
  });

  // Weight Logs
  const [weightLogs, setWeightLogs] = useState<WeightEntry[]>([
    { id: 'w-1', date: '2026-11-28', weight: 70.4 },
    { id: 'w-2', date: '2026-11-29', weight: 70.1 },
    { id: 'w-3', date: '2026-11-30', weight: 69.8 },
  ]);

  // Run Logs
  const [runLogs, setRunLogs] = useState<RunLogEntry[]>([
    {
      id: 'r-1',
      date: '2026-11-28',
      distanceKm: 5.0,
      minutes: 29,
      seconds: 40,
      paceFormatted: '5:56/km',
      isSub30: true,
      type: 'Intervals',
      notes: 'Controlled 6x1 min fast intervals; form stayed upright.',
    },
    {
      id: 'r-2',
      date: '2026-11-29',
      distanceKm: 4.0,
      minutes: 26,
      seconds: 15,
      paceFormatted: '6:34/km',
      isSub30: false,
      type: 'Recovery',
      notes: 'Easy conversational recovery run.',
    },
  ]);

  // Technical Journal
  const [journalEntries, setJournalEntries] = useState<TechnicalJournalEntry[]>(INITIAL_JOURNAL_ENTRIES);

  // Side Hustle Prospects
  const [prospects, setProspects] = useState<ProspectEntry[]>(INITIAL_PROSPECTS);

  // Weekly Reviews (6 weeks)
  const [weeklyReviews, setWeeklyReviews] = useState<WeeklyReview[]>([
    {
      weekNumber: 1,
      dates: 'Nov 28 – Dec 4',
      sleepHoursAvg: 7.5,
      runningSessions: 5,
      kickboxingSessions: 2,
      gymSessions: 2,
      proteinDaysMet: 7,
      cyberHours: 13,
      dsaHours: 9,
      webHours: 9,
      ctfSolved: 4,
      outreachSent: 15,
      notes: 'Great routine established. Bandit levels 0-10 complete.',
    },
    {
      weekNumber: 2,
      dates: 'Dec 5 – Dec 11',
      sleepHoursAvg: 7.5,
      runningSessions: 5,
      kickboxingSessions: 2,
      gymSessions: 2,
      proteinDaysMet: 7,
      cyberHours: 14,
      dsaHours: 9,
      webHours: 9,
      ctfSolved: 4,
      outreachSent: 20,
      notes: 'Building Project 1 Python Recon scanner.',
    },
    {
      weekNumber: 3,
      dates: 'Dec 12 – Dec 18',
      sleepHoursAvg: 7.5,
      runningSessions: 5,
      kickboxingSessions: 2,
      gymSessions: 2,
      proteinDaysMet: 7,
      cyberHours: 14,
      dsaHours: 9,
      webHours: 9,
      ctfSolved: 4,
      outreachSent: 15,
      notes: 'PortSwigger web security labs & React app setup.',
    },
    {
      weekNumber: 4,
      dates: 'Dec 19 – Dec 25',
      sleepHoursAvg: 7.5,
      runningSessions: 5,
      kickboxingSessions: 2,
      gymSessions: 2,
      proteinDaysMet: 7,
      cyberHours: 13,
      dsaHours: 9,
      webHours: 9,
      ctfSolved: 4,
      outreachSent: 15,
      notes: 'picoCTF category challenges & tempo run pace holding.',
    },
    {
      weekNumber: 5,
      dates: 'Dec 26 – Jan 1',
      sleepHoursAvg: 7.5,
      runningSessions: 5,
      kickboxingSessions: 2,
      gymSessions: 2,
      proteinDaysMet: 7,
      cyberHours: 14,
      dsaHours: 9,
      webHours: 9,
      ctfSolved: 4,
      outreachSent: 15,
      notes: 'NetWatch deployment & live CTF participation.',
    },
    {
      weekNumber: 6,
      dates: 'Jan 2 – Jan 5',
      sleepHoursAvg: 8.0,
      runningSessions: 3,
      kickboxingSessions: 1,
      gymSessions: 1,
      proteinDaysMet: 4,
      cyberHours: 8,
      dsaHours: 6,
      webHours: 6,
      ctfSolved: 3,
      outreachSent: 10,
      notes: 'Final 5K timed assessment & GitHub portfolio write-ups.',
    },
  ]);

  // DSA Problem counts
  const [dsaCounts, setDsaCounts] = useState<Record<string, number>>({
    'Arrays & Strings': 4,
    'Searching & Sorting': 2,
    'Linked Lists': 2,
    'Stacks & Queues': 1,
    'Trees & BST': 1,
    'Graphs (BFS / DFS)': 0,
    'Revision & Timed Sets': 0,
  });

  // Checkbox maps
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    'cyber-p1-lab-0': true,
  });
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({
    'projA-d0': true,
    'web-m-0': true,
  });
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>({
    'skill-0': true,
    'skill-1': true,
  });
  const [completedFinalDeliverables, setCompletedFinalDeliverables] = useState<Record<string, boolean>>({
    'deliv-cyber-bandit': true,
  });
  const [completedRules, setCompletedRules] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    8: true,
    9: true,
    10: true,
  });

  // Notification Banner
  const [notification, setNotification] = useState<string | null>(null);

  // Load from LocalStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentDay) setCurrentDay(parsed.currentDay);
        if (parsed.dailyProgressMap) setDailyProgressMap(parsed.dailyProgressMap);
        if (parsed.userProfile) setUserProfile(parsed.userProfile);
        if (parsed.weightLogs) setWeightLogs(parsed.weightLogs);
        if (parsed.runLogs) setRunLogs(parsed.runLogs);
        if (parsed.journalEntries) setJournalEntries(parsed.journalEntries);
        if (parsed.prospects) setProspects(parsed.prospects);
        if (parsed.weeklyReviews) setWeeklyReviews(parsed.weeklyReviews);
        if (parsed.dsaCounts) setDsaCounts(parsed.dsaCounts);
        if (parsed.completedTasks) setCompletedTasks(parsed.completedTasks);
        if (parsed.completedMilestones) setCompletedMilestones(parsed.completedMilestones);
        if (parsed.completedSkills) setCompletedSkills(parsed.completedSkills);
        if (parsed.completedFinalDeliverables) setCompletedFinalDeliverables(parsed.completedFinalDeliverables);
        if (parsed.completedRules) setCompletedRules(parsed.completedRules);
      }
    } catch (e) {
      console.warn('Could not load saved plan state:', e);
    }
  }, []);

  // Save to LocalStorage whenever critical states change
  useEffect(() => {
    try {
      const stateToSave = {
        currentDay,
        dailyProgressMap,
        userProfile,
        weightLogs,
        runLogs,
        journalEntries,
        prospects,
        weeklyReviews,
        dsaCounts,
        completedTasks,
        completedMilestones,
        completedSkills,
        completedFinalDeliverables,
        completedRules,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save plan state:', e);
    }
  }, [
    currentDay,
    dailyProgressMap,
    userProfile,
    weightLogs,
    runLogs,
    journalEntries,
    prospects,
    weeklyReviews,
    dsaCounts,
    completedTasks,
    completedMilestones,
    completedSkills,
    completedFinalDeliverables,
    completedRules,
  ]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  // Day info & calculations
  const currentDayInfo = getDayInfo(currentDay);
  const activeDayProgress = dailyProgressMap[currentDay] || {
    checklist: new Array(12).fill(false),
    waterChecks: {
      onWaking: false,
      afterRun: false,
      morning: false,
      lunch: false,
      afternoon: false,
      training: false,
      evening: false,
    },
    notes: '',
  };

  const waterTotal = calculateWaterTotal(activeDayProgress.waterChecks);

  // Overall Score Calculations
  const dailyCompletionMap: Record<number, number> = {};
  for (let d = 1; d <= 39; d++) {
    dailyCompletionMap[d] = dailyProgressMap[d]?.checklist?.filter(Boolean).length || 0;
  }

  let totalDsaCount = 0;
  Object.values(dsaCounts).forEach((c) => {
    totalDsaCount += c;
  });

  const totalRevenue = prospects.reduce((acc, p) => acc + (p.revenue || 0), 0);
  const ctfSolvedCount = journalEntries.filter((j) => j.solved && j.solved.length > 0).length + 3;

  const {
    overallPercentage,
    dailyTrackingScore,
    dsaScore,
    ctfScore,
    revenueScore,
  } = calculateOverallProgress(dailyCompletionMap, totalDsaCount, ctfSolvedCount, totalRevenue);

  // Toggle Handlers
  const handleToggleChecklistItem = (index: number) => {
    setDailyProgressMap((prev) => {
      const current = prev[currentDay] || {
        checklist: new Array(12).fill(false),
        waterChecks: {
          onWaking: false,
          afterRun: false,
          morning: false,
          lunch: false,
          afternoon: false,
          training: false,
          evening: false,
        },
        notes: '',
      };
      const updatedChecklist = [...current.checklist];
      updatedChecklist[index] = !updatedChecklist[index];
      return {
        ...prev,
        [currentDay]: {
          ...current,
          checklist: updatedChecklist,
        },
      };
    });
  };

  const handleToggleWaterSlot = (slotKey: keyof DayProgress['waterChecks']) => {
    setDailyProgressMap((prev) => {
      const current = prev[currentDay] || {
        checklist: new Array(12).fill(false),
        waterChecks: {
          onWaking: false,
          afterRun: false,
          morning: false,
          lunch: false,
          afternoon: false,
          training: false,
          evening: false,
        },
        notes: '',
      };
      return {
        ...prev,
        [currentDay]: {
          ...current,
          waterChecks: {
            ...current.waterChecks,
            [slotKey]: !current.waterChecks[slotKey],
          },
        },
      };
    });
  };

  const handleUpdateNotes = (notes: string) => {
    setDailyProgressMap((prev) => {
      const current = prev[currentDay];
      return {
        ...prev,
        [currentDay]: {
          ...current,
          notes,
        },
      };
    });
  };

  const handleResetDay = () => {
    setDailyProgressMap((prev) => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        checklist: new Array(12).fill(false),
      },
    }));
    showToast(`Day ${currentDay} checklist reset.`);
  };

  const handleResetAllData = () => {
    if (window.confirm('Reset all tracked progress to the default starting plan?')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  // Run Logging
  const handleAddRunLog = (entry: Omit<RunLogEntry, 'id' | 'paceFormatted' | 'isSub30'>) => {
    const pace = calculatePace(entry.minutes, entry.seconds, entry.distanceKm);
    const newLog: RunLogEntry = {
      ...entry,
      id: `run-${Date.now()}`,
      paceFormatted: pace.paceFormatted,
      isSub30: pace.isSub30Pace,
    };
    setRunLogs((prev) => [newLog, ...prev]);
    showToast('Run logged successfully.');
  };

  const handleDeleteRunLog = (id: string) => {
    setRunLogs((prev) => prev.filter((r) => r.id !== id));
  };

  // Weight Logging
  const handleAddWeightLog = (weight: number, date: string) => {
    const newEntry: WeightEntry = {
      id: `wt-${Date.now()}`,
      date,
      weight,
    };
    setWeightLogs((prev) => [...prev, newEntry]);
    showToast(`Recorded weight: ${weight} kg`);
  };

  const handleDeleteWeightLog = (id: string) => {
    setWeightLogs((prev) => prev.filter((w) => w.id !== id));
  };

  // Technical Journal
  const handleAddJournalEntry = (entry: Omit<TechnicalJournalEntry, 'id'>) => {
    const newEntry: TechnicalJournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
    showToast('Knowledge base entry saved.');
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((j) => j.id !== id));
  };

  // Prospects Pipeline
  const handleAddProspect = (prospect: Omit<ProspectEntry, 'id'>) => {
    const newP: ProspectEntry = {
      ...prospect,
      id: `p-${Date.now()}`,
    };
    setProspects((prev) => [newP, ...prev]);
    showToast(`Added ${prospect.name} to outreach pipeline.`);
  };

  const handleDeleteProspect = (id: string) => {
    setProspects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateProspectStatus = (
    id: string,
    status: ProspectEntry['status'],
    revenue: number
  ) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, revenue } : p))
    );
    showToast('Prospect status updated.');
  };

  // Weekly Reviews update
  const handleUpdateWeeklyReview = (
    weekIndex: number,
    field: keyof WeeklyReview,
    value: any
  ) => {
    setWeeklyReviews((prev) => {
      const copy = [...prev];
      copy[weekIndex] = { ...copy[weekIndex], [field]: value };
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-[#141815] text-[#E5EBE6] flex flex-col selection:bg-[#2A392C] selection:text-[#E5EBE6]">
      {/* Top Navigation */}
      <Navbar
        currentDay={currentDay}
        onSelectDay={setCurrentDay}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        overallScore={overallPercentage}
        onResetProgress={handleResetAllData}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E2720] text-[#E5EBE6] text-xs px-4 py-2.5 shadow-xl border border-[#354738] animate-fade-in flex items-center gap-2">
          <span>{notification}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 pb-20">
        {activeTab === 'overview' && (
          <HeroOverview
            currentDayInfo={currentDayInfo}
            currentDay={currentDay}
            overallScore={overallPercentage}
            onNavigateTab={setActiveTab}
            dailyTrackingScore={dailyTrackingScore}
            dsaScore={dsaScore}
            ctfScore={ctfScore}
            revenueScore={revenueScore}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {activeTab === 'daily' && (
            <DailyRoutineTracker
              currentDay={currentDay}
              currentDayInfo={currentDayInfo}
              onSelectDay={setCurrentDay}
              dayProgress={activeDayProgress}
              onToggleChecklistItem={handleToggleChecklistItem}
              onToggleWaterSlot={handleToggleWaterSlot}
              onUpdateNotes={handleUpdateNotes}
              onResetDay={handleResetDay}
              waterTotal={waterTotal}
            />
          )}

          {activeTab === 'fitness' && (
            <FitnessTracker
              userProfile={userProfile}
              onUpdateProfile={setUserProfile}
              weightLogs={weightLogs}
              onAddWeightLog={handleAddWeightLog}
              onDeleteWeightLog={handleDeleteWeightLog}
              runLogs={runLogs}
              onAddRunLog={handleAddRunLog}
              onDeleteRunLog={handleDeleteRunLog}
            />
          )}

          {activeTab === 'cyber' && (
            <div className="space-y-12">
              <CyberSecurityTracker
                journalEntries={journalEntries}
                onAddJournalEntry={handleAddJournalEntry}
                onDeleteJournalEntry={handleDeleteJournalEntry}
                completedTasks={completedTasks}
                onToggleTask={(tId) =>
                  setCompletedTasks((prev) => ({ ...prev, [tId]: !prev[tId] }))
                }
              />
              <div className="pt-8 border-t border-[#2C362E]">
                <CodingDsaTracker
                  dsaCounts={dsaCounts}
                  onUpdateDsaCount={(topic, count) =>
                    setDsaCounts((prev) => ({ ...prev, [topic]: count }))
                  }
                  completedMilestones={completedMilestones}
                  onToggleMilestone={(mId) =>
                    setCompletedMilestones((prev) => ({ ...prev, [mId]: !prev[mId] }))
                  }
                />
              </div>
            </div>
          )}

          {activeTab === 'income' && (
            <IncomeHustleTracker
              prospects={prospects}
              onAddProspect={handleAddProspect}
              onDeleteProspect={handleDeleteProspect}
              onUpdateProspectStatus={handleUpdateProspectStatus}
              completedSkills={completedSkills}
              onToggleSkill={(sId) =>
                setCompletedSkills((prev) => ({ ...prev, [sId]: !prev[sId] }))
              }
            />
          )}

          {activeTab === 'scorecard' && (
            <WeeklyScorecard
              weeklyReviews={weeklyReviews}
              onUpdateWeeklyReview={handleUpdateWeeklyReview}
              completedFinalDeliverables={completedFinalDeliverables}
              onToggleFinalDeliverable={(dId) =>
                setCompletedFinalDeliverables((prev) => ({
                  ...prev,
                  [dId]: !prev[dId],
                }))
              }
            />
          )}

          {activeTab === 'sources' && (
            <SourcesAndRules
              completedRules={completedRules}
              onToggleRule={(rId) =>
                setCompletedRules((prev) => ({ ...prev, [rId]: !prev[rId] }))
              }
            />
          )}
        </div>
      </main>

      {/* Mindful Minimalist Dark Footer */}
      <footer className="border-t border-[#263128] bg-[#101411] py-8 text-xs text-[#9EABA0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-[#E5EBE6]">39-Day Execution Blueprint</span> · BTech CSE
            Cybersecurity + Networking · Sub-30 5K Fitness · Income
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cycle: Nov 28, 2026 – Jan 5, 2027</span>
            <span>·</span>
            <button
              onClick={() => setActiveTab('sources')}
              className="hover:text-[#8DA988] underline transition-colors"
            >
              Scientific Sources &amp; Operating Rules
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
