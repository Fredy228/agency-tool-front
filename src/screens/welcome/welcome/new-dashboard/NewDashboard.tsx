"use client";

import { type NextPage } from "next";
import { useState } from "react";

import styles from "./new-dashborad.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

import AdminDashboardHeader from "@/components/ui/welcome/dashboard-admin/header/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/ui/welcome/dashboard-admin/sidebar/AdminDashboardSidebar";
import AdminDashBoardBuild from "@/components/ui/welcome/dashboard-admin/dashboard-build/AdminDashBoardBuild";

const NewDashboard: NextPage = () => {
  const [name, setName] = useState<string>("");

  return (
    <main className={styles.newDashboard}>
      <div className={styleContainer.container}>
        <div className={styles.newDashboard_inner}>
          <AdminDashboardHeader name={name} />
          <div className={styles.newDashboard_flex}>
            <AdminDashboardSidebar />
            <AdminDashBoardBuild name={name} setName={setName} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewDashboard;
