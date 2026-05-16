import OperationalRoutePage from "@/components/shell/operational-route-page";

interface MissionDetailPageProps {
  params: {
    id: string;
  };
}

export default function MissionDetailPage({
  params,
}: MissionDetailPageProps) {
  return <OperationalRoutePage missionId={params.id} path="/missions/[id]" />;
}
