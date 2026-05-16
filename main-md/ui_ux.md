# DOCUMENT 04 — UI/UX Design Brief

## Aesthetic Direction

**Theme:** Refined operational minimalism — dark-first, data-aware, momentum-communicating.

Inspired by the calm confidence of Linear, the operational density of Vercel's dashboard, and the typographic clarity of Stripe — without copying any of them.

**One word:** *Momentum.*

Every visual decision should ask: does this communicate forward motion, alignment, and progress?

## Color System

```css
/* Base */
--background:        #0A0B0F   /* Near-black. Not pure black. */
--surface-1:         #111318   /* Card backgrounds */
--surface-2:         #181B22   /* Nested card / input backgrounds */
--border:            #1F2330   /* Subtle separator lines */
--border-strong:     #2A2F3D   /* Stronger dividers */

/* Text */
--text-primary:      #F0F2F7   /* Headings, primary labels */
--text-secondary:    #8891A4   /* Subtitles, metadata */
--text-muted:        #525869   /* Placeholders, disabled */

/* Accent — Teal-Indigo */
--accent:            #4F8EF7   /* Primary CTA, active nav, progress rings */
--accent-soft:       rgba(79, 142, 247, 0.12)  /* Subtle accent backgrounds */
--accent-hover:      #6AA3FF   /* Hover state */

/* Status Colors */
--status-aligned:    #22C55E   /* Approved / Achieved */
--status-warning:    #F59E0B   /* At risk / Needs attention */
--status-revision:   #EF4444   /* Needs Revision / Overdue */
--status-pending:    #8891A4   /* Awaiting Review */
--status-draft:      #525869   /* Draft */

/* Momentum Gradient (used sparingly) */
--gradient-momentum: linear-gradient(135deg, #4F8EF7, #7C3AED)
```

## Typography

```css
/* Display font — strong, modern, geometric */
--font-display: 'Syne', sans-serif;  /* Google Fonts — bold headings */

/* Body font — clean, readable, functional */
--font-body: 'DM Sans', sans-serif;  /* Google Fonts — excellent at small sizes */

/* Mono — data values, progress scores */
--font-mono: 'JetBrains Mono', monospace;

/* Scale */
--text-xs:   11px  /* Badges, metadata */
--text-sm:   13px  /* Secondary labels, captions */
--text-base: 15px  /* Body text */
--text-md:   17px  /* Card titles */
--text-lg:   22px  /* Page subtitles */
--text-xl:   28px  /* Page headings */
--text-2xl:  36px  /* Dashboard hero numbers */
--text-3xl:  48px  /* Splash / large metrics */
```

## Layout System

```
Sidebar: 240px wide, collapsible to 64px (icon mode)
Topbar: 64px height, sticky
Content area: fluid, max-width 1280px centered
Card padding: 24px
Card gap: 16px
Section gap: 32px
Border radius: 12px (cards), 8px (inputs), 20px (badges/pills)
```

## Component Specifications

### Cards
- Background: `--surface-1`
- Border: 1px solid `--border`
- Radius: 12px
- Padding: 24px
- Hover: subtle border brightens to `--border-strong`, slight translateY(-2px)
- Shadow: `0 4px 24px rgba(0,0,0,0.3)`

### Buttons
```
Primary:   bg-accent text-white, hover:bg-accent-hover, radius-8px, px-16 py-8
Secondary: bg-surface-2 text-text-primary border border-border, hover:border-border-strong
Ghost:     transparent, hover:bg-surface-2
Danger:    bg-red-500/10 text-red-400 border border-red-500/20
```

### Progress Rings
- Circular SVG, strokeWidth: 6px
- Track: `--border` (20% opacity)
- Fill: animated with stroke-dashoffset transition (1.2s ease-out)
- Color: maps to health score (green/amber/red)
- Center: large mono number, small label below

### Status Badges
- Pill shape (radius: 20px)
- Text 11px uppercase tracking-wide
- Soft background (10-12% opacity of status color)
- Colored dot prefix (4px circle)

```
Aligned:         Green pill
Awaiting Review: Gray pill
Needs Revision:  Red pill
On Track:        Blue pill
Achieved:        Green filled
Draft:           Gray pill
```

