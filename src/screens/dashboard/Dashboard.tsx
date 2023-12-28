"use client";

import type { NextPage } from "next";

import styles from "./dashboard.module.scss";
import WelcomeDashboard from "@/components/ui/dashboard/welcom/WelcomeDashboard";

type Props = {
  idDashboard: string;
};
const Dashboard: NextPage<Props> = ({ idDashboard }) => {
  return (
    <main className={styles.dashboard}>
      <WelcomeDashboard />
    </main>
  );
};

export default Dashboard;
