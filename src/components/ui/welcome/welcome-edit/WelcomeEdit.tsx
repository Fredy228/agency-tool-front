"use client";

import { type FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import styles from "./welcome-edit.module.scss";

import { IconEdit, IconPlus } from "@/components/reused/icons/icons";
import { selectListDashb } from "@/redux/dashboard/selectors";

const WelcomeEdit: FC = () => {
  const dashboards = useSelector(selectListDashb);

  const isFull = dashboards.length >= 6;

  return (
    <ul className={styles.welcomeEdit_list}>
      <li className={styles.welcomeEdit_item}>
        <Link
          href={isFull ? "" : "/welcome/new-dashboard"}
          className={`${styles.welcomeEdit_btn} ${isFull && styles.disable}`}
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
