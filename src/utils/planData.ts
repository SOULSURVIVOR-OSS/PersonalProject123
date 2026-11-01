import { SourceCitation } from '../types/plan';

export const DAILY_CHECKLIST_ITEMS = [
  { id: 'sleep', label: '7–8 hours restful sleep', category: 'Recovery' },
  { id: 'water', label: 'Water target met safely (~4 L distributed)', category: 'Nutrition' },
  { id: 'protein', label: '140 g protein goal reached', category: 'Nutrition' },
  { id: 'calories', label: 'Calorie target followed (-300 to -500 kcal deficit)', category: 'Nutrition' },
  { id: 'run', label: 'Morning run or scheduled active recovery', category: 'Fitness' },
  { id: 'gym', label: 'Evening gym session or kickboxing completed', category: 'Fitness' },
  { id: 'cyber', label: 'Cybersecurity & networking concepts / lab (2h)', category: 'Technical' },
  { id: 'dsa', label: 'DSA concepts & problem-solving (2h)', category: 'Technical' },
  { id: 'ctf', label: 'CTF hands-on challenge practice (1h)', category: 'Technical' },
  { id: 'web', label: 'Website development & vibe coding (2h)', category: 'Technical' },
  { id: 'hustle', label: 'Side hustle: sample editing or outreach (1.5h)', category: 'Financial' },
  { id: 'review', label: 'Daily review & plan tomorrow prepared', category: 'Mindfulness' },
];

export const DAILY_TIMETABLE = [
  { time: '5:45 AM', activity: 'Wake up', details: 'Drink 500 ml water, mindfully prepare for morning training', category: 'routine' },
  { time: '6:00–6:45 AM', activity: 'Morning running', details: 'Easy run, intervals, or tempo per running calendar (Sub-30 5K focus)', category: 'fitness' },
  { time: '6:45–7:30 AM', activity: 'Recovery & breakfast', details: 'High-protein breakfast (~30g protein: eggs, oats, milk), cool shower', category: 'nutrition' },
  { time: '7:30–9:30 AM', activity: 'Networking / cybersecurity', details: 'Linux fundamentals, Wireshark, packet analysis, or PortSwigger labs', category: 'technical' },
  { time: '9:30–9:45 AM', activity: 'Mindful break', details: 'Light walk, step away from screens, drink water', category: 'recovery' },
  { time: '9:45–11:45 AM', activity: 'Coding and DSA', details: 'Concepts (60m) + Problem solving (45m) + Review mistakes (15m)', category: 'technical' },
  { time: '11:45 AM–12:30 PM', activity: 'Lunch', details: 'Protein-focused meal (~45g protein: chicken/protein, rice, vegetables)', category: 'nutrition' },
  { time: '12:30–1:30 PM', activity: 'CTF practice', details: 'Hands-on beginner challenges on OverTheWire, picoCTF, or TryHackMe', category: 'technical' },
  { time: '1:30–2:00 PM', activity: 'Rest & screen off', details: 'Zero demanding screen work, mental reset, hydrate', category: 'recovery' },
  { time: '2:00–4:00 PM', activity: 'Vibe coding / projects', details: 'Build & deploy NetWatch dashboard, frontend & backend features', category: 'technical' },
  { time: '4:00–4:30 PM', activity: 'Side hustle', details: 'Video editing techniques, sample cuts, client identification', category: 'financial' },
  { time: '4:30–5:30 PM', activity: 'Break & pre-workout snack', details: 'Whey protein + banana (~25g protein), prep workout gear', category: 'nutrition' },
  { time: '5:30–7:00 PM', activity: 'Gym or kickboxing', details: 'Mon: Upper body | Tue: Kickboxing | Thu: Kickboxing | Fri: Full body', category: 'fitness' },
  { time: '7:00–8:00 PM', activity: 'Dinner & recovery', details: 'Protein & hydration (~35g protein: fish/chicken, roti, fresh veggies)', category: 'nutrition' },
  { time: '8:00–9:00 PM', activity: 'Income / revision', details: 'Client outreach, pitch messages, portfolio review, challenge notes', category: 'financial' },
  { time: '9:00–9:30 PM', activity: 'Plan tomorrow', details: 'Log daily checklist, record weight & notes, prep tomorrow clothes', category: 'mindfulness' },
  { time: '9:45 PM', activity: 'Sleep', details: 'Consistent wind-down, target 8 hours of deep restorative sleep', category: 'recovery' },
];

