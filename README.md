# MissionOS

**Where teams align, execute, and accelerate.**

MissionOS is a mission alignment and execution platform built around a **Mission Control** philosophy: every role gets a clear operational view of goals, momentum, and accountability—without the clutter of legacy HR software.

It sits between organizational strategy and individual execution. Employees see how their work connects to priorities. Managers get real-time team momentum. Workspace admins get completion dashboards and audit visibility. The product language centers on *missions*, *momentum*, and *syncs*—helping teams maintain alignment every quarter.

The current build is **demo-ready**: a premium dark operational shell, seeded domain data, deterministic AI interpretation (no live model dependency), and role-aware workflows suitable for hackathon demos and portfolio review.

---

## Features

### Operational core

- **Role-aware dashboards** — Employee, manager, and admin surfaces with scoped navigation and data
- **Mission Board** — Filterable board with inline drill-down, health strips, and operational empty states
- **Mission Sync** — Quarterly momentum check-ins with narrative sync submissions
- **Alignment Review** — Manager review queue with coaching, return, and approve flows
- **Momentum Insights** — Portfolio-level signals and fleet health summaries

### AI operational intelligence

- **AI Mission Health** — Deterministic health scores, urgency bands, and mission-level recommendations
- **Executive Briefing** — Portfolio headline, risk register, and momentum framing on home and insights
- **AI insight cards** — Contextual interpretation surfaces embedded in the operational shell

### Product systems

- **Command palette** — Keyboard-first navigation and operational actions (`⌘K` / `Ctrl+K`)
- **Relative operational time** — Consistent “2h ago” / deadline labels aligned to seeded demo time
- **Local draft persistence** — Resilient form drafts for mission create, sync, and review (device-local)
- **Toast feedback** — Calm operational confirmations without modal overload
- **Operational shell** — Sidebar, topbar, quarter context, page transitions, premium empty states
- **Demo mode** — Seeded profiles and catalog when Supabase is not configured

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Backend / Auth | [Supabase](https://supabase.com/) (SSR-ready clients) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Testing | [Vitest](https://vitest.dev/) |
| Package manager | [pnpm](https://pnpm.io/) |

---

## Architecture

MissionOS uses an **additive, shell-first** architecture: routes compose shared operational primitives rather than one-off page scaffolds.

| Layer | Role |
|-------|------|
| **Next.js App Router** | Route groups for auth and dashboard; API routes for Supabase auth and demo role switching |
| **Supabase** | SSR auth, session cookies, optional production identity |
| **Seeded operational domain** | `mission-catalog`, `seed.ts`, and selectors power demo-realistic missions without a live backend |
| **Shell composition** | `OperationalRoutePage`, `ShellCard`, briefing surfaces, health strips, activity feeds |
| **Deterministic AI layer** | Rule-based mission health and executive briefing—portfolio signals without live LLM calls |
| **Client resilience** | Namespaced `localStorage` drafts, debounced writes, versioned envelopes |

New capabilities are introduced as isolated features (`features/briefing`, `features/command-palette`, `features/missions`) and wired into existing routes without rewriting the shell.

---

## Local Setup

### Prerequisites

- **Node.js** 18+ (20 LTS recommended)
- **pnpm** 9+ (`npm install -g pnpm`)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_ORG/missionos.git
cd missionos

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (see below)

# 4. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Without Supabase:** The app runs in demo mode using seeded preview profiles. Use the login flow with demo credentials from the seed data.

---

## Environment Variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | For production auth | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | For production auth | Supabase publishable/anon key (preferred) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Alternative | Legacy anon key alias if publishable key is not set |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only ops | Service role key (keep secret; never expose to client) |
| `NEXT_PUBLIC_APP_URL` | Recommended | Public app URL (e.g. `http://localhost:3000` for local dev) |

If `NEXT_PUBLIC_SUPABASE_URL` and a key are missing, the app falls back to **demo session mode** for local development and demos.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint (Next.js config) |
| `pnpm typecheck` | TypeScript check without emit |
| `pnpm test` | Run Vitest unit tests |
| `pnpm format` | Format codebase with Prettier |
| `pnpm format:check` | Verify Prettier formatting |

---

## Folder Structure

```
missionos/
├── public/              # Static assets (logo, etc.)
├── src/
│   ├── app/             # Next.js App Router pages & API routes
│   ├── components/      # UI: layout shell, missions, dashboard widgets
│   ├── data/            # Seed data & selectors
│   ├── features/        # Auth, briefing, command palette, mission health, toast
│   ├── hooks/           # React hooks (role, quarter, drafts, toast)
│   ├── lib/             # Supabase clients, operational time, local draft storage
│   ├── providers/       # React context providers
│   └── types/           # Shared TypeScript types
├── .env.example         # Environment variable template
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## Deployment

### Recommended: Vercel

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Set environment variables from `.env.example` in the Vercel project settings.
4. Deploy; Vercel detects Next.js automatically.

### Self-hosted

```bash
pnpm install
pnpm build
pnpm start
```

Ensure `NEXT_PUBLIC_APP_URL` matches your production domain and Supabase redirect URLs include your auth callback route (`/api/auth/callback`).

---

## Screenshots

<!-- Add screenshots for GitHub / hackathon / portfolio -->

| Screen | Suggested filename |
|--------|-------------------|
| Mission Control dashboard | `mission-control.png` |
| Mission Board | `mission-board.png` |
| Mission Sync | `mission-sync.png` |
| Alignment Review | `alignment-review.png` |

> Add images to a `screenshots/` folder or embed them in this README when ready for public release.

---

## Philosophy

MissionOS is designed to feel like a **modern productivity platform**, not traditional HRMS software.

- **Mission Control aesthetic** — Dark, focused operational UI with clear hierarchy and momentum-oriented language
- **Operational UX** — Card-first layouts, progressive disclosure, role-scoped navigation, intentional empty states
- **Additive architecture** — Extend the shell and seed layer; avoid throwaway scaffolds and dead placeholder routes
- **Premium SaaS direction** — Calm motion, restrained copy, portfolio-quality density inspired by Linear and Vercel

---

## License

Add your license here before public release (e.g. MIT).
