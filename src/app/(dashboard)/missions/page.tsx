"use client";

import MissionBoard from "@/components/missions/mission-board";
import { useRoleContext } from "@/hooks/use-role-context";

export default function MissionsPage() {
  const { effectiveRole } = useRoleContext();
  const showOwners = effectiveRole === "manager" || effectiveRole === "admin";

  return (
    <div className="space-y-6">
      <MissionBoard showOwners={showOwners} />
    </div>
  );
}
