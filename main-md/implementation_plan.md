# DOCUMENT 06 — Implementation Plan: Phase-Based Build Sequence

## Execution Philosophy

**Build order:** Foundation → Core flows → Visual polish → AI features → Demo hardening  
**Rule:** Never polish something before it works. Never start a new phase before the previous phase is stable.  
**Rule:** Keep the demo-critical flows (Employee creates → Manager approves → Employee syncs → Dashboard) working at every stage.

---

## Phase 0: Project Bootstrap (Hour 0–2)

**Goal:** Working skeleton deployed. Everyone can view a page.

### Tasks:
1. `npx create-next-app@latest missionos --typescript --tailwind --app`
2. Install all dependencies (shadcn/ui, framer-motion, lucide, supabase, recharts, anthropic)
3. Configure `tailwind.config.ts` with custom color tokens (match design brief color system)
4. Add Google Fonts: Syne (display), DM Sans (body), JetBrains Mono (mono)
5. Configure path aliases in `tsconfig.json`
6. Set up environment variables (`.env.local`)
7. Create Supabase project, run schema migrations
8. Seed database with realistic demo data
9. Deploy to Vercel — confirm live URL works

**Done Criteria:** `https://your-app.vercel.app` loads a page. Database has seeded data.

---

## Phase 1: Auth & Layout Shell (Hour 2–5)

**Goal:** Login works. Shell renders. Role switching works.

### Tasks:
1. Implement Supabase Auth (email/password login)
2. Create `/login` page — clean, minimal, logo + form
3. Create `profiles` table, RLS policies
4. Implement middleware for protected routes (`/app/(dashboard)`)
5. Build sidebar component:
   - Icon + label nav items
   - Collapsible behavior
   - Active state
   - Role-conditional section visibility
6. Build topbar component:
   - Page title + subtitle (passed as props)
   - Quarter indicator chip
   - **Role Switcher component** — pill buttons: Employee / Manager / Admin
     - On click: store role in React context (no re-auth in demo mode)
     - Updates sidebar sections and dashboard content instantly
7. Build layout shell: `sidebar + topbar + main content` grid
8. Create `use-current-user` hook: returns profile + effective role
9. Create seeded demo accounts:
   ```
   Employee: priya@demo.missionos.app / demo1234
   Manager:  arjun@demo.missionos.app / demo1234
   Admin:    neha@demo.missionos.app  / demo1234
   ```

**Done Criteria:** Login works. Shell renders with sidebar. Role switcher changes visible sections.

---

## Phase 2: Mission Board & Create Mission Flow (Hour 5–12)

**Goal:** Employee can create, draft, and submit a mission. Validation works.

### Tasks:

**Mission Board (`/missions`):**
1. Build `use-missions` hook (fetch missions by employee_id + quarter)
2. Build `MissionCard` component:
   - Title (Syne font)
   - Thrust area badge (colored pill)
   - Progress ring (48px, SVG)
   - Impact score chip
   - Status badge
   - `...` action menu
3. Build `/missions` page:
   - Header: "My Missions" + "Create Mission" CTA + quarter selector
   - Stats strip: Active / Aligned / Awaiting Review / Total Impact
   - Mission card grid (2 cols desktop, 1 col mobile)
   - Empty state (optimistic, with CTA)

**Create Mission Form (`/missions/new`):**
4. Build multi-step form with progress indicator (3 steps):
   - **Step 1:** Thrust Area tile selector (visual grid, not dropdown)
   - **Step 2:** Mission details (Title, Description, UoM type selector with icons)
   - **Step 3:** Target + Impact Score (slider for Impact Score, inline validation bar)
5. Build `ImpactScoreSlider` component:
   - Real-time total impact display
   - Color changes: gray → amber (80-99%) → green (100%) → red (>100%)
   - Blocks Submit if total ≠ 100%
6. Build `UomSelector` component: four tiles with icons and descriptions
7. Implement validation logic (`/lib/validate-missions.ts`):
   - Total impact = 100%
   - Per mission min 10%
   - Max 8 missions per quarter
8. Implement `/api/missions` POST route
9. "Save Draft" → status: draft | "Submit for Alignment" → status: awaiting_review
10. Add to audit log on create

**Mission Detail (`/missions/[id]`):**
11. Full mission view
12. Edit capability if status = draft
13. Lock indicator if status = aligned/locked
14. Review history timeline (if any reviews exist)

