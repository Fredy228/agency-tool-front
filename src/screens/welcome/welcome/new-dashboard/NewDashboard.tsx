import { type NextPage } from "next";

import styles from "./new-dashborad.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

import AdminDashboardHeader from "@/components/ui/welcome/dashboard-admin/header/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/ui/welcome/dashboard-admin/sidebar/AdminDashboardSidebar";
import AdminDashBoardBuild from "@/components/ui/welcome/dashboard-admin/dashboard-build/AdminDashBoardBuild";
const NewDashboard: NextPage = () => {
  return (
    <main className={styles.newDashboard}>
      <div className={styleContainer.container}>
        <div className={styles.newDashboard_inner}>
          <AdminDashboardHeader name={"Abra Cadabra"} />
          <div className={styles.newDashboard_flex}>
            <AdminDashboardSidebar />
            <AdminDashBoardBuild />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewDashboard;
