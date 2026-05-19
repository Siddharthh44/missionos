"use client";

import { Brain, Lightbulb, AlertTriangle, CheckCircle, TrendingUp, Target } from "lucide-react";
import { formatOperationalRelative } from "@/lib/operational-time";
import { cn } from "@/lib/cn";

interface AIInsightCardProps {
  title: string;
  insight: string;
  recommendation?: string;
  confidence: "high" | "medium" | "low";
  type: "pattern" | "risk" | "opportunity" | "recommendation";
  impact?: "high" | "medium" | "low";
  generatedAt?: string | Date;
  className?: string;
}

const CONFIDENCE_STYLES = {
  high: {
    bg: "bg-status-achieved/10",
    border: "border-status-achieved/20",
    text: "text-status-achieved",
    label: "High Confidence"
  },
  medium: {
    bg: "bg-accent/10", 
    border: "border-accent/20",
    text: "text-accent",
    label: "Medium Confidence"
  },
  low: {
    bg: "bg-status-warning/10",
    border: "border-status-warning/20", 
    text: "text-status-warning",
    label: "Low Confidence"
  }
};

const TYPE_STYLES = {
  pattern: {
    icon: TrendingUp,
    color: "text-accent",
    label: "Pattern Detected"
  },
  risk: {
    icon: AlertTriangle,
    color: "text-status-warning",
    label: "Risk Signal"
  },
  opportunity: {
    icon: Target,
    color: "text-status-achieved",
    label: "Opportunity"
  },
  recommendation: {
    icon: Lightbulb,
    color: "text-accent",
    label: "Recommendation"
  }
};

export default function AIInsightCard({
  title,
  insight,
  recommendation,
  confidence,
  type,
  impact,
  generatedAt,
  className,
}: AIInsightCardProps) {
  const confidenceStyle = CONFIDENCE_STYLES[confidence];
  const typeStyle = TYPE_STYLES[type];
  const TypeIcon = typeStyle.icon;

  return (
    <div className={cn(
      "rounded-xl border border-border bg-surface-1 p-6 transition-all duration-200 hover:border-border-strong hover:shadow-lg",
      className
    )}>
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Brain className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary">
              {title}
            </h3>
            <div className="flex items-center space-x-2">
              <TypeIcon className={cn("h-3 w-3", typeStyle.color)} />
              <span className={cn("text-xs font-medium uppercase tracking-wide", typeStyle.color)}>
                {typeStyle.label}
              </span>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "rounded-full px-2 py-1 text-xs font-medium",
          confidenceStyle.bg,
          confidenceStyle.text
        )}>
          {confidenceStyle.label}
        </div>
      </div>

      {/* Insight Content */}
      <div className="space-y-4">
        <p className="text-text-secondary leading-relaxed">
          {insight}
        </p>

        {recommendation && (
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
            <div className="flex items-start space-x-2">
              <Lightbulb className="mt-0.5 h-4 w-4 text-accent" />
              <div>
                <h4 className="font-medium text-text-primary">Recommended Action</h4>
                <p className="mt-1 text-sm text-text-secondary">{recommendation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center space-x-4 text-sm text-text-muted">
            <span>AI Analysis</span>
            <span>•</span>
            <span>
              Updated {formatOperationalRelative(generatedAt ?? "2026-05-19T11:55:00Z")}
            </span>
          </div>
          
          {impact && (
            <div className="flex items-center space-x-1">
              <span className="text-sm text-text-muted">Impact:</span>
              <span className={cn(
                "text-sm font-medium",
                impact === "high" ? "text-status-warning" :
                impact === "medium" ? "text-accent" :
                "text-text-secondary"
              )}>
                {impact.charAt(0).toUpperCase() + impact.slice(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface InsightSummaryProps {
  insights: Array<{
    id: string;
    type: AIInsightCardProps["type"];
    title: string;
    confidence: AIInsightCardProps["confidence"];
  }>;
  className?: string;
}

export function InsightSummary({ insights, className }: InsightSummaryProps) {
  const getTypeCount = (type: AIInsightCardProps["type"]) => 
    insights.filter(i => i.type === type).length;

  const getConfidenceCount = (confidence: AIInsightCardProps["confidence"]) =>
    insights.filter(i => i.confidence === confidence).length;

  return (
    <div className={cn("rounded-xl border border-border bg-surface-1 p-6", className)}>
      <div className="mb-4 flex items-center space-x-2">
        <Brain className="h-5 w-5 text-accent" />
        <h3 className="font-display text-lg font-semibold text-text-primary">
          Intelligence Summary
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">Signal Types</h4>
          <div className="space-y-2">
            {[
              { type: "pattern" as const, label: "Patterns" },
              { type: "risk" as const, label: "Risks" },
              { type: "opportunity" as const, label: "Opportunities" },
              { type: "recommendation" as const, label: "Actions" }
            ].map(({ type, label }) => {
              const count = getTypeCount(type);
              const typeStyle = TYPE_STYLES[type];
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <typeStyle.icon className={cn("h-3 w-3", typeStyle.color)} />
                    <span className="text-sm text-text-secondary">{label}</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">Confidence</h4>
          <div className="space-y-2">
            {[
              { confidence: "high" as const, label: "High" },
              { confidence: "medium" as const, label: "Medium" },
              { confidence: "low" as const, label: "Low" }
            ].map(({ confidence, label }) => {
              const count = getConfidenceCount(confidence);
              const style = CONFIDENCE_STYLES[confidence];
              return (
                <div key={confidence} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={cn("h-2 w-2 rounded-full", style.bg)} />
                    <span className="text-sm text-text-secondary">{label}</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-surface-2 p-3">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-status-achieved" />
          <span className="text-sm font-medium text-text-primary">
            {insights.length} insights generated
          </span>
        </div>
        <p className="mt-1 text-xs text-text-muted">
          Analysis updated in real-time based on mission progress and team patterns
        </p>
      </div>
    </div>
  );
}