"use client";

import { type NextPage } from "next";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./welcome.module.scss";

import WelcomeCreate from "@/components/ui/welcome/welcome-create/WelcomeCreate";
import WelcomeEdit from "@/components/ui/welcome/welcome-edit/WelcomeEdit";
import LoaderPage from "@/components/reused/loader/loader-page";
import { isAxiosError } from "axios";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { getAllDashboardsAPI } from "@/axios/dashboad";
import ListDashboards from "@/components/ui/welcome/list-dashboard/ListDashboards";
import { setListDashb } from "@/redux/dashboard/slice";
import { selectListDashb } from "@/redux/dashboard/selectors";
import { selectUser } from "@/redux/user/selectors";

const Welcome: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOrg, setIsOrg] = useState<boolean>(false);
  const dashboards = useSelector(selectListDashb);
  const user = useSelector(selectUser);

  const dispacth: Dispatch<any> = useDispatch();

  const isFirst = useRef<boolean>(false);

  useEffect(() => {
    if (isFirst.current) return;
    isFirst.current = true;
    const getOrg = async () => {
      const data = await getAllDashboardsAPI();
      if (data) {
        setIsOrg(true);
        dispacth(setListDashb(data));
      }
      setIsLoading(false);
    };

    getOrg().catch((e) => {
      setIsLoading(false);
      if (isAxiosError(e) && e.response) {
        if (e.response.status !== 404) {
          getToastify("Unknown error", ToastifyEnum.ERROR);
        }
      }
    });
  }, [dispacth]);

  if (isLoading)
    return (
      <div style={{ height: "calc(100vh - 90px)", width: "100vw" }}>
        <LoaderPage />
      </div>
    );

  return (
    <div className={styles.welcome}>
      {dashboards.length > 0 ? (
        <>
          <WelcomeEdit />
          {dashboards.length >= 6 && (
            <p className={styles.welcome_notice}>
              You can create up to 6 dashboards
            </p>
          )}
          <ListDashboards dashboards={dashboards} />
        </>
      ) : (
        <WelcomeCreate isOrg={isOrg} isVerify={Boolean(user.verified)} />
      )}
    </div>
  );
};

export default Welcome;
