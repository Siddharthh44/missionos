"use client";

import { useCallback, useState } from "react";
import { CheckCircle, AlertTriangle, TrendingUp, Calendar, FileText } from "lucide-react";
import DraftPersistenceHint from "@/components/shell/draft-persistence-hint";
import { useToast } from "@/hooks/use-toast";
import { useLocalDraft } from "@/hooks/use-local-draft";
import { formatOperationalDeadline } from "@/lib/operational-time";
import { cn } from "@/lib/cn";
import type { SyncStatus } from "@/types";

export interface SyncFormData {
  actual_value: number | null;
  actual_date: string | null;
  sync_status: SyncStatus;
  narrative: string;
  evidence_notes: string;
  risks: string;
  next_steps: string;
}

interface MissionSyncFormProps {
  missionId: string;
  missionTitle: string;
  targetValue?: number | null;
  targetDate?: string | null;
  uomType: string;
  onSubmit?: (data: SyncFormData) => void;
  onCancel?: () => void;
}

const SYNC_STATUS_OPTIONS: { value: SyncStatus; label: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    value: "ready_to_start",
    label: "Ready to Start",
    description: "Mission is set up and ready to begin execution",
    icon: Calendar
  },
  {
    value: "on_track",
    label: "On Track",
    description: "Making steady progress toward the target",
    icon: TrendingUp
  },
  {
    value: "achieved",
    label: "Achieved",
    description: "Target has been met or exceeded",
    icon: CheckCircle
  }
];

const INITIAL_SYNC_FORM: SyncFormData = {
  actual_value: null,
  actual_date: null,
  sync_status: "on_track",
  narrative: "",
  evidence_notes: "",
  risks: "",
  next_steps: "",
};

function isSyncFormEmpty(data: SyncFormData): boolean {
  return (
    data.actual_value === null &&
    data.actual_date === null &&
    data.sync_status === INITIAL_SYNC_FORM.sync_status &&
    !data.narrative.trim() &&
    !data.evidence_notes.trim() &&
    !data.risks.trim() &&
    !data.next_steps.trim()
  );
}

