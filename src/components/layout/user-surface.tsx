import type { Profile, UserRole } from "@/types";

interface UserSurfaceProps {
  collapsed?: boolean;
  effectiveRole: UserRole;
  isRoleOverrideActive: boolean;
  profile: Profile;
  onSignOut: () => Promise<void>;
}

function toLabel(value: string) {
  return value[0]?.toUpperCase() + value.slice(1);
}

export default function UserSurface({
  collapsed = false,
  effectiveRole,
  isRoleOverrideActive,
  profile,
  onSignOut,
}: UserSurfaceProps) {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent">
          {initials}
        </div>
        {!collapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">
              {profile.name}
            </p>
            <p className="truncate text-xs uppercase tracking-[0.18em] text-text-muted">
              {isRoleOverrideActive
                ? `${toLabel(profile.role)} account · ${toLabel(effectiveRole)} view`
                : toLabel(profile.role)}
            </p>
          </div>
        ) : null}
      </div>

      {!collapsed ? (
        <button
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-border px-3 py-2 text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
          type="button"
          onClick={() => void onSignOut()}
        >
          Sign out
        </button>
      ) : null}
    </div>
  );
}
