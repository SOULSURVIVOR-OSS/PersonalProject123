import React, { useState } from 'react';
import {
  Calendar,
  Check,
  CheckCircle,
  Award,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { WeeklyReview } from '../types/plan';

interface WeeklyScorecardProps {
  weeklyReviews: WeeklyReview[];
  onUpdateWeeklyReview: (weekIndex: number, field: keyof WeeklyReview, value: any) => void;
  completedFinalDeliverables: Record<string, boolean>;
  onToggleFinalDeliverable: (id: string) => void;
}

export const WeeklyScorecard: React.FC<WeeklyScorecardProps> = ({
  weeklyReviews,
  onUpdateWeeklyReview,
  completedFinalDeliverables,
  onToggleFinalDeliverable,
}) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const finalDeliverablesList = [
    {
      category: 'Cybersecurity',
      items: [
        { id: 'deliv-cyber-bandit', label: 'Complete Bandit beginner levels 0–10' },
        { id: 'deliv-cyber-thm', label: 'Finish substantial TryHackMe Pre-Security modules' },
        { id: 'deliv-cyber-ctf15', label: 'Complete at least 15–20 independent CTF challenges' },
        { id: 'deliv-cyber-live', label: 'Participate in at least one live CTF competition' },
        { id: 'deliv-cyber-writeups', label: 'Publish 2–3 detailed technical challenge write-ups' },
        { id: 'deliv-cyber-recon', label: 'Publish Network Analysis & Reconnaissance project' },
      ],
    },
    {
      category: 'Coding & DSA',
      items: [
        { id: 'deliv-dsa-50', label: 'Solve 40–50 DSA problems with thorough conceptual clarity' },
        { id: 'deliv-dsa-py3', label: 'Complete 3 practical Python projects (Log analyser, Scanner, Topology)' },
        { id: 'deliv-dsa-github', label: 'Publish clean GitHub repositories with documented READMEs' },
      ],
    },
    {
      category: 'Web Development',
      items: [
        { id: 'deliv-web-netwatch', label: 'Build full-stack NetWatch diagnostic application' },
        { id: 'deliv-web-deploy', label: 'Deploy publicly to Vercel/Cloud Run with live preview' },
        { id: 'deliv-web-demo', label: 'Prepare a proper README and recorded video demo' },
        { id: 'deliv-web-pitch', label: 'Demonstrate ability to explain technical code architecture' },
      ],
    },
    {
      category: 'Financial Independence',
      items: [
        { id: 'deliv-fin-samples', label: 'Five high-retention video editing samples ready' },
        { id: 'deliv-fin-portfolio', label: 'Clean portfolio website showcasing styles' },
        { id: 'deliv-fin-prospects', label: '100 potential creator and business clients identified' },
        { id: 'deliv-fin-pitches', label: '50–75 personalized pitches sent across channels' },
        { id: 'deliv-fin-trial', label: 'At least one paid trial attempted or closed' },
        { id: 'deliv-fin-revenue', label: 'Reach or attempt stretch revenue target of ₹5,000' },
      ],
    },
    {
      category: 'Fitness & Physical',
      items: [
        { id: 'deliv-fit-runs', label: 'Five runs weekly where recovery permits' },
        { id: 'deliv-fit-boxing', label: 'Two kickboxing conditioning sessions weekly' },
        { id: 'deliv-fit-gym', label: 'Two to three aesthetic strength sessions weekly' },
        { id: 'deliv-fit-protein', label: 'Consistent 140g protein intake adhered to daily' },
        { id: 'deliv-fit-5k', label: 'Complete timed 5K test under 30 minutes (< 6:00/km)' },
        { id: 'deliv-fit-weight', label: 'Seven-day moving average weight tracked steadily' },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header & Overview */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#263128]">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#8DA988]" />
              <h2 className="text-xl font-semibold text-[#E5EBE6] tracking-tight">
                Weekly Scorecard &amp; January 5 Deliverables
              </h2>
            </div>
            <p className="text-xs text-[#9EABA0] mt-1">
              Tab 2 of execution plan: review weekly metrics every Sunday and track final deliverables due on January 5, 2027.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2.5 py-1 self-start sm:self-auto">
            6 Sunday Check-ins
          </span>
        </div>

        {/* Tab 2: Sunday Weekly Scorecards */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold">
              Weekly Target vs Actual Review (Every Sunday)
            </span>
            <div className="flex items-center gap-1">
              {weeklyReviews.map((w, idx) => (
                <button
                  key={w.weekNumber}
                  onClick={() => setSelectedWeek(idx)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    selectedWeek === idx
                      ? 'bg-[#8DA988] text-[#121613] font-bold'
                      : 'bg-[#222923] text-[#9EABA0] hover:bg-[#2C362E]'
                  }`}
                >
                  Week {w.weekNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Week Review Table */}
          {weeklyReviews[selectedWeek] && (
            <div className="border border-[#2C362E] p-5 bg-[#171D18]">
              <div className="flex items-center justify-between pb-3 border-b border-[#263128] mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#E5EBE6]">
                    Week {weeklyReviews[selectedWeek].weekNumber} Review: {weeklyReviews[selectedWeek].dates}
                  </h4>
                  <span className="text-[11px] text-[#9EABA0]">
                    Audit your execution against weekly benchmarks.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs mb-4">
                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Sleep (Target: 7–8h)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={weeklyReviews[selectedWeek].sleepHoursAvg}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'sleepHoursAvg', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Runs (Target: 5)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].runningSessions}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'runningSessions', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Kickboxing (Target: 2)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].kickboxingSessions}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'kickboxingSessions', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Gym (Target: 2–3)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].gymSessions}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'gymSessions', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Protein Met (Days)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].proteinDaysMet}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'proteinDaysMet', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Cyber (12–14h)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].cyberHours}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'cyberHours', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">DSA (8–10h)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].dsaHours}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'dsaHours', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Web Dev (8–10h)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].webHours}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'webHours', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">CTF Solved (3–5)</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].ctfSolved}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'ctfSolved', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>

                <div className="bg-[#1B211C] p-3 border border-[#2C362E]">
                  <span className="text-[10px] text-[#9EABA0] uppercase">Outreach Sent</span>
                  <input
                    type="number"
                    value={weeklyReviews[selectedWeek].outreachSent}
                    onChange={(e) =>
                      onUpdateWeeklyReview(selectedWeek, 'outreachSent', Number(e.target.value))
                    }
                    className="w-full text-xs font-semibold text-[#E5EBE6] p-1 border border-[#2F3A31] bg-[#141815] mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#9EABA0] block mb-1">
                  Weekly Sunday Retrospective &amp; Adjustments
                </label>
                <input
                  type="text"
                  value={weeklyReviews[selectedWeek].notes}
                  onChange={(e) =>
                    onUpdateWeeklyReview(selectedWeek, 'notes', e.target.value)
                  }
                  placeholder="What went well? Any signs of overtraining or recovery dips?"
                  className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 11: January 5 Final Deliverables Scorecard */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="pb-4 border-b border-[#263128]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C98F8A]" />
            <h3 className="text-base font-semibold text-[#E5EBE6]">
              January 5, 2027 Final Deliverables Scorecard
            </h3>
          </div>
          <p className="text-xs text-[#9EABA0] mt-1">
            &ldquo;You should be able to show someone a network tool you programmed, CTF challenges you independently solved, a website you designed and deployed, DSA problems you can explain, videos you professionally edited, a paying client, and physical progress supported by actual measurements.&rdquo;
          </p>
        </div>

        {/* 6 Key End-State Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center mb-6">
          <div className="p-3 border border-[#2C362E] bg-[#171D18]">
            <span className="text-2xl font-bold text-[#E5EBE6] block">1</span>
            <span className="text-[11px] text-[#9EABA0]">Deployed Web App</span>
          </div>
          <div className="p-3 border border-[#2C362E] bg-[#171D18]">
            <span className="text-2xl font-bold text-[#E5EBE6] block">40–50</span>
            <span className="text-[11px] text-[#9EABA0]">DSA Problems</span>
          </div>
          <div className="p-3 border border-[#2C362E] bg-[#171D18]">
            <span className="text-2xl font-bold text-[#E5EBE6] block">15–20</span>
            <span className="text-[11px] text-[#9EABA0]">CTF Challenges</span>
          </div>
          <div className="p-3 border border-[#2C362E] bg-[#171D18]">
            <span className="text-2xl font-bold text-[#E5EBE6] block">3</span>
            <span className="text-[11px] text-[#9EABA0]">Practical Projects</span>
          </div>
          <div className="p-3 border border-[#2C362E] bg-[#171D18]">
            <span className="text-2xl font-bold text-[#E5EBE6] block">&lt; 30m</span>
            <span className="text-[11px] text-[#9EABA0]">5K Timed Run</span>
          </div>
          <div className="p-3 border border-[#2C362E] bg-[#171D18]">
            <span className="text-2xl font-bold text-[#E5EBE6] block">₹5,000</span>
            <span className="text-[11px] text-[#9EABA0]">Stretch Revenue</span>
          </div>
        </div>

        {/* Categorized Final Deliverables Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalDeliverablesList.map((group) => (
            <div key={group.category} className="border border-[#2C362E] p-5 bg-[#171D18] space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8DA988] block pb-1 border-b border-[#263128]">
                {group.category}
              </span>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const isChecked = completedFinalDeliverables[item.id] || false;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onToggleFinalDeliverable(item.id)}
                      className={`w-full flex items-start gap-2.5 p-2 text-left border transition-colors ${
                        isChecked
                          ? 'bg-[#1E2720] border-[#384A3B] text-[#E5EBE6]'
                          : 'bg-[#141815] border-[#2A342C] hover:border-[#415344] text-[#9EABA0]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 border shrink-0 flex items-center justify-center mt-0.5 ${
                          isChecked ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]' : 'border-[#445447] bg-[#1B211C]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </div>
                      <span
                        className={`text-xs leading-relaxed ${
                          isChecked ? 'line-through text-[#748277]' : 'text-[#E5EBE6]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
