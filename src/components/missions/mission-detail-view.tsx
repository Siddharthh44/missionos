"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, CheckCircle, Clock, Flag, Target, TrendingUp, Brain, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import StatusPill from "@/components/shell/status-pill";
import AnalyticsWidget from "@/components/shell/analytics-widget";
import AIInsightCard, { InsightSummary } from "@/components/shell/ai-insight-card";
import { Skeleton } from "@/components/shell/skeleton-loader";
import type { Mission } from "@/types";

interface MissionDetailViewProps {
  mission?: Mission;
}

const MOCK_MISSION: Mission = {
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
};

const MOCK_INSIGHTS = [
  {
    id: "insight-1",
    title: "Strong Evidence Pattern Detected",
    insight: "This mission consistently provides high-quality evidence bundles with concrete proof points. The before-and-after incident rehearsal summaries are particularly strong and could serve as a template for other platform missions.",
    recommendation: "Share the evidence template format with other platform teams to improve overall narrative quality.",
    confidence: "high" as const,
    type: "pattern" as const,
    impact: "medium" as const
  },
  {
    id: "insight-2", 
    title: "Dependency Risk Identified",
    insight: "Gateway rollback sequencing represents a single point of failure for the June 23 deadline. Historical data shows gateway dependencies have caused 23% of platform mission delays.",
    recommendation: "Establish weekly checkpoint with gateway team and create fallback plan for rollback validation.",
    confidence: "high" as const,
    type: "risk" as const,
    impact: "high" as const
  },
  {
    id: "insight-3",
    title: "Momentum Acceleration Opportunity", 
    insight: "Current progress velocity suggests the mission could achieve target 5-7 days ahead of schedule if staging validation continues at current pace.",
    recommendation: "Consider advancing the release candidate freeze date to capture additional buffer time.",
    confidence: "medium" as const,
    type: "opportunity" as const,
    impact: "medium" as const
  }
];

const MOCK_TIMELINE = [
  {
    id: "timeline-1",
    date: "May 09",
    title: "Rollback drill baseline established",
    description: "The team confirmed the starting recovery window and agreed on the tighter target for the quarter.",
    type: "milestone" as const,
  },
  {
    id: "timeline-2", 
    date: "May 16",
    title: "Staging evidence pack refreshed",
    description: "New rehearsal timings and operator notes were attached to the sync narrative.",
    type: "update" as const,
  },
  {
    id: "timeline-3",
    date: "June 23",
    title: "Release candidate freeze",
    description: "The mission should enter the close window with a final proof bundle and no unresolved dependency drift.",
    type: "deadline" as const,
  },
];

