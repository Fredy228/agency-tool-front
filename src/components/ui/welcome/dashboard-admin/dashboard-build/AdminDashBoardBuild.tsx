"use client";

import { type FC, useState } from "react";

import styles from "./admin-dashboard-build.module.scss";

import AdminDashboardName from "@/components/ui/welcome/dashboard-admin/name/AdminDashboardName";
import AdminDashboardImage from "@/components/ui/welcome/dashboard-admin/wecome-image/AdminDashboardImage";
import AdminDashboardText from "@/components/ui/welcome/dashboard-admin/welcome-text/AdminDashboardText";
import AdminDashboardPartner from "@/components/ui/welcome/dashboard-admin/logo-partner/AdminDashboardPartner";

const AdminDashBoardBuild: FC = () => {
  const [logo, setLogo] = useState<File | undefined>(undefined);

  return (
    <div className={styles.adminBuild}>
      <AdminDashboardName />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardImage />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardText />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardPartner logo={logo} setLogo={setLogo} />
      <div className={styles.adminBuild_wrapBtn}>
        <button className={styles.adminBuild_cancelBtn} type={"button"}>
          Cancel
        </button>
        <button className={styles.adminBuild_applyBtn} type={"button"}>
          Save and continue
        </button>
      </div>
    </div>
  );
};
export default AdminDashBoardBuild;
