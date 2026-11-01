import React, { useState } from 'react';
import {
  TrendingUp,
  Video,
  Globe,
  Copy,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import {
  SIDE_HUSTLE_SKILLS,
  PORTFOLIO_SAMPLE_TYPES,
  PRICING_PACKAGES,
  OUTREACH_TEMPLATE
} from '../utils/planData';
import { ProspectEntry } from '../types/plan';

interface IncomeHustleTrackerProps {
  prospects: ProspectEntry[];
  onAddProspect: (prospect: Omit<ProspectEntry, 'id'>) => void;
  onDeleteProspect: (id: string) => void;
  onUpdateProspectStatus: (id: string, status: ProspectEntry['status'], revenue: number) => void;
  completedSkills: Record<string, boolean>;
  onToggleSkill: (skillId: string) => void;
}

export const IncomeHustleTracker: React.FC<IncomeHustleTrackerProps> = ({
  prospects,
  onAddProspect,
  onDeleteProspect,
  onUpdateProspectStatus,
  completedSkills,
  onToggleSkill,
}) => {
  // Copy state
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // New prospect form state
  const [prospectName, setProspectName] = useState('');
  const [prospectPlatform, setProspectPlatform] = useState<ProspectEntry['platform']>('Instagram');
  const [prospectService, setProspectService] = useState<ProspectEntry['service']>('Short-Form Video');
  const [prospectDate, setProspectDate] = useState('2026-11-28');
  const [prospectStatus, setProspectStatus] = useState<ProspectEntry['status']>('Contacted');
  const [prospectRevenue, setProspectRevenue] = useState(0);
  const [prospectNotes, setProspectNotes] = useState('');

  // Total revenue earned
  const totalRevenue = prospects.reduce((sum, p) => sum + (p.revenue || 0), 0);
  const revenueTarget = 5000;
  const revenuePercent = Math.min(100, Math.round((totalRevenue / revenueTarget) * 100));

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(OUTREACH_TEMPLATE);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleAddProspectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prospectName.trim()) return;
    onAddProspect({
      name: prospectName,
      platform: prospectPlatform,
      service: prospectService,
      contactedDate: prospectDate,
      status: prospectStatus,
      revenue: Number(prospectRevenue) || 0,
      notes: prospectNotes,
    });
    setProspectName('');
    setProspectNotes('');
    setProspectRevenue(0);
  };

  return (
    <div className="space-y-10">
      {/* Header & Revenue Target Hero Bar */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#263128]">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#C98F8A]" />
              <h2 className="text-xl font-semibold text-[#E5EBE6] tracking-tight">
                Financial Independence: Side Hustle &amp; Client Revenue
              </h2>
            </div>
            <p className="text-xs text-[#9EABA0] mt-1">
              Priority: secure your first genuine paying client by offering short-form editing (70% focus) and client websites (30% focus).
            </p>
          </div>

          <div className="text-right self-start sm:self-auto bg-[#261D1E] p-3 border border-[#4A3335]">
            <span className="text-[11px] text-[#C98F8A] font-semibold uppercase tracking-wider block">
              Stretch Revenue Target
            </span>
            <div className="text-2xl font-bold text-[#E5EBE6] tabular-nums mt-0.5">
              ₹{totalRevenue.toLocaleString()} <span className="text-xs font-normal text-[#9EABA0]">/ ₹5,000</span>
            </div>
            <span className="text-[11px] text-[#E5B2AE] font-medium">
              {revenuePercent}% of stretch goal achieved
            </span>
          </div>
        </div>

        {/* Revenue Progress Bar */}
        <div className="mt-5">
          <div className="w-full bg-[#241D1E] h-2 overflow-hidden mb-2">
            <div
              className="bg-[#C98F8A] h-full transition-all duration-500 ease-out"
              style={{ width: `${revenuePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#9EABA0]">
            <span>₹0 (Day 1)</span>
            <span>First Paying Customer Milestone</span>
            <span>₹5,000 Stretch Target (Jan 5)</span>
          </div>
        </div>
      </div>

      {/* Track A: Short-Form Video Editing (Primary Track) */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#263128] gap-2">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-[#8DA988]" />
            <h3 className="text-base font-semibold text-[#E5EBE6]">
              Track A: Short-Form Video Editing (Primary Focus · 70% Time)
            </h3>
          </div>
          <span className="text-xs font-medium text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2.5 py-0.5">
            Tools: DaVinci Resolve, CapCut, Canva, Audacity
          </span>
        </div>

        {/* 10 Essential Editing Skills Checklist */}
        <div>
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block mb-3">
            10 Essential Short-Form Editing Skills
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SIDE_HUSTLE_SKILLS.map((skill, idx) => {
              const skillKey = `skill-${idx}`;
              const isChecked = completedSkills[skillKey] || false;
              return (
                <button
                  key={idx}
                  onClick={() => onToggleSkill(skillKey)}
                  className={`flex items-center gap-2.5 p-2.5 border text-left text-xs transition-colors ${
                    isChecked
                      ? 'bg-[#1E2720] border-[#384A3B] text-[#E5EBE6]'
                      : 'bg-[#171D18] border-[#2A342C] hover:border-[#415344] text-[#9EABA0]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 border shrink-0 flex items-center justify-center ${
                      isChecked ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]' : 'border-[#445447] bg-[#1B211C]'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                  </div>
                  <span className={`leading-relaxed ${isChecked ? 'line-through text-[#748277]' : 'text-[#E5EBE6]'}`}>
                    {skill}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 Portfolio Sample Targets */}
        <div>
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block mb-3">
            5 Essential Portfolio Samples (Dec 3–7 Milestone)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PORTFOLIO_SAMPLE_TYPES.map((sample, idx) => (
              <div key={idx} className="p-3 border border-[#2A342C] bg-[#171D18]">
                <div className="font-mono text-[#8DA988] font-semibold text-xs mb-1">0{idx + 1}</div>
                <div className="text-xs font-semibold text-[#E5EBE6] mb-1">{sample.title}</div>
                <p className="text-[11px] text-[#9EABA0] leading-relaxed">{sample.target}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Matrix & Proven Outreach Script */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Test Pricing Experiments */}
          <div className="border border-[#2C362E] p-5 bg-[#171D18]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5EBE6] mb-3">
              Initial Pricing Experiment Packages
            </h4>
            <div className="divide-y divide-[#242D26]">
              {PRICING_PACKAGES.map((pkg, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#E5EBE6] block">{pkg.package}</span>
                    <span className="text-[11px] text-[#9EABA0]">{pkg.note}</span>
                  </div>
                  <span className="font-mono font-semibold text-[#8DA988] tabular-nums">
                    {pkg.testPrice}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#748277] mt-3 italic">
              Introductory rates to test real demand; always ask for 50% deposit on packages.
            </p>
          </div>

          {/* High-Converting Cold Outreach Template */}
          <div className="border border-[#2C362E] p-5 bg-[#171D18] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5EBE6]">
                  Proven Creator Outreach Script
                </h4>
                <button
                  onClick={handleCopyTemplate}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8DA988] hover:text-[#A1BD9C]"
                >
                  {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTemplate ? 'Copied' : 'Copy Template'}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#9EABA0] mb-3">
                Send 10–15 personalized messages daily across Instagram, Email &amp; LinkedIn.
              </p>
              <pre className="text-[11px] text-[#DCE4DD] bg-[#141815] p-3 border border-[#263128] font-sans leading-relaxed whitespace-pre-wrap">
                {OUTREACH_TEMPLATE}
              </pre>
            </div>
          </div>
        </div>

        {/* YouTube Monetisation Policy Warning */}
        <div className="p-4 bg-[#261D1E] border border-[#4A3335] text-xs text-[#D8B9B7] space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-[#E5B2AE]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Crucial Legal &amp; Policy Distinction: Freelance Client Service vs. Clipping Channels</span>
          </div>
          <p className="leading-relaxed">
            YouTube explicitly separates copyright permissions from reused-content monetisation policies. Merely obtaining permission to clip someone else&rsquo;s stream does NOT make the video eligible for ad revenue unless significant original commentary or value is added. <strong>Recommendation:</strong> Sell professional editing services directly to paying creators rather than running an unauthorized clipping channel.
          </p>
        </div>
      </div>

      {/* Tab 4: Interactive Client Pipeline & Revenue Table */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#263128] gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#E5EBE6]">
              Tab 4: Side Hustle Client Pipeline Tracker (100 Target)
            </h3>
            <p className="text-xs text-[#9EABA0]">
              Log identified prospects, outreach channels, response status, and verified revenue received.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-[#8DA988]">
            {prospects.length} / 100 Prospects Identified
          </span>
        </div>

        {/* Add Prospect Form */}
        <form onSubmit={handleAddProspectSubmit} className="bg-[#171D18] border border-[#2C362E] p-4 space-y-3">
          <span className="text-xs font-semibold text-[#E5EBE6] block">
            Add New Prospect to Pipeline
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Prospect / Channel Name</label>
              <input
                type="text"
                placeholder="e.g. @techpodcast / Local Bistro"
                value={prospectName}
                onChange={(e) => setProspectName(e.target.value)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Outreach Platform</label>
              <select
                value={prospectPlatform}
                onChange={(e) => setProspectPlatform(e.target.value as any)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
              >
                <option value="Instagram">Instagram DM</option>
                <option value="Email">Email Pitch</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube Comment / Contact</option>
                <option value="Other">Local / In-person</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Service Pitched</label>
              <select
                value={prospectService}
                onChange={(e) => setProspectService(e.target.value as any)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
              >
                <option value="Short-Form Video">Short-Form Video Editing</option>
                <option value="Website">Small Business Website</option>
                <option value="Both">Both Services</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Contacted Date</label>
              <input
                type="date"
                value={prospectDate}
                onChange={(e) => setProspectDate(e.target.value)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Pipeline Status</label>
              <select
                value={prospectStatus}
                onChange={(e) => setProspectStatus(e.target.value as any)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
              >
                <option value="Identified">Identified</option>
                <option value="Contacted">Contacted / Pitched</option>
                <option value="Sample Sent">Sample Edit Sent</option>
                <option value="Paid Trial">Paid Trial Closed</option>
                <option value="Completed">Completed &amp; Paid</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Revenue Received (₹)</label>
              <input
                type="number"
                value={prospectRevenue}
                onChange={(e) => setProspectRevenue(Number(e.target.value))}
                placeholder="0"
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-[#9EABA0] block mb-1">Conversation Notes</label>
            <input
              type="text"
              placeholder="e.g. Liked workout reel cut, agreed to ₹1,500 trial pack for 5 clips"
              value={prospectNotes}
              onChange={(e) => setProspectNotes(e.target.value)}
              className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#8DA988] hover:bg-[#789373] text-[#121613] text-xs font-semibold transition-colors"
          >
            Add Prospect
          </button>
        </form>

        {/* Prospect Pipeline Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#2C362E]">
            <thead className="bg-[#222923] text-[#E5EBE6] border-b border-[#2C362E]">
              <tr>
                <th className="p-3 font-semibold">Prospect</th>
                <th className="p-3 font-semibold">Platform</th>
                <th className="p-3 font-semibold">Service</th>
                <th className="p-3 font-semibold">Contacted</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Revenue (₹)</th>
                <th className="p-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202821]">
              {prospects.map((p) => (
                <tr key={p.id} className="hover:bg-[#202821]">
                  <td className="p-3">
                    <span className="font-semibold text-[#E5EBE6] block">{p.name}</span>
                    {p.notes && <span className="text-[11px] text-[#9EABA0] block mt-0.5">{p.notes}</span>}
                  </td>
                  <td className="p-3 text-[#9EABA0]">{p.platform}</td>
                  <td className="p-3 text-[#9EABA0]">{p.service}</td>
                  <td className="p-3 font-mono tabular-nums text-[#9EABA0]">{p.contactedDate}</td>
                  <td className="p-3">
                    <select
                      value={p.status}
                      onChange={(e) =>
                        onUpdateProspectStatus(p.id, e.target.value as any, p.revenue)
                      }
                      className="text-xs p-1 border border-[#2F3A31] bg-[#171D18] text-[#E5EBE6] font-medium"
                    >
                      <option value="Identified">Identified</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Sample Sent">Sample Sent</option>
                      <option value="Paid Trial">Paid Trial</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-3 font-mono font-semibold tabular-nums text-[#8DA988]">
                    ₹{p.revenue.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onDeleteProspect(p.id)}
                      className="text-[#9EABA0] hover:text-[#C98F8A] p-1"
                      aria-label="Delete prospect"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
