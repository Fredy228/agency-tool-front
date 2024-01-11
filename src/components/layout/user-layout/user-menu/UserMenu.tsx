import { type FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signOut } from "next-auth/react";

import styles from "./user-menu.module.scss";

import Avatar from "@/components/layout/user-layout/user-avatar/Avatar";
import {
  IconBilling,
  IconSettings,
  IconSignOut,
} from "@/components/reused/icons/icons";
import { UserInterface } from "@/interfaces/user";
import { logoutUser } from "@/axios/auth";

type Props = {
  user: UserInterface;
};
const UserMenu: FC<Props> = ({ user }) => {
  const logoutAction = async () => {
    await logoutUser(user.refreshToken);
    signOut().catch(console.error);
  };

  return (
    <motion.div
      initial={{ opacity: 1, transform: "translateY(100%)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      exit={{ opacity: 0, transform: "translateY(100%)" }}
      className={styles.userMenu}
    >
      {user.email && (
        <>
          <div className={styles.userMenu_profile}>
            <Avatar user={user} />
            <div className={styles.userMenu_info}>
              <p className={styles.userMenu_name}>
                {user.firstName} {user.lastName}
              </p>
              <p className={styles.userMenu_email}>{user.email}</p>
            </div>
          </div>
        </>
      )}

      <ul className={styles.userMenu_list}>
        {user.email && (
          <>
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
          </>
        )}
        {user.email ? (
          <li className={styles.userMenu_item}>
            <button
              type={"button"}
              className={styles.userMenu_link}
              onClick={() => logoutAction()}
            >
              <IconSignOut /> Sign out
            </button>
          </li>
        ) : (
          <li className={styles.userMenu_item}>
            <Link className={styles.userMenu_link} href={"/auth/login"}>
              <IconSignOut /> Sign in
            </Link>
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default UserMenu;
