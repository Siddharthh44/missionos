import type {
  ActivityItem,
  PlaceholderSurfaceContent,
  Profile,
  QuarterWindow,
  ShellStat,
  UserRole,
} from "@/types";

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
  id: "quarter-q2-2025",
  quarter: "Q2-2025",
  phase: "q2_sync",
  opens_at: "2025-07-01",
  closes_at: "2025-10-15",
  is_active: true,
};

export const previewStatsByRole: Record<UserRole, ShellStat[]> = {
  employee: [
    { label: "Active Missions", value: "5", tone: "default", detail: "2 in final sync window" },
    { label: "Average Progress", value: "72%", tone: "accent", detail: "Steady across core work" },
    { label: "Aligned This Quarter", value: "4", tone: "success", detail: "1 needs attention" },
    { label: "Syncs Due", value: "2", tone: "warning", detail: "Before Oct 15 close" },
  ],
  manager: [
    { label: "Team Members", value: "8", tone: "default", detail: "Across 3 workstreams" },
    { label: "Average Team Score", value: "68%", tone: "accent", detail: "1 mission trending down" },
    { label: "Awaiting Review", value: "3", tone: "warning", detail: "Needs alignment action" },
    { label: "At Risk", value: "2", tone: "warning", detail: "One is below 50%" },
  ],
  admin: [
    { label: "Total Team Members", value: "18", tone: "default", detail: "3 departments in scope" },
    { label: "Org Completion Rate", value: "73%", tone: "accent", detail: "Stable this cycle" },
    { label: "Pending Approvals", value: "4", tone: "warning", detail: "Mostly in Engineering" },
    { label: "Recent Audit Events", value: "12", tone: "success", detail: "Last 7 days" },
  ],
};

export const previewActivityByRole: Record<UserRole, ActivityItem[]> = {
  employee: [
    {
      id: "activity-1",
      title: "API latency mission aligned",
      description: "Your manager locked the target window for the current quarter.",
      timestamp: "Today · 10:20",
    },
    {
      id: "activity-2",
      title: "Sync reminder reopened",
      description: "Two missions need a fresh progress update before the quarter closes.",
      timestamp: "Yesterday · 17:10",
    },
    {
      id: "activity-3",
      title: "Team onboarding milestone achieved",
      description: "Your onboarding mission is already marked as achieved.",
      timestamp: "3 days ago",
    },
  ],
  manager: [
    {
      id: "activity-4",
      title: "Three missions awaiting alignment",
      description: "Rahul and Sneha both submitted revisions this morning.",
      timestamp: "Today · 09:45",
    },
    {
      id: "activity-5",
      title: "Backlog reduction mission flagged",
      description: "One Product Quality objective slipped below the safe threshold.",
      timestamp: "Yesterday · 15:30",
    },
    {
      id: "activity-6",
      title: "Check-in comment logged",
      description: "A coaching note was added to Priya's at-risk mission trail.",
      timestamp: "3 days ago",
    },
  ],
  admin: [
    {
      id: "activity-7",
      title: "Shared mission propagated",
      description: "Compliance training was pushed to three team members.",
      timestamp: "Today · 08:30",
    },
    {
      id: "activity-8",
      title: "Org momentum snapshot refreshed",
      description: "Department completion framing was updated for the active quarter.",
      timestamp: "Yesterday · 16:00",
    },
    {
      id: "activity-9",
      title: "Audit surface prepared",
      description: "Recent alignment events are available for leadership review.",
      timestamp: "4 days ago",
    },
  ],
};

