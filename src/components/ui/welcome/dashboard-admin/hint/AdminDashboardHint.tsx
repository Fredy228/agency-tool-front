import { type FC } from "react";
import { IconHint } from "@/components/reused/icons/icons";

import styles from "./admin-dashboard-hint.module.scss";

type Props = {
  text: string;
};
const AdminDashboardHint: FC<Props> = ({ text }) => {
  return (
    <div className={styles.adminHint}>
      <span className={styles.adminHint_icon}>
        <IconHint />
      </span>
      <p className={styles.adminHint_text}>{text}</p>
    </div>
  );
};

export default AdminDashboardHint;
