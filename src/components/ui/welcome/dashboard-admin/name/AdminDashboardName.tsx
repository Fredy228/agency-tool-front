import { type FC } from "react";

import styles from "./admin-dashboard-name.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";

const AdminDashboardName: FC = () => {
  return (
    <section className={styles.adminName}>
      <h3 className={styleSection.adminSection_title}>Name of Dashboard</h3>
      <div className={styles.adminName_wraperInput}>
        <input
          className={styles.adminName_input}
          type="text"
          placeholder={"Enter name of dashboard"}
          disabled={false}
        />
        <button className={styles.adminName_button} type={"button"}>
          Edit
        </button>
      </div>
    </section>
  );
};

export default AdminDashboardName;
