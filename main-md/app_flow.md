# DOCUMENT 03 — App Flow: Navigation & User Journey Map

## Page Inventory

| Route | Page Name | Role Access | Description |
|---|---|---|---|
| `/login` | Login | All | Email/password + demo role switcher |
| `/` | Mission Control | All | Role-aware dashboard (redirects based on role) |
| `/missions` | Mission Board | Employee, Manager, Admin | List of user's active missions |
| `/missions/new` | Create Mission | Employee | Guided mission creation form |
| `/missions/[id]` | Mission Detail | All | Full mission view with history |
| `/syncs` | Mission Sync | Employee | Quarterly achievement update interface |
| `/team` | Team Momentum | Manager, Admin | Team progress overview |
| `/review` | Alignment Review | Manager, Admin | Pending approvals queue |
| `/insights` | Momentum Insights | All (scoped) | AI-generated summaries and risk signals |
| `/admin` | Workspace Admin | Admin | Org-wide overview, completion dashboard |
| `/admin/shared-missions` | Shared Missions | Admin, Manager | Push shared KPIs to employees |
| `/admin/audit` | Audit Trail | Admin | Log of all post-lock changes |

## Navigation Structure

```
SIDEBAR (Collapsible, icon + label)
├── Mission Control          ← Home dashboard
├── My Missions              ← Mission Board
├── Mission Sync             ← Quarterly updates (employee)
├── [MANAGER SECTION — visible to Manager/Admin]
│   ├── Team Momentum
│   └── Alignment Review
├── Momentum Insights        ← AI features
└── [ADMIN SECTION — visible to Admin]
    ├── Workspace Admin
    ├── Shared Missions
    └── Audit Trail

TOPBAR
├── Page title + subtitle
├── Quick action button (context-aware)
├── Quarter indicator ("Q2 · Mission Sync Open")
├── Role Switcher (demo component)
└── User avatar
```

## Authentication Flow

```
/login
  → Email + Password
  → Supabase Auth validates
  → Fetch profile (role, name, department)
  → Redirect based on role:
      Employee  → /
      Manager   → /
      Admin     → /admin
  
  [Demo Mode]
  → Click role pill (Employee / Manager / Admin)
  → Instant role context switch, no re-auth
```

## Core User Journey 1 — Employee Creates & Submits Mission

```
Employee lands on Mission Control (/)
  → Sees Mission Board summary card
  → Clicks "Create Mission" (topbar CTA)

/missions/new
  → Step 1: Thrust Area selection (tiles, not dropdown)
  → Step 2: Mission details (Title, Description, UoM type)
  → Step 3: Target + Impact Score (slider, inline validation)
  → Step 4: Review summary before submit
  → "Save Draft" → mission saved, status = Draft
  → "Submit for Alignment" → status = Awaiting Review
  → Toast: "Mission submitted successfully."
  → Redirect → /missions

/missions
  → Mission card shows "Awaiting Review" badge
  → Employee can view but not edit
```

## Core User Journey 2 — Manager Reviews & Approves

```
Manager lands on Mission Control (/)
  → Sees "3 Missions Awaiting Alignment" alert card
  → Clicks "Review Now" → /review

/review
  → List of submitted missions from team members
  → Each card: employee name, mission title, targets, impact scores
  → Click → Slide-over panel expands

Review Panel (Slide-over)
  → Read full mission
  → Inline edit: Target field, Impact Score slider
  → Add check-in comment (optional)
  → "Approve Mission" → status = Aligned; mission locks
  → "Return for Revision" → modal: enter revision note → status = Needs Revision
  → Notification banner: "Mission aligned. Team member notified."
```

## Core User Journey 3 — Employee Submits Quarterly Sync

```
Quarter window opens (e.g., Q2 → July)
Employee navigates to Mission Sync (/syncs)
  → Banner: "Q2 Mission Sync is open. Update by Oct 15."
  → List of locked missions with input fields per mission:
      - Actual Achievement (input)
      - Mission Status selector (Ready to Start / On Track / Achieved)
      - Progress Score auto-computed and displayed
  → "Save Progress" → auto-save per field
  → "Submit Sync" → locks quarterly entry; status = submitted

Manager navigates to Team Momentum (/team)
  → Per team member card: planned vs. actual, computed score
  → "Add Check-in Comment" → rich text, saved to audit trail
  → At-risk indicator highlights missions below 50% progress
```

## Core User Journey 4 — Admin Pushes Shared Mission

```
Admin navigates to Shared Missions (/admin/shared-missions)
  → "New Shared Mission" button
  → Step 1: Define mission (Thrust Area, Title, Target, UoM — locked for recipients)
  → Step 2: Select recipients (search by name/department)
  → Step 3: Set default Impact Score (recipients can adjust)
  → "Push Mission" → mission appears in each recipient's Mission Board
  → Recipients see lock icon on Title + Target fields
  → Recipients can only adjust Impact Score (within validation rules)
  → Primary owner's achievement auto-syncs to all linked copies
```

## Empty States

| Page | Empty State Message | CTA |
|---|---|---|
| Mission Board | "No active missions yet." | "Create your first mission" |
| Alignment Review | "Your team is all aligned. No pending reviews." | — |
| Mission Sync | "Sync window not yet open." | Show next window date |
| Team Momentum | "No team members assigned." | — |
| Audit Trail | "No changes logged yet." | — |
| Insights | "Not enough data yet. Insights appear after first sync." | — |

## Error & Edge Case States

| Scenario | Behavior |
|---|---|
| Impact Score total ≠ 100% | Inline warning: "Total impact score must equal 100%." Submit blocked. |
| Mission count > 8 | "Maximum 8 missions per quarter reached." Create button disabled. |
| Impact Score < 10% | Inline: "Minimum impact score per mission is 10%." |
| Sync window closed | Sync input fields are read-only; banner explains next window |
| Mission locked | Edit button replaced with lock icon and tooltip |
| Network error | Toast: "Something went wrong. Please try again." |

## Redirect Logic

| Trigger | Destination |
|---|---|
| After login (Employee) | `/` (Mission Control) |
| After login (Manager) | `/` (Mission Control — team view) |
| After login (Admin) | `/admin` |
| After mission submit | `/missions` |
| After mission approve | `/review` (next item) |
| After sync submit | `/missions` |
| After logout | `/login` |

---