### Sidebar Navigation
- Active item: accent-soft background, accent text, left border 2px accent
- Inactive: text-secondary, hover text-primary bg-surface-2
- Section labels: text-muted text-xs uppercase tracking-widest
- Icon: 18px, always present
- Collapse transition: 300ms ease, width animates

### Mission Cards
Each card shows:
- Mission title (text-md, font-display)
- Thrust area badge
- Progress ring (small, 48px) or progress bar
- Impact Score chip
- Status badge
- Quarter indicator
- Quick action (... menu)

### Progress Score Display
- Large mono number: `--font-mono` 32px, `--accent` color
- Animated counter on mount (count up from 0)
- Trend arrow: up/down/flat
- Context label: "of planned target"

## Animation Spec

```
Page transitions:     fade + slight translateY(8px) → 0, duration 200ms
Card hover:           translateY(-2px), border brighten, duration 150ms
Progress rings:       stroke-dashoffset animation, 1.2s ease-out, delay 200ms
Counters:             Count up from 0 to value, 1.5s ease-out
Sidebar collapse:     Width 240px → 64px, 300ms ease
Slide-over panel:     translateX(100%) → 0, 250ms ease-out, backdrop fade
Loading skeleton:     Shimmer pulse, 1.5s infinite
Toast notifications:  Slide in from bottom-right, auto-dismiss 4s
Status badge change:  Scale 0.9 → 1.0 + opacity 0 → 1, 200ms
```

## Dashboard Layout — Mission Control (Employee)

```
TOPBAR: "Mission Control" heading | "Q2 · Sync Open" chip | "Create Mission" CTA

ROW 1 (Stats Strip — 4 cards):
  [Active Missions: 5]  [Avg Progress: 72%]  [Aligned: 4]  [Syncs Due: 2]
  → animated counters, mono font, subtle trend arrows

ROW 2 (Main content grid — 60/40 split):
  LEFT (60%):
    Mission Board preview — top 3 missions as cards
    Each card: title, ring, status, impact score
    "View all missions →" link

  RIGHT (40%):
    Momentum Score widget (large ring, 0-100 score)
    Quarter progress bar (Q2: 58 days remaining)
    Next Sync reminder card

ROW 3 (Full width):
  Activity Feed — chronological timeline of actions
  Items: "Mission approved", "Sync submitted", "Comment added"
```

## Dashboard Layout — Mission Control (Manager)

```
TOPBAR: "Team Momentum" | department name | "Alignment Review" CTA (shows count badge)

ROW 1 (Stats Strip — 4 cards):
  [Team Members: 8]  [Avg Team Score: 68%]  [Awaiting Review: 3]  [At Risk: 2]

ROW 2 (Main grid — 50/50):
  LEFT: Team member cards (name, avg progress ring, status, quick review button)
  RIGHT: 
    Team Momentum chart (bar chart by member)
    At-Risk Missions list (red indicator cards)

ROW 3: Recent check-in activity feed
```

## Dashboard Layout — Admin

```
TOPBAR: "Workspace Admin" | org name | "Push Shared Mission" CTA

ROW 1: [Total Employees] [Sync Completion Rate] [Pending Approvals] [Audit Events]

ROW 2: 
  Completion heatmap (department × quarter grid)
  Department progress bars

ROW 3: Recent audit log (table-lite format with avatars)
```

## Mobile Layout

- Bottom tab navigation (5 tabs, icon + label)
- Full-width stacked cards
- Progress rings scaled to 40px
- Slide-over panels fill 95% screen height
- Stats strip becomes 2×2 grid
- Sidebar replaced by bottom tabs entirely

## Reference Products (Inspiration Only)

| Product | What to borrow |
|---|---|
| Linear | Card density, status badges, sidebar nav, keyboard-first feel |
| Vercel | Dashboard metric cards, dark theme execution, typography |
| Stripe | Data hierarchy, mono font usage, status indicators |
| Height | Team-view layouts, progress visualization |

**Critical rule:** Take inspiration from the *feel* and *system patterns*, never the specific UI elements or color schemes. MissionOS must look like itself.

---