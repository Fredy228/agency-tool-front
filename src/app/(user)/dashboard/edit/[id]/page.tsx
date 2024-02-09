import dynamic from "next/dynamic";
import { ProtectWrapper } from "@/components/provider/ProtectWrapper";

const DashboardEdit = dynamic(
  () => import("@/screens/dashboard/dashboard-edit/DashboardEdit"),
  {
    ssr: false,
  },
);

export default function DashboardEditPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <ProtectWrapper>
      <DashboardEdit idDashboard={params.id} />;
    </ProtectWrapper>
  );
}
