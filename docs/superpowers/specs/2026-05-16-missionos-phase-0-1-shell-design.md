# MissionOS Phase 0 + Phase 1 Shell Design

Date: 2026-05-16
Scope: Phase 0 and Phase 1 only
Status: Approved design, ready for implementation planning after review

## Purpose

This spec defines the first execution cycle for MissionOS in this workspace. The goal of this cycle is to ship a production-quality operational shell that establishes the permanent visual identity, route architecture, layout system, motion behavior, auth scaffolding, and role-aware product grammar for all later phases.

This cycle is intentionally constrained to the shell and foundation. It must feel deployable, product-real, and premium by the end of the cycle, while keeping deeper business workflows explicitly deferred.

## Source of Truth

Implementation decisions in this spec are grounded in:

- `main-md/implementation_plan.md`
- `main-md/app_flow.md`
- `main-md/ui_ux.md`
- `main-md/trd.md`
- `main-md/backend_schema.md`
- `main-md/prd.md`

Where secondary notes or prior brainstorming guidance differ, the `main-md` documents win.

## Phase Scope

This execution cycle includes:

- Project bootstrap in this workspace
- Next.js 14 App Router setup
- Tailwind design system and typography system
- Full documented route map scaffold
- Dashboard shell and permanent layout contract
- Responsive sidebar and topbar behavior
- Supabase auth scaffolding
- Protected route middleware
- Real profile hydration boundary
- Demo role switching via lightweight override
- Seeded domain-shaped local structures for shell surfaces
- Polished placeholder destinations for future routes
- Motion, spacing, loading, and empty-state systems

This execution cycle does not include:

- Mission CRUD
- Manager approval actions
- Quarterly sync computations
- Admin workflow logic
- Audit querying against live business changes
- Claude-powered insights
- Advanced analytics
- Deep service abstractions
- Complex RBAC or backend orchestration

## Product Goal for This Cycle

At the end of Phase 0 + Phase 1, MissionOS should already feel like a real operational product. The app should communicate focus, momentum, clarity, and execution through restrained surfaces, strong typography rhythm, coherent navigation, premium motion discipline, and believable destination pages.

The shell must feel operational and premium, not decorative, futuristic, or like a dashboard template. Later phases should be able to plug into this shell without route, layout, or feature-boundary restructuring.

## Architectural Intent

This workspace is the real build target. The first cycle establishes the permanent application frame so future work is additive.

Core architectural principles:

- Build the full App Router structure now
- Implement only Phase 0 + Phase 1 logic for real
- Represent later routes as polished, domain-believable destinations
- Keep auth real and business workflows mostly seeded
- Use typed domain contracts now so future data-source swaps do not rewrite UI composition
- Prefer small shared product patterns over deep abstractions
- Centralize role visibility, route access, and effective role resolution

## Route Architecture

The full route map from `main-md/app_flow.md` is scaffolded immediately.

### Auth routes

- `/login`

### Dashboard routes

- `/`
- `/missions`
- `/missions/new`
- `/missions/[id]`
- `/syncs`
- `/team`
- `/review`
- `/insights`
- `/admin`
- `/admin/shared-missions`
- `/admin/audit`

### Route groups

- `src/app/(auth)` for public auth entry
- `src/app/(dashboard)` for the permanent operational shell

### Route behavior in this cycle

- `/login` is real and functional
- `/(dashboard)` routes are protected by middleware
- `/` is the first real Mission Control shell
- Later-phase routes render polished placeholder surfaces with real layout, seeded framing, and role-aware visibility

### Centralized role access contract

- `employee` can access `/`, `/missions`, `/missions/new`, `/missions/[id]`, `/syncs`, and `/insights`
- `manager` can access all employee destinations plus `/team`, `/review`, and `/admin/shared-missions`
- `admin` can access all destinations including `/admin`, `/admin/shared-missions`, and `/admin/audit`

### Redirect contract

- after login, `employee` routes to `/`
- after login, `manager` routes to `/`
- after login, `admin` routes to `/admin`
- role switching updates visible navigation instantly and preserves the current destination when access remains valid
- if a role switch makes the current destination invalid, route to the nearest valid default destination for that role

## App Structure

The folder structure should mirror the documented long-term shape now, even if only part of it is implemented in this cycle.

```text
src/
  app/
    (auth)/
    (dashboard)/
    api/
  components/
    ui/
    layout/
    dashboard/
    shell/
  features/
    auth/
    shell/
    missions/
    review/
    sync/
    insights/
    admin/
  hooks/
  lib/
    supabase/
  providers/
  types/
  data/
```

Guiding rule:

- Folders for future domains exist now
- Only Phase 0 + 1 internals are filled in
- Later phases extend existing folders instead of reorganizing them

## Shell Layout Contract

