"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Filter, Search, ChevronRight } from "lucide-react";
import StatusPill from "@/components/shell/status-pill";
import ProgressMeter from "@/components/shell/progress-meter";
import type { Mission, OperationalBadge } from "@/types";

interface MissionCardProps {
  mission: Mission;
  showOwner?: boolean;
}

function MissionCard({ mission, showOwner = false }: MissionCardProps) {
  const progress = mission.latest_sync?.progress_score || 0;
  
  const getStatusBadge = (): OperationalBadge => {
    switch (mission.status) {
      case "aligned":
        return { label: "Aligned", tone: "success" };
      case "awaiting_review":
        return { label: "Awaiting Review", tone: "warning" };
      case "needs_revision":
        return { label: "Needs Revision", tone: "warning" };
      case "draft":
        return { label: "Draft", tone: "default" };
      default:
        return { label: "Unknown", tone: "default" };
    }
  };

  const getProgressBadge = (): OperationalBadge => {
    if (progress >= 80) return { label: `${progress}% complete`, tone: "accent" };
    if (progress >= 60) return { label: `${progress}% complete`, tone: "accent" };
    return { label: `${progress}% complete`, tone: "warning" };
  };

  const getSyncBadge = (): OperationalBadge | null => {
    if (!mission.latest_sync) return null;
    
    switch (mission.latest_sync.sync_status) {
      case "on_track":
        return { label: "On Track", tone: "success" };
      case "achieved":
        return { label: "Achieved", tone: "success" };
      case "ready_to_start":
        return { label: "Ready", tone: "accent" };
      default:
        return null;
    }
  };

  return (
    <Link
      href={`/missions/${mission.id}`}
      className="group block rounded-xl border border-border bg-surface-1 p-6 transition-all duration-200 hover:border-border-strong hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                {mission.title}
              </h3>
              <ChevronRight className="h-4 w-4 text-text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
            <p className="mt-2 text-sm leading-6 text-text-secondary line-clamp-2">
              {mission.description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <ProgressMeter value={progress} />
          
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill badge={getStatusBadge()} />
            <StatusPill badge={getProgressBadge()} />
            {getSyncBadge() && <StatusPill badge={getSyncBadge()!} />}
            {mission.is_shared && <StatusPill badge={{ label: "Shared", tone: "accent" }} />}
          </div>

          <div className="flex items-center justify-between text-sm text-text-muted">
            <div className="flex items-center space-x-4">
              {showOwner && mission.employee && (
                <>
                  <span>Owner: {mission.employee.name}</span>
                  <span>•</span>
                </>
              )}
              <span>{mission.thrust_area}</span>
              <span>•</span>
              <span>Updated: {new Date(mission.updated_at).toLocaleDateString()}</span>
            </div>
            {mission.target_date && (
              <span>Due: {new Date(mission.target_date).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

interface MissionBoardProps {
  missions?: Mission[];
  showFilters?: boolean;
  showOwners?: boolean;
}

// Mock missions data based on seeded operational surfaces
const MOCK_MISSIONS: Mission[] = [
  {
    id: "mission-reliability-control-plane",
    employee_id: "profile-priya",
    title: "Reliability Control Plane",
    description: "Reduce Sev-2 recovery time by standardizing rollback controls across the API gateway and worker fleet.",
    thrust_area: "Platform",
    uom_type: "numeric_min",
    target_value: 25,
    target_date: "2026-06-23",
    impact_score: 5,
    status: "aligned",
    is_shared: false,
    shared_source_id: null,
    quarter: "Q2-2026",
    year: 2026,
    locked_at: null,
    created_at: "2026-04-15T10:00:00Z",
    updated_at: "2026-05-16T10:20:00Z",
    employee: {
      id: "profile-priya",
      name: "Priya Sharma",
      email: "priya@demo.missionos.app",
      role: "employee",
      department: "Engineering",
      manager_id: "profile-arjun",
      avatar_url: null,
    },
    latest_sync: {
      id: "sync-reliability-latest",
      mission_id: "mission-reliability-control-plane",
      quarter: "Q2-2026",
      actual_value: 32,
      actual_date: null,
      sync_status: "on_track",
      progress_score: 82,
      submitted_at: "2026-05-16T10:20:00Z",
      created_at: "2026-05-16T10:20:00Z",
    }
  },
  {
    id: "mission-onboarding-activation-loop",
    employee_id: "profile-rahul",
    title: "Onboarding Activation Loop",
    description: "Lift week-one activation by tightening handoff copy, setup prompts, and success cues for partner teams.",
    thrust_area: "Product Growth",
    uom_type: "percentage_max",
    target_value: 85,
    target_date: null,
    impact_score: 4,
    status: "aligned",
    is_shared: false,
    shared_source_id: null,
    quarter: "Q2-2026",
    year: 2026,
    locked_at: null,
    created_at: "2026-04-12T09:00:00Z",
    updated_at: "2026-05-15T17:10:00Z",
    employee: {
      id: "profile-rahul",
      name: "Rahul Mehta",
      email: "rahul@demo.missionos.app",
      role: "employee",
      department: "Product Growth",
      manager_id: "profile-arjun",
      avatar_url: null,
    },
    latest_sync: {
      id: "sync-activation-latest",
      mission_id: "mission-onboarding-activation-loop",
      quarter: "Q2-2026",
      actual_value: 74,
      actual_date: null,
      sync_status: "on_track",
      progress_score: 74,
      submitted_at: "2026-05-15T17:10:00Z",
      created_at: "2026-05-15T17:10:00Z",
    }
  },
  {
    id: "mission-deal-desk-turnaround",
    employee_id: "profile-sneha",
    title: "Deal Desk Turnaround",
    description: "Cut redline turnaround time for strategic deals by tightening request routing and escalation coverage.",
    thrust_area: "Revenue Ops",
    uom_type: "numeric_min",
    target_value: 2,
    target_date: null,
    impact_score: 4,
    status: "awaiting_review",
    is_shared: false,
    shared_source_id: null,
    quarter: "Q2-2026",
    year: 2026,
    locked_at: null,
    created_at: "2026-04-18T11:00:00Z",
    updated_at: "2026-05-15T14:05:00Z",
    employee: {
      id: "profile-sneha",
      name: "Sneha Iyer",
      email: "sneha@demo.missionos.app",
      role: "employee",
      department: "Revenue Ops",
      manager_id: "profile-arjun",
      avatar_url: null,
    },
    latest_sync: {
      id: "sync-deal-desk-latest",
      mission_id: "mission-deal-desk-turnaround",
      quarter: "Q2-2026",
      actual_value: 3.2,
      actual_date: null,
      sync_status: "on_track",
      progress_score: 61,
      submitted_at: "2026-05-15T14:05:00Z",
      created_at: "2026-05-15T14:05:00Z",
    }
  },
  {
    id: "mission-incident-review-cadence",
    employee_id: "profile-dev",
    title: "Incident Review Cadence",
    description: "Restore weekly incident closure discipline by aligning action owners, due dates, and review rituals.",
    thrust_area: "Quality",
    uom_type: "percentage_max",
    target_value: 95,
    target_date: null,
    impact_score: 3,
    status: "needs_revision",
    is_shared: false,
    shared_source_id: null,
    quarter: "Q2-2026",
    year: 2026,
    locked_at: null,
    created_at: "2026-04-20T14:00:00Z",
    updated_at: "2026-05-14T11:50:00Z",
    employee: {
      id: "profile-dev",
      name: "Dev Malhotra",
      email: "dev@demo.missionos.app",
      role: "employee",
      department: "Quality",
      manager_id: "profile-arjun",
      avatar_url: null,
    },
    latest_sync: {
      id: "sync-incident-latest",
      mission_id: "mission-incident-review-cadence",
      quarter: "Q2-2026",
      actual_value: 78,
      actual_date: null,
      sync_status: "ready_to_start",
      progress_score: 54,
      submitted_at: "2026-05-14T11:50:00Z",
      created_at: "2026-05-14T11:50:00Z",
    }
  },
  {
    id: "mission-hiring-loop-compression",
    employee_id: "profile-meera",
    title: "Hiring Loop Compression",
    description: "Bring interview cycle time under nine business days without eroding hiring manager quality signals.",
    thrust_area: "People Ops",
    uom_type: "numeric_min",
    target_value: 9,
    target_date: null,
    impact_score: 4,
    status: "aligned",
    is_shared: false,
    shared_source_id: null,
    quarter: "Q2-2026",
    year: 2026,
    locked_at: null,
    created_at: "2026-04-22T16:00:00Z",
    updated_at: "2026-05-16T15:30:00Z",
    employee: {
      id: "profile-meera",
      name: "Meera Rao",
      email: "meera@demo.missionos.app",
      role: "employee",
      department: "People Ops",
      manager_id: "profile-neha",
      avatar_url: null,
    },
    latest_sync: {
      id: "sync-hiring-latest",
      mission_id: "mission-hiring-loop-compression",
      quarter: "Q2-2026",
      actual_value: 11,
      actual_date: null,
      sync_status: "on_track",
      progress_score: 67,
      submitted_at: "2026-05-16T15:30:00Z",
      created_at: "2026-05-16T15:30:00Z",
    }
  }
];

export default function MissionBoard({ 
  missions = MOCK_MISSIONS,
  showFilters = true,
  showOwners = false
}: MissionBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [thrustAreaFilter, setThrustAreaFilter] = useState<string>("all");

  // Filter missions based on search and filters
  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.thrust_area.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || mission.status === statusFilter;
    const matchesThrust = thrustAreaFilter === "all" || mission.thrust_area === thrustAreaFilter;
    
    return matchesSearch && matchesStatus && matchesThrust;
  });

  // Group missions by status for better organization
  const groupedMissions = {
    healthy: filteredMissions.filter(m => m.status === "aligned" && (m.latest_sync?.progress_score || 0) >= 70),
    attention: filteredMissions.filter(m => m.status === "awaiting_review" || m.status === "needs_revision" || (m.latest_sync?.progress_score || 0) < 70),
    draft: filteredMissions.filter(m => m.status === "draft")
  };

  const thrustAreas = Array.from(new Set(missions.map(m => m.thrust_area)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-text-primary">
            Mission Board
          </h1>
          <p className="text-text-secondary">
            {filteredMissions.length} mission{filteredMissions.length !== 1 ? 's' : ''} in Q2-2026
          </p>
        </div>
        
        <Link
          href="/missions/new"
          className="inline-flex items-center space-x-2 rounded-full border border-accent/20 bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          <span>Create Mission</span>
        </Link>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface-1 p-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-text-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All Status</option>
              <option value="aligned">Aligned</option>
              <option value="awaiting_review">Awaiting Review</option>
              <option value="needs_revision">Needs Revision</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <select
            value={thrustAreaFilter}
            onChange={(e) => setThrustAreaFilter(e.target.value)}
            className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="all">All Areas</option>
            {thrustAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      )}

      {/* Mission Groups */}
      <div className="space-y-8">
        {/* Healthy Missions */}
        {groupedMissions.healthy.length > 0 && (
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Healthy Progress
              </h2>
              <div className="rounded-full bg-status-achieved/20 px-2 py-1 text-xs font-medium text-status-achieved">
                {groupedMissions.healthy.length}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupedMissions.healthy.map(mission => (
                <MissionCard key={mission.id} mission={mission} showOwner={showOwners} />
              ))}
            </div>
          </div>
        )}

        {/* Needs Attention */}
        {groupedMissions.attention.length > 0 && (
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Needs Attention
              </h2>
              <div className="rounded-full bg-status-warning/20 px-2 py-1 text-xs font-medium text-status-warning">
                {groupedMissions.attention.length}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupedMissions.attention.map(mission => (
                <MissionCard key={mission.id} mission={mission} showOwner={showOwners} />
              ))}
            </div>
          </div>
        )}

        {/* Draft Missions */}
        {groupedMissions.draft.length > 0 && (
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Draft Missions
              </h2>
              <div className="rounded-full bg-surface-3 px-2 py-1 text-xs font-medium text-text-muted">
                {groupedMissions.draft.length}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupedMissions.draft.map(mission => (
                <MissionCard key={mission.id} mission={mission} showOwner={showOwners} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredMissions.length === 0 && (
        <div className="rounded-xl border border-border bg-surface-1 p-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="font-display text-lg font-semibold text-text-primary">
              No missions found
            </h3>
            <p className="mt-2 text-text-secondary">
              {searchQuery || statusFilter !== "all" || thrustAreaFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Get started by creating your first mission."}
            </p>
            {(!searchQuery && statusFilter === "all" && thrustAreaFilter === "all") && (
              <Link
                href="/missions/new"
                className="mt-4 inline-flex items-center space-x-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                <Plus className="h-4 w-4" />
                <span>Create Mission</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}