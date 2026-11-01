import React, { useState } from 'react';
import {
  Activity,
  Dumbbell,
  Timer,
  Scale,
  Flame,
  Check,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import {
  RUNNING_PROGRESSION,
  UPPER_BODY_EXERCISES,
  FULL_BODY_EXERCISES
} from '../utils/planData';
import {
  calculateCalorieTargets,
  calculatePace,
  calculate7DayWeightAverage
} from '../utils/planCalculations';
import { UserProfile, WeightEntry, RunLogEntry } from '../types/plan';

interface FitnessTrackerProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  weightLogs: WeightEntry[];
  onAddWeightLog: (weight: number, date: string) => void;
  onDeleteWeightLog: (id: string) => void;
  runLogs: RunLogEntry[];
  onAddRunLog: (entry: Omit<RunLogEntry, 'id' | 'paceFormatted' | 'isSub30'>) => void;
  onDeleteRunLog: (id: string) => void;
}

export const FitnessTracker: React.FC<FitnessTrackerProps> = ({
  userProfile,
  onUpdateProfile,
  weightLogs,
  onAddWeightLog,
  onDeleteWeightLog,
  runLogs,
  onAddRunLog,
  onDeleteRunLog,
}) => {
  // Sub-tabs for fitness
  const [activeSubTab, setActiveSubTab] = useState<'running' | 'gym' | 'nutrition'>('running');

  // Calculator states
  const [calcMinutes, setCalcMinutes] = useState(29);
  const [calcSeconds, setCalcSeconds] = useState(30);
  const [calcDistance, setCalcDistance] = useState(5.0);

  // New run entry form
  const [newRunDate, setNewRunDate] = useState('2026-11-28');
  const [newRunDist, setNewRunDist] = useState(5.0);
  const [newRunMins, setNewRunMins] = useState(29);
  const [newRunSecs, setNewRunSecs] = useState(45);
  const [newRunType, setNewRunType] = useState<RunLogEntry['type']>('Intervals');
  const [newRunNotes, setNewRunNotes] = useState('');

  // New weight entry form
  const [newWeightVal, setNewWeightVal] = useState(72.0);
  const [newWeightDate, setNewWeightDate] = useState('2026-11-28');

  // Gym checked sets state: exercise index -> set number -> boolean
  const [upperBodySets, setUpperBodySets] = useState<Record<string, boolean>>({});
  const [fullBodySets, setFullBodySets] = useState<Record<string, boolean>>({});

  const toggleSet = (key: string, isUpper: boolean) => {
    if (isUpper) {
      setUpperBodySets((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setFullBodySets((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  // Calculations
  const paceResult = calculatePace(calcMinutes, calcSeconds, calcDistance);
  const calorieResult = calculateCalorieTargets(
    userProfile.age,
    userProfile.sex,
    userProfile.heightCm,
    userProfile.weightKg
  );
  const sevenDayAverage = calculate7DayWeightAverage(weightLogs.map((w) => w.weight));

  const handleAddRun = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRunLog({
      date: newRunDate,
      distanceKm: newRunDist,
      minutes: newRunMins,
      seconds: newRunSecs,
      type: newRunType,
      notes: newRunNotes,
    });
    setNewRunNotes('');
  };

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWeightVal > 0) {
      onAddWeightLog(newWeightVal, newWeightDate);
    }
  };

  return (
    <div className="space-y-10">
      {/* Fitness Header with Sub-tabs */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#263128]">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#C98F8A]" />
              <h2 className="text-xl font-semibold text-[#E5EBE6] tracking-tight">
                Physical Capability &amp; Sub-30 5K Protocol
              </h2>
            </div>
            <p className="text-xs text-[#9EABA0] mt-1">
              Coordinated programming: 5 runs/week, 2 kickboxing, 2 gym sessions, and 140g protein with a 300–500 kcal deficit.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1 bg-[#141815] p-1 border border-[#2A342C] self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab('running')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeSubTab === 'running'
                  ? 'bg-[#222923] text-[#E5EBE6] shadow-xs font-semibold'
                  : 'text-[#9EABA0] hover:text-[#E5EBE6]'
              }`}
            >
              5K Running (6:00/km)
            </button>
            <button
              onClick={() => setActiveSubTab('gym')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeSubTab === 'gym'
                  ? 'bg-[#222923] text-[#E5EBE6] shadow-xs font-semibold'
                  : 'text-[#9EABA0] hover:text-[#E5EBE6]'
              }`}
            >
              Gym Workouts
            </button>
            <button
              onClick={() => setActiveSubTab('nutrition')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeSubTab === 'nutrition'
                  ? 'bg-[#222923] text-[#E5EBE6] shadow-xs font-semibold'
                  : 'text-[#9EABA0] hover:text-[#E5EBE6]'
              }`}
            >
              140g Protein &amp; Calories
            </button>
          </div>
        </div>

        {/* Weekly Split Matrix */}
        <div className="mt-6">
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block mb-3">
            Weekly Coordinated Training Split (6 Active Days · 1 Rest Day)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
            {[
              { day: 'Monday', morning: 'Easy Run (25-35m)', evening: 'Upper Body Gym' },
              { day: 'Tuesday', morning: 'Interval Run', evening: 'Kickboxing' },
              { day: 'Wednesday', morning: 'Recovery Run (20-30m)', evening: 'Rest / Mobility' },
              { day: 'Thursday', morning: 'Rest from Running', evening: 'Kickboxing' },
              { day: 'Friday', morning: 'Tempo Run', evening: 'Full Body Aesthetic' },
              { day: 'Saturday', morning: 'Easy Long Run (35-45m)', evening: 'Light Mobility' },
              { day: 'Sunday', morning: 'Complete Rest', evening: 'Complete Rest' },
            ].map((col) => (
              <div
                key={col.day}
                className={`p-3 border ${
                  col.day === 'Sunday'
                    ? 'bg-[#261D1E] border-[#4A3335]'
                    : 'bg-[#171D18] border-[#2A342C]'
                }`}
              >
                <div className="font-semibold text-[#E5EBE6] pb-1.5 border-b border-[#242D26]">
                  {col.day}
                </div>
                <div className="mt-2 text-[11px]">
                  <span className="text-[#748277] block text-[10px] uppercase">Morning</span>
                  <span className="font-medium text-[#8DA988]">{col.morning}</span>
                </div>
                <div className="mt-2 text-[11px]">
                  <span className="text-[#748277] block text-[10px] uppercase">Evening</span>
                  <span className="font-medium text-[#E5EBE6]">{col.evening}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: 5K RUNNING */}
      {activeSubTab === 'running' && (
        <div className="space-y-8">
          {/* Target Pace Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1E2720] border border-[#354738] p-5">
              <span className="text-xs uppercase tracking-wider text-[#8DA988] font-semibold">
                Target 5K Pace
              </span>
              <div className="text-3xl font-semibold text-[#E5EBE6] tabular-nums mt-1">
                6:00 <span className="text-base font-normal text-[#9EABA0]">/ km</span>
              </div>
              <p className="text-xs text-[#9EABA0] mt-2 leading-relaxed">
                A sub-30 5K requires completing 5.0 kilometres in under 30 minutes (29:59 or faster).
              </p>
            </div>

            <div className="bg-[#1B211C] border border-[#2C362E] p-5 md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold">
                  Interactive Pace &amp; Sub-30 Calculator
                </span>
                <span
                  className={`text-xs px-2 py-0.5 font-semibold ${
                    paceResult.isSub30Pace
                      ? 'bg-[#1E2720] text-[#B4CCB0] border border-[#354738]'
                      : 'bg-[#261D1E] text-[#E5B2AE] border border-[#4A3335]'
                  }`}
                >
                  {paceResult.isSub30Pace ? 'Sub-30 Target Achieved!' : 'Above 30-Minute Pace'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Distance (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={calcDistance}
                    onChange={(e) => setCalcDistance(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Minutes</label>
                  <input
                    type="number"
                    value={calcMinutes}
                    onChange={(e) => setCalcMinutes(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Seconds</label>
                  <input
                    type="number"
                    value={calcSeconds}
                    onChange={(e) => setCalcSeconds(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  />
                </div>
              </div>

              <div className="text-xs text-[#9EABA0] flex items-center justify-between pt-2 border-t border-[#263128]">
                <span>
                  Resulting Pace:{' '}
                  <strong className="text-base text-[#E5EBE6] tabular-nums font-semibold">
                    {paceResult.paceFormatted}
                  </strong>
                </span>
                <span className="text-[11px] text-[#748277]">
                  Target benchmark: 6:00/km
                </span>
              </div>
            </div>
          </div>

          {/* 39-Day Progression Schedule */}
          <div className="bg-[#1B211C] border border-[#2C362E] p-6">
            <h3 className="text-base font-semibold text-[#E5EBE6] tracking-tight mb-1">
              39-Day Running Progression (6-Week Calendar)
            </h3>
            <p className="text-xs text-[#9EABA0] mb-5">
              Follow controlled fast intervals on Tuesdays and sustained comfortably hard tempo on Fridays. Warm up &amp; cool down 5–10 min.
            </p>

            <div className="border border-[#2C362E] divide-y divide-[#242D26]">
              <div className="grid grid-cols-1 md:grid-cols-4 bg-[#222923] p-3 text-xs font-semibold text-[#E5EBE6]">
                <div>Training Period</div>
                <div>Tuesday Intervals (Speed)</div>
                <div>Friday Tempo (Threshold)</div>
                <div>Saturday Long Run (Base)</div>
              </div>
              {RUNNING_PROGRESSION.map((prog, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-4 p-3 text-xs hover:bg-[#202821] transition-colors gap-2 md:gap-0"
                >
                  <div className="font-semibold text-[#8DA988]">{prog.period}</div>
                  <div className="text-[#E5EBE6]">{prog.tuesday}</div>
                  <div className="text-[#E5EBE6]">{prog.friday}</div>
                  <div className="text-[#9EABA0]">{prog.saturday}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Log a Run & History Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Run logging form */}
            <form onSubmit={handleAddRun} className="bg-[#1B211C] border border-[#2C362E] p-5 space-y-3">
              <h3 className="text-sm font-semibold text-[#E5EBE6] flex items-center gap-1.5 pb-2 border-b border-[#263128]">
                <Plus className="w-4 h-4 text-[#8DA988]" />
                <span>Log a Running Session</span>
              </h3>

              <div>
                <label className="text-[11px] text-[#9EABA0] block mb-1">Date</label>
                <input
                  type="date"
                  value={newRunDate}
                  onChange={(e) => setNewRunDate(e.target.value)}
                  className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Distance (km)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newRunDist}
                    onChange={(e) => setNewRunDist(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Session Type</label>
                  <select
                    value={newRunType}
                    onChange={(e) => setNewRunType(e.target.value as any)}
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  >
                    <option value="Easy">Easy (Conversational)</option>
                    <option value="Intervals">Tuesday Intervals</option>
                    <option value="Tempo">Friday Tempo</option>
                    <option value="Recovery">Easy Recovery</option>
                    <option value="Long Run">Saturday Long Run</option>
                    <option value="5K Test">5K Time Trial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Minutes</label>
                  <input
                    type="number"
                    value={newRunMins}
                    onChange={(e) => setNewRunMins(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Seconds</label>
                  <input
                    type="number"
                    value={newRunSecs}
                    onChange={(e) => setNewRunSecs(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#9EABA0] block mb-1">Notes / Heart Rate</label>
                <input
                  type="text"
                  placeholder="e.g. 5x400m intervals felt controlled, stayed relaxed"
                  value={newRunNotes}
                  onChange={(e) => setNewRunNotes(e.target.value)}
                  className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#8DA988] hover:bg-[#789373] text-[#121613] text-xs font-semibold tracking-wide transition-colors"
              >
                Save Run Session
              </button>
            </form>

            {/* Run History Table (2 cols span) */}
            <div className="lg:col-span-2 bg-[#1B211C] border border-[#2C362E] p-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#263128] mb-3">
                <h3 className="text-sm font-semibold text-[#E5EBE6]">
                  Recorded Running Logs ({runLogs.length})
                </h3>
                <span className="text-xs text-[#9EABA0]">Target Pace: &le; 6:00/km</span>
              </div>

              {runLogs.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#748277]">
                  No runs logged yet. Complete your morning run and record your pace here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#242D26] text-[#9EABA0]">
                        <th className="py-2 font-medium">Date</th>
                        <th className="py-2 font-medium">Type</th>
                        <th className="py-2 font-medium">Distance</th>
                        <th className="py-2 font-medium">Time</th>
                        <th className="py-2 font-medium">Pace</th>
                        <th className="py-2 font-medium">Sub-30?</th>
                        <th className="py-2 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#202821]">
                      {runLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#202821]">
                          <td className="py-2 text-[#E5EBE6] tabular-nums">{log.date}</td>
                          <td className="py-2 font-medium text-[#8DA988]">{log.type}</td>
                          <td className="py-2 tabular-nums">{log.distanceKm} km</td>
                          <td className="py-2 tabular-nums">
                            {log.minutes}:{String(log.seconds).padStart(2, '0')}
                          </td>
                          <td className="py-2 font-mono tabular-nums font-semibold text-[#E5EBE6]">
                            {log.paceFormatted}
                          </td>
                          <td className="py-2">
                            {log.isSub30 ? (
                              <span className="text-[11px] font-semibold text-[#B4CCB0] bg-[#1E2720] px-1.5 py-0.5 border border-[#354738]">
                                Yes (&le;6:00)
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#E5B2AE] bg-[#261D1E] px-1.5 py-0.5 border border-[#4A3335]">
                                Above
                              </span>
                            )}
                          </td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => onDeleteRunLog(log.id)}
                              className="text-[#9EABA0] hover:text-[#C98F8A] p-1"
                              aria-label="Delete run"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: GYM WORKOUTS */}
      {activeSubTab === 'gym' && (
        <div className="space-y-8">
          <div className="bg-[#1B211C] border border-[#2C362E] p-4 text-xs text-[#9EABA0] leading-relaxed">
            <strong>Progressive Overload Rule:</strong> Increase repetitions first within the prescribed rep range. Once you can hit the upper rep target with clean form on all sets, increase the weight in small increments. Do not compromise kickboxing or running recovery with excessive volume.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monday Upper Body */}
            <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#263128]">
                <div>
                  <h3 className="text-base font-semibold text-[#E5EBE6]">
                    Monday – Upper Body Aesthetic
                  </h3>
                  <p className="text-xs text-[#9EABA0]">
                    Shoulders, upper chest &amp; back width (V-Taper development)
                  </p>
                </div>
                <span className="text-xs font-medium text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2 py-0.5">
                  2–3 Quality Sessions
                </span>
              </div>

              <div className="space-y-3">
                {UPPER_BODY_EXERCISES.map((ex, idx) => (
                  <div key={idx} className="p-3 border border-[#2A342C] bg-[#171D18] hover:border-[#3E4F41] transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-xs font-semibold text-[#E5EBE6]">{ex.name}</div>
                        <div className="text-[11px] text-[#9EABA0]">{ex.focus}</div>
                      </div>
                      <span className="text-xs font-mono font-medium text-[#8DA988]">{ex.target}</span>
                    </div>

                    {/* Set checkpoints */}
                    <div className="flex items-center gap-2 pt-1 border-t border-[#242D26]">
                      <span className="text-[10px] uppercase text-[#748277]">Sets:</span>
                      {[1, 2, 3].map((setNum) => {
                        const setKey = `upper-${idx}-${setNum}`;
                        const isDone = upperBodySets[setKey] || false;
                        return (
                          <button
                            key={setNum}
                            onClick={() => toggleSet(setKey, true)}
                            className={`w-6 h-6 text-xs font-medium border flex items-center justify-center transition-colors ${
                              isDone
                                ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]'
                                : 'border-[#37453A] bg-[#1B211C] text-[#9EABA0] hover:border-[#8DA988]'
                            }`}
                            title={`Set ${setNum}`}
                          >
                            {isDone ? <Check className="w-3 h-3 stroke-[2.5]" /> : setNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Friday Full Body Aesthetic */}
            <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#263128]">
                <div>
                  <h3 className="text-base font-semibold text-[#E5EBE6]">
                    Friday – Full Body Aesthetic
                  </h3>
                  <p className="text-xs text-[#9EABA0]">
                    Athletic power, posture, posterior chain &amp; core
                  </p>
                </div>
                <span className="text-xs font-medium text-[#E5B2AE] bg-[#261D1E] border border-[#4A3335] px-2 py-0.5">
                  End of Week Anchor
                </span>
              </div>

              <div className="space-y-3">
                {FULL_BODY_EXERCISES.map((ex, idx) => (
                  <div key={idx} className="p-3 border border-[#2A342C] bg-[#171D18] hover:border-[#4A3739] transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-xs font-semibold text-[#E5EBE6]">{ex.name}</div>
                        <div className="text-[11px] text-[#9EABA0]">{ex.focus}</div>
                      </div>
                      <span className="text-xs font-mono font-medium text-[#C98F8A]">{ex.target}</span>
                    </div>

                    {/* Set checkpoints */}
                    <div className="flex items-center gap-2 pt-1 border-t border-[#242D26]">
                      <span className="text-[10px] uppercase text-[#748277]">Sets:</span>
                      {[1, 2, 3].map((setNum) => {
                        const setKey = `full-${idx}-${setNum}`;
                        const isDone = fullBodySets[setKey] || false;
                        return (
                          <button
                            key={setNum}
                            onClick={() => toggleSet(setKey, false)}
                            className={`w-6 h-6 text-xs font-medium border flex items-center justify-center transition-colors ${
                              isDone
                                ? 'bg-[#C98F8A] border-[#C98F8A] text-[#121613]'
                                : 'border-[#443536] bg-[#1B211C] text-[#9EABA0] hover:border-[#C98F8A]'
                            }`}
                            title={`Set ${setNum}`}
                          >
                            {isDone ? <Check className="w-3 h-3 stroke-[2.5]" /> : setNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 140G PROTEIN & NUTRITION PROTOCOL */}
      {activeSubTab === 'nutrition' && (
        <div className="space-y-8">
          {/* Calorie Tracking & Targets Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User profile inputs */}
            <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[#E5EBE6] pb-2 border-b border-[#263128]">
                Calorie &amp; Deficit Calculator
              </h3>
              <p className="text-xs text-[#9EABA0] leading-relaxed">
                Scientific Mifflin-St Jeor equation calibrated with your daily running and gym training.
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-[#9EABA0] block mb-1">Age (yrs)</label>
                    <input
                      type="number"
                      value={userProfile.age}
                      onChange={(e) =>
                        onUpdateProfile({ ...userProfile, age: Number(e.target.value) })
                      }
                      className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#9EABA0] block mb-1">Sex</label>
                    <select
                      value={userProfile.sex}
                      onChange={(e) =>
                        onUpdateProfile({ ...userProfile, sex: e.target.value as any })
                      }
                      className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-[#9EABA0] block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={userProfile.heightCm}
                      onChange={(e) =>
                        onUpdateProfile({ ...userProfile, heightCm: Number(e.target.value) })
                      }
                      className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#9EABA0] block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={userProfile.weightKg}
                      onChange={(e) =>
                        onUpdateProfile({ ...userProfile, weightKg: Number(e.target.value) })
                      }
                      className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#9EABA0] block mb-1">Current Comfortable 5K Time</label>
                  <input
                    type="text"
                    value={userProfile.current5KTime}
                    placeholder="e.g. 34:00"
                    onChange={(e) =>
                      onUpdateProfile({ ...userProfile, current5KTime: e.target.value })
                    }
                    className="w-full text-xs p-2 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  />
                </div>
              </div>
            </div>

            {/* Target Results Box */}
            <div className="bg-[#171D18] border border-[#2C362E] p-6 space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block">
                Calculated Metabolic Targets
              </span>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-[#242D26]">
                  <span className="text-xs text-[#9EABA0]">Basal Metabolic Rate (BMR)</span>
                  <span className="text-xs font-mono font-semibold text-[#E5EBE6] tabular-nums">
                    {calorieResult.bmr} kcal
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#242D26]">
                  <span className="text-xs text-[#9EABA0]">Maintenance (TDEE ~1.55x)</span>
                  <span className="text-xs font-mono font-semibold text-[#E5EBE6] tabular-nums">
                    {calorieResult.maintenance} kcal
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#242D26]">
                  <span className="text-xs text-[#C98F8A] font-medium">Recommended Deficit</span>
                  <span className="text-xs font-mono font-semibold text-[#C98F8A] tabular-nums">
                    -300 to -500 kcal
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 bg-[#222923] px-3 border border-[#2F3A31]">
                  <span className="text-xs font-semibold text-[#E5EBE6]">Daily Calorie Target</span>
                  <span className="text-sm font-bold text-[#8DA988] tabular-nums">
                    ~{calorieResult.targetDailyCalories} kcal/day
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#7A8A7D] leading-relaxed pt-2">
                <strong>Protocol:</strong> Do not aggressively cut calories while increasing running volume. Your recovery, muscle retention, and strength take priority.
              </p>
            </div>

            {/* 7-Day Moving Weight Average Log */}
            <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#263128]">
                <h3 className="text-sm font-semibold text-[#E5EBE6]">7-Day Weight Trend</h3>
                <span className="text-xs font-semibold text-[#8DA988] tabular-nums">
                  Avg: {sevenDayAverage !== null ? `${sevenDayAverage} kg` : 'Logging...'}
                </span>
              </div>

              <form onSubmit={handleAddWeight} className="flex gap-2">
                <input
                  type="date"
                  value={newWeightDate}
                  onChange={(e) => setNewWeightDate(e.target.value)}
                  className="w-1/2 text-xs p-1.5 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  value={newWeightVal}
                  onChange={(e) => setNewWeightVal(Number(e.target.value))}
                  placeholder="kg"
                  className="w-1/3 text-xs p-1.5 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6]"
                  required
                />
                <button
                  type="submit"
                  className="px-3 bg-[#8DA988] text-[#121613] text-xs font-semibold hover:bg-[#789373] transition-colors"
                >
                  Log
                </button>
              </form>

              <div className="max-h-36 overflow-y-auto space-y-1 divide-y divide-[#242D26] text-xs">
                {weightLogs.slice(-7).map((log) => (
                  <div key={log.id} className="pt-1 flex items-center justify-between text-[#9EABA0]">
                    <span>{log.date}</span>
                    <span className="font-semibold text-[#E5EBE6] tabular-nums">{log.weight} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Indian High-Protein Meal Plan (~140g) */}
          <div className="bg-[#1B211C] border border-[#2C362E] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263128] mb-5 gap-2">
              <div>
                <h3 className="text-base font-semibold text-[#E5EBE6]">
                  Sample High-Protein Indian Meal Plan (~140g Daily)
                </h3>
                <p className="text-xs text-[#9EABA0]">
                  Grounded in ISSN recommendations (1.4–2.0 g/kg/day) to sustain lean muscle mass during deficit.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2.5 py-1 self-start sm:self-auto">
                Total: ~135–140 g Protein
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-[#2A342C] bg-[#171D18]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#E5EBE6]">Breakfast (6:45 AM)</span>
                  <span className="text-xs font-mono font-bold text-[#8DA988]">~30 g</span>
                </div>
                <ul className="text-xs text-[#9EABA0] space-y-1">
                  <li>· 3 whole eggs (or egg whites combo)</li>
                  <li>· Rolled oats porridge with cinnamon</li>
                  <li>· Warm milk (200 ml)</li>
                </ul>
              </div>

              <div className="p-4 border border-[#2A342C] bg-[#171D18]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#E5EBE6]">Lunch (11:45 AM)</span>
                  <span className="text-xs font-mono font-bold text-[#8DA988]">~45 g</span>
                </div>
                <ul className="text-xs text-[#9EABA0] space-y-1">
                  <li>· 150 g cooked chicken breast / paneer</li>
                  <li>· Steamed basmati or brown rice</li>
                  <li>· Generous mixed seasonal vegetables</li>
                </ul>
              </div>

              <div className="p-4 border border-[#2A342C] bg-[#171D18]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#E5EBE6]">Pre-Workout Snack</span>
                  <span className="text-xs font-mono font-bold text-[#8DA988]">~25 g</span>
                </div>
                <ul className="text-xs text-[#9EABA0] space-y-1">
                  <li>· 1 scoop whey protein isolate</li>
                  <li>· 1 ripe banana for quick glycogen</li>
                  <li>· 300 ml water / almond milk</li>
                </ul>
              </div>

              <div className="p-4 border border-[#2A342C] bg-[#171D18]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#E5EBE6]">Dinner (7:00 PM)</span>
                  <span className="text-xs font-mono font-bold text-[#8DA988]">~35 g</span>
                </div>
                <ul className="text-xs text-[#9EABA0] space-y-1">
                  <li>· Fish curry or grilled chicken (120g)</li>
                  <li>· 2 whole-wheat rotis</li>
                  <li>· Cucumber, tomato &amp; greens salad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