export const WATER_SLOTS = [
  { key: 'onWaking' as const, label: '5:45 AM On Waking', amount: '500 ml' },
  { key: 'afterRun' as const, label: '6:45 AM Post-Run', amount: '500 ml' },
  { key: 'morning' as const, label: 'Morning Deep Work', amount: '750 ml' },
  { key: 'lunch' as const, label: '12:00 PM Lunch Time', amount: '750 ml' },
  { key: 'afternoon' as const, label: 'Afternoon Vibe Coding', amount: '500 ml' },
  { key: 'training' as const, label: 'Pre/Post Evening Training', amount: '500 ml' },
  { key: 'evening' as const, label: 'Dinner & Evening Review', amount: '500 ml' },
];

export const OPERATING_RULES = [
  { id: 1, text: 'No starting a new course before completing the current learning block.' },
  { id: 2, text: 'No watching tutorials without implementing something immediately.' },
  { id: 3, text: 'Every cybersecurity topic must have a practical hands-on exercise.' },
  { id: 4, text: 'Every coding concept must produce a solved problem or functional project.' },
  { id: 5, text: 'Every website built must eventually be deployed to a public URL.' },
  { id: 6, text: 'Every video editing sample created must go into your client portfolio.' },
  { id: 7, text: 'Every single week must produce something demonstrable to show others.' },
  { id: 8, text: 'No sacrificing sleep to finish unnecessary tasks; consistency is paramount.' },
  { id: 9, text: 'Keep one full recovery day every week (Sundays are sacred rest).' },
  { id: 10, text: 'Review performance and record metrics every Sunday without fail.' },
];

export const RUNNING_PROGRESSION = [
  { period: 'Week 1 (Nov 28–Dec 4)', tuesday: '6 × 1 min fast (controlled)', friday: '10 min comfortably hard tempo', saturday: '30 min easy conversational long run' },
  { period: 'Week 2 (Dec 5–11)', tuesday: '6 × 400 m controlled intervals', friday: '15 min tempo pace', saturday: '35 min easy long run' },
  { period: 'Week 3 (Dec 12–18)', tuesday: '5 × 600 m intervals', friday: '18 min tempo pace', saturday: '40 min easy long run' },
  { period: 'Week 4 (Dec 19–25)', tuesday: '4 × 800 m intervals', friday: '20 min tempo pace', saturday: '40 min easy long run' },
  { period: 'Week 5 (Dec 26–Jan 1)', tuesday: '5 × 400 m speed sharpen', friday: '15 min tempo pace', saturday: '35 min easy long run' },
  { period: 'Final 4 Days (Jan 2–5)', tuesday: 'Short easy runs & recovery', friday: 'Light strides & shakeout', saturday: 'Official 5K Timed Test (< 30:00)' },
];

export const UPPER_BODY_EXERCISES = [
  { name: 'Incline Dumbbell Press', target: '3 sets × 8–12 reps', focus: 'Upper chest & anterior deltoid' },
  { name: 'Lat Pulldown', target: '3 sets × 8–12 reps', focus: 'Back width & lats' },
  { name: 'Seated Cable Row', target: '3 sets × 10–12 reps', focus: 'Mid back thickness & rhomboids' },
  { name: 'Overhead Shoulder Press', target: '2 sets × 8–12 reps', focus: 'Deltoid compound power' },
  { name: 'Lateral Raises', target: '3 sets × 12–15 reps', focus: 'Lateral delts for V-taper' },
  { name: 'Incline Bicep Curls', target: '2 sets × 10–15 reps', focus: 'Biceps peak' },
  { name: 'Triceps Rope Pushdown', target: '2 sets × 10–15 reps', focus: 'Triceps lateral & medial heads' },
];

export const FULL_BODY_EXERCISES = [
  { name: 'Squat or Leg Press', target: '3 sets × 8–12 reps', focus: 'Quad strength & athletic power' },
  { name: 'Romanian Deadlift (RDL)', target: '3 sets × 8–10 reps', focus: 'Hamstrings & posterior chain' },
  { name: 'Chest Press', target: '3 sets × 8–12 reps', focus: 'Pectoral hypertrophy' },
  { name: 'Chest-Supported Row', target: '3 sets × 8–12 reps', focus: 'Upper back posture' },
  { name: 'Lateral Raises', target: '3 sets × 12–15 reps', focus: 'Shoulder roundness' },
  { name: 'Hammer Curls', target: '2 sets × 10–12 reps', focus: 'Brachialis & forearm thickness' },
  { name: 'Hanging Knee Raises', target: '3 sets × 12 reps', focus: 'Core stability & hip flexors' },
];