The shell becomes the permanent operational frame of the product in this cycle.

### Desktop layout

- Collapsible sidebar with `240px` expanded width and `64px` collapsed width
- Sticky topbar with `64px` height
- Main content area centered at `max-w-screen-xl`
- Desktop page padding of `p-8`
- Standard section spacing of `gap-8`
- Standard card padding of `p-6`

### Mobile layout

- Sidebar replaced by a full-screen overlay navigation
- Content padding reduced to `p-4`
- Same spacing hierarchy preserved at a smaller scale
- Page composition remains the same even when stacked

### Permanent shell elements

- Sidebar
- Topbar
- Page transition wrapper
- Page header composition
- Shared content container
- Role-aware navigation visibility
- Quarter indicator surface
- User identity surface

## Visual Identity

The UI must feel like a premium operational SaaS product inspired by the composure of Linear, Vercel, and Notion, but not derivative of any of them.

Visual direction:

- Dark-first, calm, data-aware surfaces
- Restrained hierarchy over visual spectacle
- Dense but readable operational layouts
- Ambient sophistication instead of decorative styling
- Clear information rhythm led by typography and spacing

The UI should communicate:

- Focus
- Momentum
- Clarity
- Execution
- Operational intelligence

The UI should avoid:

- Futuristic gimmicks
- Excessive gradients
- Over-glowing dashboards
- Landing-page styling
- Analytics toy energy

## Design System Foundation

### Colors

Tailwind tokens are configured from the MissionOS visual system in `main-md/ui_ux.md`.

- `background`
- `surface.1`
- `surface.2`
- `surface.3`
- `border.DEFAULT`
- `border.strong`
- `text.primary`
- `text.secondary`
- `text.muted`
- `accent.DEFAULT`
- `accent.soft`
- `accent.hover`
- `status.aligned`
- `status.warning`
- `status.revision`
- `status.pending`
- `status.draft`
- `status.on-track`
- `status.achieved`

### Typography

- `Syne` for display and headings
- `DM Sans` for body copy and interface text
- `JetBrains Mono` for numeric emphasis, counts, and operational chips

### Shared visual contracts

- Cards use subtle borders, layered surfaces, and restrained shadows
- Buttons follow primary, secondary, and ghost patterns
- Status surfaces use color plus label, never color alone
- Numbers and compact metrics lean on the mono family

## Motion System

Motion is part of the permanent design system and is locked in this cycle.

Motion rules:

- Fast and restrained
- Structural, not attention-seeking
- Immediate interaction feedback
- No bounce
- No elastic overshoot
- No novelty motion

Shared motion vocabulary:

- Route transition: fade with slight upward settle
- Sidebar collapse: width transition
- Mobile nav open/close: clean overlay and panel motion
- Card hover: subtle lift and border emphasis
- Skeleton loading: soft pulse
- Stats and shell surfaces: staggered reveal where useful
- Toasts: quick entrance, quiet dismissal

Future phases inherit this vocabulary instead of defining their own.

## Authentication and Session Model

Auth is real from the beginning, but intentionally lightweight.

### Included now

- Supabase project wiring
- Environment-based auth configuration
- Real email/password login
- Session-aware middleware
- Protected dashboard routes
- Server/client Supabase helpers
- Real profile lookup boundary

### Not included now

- Deep authorization rules beyond phase needs
- Complex role policy orchestration
- Multi-step auth workflows
- Business-workflow mutation logic

### Identity contract

- `realProfile` is the authoritative source of identity
- `effectiveRole` is derived from `roleOverride ?? realProfile.role`
- The UI always renders from `effectiveRole`

## Role Switching

Role switching exists as a demo-layer override, not fake auth.

Requirements:

- Instant switch without re-login
- No mutation of actual database role
- Persisted override that server-rendered routes can read
- Centralized access logic reused across shell and pages

Implementation shape:

- Role override stored in lightweight client state
- Override persisted in a small cookie via `/api/demo/switch-role`
- Shared resolver computes effective role for both client and server contexts

Centralized contracts:

- One effective role resolver
- One route visibility map
- One navigation access map
- Reusable role-aware hooks for pages and shell surfaces

## Domain Contracts and Seeded Data

The shell should already speak the final domain language. Seeded data in this cycle mirrors future business contracts instead of using temporary blobs.

Shared types established now:

- `UserRole`
- `Profile`
- `Mission`
- `MissionSync`
- `MissionReview`
- `CheckinComment`
- `AuditLog`
- `InsightResponse`
- `QuarterWindow`

Shell-facing seeded selectors established now:

- current user and effective role
- route access per role
- quarter status
- dashboard stats by role
- role-aware activity items
- role-aware alerts
- placeholder collections shaped like future missions, reviews, and audit entries

Design intent:

