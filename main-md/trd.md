# DOCUMENT 02 — TRD: Technical Requirements Document

## Stack Selection

| Layer | Choice | Reason |
|---|---|---|
| **Frontend Framework** | Next.js 14 (App Router) | File-based routing, server components, fast iteration |
| **Styling** | Tailwind CSS | Utility-first, consistent spacing, no context switching |
| **Component Library** | shadcn/ui | Unstyled-first, fully customizable, pairs perfectly with Tailwind |
| **Animation** | Framer Motion | Premium feel, page transitions, animated counters |
| **Icons** | Lucide React | Clean, consistent, modern |
| **Backend** | Next.js API Routes + Supabase Edge Functions (light) | Minimal custom logic needed; Supabase handles most operations |
| **Database** | PostgreSQL via Supabase | Relational integrity, RLS, real-time subscriptions |
| **Auth** | Supabase Auth (email/password) | Simple, reliable, demo-friendly |
| **ORM/Query** | Supabase JS Client (direct queries) | No ORM overhead; fast iteration |
| **AI Features** | Anthropic Claude API (claude-sonnet-4-20250514) | Smart summaries, risk indicators, momentum insights |
| **Charts** | Recharts | Lightweight, Tailwind-compatible, easy to style |
| **Hosting** | Vercel | Zero-config Next.js deployment |
| **Database Hosting** | Supabase Cloud | Free tier sufficient for demo |

## TypeScript Configuration

- Strict mode enabled
- Path aliases configured: `@/components`, `@/lib`, `@/types`, `@/hooks`, `@/data`
- All props typed; avoid `any`

## Key Libraries

```
next@14
tailwindcss
shadcn/ui (select components only)
framer-motion
lucide-react
@supabase/supabase-js
@supabase/auth-helpers-nextjs
recharts
@anthropic-ai/sdk
zod (validation)
date-fns (date utilities)
clsx + tailwind-merge (class merging)
```

## Folder Structure

```
/app
  /(auth)
    /login
  /(dashboard)
    /layout.tsx          ← sidebar + topbar shell
    /page.tsx            ← Mission Control (redirects by role)
    /missions
      /page.tsx          ← Mission Board
      /new/page.tsx      ← Create Mission
      /[id]/page.tsx     ← Mission Detail
    /syncs
      /page.tsx          ← Mission Sync (quarterly updates)
    /team
      /page.tsx          ← Team Momentum (manager view)
    /review
      /page.tsx          ← Alignment Review (manager)
    /insights
      /page.tsx          ← AI Insights
    /admin
      /page.tsx          ← Admin Dashboard
      /shared-missions   ← Push shared KPIs
      /audit             ← Audit Trail

/components
  /ui                    ← shadcn primitives (button, card, badge, etc.)
  /layout
    sidebar.tsx
    topbar.tsx
    role-switcher.tsx
  /dashboard
    mission-progress-ring.tsx
    momentum-widget.tsx
    activity-feed.tsx
    stats-card.tsx
    team-health-card.tsx
  /missions
    mission-card.tsx
    mission-form.tsx
    mission-status-badge.tsx
    impact-score-slider.tsx
    uom-selector.tsx
  /review
    review-panel.tsx
    checkin-comment.tsx
    approval-actions.tsx
  /insights
    ai-insight-card.tsx
    risk-signal.tsx
    momentum-score.tsx
  /charts
    progress-ring.tsx
    trend-bar.tsx
    heatmap.tsx
    completion-chart.tsx

/features
  /missions              ← mission CRUD logic
  /review                ← approval workflow
  /sync                  ← quarterly sync logic
  /insights              ← AI feature logic

/lib
  supabase.ts
  anthropic.ts
  progress-calculator.ts
  date-utils.ts
  constants.ts

/hooks
  use-missions.ts
  use-team.ts
  use-current-user.ts
  use-quarter.ts

/types
  index.ts               ← all shared TypeScript types

/data
  seed.ts                ← realistic seeded demo data
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Auth Strategy

- Email/password via Supabase Auth
- Three seeded accounts with instant role switching in demo mode
- Role stored in `profiles` table, not Supabase metadata
- Demo role switcher component in topbar — no re-login required during demo
- Protected routes via Next.js middleware

## API Route Structure

```
/api/missions          GET, POST
/api/missions/[id]     GET, PATCH, DELETE
/api/missions/[id]/approve    POST
/api/missions/[id]/return     POST
/api/syncs             GET, POST (quarterly updates)
/api/team              GET (manager's team view)
/api/insights          POST (triggers Claude API)
/api/shared-missions   POST (admin push)
/api/audit             GET
/api/demo/switch-role  POST (demo helper)
```

## Performance Strategy

- Static seeded data for non-critical paths
- Optimistic UI updates for approval actions
- Loading skeletons on all async components
- Image optimization via Next.js `<Image>`
- No premature caching; Supabase handles connection pooling

## Constraints

- Must run on Vercel free tier
- Must work without real Azure AD / Teams
- All AI calls go through `/api/insights` — never client-side
- Demo must be stable with zero login friction

---