export const CYBER_PHASES = [
  {
    phase: 1,
    dates: 'Nov 28 – Dec 4',
    title: 'Linux & Networking Foundations',
    topics: [
      'Linux filesystem, terminal navigation, file permissions & ownership',
      'Processes, system services, SSH, basic shell scripting',
      'OSI 7-Layer model & TCP/IP architecture',
      'IPv4 addressing, CIDR notation & subnetting basics',
      'TCP vs UDP, DNS, DHCP, HTTP/HTTPS common ports'
    ],
    practical: [
      'Complete OverTheWire Bandit wargame levels 0–10',
      'Install Wireshark and capture local DNS & HTTP/HTTPS traffic',
      'Hands-on lab with ping, traceroute, ip, ss, dig, and nslookup'
    ]
  },
  {
    phase: 2,
    dates: 'Dec 5 – Dec 11',
    title: 'Networking Tools & Project 1',
    topics: [
      'Subnetting & CIDR calculations',
      'TCP 3-way handshake deep dive & packet flags',
      'ARP resolution & routing tables',
      'Firewalls, packet filtering, and NAT principles',
      'Nmap scan types & Wireshark display filters',
      'Python socket programming fundamentals'
    ],
    practical: [
      'Build Project 1: Python Network Reconnaissance & Analysis Tool',
      'Implement authorized subnet ping scan & Nmap report generator'
    ]
  },
  {
    phase: 3,
    dates: 'Dec 12 – Dec 18',
    title: 'Web Security & CTF Fundamentals',
    topics: [
      'HTTP requests/responses, headers, cookies & session management',
      'Authentication mechanisms & access control vulnerabilities',
      'SQL Injection (SQLi) & Cross-Site Scripting (XSS) fundamentals',
      'Basic cryptography: encoding (Base64) vs encryption (AES) vs hashing (SHA-256)'
    ],
    practical: [
      'Burp Suite Community setup & request interception',
      'CyberChef recipe experimentation for encoded payloads',
      'Complete beginner web security labs on PortSwigger Web Security Academy'
    ]
  },
  {
    phase: 4,
    dates: 'Dec 19 – Dec 25',
    title: 'CTF Specialisation Across Categories',
    topics: [
      'Web: SQLi, XSS, broken authentication challenges',
      'Crypto: Classical ciphers, frequency analysis, RSA basics',
      'Forensics: File headers/magic bytes, metadata analysis (exiftool), PCAP parsing',
      'OSINT: Public record searching, digital footprint tracking',
      'Reverse Engineering: Inspecting strings, disassembler basics (Ghidra)'
    ],
    practical: [
      'Solve 10+ categorized challenges on picoCTF',
      'Document write-ups for every solved flag in personal markdown notes'
    ]
  },
  {
    phase: 5,
    dates: 'Dec 26 – Jan 1',
    title: 'CTF Competition Week',
    topics: [
      'Time management during competitive events',
      'Team collaboration and flag submission strategies',
      'Post-mortem challenge reviews'
    ],
    practical: [
      'Register for upcoming CTFs via CTFtime.org',
      'Participate in live beginner/intermediate competition',
      'Revisit unsolved challenges with published author write-ups'
    ]
  },
  {
    phase: 6,
    dates: 'Jan 2 – Jan 5',
    title: 'Final Technical Assessment & Portfolio',
    topics: [
      'Synthesizing 39 days of technical knowledge',
      'Clean Git version control & documentation standards'
    ],
    practical: [
      'Complete independent beginner CTF challenge set',
      'Publish clean GitHub repositories with structured READMEs',
      'Publish 2–3 comprehensive security write-ups',
      'Define next 3 targeted cybersecurity certifications/skills'
    ]
  }
];

