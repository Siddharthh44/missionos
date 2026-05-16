# DOCUMENT 05 — Backend Schema: Data Model & Architecture

## Database: PostgreSQL via Supabase

## Table: `profiles`
Extends Supabase Auth users table.

```sql
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('employee', 'manager', 'admin')),
  department    TEXT,
  manager_id    UUID REFERENCES profiles(id),
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

## Table: `missions`
Core entity — one per goal per employee per quarter.

```sql
CREATE TABLE missions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id      UUID NOT NULL REFERENCES profiles(id),
  title            TEXT NOT NULL,
  description      TEXT,
  thrust_area      TEXT NOT NULL,
  uom_type         TEXT NOT NULL CHECK (uom_type IN ('numeric_min', 'numeric_max', 'percentage_min', 'percentage_max', 'timeline', 'zero_based')),
  target_value     NUMERIC,
  target_date      DATE,
  impact_score     INTEGER NOT NULL CHECK (impact_score >= 10 AND impact_score <= 100),
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
                     'draft', 'awaiting_review', 'aligned', 'needs_revision', 'locked'
                   )),
  is_shared        BOOLEAN DEFAULT FALSE,
  shared_source_id UUID REFERENCES missions(id),
  quarter          TEXT NOT NULL,  -- e.g., 'Q2-2025'
  year             INTEGER NOT NULL,
  locked_at        TIMESTAMPTZ,
  locked_by        UUID REFERENCES profiles(id),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
