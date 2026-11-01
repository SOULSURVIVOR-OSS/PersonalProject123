import React from 'react';
import {
  BookMarked,
  ExternalLink,
  ShieldAlert,
  Scale,
  Sparkles,
  Check,
  Compass
} from 'lucide-react';
import { SOURCES_LIST, OPERATING_RULES } from '../utils/planData';

interface SourcesAndRulesProps {
  completedRules: Record<number, boolean>;
  onToggleRule: (ruleId: number) => void;
}

export const SourcesAndRules: React.FC<SourcesAndRulesProps> = ({
  completedRules,
  onToggleRule,
}) => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#263128]">
          <div>
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-[#8DA988]" />
              <h2 className="text-xl font-semibold text-[#E5EBE6] tracking-tight">
                Verified Sources, Citations &amp; Operating Rules
              </h2>
            </div>
            <p className="text-xs text-[#9EABA0] mt-1">
              Scientific literature, official security training institutions, and the 10 operating laws governing your 39-day cycle.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2.5 py-1 self-start sm:self-auto">
            10 Official References
          </span>
        </div>

        {/* Citations Grid */}
        <div className="mt-6 space-y-4">
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block">
            Scientific &amp; Technical Source Citations
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOURCES_LIST.map((source) => (
              <div
                key={source.id}
                className="border border-[#2A342C] p-5 bg-[#171D18] flex flex-col justify-between hover:border-[#8DA988] transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8DA988] bg-[#1E2720] px-2 py-0.5 border border-[#354738]">
                      {source.category}
                    </span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#748277] hover:text-[#8DA988] transition-colors p-1"
                      title="Open source"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h3 className="text-xs font-semibold text-[#E5EBE6] mb-1 leading-snug">
                    {source.title}
                  </h3>
                  <div className="text-[11px] font-medium text-[#8DA988] mb-2">
                    {source.authorOrOrg}
                  </div>
                  <p className="text-[11px] text-[#9EABA0] leading-relaxed mb-3">
                    {source.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#242D26] text-[10px] text-[#748277]">
                  <span className="font-semibold text-[#E5EBE6] block mb-1">Applied Goals:</span>
                  <div className="flex flex-wrap gap-1">
                    {source.associatedGoals.map((goal, gIdx) => (
                      <span key={gIdx} className="bg-[#141815] text-[#9EABA0] px-1.5 py-0.5 border border-[#2A342C]">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The 10 Operating Rules (Section 10 in Document) */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#263128]">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#C98F8A]" />
              <h3 className="text-base font-semibold text-[#E5EBE6]">
                Section 10: The 10 Operating Rules (Cycle Principles)
              </h3>
            </div>
            <p className="text-xs text-[#9EABA0] mt-0.5">
              Non-negotiable execution laws for the entire 39 days. Verify your daily adherence.
            </p>
          </div>
          <span className="text-xs text-[#E5B2AE] font-semibold bg-[#261D1E] border border-[#4A3335] px-2.5 py-1">
            Zero Rationalizations
          </span>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {OPERATING_RULES.map((rule) => {
            const isAdhered = completedRules[rule.id] || false;
            return (
              <button
                key={rule.id}
                onClick={() => onToggleRule(rule.id)}
                className={`flex items-start gap-3 p-3.5 border text-left text-xs transition-colors ${
                  isAdhered
                    ? 'bg-[#1E2720] border-[#384A3B] text-[#E5EBE6]'
                    : 'bg-[#171D18] border-[#2A342C] hover:border-[#415344] text-[#9EABA0]'
                }`}
              >
                <div
                  className={`w-5 h-5 border shrink-0 flex items-center justify-center mt-0.5 ${
                    isAdhered
                      ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]'
                      : 'border-[#445447] bg-[#1B211C] text-[#8DA988] font-bold text-[10px]'
                  }`}
                >
                  {isAdhered ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : rule.id}
                </div>

                <div className="flex-1">
                  <div className={`leading-relaxed ${isAdhered ? 'text-[#E5EBE6] font-medium' : 'text-[#9EABA0]'}`}>
                    {rule.text}
                  </div>
                  <span className="text-[10px] text-[#748277] mt-1 block">
                    {isAdhered ? 'Rule verified & active' : 'Click to confirm adherence'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mindful Closing Reminder */}
        <div className="p-4 bg-[#1E2720] border border-[#354738] text-xs text-[#9EABA0] leading-relaxed">
          &ldquo;Start preparing your environments and accounts before November 28. Don&rsquo;t measure these 39 days by how many hours you sat in front of a laptop. Measure them by what you can demonstrate on January 5.&rdquo;
        </div>
      </div>
    </div>
  );
};
