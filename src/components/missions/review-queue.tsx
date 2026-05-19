"use client";

import { useCallback, useState } from "react";
import { CheckCircle, Clock, MessageSquare, ArrowRight, AlertTriangle, Target } from "lucide-react";
import DraftPersistenceHint from "@/components/shell/draft-persistence-hint";
import { useToast } from "@/hooks/use-toast";
import { useLocalDraft } from "@/hooks/use-local-draft";
import { formatOperationalLabeled } from "@/lib/operational-time";
import { cn } from "@/lib/cn";
import OperationalEmptyState from "@/components/shell/operational-empty-state";
import { operationalEmptyPresets } from "@/components/shell/operational-empty-presets";
import StatusPill from "@/components/shell/status-pill";
import type { Mission } from "@/types";

interface ReviewQueueItem {
  mission: Mission;
  reviewNotes?: string;
  recommendedAction: "approve" | "return" | "coach";
}

interface ReviewQueueProps {
  items?: ReviewQueueItem[];
  onReviewAction?: (missionId: string, action: "approved" | "returned" | "edited", comment?: string) => void;
}

const MOCK_QUEUE_ITEMS: ReviewQueueItem[] = [
  {
    mission: {
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
      created_at: "2026-05-15T14:00:00Z",
      updated_at: "2026-05-15T14:00:00Z",
      employee: {
        id: "profile-sneha",
        name: "Sneha Iyer",
        email: "sneha@demo.missionos.app",
        role: "employee",
        department: "Revenue Ops",
        manager_id: "profile-arjun",
        avatar_url: null,
      }
    },
    recommendedAction: "return",
    reviewNotes: "Needs a more concrete turnaround threshold and one cleaner definition of escalation success before it advances."
  },
  {
    mission: {
      id: "mission-incident-review-cadence",
      employee_id: "profile-dev",
      title: "Incident Review Cadence",
      description: "Restore weekly incident closure discipline by aligning action owners, due dates, and review rituals.",
      thrust_area: "Quality",
      uom_type: "percentage_max",
      target_value: 95,
      target_date: null,
      impact_score: 4,
      status: "awaiting_review",
      is_shared: false,
      shared_source_id: null,
      quarter: "Q2-2026",
      year: 2026,
      locked_at: null,
      created_at: "2026-05-15T16:00:00Z",
      updated_at: "2026-05-15T16:00:00Z",
      employee: {
        id: "profile-dev",
        name: "Dev Malhotra",
        email: "dev@demo.missionos.app",
        role: "employee",
        department: "Quality",
        manager_id: "profile-arjun",
        avatar_url: null,
      }
    },
    recommendedAction: "coach",
    reviewNotes: "The mission is directionally right, but it still needs a single accountable closer for weekly remediation completion."
  },
  {
    mission: {
      id: "mission-launch-readiness",
      employee_id: "profile-priya",
      title: "Launch Readiness Shared Mission",
      description: "Align release readiness, enablement notes, and support handoff expectations across Engineering and Revenue.",
      thrust_area: "Platform",
      uom_type: "timeline",
      target_value: null,
      target_date: "2026-06-23",
      impact_score: 5,
      status: "awaiting_review",
      is_shared: true,
      shared_source_id: null,
      quarter: "Q2-2026",
      year: 2026,
      locked_at: null,
      created_at: "2026-05-16T08:00:00Z",
      updated_at: "2026-05-16T08:00:00Z",
      employee: {
        id: "profile-priya",
        name: "Priya Sharma",
        email: "priya@demo.missionos.app",
        role: "employee",
        department: "Engineering",
        manager_id: "profile-arjun",
        avatar_url: null,
      }
    },
    recommendedAction: "approve",
    reviewNotes: "Evidence quality is strong, recipient scope is coherent, and the story is ready for leadership discussion."
  }
];

