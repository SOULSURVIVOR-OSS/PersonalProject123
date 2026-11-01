import React from 'react';
import {
  Check,
  Droplets,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { DayInfo } from '../utils/planCalculations';
import { DAILY_CHECKLIST_ITEMS, DAILY_TIMETABLE, WATER_SLOTS } from '../utils/planData';
import { DayProgress } from '../types/plan';

interface DailyRoutineTrackerProps {
  currentDay: number;
  currentDayInfo: DayInfo;
  onSelectDay: (day: number) => void;
  dayProgress: DayProgress;
  onToggleChecklistItem: (index: number) => void;
  onToggleWaterSlot: (slotKey: keyof DayProgress['waterChecks']) => void;
  onUpdateNotes: (notes: string) => void;
  onResetDay: () => void;
  waterTotal: number;
}

export const DailyRoutineTracker: React.FC<DailyRoutineTrackerProps> = ({
  currentDay,
  currentDayInfo,
  onSelectDay,
  dayProgress,
  onToggleChecklistItem,
  onToggleWaterSlot,
  onUpdateNotes,
  onResetDay,
  waterTotal,
}) => {
  const completedCount = dayProgress.checklist.filter(Boolean).length;
  const completionPercent = Math.round((completedCount / 12) * 100);

  return (
    <div className="space-y-10">
      {/* Day Navigation Bar */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className="p-1.5 border border-[#2F3A31] hover:bg-[#222923] disabled:opacity-30 disabled:cursor-not-allowed text-[#9EABA0] transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-[#E5EBE6]">Day {currentDay}</span>
              <span className="text-sm text-[#9EABA0]">({currentDayInfo.displayDate})</span>
              {currentDayInfo.isRestDay && (
                <span className="text-[11px] font-medium text-[#E5B2AE] bg-[#2B1F20] px-2 py-0.5 border border-[#483335]">
                  Scheduled Rest &amp; Recovery
                </span>
              )}
            </div>
            <div className="text-xs text-[#8DA988] font-medium mt-0.5">
              {currentDayInfo.phase}
            </div>
          </div>

          <button
            onClick={() => onSelectDay(Math.min(39, currentDay + 1))}
            disabled={currentDay === 39}
            className="p-1.5 border border-[#2F3A31] hover:bg-[#222923] disabled:opacity-30 disabled:cursor-not-allowed text-[#9EABA0] transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Jump Grid for 39 Days */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full sm:max-w-md pb-1 sm:pb-0">
          {Array.from({ length: 39 }, (_, i) => i + 1).map((d) => (
            <button
              key={d}
              onClick={() => onSelectDay(d)}
              className={`w-7 h-7 text-xs font-medium tabular-nums transition-all ${
                d === currentDay
                  ? 'bg-[#8DA988] text-[#121613] font-bold'
                  : 'bg-[#222923] hover:bg-[#2C362E] text-[#9EABA0]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Daily Checklist & Safe Water Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 12-Item Checklist (2 cols span) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1B211C] border border-[#2C362E] p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#263128] mb-5">
              <div>
                <h3 className="text-lg font-semibold text-[#E5EBE6] tracking-tight">
                  Daily Execution Checklist
                </h3>
                <p className="text-xs text-[#9EABA0] mt-0.5">
                  12 non-negotiable operational checkpoints for Day {currentDay}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#8DA988] tabular-nums">
                  {completedCount} / 12 completed ({completionPercent}%)
                </span>
                <button
                  onClick={onResetDay}
                  className="text-[11px] text-[#7A8A7D] hover:text-[#C98F8A] underline transition-colors"
                >
                  Reset Checklist
                </button>
              </div>
            </div>

            {/* Checklist progress bar */}
            <div className="w-full bg-[#222923] h-1.5 mb-6">
              <div
                className="bg-[#8DA988] h-full transition-all duration-300 ease-out"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            {/* 12 Checklist Square Task Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DAILY_CHECKLIST_ITEMS.map((item, index) => {
                const isChecked = dayProgress.checklist[index] || false;
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggleChecklistItem(index)}
                    className={`flex items-start gap-3 p-3 text-left border transition-all duration-180 ${
                      isChecked
                        ? 'bg-[#1E2720] border-[#384A3B] text-[#E5EBE6]'
                        : 'bg-[#171D18] border-[#2A342C] hover:border-[#4B5E4F] text-[#9EABA0]'
                    }`}
                  >
                    {/* Square Checkbox (No circular vibe-coded pill) */}
                    <div
                      className={`w-5 h-5 shrink-0 border flex items-center justify-center transition-colors mt-0.5 ${
                        isChecked
                          ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]'
                          : 'border-[#445447] bg-[#1B211C]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`text-xs font-medium leading-snug ${
                          isChecked ? 'line-through text-[#7A8A7D]' : 'text-[#E5EBE6]'
                        }`}
                      >
                        {item.label}
                      </div>
                      <span className="text-[10px] text-[#748277] uppercase tracking-wider block mt-0.5">
                        {item.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Rest Day Protocol Advisory */}
            <div className="mt-5 p-3.5 bg-[#171D18] border border-[#2C362E] flex items-start gap-2.5 text-xs text-[#9EABA0]">
              <AlertCircle className="w-4 h-4 text-[#8DA988] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Mindful Rule:</strong> On rest days (Sundays), mark the scheduled recovery activity as completed. Do not count a scheduled rest day as a missed workout.
              </p>
            </div>
          </div>

          {/* Daily Reflection & Tomorrow Planning Note */}
          <div className="bg-[#1B211C] border border-[#2C362E] p-6">
            <h3 className="text-sm font-semibold text-[#E5EBE6] mb-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8DA988]" />
              <span>Evening Review &amp; Tomorrow&rsquo;s Plan (9:00–9:30 PM)</span>
            </h3>
            <p className="text-xs text-[#9EABA0] mb-3">
              Record key wins, blockers encountered, and specify your 3 core focuses for tomorrow morning.
            </p>
            <textarea
              value={dayProgress.notes}
              onChange={(e) => onUpdateNotes(e.target.value)}
              placeholder="What did you learn today? What couldn't you solve yet? What are your top priorities for tomorrow morning?"
              rows={4}
              className="w-full text-xs p-3 border border-[#2C362E] focus:border-[#8DA988] focus:outline-none bg-[#171D18] text-[#E5EBE6] leading-relaxed resize-y"
            />
          </div>
        </div>

        {/* Right Column: Safe Water Distribution Tracker (~4L Target) */}
        <div className="space-y-6">
          <div className="bg-[#1B211C] border border-[#2C362E] p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#263128] mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#8DA988]" />
                <h3 className="text-sm font-semibold text-[#E5EBE6]">
                  Water Intake Distribution
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#8DA988] tabular-nums">
                {waterTotal} / 4,000 ml
              </span>
            </div>

            <p className="text-xs text-[#9EABA0] leading-relaxed mb-4">
              Distribute water evenly across the day. Adjust for thirst, heat, and sweat; do not force water rapidly. 4 Litres is an assessment target.
            </p>

            {/* Water progress bar */}
            <div className="w-full bg-[#222923] h-1.5 mb-5">
              <div
                className="bg-[#8DA988] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (waterTotal / 4000) * 100)}%` }}
              />
            </div>

            {/* Minimalist Square Checkpoints */}
            <div className="space-y-2.5">
              {WATER_SLOTS.map((slot) => {
                const isChecked = dayProgress.waterChecks[slot.key];
                return (
                  <button
                    key={slot.key}
                    onClick={() => onToggleWaterSlot(slot.key)}
                    className={`w-full flex items-center justify-between p-2.5 border transition-all text-left ${
                      isChecked
                        ? 'bg-[#1E2720] border-[#384A3B] text-[#E5EBE6]'
                        : 'bg-[#171D18] border-[#2A342C] hover:border-[#4B5E4F] text-[#9EABA0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]'
                            : 'border-[#445447] bg-[#1B211C]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </div>
                      <span className="text-xs font-medium">{slot.label}</span>
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-[#9EABA0]">
                      {slot.amount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Sleep & Recovery Target Block */}
          <div className="bg-[#261D1E] border border-[#4A3335] p-5">
            <div className="flex items-center gap-2 text-[#C98F8A] mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Sleep Protocol</span>
            </div>
            <div className="text-xl font-semibold text-[#E5EBE6] tabular-nums">
              7–8 Hours <span className="text-xs font-normal text-[#9EABA0]">/ Night</span>
            </div>
            <p className="text-xs text-[#C8ADAA] leading-relaxed mt-2">
              Wake-up: <strong>5:45 AM</strong>. Wind down at <strong>9:00 PM</strong>, sleep at <strong>9:45 PM</strong>. Keep wake and sleep hours steady to ensure cognitive consolidation and muscular recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Full Daily Operating Timetable (Section 1 in Document) */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#263128] mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8DA988]" />
              <h3 className="text-lg font-semibold text-[#E5EBE6] tracking-tight">
                Daily Operating Timetable (Master Schedule)
              </h3>
            </div>
            <p className="text-xs text-[#9EABA0] mt-0.5">
              The continuous rhythm across all 39 days, balancing 8–9 hours technical work, 5K training, and recovery.
            </p>
          </div>
          <span className="text-xs text-[#9EABA0] font-medium hidden sm:inline">
            17 Structured Time Blocks
          </span>
        </div>

        {/* Minimalist square-edged grid schedule */}
        <div className="divide-y divide-[#242D26]">
          {DAILY_TIMETABLE.map((slot, idx) => (
            <div
              key={idx}
              className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#202821] transition-colors"
            >
              <div className="flex items-center gap-3 sm:w-48 shrink-0">
                <span className="text-xs font-mono text-[#8DA988] tabular-nums font-medium">
                  {slot.time}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#E5EBE6]">{slot.activity}</div>
                <div className="text-[11px] text-[#9EABA0]">{slot.details}</div>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#748277] font-medium">
                  {slot.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
