# MissionOS Phase 0 + Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the MissionOS Phase 0 + Phase 1 operational shell in this workspace with a premium dashboard frame, full route scaffold, real auth boundary, lightweight role switching, and believable role-aware placeholder destinations that future phases can extend additively.

**Architecture:** The implementation establishes the permanent application frame before any workflow depth. It prioritizes shell stability, route inheritance, seeded domain contracts, and centralized role logic so future phases replace data sources and route content without rewriting layout, motion, navigation, or feature boundaries.

**Tech Stack:** Next.js 14 App Router, TypeScript strict mode, Tailwind CSS, shadcn/ui primitives, Framer Motion, Lucide React, Supabase Auth helpers, Supabase JS client, date-fns, clsx, tailwind-merge

---

## 1. Implementation Strategy

### Why the implementation order matters

The implementation order is the main safeguard against AI drift and later rewrites. Phase 0 + Phase 1 only succeed if the permanent product shell is locked before deeper feature work begins. That means the order must move from immutable foundation to reusable shell to auth/role boundaries to page surfaces to polish.

If implementation begins with route surfaces before layout, later pages will diverge in spacing, header composition, motion, and navigation behavior. If implementation begins with auth before shell contracts, role and session logic will leak across components without a stable rendering model. If seeded data is added after pages exist, pages will embed ad hoc mock blobs that later phases must unwind.

The safest sequence is:

1. repository bootstrap and design tokens
2. structural contracts and domain boundaries
3. shell composition primitives
4. auth and role plumbing
5. route surface rollout
6. responsive and polish pass

This keeps later work additive because each layer depends on a stable layer beneath it.

### How additive architecture is preserved

Additive architecture is preserved by fixing a small set of permanent contracts early:

- route groups and route map
- dashboard shell layout
- page composition grammar
- centralized role access map
- effective role resolver
- typed domain contracts
- seeded selector boundaries
- motion vocabulary
- placeholder surface patterns

Later phases should swap internals, not reshape surfaces. For example:

- mission routes later replace placeholder panels with live Mission Board content
- manager routes later replace queue placeholders with review logic
- insights later replace seeded shells with Claude-backed data
- admin surfaces later replace static stats framing with live org queries

The pages, layouts, headers, loading states, and motion behavior remain intact.

### How future phases avoid rewrites

Future phases avoid rewrites when three rules are enforced now:

1. Pages consume hooks and selectors, not inline mock objects.
2. Role access is defined in one place, not scattered inside components.
3. Placeholder destinations already use the final layout and information hierarchy.

This means later phases can:

- replace local seed selectors with Supabase-backed hooks
- attach new mutations and APIs inside reserved feature folders
- upgrade route content while preserving page structure

They should not need to:

- split layouts again
- rename route groups
- recreate the sidebar or topbar contract
- rework motion timing
- move domain types between folders

### How to minimize AI implementation instability

The plan assumes incremental AI execution with limited context windows. To keep execution reliable:

- tasks are small, isolated, and sequential
- each task has explicit files, dependencies, and validation gates
- responsibilities are separated by file and folder up front
- only a few cross-cutting systems exist in Phase 0 + 1
- no task is allowed to quietly expand into deferred workflow logic

### Risk areas

- **Root bootstrap risk:** the repo already contains docs and a git history, so app bootstrap must happen in-place without nesting a second repository or moving docs.
- **Role drift risk:** ad hoc visibility checks could spread into layouts and pages if access logic is not centralized early.
- **Placeholder quality risk:** routes may look visually incomplete if they are treated like temporary holding pages instead of operational destinations.
- **Responsive inconsistency risk:** desktop-first surfaces may break on mobile if the overlay nav and spacing system are not designed as first-class shell behaviors.
- **Backend overreach risk:** auth wiring may accidentally expand into business logic or generalized data infrastructure.

### Stability protections

- bootstrap the app at the repository root so docs, git history, and app code share one permanent workspace
- define the route access map before rendering navigational surfaces
- build shared shell primitives before any route-specific page composition
- keep shell seed data in `src/data` and access it through selectors/hooks
- reserve future feature folders now but keep implementations shallow
- run `npm run lint`, `npm run typecheck`, and `npm run build` after each major phase boundary
- use frequent commits after Phase 0, Phase 1B, Phase 1C, Phase 1D, and the Polish Pass

### Architectural safeguards

- One shell layout under `src/app/(dashboard)/layout.tsx`
- One role provider and effective role resolver
- One navigation access map
- One page composition grammar
- One typography and spacing system
- One seeded data layer for shell surfaces
- One motion vocabulary shared across routes

---

## 2. Phase Breakdown

### Phase 0

**Goal**

Establish the runnable repository foundation, design tokens, typography system, and base application configuration in the workspace root.

**Exact deliverables**

- root Next.js app scaffold in the existing repository
- `package.json`, `tsconfig.json`, Next config, Tailwind config, PostCSS config, ESLint config
- base `src/app/layout.tsx`, `src/app/globals.css`, and root dashboard entry at `src/app/(dashboard)/page.tsx`
- theme tokens mapped from the approved MissionOS design system
- typography variables for display, body, and mono fonts
- `cn()` utility and app-wide constants file
- package scripts for dev, build, lint, and typecheck

