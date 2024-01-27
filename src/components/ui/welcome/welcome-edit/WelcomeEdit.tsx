import { type FC } from "react";
import Link from "next/link";

import styles from "./welcome-edit.module.scss";
import { IconEdit, IconPlus } from "@/components/reused/icons/icons";

const WelcomeEdit: FC = () => {
  return (
    <ul className={styles.welcomeEdit_list}>
      <li className={styles.welcomeEdit_item}>
        <Link
          href={"/welcome/new-dashboard"}
          className={`${styles.welcomeEdit_btn}`}
        >
          <span className={styles.welcomeEdit_text}>Create new dashboards</span>
          <IconPlus />
        </Link>
      </li>
      <li className={styles.welcomeEdit_item}>
        <Link
          href={"/auth/first-setup?option=edit"}
          className={`${styles.welcomeEdit_btn}`}
        >
          <span className={styles.welcomeEdit_text}>Edit your company</span>
          <IconEdit />
        </Link>
      </li>
    </ul>
  );
};

export default WelcomeEdit;
