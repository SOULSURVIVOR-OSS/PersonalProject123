import React from 'react';
import { Terminal, Activity, TrendingUp, CheckSquare, Clock, Moon, Dumbbell, ShieldCheck, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { DayInfo } from '../utils/planCalculations';

interface HeroOverviewProps {
  currentDayInfo: DayInfo;
  currentDay: number;
  overallScore: number;
  onNavigateTab: (tab: string) => void;
  dailyTrackingScore: number;
  dsaScore: number;
  ctfScore: number;
  revenueScore: number;
  cycleStarted: boolean;
  onStartCycle: () => void;
  onResetCycle: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  currentDayInfo,
  currentDay,
  overallScore,
  onNavigateTab,
  dailyTrackingScore,
  dsaScore,
  ctfScore,
  revenueScore,
  cycleStarted,
  onStartCycle,
  onResetCycle,
}) => {
  return (
    <section className="pt-6 pb-12 border-b border-[#2C362E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Square-Edged 39-Day Launch Banner */}
        <div className="mb-8 p-6 sm:p-7 bg-[#172019] border-2 border-[#8DA988] transition-all duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 ${cycleStarted ? 'bg-[#8DA988] animate-pulse' : 'bg-[#C98F8A]'}`} />
                <span className="text-xs uppercase tracking-widest font-mono text-[#8DA988] font-bold">
                  {cycleStarted ? 'Execution Cycle In Progress · Day 1 Active' : 'Official Launchpad · Ready to Begin'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#E5EBE6] tracking-tight">
                {cycleStarted ? (
                  <>The 39-Day Execution is <span className="font-semibold text-[#8DA988]">Active</span></>
                ) : (
                  <>Start the Whole <span className="font-semibold text-[#8DA988]">39 Days</span></>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#9EABA0] leading-relaxed">
                {cycleStarted
                  ? 'All trackers are live from Day 1. Complete your daily checklist, log your 5K runs, solve your DSA sets, and record networking labs.'
                  : 'Zero fluff, complete focus. Click the button below to initialize the entire 39-day timeline with a clean slate of 0s across all routines, fitness records, and earnings.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onStartCycle}
                className="px-8 py-4 bg-[#8DA988] hover:bg-[#9CB897] active:bg-[#7D9A78] text-[#111612] font-bold text-sm sm:text-base tracking-wide uppercase transition-all duration-150 flex items-center gap-3 cursor-pointer shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{cycleStarted ? 'Restart Whole 39 Days' : 'Start The Whole 39 Days'}</span>
              </button>

              {cycleStarted && (
                <button
                  onClick={onResetCycle}
                  className="px-5 py-4 bg-[#1E2520] hover:bg-[#27322A] active:bg-[#1A211B] text-[#C98F8A] hover:text-[#DC9F9A] border border-[#3A493D] font-semibold text-xs tracking-wider uppercase transition-all duration-150 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All to 0</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Top Kicker & Calming Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#9EABA0] uppercase tracking-wider mb-2">
              <span className="font-semibold text-[#8DA988]">BTech CSE Cycle</span>
              <span aria-hidden="true">·</span>
              <span>28 Nov 2026 – 05 Jan 2027</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C98F8A] font-medium">{currentDayInfo.phase}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#E5EBE6] tracking-tight text-balance">
              The 39-Day <span className="font-semibold text-[#A1BD9C]">Execution</span> Blueprint
            </h1>
            <p className="mt-3 text-base text-[#9EABA0] max-w-2xl leading-relaxed">
              A serene, restful operating system to track your technical, physical, and financial milestones daily with intentional calm and zero distractions.
            </p>
          </div>

          {/* Current Day Badge Block */}
          <div className="bg-[#1E2520] border border-[#2F3A31] p-4 text-left md:text-right shrink-0">
            <div className="text-[11px] uppercase tracking-wider text-[#9EABA0] font-medium">Active Timeline</div>
            <div className="text-2xl font-bold text-[#E5EBE6] tabular-nums mt-0.5">
              Day {currentDay} <span className="text-sm font-normal text-[#9EABA0]">/ 39</span>
            </div>
            <div className="text-xs text-[#8DA988] font-medium mt-1">
              {currentDayInfo.displayDate} {currentDayInfo.isRestDay && '· Scheduled Rest Day'}
            </div>
          </div>
        </div>

        {/* 4 Minimalist Square-Edged Target Metric Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-[#1B211C] border border-[#2C362E] p-5 transition-all duration-200 hover:border-[#8DA988]">
            <div className="flex items-center justify-between text-[#8DA988] mb-2">
              <span className="text-xs uppercase tracking-wider font-medium text-[#9EABA0]">Cycle Duration</span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-semibold text-[#E5EBE6] tracking-tight tabular-nums">
              39 <span className="text-base font-normal text-[#9EABA0]">days</span>
            </div>
            <p className="text-xs text-[#7A8A7D] mt-2 leading-relaxed">
              Execution cycle, not a casual study holiday.
            </p>
          </div>

          <div className="bg-[#1B211C] border border-[#2C362E] p-5 transition-all duration-200 hover:border-[#8DA988]">
            <div className="flex items-center justify-between text-[#8DA988] mb-2">
              <span className="text-xs uppercase tracking-wider font-medium text-[#9EABA0]">Technical Work</span>
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-semibold text-[#E5EBE6] tracking-tight tabular-nums">
              8–9 <span className="text-base font-normal text-[#9EABA0]">hrs</span>
            </div>
            <p className="text-xs text-[#7A8A7D] mt-2 leading-relaxed">
              Networking, DSA, CTF practice &amp; full-stack development.
            </p>
          </div>

          <div className="bg-[#1B211C] border border-[#2C362E] p-5 transition-all duration-200 hover:border-[#C98F8A]">
            <div className="flex items-center justify-between text-[#C98F8A] mb-2">
              <span className="text-xs uppercase tracking-wider font-medium text-[#9EABA0]">Deep Recovery</span>
              <Moon className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-semibold text-[#E5EBE6] tracking-tight tabular-nums">
              7–8 <span className="text-base font-normal text-[#9EABA0]">hrs</span>
            </div>
            <p className="text-xs text-[#7A8A7D] mt-2 leading-relaxed">
              Consistent sleep every night; 9:45 PM wind-down.
            </p>
          </div>

          <div className="bg-[#1B211C] border border-[#2C362E] p-5 transition-all duration-200 hover:border-[#C98F8A]">
            <div className="flex items-center justify-between text-[#C98F8A] mb-2">
              <span className="text-xs uppercase tracking-wider font-medium text-[#9EABA0]">Daily Protein</span>
              <Activity className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-semibold text-[#E5EBE6] tracking-tight tabular-nums">
              140 <span className="text-base font-normal text-[#9EABA0]">g</span>
            </div>
            <p className="text-xs text-[#7A8A7D] mt-2 leading-relaxed">
              ISSN verified ratio to retain muscle in deficit.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars: Technical, Physical, Financial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Pillar 1 */}
          <div className="bg-[#1B211C] border border-[#2C362E] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#8DA988]">
            <div>
              <div className="w-10 h-10 bg-[#1E2720] text-[#B4CCB0] border border-[#354738] flex items-center justify-center font-semibold text-sm mb-4">
                01
              </div>
              <h2 className="text-lg font-semibold text-[#E5EBE6] tracking-tight mb-2">
                Technical Capability
              </h2>
              <p className="text-sm text-[#9EABA0] leading-relaxed mb-4">
                Solve beginner &amp; intermediate CTF challenges, master Linux and computer networking layers, write robust DSA algorithms, and build the NetWatch dashboard.
              </p>
              <div className="space-y-1.5 text-xs text-[#8A9B8D]">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#8DA988]" />
                  <span>Bandit 0–10 &amp; Wireshark packet capture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#8DA988]" />
                  <span>40–50 DSA problems + 3 Python security tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#8DA988]" />
                  <span>Deployed NetWatch full-stack dashboard</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('cyber')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8DA988] hover:text-[#A1BD9C] pt-4 border-t border-[#263128] group"
            >
              <span>Explore Technical Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#1B211C] border border-[#2C362E] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#C98F8A]">
            <div>
              <div className="w-10 h-10 bg-[#261D1E] text-[#E5B2AE] border border-[#4A3335] flex items-center justify-center font-semibold text-sm mb-4">
                02
              </div>
              <h2 className="text-lg font-semibold text-[#E5EBE6] tracking-tight mb-2">
                Physical Capability
              </h2>
              <p className="text-sm text-[#9EABA0] leading-relaxed mb-4">
                Develop an athletic, aesthetic physique, coordinate running with kickboxing and gym sessions, and achieve a sub-30-minute 5K at 6:00/km target pace.
              </p>
              <div className="space-y-1.5 text-xs text-[#A88C8B]">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#C98F8A]" />
                  <span>5 runs/week: intervals, tempo &amp; recovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#C98F8A]" />
                  <span>Upper body &amp; full body aesthetic gym split</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#C98F8A]" />
                  <span>140g protein + 300–500 kcal deficit tracking</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('fitness')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C98F8A] hover:text-[#D9A29D] pt-4 border-t border-[#312526] group"
            >
              <span>View Fitness &amp; 5K Protocol</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#1B211C] border border-[#2C362E] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#8DA988]">
            <div>
              <div className="w-10 h-10 bg-[#1E2720] text-[#B4CCB0] border border-[#354738] flex items-center justify-center font-semibold text-sm mb-4">
                03
              </div>
              <h2 className="text-lg font-semibold text-[#E5EBE6] tracking-tight mb-2">
                Financial Capability
              </h2>
              <p className="text-sm text-[#9EABA0] leading-relaxed mb-4">
                Build a side hustle selling short-form video editing and high-converting client landing pages. Secure your first paying customer and reach ₹5,000 revenue.
              </p>
              <div className="space-y-1.5 text-xs text-[#8A9B8D]">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#8DA988]" />
                  <span>5 portfolio sample edits ready to pitch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#8DA988]" />
                  <span>100 identified creator &amp; business prospects</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#8DA988]" />
                  <span>Close first paid trial &amp; deliver testimonials</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('income')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8DA988] hover:text-[#A1BD9C] pt-4 border-t border-[#263128] group"
            >
              <span>Track Side Hustle &amp; Income</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Progress Breakdown Strips */}
        <div className="bg-[#1B211C] border border-[#2C362E] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold">
                Overall Plan Execution
              </span>
              <div className="text-xl font-semibold text-[#E5EBE6] mt-0.5">
                Composite Progress: <span className="tabular-nums text-[#8DA988]">{overallScore}%</span>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('daily')}
              className="px-4 py-2 bg-[#8DA988] hover:bg-[#789373] text-[#121613] text-xs font-semibold tracking-wide transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Open Daily Tracker
            </button>
          </div>

          {/* Minimalist Multi-Track Progress Bar */}
          <div className="w-full bg-[#222923] h-2 mb-4 overflow-hidden flex">
            <div
              className="bg-[#8DA988] h-full transition-all duration-500 ease-out"
              style={{ width: `${dailyTrackingScore * 0.5}%` }}
              title={`Habit: ${dailyTrackingScore}%`}
            />
            <div
              className="bg-[#A1BD9C] h-full transition-all duration-500 ease-out"
              style={{ width: `${dsaScore * 0.2}%` }}
              title={`DSA: ${dsaScore}%`}
            />
            <div
              className="bg-[#C98F8A] h-full transition-all duration-500 ease-out"
              style={{ width: `${ctfScore * 0.15}%` }}
              title={`CTF: ${ctfScore}%`}
            />
            <div
              className="bg-[#D9A29D] h-full transition-all duration-500 ease-out"
              style={{ width: `${revenueScore * 0.15}%` }}
              title={`Revenue: ${revenueScore}%`}
            />
          </div>

          {/* Metrics breakdown row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
            <div>
              <div className="text-[#9EABA0]">Daily Routine Score</div>
              <div className="font-semibold text-[#E5EBE6] tabular-nums mt-0.5">{dailyTrackingScore}%</div>
            </div>
            <div>
              <div className="text-[#9EABA0]">DSA Problems</div>
              <div className="font-semibold text-[#E5EBE6] tabular-nums mt-0.5">{dsaScore}% target</div>
            </div>
            <div>
              <div className="text-[#9EABA0]">CTF Challenges</div>
              <div className="font-semibold text-[#E5EBE6] tabular-nums mt-0.5">{ctfScore}% target</div>
            </div>
            <div>
              <div className="text-[#9EABA0]">Revenue Goal (₹5,000)</div>
              <div className="font-semibold text-[#E5EBE6] tabular-nums mt-0.5">{revenueScore}% target</div>
            </div>
          </div>
        </div>

        {/* Mindful Execution Quote */}
        <div className="mt-8 border-l-2 border-[#8DA988] pl-4 py-1 text-sm italic text-[#9EABA0] leading-relaxed">
          &ldquo;Don&rsquo;t measure these 39 days by how many hours you sat in front of a laptop. Measure them by what you can demonstrate on January 5: a network tool you programmed, CTF challenges you solved, a live deployed website, and measurable physical progress.&rdquo;
        </div>
      </div>
    </section>
  );
};
