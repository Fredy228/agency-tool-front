import { type FC } from "react";
import Link from "next/link";

import styles from "./admin-dashboard-header.module.scss";
import { IconArrowDown } from "@/components/reused/icons/icons";

type Props = {
  name: string;
};
const AdminDashboardHeader: FC<Props> = ({ name }) => {
  return (
    <div className={styles.adminHeader}>
      <div className={styles.adminHeader_nav}>
        <Link className={styles.adminHeader_navLink} href={"/welcome"}>
          <IconArrowDown />
        </Link>
        <h2 className={styles.adminHeader_navTitle}>{name}</h2>
      </div>
      <p className={styles.adminHeader_navText}>
        Create dashboard, set colors, customize for yourself and your business
      </p>
    </div>
  );
};

export default AdminDashboardHeader;