export const previewPlaceholderContent: Record<string, PlaceholderSurfaceContent> = {
  "/missions": {
    eyebrow: "Mission Board",
    title: "The shell is ready for a high-clarity mission board.",
    description:
      "This route is already structured for a dense card-first board with mission status, impact, and quarter framing.",
    emptyTitle: "Mission slots are ready for live alignment data.",
    emptyBody:
      "Phase 2 will replace this shell framing with real mission cards, validation, and submission state.",
    points: [
      "Quarter-aware mission summary at the top of the route",
      "Card-first operational board instead of a table-heavy layout",
      "Reserved space for impact, status, and progress framing",
    ],
    metrics: [
      { label: "Board Surfaces", value: "3", tone: "default", detail: "Summary, board, detail link" },
      { label: "Status Views", value: "4", tone: "accent", detail: "Draft to aligned" },
      { label: "Layout Readiness", value: "100%", tone: "success", detail: "Shell contract locked" },
    ],
    sideTitle: "What will live here next",
    sideBody: "Mission creation, draft recovery, and submission flow will plug into this surface without changing the layout.",
    sideHighlights: ["Create Mission route reserved", "Detail route already nested", "Impact-score hierarchy planned"],
  },
  "/missions/new": {
    eyebrow: "Create Mission",
    title: "The creation route already carries the guided-flow posture.",
    description:
      "Phase 2 will attach the three-step mission form to a shell that already understands hierarchy, spacing, and CTA placement.",
    emptyTitle: "A guided create surface lands here next.",
    emptyBody: "The structure is set up for a multi-step flow rather than a dense enterprise form.",
    points: [
      "Reserved CTA rhythm and focus area for progressive steps",
      "Layout ready for target, UoM, and impact input modules",
      "Mobile-first vertical rhythm already accounted for",
    ],
    metrics: [
      { label: "Future Steps", value: "3", tone: "default", detail: "Selection, detail, impact" },
      { label: "Form Density", value: "Low", tone: "accent", detail: "Guided instead of stacked" },
      { label: "Action Pattern", value: "Locked", tone: "success", detail: "Primary + secondary CTA" },
    ],
    sideTitle: "Implementation boundary",
    sideBody: "This route stays workflow-light in Phase 0 + 1 so the shell stays stable before mission logic lands.",
    sideHighlights: ["No CRUD yet", "No validation engine yet", "No submission API yet"],
  },
  "/missions/[id]": {
    eyebrow: "Mission Detail",
    title: "Mission detail already has a natural home in the route tree.",
    description:
      "The route is ready to host history, status, and context once live mission data is attached.",
    emptyTitle: "Detail framing is reserved for live mission context.",
    emptyBody: "Phase 2 will attach review history and state-specific actions here.",
    points: [
      "Nested route structure already locked",
      "Space reserved for timeline, metadata, and lock state",
      "Contextual hierarchy aligned to shell composition rules",
    ],
    metrics: [
      { label: "Detail Mode", value: "Focused", tone: "default", detail: "Single mission view" },
      { label: "History Surface", value: "Ready", tone: "accent", detail: "Timeline slot reserved" },
      { label: "Layout Stability", value: "High", tone: "success", detail: "No future route changes needed" },
    ],
    sideTitle: "Future detail depth",
    sideBody: "This surface will later absorb lock state, review notes, and sync history without layout restructuring.",
    sideHighlights: ["Timeline area reserved", "Metadata grouping planned", "Action cluster deferred"],
  },
  "/syncs": {
    eyebrow: "Mission Sync",
    title: "Mission Sync already feels like a quarter-bound operational surface.",
    description:
      "The route is structured for check-in inputs, progress computation framing, and timeline awareness once workflow logic arrives.",
    emptyTitle: "Sync surfaces will unlock here when the quarter layer is attached.",
    emptyBody: "The shell is already framed for due dates, status updates, and actual-versus-target posture.",
    points: [
      "Quarter banner area is reserved",
      "Mission rows will later slot into a stable content grid",
      "Operational tone is preserved without fake calculations",
    ],
    metrics: [
      { label: "Sync Window", value: "Open", tone: "success", detail: "Q2 closes Oct 15" },
      { label: "Rows Planned", value: "5", tone: "default", detail: "One per aligned mission" },
      { label: "Calc Engine", value: "Deferred", tone: "warning", detail: "Intentionally out of scope" },
    ],
    sideTitle: "Why this stays light now",
    sideBody: "The layout is fixed before any actual progress engine is allowed into the codebase.",
    sideHighlights: ["No sync engine yet", "No scoring formulas yet", "Quarter posture already framed"],
  },
  "/team": {
    eyebrow: "Team Momentum",
    title: "Manager-facing team momentum is already carved into the navigation model.",
    description:
      "This route will later absorb team cards, check-in state, and at-risk signals without changing the shell.",
    emptyTitle: "Team oversight surfaces are staged and ready.",
    emptyBody: "The current shell preserves the density needed for role-based operational views.",
    points: [
      "Manager overview posture is already distinct from employee mode",
      "Team-card density is planned inside a stable content frame",
      "At-risk treatment can attach here without redesign",
    ],
    metrics: [
      { label: "Direct Reports", value: "3", tone: "default", detail: "Visible in seeded context" },
      { label: "At-Risk Signals", value: "2", tone: "warning", detail: "One needs escalation" },
      { label: "Role Surface", value: "Manager", tone: "accent", detail: "Context-specific shell" },
    ],
    sideTitle: "Next capability layer",
    sideBody: "Planned-vs-actual team momentum plugs into this route later without changing composition.",
    sideHighlights: ["Check-ins deferred", "Team metrics staged", "Review handoff connected"],
  },
  "/review": {
    eyebrow: "Alignment Review",
    title: "Alignment Review is already framed as a queue, not a generic list page.",
    description:
      "The route is ready for queue cards, slide-over review depth, and manager decision surfaces in later phases.",
    emptyTitle: "Queue framing is ready for live review work.",
    emptyBody: "This shell keeps the operational posture without inventing premature approval logic.",
    points: [
      "Queue-first hierarchy already established",
      "Right-hand decision surface can later slide in cleanly",
      "Role-gated navigation keeps review context contained",
    ],
    metrics: [
      { label: "Awaiting Review", value: "3", tone: "warning", detail: "From two team members" },
      { label: "Route Priority", value: "High", tone: "accent", detail: "Core demo narrative" },
      { label: "Workflow Depth", value: "Deferred", tone: "default", detail: "No approvals yet" },
    ],
    sideTitle: "Why it matters now",
    sideBody: "This route proves the shell can already support operational queue density before any review engine exists.",
    sideHighlights: ["Queue hierarchy fixed", "Decision panel planned", "Audit language consistent"],
  },
  "/insights": {
    eyebrow: "Momentum Insights",
    title: "Momentum Intelligence already has a premium destination inside the shell.",
    description:
      "The insights route is ready for AI-backed summaries later, but today it still carries the right hierarchy and product tone.",
    emptyTitle: "Insight surfaces appear here after the core shell is in place.",
    emptyBody: "The shell treats intelligence as ambient product context, not a chatbot destination.",
    points: [
      "Large insight card slot reserved",
      "Summary plus signals structure already implied",
      "Operational tone preserved without fake AI copy spam",
    ],
    metrics: [
      { label: "Insight Mode", value: "Ambient", tone: "accent", detail: "Not chat-first" },
      { label: "Signal Slots", value: "3", tone: "default", detail: "Risk, score, recommendation" },
      { label: "API Layer", value: "Deferred", tone: "warning", detail: "No Claude yet" },
    ],
    sideTitle: "Future integration path",
    sideBody: "The route will later attach to `/api/insights` without changing page composition or motion behavior.",
    sideHighlights: ["Summary card reserved", "Signals list planned", "No AI orchestration in shell phase"],
  },
  "/admin": {
    eyebrow: "Workspace Admin",
    title: "Admin surfaces already feel like organizational command views.",
    description:
      "This route is ready for org-level completion, audit context, and shared mission framing once those systems go live.",
    emptyTitle: "Org framing is already established for admin work.",
    emptyBody: "The route preserves strategic density without dragging Phase 0 + 1 into backend-heavy territory.",
    points: [
      "Org-level metrics sit above detailed surfaces",
      "Admin context stays visually distinct but still on-brand",
      "Future analytics can plug into fixed layout slots",
    ],
    metrics: [
      { label: "Departments", value: "3", tone: "default", detail: "Engineering, Product, Sales" },
      { label: "Completion Rate", value: "73%", tone: "accent", detail: "Seeded for realism" },
      { label: "Audit Readiness", value: "High", tone: "success", detail: "Route tree already final" },
    ],
    sideTitle: "Strategic posture",
    sideBody: "This is where admin-level completion and governance will land once the shell stops changing.",
    sideHighlights: ["Overview first", "Shared mission handoff ready", "Audit route already nested"],
  },
  "/admin/shared-missions": {
    eyebrow: "Shared Missions",
    title: "Shared mission propagation already has a destination in the admin rail.",
    description:
      "The shell makes room for recipient selection and shared KPI framing later without inventing the workflow now.",
    emptyTitle: "Shared mission surfaces are queued behind the shell contract.",
    emptyBody: "This route stays intentionally light until the admin workflow layer begins.",
    points: [
      "Nested admin route already supports focused workflow framing",
      "Recipient and KPI posture can be added without route churn",
      "Manager access is planned from the start",
    ],
    metrics: [
      { label: "Shared KPI Paths", value: "3", tone: "default", detail: "Recipients, defaults, propagation" },
      { label: "Access Scope", value: "Mgr + Admin", tone: "accent", detail: "Role-aware by design" },
      { label: "Workflow Depth", value: "Deferred", tone: "warning", detail: "No push logic yet" },
    ],
    sideTitle: "Route discipline",
    sideBody: "Keeping this route in the shell early prevents future admin IA rewrites when shared goals arrive.",
    sideHighlights: ["Nested under admin", "Manager-visible later", "No mutation engine now"],
  },
  "/admin/audit": {
    eyebrow: "Audit Trail",
    title: "Audit Trail already reads like a governance destination, not a table stub.",
    description:
      "The route is ready for row density, actor context, and change history once live audit events exist.",
    emptyTitle: "Audit history will appear in this fixed shell surface.",
    emptyBody: "The layout is already tuned for clarity and trust before data volume arrives.",
    points: [
      "Table-lite framing can land without redesign",
      "Actor and timestamp rhythm already belongs here",
      "Admin-only access is preserved at the route level",
    ],
    metrics: [
      { label: "Recent Events", value: "12", tone: "default", detail: "Seeded into admin context" },
      { label: "Governance Mode", value: "Focused", tone: "accent", detail: "High signal, low clutter" },
      { label: "Query Layer", value: "Deferred", tone: "warning", detail: "No live audit fetch yet" },
    ],
    sideTitle: "Future shape",
    sideBody: "When live audit events arrive, they should slide into this structure instead of changing it.",
    sideHighlights: ["Row rhythm planned", "Filter posture reserved", "Admin-only by contract"],
  },
};
