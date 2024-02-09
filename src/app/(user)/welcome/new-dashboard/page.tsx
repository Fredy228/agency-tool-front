import NewDashboard from "@/screens/welcome/welcome/new-dashboard/NewDashboard";
import { ProtectWrapper } from "@/components/provider/ProtectWrapper";

export default function NewDashboardPage() {
  return (
    <ProtectWrapper>
      <NewDashboard />
    </ProtectWrapper>
  );
}
