"use client";

import { useState } from "react";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import NavSection from "@/components/layout/nav-section";
import UserSurface from "@/components/layout/user-surface";
import { NAVIGATION_SECTIONS } from "@/features/shell/navigation";
import type { Profile, UserRole } from "@/types";
import { cn } from "@/lib/cn";
import Image from "next/image";

interface SidebarProps {
  collapsed: boolean;
  effectiveRole: UserRole;
  isRoleOverrideActive: boolean;
  profile: Profile;
  onSignOut: () => Promise<void>;
  onToggle: () => void;
}

export default function Sidebar({
  collapsed,
  effectiveRole,
  isRoleOverrideActive,
  profile,
  onSignOut,
  onToggle,
}: SidebarProps) {
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  
  const visibleSections = NAVIGATION_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.allowedRoles.includes(effectiveRole)),
  })).filter((section) => section.items.length > 0);

  return (
    <aside
      className={cn(

        "fixed top-0 left-0 z-50 hidden h-screen shrink-0 flex-col overflow-hidden border-r border-green/[0.1] bg-background transition-all duration-200 ease-in-out lg:flex",
        collapsed ? "w-[56px]" : "w-[220px]",
      )}
    >
      {/* Logo / Header Section */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center pt-1.5 transition-all duration-200",
          collapsed ? "cursor-pointer justify-center px-0" : "justify-between px-4"
        )}
        onMouseEnter={() => collapsed && setIsHoveringLogo(true)}
        onMouseLeave={() => setIsHoveringLogo(false)}
        onClick={() => collapsed && onToggle()}
      >
        {collapsed && isHoveringLogo ? (
          // Collapsed + hovering → show expand icon
          <div

            className="flex h-7 w-7 items-center justify-center rounded-md bg-green/[0.1] text-white/70 transition-colors duration-150"
            title="Expand sidebar"
          >
            <ChevronsRight size={14} />
          </div>
        ) : collapsed && !isHoveringLogo ? (
          // Collapsed, not hovering → logo mark only
          <Image
            src="/logo-mark.svg"
            alt="MissionOS"
            width={28}
            height={28}

            className="object-contain bg-green/[0.1]"
          />
        ) : (
          // Expanded → full logo + wordmark + collapse button
          <>
            <div className="flex items-center gap-3.5">
              <Image
                src="/logo-mark.svg"
                alt="MissionOS"
                width={28}
                height={28}

                className="object-contain bg-green/[0.1]"
              />

              <span className="text-[15px] font-semibold tracking-[0.04em] text-white/70">
                MissionOS
              </span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}

              className="flex items-center rounded p-1 text-green/[0.6] transition-colors duration-150 hover:text-white/80"
              title="Collapse sidebar"
              type="button"
            >
              <ChevronsLeft size={14} />
            </button>
          </>
        )}
      </div>

      {/* Navigation Section */}
      <div 
        className={cn(
          "pt-5 flex-1 space-y-6 transition-all duration-200",
          collapsed ? "overflow-hidden px-2" : "overflow-y-auto px-4",



          "[scrollbar-color:green/[0.15]_transparent] [scrollbar-width:thin]",
          "[&::-webkit-scrollbar-thumb:hover]:bg-green/30 [&::-webkit-scrollbar-thumb]:rounded-sm",
          "[&::-webkit-scrollbar-thumb]:bg-green/20 [&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar]:w-1"
        )}
      >
        {visibleSections.map((section, index) => (
          <div key={section.label}>
            {collapsed && index > 0 && (

              <div className="mx-2 mb-6 h-px bg-green/[0.15]" />
            )}
            <NavSection
              collapsed={collapsed}
              section={section}
            />
          </div>
        ))}
      </div>

      {/* User Section */}

      <div className={cn("shrink-0 border-t border-green/[0.1] bg-background/[0.1]", collapsed ? "p-3" : "p-4")}>
        <UserSurface
          collapsed={collapsed}
          effectiveRole={effectiveRole}
          isRoleOverrideActive={isRoleOverrideActive}
          profile={profile}
          onSignOut={onSignOut}
        />
      </div>
    </aside>
  );
}