export default function MissionDetailView({ 
  mission = MOCK_MISSION
}: MissionDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "insights">("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const currentValue = mission.latest_sync?.actual_value || 44; // Starting baseline
  const progress = mission.latest_sync?.progress_score || 82;
  const improvement = 44 - currentValue; // Minutes saved

  const getStatusBadge = () => {
    switch (mission.status) {
      case "aligned":
        return { label: "Aligned", tone: "success" as const };
      case "awaiting_review":
        return { label: "Awaiting Review", tone: "warning" as const };
      case "needs_revision":
        return { label: "Needs Revision", tone: "warning" as const };
      case "draft":
        return { label: "Draft", tone: "default" as const };
      default:
        return { label: "Unknown", tone: "default" as const };
    }
  };

  const getSyncStatusBadge = () => {
    if (!mission.latest_sync) return null;
    
    switch (mission.latest_sync.sync_status) {
      case "on_track":
        return { label: "On Track", tone: "success" as const };
      case "achieved":
        return { label: "Achieved", tone: "success" as const };
      case "ready_to_start":
        return { label: "Ready to Start", tone: "accent" as const };
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl">
        {/* Header Skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton variant="rectangular" className="h-10 w-10" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface-1 p-4">
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="mb-2 h-8 w-12" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-surface-1 p-6">
              <Skeleton className="mb-4 h-6 w-32" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface-1 p-6">
              <Skeleton className="mb-4 h-6 w-24" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/missions"
              className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary hover:shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-semibold text-text-primary">
                {mission.title}
              </h1>
              <div className="flex items-center space-x-2 text-text-secondary">
                <span>{mission.thrust_area}</span>
                <span>•</span>
                <span>{mission.quarter}</span>
                <span>•</span>
                <span>Impact Score: {mission.impact_score}/5</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <StatusPill badge={getStatusBadge()} />
            {getSyncStatusBadge() && <StatusPill badge={getSyncStatusBadge()!} />}
          </div>
        </div>
      </div>

      {/* Enhanced Analytics Strip */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AnalyticsWidget
          title="Progress"
          value={`${progress}%`}
          change={{ value: 8, period: "this week", trend: "up" }}
          icon={Target}
          variant="accent"
        />
        
        <AnalyticsWidget
          title="Current Time"
          value={`${currentValue} min`}
          change={{ value: -27, period: "vs baseline", trend: "up" }}
          icon={Clock}
          variant="success"
        />
        
        <AnalyticsWidget
          title="Improvement"
          value={`-${improvement} min`}
          change={{ value: 15, period: "this month", trend: "up" }}
          icon={TrendingUp}
          variant="success"
        />
        
        <AnalyticsWidget
          title="Days to Target"
          value="38"
          change={{ value: -5, period: "ahead of plan", trend: "up" }}
          icon={Calendar}
          variant="default"
        />
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="mb-6 border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Overview", icon: Target },
            { id: "timeline", label: "Timeline", icon: Clock },
            { id: "insights", label: "AI Insights", icon: Brain },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "timeline" | "insights")}
              className={cn(
                "group flex items-center space-x-2 border-b-2 px-1 py-4 text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-text-secondary hover:border-border-strong hover:text-text-primary"
              )}
            >
              <tab.icon className={cn(
                "h-4 w-4 transition-colors",
                activeTab === tab.id ? "text-accent" : "text-text-muted group-hover:text-text-secondary"
              )} />
              <span>{tab.label}</span>
              {tab.id === "insights" && (
                <div className="rounded-full bg-accent px-1.5 py-0.5 text-xs font-semibold text-white">
                  {MOCK_INSIGHTS.length}
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface-1 p-6">
                <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">
                  Mission Outcome
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {mission.description}
                </p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-text-muted">
                  <span>Impact Score: {mission.impact_score}/5</span>
                  <span>•</span>
                  <span>Created: {new Date(mission.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface-1 p-6">
                <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">
                  Current Narrative
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Rollback drills are now consistent across staging, and the remaining work is proving 
                  the same pattern under release-candidate pressure. The strongest evidence bundle is 
                  the before-and-after incident rehearsal summary.
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-status-achieved" />
                  <span className="text-sm text-text-secondary">Evidence strong</span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface-1 p-6">
                <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">
                  What Still Needs to Happen
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Lock the final gateway dependency and attach one conclusive timing artifact before 
                  the June 23 freeze. This is the only remaining step keeping the mission from feeling 
                  fully quarter-ready.
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-status-warning" />
                  <span className="text-sm text-text-secondary">Final proof needed</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-4">
              {MOCK_TIMELINE.map((item, index) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2",
                      item.type === "milestone" ? "border-accent bg-accent text-white" :
                      item.type === "update" ? "border-status-achieved bg-status-achieved text-white" :
                      "border-status-warning bg-status-warning text-white"
                    )}>
                      {item.type === "milestone" ? <Target className="h-4 w-4" /> :
                       item.type === "update" ? <CheckCircle className="h-4 w-4" /> :
                       <Calendar className="h-4 w-4" />}
                    </div>
                    {index < MOCK_TIMELINE.length - 1 && (
                      <div className="mt-2 h-12 w-0.5 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-secondary">{item.date}</span>
                      <span className="text-xs text-text-muted">•</span>
                      <span className={cn(
                        "text-xs uppercase tracking-wide",
                        item.type === "milestone" ? "text-accent" :
                        item.type === "update" ? "text-status-achieved" :
                        "text-status-warning"
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
          )}

          {activeTab === "insights" && (
            <div className="space-y-6">
              {MOCK_INSIGHTS.map(insight => (
                <AIInsightCard key={insight.id} {...insight} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights Summary */}
          {activeTab !== "insights" && (
            <InsightSummary insights={MOCK_INSIGHTS} />
          )}

          <div className="rounded-xl border border-border bg-surface-1 p-6">
            <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">
              Stakeholders
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-text-primary">Owner</div>
                <div className="text-sm text-text-secondary">Priya Sharma</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Manager Sponsor</div>
                <div className="text-sm text-text-secondary">Arjun Nair</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Dependency Partner</div>
                <div className="text-sm text-text-secondary">Gateway infrastructure team</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-1 p-6">
            <div className="mb-4 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Mission Health
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-status-achieved" />
                <span className="text-text-secondary">Progress is meaningful and measurable</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-status-achieved" />
                <span className="text-text-secondary">Evidence quality is consistently strong</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-status-achieved" />
                <span className="text-text-secondary">Timeline is realistic and achievable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flag className="h-4 w-4 text-status-warning" />
                <span className="text-text-secondary">One dependency requires attention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}