export const DSA_TOPICS = [
  { topic: 'Arrays & Strings', targetCount: 10, defaultSolved: 0, sampleProblems: ['Two Sum', 'Valid Anagram', 'Sliding Window Maximum', 'Product of Array Except Self'] },
  { topic: 'Searching & Sorting', targetCount: 8, defaultSolved: 0, sampleProblems: ['Binary Search', 'Search in Rotated Sorted Array', 'Merge Intervals', 'Kth Largest Element'] },
  { topic: 'Linked Lists', targetCount: 6, defaultSolved: 0, sampleProblems: ['Reverse Linked List', 'Detect Cycle in Linked List', 'Merge Two Sorted Lists', 'LRU Cache Design'] },
  { topic: 'Stacks & Queues', targetCount: 6, defaultSolved: 0, sampleProblems: ['Valid Parentheses', 'Min Stack', 'Daily Temperatures', 'Sliding Window Queue'] },
  { topic: 'Trees & BST', targetCount: 8, defaultSolved: 0, sampleProblems: ['Maximum Depth of Binary Tree', 'Invert Binary Tree', 'Lowest Common Ancestor', 'Validate BST'] },
  { topic: 'Graphs (BFS / DFS)', targetCount: 5, defaultSolved: 0, sampleProblems: ['Number of Islands', 'Clone Graph', 'Course Schedule (Topological Sort)', 'Word Ladder'] },
  { topic: 'Revision & Timed Sets', targetCount: 7, defaultSolved: 0, sampleProblems: ['Mixed mock challenge under 30-minute clock', 'Review bug patterns & edge cases'] },
];

export const PRACTICAL_PYTHON_PROJECTS = [
  {
    id: 'projA',
    name: 'Project A: Server Log Analyser',
    deliverables: [
      'Parse Apache/Nginx web server and SSH access logs',
      'Extract IP addresses, HTTP status codes, and timestamps',
      'Identify brute-force attempts and repeated 401/403 status anomalies',
      'Output formatted incident summary report'
    ]
  },
  {
    id: 'projB',
    name: 'Project B: Network Port Scanner',
    deliverables: [
      'Python socket module client implementation',
      'Host ping reachability check',
      'Configurable multi-port scanning across authorized private lab',
      'Clean output reporting active services and banners'
    ]
  },
  {
    id: 'projC',
    name: 'Project C: Network Topology Visualiser',
    deliverables: [
      'Graph data structure representing network hosts and router nodes',
      'Implementation of BFS and DFS pathfinding to verify subnet reachability',
      'Visual ASCII / text graph matrix rendering connectivity and subnets'
    ]
  }
];

export const WEB_PROJECT_MILESTONES = [
  { date: 'Dec 4', deliverable: 'HTML, CSS & JS fundamentals solid, local dev environment ready' },
  { date: 'Dec 8', deliverable: 'First responsive landing page prototype built and tested on mobile' },
  { date: 'Dec 12', deliverable: 'React application framework with modular components' },
  { date: 'Dec 16', deliverable: 'Supabase / backend database & schema integration' },
  { date: 'Dec 20', deliverable: 'Main dashboard diagnostic tools & availability charts' },
  { date: 'Dec 24', deliverable: 'Authentication flow & private dashboard views' },
  { date: 'Dec 28', deliverable: 'Comprehensive testing, responsive QA, bug fixes' },
  { date: 'Jan 1', deliverable: 'Public deployment to Vercel with custom domain preview' },
  { date: 'Jan 5', deliverable: 'Polished GitHub README, video walk-through demo, and pitch deck' },
];

export const SIDE_HUSTLE_SKILLS = [
  'Cutting dead space & pauses seamlessly',
  'Animated captions & stylized subtitles',
  'Rhythmic jump cuts and pacing control',
  'Relevant B-roll placement and storytelling',
  'Impactful sound effects (whooshes, risers, pops)',
  'Audio frequency balancing & loudness normalization',
  'Basic color grading and clean contrast correction',
  'High-retention hooks crafted in the first 2 seconds',
  'Audience retention pacing (cuts every 2-4 seconds)',
  'Exporting crisp 1080x1920 9:16 reels with optimal bitrates'
];

