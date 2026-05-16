import type {
  ActivityItem,
  OperationalBadge,
  OperationalRouteSurface,
  Profile,
  QuarterWindow,
  UserRole,
} from "@/types";

const badge = (label: string, tone: OperationalBadge["tone"] = "default") => ({
  label,
  tone,
});

const item = <
  T extends {
    id: string;
    title: string;
    description: string;
  },
>(
  value: T,
) => value;

export const previewProfiles: Record<UserRole, Profile> = {
  employee: {
    id: "profile-priya",
    name: "Priya Sharma",
    email: "priya@demo.missionos.app",
    role: "employee",
    department: "Engineering",
    manager_id: "profile-arjun",
    avatar_url: null,
  },
  manager: {
    id: "profile-arjun",
    name: "Arjun Nair",
    email: "arjun@demo.missionos.app",
    role: "manager",
    department: "Engineering",
    manager_id: null,
    avatar_url: null,
  },
  admin: {
    id: "profile-neha",
    name: "Neha Gupta",
    email: "neha@demo.missionos.app",
    role: "admin",
    department: "People Operations",
    manager_id: null,
    avatar_url: null,
  },
};

export const previewQuarter: QuarterWindow = {
  id: "quarter-q2-2026",
  quarter: "Q2-2026",
  phase: "mission_sync",
  opens_at: "2026-04-01",
  closes_at: "2026-06-28",
  is_active: true,
};

const employeeActivity: ActivityItem[] = [
  {
    id: "activity-employee-1",
    title: "Reliability Control Plane moved into final integration",
    description:
      "Your API resilience mission now has the June 23 release gate attached to the quarter plan.",
    timestamp: "May 16, 10:20",
  },
  {
    id: "activity-employee-2",
    title: "Partner onboarding milestone acknowledged",
    description:
      "Arjun added a note highlighting activation gains from the latest onboarding sequence cleanup.",
    timestamp: "May 15, 17:10",
  },
  {
    id: "activity-employee-3",
    title: "Sync evidence bundle requested",
    description:
      "You have two missions that need a concise before-and-after narrative before the next check-in window.",
    timestamp: "May 14, 14:35",
  },
];

const managerActivity: ActivityItem[] = [
  {
    id: "activity-manager-1",
    title: "Three direct reports updated this week's narrative",
    description:
      "Priya, Rahul, and Sneha all pushed fresh context into their mission summaries before standup.",
    timestamp: "May 16, 09:40",
  },
  {
    id: "activity-manager-2",
    title: "Incident review cadence slipped below the safe range",
    description:
      "The weekly remediation loop is now one sync behind and needs a clearer owner handoff.",
    timestamp: "May 15, 15:20",
  },
  {
    id: "activity-manager-3",
    title: "Leadership review queue widened",
    description:
      "Two missions need tighter success metrics before they are ready for cross-functional review.",
    timestamp: "May 14, 11:50",
  },
];

const adminActivity: ActivityItem[] = [
  {
    id: "activity-admin-1",
    title: "Shared launch readiness pack propagated to three departments",
    description:
      "Engineering, Revenue, and Support now share the same launch checkpoint narrative for the quarter close.",
    timestamp: "May 16, 08:35",
  },
  {
    id: "activity-admin-2",
    title: "Org momentum snapshot refreshed for leadership prep",
    description:
      "Department progress, review pressure, and governance watchpoints were consolidated for the Friday brief.",
    timestamp: "May 15, 16:05",
  },
  {
    id: "activity-admin-3",
    title: "Role override and access trail remained clean",
    description:
      "No permission drift surfaced in the latest audit pass across admin and shared mission surfaces.",
    timestamp: "May 14, 09:10",
  },
];

const missionBoardItems = [
  item({
    id: "mission-reliability-control-plane",
    title: "Reliability Control Plane",
    description:
      "Reduce Sev-2 recovery time by standardizing rollback controls across the API gateway and worker fleet.",
    detail: "Next milestone: release candidate freeze on June 23.",
    meta: ["Owner: Priya Sharma", "Domain: Platform", "Updated: 2 hours ago"],
    badges: [badge("82% complete", "accent"), badge("Steady", "success")],
    progress: 82,
    href: "/missions/mission-reliability-control-plane",
  }),
  item({
    id: "mission-onboarding-activation-loop",
    title: "Onboarding Activation Loop",
    description:
      "Lift week-one activation by tightening handoff copy, setup prompts, and success cues for partner teams.",
    detail: "Support and Product both signed off on the final metric window.",
    meta: ["Owner: Rahul Mehta", "Domain: Product Growth", "Updated: Yesterday"],
    badges: [badge("74% complete", "accent"), badge("Ahead", "success")],
    progress: 74,
    href: "/missions/mission-onboarding-activation-loop",
  }),
  item({
    id: "mission-deal-desk-turnaround",
    title: "Deal Desk Turnaround",
    description:
      "Cut redline turnaround time for strategic deals by tightening request routing and escalation coverage.",
    detail: "Operations needs one more pricing exception pattern locked before close.",
    meta: ["Owner: Sneha Iyer", "Domain: Revenue Ops", "Updated: 5 hours ago"],
    badges: [badge("61% complete", "warning"), badge("Watch", "warning")],
    progress: 61,
    href: "/missions/mission-deal-desk-turnaround",
  }),
  item({
    id: "mission-incident-review-cadence",
    title: "Incident Review Cadence",
    description:
      "Restore weekly incident closure discipline by aligning action owners, due dates, and review rituals.",
    detail: "A recurring owner gap is keeping the final remediation column soft.",
    meta: ["Owner: Dev Malhotra", "Domain: Quality", "Updated: 1 day ago"],
    badges: [badge("54% complete", "warning"), badge("Needs attention", "warning")],
    progress: 54,
    href: "/missions/mission-incident-review-cadence",
  }),
  item({
    id: "mission-hiring-loop-compression",
    title: "Hiring Loop Compression",
    description:
      "Bring interview cycle time under nine business days without eroding hiring manager quality signals.",
    detail: "People Ops is waiting on one final interviewer calibration pack.",
    meta: ["Owner: Meera Rao", "Domain: People Ops", "Updated: 3 hours ago"],
    badges: [badge("67% complete", "accent"), badge("Recovering", "accent")],
    progress: 67,
    href: "/missions/mission-hiring-loop-compression",
  }),
];

const syncTimelineItems = [
  item({
    id: "sync-1",
    title: "May 18 narrative check-in",
    description:
      "Owners update what changed this week, what moved the number, and what still needs leadership help.",
    meta: ["Scope: Active missions", "Audience: Managers"],
    badges: [badge("Upcoming", "accent")],
  }),
  item({
    id: "sync-2",
    title: "May 24 leadership sweep",
    description:
      "Managers translate team updates into executive-ready momentum language before the close window tightens.",
    meta: ["Scope: Cross-team", "Audience: Leadership"],
    badges: [badge("Planned", "default")],
  }),
  item({
    id: "sync-3",
    title: "June 28 quarter lock",
    description:
      "Progress stories, risk calls, and final evidence need to be stable before the quarter is frozen.",
    meta: ["Scope: Org-wide", "Audience: Admin"],
    badges: [badge("Fixed date", "warning")],
  }),
];

const insightItems = [
  item({
    id: "insight-1",
    title: "Momentum is strongest where owners control the final narrative",
    description:
      "Teams with clear weekly evidence bundles are holding their progress bands even when execution is noisy.",
    detail: "Recommended move: preserve the evidence template now being used in Platform and Growth.",
    meta: ["Confidence: High", "Signal source: 14 seeded updates"],
    badges: [badge("Pattern", "success")],
  }),
  item({
    id: "insight-2",
    title: "Review pressure is clustering around ambiguous success measures",
    description:
      "The review queue is growing around missions whose target language is still descriptive instead of measurable.",
    detail: "Recommended move: require one hard measure and one proof artifact in every review note.",
    meta: ["Confidence: Medium", "Risk level: Manager-visible"],
    badges: [badge("Watch", "warning")],
  }),
  item({
    id: "insight-3",
    title: "Shared missions improve story quality before they improve scores",
    description:
      "Cross-functional missions are producing cleaner updates even when headline percentages lag behind single-team work.",
    detail: "Recommended move: keep shared mission language consistent before expanding program count.",
    meta: ["Confidence: Medium", "Observed in: Launch readiness"],
    badges: [badge("Recommendation", "accent")],
  }),
];

const auditItems = [
  item({
    id: "audit-1",
    title: "Neha Gupta updated shared mission visibility",
    description:
      "Launch readiness recipients were expanded to include Revenue Enablement and Support leadership.",
    meta: ["Category: Access scope", "May 16, 08:12"],
    badges: [badge("Governance", "accent")],
  }),
  item({
    id: "audit-2",
    title: "Arjun Nair returned Deal Desk Turnaround for tighter metrics",
    description:
      "The mission remained in the review queue until response time and approval handoff thresholds were clarified.",
    meta: ["Category: Review action", "May 15, 14:05"],
    badges: [badge("Review", "warning")],
  }),
  item({
    id: "audit-3",
    title: "Role override cookie reset after employee session handoff",
    description:
      "The demo role surface reverted cleanly to the source profile after the sign-out boundary completed.",
    meta: ["Category: Session event", "May 14, 17:42"],
    badges: [badge("Session", "default")],
  }),
  item({
    id: "audit-4",
    title: "Reliability Control Plane target window adjusted",
    description:
      "The milestone moved from June 20 to June 23 after Platform absorbed the final gateway dependency.",
    meta: ["Category: Mission change", "May 14, 10:18"],
    badges: [badge("Timeline", "accent")],
  }),
];

