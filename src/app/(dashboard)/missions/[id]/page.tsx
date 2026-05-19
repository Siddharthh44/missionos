"use client";

import { useParams } from "next/navigation";
import OperationalRoutePage from "@/components/shell/operational-route-page";

export default function MissionDetailPage() {
  const params = useParams();
  const missionId = typeof params.id === "string" ? params.id : undefined;

  return <OperationalRoutePage path="/missions/[id]" missionId={missionId} />;
}
