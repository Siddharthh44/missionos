"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, MessageSquare, TrendingUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import StatusPill from "@/components/shell/status-pill";
import ProgressMeter from "@/components/shell/progress-meter";
import MissionSyncForm from "@/components/missions/mission-sync-form";
import { Skeleton } from "@/components/shell/skeleton-loader";
import OperationalEmptyState from "@/components/shell/operational-empty-state";
import { operationalEmptyPresets } from "@/components/shell/operational-empty-presets";
import { useToast } from "@/hooks/use-toast";
import {
  formatOperationalDeadline,
  formatOperationalLabeled,
} from "@/lib/operational-time";
import type { Mission } from "@/types";
import type { SyncFormData } from "@/components/missions/mission-sync-form";

interface SyncItemProps {
  mission: Mission;
  onStartSync?: (missionId: string) => void;
}

function SyncItem({ mission, onStartSync }: SyncItemProps) {
  const progress = mission.latest_sync?.progress_score || 0;
  const dueLabel = mission.target_date
    ? formatOperationalDeadline(mission.target_date)
    : formatOperationalDeadline("2026-05-18T00:00:00Z");
  const lastSyncAt =
    mission.latest_sync?.submitted_at ?? mission.updated_at;
  
  const getSyncStatusInfo = () => {
    if (!mission.latest_sync) {
      return {
        status: "pending",
        label: "Sync Needed",
        color: "text-status-warning",
        bgColor: "bg-status-warning/10",
        icon: Clock
      };
    }
    
    switch (mission.latest_sync.sync_status) {
      case "on_track":
        return {
          status: "ready",
          label: "Ready to Send",
          color: "text-status-achieved",
          bgColor: "bg-status-achieved/10",
          icon: CheckCircle
        };
      case "achieved":
        return {
          status: "complete",
          label: "Achieved",
          color: "text-status-achieved",
          bgColor: "bg-status-achieved/10",
          icon: CheckCircle
        };
      default:
        return {
          status: "draft",
          label: "In Progress",
          color: "text-accent",
          bgColor: "bg-accent/10",
          icon: MessageSquare
        };
    }
  };

  const statusInfo = getSyncStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="group rounded-xl border border-border bg-surface-1 p-6 transition-all duration-200 hover:border-border-strong hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <Link
              href={`/missions/${mission.id}`}
              className="font-display text-lg font-semibold text-text-primary hover:text-accent transition-colors duration-200"
            >
              {mission.title}
            </Link>
            {mission.is_shared && (
              <StatusPill badge={{ label: "Shared", tone: "accent" }} />
            )}
          </div>
          
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            {mission.description}
          </p>
          
          <div className="mt-4 space-y-3">
            <ProgressMeter value={progress} />
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-text-muted">
                <span>Owner: {mission.employee?.name}</span>
                <span>•</span>
                <span>{mission.thrust_area}</span>
                <span>•</span>
                <span>{dueLabel}</span>
                <span>•</span>
                <span>{formatOperationalLabeled("Synced", lastSyncAt)}</span>
              </div>
              
              <div className={cn("flex items-center space-x-2", statusInfo.color)}>
                <StatusIcon className="h-4 w-4" />
                <span className="font-medium">{statusInfo.label}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ml-6">
          {statusInfo.status === "pending" && (
            <button
              onClick={() => onStartSync?.(mission.id)}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Start Sync
            </button>
          )}
          {statusInfo.status === "ready" && (
            <div className={cn("rounded-lg px-3 py-2 text-sm font-medium", statusInfo.bgColor, statusInfo.color)}>
              Ready for Review
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SyncTimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "upcoming" | "current" | "completed";
}

const SYNC_TIMELINE: SyncTimelineItem[] = [
  {
    id: "sync-timeline-1",
    date: "May 18",
    title: "Narrative check-in",
    description: "Owners update what changed this week, what moved the number, and what still needs leadership help.",
    type: "current"
  },
  {
    id: "sync-timeline-2", 
    date: "May 24",
    title: "Leadership sweep",
    description: "Managers translate team updates into executive-ready momentum language before the close window tightens.",
    type: "upcoming"
  },
  {
    id: "sync-timeline-3",
    date: "June 28",
    title: "Quarter lock",
    description: "Progress stories, risk calls, and final evidence need to be stable before the quarter is frozen.",
    type: "upcoming"
  }
];

// Mock missions for sync dashboard
const SYNC_MISSIONS: Mission[] = [
  {
    id: "mission-reliability-control-plane",
    employee_id: "profile-priya",
    title: "Reliability Control Plane",
    description: "Update the release candidate note with final rollback timings from the staging soak. The mission already has strong proof; this update sharpens leadership confidence.",
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
    description: "Convert the current activation lift into one concise weekly narrative before the manager sweep. Best evidence so far: partner setup conversion increased after the new prompt sequence.",
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
    id: "mission-incident-review-cadence",
    employee_id: "profile-dev",
    title: "Incident Review Cadence",
    description: "Attach the unresolved closure-rate artifact and name the final owner for weekly remediation follow-through. The work is moving, but the proof line is still softer than the rest of the board.",
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
    latest_sync: null // No sync yet - needs one
  }
];

export default function SyncDashboard() {
  const toast = useToast();
  const [selectedMissionForSync, setSelectedMissionForSync] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleStartSync = (missionId: string) => {
    const mission = SYNC_MISSIONS.find((entry) => entry.id === missionId);
    setSelectedMissionForSync(missionId);
    toast.info(
      "Sync draft opened",
      mission ? `Updating ${mission.title}.` : undefined,
    );
  };

  const handleSyncSubmit = (data: SyncFormData) => {
    const mission = SYNC_MISSIONS.find((entry) => entry.id === selectedMissionForSync);
    const statusLabel = data.sync_status.replaceAll("_", " ");
    toast.success(
      "Sync submitted",
      mission
        ? `${mission.title} recorded as ${statusLabel}.`
        : "Quarterly momentum update recorded.",
    );
    setSelectedMissionForSync(null);
  };

  const handleSyncCancel = () => {
    setSelectedMissionForSync(null);
  };

  const selectedMission = SYNC_MISSIONS.find(m => m.id === selectedMissionForSync);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface-1 p-4">
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-8 w-12" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface-1 p-6">
                  <Skeleton className="mb-4 h-6 w-48" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-4 h-4 w-3/4" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface-1 p-6">
              <Skeleton className="mb-4 h-6 w-32" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMissionForSync && selectedMission) {
    return (
      <MissionSyncForm
        missionId={selectedMission.id}
        missionTitle={selectedMission.title}
        targetValue={selectedMission.target_value}
        targetDate={selectedMission.target_date}
        uomType={selectedMission.uom_type}
        onSubmit={handleSyncSubmit}
        onCancel={handleSyncCancel}
      />
    );
  }

  const pendingSyncs = SYNC_MISSIONS.filter(m => !m.latest_sync || m.latest_sync.sync_status === "ready_to_start");
  const readySyncs = SYNC_MISSIONS.filter(m => m.latest_sync?.sync_status === "on_track");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-text-primary">
          Mission Sync
        </h1>
        <p className="text-text-secondary">
          Quarterly momentum updates and narrative check-ins
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-surface-1 p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-status-warning" />
            <span className="text-sm font-medium text-text-secondary">Due This Week</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-text-primary">{pendingSyncs.length}</div>
        </div>

        <div className="rounded-lg border border-border bg-surface-1 p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-status-achieved" />
            <span className="text-sm font-medium text-text-secondary">Ready</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-text-primary">{readySyncs.length}</div>
        </div>

        <div className="rounded-lg border border-border bg-surface-1 p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-text-secondary">Avg Progress</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-text-primary">
            {Math.round(SYNC_MISSIONS.reduce((acc, m) => acc + (m.latest_sync?.progress_score || 0), 0) / SYNC_MISSIONS.length)}%
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface-1 p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-text-secondary">Next Deadline</span>
          </div>
          <div className="mt-2 text-lg font-semibold text-text-primary">
            {formatOperationalDeadline("2026-05-18T00:00:00Z")}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Syncs */}
          {pendingSyncs.length > 0 && (
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <h2 className="font-display text-lg font-semibold text-text-primary">
                  Needs Sync Update
                </h2>
                <div className="rounded-full bg-status-warning/20 px-2 py-1 text-xs font-medium text-status-warning">
                  {pendingSyncs.length}
                </div>
              </div>
              <div className="space-y-4">
                {pendingSyncs.map(mission => (
                  <SyncItem 
                    key={mission.id} 
                    mission={mission} 
                    onStartSync={handleStartSync}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Ready Syncs */}
          {readySyncs.length > 0 && (
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <h2 className="font-display text-lg font-semibold text-text-primary">
                  Ready for Review
                </h2>
                <div className="rounded-full bg-status-achieved/20 px-2 py-1 text-xs font-medium text-status-achieved">
                  {readySyncs.length}
                </div>
              </div>
              <div className="space-y-4">
                {readySyncs.map(mission => (
                  <SyncItem key={mission.id} mission={mission} />
                ))}
              </div>
            </div>
          )}

          {pendingSyncs.length === 0 && readySyncs.length === 0 ? (
            <OperationalEmptyState {...operationalEmptyPresets.syncsHealthy} />
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sync Timeline */}
          <div className="rounded-xl border border-border bg-surface-1 p-6">
            <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">
              Sync Timeline
            </h3>
            <div className="space-y-4">
              {SYNC_TIMELINE.map((item, index) => (
                <div key={item.id} className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold",
                      item.type === "current" ? "border-accent bg-accent text-white" :
                      item.type === "completed" ? "border-status-achieved bg-status-achieved text-white" :
                      "border-border bg-surface-2 text-text-muted"
                    )}>
                      {index + 1}
                    </div>
                    {index < SYNC_TIMELINE.length - 1 && (
                      <div className="mt-1 h-8 w-0.5 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-primary">{item.date}</span>
                      <span className={cn(
                        "text-xs uppercase tracking-wide",
                        item.type === "current" ? "text-accent" :
                        item.type === "completed" ? "text-status-achieved" :
                        "text-text-muted"
                      )}>
                        {item.type}
                      </span>
                    </div>
                    <h4 className="mt-1 font-medium text-text-primary">{item.title}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Guidelines */}
          <div className="rounded-xl border border-border bg-surface-1 p-6">
            <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">
              Sync Guidelines
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-status-achieved" />
                <span className="text-text-secondary">Focus on what moved the numbers this week</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-status-achieved" />
                <span className="text-text-secondary">Include concrete evidence and proof points</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-status-achieved" />
                <span className="text-text-secondary">Call out risks and blockers early</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-status-achieved" />
                <span className="text-text-secondary">Be specific about next steps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
