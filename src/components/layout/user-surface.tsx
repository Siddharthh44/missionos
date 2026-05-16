import type { Profile } from "@/types";

interface UserSurfaceProps {
  profile: Profile;
}

export default function UserSurface({ profile }: UserSurfaceProps) {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-full border border-border bg-surface-2 px-3 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent">
        {initials}
      </div>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-medium text-text-primary">
          {profile.name}
        </p>
        <p className="truncate text-xs uppercase tracking-[0.18em] text-text-muted">
          {profile.role}
        </p>
      </div>
    </div>
  );
}
