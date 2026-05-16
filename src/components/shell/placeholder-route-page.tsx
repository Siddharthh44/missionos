import { PanelTop } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import OperationalEmptyState from "@/components/shell/operational-empty-state";
import PlaceholderPanel from "@/components/shell/placeholder-panel";
import { getPlaceholderSurface } from "@/features/shell/shell-data";
import { ROUTE_META } from "@/features/shell/route-meta";

interface PlaceholderRoutePageProps {
  path: keyof typeof ROUTE_META | "/missions/[id]";
}

export default function PlaceholderRoutePage({
  path,
}: PlaceholderRoutePageProps) {
  const meta = ROUTE_META[path];
  const content = getPlaceholderSurface(path);

  return (
    <div className="space-y-8">
      <PageHeader subtitle={meta.subtitle} title={meta.title} />

      <PlaceholderPanel
        description={content.description}
        eyebrow={content.eyebrow}
        metrics={content.metrics}
        points={content.points}
        sideBody={content.sideBody}
        sideHighlights={content.sideHighlights}
        sideTitle={content.sideTitle}
        title={content.title}
      />

      <OperationalEmptyState
        body={content.emptyBody}
        icon={PanelTop}
        title={content.emptyTitle}
      />
    </div>
  );
}
