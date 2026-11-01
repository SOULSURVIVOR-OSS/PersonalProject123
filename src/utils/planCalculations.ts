/**
 * Pure calculation utilities for the 39-Day Execution Plan.
 * Decoupled from UI for testing and reliability.
 */

export interface DailyMetrics {
  sleepHours: number; // target: 7-8
  waterMl: number; // target: ~4000 ml
  proteinGrams: number; // target: 140g
  calorieDeficit: number; // target: 300-500 kcal
  checklistCompletedCount: number; // 0 to 12
}

export interface DayInfo {
  dayNumber: number; // 1 to 39
  dateStr: string; // e.g. "2026-11-28"
  displayDate: string; // e.g. "Sat, Nov 28"
  phase: string;
  phaseId: number;
  isRestDay: boolean;
}

export const PLAN_START_DATE = '2026-11-28';
export const PLAN_END_DATE = '2027-01-05';
export const TOTAL_PLAN_DAYS = 39;

/**
 * Returns formatted Day info for any day 1..39.
 */
export function getDayInfo(dayNumber: number): DayInfo {
  const clampedDay = Math.max(1, Math.min(TOTAL_PLAN_DAYS, dayNumber));
  const startDate = new Date(2026, 10, 28); // Month is 0-indexed (10 = Nov)
  const targetDate = new Date(startDate);
  targetDate.setDate(startDate.getDate() + (clampedDay - 1));

  const dayOfWeek = targetDate.getDay(); // 0 is Sunday
  const isRestDay = dayOfWeek === 0;

  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
  const dd = String(targetDate.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const displayDate = `${days[dayOfWeek]}, ${months[targetDate.getMonth()]} ${targetDate.getDate()}`;

  // Map to 6 phases from document
  let phase = 'Phase 1: Linux & Networking Foundations';
  let phaseId = 1;
  if (clampedDay <= 7) {
    phase = 'Phase 1: Linux & Networking Foundations';
    phaseId = 1;
  } else if (clampedDay <= 14) {
    phase = 'Phase 2: Networking Tools & Recon Project';
    phaseId = 2;
  } else if (clampedDay <= 21) {
    phase = 'Phase 3: Web Security & CTF Fundamentals';
    phaseId = 3;
  } else if (clampedDay <= 28) {
    phase = 'Phase 4: CTF Specialisation';
    phaseId = 4;
  } else if (clampedDay <= 35) {
    phase = 'Phase 5: CTF Competition Week';
    phaseId = 5;
  } else {
    phase = 'Phase 6: Final Technical Assessment';
    phaseId = 6;
  }

  return {
    dayNumber: clampedDay,
    dateStr,
    displayDate,
    phase,
    phaseId,
    isRestDay,
  };
}

/**
 * Calculates BMR and maintenance calories using Mifflin-St Jeor equation.
 */
export function calculateCalorieTargets(
  age: number,
  sex: 'male' | 'female',
  heightCm: number,
  weightKg: number,
  activityMultiplier: number = 1.55 // moderate-high activity due to daily running + gym/boxing
): { bmr: number; maintenance: number; deficitTarget: number; targetDailyCalories: number } {
  // Mifflin-St Jeor formula
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (sex === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const maintenance = Math.round(bmr * activityMultiplier);
  const deficitTarget = 400; // mid of 300-500 kcal deficit
  const targetDailyCalories = Math.max(1400, maintenance - deficitTarget);

  return {
    bmr: Math.round(bmr),
    maintenance,
    deficitTarget,
    targetDailyCalories,
  };
}

/**
 * Calculates running pace in min:sec / km from total minutes and distance in km.
 */
export function calculatePace(minutes: number, seconds: number, distanceKm: number): {
  paceMinutes: number;
  paceSeconds: number;
  paceFormatted: string;
  isSub30Pace: boolean;
} {
  if (distanceKm <= 0) {
    return { paceMinutes: 0, paceSeconds: 0, paceFormatted: '0:00/km', isSub30Pace: false };
  }
  const totalSeconds = minutes * 60 + seconds;
  const paceSecondsTotal = totalSeconds / distanceKm;
  const paceMinutes = Math.floor(paceSecondsTotal / 60);
  const paceSeconds = Math.round(paceSecondsTotal % 60);

  const formattedSec = String(paceSeconds).padStart(2, '0');
  const paceFormatted = `${paceMinutes}:${formattedSec}/km`;

  // Sub-30 5k pace is <= 6:00/km (360 seconds/km)
  const isSub30Pace = paceSecondsTotal <= 360;

  return {
    paceMinutes,
    paceSeconds,
    paceFormatted,
    isSub30Pace,
  };
}

/**
 * Calculates 7-day moving average weight.
 */
export function calculate7DayWeightAverage(weights: number[]): number | null {
  const validWeights = weights.filter((w) => w > 0);
  if (validWeights.length === 0) return null;
  const recent7 = validWeights.slice(-7);
  const sum = recent7.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / recent7.length).toFixed(2));
}

/**
 * Calculates water total from schedule milestones.
 */
export function calculateWaterTotal(checks: {
  onWaking: boolean; // 500
  afterRun: boolean; // 500
  morning: boolean; // 750
  lunch: boolean; // 750
  afternoon: boolean; // 500
  training: boolean; // 500
  evening: boolean; // 500
}): number {
  let total = 0;
  if (checks.onWaking) total += 500;
  if (checks.afterRun) total += 500;
  if (checks.morning) total += 750;
  if (checks.lunch) total += 750;
  if (checks.afternoon) total += 500;
  if (checks.training) total += 500;
  if (checks.evening) total += 500;
  return total;
}

/**
 * Computes overall completion percentage of the 39-Day plan.
 */
export function calculateOverallProgress(
  dailyCompletionMap: Record<number, number>, // dayNumber -> completed count out of 12
  dsaSolvedCount: number, // target: 45
  ctfSolvedCount: number, // target: 20
  revenueGenerated: number // target: 5000
): {
  overallPercentage: number;
  dailyTrackingScore: number;
  dsaScore: number;
  ctfScore: number;
  revenueScore: number;
} {
  let totalDailyCompleted = 0;
  const totalDailyPossible = TOTAL_PLAN_DAYS * 12;

  for (let d = 1; d <= TOTAL_PLAN_DAYS; d++) {
    totalDailyCompleted += dailyCompletionMap[d] || 0;
  }

  const dailyTrackingScore = Math.min(100, Math.round((totalDailyCompleted / totalDailyPossible) * 100));
  const dsaScore = Math.min(100, Math.round((dsaSolvedCount / 45) * 100));
  const ctfScore = Math.min(100, Math.round((ctfSolvedCount / 20) * 100));
  const revenueScore = Math.min(100, Math.round((revenueGenerated / 5000) * 100));

  // Weighted score: 50% daily execution habit, 20% DSA, 15% CTF, 15% revenue/milestone
  const overallPercentage = Math.round(
    dailyTrackingScore * 0.5 + dsaScore * 0.2 + ctfScore * 0.15 + revenueScore * 0.15
  );

  return {
    overallPercentage,
    dailyTrackingScore,
    dsaScore,
    ctfScore,
    revenueScore,
  };
}