**Dependency assumptions**

- approved shell spec exists
- no app code currently exists in the repo

**Implementation boundaries**

- do not create mission, review, sync, insights, or admin logic
- do not build reusable product components yet beyond absolute foundation helpers

**Explicit non-goals**

- no route placeholders beyond the root boot path
- no auth wiring
- no shell UI

### Phase 1A

**Goal**

Define long-term repository structure, domain contracts, route groups, seeded data boundaries, and Supabase integration surfaces without building workflow depth.

**Exact deliverables**

- full `src/app/(auth)` and `src/app/(dashboard)` route scaffold
- future feature folders and shell folders created
- typed domain contracts in `src/types`
- seeded domain-shaped shell data in `src/data`
- Supabase client/server/middleware helper files
- providers scaffold and centralized role access map

**Dependency assumptions**

- Phase 0 base app and configs are complete

**Implementation boundaries**

- files may be scaffolded for future routes
- only active auth and demo role API routes are created for real

**Explicit non-goals**

- no login UI yet
- no real shell layout yet
- no placeholder route composition yet

### Phase 1B

**Goal**

Build the permanent shell composition system: sidebar, topbar, content container, page headers, surface primitives, shell metrics, motion wrappers, and mobile navigation.

**Exact deliverables**

- dashboard layout shell
- sidebar with desktop and collapsed states
- mobile overlay navigation
- topbar with quarter chip, role switch area, and user surface
- shared cards, stat blocks, section labels, empty states, and skeletons
- page transition wrapper and motion timing primitives

**Dependency assumptions**

- route scaffold and access maps exist
- seed selectors exist for role-aware shell framing

**Implementation boundaries**

- shell components may use seeded shell data only
- route-specific business content is still deferred

**Explicit non-goals**

- no mission workflows
- no insights API
- no chart engines

### Phase 1C

**Goal**

Implement the real auth boundary and lightweight role override system without drifting into backend-heavy workflow logic.

**Exact deliverables**

- real login page
- protected dashboard routing
- profile/session hydration contract
- role provider with `realProfile` and `effectiveRole`
- demo role override persistence via API route and cookie
- centralized redirects and invalid-route handling by role

**Dependency assumptions**

- shell components exist to host auth-aware surfaces
- Supabase helpers and access contracts exist

**Implementation boundaries**

- only auth/session/profile concerns are live
- no mission or admin data queries beyond seed-backed placeholders

**Explicit non-goals**

- no production-grade RBAC
- no profile editing
- no user management workflows

### Phase 1D

**Goal**

Roll out all documented Phase 0 + Phase 1 route surfaces as premium role-aware destinations using the permanent shell and seeded domain-shaped placeholders.

**Exact deliverables**

- Mission Control root by role
- polished placeholders for `/missions`, `/missions/new`, `/missions/[id]`, `/syncs`, `/team`, `/review`, `/insights`, `/admin`, `/admin/shared-missions`, `/admin/audit`
- route-level empty states, skeleton framing, and summary surfaces
- coherent role-gated navigation across all destinations

**Dependency assumptions**

- shell layout is stable
- auth and role systems are working
- seeded data selectors can provide believable framing

**Implementation boundaries**

- placeholder routes may show metrics, lists, and shell panels
- placeholders may not implement deferred workflows

**Explicit non-goals**

- no CRUD
- no mutation APIs beyond role override
- no chart calculations beyond static visual framing if used

### Polish Pass

**Goal**

Stabilize the shell so it already feels deployable, responsive, and product-real before deeper phases begin.

**Exact deliverables**

- responsive behavior verified across core breakpoints
- motion timing normalized
- empty-state and skeleton consistency pass
- copy audit for MissionOS language
- spacing audit across routes
- lint, typecheck, and production build green

**Dependency assumptions**

- all route surfaces are present

**Implementation boundaries**

- polish may refine existing shell surfaces only
- no new feature systems are introduced

**Explicit non-goals**

- no extra visual flourish outside the approved shell language
- no expansion into deferred product systems

---

## 3. Task Decomposition

### Task 01: Bootstrap the root Next.js application

**Objective**

Create the Next.js app foundation directly in the repository root without nesting the application in a secondary folder.

**Files/folders affected**

- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `eslint.config.mjs` or project-equivalent lint config
- Create: `public/`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/(dashboard)/page.tsx`

**Dependencies**

- none

**Completion criteria**

- `npm install` completes successfully
- `npm run dev` starts a valid Next.js app from the repo root
- docs directories remain untouched and accessible

**Validation expectations**

- `npm run lint`
- `npm run build`

### Task 02: Install and normalize Phase 0 + Phase 1 dependencies

**Objective**

Install only the libraries required for shell, auth scaffolding, motion, icons, and utility composition.

**Files/folders affected**

- Modify: `package.json`
- Modify: `package-lock.json`

**Dependencies**

- Task 01

**Completion criteria**

- dependencies are limited to approved Phase 0 + 1 stack
- no workflow or analytics libraries are added beyond shell needs

**Validation expectations**

- `npm ls next react react-dom`
- `npm run build`

### Task 03: Configure theme tokens and typography variables

**Objective**

Translate the approved MissionOS visual system into Tailwind and global CSS variables.

**Files/folders affected**

- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Dependencies**

- Tasks 01-02

**Completion criteria**

- color tokens exist for background, surfaces, borders, text, accent, and statuses
- font variables for display, body, and mono are applied globally
- body and headings already reflect the approved visual identity

**Validation expectations**

- open the app and verify fonts, background, and text colors are applied
- `npm run lint`

### Task 04: Create base utilities and shared constants

**Objective**

Add the minimum global helpers the rest of the shell depends on.

**Files/folders affected**

- Create: `src/lib/cn.ts`
- Create: `src/lib/constants.ts`
- Modify: `tsconfig.json` for path alias consistency if needed

**Dependencies**

- Task 03

**Completion criteria**

- `@/*` path alias resolves cleanly
- `cn()` is available to all components
- app-level constants are centralized instead of hardcoded inline

**Validation expectations**

- `npm run typecheck`

### Task 05: Establish final folder structure and route groups

**Objective**

Create the permanent folder boundaries for app routes, features, providers, types, data, and shell components.

**Files/folders affected**

- Create: `src/app/(auth)/login/`
- Create: `src/app/(dashboard)/`
- Create: `src/app/(dashboard)/missions/`
- Create: `src/app/(dashboard)/missions/new/`
- Create: `src/app/(dashboard)/missions/[id]/`
- Create: `src/app/(dashboard)/syncs/`
- Create: `src/app/(dashboard)/team/`
- Create: `src/app/(dashboard)/review/`
- Create: `src/app/(dashboard)/insights/`
- Create: `src/app/(dashboard)/admin/`
- Create: `src/app/(dashboard)/admin/shared-missions/`
- Create: `src/app/(dashboard)/admin/audit/`
- Create: `src/components/layout/`
- Create: `src/components/dashboard/`
- Create: `src/components/shell/`
- Create: `src/components/ui/`
- Create: `src/features/auth/`
- Create: `src/features/shell/`
- Create: `src/features/missions/`
- Create: `src/features/review/`
- Create: `src/features/sync/`
- Create: `src/features/insights/`
- Create: `src/features/admin/`
- Create: `src/hooks/`
- Create: `src/providers/`
- Create: `src/types/`
- Create: `src/data/`
- Create: `src/lib/supabase/`

**Dependencies**

- Task 01

**Completion criteria**

- the repo shape matches the approved shell spec
- future domains exist as folders even when implementations are shallow

**Validation expectations**

- `Get-ChildItem -Recurse src`

### Task 06: Define domain contracts and shell-facing types

**Objective**

Create the shared type system that shell surfaces and future phases will both use.

**Files/folders affected**

- Create: `src/types/index.ts`

**Dependencies**

- Task 05

**Completion criteria**

- `UserRole`, `Profile`, `Mission`, `MissionSync`, `MissionReview`, `CheckinComment`, `AuditLog`, `InsightResponse`, and `QuarterWindow` are defined
- shell-facing aggregate types exist for metrics, activity, alerts, and placeholder panels

**Validation expectations**

- `npm run typecheck`

### Task 07: Add seeded domain data and shell selectors

**Objective**

Create believable, future-shaped local data for the shell and placeholders.

**Files/folders affected**

- Create: `src/data/seed.ts`
- Create: `src/data/shell-selectors.ts`
- Create: `src/features/shell/shell-data.ts`

**Dependencies**

- Task 06

**Completion criteria**

- seed data includes Priya, Arjun, Neha, and supporting team members
- seed data includes quarter context, role-aware stats, activity items, review counts, and admin framing
- selectors expose typed route-facing data without pages importing raw seed blobs directly

**Validation expectations**

- `npm run typecheck`
- manual inspection confirms no lorem ipsum and no generic placeholders

### Task 08: Define centralized route access and navigation contracts

**Objective**

Create the single source of truth for route visibility, navigation groups, default redirects, and invalid-route fallback behavior.

**Files/folders affected**

- Create: `src/features/shell/route-access.ts`
- Create: `src/features/shell/navigation.ts`
- Create: `src/features/shell/route-meta.ts`

**Dependencies**

- Tasks 05-07

**Completion criteria**

- role-to-route access map is centralized
- sidebar sections and nav items are defined in one place
- default destinations and fallback redirects are defined per role

**Validation expectations**

- `npm run typecheck`
- manual review confirms no role rules are embedded in unrelated files yet

### Task 09: Add Supabase helpers and middleware structure

**Objective**

Create the real auth/session integration boundary without adding business-workflow complexity.

**Files/folders affected**

- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `middleware.ts`
- Create: `src/app/api/auth/callback/route.ts`

**Dependencies**

- Task 05

**Completion criteria**

- client and server helpers are separated
- middleware protects dashboard routes and allows auth routes
- callback route exists for Supabase auth flow completion

**Validation expectations**

- `npm run lint`
- `npm run build`

### Task 10: Create providers and auth/session hooks

**Objective**

Build the provider layer and reusable hooks for current user, role context, and quarter context.

**Files/folders affected**

- Create: `src/providers/app-providers.tsx`
- Create: `src/providers/role-provider.tsx`
- Create: `src/hooks/use-role-context.ts`
- Create: `src/hooks/use-current-user.ts`
- Create: `src/hooks/use-quarter.ts`
- Create: `src/features/auth/profile.ts`

**Dependencies**

- Tasks 06-09

**Completion criteria**

- `realProfile` and `effectiveRole` are represented explicitly
- quarter context is available to shell surfaces
- hooks are reusable across dashboard and placeholders

**Validation expectations**

- `npm run typecheck`

### Task 11: Create the role override persistence flow

**Objective**

Implement the lightweight demo role override system with cookie persistence and no database role mutation.

**Files/folders affected**

- Create: `src/app/api/demo/switch-role/route.ts`
- Create: `src/features/auth/effective-role.ts`
- Modify: `src/providers/role-provider.tsx`
- Modify: `src/hooks/use-role-context.ts`

**Dependencies**

- Task 10

**Completion criteria**

- effective role is resolved from `roleOverride ?? realProfile.role`
- client role switching persists in a cookie readable by server-rendered routes
- current route is preserved when still valid and redirected when invalid

**Validation expectations**

- manual browser check with hard refresh after role switch
- `npm run build`

### Task 12: Build shell surface primitives

**Objective**

Create the reusable product-pattern layer for cards, metrics, labels, empty states, and skeletons.

**Files/folders affected**

- Create: `src/components/shell/surface-card.tsx`
- Create: `src/components/shell/stat-card.tsx`
- Create: `src/components/shell/stats-strip.tsx`
- Create: `src/components/shell/section-label.tsx`
- Create: `src/components/shell/operational-empty-state.tsx`
- Create: `src/components/shell/shell-skeleton.tsx`
- Create: `src/components/shell/placeholder-panel.tsx`

**Dependencies**

- Tasks 03-04 and 07

**Completion criteria**

- shared shell primitives exist for page composition
- primitives enforce consistent padding, border, and type rhythm
- empty and loading states already feel product-real

**Validation expectations**

- render primitives in the root page or a temporary shell harness and visually verify spacing
- `npm run lint`

### Task 13: Build motion primitives and timing tokens

**Objective**

Centralize the shell motion vocabulary before any routed surfaces use it.

**Files/folders affected**

- Create: `src/lib/motion.ts`
- Create: `src/components/shell/page-transition.tsx`
- Create: `src/components/shell/fade-in.tsx`

**Dependencies**

- Task 12

**Completion criteria**

- motion timing tokens exist for hover, page, panel, layout, and stagger behavior
- route transition wrapper exists
- motion remains restrained and matches the approved shell spec

**Validation expectations**

- manual browser check confirms no bounce or elastic motion
- `npm run typecheck`

### Task 14: Build the desktop sidebar and mobile nav overlay

**Objective**

Implement permanent role-aware navigation surfaces for desktop and mobile.

**Files/folders affected**

- Create: `src/components/layout/sidebar.tsx`
- Create: `src/components/layout/nav-section.tsx`
- Create: `src/components/layout/nav-item.tsx`
- Create: `src/components/layout/mobile-nav.tsx`

**Dependencies**

- Tasks 08, 12, and 13

**Completion criteria**

- sidebar expands and collapses on desktop
- mobile nav opens as a full-screen overlay
- nav rendering is driven by the centralized access map

**Validation expectations**

- manual desktop and mobile viewport check
- verify role changes update visible sections without manual page refresh

### Task 15: Build the topbar, page header, and shell identity surfaces

**Objective**

Implement the permanent top-level framing for all dashboard pages.

**Files/folders affected**

- Create: `src/components/layout/topbar.tsx`
- Create: `src/components/layout/page-header.tsx`
- Create: `src/components/layout/role-switcher.tsx`
- Create: `src/components/layout/quarter-chip.tsx`
- Create: `src/components/layout/user-surface.tsx`

**Dependencies**

- Tasks 10-14

**Completion criteria**

- topbar contains quarter context, role switch entry point, and user identity surface
- page headers follow the standard MissionOS hierarchy
- role switching UI feels instant and lightweight

**Validation expectations**

- manual interaction check for topbar across multiple routes
- `npm run lint`

### Task 16: Create the dashboard shell layout

**Objective**

Compose the permanent `/(dashboard)` layout using the sidebar, topbar, and page transition system.

**Files/folders affected**

- Create: `src/app/(dashboard)/layout.tsx`
- Modify: `src/app/layout.tsx`

**Dependencies**

- Tasks 14-15

**Completion criteria**

- protected pages inherit one permanent operational shell
- content container, topbar, and sidebar alignment are stable across routes
- desktop and mobile shell behavior both function

**Validation expectations**

- manual navigation across at least three dashboard routes
- `npm run build`

### Task 17: Implement the login page and public auth entry

**Objective**

Create a real, visually polished login page aligned with the MissionOS product identity.

**Files/folders affected**

- Create: `src/app/(auth)/login/page.tsx`
- Create: `src/features/auth/login-form.tsx`
- Modify: `src/app/(dashboard)/page.tsx`

**Dependencies**

- Tasks 03, 09, 10, and 12

**Completion criteria**

- login page looks product-real and not like a default auth form
- unauthenticated users are routed to login
- authenticated users reach their role-appropriate dashboard destination

**Validation expectations**

- manual login/logout smoke test
- `npm run build`

### Task 18: Implement root Mission Control role surfaces

**Objective**

Create the first true dashboard surface with role-aware shell content.

**Files/folders affected**

- Create: `src/app/(dashboard)/page.tsx`
- Create: `src/components/dashboard/mission-control-employee.tsx`
- Create: `src/components/dashboard/mission-control-manager.tsx`
- Create: `src/components/dashboard/mission-control-admin.tsx`
- Create: `src/components/dashboard/activity-feed.tsx`

**Dependencies**

- Tasks 07, 12, 15, 16, and 17

**Completion criteria**

- `/` renders a distinct shell surface per effective role
- metrics, summary panels, and activity surfaces feel operationally believable
- root page already demonstrates the permanent page composition grammar

**Validation expectations**

- manual role-switch walkthrough on `/`
- screenshot review for visual density and hierarchy

### Task 19: Scaffold employee route placeholders

**Objective**

Roll out premium, non-generic placeholder destinations for employee-facing routes.

**Files/folders affected**

- Create: `src/app/(dashboard)/missions/page.tsx`
- Create: `src/app/(dashboard)/missions/new/page.tsx`
- Create: `src/app/(dashboard)/missions/[id]/page.tsx`
- Create: `src/app/(dashboard)/syncs/page.tsx`
- Create: `src/components/shell/mission-board-placeholder.tsx`
- Create: `src/components/shell/create-mission-placeholder.tsx`
- Create: `src/components/shell/mission-detail-placeholder.tsx`
- Create: `src/components/shell/sync-placeholder.tsx`

**Dependencies**

- Tasks 07, 12, 15, and 16

**Completion criteria**

- each route clearly signals its future operational purpose
- no page uses generic centered empty-state treatment
- placeholders consume shared shell patterns and seeded selectors

**Validation expectations**

- manual route review on desktop and mobile
- copy audit for MissionOS terminology

### Task 20: Scaffold manager route placeholders

**Objective**

Roll out premium, role-aware placeholder destinations for manager-facing routes.

**Files/folders affected**

- Create: `src/app/(dashboard)/team/page.tsx`
- Create: `src/app/(dashboard)/review/page.tsx`
- Create: `src/components/shell/team-placeholder.tsx`
- Create: `src/components/shell/review-placeholder.tsx`

**Dependencies**

- Tasks 07, 08, 12, 15, and 16

**Completion criteria**

- manager routes feel like real operational surfaces with queue and team framing
- non-manager roles cannot access them
- manager-facing destination copy aligns with MissionOS language

**Validation expectations**

- manual role-gating check as employee, manager, and admin
- `npm run lint`

### Task 21: Scaffold admin and insights route placeholders

**Objective**

Roll out premium placeholders for insights and admin destinations without implementing deferred systems.

**Files/folders affected**

- Create: `src/app/(dashboard)/insights/page.tsx`
- Create: `src/app/(dashboard)/admin/page.tsx`
- Create: `src/app/(dashboard)/admin/shared-missions/page.tsx`
- Create: `src/app/(dashboard)/admin/audit/page.tsx`
- Create: `src/components/shell/insights-placeholder.tsx`
- Create: `src/components/shell/admin-overview-placeholder.tsx`
- Create: `src/components/shell/shared-missions-placeholder.tsx`
- Create: `src/components/shell/audit-placeholder.tsx`

**Dependencies**

- Tasks 07, 08, 12, 15, and 16

**Completion criteria**

- insights surface feels premium without live Claude data
- admin routes feel structured and operational without admin workflow logic
- manager access to `/admin/shared-missions` follows the centralized access contract

**Validation expectations**

- manual route review as manager and admin
- screenshot review for placeholder realism

### Task 22: Harden redirect and invalid-route behavior

**Objective**

Ensure role changes, protected routes, and fallback navigation behave coherently across refreshes and deep links.

**Files/folders affected**

- Modify: `middleware.ts`
- Modify: `src/features/shell/route-access.ts`
- Modify: `src/providers/role-provider.tsx`
- Modify: `src/app/(dashboard)/layout.tsx`

**Dependencies**

- Tasks 11 and 19-21

**Completion criteria**

- invalid destinations redirect to the nearest valid role landing surface
- refresh preserves effective role override
- protected routes never expose broken states to unauthorized roles

**Validation expectations**

- manual deep-link check into restricted routes
- manual role switch while inside manager/admin routes

### Task 23: Run responsive behavior pass

**Objective**

Resolve shell and placeholder issues across core breakpoints before visual polish.

**Files/folders affected**

- Modify: layout and shell component files as needed
- Modify: placeholder route files as needed

**Dependencies**

- Tasks 14-22

**Completion criteria**

- sidebar, topbar, page headers, stat strips, and placeholder panels feel intentional at mobile width
- no horizontal scroll is introduced
- overlay nav interaction is stable

**Validation expectations**

- manual checks at 375px, 768px, 1024px, and wide desktop
- `npm run build`

### Task 24: Run motion, spacing, and copy consistency pass

**Objective**

Normalize the shell so every route already feels part of one finished product.

**Files/folders affected**

- Modify: shell primitives
- Modify: layout components
- Modify: dashboard surfaces
- Modify: placeholder route surfaces

**Dependencies**

- Task 23

**Completion criteria**

- motion timing is consistent across route changes and overlays
- all route headers, card spacing, and surface rhythm align
- empty states and skeletons follow one operational tone
- MissionOS vocabulary is used throughout

**Validation expectations**

- screenshot review across all routes
- copy review against the approved terminology

### Task 25: Run final build-quality gate for the shell

**Objective**

Confirm the Phase 0 + Phase 1 shell is deployable and safe to hand off to future phases.

**Files/folders affected**

- Modify: any remaining shell files only if required by validation

**Dependencies**

- Tasks 01-24

**Completion criteria**

- lint passes
- typecheck passes
- production build passes
- the shell feels deployable and coherent in manual review

**Validation expectations**

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- manual role-switch walkthrough across the full route map

---

## 4. Repository Structure Plan

### Final folder structure after Phase 0 + Phase 1

```text
/
  docs/
    superpowers/
      plans/
      specs/
  public/
  src/
    app/
      layout.tsx
      globals.css
      (auth)/
        login/
          page.tsx
      (dashboard)/
        layout.tsx
        page.tsx
        missions/
          page.tsx
          new/
            page.tsx
          [id]/
            page.tsx
        syncs/
          page.tsx
        team/
          page.tsx
        review/
          page.tsx
        insights/
          page.tsx
        admin/
          page.tsx
          shared-missions/
            page.tsx
          audit/
            page.tsx
      api/
        auth/
          callback/
            route.ts
        demo/
          switch-role/
            route.ts
    components/
      layout/
        sidebar.tsx
        nav-section.tsx
        nav-item.tsx
        mobile-nav.tsx
        topbar.tsx
        page-header.tsx
        role-switcher.tsx
        quarter-chip.tsx
        user-surface.tsx
      dashboard/
        mission-control-employee.tsx
        mission-control-manager.tsx
        mission-control-admin.tsx
        activity-feed.tsx
      shell/
        surface-card.tsx
        stat-card.tsx
        stats-strip.tsx
        section-label.tsx
        operational-empty-state.tsx
        shell-skeleton.tsx
        placeholder-panel.tsx
        mission-board-placeholder.tsx
        create-mission-placeholder.tsx
        mission-detail-placeholder.tsx
        sync-placeholder.tsx
        team-placeholder.tsx
        review-placeholder.tsx
        insights-placeholder.tsx
        admin-overview-placeholder.tsx
        shared-missions-placeholder.tsx
        audit-placeholder.tsx
        page-transition.tsx
        fade-in.tsx
      ui/
        ...installed shadcn primitives only
    data/
      seed.ts
      shell-selectors.ts
    features/
      auth/
        profile.ts
        effective-role.ts
        login-form.tsx
      shell/
        route-access.ts
        route-meta.ts
        navigation.ts
        shell-data.ts
      missions/
      review/
      sync/
      insights/
      admin/
    hooks/
      use-role-context.ts
      use-current-user.ts
      use-quarter.ts
    lib/
      cn.ts
      constants.ts
      motion.ts
      supabase/
        client.ts
        server.ts
        middleware.ts
    providers/
      app-providers.tsx
      role-provider.tsx
    types/
      index.ts
  middleware.ts
  next.config.ts
  package.json
  postcss.config.js
  tailwind.config.ts
  tsconfig.json
```

### Ownership boundaries

- `src/app`: routing and page entry surfaces only
- `src/components/layout`: permanent navigation and shell frame pieces
- `src/components/dashboard`: role-specific Mission Control assemblies
- `src/components/shell`: reusable product-pattern surfaces and placeholder assemblies
- `src/features/auth`: auth-specific logic, role resolution, and login UI
- `src/features/shell`: access maps, navigation definitions, and shell-facing selectors
- `src/data`: local seeded data and selector inputs
- `src/hooks`: reusable cross-feature consumption hooks
- `src/lib`: low-level utilities and integration helpers
- `src/providers`: app-wide client context boundaries
- `src/types`: shared domain contracts

### Future extensibility

- future phases attach live data inside `features/*` without changing page paths
- new route logic expands existing route files instead of moving them
- additional role-aware hooks build on the same provider and access-map contract
- workflow APIs can later extend `src/app/api/` under the reserved domain structure

### Anti-chaos safeguards

- page files remain thin and consume shell components plus feature hooks
- no raw seed blobs are imported directly into many routes
- no duplicate nav definitions
- no duplicate role checks across layout and pages
- no ad hoc motion values inside unrelated components

---

## 5. Component Implementation Order

### 1. Foundation primitives

- `src/lib/cn.ts`
- `src/lib/constants.ts`
- typography and theme tokens

**Why first**

All later components need shared class merging, constants, and stable tokens. Building shell UI before this invites spacing and styling drift.

### 2. Domain and access contracts

- `src/types/index.ts`
- `src/data/seed.ts`
- `src/data/shell-selectors.ts`
- `src/features/shell/route-access.ts`
- `src/features/shell/navigation.ts`

**Why second**

The shell cannot remain additive if pages and layouts guess at role logic or data shapes. These contracts define what the shell is allowed to render.

### 3. Motion and shell surface primitives

- `surface-card`
- `stat-card`
- `stats-strip`
- `section-label`
- `operational-empty-state`
- `shell-skeleton`
- `page-transition`

**Why third**

These set the visual grammar for all routed surfaces. If route pages are built first, they will each invent their own local structure.

### 4. Navigation and shell layout

- `sidebar`
- `mobile-nav`
- `topbar`
- `page-header`
- `role-switcher`
- `quarter-chip`
- `user-surface`
- `src/app/(dashboard)/layout.tsx`

**Why fourth**

All route surfaces should land inside the permanent shell once and stay there. Building route pages before the shell would cause route-level layout rewrites.

### 5. Providers and auth/session layer

- `app-providers`
- `role-provider`
- `use-current-user`
- `use-role-context`
- Supabase helpers
- middleware
- auth callback
- login page

**Why fifth**

By this point the shell exists, so auth and role logic can plug into a stable frame and immediately drive real navigation and route behavior.

### 6. Root Mission Control surfaces

- role-specific Mission Control components
- activity feed

**Why sixth**

The root dashboard is the first proof that the shell feels like a real product. It validates layout, role-awareness, metrics, and seeded realism before placeholder rollout across all routes.

### 7. Placeholder route surfaces

- employee placeholder surfaces
- manager placeholder surfaces
- insights placeholder
- admin placeholder surfaces

**Why seventh**

Once the shell and dashboard grammar are stable, placeholders can reuse them consistently instead of creating route-by-route experiments.

### 8. Skeleton and polish refinements

- loading treatment normalization
- spacing adjustments
- copy pass
- responsive refinements
- motion pass

**Why last**

Polish must refine stable surfaces, not move architecture. This keeps the pass focused and low-risk.

---

## 6. Role System Plan

### Effective role architecture

The role system is built around a two-layer identity model:

- `realProfile`: authoritative identity from Supabase profile data
- `effectiveRole`: `roleOverride ?? realProfile.role`

The real profile remains the source of truth for who the user is. The override only changes which organizational perspective the shell renders.

### Role switching flow

1. User logs in once through the real auth flow.
2. Profile is hydrated from Supabase.
3. Role provider computes `effectiveRole`.
4. Clicking a role switch control posts the desired override to `/api/demo/switch-role`.
5. The API writes a cookie and returns the new effective role.
6. Client state updates immediately.
7. Sidebar, topbar, and route surfaces re-render from the centralized access map.
8. If the current route is valid for the new role, stay in place.
9. If the route is invalid, redirect to that role’s default landing route.

### Persistence strategy

- cookie name should be explicit and shell-specific, for example `missionos_role_override`
- cookie is lightweight and readable by server-rendered routes
- override persists across refreshes
- clearing the override returns the app to `realProfile.role`

### Role visibility map

- `employee`: `/`, `/missions`, `/missions/new`, `/missions/[id]`, `/syncs`, `/insights`
- `manager`: all employee destinations plus `/team`, `/review`, `/admin/shared-missions`
- `admin`: all destinations including `/admin` and `/admin/audit`

### Navigation gating

- sidebar sections are derived from the centralized navigation definition
- no route computes its own ad hoc nav visibility
- manager-only and admin-only sections are added or removed by the access map

### Shell gating

- middleware handles authentication boundary
- layout-level logic handles effective role and invalid-route fallback
- page-level gating should be minimal because pages are only mounted through the centralized shell contract

### Future-safe expansion boundaries

- new roles, if ever introduced, extend the access map and defaults without rewriting providers
- later workflow permissions can be layered on top of the same access contract
- no enterprise RBAC matrix is introduced in Phase 0 + Phase 1

---

## 7. Seeded Data Strategy

### Mock data structure

Seed data should be domain-shaped and role-aware from the start.

Core entities in `src/data/seed.ts`:

- demo profiles
- quarter windows
- activity items
- route-level summary metrics
- placeholder lists for missions, reviews, team health, admin audit surfaces, and insights framing

Selectors in `src/data/shell-selectors.ts` should expose:

- current role metrics
- current role activity feed
- current role pending items
- placeholder route summaries
- quarter chip state

### Seeded organization shape

Use the MissionOS demo narrative as the base:

- Priya Sharma as employee lens
- Arjun Nair as manager lens
- Neha Gupta as admin lens
- Rahul Mehta, Sneha Iyer, and additional team members to make the workspace feel populated
- at least three departments represented in shell summaries

### Realistic operational states

The shell should show mixed momentum states even before workflows are live:

- some missions framed as aligned and progressing
- one or two at-risk signals referenced in manager/admin surfaces
- pending review counts visible for manager views
- shared-mission framing visible for manager/admin destinations

### Timeline realism

- one active quarter context should be consistent across the shell
- quarter chip, banners, and placeholder copy should reference the same active cycle
- timestamps in activity feeds should feel recent and operational, not synthetic

### Metrics realism

Metrics should look believable, not mathematically perfect:

- employee dashboard can show 5 active missions, mixed progress, and one attention area
- manager dashboard can show pending alignment items and one at-risk team member
- admin dashboard can show org-wide counts and recent audit framing

### Dashboard realism

Shell data should support:

- demo screenshots
- believable activity feeds
- premium empty states that still imply a working product
- future route surfaces that feel like real destinations now

### Seed data rules

- no lorem ipsum
- no repeated generic labels
- no placeholder names like “User 1”
- no all-green or all-perfect stats
- no fake workflow mutations

---

## 8. Motion + UX Implementation Plan

### Animation hierarchy

Motion should reinforce hierarchy, not draw attention away from content.

Use motion in this order of importance:

1. route transitions
2. overlay and panel transitions
3. staggered shell reveal
4. hover feedback
5. loading skeleton pulse

### Timing tokens

Recommended motion tokens:

- `instant`: 100ms for tap and small state changes
- `fast`: 150ms for hover transitions
- `base`: 200ms for route fade and content settle
- `panel`: 250ms for overlay surfaces
- `layout`: 300ms for sidebar width and nav transitions
- `stagger`: 40ms to 60ms per child in small shell groups

### Page transitions

- wrap dashboard route content in a shared motion component
- use fade plus slight Y offset only
- keep easing restrained and consistent

### Skeleton strategy

- show shell skeletons immediately for any intentionally async surface
- match the final layout shape instead of using generic bars
- keep shimmer or pulse subtle on dark surfaces

### Loading behavior

- login and auth checks should never expose raw blank screens
- route placeholders can use skeleton blocks while role-aware shell data resolves
- loading behavior should preserve page framing so the shell always feels stable

### Hover behavior

- cards lift subtly
- borders strengthen slightly
- buttons change state immediately
- nav items use clear but restrained active and hover states

### Panel transitions

- mobile nav enters as a clean overlay
- any shell drawer or transient surface should use the same slide/fade vocabulary
- no elastic easing

### Stagger logic

- only use stagger on small grouped surfaces like stat cards or summary panels
- do not stagger every card on every page
- stagger should make the shell feel alive, not theatrical

### UX tone

All shell interactions should feel:

- calm
- premium
- immediate
- operational
- unsurprising

They should not feel:

- playful
- flashy
- animated for animation’s sake

---

## 9. Deferred Systems Contract

## NOT IN PHASE 0 + 1

The following are explicitly deferred and must not be partially implemented in this cycle:

- Mission CRUD forms and submission logic
- Mission validation engine
- Manager approval or return workflows
- Quarterly sync submission logic
- Progress score calculation engines
- Shared mission push workflows
- Audit trail backed by real mutations
- Claude or Anthropic integrations
- Live insights fetching
- Real analytics engines
- Advanced chart logic
- Background jobs
- Realtime subscriptions
- Websocket systems
- Queues
- Microservices
- Advanced RBAC or policy layers
- Generalized service abstractions for future workflows

### Guardrail for future AI agents

If a task or edit begins to introduce workflow depth, pause and confirm whether the work belongs to Phase 2 or later. Do not “just stub in” backend mutation logic during shell implementation. This phase only builds the product frame, auth boundary, role system, and premium route surfaces.

---

## 10. Definition of Done

The shell is done when it meets experiential and architectural criteria, not when hidden backend systems exist.

### Experiential completion criteria

- the app feels deployable on first load
- the visual identity is consistent across login and dashboard routes
- the sidebar and topbar feel permanent and product-real
- route destinations feel intentional rather than temporary
- placeholders feel operationally believable
- empty states feel branded and useful
- motion feels restrained, fast, and premium
- responsive behavior feels designed, not merely functional
- role switching feels like one workspace showing multiple perspectives

### Architectural completion criteria

- full documented route scaffold exists
- route groups are final for the shell phase
- one centralized role access contract exists
- one effective role resolver exists
- typed domain contracts are in place
- seeded selectors back shell surfaces instead of inline page mock blobs
- future feature folders already exist
- later phases can plug into layouts and selectors without route restructuring

### Validation completion criteria

- `npm run lint` passes
- `npm run typecheck` passes
- `npm run build` passes
- protected routes work
- login works
- role override persists across refresh
- invalid route fallback works on role change
- desktop and mobile shell both behave coherently

### Psychological completion criteria

- future agents can extend later phases without re-reading all architecture decisions
- page structure is predictable across the route map
- shell behavior is obvious from the folder structure and shared primitives
- the implementation feels manageable in additive slices rather than one large rewrite

### Final standard

Phase 0 + Phase 1 are complete when MissionOS already feels like a real premium SaaS product shell with coherent navigation, believable role perspectives, stable responsive behavior, and a foundation future phases can extend safely.
