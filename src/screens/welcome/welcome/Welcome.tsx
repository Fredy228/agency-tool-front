"use client";

import { type NextPage } from "next";
import { useEffect, useState } from "react";

import styles from "./welcome.module.scss";

import WelcomeCreate from "@/components/ui/welcome/welcome-create/WelcomeCreate";
import WelcomeEdit from "@/components/ui/welcome/welcome-edit/WelcomeEdit";
import LoaderPage from "@/components/reused/loader/loader-page";
import { isAxiosError } from "axios";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { getAllDashboardsAPI } from "@/axios/dashboad";
import { DashboardInterface } from "@/interfaces/dashboard";

const Welcome: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOrg, setIsOrg] = useState<boolean>(false);
  const [dashboards, setDashboards] = useState<
    Array<Pick<DashboardInterface, "id" | "name" | "screenUrl">>
  >([]);

  useEffect(() => {
    const getOrg = async () => {
      const data = await getAllDashboardsAPI();
      if (data) {
        setIsOrg(true);
        setDashboards(data);
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
  }, []);

  if (isLoading)
    return (
      <div style={{ height: "calc(100vh - 90px)", width: "100vw" }}>
        <LoaderPage />
      </div>
    );

  return (
    <div>
      {dashboards.length > 0 ? (
        <WelcomeEdit />
      ) : (
        <WelcomeCreate isOrg={isOrg} />
      )}
    </div>
  );
};

export default Welcome;
