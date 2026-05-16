"use client";

import { useState, type PropsWithChildren } from "react";
import MobileNav from "@/components/layout/mobile-nav";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuarter } from "@/hooks/use-quarter";
import { useRoleContext } from "@/hooks/use-role-context";

export default function AppShell({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    effectiveRole,
    isRoleOverrideActive,
    setRole,
  } = useRoleContext();
  const { profile, signOut } = useCurrentUser();
  const { quarterLabel } = useQuarter();

  if (!profile || !effectiveRole) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="flex min-h-screen">
        <Sidebar
          collapsed={collapsed}
          effectiveRole={effectiveRole}
          isRoleOverrideActive={isRoleOverrideActive}
          profile={profile}
          onSignOut={signOut}
          onToggle={() => setCollapsed((value) => !value)}
        />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar
            currentRole={effectiveRole}
            isRoleOverrideActive={isRoleOverrideActive}
            onOpenMobileNav={() => setMobileOpen(true)}
            onRoleChange={setRole}
            onSignOut={signOut}
            profile={profile}
            quarterLabel={quarterLabel}
          />
          <main className="shell-container flex-1 py-8">{children}</main>
        </div>
      </div>
      <MobileNav
        effectiveRole={effectiveRole}
        isRoleOverrideActive={isRoleOverrideActive}
        open={mobileOpen}
        profile={profile}
        onSignOut={signOut}
        onClose={() => setMobileOpen(false)}
      />
    </div>
  );
}
