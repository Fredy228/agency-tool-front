import type { FC } from "react";

import { motion } from "framer-motion";

import styles from "./user-menu.module.scss";

import Avatar from "@/components/layout/user-layout/user-avatar/Avatar";
import {
  IconBilling,
  IconSettings,
  IconSignOut,
} from "@/components/reused/icons/icons";
import Link from "next/link";

type Props = {};
const UserMenu: FC<Props> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 1, transform: "translateY(100%)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      exit={{ opacity: 0, transform: "translateY(100%)" }}
      className={styles.userMenu}
    >
      <div className={styles.userMenu_profile}>
        <Avatar />
        <div className={styles.userMenu_info}>
          <p className={styles.userMenu_name}>Anna Kolos</p>
          <p className={styles.userMenu_email}>annakolos@gmail.com</p>
        </div>
      </div>
      <ul className={styles.userMenu_list}>
        <span className={styles.userMenu_line}>line</span>
        <li className={styles.userMenu_item}>
          <Link className={styles.userMenu_link} href={"/settings"}>
            <IconSettings /> Settings
          </Link>
        </li>
        <li className={styles.userMenu_item}>
          <Link className={styles.userMenu_link} href={"/billings"}>
            <IconBilling /> Billings
          </Link>
        </li>
        <span className={styles.userMenu_line}>line</span>
        <li className={styles.userMenu_item}>
          <button type={"button"} className={styles.userMenu_link}>
            <IconSignOut /> Sign out
          </button>
        </li>
      </ul>
    </motion.div>
  );
};

export default UserMenu;
