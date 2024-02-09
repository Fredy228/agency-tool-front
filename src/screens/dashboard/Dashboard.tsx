"use client";

import { type NextPage } from "next";
import { get, set, remove } from "local-storage";

import styles from "./dashboard.module.scss";

import WelcomeDashboard from "@/components/ui/dashboard/welcom/WelcomeDashboard";
import CollectionDashboard from "@/components/ui/dashboard/collection/CollectionDashboard";
import LinksDashboard from "@/components/ui/dashboard/links/LinksDashboard";
import { useEffect, useRef, useState } from "react";
import LoaderPage from "@/components/reused/loader/loader-page";
import { getDashboardByIdAPI } from "@/axios/dashboad";
import { DashboardInterface } from "@/interfaces/dashboard";
import { isAxiosError } from "axios";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { useRouter } from "next/navigation";
import DashboardEnterPass from "@/components/ui/dashboard/enter-pass/DashboardEnterPass";
import { decryptionData, encryptionData } from "@/services/encryption-data";

type Props = {
  idDashboard: string;
};
const Dashboard: NextPage<Props> = ({ idDashboard }) => {
  const router = useRouter();

  const [dashboard, setDashboard] = useState<DashboardInterface>();
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEnterPass, setIsEnterPass] = useState<boolean>(false);

  const isFirst = useRef<boolean>(false);

  console.log("dashboard", dashboard);

  useEffect(() => {
    if (isFirst.current) return;
    isFirst.current = true;

    if (isEnterPass) isFirst.current = false;

    if (isEnterPass || dashboard) {
      return;
    }

    const lsPass = get<string>(idDashboard);
    const decrypPass = lsPass ? decryptionData(lsPass) : null;

    console.log("getting dash");
    getDashboardByIdAPI(
      idDashboard,
      password && !lsPass ? password : decrypPass ? decrypPass : undefined,
    )
      .then((data) => {
        setDashboard(data);
        if (password) {
          const encrypt = encryptionData(password);
          set<string>(idDashboard, encrypt);
        }
      })
      .catch((error) => {
        console.log(error);
        if (isAxiosError(error) && error.response?.status) {
          const statusCode = error.response.status;
          if (statusCode === 404) return router.push("/welcome");
          if (statusCode === 400 || statusCode === 401)
            return setIsEnterPass(true);
          if (statusCode === 403) {
            if (!password) remove(idDashboard);
            setIsEnterPass(true);
            return getToastify("Wrong password", ToastifyEnum.ERROR);
          }

          getToastify(error.message, ToastifyEnum.ERROR);
        } else {
          getToastify("Unknown error", ToastifyEnum.ERROR);
        }
      })
      .finally(() => {
        setPassword("");
        setIsLoading(false);
        isFirst.current = false;
      });
  }, [dashboard, idDashboard, isEnterPass, password, router]);

  if (isEnterPass)
    return (
      <DashboardEnterPass
        setPassword={setPassword}
        setIsEnterPass={setIsEnterPass}
      />
    );

  if (isLoading || !dashboard)
    return (
      <div style={{ height: "calc(100vh - 90px)" }}>
        <LoaderPage />
      </div>
    );

  return (
    <main className={styles.dashboard}>
      <WelcomeDashboard dashboard={dashboard} />
      <CollectionDashboard />
      <LinksDashboard />
    </main>
  );
};

export default Dashboard;
