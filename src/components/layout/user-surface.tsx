import { LogOut } from "lucide-react";
import type { Profile, UserRole } from "@/types";
import { cn } from "@/lib/cn";

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
    <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-2.5")}>
      {/* Avatar */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1F2937] border border-[#374151] text-[11px] font-medium text-[#E5E7EB]">
        {initials}
      </div>
      
      {/* Name + Role (expanded only) */}
      {!collapsed && (
        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-[13px] text-white/70">
            {profile.name}
          </p>
          <p className="truncate text-[11px] uppercase tracking-[0.06em] text-white/35">
            {isRoleOverrideActive
              ? toLabel(effectiveRole)
              : toLabel(profile.role)}
          </p>
        </div>
      )}
      
      {/* Sign out button (expanded only) */}
      {!collapsed && (
        <button
          onClick={() => void onSignOut()}
          className="flex items-center text-white/30 transition-colors duration-150 hover:text-white/60"
          title="Sign out"
          type="button"
        >
          <LogOut size={14} />
        </button>
      )}
    </div>
  );
}
