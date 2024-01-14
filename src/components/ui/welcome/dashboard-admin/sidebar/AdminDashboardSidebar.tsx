import { type FC } from "react";

import styles from "./admin-dashboard-sidebar.module.scss";
import { listSidebar } from "@/components/ui/welcome/dashboard-admin/sidebar/list";

const AdminDashboardSidebar: FC = () => {
  return (
    <aside className={styles.adminSidebar}>
      <p className={styles.adminSidebar_title}>Create dashboard</p>
      <ul className={styles.adminSidebar_list}>
        {listSidebar.map((item) => (
          <li className={styles.adminSidebar_item} key={item.id}>
            <a className={styles.adminSidebar_link} href={`#${item.id}`}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminDashboardSidebar;