**Done Criteria:** Employee can create a mission with full validation, save draft, submit. Mission appears in board with correct status.

---

## Phase 3: Manager Alignment Review Flow (Hour 12–18)

**Goal:** Manager can review, inline-edit, approve, or return missions.

### Tasks:

**Alignment Review (`/review`):**
1. Fetch pending missions for manager's team (missions where employee.manager_id = current user)
2. Build review list: employee avatar + name, mission count, priority indicator
3. Build `ReviewPanel` slide-over component:
   - Full mission detail (read-only fields)
   - Inline editable: Target field, Impact Score slider
   - Check-in comment text area
   - "Approve Mission" → status: aligned, locked_at, locked_by set
   - "Return for Revision" → modal: revision note → status: needs_revision
4. Build `/api/missions/[id]/approve` POST route:
   - Set status = aligned
   - Set locked_at, locked_by
   - Create mission_review record
   - Trigger audit log entry
5. Build `/api/missions/[id]/return` POST route:
   - Set status = needs_revision
   - Create mission_review record with comment
6. Employee sees "Needs Revision" badge; can edit and resubmit
7. Success toast: "Mission aligned. Priya will be notified." (mock notification)

**Done Criteria:** Manager can open slide-over, read mission, approve or return. Mission status updates correctly. Audit log captures action.

---

## Phase 4: Mission Sync (Quarterly Update) (Hour 18–24)

**Goal:** Employee can log quarterly achievement. Manager can view and comment.

### Tasks:

**Mission Sync (`/syncs`):**
1. Check active quarter window (`quarter_windows` table or hardcoded for demo)
2. Show quarter banner: "Q2 Mission Sync is open · Closes Oct 15"
3. List all aligned missions for current quarter
4. Per mission row:
   - Mission title + impact score
   - Target value (read-only reference)
   - **Actual Achievement input** (numeric/date based on UoM)
   - **Mission Status selector** (3 states, segmented control)
   - Progress Score — computed and displayed live as user types
5. Build `progress-calculator.ts`:
   ```typescript
   function computeProgressScore(uomType, target, actual): number {
     switch (uomType) {
       case 'numeric_min': return Math.min((actual / target) * 100, 100);
       case 'numeric_max': return target > 0 ? Math.min((target / actual) * 100, 100) : 0;
       case 'percentage_min': return Math.min((actual / target) * 100, 100);
       case 'percentage_max': return target > 0 ? Math.min((target / actual) * 100, 100) : 0;
       case 'timeline': /* date-based */ return computeTimelineScore(target, actual);
       case 'zero_based': return actual === 0 ? 100 : 0;
     }
   }
   ```
6. Auto-save per field on blur
7. "Submit Sync" → lock entries for quarter, submitted_at timestamp
8. Build `/api/syncs` POST and PATCH routes

**Manager Check-in (`/team`):**
9. Team member cards: name, avatar, overall progress ring
10. Click card → Team member detail view
11. Per mission: planned target, actual achievement, computed score, status badge
12. "Add Check-in Comment" → modal → saves to `checkin_comments`
13. At-risk indicator: missions below 50% progress highlighted in amber

**Done Criteria:** Employee submits quarterly sync. Progress scores compute correctly for all 4 UoM types. Manager sees planned vs. actual.

---

## Phase 5: Admin Features (Hour 24–28)

**Goal:** Admin dashboard, shared missions, audit trail.

### Tasks:

**Admin Dashboard (`/admin`):**
1. Org-wide stats: Total employees, Completion Rate, Pending Approvals, At-Risk count
2. Department completion chart (bar chart via Recharts)
3. Recent audit log preview (latest 10 entries, table format)
4. Quick links: "Push Shared Mission", "View Audit Trail"

**Shared Missions (`/admin/shared-missions`):**
5. List existing shared missions + recipient count
6. "New Shared Mission" form:
   - Same fields as Create Mission form
   - Recipient multi-select (search by name or department)
   - "Push Mission" → creates linked mission records for each recipient
7. Recipient missions: Title + Target locked (read-only), only Impact Score editable
8. Achievement sync: when primary owner submits sync, auto-update all linked missions

