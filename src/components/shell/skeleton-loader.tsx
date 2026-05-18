"use client";

import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({ 
  className, 
  variant = "rectangular",
  width,
  height,
  animate = true 
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-surface-2",
        animate && "animate-pulse",
        variant === "text" && "h-4 rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-lg",
        className
      )}
      style={{ width, height }}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
  showProgress?: boolean;
  showBadges?: boolean;
}

export function SkeletonCard({ 
  className, 
  showProgress = true, 
  showBadges = true 
}: SkeletonCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface-1 p-6 transition-all duration-200", className)}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton variant="circular" className="h-8 w-8" />
        </div>
        
        {showProgress && (
          <div className="space-y-2">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        )}
        
        {showBadges && (
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

interface SkeletonTimelineProps {
  items?: number;
  className?: string;
}

export function SkeletonTimeline({ items = 3, className }: SkeletonTimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex space-x-4">
          <div className="flex flex-col items-center">
            <Skeleton variant="circular" className="h-8 w-8" />
            {index < items - 1 && <Skeleton className="mt-2 h-12 w-0.5" />}
          </div>
          <div className="flex-1 space-y-2 pb-8">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;