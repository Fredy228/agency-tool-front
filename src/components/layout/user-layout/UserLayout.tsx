"use client";

import type { FC, PropsWithChildren } from "react";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

import styleContainer from "@/components/styles/container.module.scss";
import styles from "./user-layout.module.scss";

import {
  IconArrowDown,
  IconDashboards,
  IconWhatsNew,
} from "@/components/reused/icons/icons";
import Avatar from "@/components/layout/user-layout/user-avatar/Avatar";

import logoImg from "./logo.png";
import Image from "next/image";
import UserMenu from "@/components/layout/user-layout/user-menu/UserMenu";
import Backdrop from "@/components/reused/backdrop/Backdrop";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isShowProfileMenu, setIsShowProfileMenu] = useState<boolean>(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styleContainer.container}>
          <div className={styles.header_inner}>
            <div className={styles.header_wrapperLogo}>
              <Image
                className={styles.header_logo}
                src={logoImg}
                alt={"Logo"}
                width={"104"}
                height={"40"}
                priority={true}
              />
            </div>
            <div className={styles.header_wrapperMenu}>
              <ul className={styles.header_menuList}>
                <li className={styles.header_menuItem}>
                  <Link
                    className={styles.header_pageLink}
                    href={"/dashboard-control"}
                  >
                    <IconDashboards /> Dashboards
                  </Link>
                </li>
                <li className={styles.header_menuItem}>
                  <Link className={styles.header_pageLink} href={"/home"}>
                    <IconWhatsNew /> What’s new?
                  </Link>
                </li>
                <li className={styles.header_menuItem}>
                  <Link
                    className={styles.header_createLink}
                    href={"/dashboard-create"}
                  >
                    Create new
                  </Link>
                </li>
                <li className={`${styles.header_menuItem}`}>
                  <button
                    type={"button"}
                    className={`${styles.header_wrapperProfile} ${
                      isShowProfileMenu && styles.isShow
                    }`}
                    onClick={() =>
                      setIsShowProfileMenu((prevState) => !prevState)
                    }
                  >
                    <Avatar />
                    <IconArrowDown />
                  </button>
                </li>
              </ul>
            </div>
            <AnimatePresence>
              {isShowProfileMenu && (
                <>
                  <UserMenu />
                  <Backdrop
                    setShow={setIsShowProfileMenu}
                    backgroundColor={"transparent"}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      {children}
    </>
  );
};

export default UserLayout;
