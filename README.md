# The 39-Day Execution Blueprint

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js Tests](https://img.shields.io/badge/Tests-node%3Atest-green?logo=node.js&logoColor=white)](https://nodejs.org/api/test.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-grade, mindful execution dashboard built for **Computer Science Engineering (BTech CSE)** students. Designed around a rigorous 39-day operating cycle (28 November 2026 – 5 January 2027) balancing **Cybersecurity & Networking**, **Full-Stack Web Development**, **Aesthetic Fitness & Sub-30 5K Running**, and **Client Revenue Acquisition**.

Crafted with a restful dark aesthetic using organic sage green and dusty rose accents, minimalist square-edged task blocks, and zero high-gloss distractions.

---

## Architecture & Core Modules

```text
├── src/
│   ├── components/
│   │   ├── Navbar.tsx               # Top Bar Contract with day selector & theme switcher
│   │   ├── HeroOverview.tsx         # Executive dashboard, 3 pillars & composite progress
│   │   ├── DailyRoutineTracker.tsx  # 12-item daily checklist & safe water tracker
│   │   ├── FitnessTracker.tsx       # Sub-30 5K pace calculator, gym splits & TDEE
│   │   ├── CyberSecurityTracker.tsx # 5-layer stack, 6 phases & technical journal
│   │   ├── CodingDsaTracker.tsx     # 50 DSA breakdown & NetWatch diagnostic simulator
│   │   ├── IncomeHustleTracker.tsx  # Video editing skills, pitch scripts & client pipeline
│   │   ├── WeeklyScorecard.tsx      # Sunday retrospectives & Jan 5 final scorecard
│   │   └── SourcesAndRules.tsx      # Verified scientific citations & 10 operating laws
│   ├── types/
│   │   └── plan.ts                  # Domain models & strictly typed state definitions
│   ├── utils/
│   │   ├── planCalculations.ts      # Pure calculation engine (TDEE, pace, progress)
│   │   ├── planCalculations.test.ts # Fast deterministic unit tests via node:test
│   │   └── planData.ts              # Curated datasets, timetables, and literature citations
│   ├── App.tsx                      # Root component & local storage persistence
│   ├── index.css                    # Tailwind CSS v4 variables & typography
│   └── main.tsx                     # React 19 application entry point
```

---

## Key Features

### 1. Daily Operating System (Tab 1)
- **12 Non-Negotiable Checkpoints**: Sleep, protein, hydration, caloric deficit, morning run, gym/kickboxing, cybersecurity (2h), DSA (2h), CTF (1h), web development (2h), side hustle (1.5h), and evening review.
- **Safe Hydration Distribution**: 7 square-edged checkpoints calibrated for 4,000 ml daily distribution without rapid water forcing.
- **Master Schedule**: 17 structured time blocks running from 5:45 AM wake-up to 9:45 PM sleep.

### 2. Physical Capability & Sub-30 5K Protocol
- **Running Progression**: 6-week structured intervals, threshold tempo, and long runs targeting a sub-30 minute 5K (&le; 6:00/km pace).
- **Interactive Pace Calculator**: Computes exact min:sec per kilometer with target status validation.
- **Aesthetic Gym Programming**: Monday Upper Body and Friday Full-Body aesthetic hypertrophy routines with set-by-set trackers.
- **Nutritional Science**: Mifflin-St Jeor metabolic calorie calculator (BMR, TDEE, -300 to -500 kcal deficit) and 7-day rolling weight average logger.

### 3. Cybersecurity & Networking Roadmap
- **5-Layer Learning Stack**: Linux Fundamentals &rarr; Computer Networking &rarr; Network Analysis &rarr; Web Application Security &rarr; CTF Competitions.
- **6 Execution Phases**: Covers OverTheWire Bandit (0–10), Wireshark packet capture, PortSwigger Web Academy, and picoCTF.
- **Tab 3 Knowledge Base**: Interactive daily engineering log tracking What Was Built, What Was Solved, and Blockers.

### 4. Coding, DSA & Vibe Web Development
- **50-Problem Curriculum**: Balanced topic allocation across Arrays, Searching, Linked Lists, Stacks/Queues, Trees, and Graphs.
- **Practical Security Projects**: Server Log Analyser, Network Port Scanner, and Network Topology Visualiser.
- **NetWatch Dashboard Prototype**: Embedded interactive network diagnostic and passive DNS resolution widget.

### 5. Side Hustle & Financial Independence
- **Track A (Short-Form Editing)**: 10 essential retention editing skills and 5 portfolio archetype specifications.
- **Creator Pipeline Tracker**: 100-client tracking table with outreach status and revenue counter toward the ₹5,000 stretch target.
- **Cold Outreach Script**: Tested 3-step creator pitch template.

---

## Scientific Grounding & Citations

Every target in this execution blueprint is grounded in established scientific and institutional standards:

- **ISSN Position Stand (Protein & Exercise)**: Campbell et al. *Journal of the International Society of Sports Nutrition* (PMC2129147). Validates 1.4–2.0 g/kg/day to preserve lean muscle tissue in hypocaloric conditions.
- **ACSM Physical Activity Guidelines**: American College of Sports Medicine guidelines for concurrent cardiovascular and resistance training without overtraining.
- **YouTube Channel Monetisation Guidelines**: Clarifies reused-content policies vs copyright permissions, reinforcing client service provision over automated clipping.

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/SOULSURVIVOR-OSS/PersonalProject123.git
cd PersonalProject123

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Running Unit Tests

The core calculation engine is tested using Node's native test runner (`node:test`):

```bash
npx --yes tsx --test src/utils/planCalculations.test.ts
```

### Building for Production

```bash
npm run build
```

---

## License

This project is licensed under the [MIT License](LICENSE).
