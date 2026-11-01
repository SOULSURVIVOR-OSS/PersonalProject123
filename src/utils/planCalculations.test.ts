import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getDayInfo,
  calculateCalorieTargets,
  calculatePace,
  calculate7DayWeightAverage,
  calculateWaterTotal,
  calculateOverallProgress,
  TOTAL_PLAN_DAYS
} from './planCalculations.ts';

test('getDayInfo returns correct details for Day 1 and Day 39', () => {
  const day1 = getDayInfo(1);
  assert.equal(day1.dayNumber, 1);
  assert.equal(day1.dateStr, '2026-11-28');
  assert.equal(day1.displayDate.includes('Nov 28'), true);
  assert.equal(day1.phaseId, 1);

  const day39 = getDayInfo(39);
  assert.equal(day39.dayNumber, 39);
  assert.equal(day39.dateStr, '2027-01-05');
  assert.equal(day39.displayDate.includes('Jan 5'), true);
  assert.equal(day39.phaseId, 6);
});

test('getDayInfo clamps out-of-range days', () => {
  const dayUnder = getDayInfo(0);
  assert.equal(dayUnder.dayNumber, 1);

  const dayOver = getDayInfo(100);
  assert.equal(dayOver.dayNumber, TOTAL_PLAN_DAYS);
});

test('calculateCalorieTargets computes Mifflin-St Jeor accurately', () => {
  // Age 20, male, 175cm, 70kg
  const result = calculateCalorieTargets(20, 'male', 175, 70);
  // bmr = 10*70 + 6.25*175 - 5*20 + 5 = 700 + 1093.75 - 100 + 5 = 1698.75 -> 1699
  assert.equal(result.bmr, 1699);
  assert.equal(result.maintenance > result.bmr, true);
  assert.equal(result.deficitTarget, 400);
  assert.equal(result.targetDailyCalories, result.maintenance - 400);
});

test('calculatePace computes 5K sub-30 pace correctly', () => {
  // 5km in 28 mins: 28/5 = 5.6 mins = 5 min 36 sec/km -> Sub-30 pace!
  const paceFast = calculatePace(28, 0, 5);
  assert.equal(paceFast.isSub30Pace, true);
  assert.equal(paceFast.paceMinutes, 5);
  assert.equal(paceFast.paceSeconds, 36);

  // 5km in 32 mins: 32/5 = 6.4 mins = 6 min 24 sec/km -> Not sub-30 pace
  const paceSlow = calculatePace(32, 0, 5);
  assert.equal(paceSlow.isSub30Pace, false);
  assert.equal(paceSlow.paceMinutes, 6);
  assert.equal(paceSlow.paceSeconds, 24);
});

test('calculate7DayWeightAverage computes valid rolling average', () => {
  const weights = [72.5, 72.3, 72.1, 71.9, 72.0, 71.8, 71.6];
  const avg = calculate7DayWeightAverage(weights);
  assert.equal(typeof avg, 'number');
  assert.equal(avg !== null && avg > 71.5 && avg < 72.5, true);

  const emptyAvg = calculate7DayWeightAverage([]);
  assert.equal(emptyAvg, null);
});

test('calculateWaterTotal aggregates planned distribution', () => {
  const fullWater = calculateWaterTotal({
    onWaking: true, // 500
    afterRun: true, // 500
    morning: true, // 750
    lunch: true, // 750
    afternoon: true, // 500
    training: true, // 500
    evening: true, // 500
  });
  assert.equal(fullWater, 4000);

  const partialWater = calculateWaterTotal({
    onWaking: true,
    afterRun: true,
    morning: false,
    lunch: false,
    afternoon: false,
    training: false,
    evening: false,
  });
  assert.equal(partialWater, 1000);
});

test('calculateOverallProgress balances habit, coding, and income metrics', () => {
  const dailyMap: Record<number, number> = {};
  for (let i = 1; i <= 39; i++) {
    dailyMap[i] = 12; // 100% daily
  }
  const fullProgress = calculateOverallProgress(dailyMap, 45, 20, 5000);
  assert.equal(fullProgress.overallPercentage, 100);
  assert.equal(fullProgress.dailyTrackingScore, 100);
  assert.equal(fullProgress.dsaScore, 100);
  assert.equal(fullProgress.revenueScore, 100);
});