const employeeRoutes: Record<string, OperationalRouteSurface> = {
  "/": {
    stats: [
      { label: "Active Missions", value: "5", tone: "default", detail: "2 shared with adjacent teams" },
      { label: "Average Progress", value: "78%", tone: "accent", detail: "Holding steady across Q2" },
      { label: "Syncs This Week", value: "2", tone: "warning", detail: "Both need proof artifacts" },
      { label: "Focus Areas", value: "3", tone: "success", detail: "Platform, Growth, Quality" },
    ],
    hero: {
      label: "Mission Outlook",
      title: "Your quarter already reads like active operating work.",
      description:
        "MissionOS now frames your delivery lane as a living portfolio: clear progress bands, narrative checkpoints, and visible dependencies instead of empty product scaffolding.",
      highlights: [
        { label: "Top lane", value: "Reliability", detail: "Platform recovery work is 82% through the quarter plan." },
        { label: "Best lift", value: "+11 pts", detail: "Partner onboarding improved after the latest setup prompt release." },
        { label: "Watchpoint", value: "1 lane", detail: "Incident review cadence still needs a cleaner owner handoff." },
      ],
      noteTitle: "What leadership sees from this seat",
      noteBody:
        "Your strongest missions are the ones with clean weekly evidence. The shell now makes that story visible before any backend workflow logic exists.",
      noteHighlights: [
        "Two missions are already framed with before-and-after proof.",
        "The next sync window closes on May 18 with no route changes needed.",
        "Cross-functional alignment is concentrated in launch and reliability work.",
      ],
    },
    primary: {
      label: "Momentum Board",
      title: "Mission pulse across your current portfolio",
      description:
        "Each mission now shows ownership, narrative state, and its next operational checkpoint inside a board that can support real execution later.",
      layout: "grid",
      items: missionBoardItems.slice(0, 4),
    },
    secondary: {
      label: "Sync Rhythm",
      title: "Recent and upcoming sync moments",
      description:
        "The sync lane stays focused on cadence, story quality, and deadlines instead of pretending the scoring engine already exists.",
      layout: "timeline",
      items: [
        item({
          id: "employee-sync-1",
          title: "Reliability Control Plane update drafted",
          description:
            "Priya's latest note ties error-budget recovery directly to the rollback controls now in staging.",
          meta: ["Owner: Priya Sharma", "Due: May 18"],
          badges: [badge("Ready for review", "success")],
        }),
        item({
          id: "employee-sync-2",
          title: "Onboarding Activation Loop evidence attached",
          description:
            "Growth added activation funnel screenshots and partner onboarding anecdotes to support the current lift.",
          meta: ["Owner: Rahul Mehta", "Due: May 18"],
          badges: [badge("Strong narrative", "accent")],
        }),
        item({
          id: "employee-sync-3",
          title: "Incident Review Cadence still missing final proof",
          description:
            "The mission is progressing, but the closure-rate artifact still needs a sharper owner handoff.",
          meta: ["Owner: Dev Malhotra", "Due: May 18"],
          badges: [badge("Needs evidence", "warning")],
        }),
      ],
    },
    support: [
      {
        label: "Focus Areas",
        title: "Where to protect momentum this week",
        body:
          "The board is healthiest when you keep narrative quality high in the missions that leadership will cite out loud.",
        highlights: [
          "Keep the June 23 freeze visible inside Reliability Control Plane.",
          "Turn activation gains into a repeatable story for Growth.",
          "Clarify the final owner step inside Incident Review Cadence.",
        ],
      },
      {
        label: "Context",
        title: "Why this shell now feels production-ready",
        body:
          "Nothing here relies on CRUD or hidden orchestration, but the information hierarchy is already strong enough for screenshots, walkthroughs, and role-based demos.",
        highlights: [
          "No dead-end pages or generic filler states remain.",
          "Progress, ownership, and time windows all stay visible at a glance.",
          "Every panel supports a believable next conversation with a manager.",
        ],
      },
    ],
    activity: employeeActivity,
  },
  "/missions": {
    stats: [
      { label: "Board Missions", value: "5", tone: "default", detail: "4 personal, 1 shared" },
      { label: "Healthy Bands", value: "3", tone: "success", detail: "Clear narrative and measurable lift" },
      { label: "Needs Attention", value: "2", tone: "warning", detail: "Narrative or owner gap still visible" },
      { label: "Quarter Close", value: "43d", tone: "accent", detail: "Until June 28 lock" },
    ],
    hero: {
      label: "Mission Board",
      title: "A believable board for active quarter work.",
      description:
        "The mission surface now carries enough operational density for demos: grouped progress, visible owners, and next milestone language that reads like a live product.",
      highlights: [
        { label: "Most mature", value: "82%", detail: "Reliability Control Plane is closest to quarter-ready proof." },
        { label: "Shared work", value: "2 lanes", detail: "Growth and launch work already span multiple teams." },
        { label: "Review load", value: "1 mission", detail: "Deal Desk Turnaround needs tighter success framing." },
      ],
      noteTitle: "Board operating posture",
      noteBody:
        "This route avoids table-heavy emptiness by treating each mission like a narrative object with status, owner, timing, and context.",
      noteHighlights: [
        "Progress bars show confidence, not fake precision.",
        "Mission cards point naturally into detail views.",
        "Timeline context stays visible without becoming a chart engine.",
      ],
    },
    primary: {
      label: "Grouped Missions",
      title: "Current mission cards",
      description:
        "Mission cards are grouped by operational readiness so screenshots immediately tell a story about where attention should go.",
      layout: "grid",
      items: missionBoardItems,
    },
    secondary: {
      label: "Quarter Map",
      title: "Milestones shaping the board",
      description:
        "The right rail frames upcoming quarter pressure points so the board feels tied to organizational time, not static mock data.",
      layout: "timeline",
      items: syncTimelineItems,
    },
    support: [
      {
        label: "Ownership Load",
        title: "Where concentration risk is showing up",
        body:
          "Platform and Revenue Ops are carrying the highest concentration of visible quarter risk right now.",
        highlights: [
          "Priya is still the owner with the clearest proof bundle.",
          "Sneha's lane needs one final metric boundary before review.",
          "Dev's cadence mission is the softest card in the portfolio.",
        ],
      },
      {
        label: "Dependencies",
        title: "Cross-functional links that matter",
        body:
          "The board now hints at realistic workflow relationships without pretending approval or planning systems already exist.",
        highlights: [
          "Reliability depends on gateway release sequencing.",
          "Activation work depends on Product Marketing copy cleanup.",
          "Deal Desk Turnaround depends on pricing exception coverage.",
        ],
      },
    ],
  },
  "/missions/new": {
    stats: [
      { label: "Blueprint Steps", value: "3", tone: "default", detail: "Intent, measure, operating rhythm" },
      { label: "Reference Missions", value: "4", tone: "accent", detail: "High-quality seeded examples" },
      { label: "Scope Guardrails", value: "2", tone: "warning", detail: "Avoid vague or multi-owner framing" },
      { label: "Leadership Inputs", value: "1", tone: "success", detail: "Manager narrative comes later" },
    ],
    hero: {
      label: "Mission Composer",
      title: "A guided mission setup surface without CRUD bloat.",
      description:
        "Instead of a blank enterprise form, the create route now reads like a premium drafting workflow with clear expectations and realistic examples.",
      highlights: [
        { label: "Draft posture", value: "Intent first", detail: "Start with the outcome before filling in mechanics." },
        { label: "Best anchor", value: "1 measure", detail: "Every strong mission needs one primary proof line." },
        { label: "Common trap", value: "Multi-team blur", detail: "Shared work still needs a single accountable owner." },
      ],
      noteTitle: "What this route proves",
      noteBody:
        "The shell can now stage guided operational behavior without implementing a real mutation system or approval engine underneath it.",
      noteHighlights: [
        "Step framing is visible and mobile-friendly.",
        "Example missions make the page feel immediately useful.",
        "The route feels prepared for a real form later, not blocked by one now.",
      ],
    },
    primary: {
      label: "Draft Sequence",
      title: "How strong missions are framed here",
      description:
        "The flow is designed to help teams start with strategic clarity and only then translate that into a measurable operating target.",
      layout: "grid",
      items: [
        item({
          id: "compose-step-1",
          title: "Frame the operating outcome",
          description:
            "Name the mission in a way leadership could repeat in a room without needing extra translation.",
          detail: "Good example: Reduce Sev-2 recovery time by standardizing rollback controls.",
          meta: ["Step 1", "Clarity before tooling"],
          badges: [badge("Intent", "accent")],
        }),
        item({
          id: "compose-step-2",
          title: "Choose one measurable proof line",
          description:
            "Attach one metric or deadline that makes progress legible during syncs and review cycles.",
          detail: "Good example: Move recovery time from 44 to 25 minutes by June 23.",
          meta: ["Step 2", "Metric or date"],
          badges: [badge("Measure", "success")],
        }),
        item({
          id: "compose-step-3",
          title: "Define the weekly operating rhythm",
          description:
            "Call out how the work will stay visible inside the quarter so it never becomes a static aspiration.",
          detail: "Good example: weekly evidence pack, owner note, and risk flag.",
          meta: ["Step 3", "Narrative discipline"],
          badges: [badge("Rhythm", "warning")],
        }),
      ],
    },
    secondary: {
      label: "Reference Library",
      title: "Seeded archetypes that make the flow feel real",
      description:
        "These examples keep the page grounded in operational language instead of generic placeholder form copy.",
      layout: "stack",
      items: [
        item({
          id: "reference-1",
          title: "Reliability mission",
          description:
            "Best when the title focuses on the operational outcome and the metric proves the change under stress.",
          meta: ["Best for: Engineering", "Signal: Incident reduction"],
          badges: [badge("Platform", "accent")],
        }),
        item({
          id: "reference-2",
          title: "Activation mission",
          description:
            "Best when the measure is week-one behavior, not just internal delivery completion.",
          meta: ["Best for: Product Growth", "Signal: Activation lift"],
          badges: [badge("Growth", "success")],
        }),
        item({
          id: "reference-3",
          title: "Operational throughput mission",
          description:
            "Best when the mission combines response time, ownership, and one clear escalation threshold.",
          meta: ["Best for: Revenue Ops", "Signal: Turnaround quality"],
          badges: [badge("Operations", "warning")],
        }),
      ],
    },
    support: [
      {
        label: "Guardrails",
        title: "What weak drafts usually get wrong",
        body:
          "The page now teaches what good mission language sounds like before any validation engine exists.",
        highlights: [
          "Avoid titles that describe projects instead of outcomes.",
          "Avoid three measures when one clear anchor will do.",
          "Avoid shared accountability without a single narrative owner.",
        ],
      },
      {
        label: "Readiness",
        title: "How this supports later product depth",
        body:
          "When the actual form arrives, it can slot directly into this layout without changing the surrounding hierarchy, spacing, or CTA posture.",
        highlights: [
          "Header and step rhythm are already locked.",
          "Reference examples can later become templates.",
          "Right-side coaching context can absorb validation feedback.",
        ],
      },
    ],
  },
  "/syncs": {
    stats: [
      { label: "Due This Week", value: "3", tone: "warning", detail: "Two ready, one still thin" },
      { label: "Strong Narratives", value: "2", tone: "success", detail: "Evidence and outcome both visible" },
      { label: "Open Risks", value: "1", tone: "warning", detail: "Owner handoff still soft" },
      { label: "Quarter Checkpoints", value: "3", tone: "accent", detail: "Before the June 28 lock" },
    ],
    hero: {
      label: "Syncs",
      title: "A cadence surface that feels tied to real team motion.",
      description:
        "The sync route now frames check-ins as operational continuity: what moved, what needs evidence, and which moments are about to matter most.",
      highlights: [
        { label: "Ready now", value: "2 updates", detail: "Reliability and Activation both have narrative-proof alignment." },
        { label: "Tightest date", value: "May 18", detail: "The next manager sweep depends on clean individual updates." },
        { label: "Risk lane", value: "1 mission", detail: "Incident Review Cadence still needs a clearer proof artifact." },
      ],
      noteTitle: "Cadence framing",
      noteBody:
        "This surface stays credible by emphasizing timing, narrative quality, and operational continuity instead of fake calculations or real-time noise.",
      noteHighlights: [
        "Time windows are explicit and believable.",
        "Rows read like live check-ins rather than scaffolding.",
        "The route can absorb real sync logic later without a layout rewrite.",
      ],
    },
    primary: {
      label: "Upcoming Syncs",
      title: "What needs to move before the next review window",
      description:
        "Each row pairs mission context with a clear next expectation, which is enough to make the page feel operationally alive today.",
      layout: "stack",
      items: [
        item({
          id: "sync-row-1",
          title: "Reliability Control Plane",
          description:
            "Update the release candidate note with final rollback timings from the staging soak.",
          detail: "The mission already has strong proof; this update sharpens leadership confidence.",
          meta: ["Owner: Priya Sharma", "Due: May 18"],
          badges: [badge("Ready to send", "success")],
          progress: 82,
        }),
        item({
          id: "sync-row-2",
          title: "Onboarding Activation Loop",
          description:
            "Convert the current activation lift into one concise weekly narrative before the manager sweep.",
          detail: "Best evidence so far: partner setup conversion increased after the new prompt sequence.",
          meta: ["Owner: Rahul Mehta", "Due: May 18"],
          badges: [badge("Narrative strong", "accent")],
          progress: 74,
        }),
        item({
          id: "sync-row-3",
          title: "Incident Review Cadence",
          description:
            "Attach the unresolved closure-rate artifact and name the final owner for weekly remediation follow-through.",
          detail: "The work is moving, but the proof line is still softer than the rest of the board.",
          meta: ["Owner: Dev Malhotra", "Due: May 18"],
          badges: [badge("Needs proof", "warning")],
          progress: 54,
        }),
      ],
    },
    secondary: {
      label: "Cadence Timeline",
      title: "The sequence shaping this route",
      description:
        "The quarter rhythm is visible from the page itself, which makes the product feel like it already supports a real operating cadence.",
      layout: "timeline",
      items: syncTimelineItems,
    },
    support: [
      {
        label: "Continuity",
        title: "Why these seeded states feel believable",
        body:
          "Each update is tied to a realistic sentence someone would actually write in a weekly mission sync.",
        highlights: [
          "Progress is varied but not theatrical.",
          "Owners and deadlines line up with the board view.",
          "No row claims automation or analytics that do not exist yet.",
        ],
      },
      {
        label: "Support",
        title: "How teams can use this during a demo",
        body:
          "The route is ready for walkthroughs that explain cadence discipline, quarter pressure, and narrative quality without requiring backend depth.",
        highlights: [
          "Start with the due-this-week stack.",
          "Use the timeline to anchor the quarter story.",
          "End with the risk lane that still needs evidence.",
        ],
      },
    ],
  },
  "/insights": {
    stats: [
      { label: "Signals Surfaced", value: "6", tone: "default", detail: "Across momentum, risk, and shared work" },
      { label: "Actionable Threads", value: "3", tone: "accent", detail: "Each has a next-step recommendation" },
      { label: "High Confidence", value: "2", tone: "success", detail: "Rooted in repeated operating patterns" },
      { label: "Watch Signals", value: "1", tone: "warning", detail: "Review pressure is still clustering" },
    ],
    hero: {
      label: "Momentum Insights",
      title: "Static intelligence, believable operating value.",
      description:
        "This route now reads like ambient product intelligence: summaries, observations, and recommendations embedded in the shell instead of a generic chatbot stub.",
      highlights: [
        { label: "Strongest pattern", value: "Evidence quality", detail: "Teams with cleaner proof bundles are keeping momentum steadier." },
        { label: "Key warning", value: "Metric ambiguity", detail: "Review pressure keeps clustering around vague mission language." },
        { label: "Best next step", value: "Standardize proof", detail: "Shared evidence patterns are more valuable than extra reporting." },
      ],
      noteTitle: "What this insight layer is doing",
      noteBody:
        "It frames operational observation as premium context around the rest of the product, which is exactly where believable AI-style value belongs at this phase.",
      noteHighlights: [
        "Summary cards feel plausible without real AI calls.",
        "Recommendations stay grounded in visible seeded behavior.",
        "The page strengthens demos instead of becoming a gimmick.",
      ],
    },
    primary: {
      label: "Observed Signals",
      title: "What the shell is surfacing right now",
      description:
        "Each card behaves like a concise intelligence note: clear observation, supporting context, and a crisp recommendation.",
      layout: "stack",
      items: insightItems,
    },
    secondary: {
      label: "Recommendation Flow",
      title: "Where intelligence should push next",
      description:
        "The side lane keeps the page oriented around practical movement rather than faux analysis depth.",
      layout: "timeline",
      items: [
        item({
          id: "insight-flow-1",
          title: "Tighten mission success language before review",
          description:
            "The highest-return intervention is to clean up mission measures before the queue gets wider.",
          meta: ["Impact: Review quality", "Owner: Managers"],
          badges: [badge("Immediate", "warning")],
        }),
        item({
          id: "insight-flow-2",
          title: "Replicate the strongest evidence bundle format",
          description:
            "Platform and Growth both show that a compact evidence template creates better weekly narratives.",
          meta: ["Impact: Sync quality", "Owner: Teams"],
          badges: [badge("High leverage", "accent")],
        }),
        item({
          id: "insight-flow-3",
          title: "Expand shared mission language only after it is stable",
          description:
            "Cross-functional programs should keep a single operating story before more teams are added to the recipient map.",
          meta: ["Impact: Shared execution", "Owner: Admin"],
          badges: [badge("Strategic", "success")],
        }),
      ],
    },
    support: [
      {
        label: "Risk Framing",
        title: "What the page deliberately does not fake",
        body:
          "There is no live model output or orchestration here, but the page still earns its place by sounding like useful operational intelligence.",
        highlights: [
          "No chat UI, no novelty widgets, no empty space.",
          "Every observation ties back to visible board behavior.",
          "Confidence language stays restrained and believable.",
        ],
      },
      {
        label: "Demo Value",
        title: "How this strengthens storytelling",
        body:
          "MissionOS now has a premium place to discuss risk, momentum, and recommendations during a walkthrough without overpromising technical depth.",
        highlights: [
          "Open with the strongest pattern.",
          "Move to the warning about review pressure.",
          "Close on the one or two recommendations worth acting on.",
        ],
      },
    ],
  },
};

