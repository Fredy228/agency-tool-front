import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/screens/dashboard/Dashboard"), {
  ssr: false,
});

export default function DashboardPage({ params }: { params: { id: string } }) {
  return <Dashboard idDashboard={params.id} />;
}