```

## Table: `mission_reviews`
Manager approval actions and comments.

```sql
CREATE TABLE mission_reviews (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id   UUID NOT NULL REFERENCES missions(id),
  reviewer_id  UUID NOT NULL REFERENCES profiles(id),
  action       TEXT NOT NULL CHECK (action IN ('approved', 'returned', 'edited')),
  comment      TEXT,
  edits        JSONB,  -- snapshot of what was changed { field, old_value, new_value }
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

## Table: `mission_syncs`
Quarterly achievement entries per mission.

```sql
CREATE TABLE mission_syncs (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id          UUID NOT NULL REFERENCES missions(id),
  quarter             TEXT NOT NULL,  -- 'Q1-2025', 'Q2-2025', etc.
  actual_value        NUMERIC,
  actual_date         DATE,
  sync_status         TEXT NOT NULL DEFAULT 'ready_to_start' CHECK (sync_status IN (
                        'ready_to_start', 'on_track', 'achieved'
                      )),
  progress_score      NUMERIC GENERATED ALWAYS AS (
                        -- Computed dynamically in application layer
                        -- Stored here for fast querying
                        NULL
                      ) STORED,
  submitted_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mission_id, quarter)
);
```

*Note: `progress_score` is computed in the application layer (`/lib/progress-calculator.ts`) and stored on sync submission for query performance.*

## Table: `checkin_comments`
Manager check-in structured comments per sync.

```sql
CREATE TABLE checkin_comments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_id      UUID NOT NULL REFERENCES mission_syncs(id),
  manager_id   UUID NOT NULL REFERENCES profiles(id),
  comment      TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

## Table: `audit_logs`
All post-lock changes and critical actions.

```sql
CREATE TABLE audit_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id     UUID NOT NULL REFERENCES profiles(id),
  entity_type  TEXT NOT NULL,  -- 'mission', 'mission_sync', 'profile'
  entity_id    UUID NOT NULL,
  action       TEXT NOT NULL,  -- 'created', 'updated', 'locked', 'unlocked', 'approved', etc.
  changes      JSONB,          -- { field: { old, new } }
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

## Table: `quarter_windows`
Admin-configured quarter cycle windows.

```sql
CREATE TABLE quarter_windows (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quarter      TEXT NOT NULL,  -- 'Q1-2025'
  phase        TEXT NOT NULL CHECK (phase IN ('goal_setting', 'q1_sync', 'q2_sync', 'q3_sync', 'q4_sync')),
  opens_at     DATE NOT NULL,
  closes_at    DATE NOT NULL,
  is_active    BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

## Table: `thrust_areas`
Configurable mission categories.

```sql
CREATE TABLE thrust_areas (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  description  TEXT,
  color        TEXT,  -- hex code for UI badge
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

## Key Relationships

```
profiles ←────────── missions (employee_id)
profiles ←────────── missions (locked_by)
profiles ←────────── mission_reviews (reviewer_id)
profiles ←────────── checkin_comments (manager_id)
profiles ←────────── audit_logs (actor_id)
profiles ──────────► profiles (manager_id, self-reference)

missions ←────────── mission_reviews (mission_id)
missions ←────────── mission_syncs (mission_id)
missions ←────────── missions (shared_source_id, self-reference)

mission_syncs ←────── checkin_comments (sync_id)
```

## Row Level Security (RLS) Policies

```sql
-- Employees see only their own missions
CREATE POLICY "employees_own_missions" ON missions
  FOR ALL USING (employee_id = auth.uid());

-- Managers see their team's missions
CREATE POLICY "managers_team_missions" ON missions
  FOR SELECT USING (
    employee_id IN (
      SELECT id FROM profiles WHERE manager_id = auth.uid()
    )
  );

-- Admins see all
CREATE POLICY "admins_all_missions" ON missions
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Similar patterns for mission_syncs, checkin_comments, audit_logs
```

*For hackathon speed: implement RLS on missions, profiles, and mission_syncs. Apply simpler auth checks on other tables.*

## Seed Data Structure

```typescript
// /data/seed.ts — realistic seeded data

const departments = ['Engineering', 'Product', 'Sales', 'Operations', 'Design'];

const employees = [
  { name: 'Priya Sharma', email: 'priya@demo.missionos.app', role: 'employee', department: 'Engineering', manager: 'arjun' },
  { name: 'Rahul Mehta', email: 'rahul@demo.missionos.app', role: 'employee', department: 'Product' },
  { name: 'Sneha Iyer', email: 'sneha@demo.missionos.app', role: 'employee', department: 'Sales' },
  { name: 'Arjun Nair', email: 'arjun@demo.missionos.app', role: 'manager', department: 'Engineering' },
  { name: 'Neha Gupta', email: 'neha@demo.missionos.app', role: 'admin', department: 'HR' },
];

const thrustAreas = [
  { name: 'Revenue Growth', color: '#22C55E' },
  { name: 'Product Quality', color: '#4F8EF7' },
  { name: 'Customer Success', color: '#F59E0B' },
  { name: 'Operational Efficiency', color: '#8B5CF6' },
  { name: 'People & Culture', color: '#EC4899' },
];

const sampleMissions = [
  {
    title: 'Increase API response time below 200ms for 95th percentile',
    thrust_area: 'Product Quality',
    uom_type: 'numeric_max',
    target_value: 200,
    impact_score: 30,
    status: 'aligned',
    quarter: 'Q2-2025',
  },
  {
    title: 'Achieve 120% of Q2 ARR target',
    thrust_area: 'Revenue Growth',
    uom_type: 'percentage_min',
    target_value: 120,
    impact_score: 40,
    status: 'aligned',
  },
  // 6-8 more realistic missions per employee
];
```

## AI Integration Schema

Claude API calls are made server-side only via `/api/insights`.

```typescript
// Payload to Claude API
type InsightRequest = {
  employee_name: string;
  missions: Array<{
    title: string;
    progress_score: number;
    status: string;
    quarter: string;
    uom_type: string;
  }>;
  insight_type: 'summary' | 'risk_signals' | 'momentum_score';
};

// Expected AI response structure (prompt Claude for JSON)
type InsightResponse = {
  summary: string;           // 2-sentence natural language summary
  momentum_score: number;    // 0-100
  risk_signals: string[];    // 0-3 short alerts
  recommendations: string[]; // 1-2 action suggestions
};
```

---