export default function MissionSyncForm({
  missionId,
  missionTitle,
  targetValue,
  targetDate,
  uomType,
  onSubmit,
  onCancel
}: MissionSyncFormProps) {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notifyRestored = useCallback(
    () => {
      toast.info(
        "Draft restored",
        "Your sync narrative and progress fields were recovered locally.",
      );
    },
    [toast],
  );

  const notifySavedLocally = useCallback(
    () => {
      toast.info("Changes saved locally", "Sync draft stored on this device only.");
    },
    [toast],
  );

  const {
    value: formData,
    setValue: setFormData,
    clearDraft,
    meta: draftMeta,
  } = useLocalDraft<SyncFormData>({
    scope: "sync",
    draftId: missionId,
    initialValue: INITIAL_SYNC_FORM,
    isEmpty: isSyncFormEmpty,
    onRestored: notifyRestored,
    onSavedLocally: notifySavedLocally,
  });

  const updateFormData = (updates: Partial<SyncFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSubmit?.(formData);
    clearDraft();
    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return (
      formData.narrative.trim().length > 0 &&
      formData.next_steps.trim().length > 0 &&
      (uomType === "timeline" ? formData.actual_date : formData.actual_value !== null)
    );
  };

  const getProgressIndicator = () => {
    if (!formData.actual_value || !targetValue) return null;
    
    const progress = Math.min((formData.actual_value / targetValue) * 100, 100);
    return Math.round(progress);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-text-primary">
          Sync Update: {missionTitle}
        </h2>
        <p className="text-text-secondary">
          Provide your latest progress update and narrative for this mission.
        </p>
        <DraftPersistenceHint meta={draftMeta} className="mt-2" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Status Selection */}
        <div className="rounded-xl border border-border bg-surface-1 p-6">
          <h3 className="mb-4 font-medium text-text-primary">Mission Status</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {SYNC_STATUS_OPTIONS.map(option => (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-lg border p-4 transition-colors",
                  formData.sync_status === option.value
                    ? "border-accent bg-accent/5"
                    : "border-border bg-surface-2 hover:border-border-strong"
                )}
              >
                <input
                  type="radio"
                  name="sync_status"
                  value={option.value}
                  checked={formData.sync_status === option.value}
                  onChange={(e) => updateFormData({ sync_status: e.target.value as SyncStatus })}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <option.icon className={cn(
                    "h-5 w-5",
                    formData.sync_status === option.value ? "text-accent" : "text-text-muted"
                  )} />
                  <div>
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="rounded-xl border border-border bg-surface-1 p-6">
          <h3 className="mb-4 font-medium text-text-primary">Progress Metrics</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {uomType === "timeline" ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Actual Date (if completed)
                </label>
                <input
                  type="date"
                  value={formData.actual_date || ""}
                  onChange={(e) => updateFormData({ actual_date: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <p className="mt-1 text-sm text-text-secondary">
                  Target:{" "}
                  {targetDate ? formatOperationalDeadline(targetDate) : "Not set"}
                </p>
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Current Value
                </label>
                <input
                  type="number"
                  value={formData.actual_value || ""}
                  onChange={(e) => updateFormData({ actual_value: e.target.value ? Number(e.target.value) : null })}
                  placeholder="Enter current measurement"
                  className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <p className="mt-1 text-sm text-text-secondary">
                  Target: {targetValue || "Not set"}
                </p>
              </div>
            )}

            {getProgressIndicator() && (
              <div className="flex items-center justify-center rounded-lg border border-border bg-surface-2 p-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-accent">{getProgressIndicator()}%</div>
                  <div className="text-sm text-text-secondary">Progress to Target</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Narrative Update */}
        <div className="rounded-xl border border-border bg-surface-1 p-6">
          <h3 className="mb-4 font-medium text-text-primary">Weekly Narrative</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-primary">
                What moved this week? <span className="text-status-warning">*</span>
              </label>
              <textarea
                value={formData.narrative}
                onChange={(e) => updateFormData({ narrative: e.target.value })}
                placeholder="Describe what changed, what progress was made, and what moved the numbers..."
                rows={4}
                className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text-primary">
                Evidence & Proof Points
              </label>
              <textarea
                value={formData.evidence_notes}
                onChange={(e) => updateFormData({ evidence_notes: e.target.value })}
                placeholder="Link to artifacts, screenshots, data, or other evidence that supports your narrative..."
                rows={3}
                className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Risks & Next Steps */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-1 p-6">
            <div className="mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-status-warning" />
              <h3 className="font-medium text-text-primary">Risks & Blockers</h3>
            </div>
            <textarea
              value={formData.risks}
              onChange={(e) => updateFormData({ risks: e.target.value })}
              placeholder="Any risks, dependencies, or blockers that need attention..."
              rows={4}
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="rounded-xl border border-border bg-surface-1 p-6">
            <div className="mb-4 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-accent" />
              <h3 className="font-medium text-text-primary">Next Steps</h3>
            </div>
            <textarea
              value={formData.next_steps}
              onChange={(e) => updateFormData({ next_steps: e.target.value })}
              placeholder="What will you focus on next week? What needs to happen before the next sync?"
              rows={4}
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <p className="mt-2 text-sm text-text-secondary">
              <span className="text-status-warning">*</span> Required field
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface-1 p-6">
          <div className="text-sm text-text-secondary">
            This update will be visible to your manager and included in the next sync review.
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-border bg-surface-2 px-6 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={cn(
                "rounded-lg px-6 py-2 text-sm font-medium transition-colors",
                isFormValid() && !isSubmitting
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "cursor-not-allowed bg-surface-3 text-text-muted"
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}