export const PORTFOLIO_SAMPLE_TYPES = [
  { title: 'Podcast Clip', target: 'Dynamic multi-cam framing with highlighted speaker keywords' },
  { title: 'Gaming Highlight', target: 'Paced cuts synced with game audio, zoom punches, and SFX' },
  { title: 'Fitness Breakdown', target: 'Clean exercise form highlights, text overlays, and upbeat tempo' },
  { title: 'Educational Explainer', target: 'Illustrative B-roll, motion graphics, and clean captions' },
  { title: 'Business Promotional Clip', target: 'Direct value proposition, professional brand palette, clear CTA' },
];

export const PRICING_PACKAGES = [
  { package: '1 Short-Form Video', testPrice: '₹300 – ₹500', note: 'Ideal for trial samples' },
  { package: '5 Videos Pack', testPrice: '₹1,500 – ₹2,000', note: 'Standard weekly creator bundle' },
  { package: '10 Videos Pack', testPrice: '₹3,000 – ₹4,000', note: 'Bi-weekly retention retainer' },
  { package: 'Monthly Full Retainer', testPrice: '₹6,000 – ₹10,000', note: 'Daily short-form asset management' },
  { package: 'Client Landing Page', testPrice: '₹2,000 – ₹3,000', note: 'Single-page responsive showcase' },
  { package: 'Small Business Website', testPrice: '₹4,000 – ₹7,000', note: '3-4 page business presence' },
];

export const OUTREACH_TEMPLATE = `Hey [Name]! I came across your content and really liked what you're creating.

I'm a short-form video editor currently building my portfolio. I think some of your existing content could work really well as Instagram Reels and YouTube Shorts to drive more reach.

I'd love to edit a short free sample for you. If you like the style, we could discuss working together on a paid basis.

Would you be interested?`;

/**
 * COMPLETE AND VERIFIED SOURCES LIST
 * Added with explicit citations, authors, links, and goals mapping as demanded by user prompt.
 */