export default function ReviewQueue({ 
  items = MOCK_QUEUE_ITEMS,
  onReviewAction 
}: ReviewQueueProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const notifyRestored = useCallback(
    () => {
      toast.info(
        "Draft restored",
        "Your review comment was recovered for this mission.",
      );
    },
    [toast],
  );

  const notifySavedLocally = useCallback(
    () => {
      toast.info("Changes saved locally", "Review notes stored on this device only.");
    },
    [toast],
  );

  const {
    value: reviewComment,
    setValue: setReviewComment,
    clearDraft: clearReviewDraft,
    meta: reviewDraftMeta,
  } = useLocalDraft<string>({
    scope: "review-comment",
    draftId: selectedItem ?? undefined,
    enabled: Boolean(selectedItem),
    initialValue: "",
    isEmpty: (value) => !value.trim(),
    onRestored: notifyRestored,
    onSavedLocally: notifySavedLocally,
  });

  const handleReviewAction = async (
    missionId: string,
    action: "approved" | "returned" | "edited",
  ) => {
    const mission = items.find((item) => item.mission.id === missionId)?.mission;
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onReviewAction?.(missionId, action, reviewComment);

      if (action === "approved") {
        toast.success(
          "Mission approved",
          mission ? `${mission.title} advanced to aligned status.` : undefined,
        );
      } else if (action === "returned") {
        toast.warning(
          "Returned for revision",
          mission
            ? `${mission.title} sent back with review notes.`
            : "Review notes attached for the owner.",
        );
      } else {
        toast.info(
          "Coaching notes sent",
          mission
            ? `${mission.title} flagged for manager coaching.`
            : "Owner notified to refine the mission narrative.",
        );
      }

      clearReviewDraft();
      setSelectedItem(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActionIcon = (action: ReviewQueueItem["recommendedAction"]) => {
    switch (action) {
      case "approve":
        return CheckCircle;
      case "return":
        return AlertTriangle;
      case "coach":
        return MessageSquare;
      default:
        return Clock;
    }
  };

  const getActionColor = (action: ReviewQueueItem["recommendedAction"]) => {
    switch (action) {
      case "approve":
        return "text-status-achieved";
      case "return":
        return "text-status-warning";
      case "coach":
        return "text-accent";
      default:
        return "text-text-muted";
    }
  };

  const getActionLabel = (action: ReviewQueueItem["recommendedAction"]) => {
    switch (action) {
      case "approve":
        return "Ready to advance";
      case "return":
        return "Needs revision";
      case "coach":
        return "Coach first";
      default:
        return "Pending";
    }
  };

  return (
    <div className="space-y-6">
      {/* Queue Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Review Queue
          </h2>
          <p className="text-text-secondary">
            {items.length} mission{items.length !== 1 ? 's' : ''} awaiting review
          </p>
        </div>
        
        <div className="rounded-lg border border-border bg-surface-1 px-4 py-2">
          <span className="text-sm font-medium text-text-secondary">Review Window: </span>
          <span className="text-sm font-semibold text-accent">Open through May 24</span>
        </div>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <OperationalEmptyState {...operationalEmptyPresets.reviewsClear} />
        ) : null}
        {items.map((item) => {
          const ActionIcon = getActionIcon(item.recommendedAction);
          const isSelected = selectedItem === item.mission.id;
          
          return (
            <div
              key={item.mission.id}
              className={cn(
                "rounded-xl border transition-all duration-200",
                isSelected 
                  ? "border-accent bg-accent/5 shadow-lg" 
                  : "border-border bg-surface-1 hover:border-border-strong hover:shadow-md"
              )}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-display text-lg font-semibold text-text-primary">
                        {item.mission.title}
                      </h3>
                      {item.mission.is_shared && (
                        <StatusPill badge={{ label: "Shared", tone: "accent" }} />
                      )}
                    </div>
                    
                    <p className="mt-2 text-text-secondary leading-relaxed">
                      {item.mission.description}
                    </p>
                    
                    <div className="mt-3 flex items-center space-x-4 text-sm text-text-muted">
                      <span>Owner: {item.mission.employee?.name}</span>
                      <span>•</span>
                      <span>{item.mission.thrust_area}</span>
                      <span>•</span>
                      <span>
                        {formatOperationalLabeled(
                          "Submitted",
                          item.mission.updated_at,
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex items-center space-x-3">
                    <div className={cn("flex items-center space-x-2", getActionColor(item.recommendedAction))}>
                      <ActionIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{getActionLabel(item.recommendedAction)}</span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedItem(isSelected ? null : item.mission.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-2 text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary hover:shadow-sm"
                    >
                      <ArrowRight className={cn(
                        "h-4 w-4 transition-all duration-200",
                        isSelected && "rotate-90"
                      )} />
                    </button>
                  </div>
                </div>

                {/* Review Notes */}
                {item.reviewNotes && (
                  <div className="mt-4 rounded-lg border border-border bg-surface-2 p-4">
                    <h4 className="mb-2 font-medium text-text-primary">Review Notes</h4>
                    <p className="text-sm text-text-secondary">{item.reviewNotes}</p>
                  </div>
                )}
              </div>

              {/* Review Actions */}
              {isSelected && (
                <div className="border-t border-border bg-surface-2 p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-primary">
                        Review Comment
                      </label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Add your review feedback..."
                        rows={3}
                        className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                      <DraftPersistenceHint meta={reviewDraftMeta} className="mt-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-text-secondary">
                        Choose an action for this mission review
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleReviewAction(item.mission.id, "returned")}
                          disabled={isSubmitting}
                          className="rounded-lg border border-status-warning bg-status-warning/10 px-4 py-2 text-sm font-medium text-status-warning transition-colors hover:bg-status-warning/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Return for Revision
                        </button>
                        
                        <button
                          onClick={() => handleReviewAction(item.mission.id, "edited")}
                          disabled={isSubmitting}
                          className="rounded-lg border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Coach & Edit
                        </button>
                        
                        <button
                          onClick={() => handleReviewAction(item.mission.id, "approved")}
                          disabled={isSubmitting}
                          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isSubmitting ? "Processing..." : "Approve"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review Guidelines */}
      <div className="rounded-xl border border-border bg-surface-1 p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">
          Review Guidelines
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-start space-x-3">
            <Target className="mt-0.5 h-5 w-5 text-accent" />
            <div>
              <h4 className="font-medium text-text-primary">Clarity</h4>
              <p className="text-sm text-text-secondary">
                Outcome language should be repeatable out loud
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="mt-0.5 h-5 w-5 text-status-achieved" />
            <div>
              <h4 className="font-medium text-text-primary">Measurement</h4>
              <p className="text-sm text-text-secondary">
                One primary measure that creates a shared proof line
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MessageSquare className="mt-0.5 h-5 w-5 text-status-warning" />
            <div>
              <h4 className="font-medium text-text-primary">Ownership</h4>
              <p className="text-sm text-text-secondary">
                Shared work still needs one accountable voice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}