**Audit Trail (`/admin/audit`):**
9. Filterable log: by employee, action type, date range
10. Each entry: actor avatar + name, action, entity, timestamp, changes diff
11. Clean table-lite format with row hover

**Done Criteria:** Admin can view org dashboard, push shared missions, and view audit log.

---

## Phase 6: AI Momentum Insights (Hour 28–33)

**Goal:** AI-powered insight cards that feel premium and embedded, not chatbot-like.

### Tasks:

**Insights Page (`/insights`):**
1. Build `/api/insights` POST route:
   ```typescript
   const prompt = `
   You are a mission alignment intelligence engine.
   Analyze this employee's Q2 mission progress data and respond ONLY with valid JSON:
   ${JSON.stringify(missionData)}
   
   Return: { summary, momentum_score (0-100), risk_signals (max 3), recommendations (max 2) }
   `;
   ```
2. Build `AIInsightCard` component:
   - Heading: "Momentum Intelligence" (not "AI Assistant")
   - Summary paragraph (2 sentences)
   - Momentum Score (large animated number with label)
   - Risk Signals (amber icon + text, max 3)
   - Recommendations (blue icon + text, max 2)
   - "Refresh Insights" button (re-calls API)
   - Loading skeleton while API responds
3. Embed smaller insight snippets on Mission Control dashboard (fetch on load, cache per session)
4. Manager view: per-team-member insight summary chip on team cards
5. Handle API errors gracefully: fallback to static insight copy

**Done Criteria:** Insights page loads with real Claude API response. Dashboard shows AI summary snippet. Loading states are polished.

---

## Phase 7: Visual Polish & Animation Pass (Hour 33–40)

**Goal:** The product feels premium. Every interaction is smooth.

### Tasks:

**Animations:**
1. Add Framer Motion page transitions to layout
2. Animate progress rings on mount (stroke-dashoffset)
3. Animate counter numbers (custom hook: count from 0 to value)
4. Add hover states to all cards (translateY, border glow)
5. Slide-over entrance animation
6. Loading skeleton shimmer on all async components
7. Staggered card entrance on dashboard load

**Visual Refinements:**
8. Audit all pages for spacing inconsistency (24px padding rule)
9. Ensure all status badges use correct colors from design system
10. Verify typography hierarchy across all pages
11. Check empty state designs match brief
12. Verify mobile layout: test at 375px width
13. Add momentum gradient to topbar accent elements (subtle)
14. Progress ring colors: green (≥80%), amber (50-79%), red (<50%)

**Micro-copy Audit:**
15. Verify all labels use naming_conventions.md terminology
16. All buttons: action-oriented (no "Submit", "Process", etc.)
17. All empty states: optimistic tone
18. All notifications/toasts: calm, concise, modern

**Done Criteria:** The product feels like a real SaaS product. Transitions are smooth. No janky renders. Typography is clean throughout.

---

## Phase 8: Demo Hardening & Data Quality (Hour 40–44)

**Goal:** The demo runs perfectly. Seeded data tells a compelling story.

### Tasks:

**Seeded Data Quality:**
1. Ensure all 3 demo accounts have realistic, populated data:
   - Employee (Priya): 5 missions, 2 syncs submitted, varied progress scores
   - Manager (Arjun): 3 direct reports, 2 pending reviews, 1 at-risk mission flagged
   - Admin (Neha): 8 employees, 75% completion rate, 1 audit log entry visible
2. Missions have realistic titles (not lorem ipsum)
3. Progress scores tell a story: some at 85%, one at 40% (at-risk), one at 100% (achieved)
4. Audit log has 3-4 entries showing realistic history
5. AI insights pre-generate and cache for demo accounts (avoid API latency during demo)

**Demo Flow Stability:**
6. Test full Employee flow: login → create mission → submit → see awaiting review
7. Test full Manager flow: switch role → review queue → approve → return one for revision
8. Test full Sync flow: employee → mission sync → input actuals → submit
9. Test Admin flow: push shared mission → view audit trail
10. Test role switcher: all three roles switch instantly without errors
11. Clear all console errors and warnings
12. Test on Chrome, Safari, and mobile viewport

**Done Criteria:** All four demo journeys complete without errors or awkward states.

---

## Phase 9: Deployment & Final Check (Hour 44–48)

**Goal:** Live URL works. Credentials are confirmed. Architecture diagram ready.

