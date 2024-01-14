import { type FC } from "react";

import styles from "./admin-dashboard-build.module.scss";
import AdminDashboardName from "@/components/ui/welcome/dashboard-admin/name/AdminDashboardName";

const AdminDashBoardBuild: FC = () => {
  return (
    <div className={styles.adminBuild}>
      <AdminDashboardName />
      <span className={styles.adminBuild_line}></span>
    </div>
  );
};
export default AdminDashBoardBuild;
