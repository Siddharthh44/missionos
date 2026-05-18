"use client";

import { useRoleContext } from "@/hooks/use-role-context";
import ReviewQueue from "@/components/missions/review-queue";
import OperationalRoutePage from "@/components/shell/operational-route-page";

export default function ReviewPage() {
  const { effectiveRole } = useRoleContext();
  
  // Only managers and admins see the interactive review queue
  if (effectiveRole === "manager" || effectiveRole === "admin") {
    return <ReviewQueue />;
  }
  
  // Employees see the operational surface
  return <OperationalRoutePage path="/review" />;
}