### Tasks:
1. Final Vercel deployment (production environment)
2. Confirm all environment variables are set in Vercel dashboard
3. Run full demo flow on production URL (not localhost)
4. Prepare login credentials card:
   ```
   Employee: priya@demo.missionos.app / demo1234
   Manager:  arjun@demo.missionos.app / demo1234
   Admin:    neha@demo.missionos.app  / demo1234
   
   OR: Use role switcher in topbar for instant switching.
   ```
5. Create architecture diagram (Excalidraw or simple diagram):
   - Next.js frontend → Vercel
   - API routes → Supabase PostgreSQL
   - AI insights → Anthropic Claude API
   - Auth → Supabase Auth
6. GitHub repo: clean README with live URL, credentials, architecture diagram
7. Final walkthrough: simulate 7-minute demo against demo_strategy.md script

**Done Criteria:** Live URL works. Credentials log in correctly. Architecture diagram exists. GitHub submitted.

---

## Implementation Risk Log

| Risk | Mitigation |
|---|---|
| Progress score formula bugs | Build and unit-test `progress-calculator.ts` in Phase 4 before UI |
| AI API latency during demo | Pre-generate and cache insights for seeded accounts |
| Supabase RLS blocking queries | Test RLS policies with each role in Phase 1; fall back to app-level filtering if complex |
| Role switcher breaking state | Use React Context, reset all queries on role change |
| Impact score validation edge cases | Test: 3 missions at 33% each (fails), exact 100% (passes), 101% (fails) |
| Mobile layout breakage | Test at 375px from Phase 7 onward, not as an afterthought |

---

## Hour-by-Hour Timeline Summary

| Hours | Phase | Key Deliverable |
|---|---|---|
| 0–2 | Phase 0: Bootstrap | Live skeleton on Vercel |
| 2–5 | Phase 1: Auth + Shell | Login, sidebar, role switcher |
| 5–12 | Phase 2: Mission Board | Create, validate, submit missions |
| 12–18 | Phase 3: Review Flow | Manager approves/returns |
| 18–24 | Phase 4: Mission Sync | Quarterly updates, progress scores |
| 24–28 | Phase 5: Admin | Shared missions, audit trail |
| 28–33 | Phase 6: AI Insights | Claude API insights embedded |
| 33–40 | Phase 7: Polish | Animations, spacing, typography |
| 40–44 | Phase 8: Demo Hardening | Seed data quality, end-to-end test |
| 44–48 | Phase 9: Deployment | Live URL, credentials, submission |

---

## Component Priority Matrix

| Component | Phase | Demo Value | Implementation Effort |
|---|---|---|---|
| Role Switcher | 1 | Critical | Low |
| Mission Card | 2 | High | Medium |
| Progress Ring | 2 | High | Low |
| Multi-step Mission Form | 2 | High | Medium |
| Impact Score Slider + Validation | 2 | Critical | Medium |
| Review Slide-over | 3 | Critical | Medium |
| Quarterly Sync Interface | 4 | Critical | Medium |
| Progress Score Calculator | 4 | Critical | Low |
| Admin Dashboard | 5 | Medium | Medium |
| Shared Mission Push | 5 | Medium | Medium |
| AI Insight Card | 6 | High | Low (API call) |
| Animated Counters | 7 | High | Low |
| Loading Skeletons | 7 | Medium | Low |
| Page Transitions | 7 | Medium | Low |
| Mobile Layout | 7 | Medium | Medium |

---

## Final Checklist Before Demo

- [ ] All three role flows work end-to-end without errors
- [ ] Validation rules: 100% total, min 10%, max 8 missions — all enforced
- [ ] Shared mission push works, recipients see locked fields
- [ ] Progress scores compute correctly for all 4 UoM types
- [ ] AI insights return real data (not fallback)
- [ ] Role switcher changes context instantly
- [ ] No console errors in browser dev tools
- [ ] All status badges render with correct colors
- [ ] Loading states visible on all async operations
- [ ] Mobile viewport looks intentional (not broken desktop)
- [ ] Seeded data tells a compelling story (not all green, not all red)
- [ ] Architecture diagram created
- [ ] GitHub repo README has live URL + credentials
- [ ] Demo rehearsed at least twice

---

*Built for AtomQuest Hackathon 1.0. MissionOS — Where teams align, execute, and accelerate.*
