import OperationalRoutePage from "@/components/shell/operational-route-page";
import { ROUTE_META } from "@/features/shell/route-meta";

interface PlaceholderRoutePageProps {
  path: keyof typeof ROUTE_META | "/missions/[id]";
  missionId?: string;
}

export default function PlaceholderRoutePage({
  path,
  missionId,
}: PlaceholderRoutePageProps) {
  return <OperationalRoutePage missionId={missionId} path={path} />;
}
