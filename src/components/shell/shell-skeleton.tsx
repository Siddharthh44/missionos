interface ShellSkeletonProps {
  lines?: number;
}

export default function ShellSkeleton({ lines = 3 }: ShellSkeletonProps) {
  return (
    <div className="space-y-3">
      <div className="h-6 w-36 animate-pulse rounded-md bg-surface-2" />
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={`line-${index + 1}`}
          className="h-4 animate-pulse rounded-md bg-surface-2"
        />
      ))}
    </div>
  );
}