- Page components consume typed hooks and typed selectors
- Hook internals can later swap from local seed data to Supabase or API data
- Page composition remains stable during that swap

## Page Composition Contract

Every routed destination inside the dashboard shell follows the same operational grammar.

Default page structure:

1. Header
2. Summary or metrics
3. Primary operational surface
4. Secondary contextual surface

Not every page needs the same weight in every slot, but every page uses the same rhythm and layout language.

Permanent composition patterns created in this cycle:

- `PageHeader`
- `StatsStrip`
- `SectionLabel`
- `SurfaceCard`
- `OperationalEmptyState`
- `ShellSkeleton`
- `DashboardPanel`

## Placeholder Route Strategy

Later-phase pages are real destinations in this cycle, not temporary holding pages.

Each placeholder route must:

- Use final shell spacing and page composition
- Render believable information hierarchy
- Use contextual empty-state language
- Show seeded framing patterns appropriate to the route
- Support responsive behavior and motion wrappers
- Feel operationally plausible without fake workflow logic

Each placeholder route must not:

- Say "coming soon"
- Render as a centered single-message blank state
- Use temporary visual hacks
- Break the MissionOS tone

Examples:

- `/missions` feels like a Mission Board surface with stats, board framing, and no-active-missions handling
- `/review` feels like an Alignment Review queue with queue framing and pending-state behavior
- `/insights` feels like a Momentum Intelligence surface with seeded card framing and polished empty/loading treatment
- `/admin` feels like a Workspace Admin overview with believable operational structure

## Shared Product Pattern Layer

This cycle builds a reusable product-pattern layer, not a large abstraction system.

Shared now:

- layout shell primitives
- nav items and nav section surfaces
- stat cards
- shell cards
- loading skeletons
- empty states
- topbar actions
- badges and chips
- motion wrappers

Explicitly avoided now:

- generic component factories
- highly parameterized page builders
- enterprise-scale design-system architecture
- generalized data service layers

Rule:

- Reuse product patterns where repetition is real
- Keep page-specific framing close to its route or feature
- Optimize for velocity, consistency, and swapability

## Implementation Sequence

The build order for this cycle is:

1. Bootstrap Next.js app, dependencies, fonts, Tailwind tokens, aliases, globals, and utility foundation
2. Create long-term folder structure, shared types, Supabase helpers, middleware, and provider boundaries
3. Build shell composition primitives and layout system
4. Implement login, session/profile hydration, and role override flow
5. Scaffold full documented route map with polished placeholders
6. Run responsive, motion, copy, and consistency pass

This sequence is intentionally visual-first while preserving clean contracts.

## Deferred Systems

The following are intentionally outside this cycle:

- mission create, edit, submit, or validation flows
- manager approval actions
- quarterly sync submission logic
- progress score calculations
- shared mission workflows
- audit trail backed by live mutations
- AI insight API integration
- advanced charts and analytics
- deep backend abstractions
- generalized workflow services
- complex RBAC

Placeholder surfaces may reference these future systems in layout and language, but not implement them.

## Success Criteria

This cycle succeeds when:

- the app boots in this workspace with the full route scaffold
- login is real and dashboard routes are protected
- role switching is instant and coherent
- role visibility is centralized and consistent
- every documented route exists and feels intentional
- desktop and mobile shell behavior both feel resolved
- motion is consistent and restrained
- no route looks unfinished or immersion-breaking
- seeded structures already mirror future domain contracts
- later phases can attach live data and workflows without restructuring routes, layouts, or feature boundaries

## Risks and Mitigations

### Risk: Placeholder routes feel fake

Mitigation:

- Treat placeholders as real product surfaces
- Use contextual structure, stats, and empty states instead of generic blank pages

### Risk: Role logic becomes scattered

Mitigation:

- Enforce one role resolver, one access map, and reusable role-aware hooks

### Risk: Overbuilding backend during shell phase

Mitigation:

- Limit backend work to auth, session, profile, middleware, and minimal role override persistence

### Risk: Future data swap requires component rewrites

Mitigation:

- Ensure pages consume typed hooks and domain-shaped collections now

### Risk: Design polish drifts across routes

Mitigation:

- Establish shell, page composition, motion, spacing, and placeholder rules as permanent contracts in this cycle

## Implementation Boundaries Summary

Build now:

- operational shell
- route scaffold
- auth scaffold
- role override system
- premium placeholders
- typed seeded domain structures
- responsive layout
- motion and visual identity

Defer now:

- workflow depth
- business mutations
- analytics logic
- AI integration
- advanced backend systems

## Final Statement

Phase 0 + Phase 1 are not a temporary setup phase. They define the permanent operational frame of MissionOS. If implemented correctly, all later phases become domain additions inside an already-finished product shell rather than architecture corrections to an unstable foundation.