const managerRoutes: Record<string, OperationalRouteSurface> = {
  ...employeeRoutes,
  "/": {
    stats: [
      { label: "Team Missions", value: "8", tone: "default", detail: "Across Platform, Growth, and Quality" },
      { label: "Average Progress", value: "69%", tone: "accent", detail: "Two lanes need sharper coaching" },
      { label: "Awaiting Review", value: "3", tone: "warning", detail: "All before the May 24 sweep" },
      { label: "High-Confidence Lanes", value: "4", tone: "success", detail: "Clear owner and proof lines" },
    ],
    hero: {
      label: "Manager Outlook",
      title: "A command surface for coaching, triage, and alignment.",
      description:
        "Manager mode now feels distinctly operational: a clear view of team momentum, review pressure, and where narrative quality still needs intervention.",
      highlights: [
        { label: "Strongest lane", value: "Platform", detail: "Reliability work is closest to quarter-ready." },
        { label: "Queue pressure", value: "3 items", detail: "Review load widened after this week's submissions." },
        { label: "Team risk", value: "2 lanes", detail: "Revenue Ops and Quality both need tighter proof." },
      ],
      noteTitle: "How this view earns trust",
      noteBody:
        "The page emphasizes signal density and coaching posture rather than admin complexity, which keeps the manager lens calm but clearly active.",
      noteHighlights: [
        "Mission cards surface owner and narrative quality together.",
        "Recent sync movement is close to the board, not hidden in another route.",
        "The queue now feels like part of the same operating system.",
      ],
    },
    primary: {
      label: "Team Momentum",
      title: "Which missions are moving, which need intervention",
      description:
        "This board is tuned for coaching: high-confidence lanes are visible, and soft spots surface through narrative and timing rather than fake analytics.",
      layout: "grid",
      items: missionBoardItems.slice(0, 5),
    },
    secondary: {
      label: "Review Pressure",
      title: "What is shaping the next manager sweep",
      description:
        "The queue pressure lane keeps pending work visible from the dashboard so the product feels connected route to route.",
      layout: "timeline",
      items: [
        item({
          id: "manager-pressure-1",
          title: "Deal Desk Turnaround still needs one measurable service boundary",
          description:
            "Sneha clarified ownership, but the mission still needs a sharper turnaround promise before review.",
          meta: ["Submitted: May 15", "Owner: Sneha Iyer"],
          badges: [badge("Awaiting revision", "warning")],
        }),
        item({
          id: "manager-pressure-2",
          title: "Incident Review Cadence needs a single accountable closer",
          description:
            "The mission has useful work behind it, but its final weekly closure owner still feels diffused.",
          meta: ["Submitted: May 15", "Owner: Dev Malhotra"],
          badges: [badge("Manager note added", "accent")],
        }),
        item({
          id: "manager-pressure-3",
          title: "Launch readiness shared mission is ready for cross-team review",
          description:
            "Evidence quality is strong enough to carry into the next leadership brief without rework.",
          meta: ["Submitted: May 16", "Owner: Priya Sharma"],
          badges: [badge("Ready for leadership", "success")],
        }),
      ],
    },
    support: [
      {
        label: "Coaching Lens",
        title: "Where your intervention changes the outcome",
        body:
          "The strongest use of manager time is still clarifying measures and owners before the quarter lock gets closer.",
        highlights: [
          "Push vague metrics into one explicit proof line.",
          "Name the closer on any mission with cross-team execution.",
          "Preserve the strong evidence template already working in Platform.",
        ],
      },
      {
        label: "Team Story",
        title: "What the screenshot now communicates",
        body:
          "This route no longer reads like an employee dashboard with extra nav. It reads like a real manager seat with oversight and pressure.",
        highlights: [
          "Board, queue, and activity surfaces speak the same visual language.",
          "Progress states are varied enough to feel lived-in.",
          "Leadership can be discussed here without opening admin views.",
        ],
      },
    ],
    activity: managerActivity,
  },
  "/missions": {
    ...employeeRoutes["/missions"],
    stats: [
      { label: "Managed Missions", value: "8", tone: "default", detail: "5 direct, 3 shared" },
      { label: "Ahead of Plan", value: "4", tone: "success", detail: "Narrative and proof both intact" },
      { label: "Review Candidates", value: "3", tone: "warning", detail: "Need manager attention this week" },
      { label: "Quarter Pressure", value: "Moderate", tone: "accent", detail: "June 28 close is visible" },
    ],
    hero: {
      label: "Mission Board",
      title: "Board composition tuned for manager oversight.",
      description:
        "The same board now reads at team level: who owns the work, what is slipping, and which missions are ready for leadership-facing storytelling.",
      highlights: [
        { label: "Ready for review", value: "3", detail: "Three cards are close to leadership-ready." },
        { label: "Softest band", value: "54%", detail: "Incident Review Cadence still lacks a crisp proof line." },
        { label: "Shared coverage", value: "3 lanes", detail: "Shared work now has believable board weight." },
      ],
      noteTitle: "Why this board works for demos",
      noteBody:
        "The route feels like an active management surface rather than a polished empty state, even though the workflow engine is intentionally absent.",
      noteHighlights: [
        "Card density supports conversations about coaching and priorities.",
        "Links into mission detail keep the board alive.",
        "The right rail keeps quarter timing in play.",
      ],
    },
  },
  "/syncs": {
    ...employeeRoutes["/syncs"],
    stats: [
      { label: "Pending Updates", value: "5", tone: "default", detail: "Across direct and shared lanes" },
      { label: "Review-Ready", value: "2", tone: "success", detail: "Clear enough for leadership sweep" },
      { label: "Needs Coaching", value: "3", tone: "warning", detail: "Measure, proof, or owner still soft" },
      { label: "Next Sweep", value: "May 24", tone: "accent", detail: "Manager consolidation window" },
    ],
    hero: {
      label: "Syncs",
      title: "Manager cadence is about narrative quality, not status spam.",
      description:
        "This version of the sync route helps a manager understand which updates are ready, which need coaching, and how close the next sweep is.",
      highlights: [
        { label: "Narrative-ready", value: "2", detail: "Reliability and launch readiness are both strong." },
        { label: "Coaching load", value: "3", detail: "Three updates need clearer evidence or ownership." },
        { label: "Next consolidation", value: "May 24", detail: "Leadership prep starts from these notes." },
      ],
      noteTitle: "Manager posture",
      noteBody:
        "The page keeps the rhythm operational by translating syncs into coaching opportunities, not synthetic dashboard noise.",
      noteHighlights: [
        "Rows identify the real intervention required.",
        "Dates and owners line up with the rest of the shell.",
        "The page can scale into real review logic later.",
      ],
    },
  },
  "/team": {
    stats: [
      { label: "Direct Reports", value: "6", tone: "default", detail: "Across three active workstreams" },
      { label: "Healthy Load", value: "4", tone: "success", detail: "Balanced momentum and narrative quality" },
      { label: "Coaching Watch", value: "2", tone: "warning", detail: "Need help clarifying the next step" },
      { label: "Shared Work", value: "3", tone: "accent", detail: "Missions spanning more than one function" },
    ],
    hero: {
      label: "Team Momentum",
      title: "Contributor visibility without spreadsheet fatigue.",
      description:
        "Team mode now highlights who owns what, where energy is concentrated, and which contributors need support before the review queue grows any wider.",
      highlights: [
        { label: "Most stable", value: "Priya", detail: "Strong owner narrative and clean proof bundle." },
        { label: "Most stretched", value: "Sneha", detail: "Revenue Ops is carrying both throughput and shared launch work." },
        { label: "Best recovery", value: "Meera", detail: "Hiring Loop Compression rebounded after calibration cleanup." },
      ],
      noteTitle: "Manager reading guide",
      noteBody:
        "This route is designed to answer three questions quickly: who is healthy, who is blocked, and who needs sharper operational framing this week.",
      noteHighlights: [
        "Workload and momentum can be discussed on the same card.",
        "Contributor notes sound like real coaching context.",
        "The route feels active even without check-in mutation logic.",
      ],
    },
    primary: {
      label: "Contributor Pulse",
      title: "Current ownership and workload across the team",
      description:
        "Cards are tuned to feel like a real manager workspace, with focus area, momentum state, and next action all visible together.",
      layout: "grid",
      items: [
        item({
          id: "team-1",
          title: "Priya Sharma",
          description:
            "Owning Reliability Control Plane and launch readiness follow-through with consistently strong evidence quality.",
          detail: "Next move: close the final gateway rollback proof before June 23.",
          meta: ["Role: Staff Engineer", "Load: High but stable"],
          badges: [badge("Steady", "success"), badge("Platform lead", "accent")],
          progress: 82,
        }),
        item({
          id: "team-2",
          title: "Rahul Mehta",
          description:
            "Driving Onboarding Activation Loop with a clear conversion story and improving partner feedback quality.",
          detail: "Next move: preserve this week's narrative structure for the manager sweep.",
          meta: ["Role: Product Manager", "Load: Balanced"],
          badges: [badge("Ahead", "success"), badge("Growth lane", "accent")],
          progress: 74,
        }),
        item({
          id: "team-3",
          title: "Sneha Iyer",
          description:
            "Balancing Deal Desk Turnaround with launch-readiness coordination, which is increasing context-switch risk.",
          detail: "Next move: tighten one measurable service threshold before review.",
          meta: ["Role: Revenue Ops Manager", "Load: Heavy"],
          badges: [badge("Watch", "warning"), badge("Shared work", "default")],
          progress: 61,
        }),
        item({
          id: "team-4",
          title: "Dev Malhotra",
          description:
            "Incident Review Cadence is moving, but the final ownership story still needs direct coaching.",
          detail: "Next move: name the closer for weekly remediation completion.",
          meta: ["Role: Quality Lead", "Load: Moderate"],
          badges: [badge("Needs support", "warning"), badge("Quality lane", "default")],
          progress: 54,
        }),
      ],
    },
    secondary: {
      label: "Workload Notes",
      title: "Where the manager lens should stay active",
      description:
        "A secondary lane keeps the route focused on practical oversight rather than abstract team analytics.",
      layout: "timeline",
      items: [
        item({
          id: "team-note-1",
          title: "Protect Priya from late-cycle context switching",
          description:
            "Reliability is in a strong place, but new shared asks could dilute the strongest lane in the portfolio.",
          meta: ["Risk: Delivery drift"],
          badges: [badge("Preventive", "accent")],
        }),
        item({
          id: "team-note-2",
          title: "Coach Sneha on measure clarity before queue escalation",
          description:
            "The work is real, but its success line still needs to sound leadership-ready.",
          meta: ["Risk: Review churn"],
          badges: [badge("Intervention", "warning")],
        }),
        item({
          id: "team-note-3",
          title: "Use Rahul's activation narrative as a team example",
          description:
            "This is the clearest example of how weekly evidence can support momentum without overreporting.",
          meta: ["Upside: Team standard"],
          badges: [badge("Replicate", "success")],
        }),
      ],
    },
    support: [
      {
        label: "Team Narrative",
        title: "What makes this page feel lived-in",
        body:
          "The route does not rely on fake attendance charts or generic utilization widgets. It feels real because ownership, load, and coaching context are specific.",
        highlights: [
          "Every card has a credible next move.",
          "Momentum bands vary without becoming chaotic.",
          "The route stays legible on smaller screens because the rhythm is card-first.",
        ],
      },
      {
        label: "Leadership Framing",
        title: "How to use this in a walkthrough",
        body:
          "Start with the strongest owner, move to the contributor who needs coaching, then close on the reusable narrative pattern the team should copy.",
        highlights: [
          "Strong owner: Priya",
          "Coaching focus: Sneha and Dev",
          "Reusable pattern: Rahul's evidence structure",
        ],
      },
    ],
  },
  "/review": {
    stats: [
      { label: "Pending Reviews", value: "3", tone: "warning", detail: "Two revisions, one leadership-ready" },
      { label: "Ready to Advance", value: "1", tone: "success", detail: "Launch readiness can move forward" },
      { label: "Needs Metric Tightening", value: "2", tone: "warning", detail: "Before the next sweep" },
      { label: "Review Window", value: "Open", tone: "accent", detail: "Through May 24" },
    ],
    hero: {
      label: "Alignment Review",
      title: "A real review queue without implementing approvals.",
      description:
        "The review route now behaves like a leadership workbench: pending decisions, coaching context, and clear evaluation framing without any actual approval engine.",
      highlights: [
        { label: "Queue size", value: "3", detail: "A believable amount of work for an active manager seat." },
        { label: "Fastest advance", value: "Launch readiness", detail: "Narrative and proof are both already strong." },
        { label: "Common blocker", value: "Metric precision", detail: "Two missions still sound descriptive instead of measurable." },
      ],
      noteTitle: "How the page should feel",
      noteBody:
        "It should feel like a manager can actually work from here: not by clicking approvals yet, but by understanding what is ready and what needs tightening.",
      noteHighlights: [
        "Queue cards already sound like real submissions.",
        "The decision lane is framed as guidance, not fake workflow.",
        "The route stays connected to team and mission surfaces.",
      ],
    },
    primary: {
      label: "Queue",
      title: "What is currently sitting in review",
      description:
        "Each card combines the mission request, the evaluation context, and the next decision so the queue feels operationally useful right away.",
      layout: "stack",
      items: [
        item({
          id: "review-1",
          title: "Deal Desk Turnaround",
          description:
            "Needs a more concrete turnaround threshold and one cleaner definition of escalation success before it advances.",
          detail: "Recommended next move: return for revision with one measurable service promise.",
          meta: ["Owner: Sneha Iyer", "Submitted: May 15"],
          badges: [badge("Needs revision", "warning")],
        }),
        item({
          id: "review-2",
          title: "Incident Review Cadence",
          description:
            "The mission is directionally right, but it still needs a single accountable closer for weekly remediation completion.",
          detail: "Recommended next move: coach on ownership before widening the scope.",
          meta: ["Owner: Dev Malhotra", "Submitted: May 15"],
          badges: [badge("Coach first", "accent")],
        }),
        item({
          id: "review-3",
          title: "Launch Readiness Shared Mission",
          description:
            "Evidence quality is strong, recipient scope is coherent, and the story is ready for leadership discussion.",
          detail: "Recommended next move: advance into the next leadership brief without rework.",
          meta: ["Owner: Priya Sharma", "Submitted: May 16"],
          badges: [badge("Ready to advance", "success")],
        }),
      ],
    },
    secondary: {
      label: "Review Lens",
      title: "What strong evaluators look for",
      description:
        "The side rail gives the queue a leadership frame so the page feels deeper than a list of cards.",
      layout: "timeline",
      items: [
        item({
          id: "review-lens-1",
          title: "Outcome language should be repeatable out loud",
          description:
            "If a mission title sounds like a project plan, it usually needs another pass before advancing.",
          badges: [badge("Clarity", "accent")],
        }),
        item({
          id: "review-lens-2",
          title: "Measures should create a shared proof line",
          description:
            "The strongest reviews use one primary measure that both the owner and manager can point to in syncs.",
          badges: [badge("Measurement", "success")],
        }),
        item({
          id: "review-lens-3",
          title: "Shared work still needs one accountable voice",
          description:
            "Cross-functional energy is useful only when one owner is still responsible for the weekly story.",
          badges: [badge("Ownership", "warning")],
        }),
      ],
    },
    support: [
      {
        label: "Leadership Context",
        title: "Why this queue feels credible",
        body:
          "The cards reflect realistic manager language: specific enough to be useful, restrained enough to avoid pretending the workflow already exists.",
        highlights: [
          "One item is ready, two are not, which keeps the queue believable.",
          "Recommended actions are concrete but lightweight.",
          "The route supports demos about evaluation without shipping approval logic.",
        ],
      },
      {
        label: "Next Conversation",
        title: "How to move from queue to action",
        body:
          "The strongest walkthrough uses the queue to explain what good mission language looks like and what still creates drag.",
        highlights: [
          "Use Deal Desk Turnaround to show metric tightening.",
          "Use Incident Review Cadence to show ownership coaching.",
          "Use Launch Readiness to show what success looks like.",
        ],
      },
    ],
  },
  "/admin/shared-missions": {
    stats: [
      { label: "Shared Programs", value: "3", tone: "default", detail: "Launch, compliance, hiring enablement" },
      { label: "Recipient Coverage", value: "18", tone: "accent", detail: "Across manager and employee seats" },
      { label: "Healthy Adoption", value: "2", tone: "success", detail: "One program still needs tighter uptake" },
      { label: "Propagation Watch", value: "1", tone: "warning", detail: "Support coverage still lags" },
    ],
    hero: {
      label: "Shared Missions",
      title: "A propagation surface that feels alive before push logic exists.",
      description:
        "Shared Missions now reads like a real program view: visible rollout packs, recipient framing, and adoption cues without implementing the workflow underneath.",
      highlights: [
        { label: "Strongest pack", value: "Launch readiness", detail: "Engineering and Revenue are already telling the same story." },
        { label: "Largest audience", value: "18 recipients", detail: "A believable program footprint for demos." },
        { label: "Watch area", value: "Support", detail: "The rollout still needs clearer ownership there." },
      ],
      noteTitle: "Why this route matters early",
      noteBody:
        "It gives the admin rail a concrete sense of operational breadth and makes shared goals feel like a real product capability before any mutation system ships.",
      noteHighlights: [
        "Program cards now have recipient and adoption language.",
        "The route feels focused without becoming enterprise-heavy.",
        "Manager access already fits naturally inside the IA.",
      ],
    },
    primary: {
      label: "Propagation Packs",
      title: "Current shared mission programs",
      description:
        "Program cards show where the work is going, how healthy adoption looks, and what the next operational checkpoint is.",
      layout: "grid",
      items: [
        item({
          id: "shared-1",
          title: "Launch Readiness Pack",
          description:
            "A cross-functional mission pack aligning release readiness, enablement notes, and support handoff expectations.",
          detail: "Next move: finalize Support recipient coverage before the leadership brief.",
          meta: ["Recipients: 8", "Owners: Priya + Sneha"],
          badges: [badge("Healthy adoption", "success"), badge("Shared", "accent")],
          progress: 79,
        }),
        item({
          id: "shared-2",
          title: "Compliance Training Momentum",
          description:
            "A shared mission pack designed to keep completion language consistent across manager and employee seats.",
          detail: "Next move: tighten reminder language for remaining recipients.",
          meta: ["Recipients: 6", "Owner: Meera Rao"],
          badges: [badge("Stable", "accent"), badge("Recurring", "default")],
          progress: 68,
        }),
        item({
          id: "shared-3",
          title: "Hiring Enablement Scorecard",
          description:
            "A shared mission that keeps interview loop hygiene visible across recruiting, hiring managers, and People Ops.",
          detail: "Next move: expand recipient view for new manager cohorts.",
          meta: ["Recipients: 4", "Owner: Neha Gupta"],
          badges: [badge("Growing", "warning"), badge("People Ops", "default")],
          progress: 62,
        }),
      ],
    },
    secondary: {
      label: "Recipient Health",
      title: "Where adoption is clean and where it needs help",
      description:
        "The secondary lane keeps this route grounded in rollout realism instead of generic admin metrics.",
      layout: "timeline",
      items: [
        item({
          id: "shared-health-1",
          title: "Engineering is mirroring the pack exactly",
          description:
            "Recipients are reusing the same milestone and evidence language, which makes the rollout feel coherent.",
          badges: [badge("Healthy", "success")],
        }),
        item({
          id: "shared-health-2",
          title: "Revenue is aligned but still editing local wording",
          description:
            "Adoption is strong, though one or two local narrative variants are still visible.",
          badges: [badge("Monitor", "accent")],
        }),
        item({
          id: "shared-health-3",
          title: "Support needs one clearer owner to finish uptake",
          description:
            "The pack is useful, but the receiving team still needs a single accountable leader for the rollout.",
          badges: [badge("Needs attention", "warning")],
        }),
      ],
    },
    support: [
      {
        label: "Operational Value",
        title: "What makes this feel real",
        body:
          "The route does not talk about propagation as an abstract admin feature. It talks about concrete rollout packs, recipient groups, and adoption quality.",
        highlights: [
          "Programs sound like things an operations leader would actually run.",
          "Recipient counts are plausible for the seeded organization size.",
          "The page supports role-based demos without backend depth.",
        ],
      },
      {
        label: "Program Discipline",
        title: "How to talk through the page",
        body:
          "Start with the launch pack, point out where adoption is healthiest, then show the one receiving team that still needs clearer ownership.",
        highlights: [
          "Healthy: Engineering",
          "Monitor: Revenue",
          "Needs help: Support",
        ],
      },
    ],
  },
};

