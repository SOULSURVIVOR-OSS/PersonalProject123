import React from 'react';
import { Sparkles, Calendar, RotateCcw, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  currentDay: number;
  onSelectDay: (day: number) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  overallScore: number;
  onResetProgress: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDay,
  onSelectDay,
  activeTab,
  onSelectTab,
  overallScore,
  onResetProgress,
  isDark,
  onToggleTheme,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'daily', label: 'Daily Routine' },
    { id: 'fitness', label: 'Fitness & 5K' },
    { id: 'cyber', label: 'Cyber & DSA' },
    { id: 'income', label: 'Side Hustle' },
    { id: 'scorecard', label: 'Scorecard & Deliverables' },
    { id: 'sources', label: 'Sources & Rules' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#171D18]/95 backdrop-blur-md border-b border-[#2C362E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('overview');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-[#8DA988] text-[#121613] flex items-center justify-center font-bold text-sm transition-transform duration-200 group-hover:scale-105">
              39
            </div>
            <div>
              <span className="text-base font-semibold text-[#E5EBE6] tracking-tight block leading-tight">
                Execution Blueprint
              </span>
              <span className="text-[11px] text-[#9EABA0] tracking-normal block leading-none">
                Nov 28, 2026 – Jan 5, 2027
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium tracking-tight whitespace-nowrap transition-colors duration-150 relative ${
                  isActive
                    ? 'text-[#B8D1B4] font-semibold bg-[#222C24]'
                    : 'text-[#9EABA0] hover:text-[#E5EBE6] hover:bg-[#1E2520]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8DA988]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action, Theme & Day Selector */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Day Selector */}
          <div className="flex items-center bg-[#1E2520] border border-[#2F3A31] px-2 py-1 text-xs">
            <Calendar className="w-3.5 h-3.5 text-[#8DA988] mr-1.5" />
            <span className="text-[#9EABA0] mr-1.5 font-medium hidden sm:inline">Day</span>
            <select
              value={currentDay}
              onChange={(e) => onSelectDay(Number(e.target.value))}
              className="bg-transparent text-xs font-semibold text-[#E5EBE6] focus:outline-none cursor-pointer pr-1"
              aria-label="Select Execution Day"
            >
              {Array.from({ length: 39 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d} className="bg-[#1B211C] text-[#E5EBE6]">
                  {d} of 39
                </option>
              ))}
            </select>
          </div>

          {/* Overall Score Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#261D1E] border border-[#483335] text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C98F8A]" />
            <span className="font-semibold text-[#E5B2AE] tabular-nums">{overallScore}%</span>
            <span className="text-[#C98F8A] text-[11px] hidden md:inline">Execution</span>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Muted Light Theme' : 'Switch to Restful Dark Theme'}
            className="p-1.5 text-[#9EABA0] hover:text-[#E5EBE6] hover:bg-[#1E2520] border border-[#2F3A31] transition-colors"
            aria-label="Toggle theme appearance"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-[#8DA988]" /> : <Moon className="w-3.5 h-3.5 text-[#C98F8A]" />}
          </button>

          {/* Reset Confirmation Button */}
          <button
            onClick={onResetProgress}
            title="Reset to default initial data"
            className="p-1.5 text-[#829185] hover:text-[#C98F8A] hover:bg-[#261D1E] transition-colors"
            aria-label="Reset plan data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="lg:hidden border-t border-[#262F28] px-2 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`px-2.5 py-1 text-[11px] whitespace-nowrap font-medium transition-colors ${
                isActive
                  ? 'bg-[#8DA988] text-[#121613] font-semibold'
                  : 'text-[#9EABA0] hover:bg-[#1E2520]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