export const SOURCES_LIST: SourceCitation[] = [
  {
    id: 'issn-protein',
    category: 'Nutrition',
    title: 'International Society of Sports Nutrition (ISSN) Position Stand: Diets and Body Composition',
    authorOrOrg: 'ISSN (Journal of the International Society of Sports Nutrition / PubMed Central)',
    summary: 'Recommends 1.4–2.0 g protein/kg/day for active exercising individuals, noting that higher intakes (up to 2.3–3.1 g/kg of fat-free mass) preserve lean muscle mass during hypocaloric conditions (calorie restriction).',
    citationText: 'Campbell, B. et al. International Society of Sports Nutrition position stand: protein and exercise. J Int Soc Sports Nutr 4, 8 (2007). PMC2129147.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2129147/',
    associatedGoals: ['140g Daily Protein Target', '300–500 kcal Calorie Deficit with Muscle Retention']
  },
  {
    id: 'acsm-guidelines',
    category: 'Fitness',
    title: 'ACSM Guidelines for Exercise Testing and Prescription',
    authorOrOrg: 'American College of Sports Medicine (ACSM)',
    summary: 'Recommends adults perform resistance training on 2 or more non-consecutive days weekly targeting all major muscle groups. Concurrently manages running and conditioning volume to prevent overtraining syndrome.',
    citationText: 'Garber CE et al. Quantity and Quality of Exercise for Developing and Maintaining Cardiorespiratory, Musculoskeletal, and Neuromotor Fitness. Med Sci Sports Exerc. 2011;43(7):1334-1359.',
    url: 'https://www.acsm.org',
    associatedGoals: ['Monday Upper Body Gym', 'Friday Full-Body Aesthetic Gym', 'Rest & Recovery Protocol']
  },
  {
    id: 'tryhackme',
    category: 'Cybersecurity',
    title: 'TryHackMe Pre-Security & Cyber Security 101 Learning Paths',
    authorOrOrg: 'TryHackMe Ltd',
    summary: 'Structured practical hands-on labs teaching Linux fundamentals, networking (OSI, TCP/IP, DNS, HTTP), and foundational web security before attacking real targets.',
    citationText: 'TryHackMe Hands-on Security Training (Pre-Security Path & Cyber Security 101).',
    url: 'https://tryhackme.com/path/outline/cybersecurity101',
    associatedGoals: ['Phase 1 Linux Foundations', 'Phase 2 Networking Tools', 'OverTheWire to TryHackMe transition']
  },
  {
    id: 'overthewire',
    category: 'Cybersecurity',
    title: 'OverTheWire Bandit Wargame',
    authorOrOrg: 'OverTheWire Community',
    summary: 'A celebrated cybersecurity training ground designed specifically for absolute beginners to master Linux command-line navigation, file permissions, SSH, processes, and basic shell scripting.',
    citationText: 'OverTheWire Wargames: Bandit (Levels 0 to 10).',
    url: 'https://overthewire.org/wargames/bandit/',
    associatedGoals: ['Phase 1 Practical Linux Lab', 'Bandit Levels 0–10 Milestone']
  },
  {
    id: 'portswigger',
    category: 'Cybersecurity',
    title: 'PortSwigger Web Security Academy',
    authorOrOrg: 'PortSwigger Ltd (Creators of Burp Suite)',
    summary: 'The industry-standard interactive training platform for web application vulnerability discovery, including SQL injection, Cross-Site Scripting (XSS), CSRF, and authentication bypass.',
    citationText: 'PortSwigger Web Security Academy: Free Online Web Security Training.',
    url: 'https://portswigger.net/web-security/getting-started',
    associatedGoals: ['Phase 3 Web Security', 'Burp Suite Community Interception Lab', 'SQLi & XSS Labs']
  },
  {
    id: 'picoctf',
    category: 'Cybersecurity',
    title: 'picoCTF Educational Cybersecurity Platform',
    authorOrOrg: 'Carnegie Mellon University (CMU CyLab)',
    summary: 'Free computer security education program with capture-the-flag competitions, learning guides, and beginner-accessible challenges across Web, Cryptography, Forensics, and Reverse Engineering.',
    citationText: 'picoCTF Resources & Challenge Archive. Carnegie Mellon University.',
    url: 'https://picoctf.org/resources.html',
    associatedGoals: ['Phase 4 CTF Specialisation', '15–20 Independent CTF Challenges Target']
  },
  {
    id: 'ctftime',
    category: 'Cybersecurity',
    title: 'CTFtime.org Global CTF Competition Tracker',
    authorOrOrg: 'CTFtime Community',
    summary: 'The primary global directory and rating system for all public and sanctioned Capture The Flag cybersecurity competitions, rules, and post-competition team write-ups.',
    citationText: 'CTFtime Competition Calendar and Global Team Standings.',
    url: 'https://ctftime.org',
    associatedGoals: ['Phase 5 CTF Competition Week', 'Live CTF Participation & Team Collaboration']
  },
  {
    id: 'nextjs-docs',
    category: 'Web & Tools',
    title: 'Next.js App Router & Full-Stack Documentation',
    authorOrOrg: 'Vercel / Next.js Core Team',
    summary: 'Official comprehensive architecture guide for building performant React applications with server components, route handlers, and API endpoints.',
    citationText: 'Next.js Official Documentation & Getting Started Course. Vercel Inc.',
    url: 'https://nextjs.org/docs',
    associatedGoals: ['Full-Stack Web Development Stack', 'NetWatch Dashboard Project']
  },
  {
    id: 'github-student-pack',
    category: 'Web & Tools',
    title: 'GitHub Student Developer Pack',
    authorOrOrg: 'GitHub Education',
    summary: 'Provides free access to premium developer tools, cloud hosting credits, domains, and security scanning utilities to actively enrolled computer science students.',
    citationText: 'GitHub Education: Student Developer Pack Resources.',
    url: 'https://education.github.com/pack',
    associatedGoals: ['Tooling access for student devs', 'Free cloud databases & deployment domains']
  },
  {
    id: 'youtube-monetisation',
    category: 'Income Policy',
    title: 'YouTube Channel Monetisation Policies: Reused Content vs Original Value',
    authorOrOrg: 'YouTube / Google Help Center',
    summary: 'Clarifies that simply obtaining creator permission to clip third-party footage does not satisfy YouTube monetisation guidelines unless substantial original commentary, education, or creative transformation is added. Strong recommendation to sell editing services as a freelance provider rather than relying on unauthorized automated clipping.',
    citationText: 'YouTube Help: What kinds of content are eligible for monetisation (Reused Content Policy).',
    url: 'https://support.google.com/youtube/answer/1311392',
    associatedGoals: ['Side Hustle Strategy: Service Client Sales over Risky Clipping', 'Compliance & Ethics']
  }
];

export const INITIAL_PROSPECTS: any[] = [];

export const INITIAL_JOURNAL_ENTRIES: any[] = [];
