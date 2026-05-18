"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, Target, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import type { UomType } from "@/types";

interface MissionFormData {
  title: string;
  description: string;
  thrust_area: string;
  uom_type: UomType;
  target_value: number | null;
  target_date: string | null;
  impact_score: number;
}

const THRUST_AREAS = [
  "Platform",
  "Product Growth", 
  "Revenue Ops",
  "Quality",
  "People Ops",
  "Customer Success"
];

const UOM_TYPES: { value: UomType; label: string; description: string }[] = [
  { value: "numeric_min", label: "Reduce Number", description: "Lower is better (e.g., response time, error rate)" },
  { value: "numeric_max", label: "Increase Number", description: "Higher is better (e.g., throughput, conversion)" },
  { value: "percentage_min", label: "Reduce Percentage", description: "Lower percentage target" },
  { value: "percentage_max", label: "Increase Percentage", description: "Higher percentage target" },
  { value: "timeline", label: "Timeline Milestone", description: "Complete by specific date" },
  { value: "zero_based", label: "Zero-Based Goal", description: "Eliminate or achieve binary outcome" }
];

const STEP_LABELS = ["Intent", "Measure", "Rhythm"];

export default function MissionCreationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState<MissionFormData>({
    title: "",
    description: "",
    thrust_area: "",
    uom_type: "numeric_max",
    target_value: null,
    target_date: null,
    impact_score: 3
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (updates: Partial<MissionFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to missions board with success state
    router.push("/missions?created=true");
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return formData.title.trim().length > 0 && formData.thrust_area.length > 0;
      case 1:
        return formData.uom_type.length > 0 && (
          formData.uom_type === "timeline" ? 
            formData.target_date !== null : 
            formData.target_value !== null
        );
      case 2:
        return formData.description.trim().length > 0;
      default:
        return false;
    }
  };

  const canProceed = isStepValid(currentStep);
  const isLastStep = currentStep === 2;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center space-x-8">
        {STEP_LABELS.map((label, index) => (
          <div key={label} className="flex items-center">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
              index <= currentStep
                ? "border-accent bg-accent text-white shadow-lg shadow-accent/25"
                : "border-border bg-surface-2 text-text-muted hover:border-border-strong"
            )}>
              {index < currentStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className={cn(
              "ml-3 text-sm font-medium transition-colors duration-300",
              index <= currentStep ? "text-text-primary" : "text-text-muted"
            )}>
              {label}
            </span>
            {index < STEP_LABELS.length - 1 && (
              <ArrowRight className="ml-8 h-4 w-4 text-text-muted" />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className={cn(
        "rounded-xl border border-border bg-surface-1 p-8 transition-all duration-300",
        isTransitioning && "opacity-50 scale-[0.98]"
      )}>
        {currentStep === 0 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-display text-xl font-semibold text-text-primary">
                Frame the operating outcome
              </h3>
              <p className="text-sm text-text-secondary">
                Name the mission in a way leadership could repeat in a room without needing extra translation.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Mission Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  placeholder="e.g., Reduce Sev-2 recovery time by standardizing rollback controls"
                  className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted transition-all duration-200 hover:border-border-strong hover:shadow-md focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:shadow-lg focus:shadow-accent/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Thrust Area
                </label>
                <select
                  value={formData.thrust_area}
                  onChange={(e) => updateFormData({ thrust_area: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary transition-all duration-200 hover:border-border-strong hover:shadow-md focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:shadow-lg focus:shadow-accent/10"
                >
                  <option value="">Select focus area</option>
                  {THRUST_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-lg border border-border-strong bg-surface-2 p-4">
              <div className="flex items-start space-x-3">
                <Target className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <h4 className="font-medium text-text-primary">Good Example</h4>
                  <p className="text-sm text-text-secondary">
                    &quot;Reduce Sev-2 recovery time by standardizing rollback controls&quot; - 
                    Clear outcome, specific domain, measurable impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-display text-xl font-semibold text-text-primary">
                Choose one measurable proof line
              </h3>
              <p className="text-sm text-text-secondary">
                Attach one metric or deadline that makes progress legible during syncs and review cycles.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Measurement Type
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {UOM_TYPES.map(type => (
                    <label
                      key={type.value}
                      className={cn(
                        "cursor-pointer rounded-lg border p-4 transition-all duration-200",
                        formData.uom_type === type.value
                          ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                          : "border-border bg-surface-2 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5"
                      )}
                    >
                      <input
                        type="radio"
                        name="uom_type"
                        value={type.value}
                        checked={formData.uom_type === type.value}
                        onChange={(e) => updateFormData({ uom_type: e.target.value as UomType })}
                        className="sr-only"
                      />
                      <div className="font-medium text-text-primary">{type.label}</div>
                      <div className="text-sm text-text-secondary">{type.description}</div>
                    </label>
                  ))}
                </div>
              </div>

              {formData.uom_type === "timeline" ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={formData.target_date || ""}
                    onChange={(e) => updateFormData({ target_date: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary transition-all duration-200 hover:border-border-strong hover:shadow-md focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Target Value
                  </label>
                  <input
                    type="number"
                    value={formData.target_value || ""}
                    onChange={(e) => updateFormData({ target_value: e.target.value ? Number(e.target.value) : null })}
                    placeholder="e.g., 25 (minutes), 85 (percent)"
                    className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted transition-all duration-200 hover:border-border-strong hover:shadow-md focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Impact Score (1-5)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(score => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => updateFormData({ impact_score: score })}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200",
                        formData.impact_score === score
                          ? "border-accent bg-accent text-white shadow-lg shadow-accent/25 scale-110"
                          : "border-border bg-surface-2 text-text-secondary hover:border-border-strong hover:scale-105 hover:shadow-md"
                      )}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border-strong bg-surface-2 p-4">
              <div className="flex items-start space-x-3">
                <Calendar className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <h4 className="font-medium text-text-primary">Good Example</h4>
                  <p className="text-sm text-text-secondary">
                    &quot;Move recovery time from 44 to 25 minutes by June 23&quot; - 
                    Specific baseline, clear target, concrete deadline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-display text-xl font-semibold text-text-primary">
                Define the weekly operating rhythm
              </h3>
              <p className="text-sm text-text-secondary">
                Call out how the work will stay visible inside the quarter so it never becomes a static aspiration.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Operating Rhythm & Evidence Plan
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData({ description: e.target.value })}
                  placeholder="Describe how you'll track progress, what evidence you'll provide in syncs, and how you'll communicate risks..."
                  rows={6}
                  className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary placeholder-text-muted transition-all duration-200 hover:border-border-strong hover:shadow-md focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div className="rounded-lg border border-border-strong bg-surface-2 p-4">
              <div className="flex items-start space-x-3">
                <Users className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <h4 className="font-medium text-text-primary">Good Example</h4>
                  <p className="text-sm text-text-secondary">
                    &quot;Weekly evidence pack with rollback drill timings, owner note on gateway dependencies, 
                    and risk flag if release sequencing changes&quot; - Clear cadence, specific artifacts, escalation path.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={cn(
              "rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200",
              currentStep === 0
                ? "cursor-not-allowed text-text-muted"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-2 hover:shadow-md"
            )}
          >
            Previous
          </button>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => router.push("/missions")}
              className="rounded-lg border border-border bg-surface-2 px-6 py-2 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary hover:shadow-md"
            >
              Cancel
            </button>
            
            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed || isSubmitting}
                className={cn(
                  "rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200",
                  canProceed && !isSubmitting
                    ? "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
                    : "cursor-not-allowed bg-surface-3 text-text-muted"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Creating Mission...</span>
                  </div>
                ) : (
                  "Create Mission"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed || isTransitioning}
                className={cn(
                  "rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200",
                  canProceed && !isTransitioning
                    ? "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
                    : "cursor-not-allowed bg-surface-3 text-text-muted"
                )}
              >
                {isTransitioning ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Next Step</span>
                  </div>
                ) : (
                  "Next Step"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}