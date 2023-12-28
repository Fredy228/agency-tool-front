import Dashboard from "@/screens/dashboard/Dashboard";

export default function DashboardPage({ params }: { params: { id: string } }) {
  return <Dashboard idDashboard={params.id} />;
}
