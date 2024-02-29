"use client";

import { type FC, type PropsWithChildren, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";

import styleContainer from "@/components/styles/container.module.scss";
import styles from "./user-layout.module.scss";

import {
  IconArrowDown,
  IconDashboards,
  IconWhatsNew,
} from "@/components/reused/icons/icons";
import Avatar from "@/components/layout/user-layout/user-avatar/Avatar";
import UserMenu from "@/components/layout/user-layout/user-menu/UserMenu";
import { selectUser } from "@/redux/user/selectors";
import LoaderPage from "@/components/reused/loader/loader-page";
import PopapMenuWrap from "@/components/reused/popap-menu-wrap/PopapMenuWrap";
import { selectIsAuthorize, selectIsLoadingApp } from "@/redux/selector-param";
import { selectOrganization } from "@/redux/organization/selectors";
import BufferImg from "@/components/reused/buffer-img/BufferImg";
import { selectLogoPartner } from "@/redux/dashboard/selectors";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(selectUser);
  const organization = useSelector(selectOrganization);
  const logoPartner = useSelector(selectLogoPartner);
  const isLoadingApp = useSelector(selectIsLoadingApp);
  const isAuthorize = useSelector(selectIsAuthorize);

  const [isShowProfileMenu, setIsShowProfileMenu] = useState<boolean>(false);
  const [isShowNavMenu, setIsShowNavMenu] = useState<boolean>(false);

  if (isLoadingApp) return <LoaderPage isFull={true} />;

  return (
    <>
      <header className={styles.header}>
        <div className={styleContainer.container}>
          <div className={styles.header_inner}>
            <div className={styles.header_wrapperLogo}>
              <BufferImg
                customClass={styles.header_logo}
                buffer={organization?.logoUrl}
                priority={true}
                alt={"Logo owner"}
              />
              <BufferImg
                customClass={styles.header_logo}
                buffer={logoPartner}
                priority={true}
                alt={"Logo partner"}
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
              <PopapMenuWrap
                setShow={setIsShowNavMenu}
                stylePop={{}}
                keyItem={23423}
              ></PopapMenuWrap>
            )}
            <div
              className={`${styles.header_wrapperMenu} ${
                isShowNavMenu ? styles.active : ""
              }`}
            >
              <ul className={styles.header_menuList}>
                {isAuthorize && (
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
                {/*{user.email && (*/}
                {/*  <li className={styles.header_menuItem}>*/}
                {/*    <Link*/}
                {/*      className={styles.header_createLink}*/}
                {/*      href={"/dashboard-admin-create"}*/}
                {/*    >*/}
                {/*      Create new*/}
                {/*    </Link>*/}
                {/*  </li>*/}
                {/*)}*/}

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
                <PopapMenuWrap
                  stylePop={{ top: "calc(100% + 5px)", right: "0" }}
                  keyItem={22}
                  setShow={setIsShowProfileMenu}
                >
                  <UserMenu user={user} />
                </PopapMenuWrap>
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
