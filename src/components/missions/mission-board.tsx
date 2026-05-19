"use client";

import { Fragment, useCallback, useState } from "react";
import DraftPersistenceHint from "@/components/shell/draft-persistence-hint";
import { useLocalDraft } from "@/hooks/use-local-draft";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Filter, Plus, Search, ChevronDown, ChevronRight } from "lucide-react";
import OperationalEmptyState from "@/components/shell/operational-empty-state";
import { operationalEmptyPresets } from "@/components/shell/operational-empty-presets";
import MissionInlineDetailSurface from "@/components/missions/mission-inline-detail-surface";
import StatusPill from "@/components/shell/status-pill";
import ProgressMeter from "@/components/shell/progress-meter";
import { MISSION_CATALOG } from "@/data/mission-catalog";
import { getMissionHealth } from "@/features/missions/mission-health";
import {
  formatOperationalDeadline,
  formatOperationalRelative,
} from "@/lib/operational-time";
import MissionHealthStrip from "@/components/shell/mission-health-strip";
import { getMissionDetailSurface } from "@/features/shell/shell-data";
import { useRoleContext } from "@/hooks/use-role-context";
import { cn } from "@/lib/cn";
import type { Mission, OperationalBadge, UserRole } from "@/types";

interface MissionCardProps {
  mission: Mission;
  showOwner?: boolean;
  isExpanded?: boolean;
  onToggle: () => void;
}

function MissionCard({
  mission,
  showOwner = false,
  isExpanded = false,
  onToggle,
}: MissionCardProps) {
  const health = getMissionHealth(mission);
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
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      className={cn(
        "group block w-full rounded-xl border bg-surface-1 p-6 text-left transition-all duration-200 hover:border-border-strong hover:shadow-lg hover:-translate-y-0.5",
        isExpanded
          ? "border-accent/30 ring-1 ring-accent/20"
          : "border-border",
      )}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                {mission.title}
              </h3>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-accent" />
              ) : (
                <ChevronRight className="h-4 w-4 text-text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
              )}
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

          <MissionHealthStrip health={health} variant="compact" />

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
              <span>Updated {formatOperationalRelative(mission.updated_at)}</span>
            </div>
            {mission.target_date ? (
              <span>{formatOperationalDeadline(mission.target_date)}</span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

interface MissionGridProps {
  missions: Mission[];
  showOwners: boolean;
  expandedMissionId: string | null;
  effectiveRole: UserRole;
  onToggleMission: (missionId: string) => void;
}

function MissionGrid({
  missions,
  showOwners,
  expandedMissionId,
  effectiveRole,
  onToggleMission,
}: MissionGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {missions.map((mission) => (
        <Fragment key={mission.id}>
          <MissionCard
            mission={mission}
            showOwner={showOwners}
            isExpanded={expandedMissionId === mission.id}
            onToggle={() => onToggleMission(mission.id)}
          />
          {expandedMissionId === mission.id ? (
            <MissionInlineDetailSurface
              mission={mission}
              onClose={() => onToggleMission(mission.id)}
              surface={getMissionDetailSurface(effectiveRole, mission.id)}
            />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

interface MissionBoardProps {
  missions?: Mission[];
  showFilters?: boolean;
  showOwners?: boolean;
}

interface BoardFiltersDraft {
  searchQuery: string;
  statusFilter: string;
  thrustAreaFilter: string;
}

const INITIAL_BOARD_FILTERS: BoardFiltersDraft = {
  searchQuery: "",
  statusFilter: "all",
  thrustAreaFilter: "all",
};

function isBoardFiltersEmpty(filters: BoardFiltersDraft): boolean {
  return (
    filters.searchQuery === "" &&
    filters.statusFilter === "all" &&
    filters.thrustAreaFilter === "all"
  );
}

export default function MissionBoard({ 
  missions = MISSION_CATALOG,
  showFilters = true,
  showOwners = false
}: MissionBoardProps) {
  const { effectiveRole } = useRoleContext();
  const [expandedMissionId, setExpandedMissionId] = useState<string | null>(null);
  const toast = useToast();
  const role = effectiveRole ?? "employee";

  const notifyFiltersRestored = useCallback(
    () => {
      toast.info("Draft restored", "Mission board filters recovered on this device.");
    },
    [toast],
  );

  const {
    value: boardFilters,
    setValue: setBoardFilters,
    meta: boardFiltersMeta,
  } = useLocalDraft<BoardFiltersDraft>({
    scope: "mission-board-filters",
    draftId: role,
    initialValue: INITIAL_BOARD_FILTERS,
    isEmpty: isBoardFiltersEmpty,
    onRestored: notifyFiltersRestored,
  });

  const searchQuery = boardFilters.searchQuery;
  const statusFilter = boardFilters.statusFilter;
  const thrustAreaFilter = boardFilters.thrustAreaFilter;

  const setSearchQuery = (value: string) => {
    setBoardFilters((prev) => ({ ...prev, searchQuery: value }));
  };

  const setStatusFilter = (value: string) => {
    setBoardFilters((prev) => ({ ...prev, statusFilter: value }));
  };

  const setThrustAreaFilter = (value: string) => {
    setBoardFilters((prev) => ({ ...prev, thrustAreaFilter: value }));
  };

  const handleToggleMission = (missionId: string) => {
    setExpandedMissionId((current) => (current === missionId ? null : missionId));
  };

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
        <div className="space-y-2">
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
        {!isBoardFiltersEmpty(boardFilters) ? (
          <DraftPersistenceHint meta={boardFiltersMeta} className="px-1" />
        ) : null}
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
            <MissionGrid
              missions={groupedMissions.healthy}
              showOwners={showOwners}
              expandedMissionId={expandedMissionId}
              effectiveRole={role}
              onToggleMission={handleToggleMission}
            />
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
            <MissionGrid
              missions={groupedMissions.attention}
              showOwners={showOwners}
              expandedMissionId={expandedMissionId}
              effectiveRole={role}
              onToggleMission={handleToggleMission}
            />
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
            <MissionGrid
              missions={groupedMissions.draft}
              showOwners={showOwners}
              expandedMissionId={expandedMissionId}
              effectiveRole={role}
              onToggleMission={handleToggleMission}
            />
          </div>
        )}
      </div>

      {filteredMissions.length === 0 ? (
        <OperationalEmptyState
          {...(searchQuery ||
          statusFilter !== "all" ||
          thrustAreaFilter !== "all"
            ? operationalEmptyPresets.missionsFiltered
            : operationalEmptyPresets.missionsCatalog)}
        />
      ) : null}
    </div>
  );
}