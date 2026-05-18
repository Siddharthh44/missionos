"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import MissionBoard from "@/components/missions/mission-board";
import { useRoleContext } from "@/hooks/use-role-context";

export default function MissionsPage() {
  const { effectiveRole } = useRoleContext();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("created") === "true") {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const showOwners = effectiveRole === "manager" || effectiveRole === "admin";

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="rounded-lg border border-status-achieved bg-status-achieved/10 p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-status-achieved" />
            <span className="font-medium text-status-achieved">
              Mission created successfully! It&apos;s now visible on your board.
            </span>
          </div>
        </div>
      )}
      
      <MissionBoard showOwners={showOwners} />
    </div>
  );
}
