"use client";

import { TrendingUp, TrendingDown, Minus, Target, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

interface AnalyticsWidgetProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    trend: "up" | "down" | "neutral";
  };
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "accent" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VARIANT_STYLES = {
  default: "border-border bg-surface-1",
  accent: "border-accent/20 bg-accent/5",
  success: "border-status-achieved/20 bg-status-achieved/5",
  warning: "border-status-warning/20 bg-status-warning/5"
};

const ICON_STYLES = {
  default: "text-text-muted",
  accent: "text-accent",
  success: "text-status-achieved",
  warning: "text-status-warning"
};

const SIZE_STYLES = {
  sm: "p-4",
  md: "p-6", 
  lg: "p-8"
};

export default function AnalyticsWidget({
  title,
  value,
  change,
  icon: Icon = Target,
  variant = "default",
  size = "md",
  className
}: AnalyticsWidgetProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-status-achieved" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-status-warning" />;
      default:
        return <Minus className="h-3 w-3 text-text-muted" />;
    }
  };

  const getTrendColor = () => {
    if (!change) return "text-text-muted";
    
    switch (change.trend) {
      case "up":
        return "text-status-achieved";
      case "down":
        return "text-status-warning";
      default:
        return "text-text-muted";
    }
  };

  return (
    <div className={cn(
      "rounded-xl border transition-all duration-200 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5",
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Icon className={cn("h-4 w-4", ICON_STYLES[variant])} />
            <span className="text-sm font-medium text-text-secondary">{title}</span>
          </div>
          
          <div className="mt-2">
            <div className="text-2xl font-semibold text-text-primary">{value}</div>
            
            {change && (
              <div className="mt-1 flex items-center space-x-1">
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {change.value > 0 ? "+" : ""}{change.value}%
                </span>
                <span className="text-sm text-text-muted">{change.period}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MomentumIndicatorProps {
  label: string;
  status: "strong" | "steady" | "weak" | "critical";
  value?: string;
  description?: string;
  className?: string;
}

const MOMENTUM_STYLES = {
  strong: {
    bg: "bg-status-achieved/10",
    border: "border-status-achieved/20",
    text: "text-status-achieved",
    icon: "text-status-achieved"
  },
  steady: {
    bg: "bg-accent/10",
    border: "border-accent/20", 
    text: "text-accent",
    icon: "text-accent"
  },
  weak: {
    bg: "bg-status-warning/10",
    border: "border-status-warning/20",
    text: "text-status-warning",
    icon: "text-status-warning"
  },
  critical: {
    bg: "bg-status-revision/10",
    border: "border-status-revision/20",
    text: "text-status-revision",
    icon: "text-status-revision"
  }
};

export function MomentumIndicator({
  label,
  status,
  value,
  description,
  className
}: MomentumIndicatorProps) {
  const styles = MOMENTUM_STYLES[status];
  
  const getIcon = () => {
    switch (status) {
      case "strong":
        return <TrendingUp className={cn("h-4 w-4", styles.icon)} />;
      case "steady":
        return <Zap className={cn("h-4 w-4", styles.icon)} />;
      case "weak":
        return <Clock className={cn("h-4 w-4", styles.icon)} />;
      case "critical":
        return <TrendingDown className={cn("h-4 w-4", styles.icon)} />;
    }
  };

  return (
    <div className={cn(
      "rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
      styles.bg,
      styles.border,
      className
    )}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-text-primary">{label}</span>
            {value && (
              <span className={cn("text-sm font-semibold", styles.text)}>
                {value}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}