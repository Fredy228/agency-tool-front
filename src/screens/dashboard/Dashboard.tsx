import { type NextPage } from "next";

import styles from "./dashboard.module.scss";

import WelcomeDashboard from "@/components/ui/dashboard/welcom/WelcomeDashboard";
import CollectionDashboard from "@/components/ui/dashboard/collection/CollectionDashboard";
import LinksDashboard from "@/components/ui/dashboard/links/LinksDashboard";

type Props = {
  idDashboard: string;
};
const Dashboard: NextPage<Props> = ({ idDashboard }) => {
  return (
    <main className={styles.dashboard}>
      <WelcomeDashboard />
      <CollectionDashboard />
      <LinksDashboard />
    </main>
  );
};

export default Dashboard;
