"use client";

import { type FC, type PropsWithChildren, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

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
import { selectUser } from "@/redux/user/selectors";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isShowProfileMenu, setIsShowProfileMenu] = useState<boolean>(false);
  const [isShowNavMenu, setIsShowNavMenu] = useState<boolean>(false);
  const user = useSelector(selectUser);

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

            <div className={styles.header_wrapperBurger}>
              <button
                className={`${styles.header_burgerBtn} ${
                  isShowNavMenu ? styles.active : ""
                }`}
                type={"button"}
                onClick={() => setIsShowNavMenu((prevState) => !prevState)}
              >
                <span className={styles.header_burgerIcon}></span>
              </button>
            </div>
            {isShowNavMenu && (
              <Backdrop
                setShow={setIsShowNavMenu}
                backgroundColor={"transparent"}
                scrollPage={true}
              />
            )}
            <div
              className={`${styles.header_wrapperMenu} ${
                isShowNavMenu ? styles.active : ""
              }`}
            >
              <ul className={styles.header_menuList}>
                {user.email && (
                  <li className={styles.header_menuItem}>
                    <Link className={styles.header_pageLink} href={"/welcome"}>
                      <IconDashboards /> Dashboards
                    </Link>
                  </li>
                )}

                <li className={styles.header_menuItem}>
                  <Link className={styles.header_pageLink} href={"/home"}>
                    <IconWhatsNew /> What’s new?
                  </Link>
                </li>
                {user.email && (
                  <li className={styles.header_menuItem}>
                    <Link
                      className={styles.header_createLink}
                      href={"/dashboard-create"}
                    >
                      Create new
                    </Link>
                  </li>
                )}

                <li className={`${styles.header_menuItem} ${styles.pc}`}>
                  <button
                    type={"button"}
                    className={`${styles.header_wrapperProfile} ${
                      isShowProfileMenu && styles.isShow
                    }`}
                    onClick={() =>
                      setIsShowProfileMenu((prevState) => !prevState)
                    }
                  >
                    <Avatar user={user} />
                    <IconArrowDown />
                  </button>
                </li>
              </ul>
            </div>
            <div className={`${styles.header_menuItem} ${styles.mobile}`}>
              <button
                type={"button"}
                className={`${styles.header_wrapperProfile} ${
                  isShowProfileMenu && styles.isShow
                }`}
                onClick={() => setIsShowProfileMenu((prevState) => !prevState)}
              >
                <Avatar user={user} />
                <IconArrowDown />
              </button>
            </div>
            <AnimatePresence>
              {isShowProfileMenu && (
                <>
                  <UserMenu user={user} />
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
