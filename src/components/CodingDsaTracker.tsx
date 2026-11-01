import React, { useState } from 'react';
import {
  Code,
  Check,
  Plus,
  Minus,
  Sparkles,
  Server,
  Globe,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  DSA_TOPICS,
  PRACTICAL_PYTHON_PROJECTS,
  WEB_PROJECT_MILESTONES
} from '../utils/planData';

interface CodingDsaTrackerProps {
  dsaCounts: Record<string, number>;
  onUpdateDsaCount: (topic: string, newCount: number) => void;
  completedMilestones: Record<string, boolean>;
  onToggleMilestone: (milestoneId: string) => void;
}

export const CodingDsaTracker: React.FC<CodingDsaTrackerProps> = ({
  dsaCounts,
  onUpdateDsaCount,
  completedMilestones,
  onToggleMilestone,
}) => {
  // NetWatch interactive simulation state
  const [pingTarget, setPingTarget] = useState('1.1.1.1');
  const [isPinging, setIsPinging] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([
    '[INIT] NetWatch diagnostic daemon initialized in safe passive mode.',
    '[INFO] Ready for local reachability & DNS resolution tests.'
  ]);

  const handleSimulateDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pingTarget) return;
    setIsPinging(true);
    setDiagnosticLogs((prev) => [
      `[PROBE] Probing target: ${pingTarget} (ICMP simulated echo)...`,
      ...prev
    ]);

    setTimeout(() => {
      const mockLatency = Math.floor(Math.random() * 25) + 12;
      setDiagnosticLogs((prev) => [
        `[SUCCESS] 64 bytes from ${pingTarget}: icmp_seq=1 ttl=57 time=${mockLatency}.4 ms`,
        `[DNS] PTR lookup resolved: cloudflare-dns.com (${pingTarget})`,
        ...prev
      ]);
      setIsPinging(false);
    }, 700);
  };

  // Total DSA solved calculation
  let totalDsaSolved = 0;
  DSA_TOPICS.forEach((t) => {
    totalDsaSolved += dsaCounts[t.topic] ?? t.defaultSolved;
  });
  const dsaTarget = 50;
  const dsaPercent = Math.min(100, Math.round((totalDsaSolved / dsaTarget) * 100));

  return (
    <div className="space-y-10">
      {/* Header & Daily Allocation */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#263128]">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#8DA988]" />
              <h2 className="text-xl font-semibold text-[#E5EBE6] tracking-tight">
                Coding, DSA &amp; Vibe Web Development
              </h2>
            </div>
            <p className="text-xs text-[#9EABA0] mt-1">
              Balanced daily execution: 150 minutes of deep programming, problem-solving, and practical deployment.
            </p>
          </div>
          <div className="text-right self-start sm:self-auto">
            <span className="text-xs text-[#9EABA0] block">DSA Progress</span>
            <span className="text-lg font-bold text-[#8DA988] tabular-nums">
              {totalDsaSolved} <span className="text-xs font-normal text-[#9EABA0]">/ {dsaTarget} Solved ({dsaPercent}%)</span>
            </span>
          </div>
        </div>

        {/* 4 Daily Coding Time Blocks */}
        <div className="mt-6">
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block mb-3">
            Daily Coding Time Allocation (150 Minutes Total)
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 border border-[#2A342C] bg-[#171D18]">
              <span className="font-mono text-[#8DA988] font-semibold text-xs block mb-1">60 min</span>
              <div className="font-semibold text-[#E5EBE6]">DSA Concepts</div>
              <p className="text-[11px] text-[#9EABA0] mt-1">Study time complexities, space tradeoffs, and invariants.</p>
            </div>
            <div className="p-3.5 border border-[#2A342C] bg-[#171D18]">
              <span className="font-mono text-[#8DA988] font-semibold text-xs block mb-1">45 min</span>
              <div className="font-semibold text-[#E5EBE6]">Problem Solving</div>
              <p className="text-[11px] text-[#9EABA0] mt-1">Hands-on LeetCode / NeetCode implementation without peeking.</p>
            </div>
            <div className="p-3.5 border border-[#2A342C] bg-[#171D18]">
              <span className="font-mono text-[#8DA988] font-semibold text-xs block mb-1">15 min</span>
              <div className="font-semibold text-[#E5EBE6]">Review Mistakes</div>
              <p className="text-[11px] text-[#9EABA0] mt-1">Write down edge cases missed (null checks, single-node loops).</p>
            </div>
            <div className="p-3.5 border border-[#2A342C] bg-[#171D18]">
              <span className="font-mono text-[#8DA988] font-semibold text-xs block mb-1">30 min</span>
              <div className="font-semibold text-[#E5EBE6]">Python Practical</div>
              <p className="text-[11px] text-[#9EABA0] mt-1">Build automation scripts, socket scanners &amp; log parsers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 50-Problem DSA Breakdown Grid */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#263128]">
          <div>
            <h3 className="text-base font-semibold text-[#E5EBE6]">
              40–50 Problem-Solving Target (Quality Over Volume)
            </h3>
            <p className="text-xs text-[#9EABA0]">
              Aim for carefully understood problems and patterns rather than 150 copied solutions.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2.5 py-1">
            C++ for DSA · Python for Security
          </span>
        </div>

        {/* DSA Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DSA_TOPICS.map((topic) => {
            const currentCount = dsaCounts[topic.topic] ?? topic.defaultSolved;
            const isCompleted = currentCount >= topic.targetCount;
            return (
              <div
                key={topic.topic}
                className={`p-4 border transition-all ${
                  isCompleted
                    ? 'bg-[#1E2720] border-[#384A3B]'
                    : 'bg-[#171D18] border-[#2A342C]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#E5EBE6]">{topic.topic}</span>
                  <span className="text-xs font-mono font-bold text-[#8DA988] tabular-nums">
                    {currentCount} / {topic.targetCount}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#222923] h-1.5 mb-3">
                  <div
                    className="bg-[#8DA988] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (currentCount / topic.targetCount) * 100)}%` }}
                  />
                </div>

                {/* Counter controls */}
                <div className="flex items-center justify-between pt-2 border-t border-[#242D26]">
                  <span className="text-[11px] text-[#9EABA0]">Log solved:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateDsaCount(topic.topic, Math.max(0, currentCount - 1))}
                      className="w-6 h-6 border border-[#2F3A31] hover:bg-[#222923] flex items-center justify-center text-[#9EABA0]"
                      aria-label={`Decrement ${topic.topic}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-semibold w-6 text-center tabular-nums text-[#E5EBE6]">
                      {currentCount}
                    </span>
                    <button
                      onClick={() => onUpdateDsaCount(topic.topic, currentCount + 1)}
                      className="w-6 h-6 border border-[#2F3A31] hover:bg-[#222923] flex items-center justify-center text-[#9EABA0]"
                      aria-label={`Increment ${topic.topic}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Sample Problems list */}
                <div className="mt-3 pt-2 border-t border-[#242D26] text-[11px] text-[#9EABA0]">
                  <span className="font-medium text-[#8DA988] block mb-1">Key Archetypes:</span>
                  <span className="italic">{topic.sampleProblems.join(', ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Practical Python Security Projects */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-[#E5EBE6]">
            3 Practical Python Projects (Demonstrable Code)
          </h3>
          <p className="text-xs text-[#9EABA0]">
            Your projects must demonstrate that you understand the underlying code and protocols, not just that an AI generated it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRACTICAL_PYTHON_PROJECTS.map((proj) => (
            <div key={proj.id} className="border border-[#2A342C] p-5 bg-[#171D18]">
              <div className="w-8 h-8 bg-[#1E2720] text-[#B4CCB0] border border-[#354738] flex items-center justify-center font-bold text-xs mb-3">
                {proj.id === 'projA' ? 'A' : proj.id === 'projB' ? 'B' : 'C'}
              </div>
              <h4 className="text-xs font-semibold text-[#E5EBE6] mb-3">{proj.name}</h4>
              <div className="space-y-2">
                {proj.deliverables.map((deliv, idx) => {
                  const mId = `${proj.id}-d${idx}`;
                  const isDone = completedMilestones[mId] || false;
                  return (
                    <button
                      key={idx}
                      onClick={() => onToggleMilestone(mId)}
                      className="w-full flex items-start gap-2 text-left text-xs"
                    >
                      <div
                        className={`w-3.5 h-3.5 border shrink-0 mt-0.5 flex items-center justify-center ${
                          isDone ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]' : 'border-[#445447] bg-[#1B211C]'
                        }`}
                      >
                        {isDone && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
                      </div>
                      <span className={`leading-relaxed ${isDone ? 'line-through text-[#748277]' : 'text-[#9EABA0]'}`}>
                        {deliv}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vibe Coding, 7-Step Workflow & Suggested Project "NetWatch" */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263128] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#8DA988]" />
              <h3 className="text-base font-semibold text-[#E5EBE6]">
                Vibe Coding Project: NetWatch – Personal Network Intelligence Dashboard
              </h3>
            </div>
            <p className="text-xs text-[#9EABA0] mt-0.5">
              Build one substantial, publicly deployed application with README and demo instead of 5 shallow unfinished apps.
            </p>
          </div>
          <span className="text-xs font-medium text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2.5 py-1 self-start sm:self-auto">
            Deadline: Public Deployment by Jan 1
          </span>
        </div>

        {/* The 7-Step Build Workflow */}
        <div>
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block mb-3">
            The 7-Step Rigorous Build Workflow
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
            {[
              { step: '1', title: 'Problem Def', desc: 'Identify target audience & need' },
              { step: '2', title: 'Feature Spec', desc: 'Separate MVP from future features' },
              { step: '3', title: 'UI Generation', desc: 'Curate layout & verify accessibility' },
              { step: '4', title: 'Backend', desc: 'Connect database, auth & APIs' },
              { step: '5', title: 'Testing', desc: 'Validate edge cases & responsiveness' },
              { step: '6', title: 'Deployment', desc: 'Push to GitHub & live Vercel URL' },
              { step: '7', title: 'Presentation', desc: 'Prepare README, video demo & pitch' },
            ].map((s) => (
              <div key={s.step} className="p-3 border border-[#2A342C] bg-[#171D18]">
                <div className="font-mono text-[#8DA988] font-bold text-xs mb-1">0{s.step}</div>
                <div className="font-semibold text-[#E5EBE6]">{s.title}</div>
                <div className="text-[11px] text-[#9EABA0] mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live NetWatch Interactive Prototype Simulator */}
        <div className="border border-[#354738] bg-[#1E2720] p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#2F3E32] mb-4">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#8DA988] tracking-wider block">
                Interactive NetWatch Widget Prototype
              </span>
              <h4 className="text-sm font-semibold text-[#E5EBE6]">
                Network Diagnostics &amp; Passive DNS Monitor
              </h4>
            </div>
            <span className="text-xs font-mono font-medium text-[#8DA988] bg-[#171D18] px-2 py-0.5 border border-[#354738]">
              Authorized Lab Scope Only
            </span>
          </div>

          <form onSubmit={handleSimulateDiagnostic} className="flex gap-2 mb-4">
            <input
              type="text"
              value={pingTarget}
              onChange={(e) => setPingTarget(e.target.value)}
              placeholder="Enter IP (e.g. 1.1.1.1, 8.8.8.8, 127.0.0.1)"
              className="flex-1 text-xs p-2 border border-[#2F3E32] bg-[#141815] text-[#E5EBE6] font-mono"
            />
            <button
              type="submit"
              disabled={isPinging}
              className="px-4 py-2 bg-[#8DA988] hover:bg-[#789373] disabled:opacity-50 text-[#121613] text-xs font-semibold transition-colors"
            >
              {isPinging ? 'Probing...' : 'Run Safe Diagnostic'}
            </button>
          </form>

          {/* Terminal log output */}
          <div className="bg-[#101411] text-[#B8D1B4] p-3 font-mono text-[11px] leading-relaxed max-h-36 overflow-y-auto border border-[#253327]">
            {diagnosticLogs.map((log, i) => (
              <div key={i} className="py-0.5">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Web Development Milestone Checkpoints */}
        <div>
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block mb-3">
            Web Development Milestones (Dec 4 – Jan 5)
          </span>
          <div className="border border-[#2C362E] divide-y divide-[#242D26]">
            {WEB_PROJECT_MILESTONES.map((m, idx) => {
              const mKey = `web-m-${idx}`;
              const isChecked = completedMilestones[mKey] || false;
              return (
                <div
                  key={idx}
                  onClick={() => onToggleMilestone(mKey)}
                  className={`p-3 flex items-center justify-between text-xs cursor-pointer hover:bg-[#202821] transition-colors ${
                    isChecked ? 'bg-[#1E2720]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]' : 'border-[#445447] bg-[#1B211C]'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </div>
                    <div>
                      <span className="font-mono font-medium text-[#8DA988] mr-2">{m.date}:</span>
                      <span className={`${isChecked ? 'line-through text-[#748277]' : 'text-[#E5EBE6]'}`}>
                        {m.deliverable}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#748277] shrink-0">
                    {isChecked ? 'Completed' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