const adminRoutes: Record<string, OperationalRouteSurface> = {
  ...managerRoutes,
  "/": {
    stats: [
      { label: "Org Missions", value: "18", tone: "default", detail: "Across Engineering, Revenue, and People Ops" },
      { label: "Completion Readiness", value: "73%", tone: "accent", detail: "Stable heading into the close window" },
      { label: "Governance Watchpoints", value: "4", tone: "warning", detail: "Review, rollout, and access all visible" },
      { label: "Shared Programs", value: "3", tone: "success", detail: "All already attached to the shell" },
    ],
    hero: {
      label: "Operational Overview",
      title: "An organizational command surface that already feels in use.",
      description:
        "Admin mode now reads like a real oversight layer: department momentum, governance pressure, and shared mission posture all living inside one calm operational shell.",
      highlights: [
        { label: "Healthiest function", value: "Engineering", detail: "The strongest combination of owner clarity and evidence quality." },
        { label: "Most visible drag", value: "Review precision", detail: "Metric ambiguity still creates queue pressure." },
        { label: "Shared leverage", value: "3 programs", detail: "Cross-functional work is now visible as a real operating system." },
      ],
      noteTitle: "Admin reading posture",
      noteBody:
        "This page is intentionally not an analytics wall. It is a governance and momentum overview with just enough density to feel premium and believable.",
      noteHighlights: [
        "Department health, shared work, and audit context all connect naturally.",
        "The route feels strategic without becoming overbuilt.",
        "Every panel supports a demo about organizational momentum.",
      ],
    },
    primary: {
      label: "Department Pulse",
      title: "How momentum is distributed right now",
      description:
        "The admin lens expands the shell from team to organization without changing the product rhythm or falling back to generic enterprise tables.",
      layout: "grid",
      items: [
        item({
          id: "admin-pulse-1",
          title: "Engineering",
          description:
            "Reliability and launch work are both in strong shape, with the clearest evidence quality in the org.",
          detail: "Watch only for late-cycle context switching around release week.",
          meta: ["Completion: 79%", "Shared programs: 2"],
          badges: [badge("Stable", "success")],
          progress: 79,
        }),
        item({
          id: "admin-pulse-2",
          title: "Revenue",
          description:
            "Deal Desk Turnaround is real and progressing, but measure clarity still needs one more pass before it is leadership-ready.",
          detail: "The department is healthy overall but still carries the most visible review pressure.",
          meta: ["Completion: 66%", "Shared programs: 1"],
          badges: [badge("Watch", "warning")],
          progress: 66,
        }),
        item({
          id: "admin-pulse-3",
          title: "People Operations",
          description:
            "Hiring Loop Compression and training momentum are both improving after the latest calibration cleanup.",
          detail: "The team is trending up, though one rollout still needs broader manager adoption.",
          meta: ["Completion: 71%", "Shared programs: 2"],
          badges: [badge("Recovering", "accent")],
          progress: 71,
        }),
      ],
    },
    secondary: {
      label: "Governance Watchlist",
      title: "The issues an admin should keep visible",
      description:
        "The right rail frames oversight as narrative governance and operational hygiene, not admin sprawl.",
      layout: "timeline",
      items: [
        item({
          id: "admin-watch-1",
          title: "Review pressure is clustering around imprecise metrics",
          description:
            "The strongest governance move is still to enforce one primary proof line before missions widen their scope.",
          badges: [badge("Priority", "warning")],
        }),
        item({
          id: "admin-watch-2",
          title: "Shared launch pack rollout is nearly complete",
          description:
            "One recipient group still needs a named owner before the rollout can be considered healthy.",
          badges: [badge("Monitor", "accent")],
        }),
        item({
          id: "admin-watch-3",
          title: "Access and role-switch traces remain clean",
          description:
            "The shell is already supporting believable admin posture without exposing permission drift.",
          badges: [badge("Healthy", "success")],
        }),
      ],
    },
    support: [
      {
        label: "Oversight",
        title: "What this route is good for right now",
        body:
          "It helps leadership talk about organizational momentum, shared mission coverage, and governance watchpoints from a single product surface.",
        highlights: [
          "Use department pulse to frame momentum.",
          "Use the watchlist to show where intervention is needed.",
          "Use Shared Missions and Audit Trail as deeper follow-on surfaces.",
        ],
      },
      {
        label: "Product Mood",
        title: "Why the admin rail now feels premium",
        body:
          "The route is dense enough to feel operational but restrained enough to stay calm. That balance is what moves MissionOS out of scaffold territory.",
        highlights: [
          "No noisy widgets or fake chart infrastructure.",
          "Context flows naturally into the nested admin routes.",
          "The page is screenshot-ready at desktop and still coherent on tablet.",
        ],
      },
    ],
    activity: adminActivity,
  },
  "/missions": {
    ...managerRoutes["/missions"],
    stats: [
      { label: "Org-visible Missions", value: "18", tone: "default", detail: "Filtered to the active quarter" },
      { label: "Shared Mission Cards", value: "6", tone: "accent", detail: "Cross-functional narrative now visible" },
      { label: "Review-sensitive", value: "4", tone: "warning", detail: "Need tighter success framing" },
      { label: "Leadership-ready", value: "5", tone: "success", detail: "Strong proof and clear owners" },
    ],
  },
  "/syncs": {
    ...managerRoutes["/syncs"],
    stats: [
      { label: "Org Syncs Open", value: "11", tone: "default", detail: "Across all active lanes" },
      { label: "Leadership-ready", value: "4", tone: "success", detail: "Can be lifted into the Friday brief" },
      { label: "Needs Coaching", value: "4", tone: "warning", detail: "Metric or proof gap still visible" },
      { label: "Quarter Lock", value: "June 28", tone: "accent", detail: "The non-negotiable close point" },
    ],
  },
  "/team": {
    ...managerRoutes["/team"],
    stats: [
      { label: "Visible Contributors", value: "18", tone: "default", detail: "Across the seeded organization" },
      { label: "Healthy Lanes", value: "11", tone: "success", detail: "Strong owner and narrative quality" },
      { label: "Needs Support", value: "4", tone: "warning", detail: "Coaching or role clarity required" },
      { label: "Shared Loads", value: "5", tone: "accent", detail: "Cross-functional ownership in motion" },
    ],
  },
  "/review": {
    ...managerRoutes["/review"],
    stats: [
      { label: "Org Review Queue", value: "4", tone: "warning", detail: "Across manager and shared mission lanes" },
      { label: "Advance-ready", value: "2", tone: "success", detail: "Strong enough for leadership" },
      { label: "Needs Tightening", value: "2", tone: "warning", detail: "Before quarter narratives lock" },
      { label: "Evaluation Lens", value: "Active", tone: "accent", detail: "Operational, not ceremonial" },
    ],
  },
  "/admin": {
    stats: [
      { label: "Departments", value: "3", tone: "default", detail: "Engineering, Revenue, People Ops" },
      { label: "Org Completion", value: "73%", tone: "accent", detail: "Healthy but not uniform" },
      { label: "Audit Visibility", value: "12", tone: "success", detail: "Recent events already organized" },
      { label: "Shared Programs", value: "3", tone: "warning", detail: "One still needs broader uptake" },
    ],
    hero: {
      label: "Workspace Admin",
      title: "Governance, momentum, and shared work in one calm frame.",
      description:
        "The admin landing page now feels like a real command surface: department health, watchpoints, and deeper governance surfaces ready to open without a single backend-heavy subsystem.",
      highlights: [
        { label: "Org health", value: "73%", detail: "Stable with targeted watchpoints rather than broad concern." },
        { label: "Audit pulse", value: "12 events", detail: "Enough recent history to make oversight feel real." },
        { label: "Shared reach", value: "18 recipients", detail: "Program propagation already feels organizational." },
      ],
      noteTitle: "Admin mood",
      noteBody:
        "This page keeps an oversight posture without defaulting to enterprise sprawl. It is strategic, visible, and calm.",
      noteHighlights: [
        "Department health acts as the primary operational surface.",
        "Governance and shared work live as connected secondary surfaces.",
        "The page transitions naturally into Audit Trail and Shared Missions.",
      ],
    },
    primary: {
      label: "Department Health",
      title: "Current organizational momentum by function",
      description:
        "Function cards make it easy to tell a believable leadership story without introducing chart infrastructure or analytics engines.",
      layout: "grid",
      items: [
        item({
          id: "admin-overview-1",
          title: "Engineering",
          description:
            "Strongest operating momentum in the org with high evidence quality and low review churn.",
          detail: "Primary watchpoint: protect focus during the final release window.",
          meta: ["Completion: 79%", "At-risk lanes: 0"],
          badges: [badge("Strongest", "success")],
          progress: 79,
        }),
        item({
          id: "admin-overview-2",
          title: "Revenue",
          description:
            "Operational throughput work is real but still carries the highest concentration of review-sensitive mission language.",
          detail: "Primary watchpoint: turn descriptive success measures into one concrete service promise.",
          meta: ["Completion: 66%", "At-risk lanes: 1"],
          badges: [badge("Watch", "warning")],
          progress: 66,
        }),
        item({
          id: "admin-overview-3",
          title: "People Operations",
          description:
            "Hiring and enablement work are improving steadily after the latest calibration and rollout cleanup.",
          detail: "Primary watchpoint: complete manager adoption for the shared enablement pack.",
          meta: ["Completion: 71%", "At-risk lanes: 1"],
          badges: [badge("Recovering", "accent")],
          progress: 71,
        }),
      ],
    },
    secondary: {
      label: "Administrative Watchpoints",
      title: "Where governance should stay proactive",
      description:
        "The secondary lane makes the route feel operational by identifying concrete watchpoints instead of broad admin categories.",
      layout: "timeline",
      items: [
        item({
          id: "admin-watchpoint-1",
          title: "Review precision needs to tighten before the late-May sweep",
          description:
            "Metric ambiguity is the clearest source of friction still visible across the workspace.",
          badges: [badge("Review watch", "warning")],
        }),
        item({
          id: "admin-watchpoint-2",
          title: "Launch readiness rollout should finish with a named Support owner",
          description:
            "The shared mission pack is healthy overall, but one recipient group still needs a clearer final handoff.",
          badges: [badge("Program watch", "accent")],
        }),
        item({
          id: "admin-watchpoint-3",
          title: "Role-aware access surfaces remain coherent after override changes",
          description:
            "The shell already supports believable governance posture because access visibility is consistent route to route.",
          badges: [badge("Access healthy", "success")],
        }),
      ],
    },
    support: [
      {
        label: "Surface Strategy",
        title: "Why this avoids heavy enterprise complexity",
        body:
          "The page uses strong language, believable counts, and layered context rather than dashboards full of empty controls or faux analytics.",
        highlights: [
          "No CRUD, approval, or analytics engines are implied.",
          "Nested admin routes deepen context instead of compensating for missing depth.",
          "The page still feels premium and screenshot-ready.",
        ],
      },
      {
        label: "Leadership Story",
        title: "A clean walkthrough path",
        body:
          "Open with department health, move to the top governance watchpoint, then branch into Shared Missions or Audit Trail depending the conversation.",
        highlights: [
          "Department pulse sets the organizational context.",
          "Watchpoints explain why admin views matter.",
          "Nested routes provide the next layer of realism.",
        ],
      },
    ],
  },
  "/admin/shared-missions": {
    ...managerRoutes["/admin/shared-missions"],
    stats: [
      { label: "Shared Programs", value: "3", tone: "default", detail: "All visible in the admin rail" },
      { label: "Org Recipients", value: "18", tone: "accent", detail: "Across three departments" },
      { label: "Healthy Adoption", value: "2", tone: "success", detail: "One rollout still needs support" },
      { label: "Governance Watch", value: "1", tone: "warning", detail: "Support owner gap still visible" },
    ],
  },
  "/admin/audit": {
    stats: [
      { label: "Recent Events", value: "12", tone: "default", detail: "Within the last seven days" },
      { label: "Access Events", value: "4", tone: "accent", detail: "Role and visibility changes captured" },
      { label: "Mission Events", value: "5", tone: "success", detail: "Target windows and review actions" },
      { label: "Requires Follow-up", value: "1", tone: "warning", detail: "Support rollout owner gap" },
    ],
    hero: {
      label: "Audit Trail",
      title: "Governance history that feels trustworthy and current.",
      description:
        "Audit Trail now reads like a focused administrative log: recent actions, context, and the small number of events leadership would actually care to inspect.",
      highlights: [
        { label: "Recent history", value: "12 events", detail: "Enough density to feel live without clutter." },
        { label: "Clean access", value: "4 traces", detail: "Role and route visibility changes remain coherent." },
        { label: "Primary follow-up", value: "1 item", detail: "A shared mission owner gap still needs closure." },
      ],
      noteTitle: "Audit posture",
      noteBody:
        "The route avoids fake filters and giant enterprise tables. It focuses on the handful of recent events that make the workspace feel governed and believable.",
      noteHighlights: [
        "Events are descriptive and role-aware.",
        "The timeline supports a leadership walkthrough naturally.",
        "The shell can host real audit querying later without visual churn.",
      ],
    },
    primary: {
      label: "Recent Activity",
      title: "Events leadership would actually inspect",
      description:
        "A compact event list gives the page a real sense of history without turning it into a cold compliance surface.",
      layout: "stack",
      items: auditItems,
    },
    secondary: {
      label: "Policy Watchpoints",
      title: "What still deserves attention",
      description:
        "The secondary lane keeps the audit route operational by showing what should be watched next, not just what already happened.",
      layout: "timeline",
      items: [
        item({
          id: "audit-watch-1",
          title: "Shared mission rollout still needs a final Support owner",
          description:
            "The current recipient map is broad enough, but the last receiving team still lacks one accountable closer.",
          badges: [badge("Open follow-up", "warning")],
        }),
        item({
          id: "audit-watch-2",
          title: "Review-return language is becoming more consistent",
          description:
            "Manager actions now sound more aligned, which reduces confusion when missions re-enter the queue.",
          badges: [badge("Improving", "success")],
        }),
        item({
          id: "audit-watch-3",
          title: "Role override traces remain clean after session resets",
          description:
            "The demo view boundary is working as expected and not leaking access posture into the audit lane.",
          badges: [badge("Stable", "accent")],
        }),
      ],
    },
    support: [
      {
        label: "Governance Lens",
        title: "Why the page feels premium instead of bureaucratic",
        body:
          "The event list is intentionally selective, readable, and close to real product language. That keeps the surface high-signal and demo-ready.",
        highlights: [
          "Actors, actions, and timestamps are concrete.",
          "The event mix reflects real operational history.",
          "The route still feels calm even with data density.",
        ],
      },
      {
        label: "Operational Continuity",
        title: "How this connects to the rest of the shell",
        body:
          "Audit does not feel isolated. It reinforces what the admin overview and shared mission routes already imply about ownership, review, and access.",
        highlights: [
          "Mission events tie back to board and review surfaces.",
          "Access events reinforce role-aware navigation realism.",
          "Program events reinforce shared mission oversight.",
        ],
      },
    ],
  },
};

