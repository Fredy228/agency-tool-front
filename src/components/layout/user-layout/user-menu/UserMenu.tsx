"use client";

import { Dispatch, type FC } from "react";
import Link from "next/link";

import styles from "./user-menu.module.scss";

import Avatar from "@/components/layout/user-layout/user-avatar/Avatar";
import {
  IconBilling,
  IconSettings,
  IconSignOut,
} from "@/components/reused/icons/icons";
import { UserInterface } from "@/interfaces/user";
import { logoutUser } from "@/axios/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthorize } from "@/redux/selector-param";
import { remove } from "local-storage";
import { setAuthorize } from "@/redux/slice-param";

type Props = {
  user: UserInterface;
};
const UserMenu: FC<Props> = ({ user }) => {
  const dispacth: Dispatch<any> = useDispatch();
  const isAuthorize = useSelector(selectIsAuthorize);

  const logoutAction = async () => {
    await logoutUser();
    remove("token");
    dispacth(setAuthorize(false));
  };

  return (
    <div className={styles.userMenu}>
      {isAuthorize && (
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
        {isAuthorize && (
          <>
            <span className={styles.userMenu_line}>line</span>
            <li className={styles.userMenu_item}>
              <Link className={styles.userMenu_link} href={"/welcome"}>
                <IconSettings /> Settings
              </Link>
            </li>
            <li className={styles.userMenu_item}>
              <Link className={styles.userMenu_link} href={"/welcome"}>
                <IconBilling /> Billings
              </Link>
            </li>
            <span className={styles.userMenu_line}>line</span>
          </>
        )}
        {isAuthorize ? (
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
    </div>
  );
};

export default UserMenu;
