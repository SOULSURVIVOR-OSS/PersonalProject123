import React, { useState } from 'react';
import {
  Shield,
  Layers,
  Terminal,
  ExternalLink,
  Check,
  Plus,
  Trash2,
  BookOpen,
  FolderGit2
} from 'lucide-react';
import { CYBER_PHASES } from '../utils/planData';
import { TechnicalJournalEntry } from '../types/plan';

interface CyberSecurityTrackerProps {
  journalEntries: TechnicalJournalEntry[];
  onAddJournalEntry: (entry: Omit<TechnicalJournalEntry, 'id'>) => void;
  onDeleteJournalEntry: (id: string) => void;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
}

export const CyberSecurityTracker: React.FC<CyberSecurityTrackerProps> = ({
  journalEntries,
  onAddJournalEntry,
  onDeleteJournalEntry,
  completedTasks,
  onToggleTask,
}) => {
  // Active phase tab
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // New Journal form state
  const [journalDate, setJournalDate] = useState('2026-11-28');
  const [journalTopic, setJournalTopic] = useState('Linux & Terminal');
  const [journalBuilt, setJournalBuilt] = useState('');
  const [journalSolved, setJournalSolved] = useState('');
  const [journalUnsolved, setJournalUnsolved] = useState('');

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTopic.trim()) return;
    onAddJournalEntry({
      date: journalDate,
      topic: journalTopic,
      built: journalBuilt,
      solved: journalSolved,
      unsolved: journalUnsolved,
    });
    setJournalBuilt('');
    setJournalSolved('');
    setJournalUnsolved('');
  };

  const layers = [
    { num: 'Layer 1', title: 'Linux Fundamentals', desc: 'Terminal navigation, file permissions & ownership, processes, services, Bash scripting, SSH.' },
    { num: 'Layer 2', title: 'Computer Networking', desc: 'OSI 7-Layer & TCP/IP models, IPv4 subnetting & CIDR, TCP vs UDP, DNS, DHCP, HTTP, ports.' },
    { num: 'Layer 3', title: 'Network Analysis', desc: 'Wireshark packet capture & filters, Nmap scan types, tcpdump, inspecting handshakes.' },
    { num: 'Layer 4', title: 'Cybersecurity Principles', desc: 'Reconnaissance, basic cryptography, web vulnerabilities (SQLi, XSS), auth flaws, defensive rules.' },
    { num: 'Layer 5', title: 'CTF Competitions', desc: 'Web, Cryptography, Forensics (PCAP/exif), OSINT, Linux privilege enumeration, basic Reverse Engineering.' },
  ];

  const currentPhase = CYBER_PHASES[activePhaseIndex];

  return (
    <div className="space-y-10">
      {/* Header & The 5-Layer Learning Stack */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#263128]">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#8DA988]" />
              <h2 className="text-xl font-semibold text-[#E5EBE6] tracking-tight">
                Cybersecurity &amp; Networking Roadmap
              </h2>
            </div>
            <p className="text-xs text-[#9EABA0] mt-1">
              Main technical priority for BTech CSE: understand fundamentals thoroughly before penetration testing tools.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#B4CCB0] bg-[#1E2720] border border-[#354738] px-2.5 py-1 self-start sm:self-auto">
            Target: 15–20 CTF Challenges + 1 Live CTF
          </span>
        </div>

        {/* 5-Layer Stack Visualization */}
        <div className="mt-6">
          <span className="text-xs uppercase tracking-wider text-[#9EABA0] font-semibold block mb-3">
            The 5-Layer Progressive Learning Stack
          </span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {layers.map((layer, idx) => (
              <div
                key={idx}
                className="p-3.5 border border-[#2A342C] bg-[#171D18] hover:border-[#8DA988] transition-colors"
              >
                <span className="text-[10px] font-mono font-semibold uppercase text-[#8DA988] block mb-1">
                  {layer.num}
                </span>
                <div className="text-xs font-semibold text-[#E5EBE6] mb-1">{layer.title}</div>
                <p className="text-[11px] text-[#9EABA0] leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6 Phases Timeline with Interactive Task Checklists */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#263128] gap-3">
          <div>
            <h3 className="text-base font-semibold text-[#E5EBE6]">
              Phased 39-Day Execution Track
            </h3>
            <p className="text-xs text-[#9EABA0]">
              Navigate across the 6 phases to track topics and check off hands-on practical labs.
            </p>
          </div>

          {/* Phase Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {CYBER_PHASES.map((p, idx) => (
              <button
                key={p.phase}
                onClick={() => setActivePhaseIndex(idx)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  activePhaseIndex === idx
                    ? 'bg-[#8DA988] text-[#121613] font-bold'
                    : 'bg-[#222923] text-[#9EABA0] hover:bg-[#2C362E]'
                }`}
              >
                Phase {p.phase}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Phase Details */}
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-[#171D18] border border-[#2A342C] p-4">
            <div>
              <span className="text-xs text-[#8DA988] font-semibold uppercase tracking-wider">
                Phase {currentPhase.phase} · {currentPhase.dates}
              </span>
              <h4 className="text-base font-bold text-[#E5EBE6] mt-0.5">{currentPhase.title}</h4>
            </div>
            <span className="text-xs font-mono font-medium text-[#9EABA0]">
              {activePhaseIndex + 1} of 6
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concepts to Study */}
            <div className="border border-[#2A342C] p-5 bg-[#171D18]">
              <h5 className="text-xs font-semibold text-[#E5EBE6] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8DA988]" />
                <span>Core Concepts to Study</span>
              </h5>
              <ul className="space-y-2 text-xs text-[#9EABA0]">
                {currentPhase.topics.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8DA988] font-bold">·</span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Hands-on Labs & Deliverables */}
            <div className="border border-[#2A342C] p-5 bg-[#171D18]">
              <h5 className="text-xs font-semibold text-[#E5EBE6] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#8DA988]" />
                <span>Practical Hands-on Work (Checklist)</span>
              </h5>
              <div className="space-y-2.5">
                {currentPhase.practical.map((lab, i) => {
                  const taskId = `cyber-p${currentPhase.phase}-lab-${i}`;
                  const isDone = completedTasks[taskId] || false;
                  return (
                    <button
                      key={i}
                      onClick={() => onToggleTask(taskId)}
                      className={`w-full flex items-start gap-2.5 p-2.5 text-left border transition-colors ${
                        isDone
                          ? 'bg-[#1E2720] border-[#384A3B] text-[#E5EBE6]'
                          : 'bg-[#141815] border-[#2A342C] hover:border-[#415344] text-[#9EABA0]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 shrink-0 border flex items-center justify-center mt-0.5 ${
                          isDone
                            ? 'bg-[#8DA988] border-[#8DA988] text-[#121613]'
                            : 'border-[#445447] bg-[#1B211C]'
                        }`}
                      >
                        {isDone && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </div>
                      <span
                        className={`text-xs leading-relaxed ${
                          isDone ? 'line-through text-[#748277]' : 'text-[#E5EBE6]'
                        }`}
                      >
                        {lab}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Project 1 Spotlight if Phase 2 is viewed */}
          {currentPhase.phase === 2 && (
            <div className="border border-[#354738] bg-[#1E2720] p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8DA988] block mb-1">
                Featured Implementation Project
              </span>
              <h5 className="text-sm font-semibold text-[#E5EBE6] mb-1">
                Project 1: Network Reconnaissance &amp; Analysis Tool (Python)
              </h5>
              <p className="text-xs text-[#9EABA0] mb-3 leading-relaxed">
                Accepts an IP address or authorized lab subnet, verifies reachability, executes authorized Nmap scans, parses structured scan output, and compiles an automated discovery report.
              </p>
              <div className="text-[11px] font-medium text-[#E5B2AE] bg-[#261D1E] p-2 border border-[#4A3335]">
                Notice: Scan only systems and virtual machines you own or have explicit written authorization to test.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Platforms & Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            name: 'OverTheWire',
            subtitle: 'Bandit Wargame (Levels 0–10)',
            desc: 'Best interactive Linux command-line practice.',
            url: 'https://overthewire.org/wargames/bandit/',
          },
          {
            name: 'TryHackMe',
            subtitle: 'Pre-Security & Cyber 101',
            desc: 'Structured browser-based networks & security rooms.',
            url: 'https://tryhackme.com/path/outline/cybersecurity101',
          },
          {
            name: 'PortSwigger Academy',
            subtitle: 'Web Security Free Labs',
            desc: 'Burp Suite creators; hands-on SQLi, XSS, and auth flaws.',
            url: 'https://portswigger.net/web-security/getting-started',
          },
          {
            name: 'picoCTF & CTFtime',
            subtitle: 'Challenges & Live Calendar',
            desc: 'CMU beginner challenges and global competition schedule.',
            url: 'https://picoctf.org/resources.html',
          },
        ].map((plat, idx) => (
          <a
            key={idx}
            href={plat.url}
            target="_blank"
            rel="noreferrer"
            className="block p-4 bg-[#1B211C] border border-[#2C362E] hover:border-[#8DA988] transition-all group"
          >
            <div className="flex items-center justify-between text-[#E5EBE6] mb-1">
              <span className="text-xs font-semibold group-hover:text-[#8DA988] transition-colors">
                {plat.name}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#748277] group-hover:text-[#8DA988]" />
            </div>
            <div className="text-[11px] font-medium text-[#8DA988] mb-1">{plat.subtitle}</div>
            <p className="text-[11px] text-[#9EABA0] leading-relaxed">{plat.desc}</p>
          </a>
        ))}
      </div>

      {/* Tab 3 from Document: Interactive Technical Progress Journal */}
      <div className="bg-[#1B211C] border border-[#2C362E] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263128] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#8DA988]" />
              <h3 className="text-base font-semibold text-[#E5EBE6]">
                Tab 3: Daily Technical Progress Knowledge Base
              </h3>
            </div>
            <p className="text-xs text-[#9EABA0] mt-0.5">
              Every day, write down what you learned, what you built, what you solved, and one thing you couldn&rsquo;t solve yet.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-[#8DA988]">
            {journalEntries.length} Entries Logged
          </span>
        </div>

        {/* Add Entry Form */}
        <form onSubmit={handleAddJournal} className="bg-[#171D18] border border-[#2C362E] p-4 space-y-3">
          <span className="text-xs font-semibold text-[#E5EBE6] block">
            Record Today&rsquo;s Technical Deliverable
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Date</label>
              <input
                type="date"
                value={journalDate}
                onChange={(e) => setJournalDate(e.target.value)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">Topic / Area</label>
              <input
                type="text"
                placeholder="e.g. Wireshark DNS Analysis / Bandit Levels"
                value={journalTopic}
                onChange={(e) => setJournalTopic(e.target.value)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">What I Built</label>
              <input
                type="text"
                placeholder="e.g. Custom packet filter script"
                value={journalBuilt}
                onChange={(e) => setJournalBuilt(e.target.value)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9EABA0] block mb-1">What I Solved</label>
              <input
                type="text"
                placeholder="e.g. Bandit levels 4-6"
                value={journalSolved}
                onChange={(e) => setJournalSolved(e.target.value)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#C98F8A] block mb-1">One Thing I Couldn&rsquo;t Solve</label>
              <input
                type="text"
                placeholder="e.g. Base64 nested gzip decode"
                value={journalUnsolved}
                onChange={(e) => setJournalUnsolved(e.target.value)}
                className="w-full text-xs p-2 border border-[#2F3A31] bg-[#141815] text-[#E5EBE6]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#8DA988] hover:bg-[#789373] text-[#121613] text-xs font-semibold transition-colors"
          >
            Save Journal Entry
          </button>
        </form>

        {/* Journal Entries Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#2C362E]">
            <thead className="bg-[#222923] text-[#E5EBE6] border-b border-[#2C362E]">
              <tr>
                <th className="p-3 font-semibold w-24">Date</th>
                <th className="p-3 font-semibold w-36">Topic</th>
                <th className="p-3 font-semibold">What I Built</th>
                <th className="p-3 font-semibold">What I Solved</th>
                <th className="p-3 font-semibold text-[#C98F8A]">Couldn&rsquo;t Solve</th>
                <th className="p-3 font-semibold text-right w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202821]">
              {journalEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-[#202821]">
                  <td className="p-3 text-[#E5EBE6] tabular-nums font-mono">{entry.date}</td>
                  <td className="p-3 font-medium text-[#8DA988]">{entry.topic}</td>
                  <td className="p-3 text-[#9EABA0]">{entry.built || '—'}</td>
                  <td className="p-3 text-[#9EABA0]">{entry.solved || '—'}</td>
                  <td className="p-3 text-[#C98F8A]">{entry.unsolved || '—'}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onDeleteJournalEntry(entry.id)}
                      className="text-[#9EABA0] hover:text-[#C98F8A] p-1"
                      aria-label="Delete journal entry"
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
