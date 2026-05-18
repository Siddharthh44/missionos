import PageHeader from "@/components/layout/page-header";
import MissionCreationForm from "@/components/missions/mission-creation-form";
import { ROUTE_META } from "@/features/shell/route-meta";

export default function NewMissionPage() {
  const meta = ROUTE_META["/missions/new"];
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
      />
      <MissionCreationForm />
    </div>
  );
}