export const previewOperationalSurfacesByRole: Record<
  UserRole,
  Record<string, OperationalRouteSurface>
> = {
  employee: employeeRoutes,
  manager: managerRoutes,
  admin: adminRoutes,
};

export const previewMissionDetailSurfaces: Record<string, OperationalRouteSurface> =
  {
    "mission-reliability-control-plane": {
      stats: [
        { label: "Progress", value: "82%", tone: "accent", detail: "Holding its release window" },
        { label: "Owner", value: "Priya", tone: "default", detail: "Platform lead for the lane" },
        { label: "Dependencies", value: "2", tone: "warning", detail: "Gateway and incident review handoff" },
        { label: "Next Gate", value: "June 23", tone: "success", detail: "Release candidate freeze" },
      ],
      hero: {
        label: "Mission Detail",
        title: "Reliability Control Plane is close to quarter-ready proof.",
        description:
          "This detail view frames one mission with enough depth to feel real: clear owner, measurable target, next milestone, and visible supporting context.",
        highlights: [
          { label: "Target", value: "25 min", detail: "Sev-2 recovery time target by the June 23 freeze." },
          { label: "Current lift", value: "-19 min", detail: "Recovery time is already down from the starting point." },
          { label: "Primary risk", value: "1 dependency", detail: "Gateway rollback sequencing still needs final proof." },
        ],
        noteTitle: "Why this detail page works",
        noteBody:
          "It feels like a live mission record even without comments, editing, or review mutations because the structure already supports a real operational conversation.",
        noteHighlights: [
          "Owner, measure, and timeline are all immediately visible.",
          "The page reads like a current mission, not an abstract profile.",
          "Timeline and stakeholders give the route believable depth.",
        ],
      },
      primary: {
        label: "Mission Snapshot",
        title: "Current state and operating context",
        description:
          "The primary lane focuses on what the mission is trying to change, how it is progressing, and what still needs to happen before the quarter gate.",
        layout: "stack",
        items: [
          item({
            id: "detail-reliability-1",
            title: "Outcome",
            description:
              "Reduce Sev-2 recovery time by standardizing rollback controls across the gateway and worker fleet.",
            detail: "The mission is strongest when described as operational resilience instead of tooling implementation.",
            meta: ["Owner: Priya Sharma", "Domain: Platform"],
            badges: [badge("Aligned", "success")],
            progress: 82,
          }),
          item({
            id: "detail-reliability-2",
            title: "Current narrative",
            description:
              "Rollback drills are now consistent across staging, and the remaining work is proving the same pattern under release-candidate pressure.",
            detail: "The strongest evidence bundle is the before-and-after incident rehearsal summary.",
            meta: ["Last update: May 16, 10:20", "Status: Steady"],
            badges: [badge("Evidence strong", "accent")],
          }),
          item({
            id: "detail-reliability-3",
            title: "What still needs to happen",
            description:
              "Lock the final gateway dependency and attach one conclusive timing artifact before the June 23 freeze.",
            detail: "This is the only remaining step keeping the mission from feeling fully quarter-ready.",
            meta: ["Risk owner: Priya + Gateway team", "Window: 7 days"],
            badges: [badge("Final proof", "warning")],
          }),
        ],
      },
      secondary: {
        label: "Timeline",
        title: "Recent and upcoming milestones",
        description:
          "The timeline gives the mission a lived-in sense of progression without introducing a heavy history system.",
        layout: "timeline",
        items: [
          item({
            id: "detail-reliability-timeline-1",
            title: "May 09: rollback drill baseline established",
            description:
              "The team confirmed the starting recovery window and agreed on the tighter target for the quarter.",
            badges: [badge("Baseline", "default")],
          }),
          item({
            id: "detail-reliability-timeline-2",
            title: "May 16: staging evidence pack refreshed",
            description:
              "New rehearsal timings and operator notes were attached to the sync narrative.",
            badges: [badge("Fresh evidence", "accent")],
          }),
          item({
            id: "detail-reliability-timeline-3",
            title: "June 23: release candidate freeze",
            description:
              "The mission should enter the close window with a final proof bundle and no unresolved dependency drift.",
            badges: [badge("Next gate", "warning")],
          }),
        ],
      },
      support: [
        {
          label: "Stakeholders",
          title: "Who is shaping the mission outcome",
          body:
            "A believable mission detail view needs a small but credible stakeholder picture so the work feels embedded in the organization.",
          highlights: [
            "Owner: Priya Sharma",
            "Manager sponsor: Arjun Nair",
            "Dependency partner: Gateway infrastructure team",
          ],
        },
        {
          label: "Support Notes",
          title: "What makes the mission healthy right now",
          body:
            "This mission stays in a strong band because it has one clear measure, a stable owner, and recent proof that sounds operationally real.",
          highlights: [
            "Progress is meaningful but not perfect.",
            "The remaining risk is concrete and time-bound.",
            "The next step is obvious even without action buttons.",
          ],
        },
      ],
    },
    "mission-onboarding-activation-loop": {
      stats: [
        { label: "Progress", value: "74%", tone: "accent", detail: "Ahead of the current weekly narrative" },
        { label: "Owner", value: "Rahul", tone: "default", detail: "Product Growth lead" },
        { label: "Partners", value: "3", tone: "success", detail: "Product, Marketing, Support" },
        { label: "Next Gate", value: "May 24", tone: "warning", detail: "Leadership narrative sweep" },
      ],
      hero: {
        label: "Mission Detail",
        title: "Onboarding Activation Loop is proving out a repeatable growth story.",
        description:
          "The mission detail frame shows how activation work can feel strategic and operational at the same time: owner clarity, weekly evidence, and a next story checkpoint.",
        highlights: [
          { label: "Primary lift", value: "+11 pts", detail: "Week-one activation improvement since the setup prompt refresh." },
          { label: "Best proof", value: "Partner setup", detail: "Conversion improved after the new guided sequence went live." },
          { label: "Next move", value: "May 24", detail: "Convert the lift into a leadership-ready quarter story." },
        ],
        noteTitle: "Mission posture",
        noteBody:
          "This route proves that not every believable mission detail page needs heavy workflow depth. Good structure and realistic context already carry a lot of weight.",
        noteHighlights: [
          "The language sounds like real growth work.",
          "Shared partners make the page feel connected.",
          "The next checkpoint is visible and concrete.",
        ],
      },
      primary: {
        label: "Mission Snapshot",
        title: "What is moving the number right now",
        description:
          "The main lane focuses on what changed in the product experience and why that change is showing up in the activation narrative.",
        layout: "stack",
        items: [
          item({
            id: "detail-activation-1",
            title: "Outcome",
            description:
              "Lift week-one partner activation by making setup prompts, handoff copy, and first-success cues more directive and measurable.",
            meta: ["Owner: Rahul Mehta", "Domain: Product Growth"],
            badges: [badge("Ahead", "success")],
            progress: 74,
          }),
          item({
            id: "detail-activation-2",
            title: "Current narrative",
            description:
              "The new prompt sequence is converting better because it removes ambiguity in the first-session setup path.",
            meta: ["Last update: May 15, 17:10", "Signal: Conversion lift"],
            badges: [badge("Evidence strong", "accent")],
          }),
          item({
            id: "detail-activation-3",
            title: "What still needs to happen",
            description:
              "Preserve the improvement long enough to tell a stable story in the next manager sweep.",
            meta: ["Window: 8 days", "Risk: Narrative drift"],
            badges: [badge("Hold gains", "warning")],
          }),
        ],
      },
      secondary: {
        label: "Timeline",
        title: "The sequence behind the growth lift",
        description:
          "A small milestone history is enough to make the mission feel like an active operating story rather than a static card.",
        layout: "timeline",
        items: [
          item({
            id: "detail-activation-timeline-1",
            title: "May 08: setup prompt sequence shipped",
            description:
              "The revised onboarding path went live for the current partner cohort.",
            badges: [badge("Release", "default")],
          }),
          item({
            id: "detail-activation-timeline-2",
            title: "May 15: activation lift confirmed",
            description:
              "The team captured the first stable evidence bundle showing improved week-one behavior.",
            badges: [badge("Proof", "accent")],
          }),
          item({
            id: "detail-activation-timeline-3",
            title: "May 24: leadership-ready narrative due",
            description:
              "The current lift should be translated into a concise operating story for the next sweep.",
            badges: [badge("Next gate", "warning")],
          }),
        ],
      },
      support: [
        {
          label: "Partners",
          title: "Cross-functional support on this mission",
          body:
            "The mission feels credible because the page names the adjacent teams shaping the outcome instead of implying solo ownership for shared work.",
          highlights: [
            "Product: Rahul Mehta",
            "Marketing: Copy and handoff support",
            "Support: Partner onboarding context",
          ],
        },
        {
          label: "Readiness",
          title: "Why the lane feels strong",
          body:
            "This mission has a strong owner, a visible measure, and proof that can survive scrutiny in a review conversation.",
          highlights: [
            "Good measure discipline",
            "Strong qualitative evidence",
            "Clear next storytelling checkpoint",
          ],
        },
      ],
    },
    "mission-deal-desk-turnaround": {
      stats: [
        { label: "Progress", value: "61%", tone: "warning", detail: "Work is real, framing still soft" },
        { label: "Owner", value: "Sneha", tone: "default", detail: "Revenue Ops lead" },
        { label: "Shared Touchpoints", value: "2", tone: "accent", detail: "Finance and Sales leadership" },
        { label: "Review Status", value: "Open", tone: "warning", detail: "Needs one tighter measure" },
      ],
      hero: {
        label: "Mission Detail",
        title: "Deal Desk Turnaround is meaningful work that still needs sharper framing.",
        description:
          "This detail surface shows the difference between active progress and review-ready clarity, which makes the mission feel more believable than a perfect mock card ever could.",
        highlights: [
          { label: "Current position", value: "61%", detail: "The work is moving, but the success line still needs tightening." },
          { label: "Key blocker", value: "Measure clarity", detail: "The response-time promise is still too broad." },
          { label: "Next move", value: "Review revision", detail: "Return with one concrete turnaround threshold." },
        ],
        noteTitle: "What the page communicates",
        noteBody:
          "A premium shell needs some missions that are progressing but not yet polished. That tension is what makes the workspace feel operationally true.",
        noteHighlights: [
          "Progress is visible without pretending the mission is healthy.",
          "The review issue is concrete, not generic.",
          "The next decision is obvious without an approval button.",
        ],
      },
      primary: {
        label: "Mission Snapshot",
        title: "Where the mission is strong and where it is soft",
        description:
          "The main lane balances credible operational work with the one review issue still keeping the mission from advancing cleanly.",
        layout: "stack",
        items: [
          item({
            id: "detail-dealdesk-1",
            title: "Outcome",
            description:
              "Cut redline turnaround time for strategic deals by tightening request routing and escalation coverage.",
            meta: ["Owner: Sneha Iyer", "Domain: Revenue Ops"],
            badges: [badge("Watch", "warning")],
            progress: 61,
          }),
          item({
            id: "detail-dealdesk-2",
            title: "Current narrative",
            description:
              "Routing improvements are reducing chaos, but the mission still needs one explicit response threshold that leadership can evaluate.",
            meta: ["Last update: May 15, 14:05", "Review note: metric too broad"],
            badges: [badge("Needs revision", "warning")],
          }),
          item({
            id: "detail-dealdesk-3",
            title: "What still needs to happen",
            description:
              "Return the mission with a tighter turnaround promise and one clean exception path before it re-enters review.",
            meta: ["Risk: Review churn", "Owner partner: Finance"],
            badges: [badge("Refine measure", "accent")],
          }),
        ],
      },
      secondary: {
        label: "Timeline",
        title: "What brought the mission here",
        description:
          "A short sequence gives the mission believable history and explains why it is in a middle state instead of a finished one.",
        layout: "timeline",
        items: [
          item({
            id: "detail-dealdesk-timeline-1",
            title: "May 07: request routing cleanup launched",
            description:
              "The new intake path reduced back-and-forth between Sales and Operations.",
            badges: [badge("Launch", "default")],
          }),
          item({
            id: "detail-dealdesk-timeline-2",
            title: "May 15: review returned for tighter metric language",
            description:
              "The mission now needs one concrete service threshold to advance cleanly.",
            badges: [badge("Review return", "warning")],
          }),
          item({
            id: "detail-dealdesk-timeline-3",
            title: "May 24: next review sweep",
            description:
              "A revised mission should be ready before the next leadership consolidation window.",
            badges: [badge("Next gate", "accent")],
          }),
        ],
      },
      support: [
        {
          label: "Stakeholders",
          title: "Who needs to align on the revision",
          body:
            "The mission spans a small but believable set of partners, which helps the detail page feel connected to real operating work.",
          highlights: [
            "Owner: Sneha Iyer",
            "Finance: pricing exception escalation",
            "Sales leadership: response-time expectation",
          ],
        },
        {
          label: "Coaching Notes",
          title: "Why the mission is not yet review-ready",
          body:
            "The work is not failing. It simply needs a clearer measurement contract before it can carry a stronger quarter story.",
          highlights: [
            "Outcome is useful",
            "Execution is underway",
            "Measure still needs tightening",
          ],
        },
      ],
    },
    "mission-incident-review-cadence": {
      stats: [
        { label: "Progress", value: "54%", tone: "warning", detail: "Steady work, weak closure narrative" },
        { label: "Owner", value: "Dev", tone: "default", detail: "Quality lead" },
        { label: "Primary Risk", value: "Owner gap", tone: "warning", detail: "Weekly closer still diffuse" },
        { label: "Next Check", value: "May 18", tone: "accent", detail: "Sync evidence due" },
      ],
      hero: {
        label: "Mission Detail",
        title: "Incident Review Cadence is moving but still needs a closer.",
        description:
          "This route shows the kind of mission every believable workspace needs: valuable work, visible progress, and one unresolved ownership problem keeping the story soft.",
        highlights: [
          { label: "Current state", value: "54%", detail: "The cadence is improving but not yet reliable enough." },
          { label: "Main issue", value: "Owner gap", detail: "The final weekly closer is still not explicit." },
          { label: "Next move", value: "May 18", detail: "Attach one stronger proof artifact to the sync." },
        ],
        noteTitle: "Why this detail state matters",
        noteBody:
          "Not every mission should look perfect. This page makes the shell feel real by showing a lane that is useful, active, and still in need of coaching.",
        noteHighlights: [
          "Progress is visible but not overpolished.",
          "The blocker is specific and realistic.",
          "The route still has enough structure to feel premium.",
        ],
      },
      primary: {
        label: "Mission Snapshot",
        title: "The work behind the weaker narrative",
        description:
          "The main lane explains why the mission exists, how it is improving, and what is still preventing a stronger quarter story.",
        layout: "stack",
        items: [
          item({
            id: "detail-incident-1",
            title: "Outcome",
            description:
              "Restore weekly incident closure discipline by aligning action owners, due dates, and review rituals.",
            meta: ["Owner: Dev Malhotra", "Domain: Quality"],
            badges: [badge("Needs attention", "warning")],
            progress: 54,
          }),
          item({
            id: "detail-incident-2",
            title: "Current narrative",
            description:
              "The review ritual is healthier, but the final remediation owner is still shifting week to week.",
            meta: ["Last update: May 15, 15:20", "Signal: closure inconsistency"],
            badges: [badge("Owner unclear", "warning")],
          }),
          item({
            id: "detail-incident-3",
            title: "What still needs to happen",
            description:
              "Name one explicit closer for weekly remediation completion and attach a proof artifact to the next sync.",
            meta: ["Risk: Rework", "Window: 2 days"],
            badges: [badge("Coach now", "accent")],
          }),
        ],
      },
      secondary: {
        label: "Timeline",
        title: "Why the lane still feels soft",
        description:
          "A concise history clarifies that the mission is moving, but also why it still needs stronger ownership discipline.",
        layout: "timeline",
        items: [
          item({
            id: "detail-incident-timeline-1",
            title: "May 05: weekly review ritual reset",
            description:
              "The team standardized a cleaner incident follow-through review slot.",
            badges: [badge("Reset", "default")],
          }),
          item({
            id: "detail-incident-timeline-2",
            title: "May 15: owner inconsistency surfaced in manager review",
            description:
              "The mission showed progress, but the final closure owner still shifted across weeks.",
            badges: [badge("Watchpoint", "warning")],
          }),
          item({
            id: "detail-incident-timeline-3",
            title: "May 18: proof artifact due",
            description:
              "The next sync should show one cleaner closure pattern tied to a named closer.",
            badges: [badge("Next gate", "accent")],
          }),
        ],
      },
      support: [
        {
          label: "Stakeholders",
          title: "Who is involved in stabilizing the lane",
          body:
            "The mission's realism comes from its small but credible network of people who influence whether the work feels complete.",
          highlights: [
            "Owner: Dev Malhotra",
            "Manager sponsor: Arjun Nair",
            "Partner team: Incident command and platform operations",
          ],
        },
        {
          label: "Coaching Notes",
          title: "What would move this into a healthier band",
          body:
            "The fastest improvement is not more process. It is one clear closer and one reliable proof artifact attached to the next sync.",
          highlights: [
            "Clarify the final weekly owner",
            "Attach one closure-rate proof line",
            "Keep the ritual simple and repeatable",
          ],
        },
      ],
    },
  };
