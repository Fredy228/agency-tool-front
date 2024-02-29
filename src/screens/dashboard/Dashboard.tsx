"use client";

import { type Dispatch, useEffect, useRef, useState } from "react";
import { type NextPage } from "next";
import { get, set, remove } from "local-storage";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import styles from "./dashboard.module.scss";

import WelcomeDashboard from "@/components/ui/dashboard/welcom/WelcomeDashboard";
import CollectionDashboard from "@/components/ui/dashboard/collection/CollectionDashboard";
import LinksDashboard from "@/components/ui/dashboard/links/LinksDashboard";
import LoaderPage from "@/components/reused/loader/loader-page";
import { getDashboardByIdAPI } from "@/axios/dashboad";
import { DashboardInterface } from "@/interfaces/dashboard";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import DashboardEnterPass from "@/components/ui/dashboard/enter-pass/DashboardEnterPass";
import { decryptionData, encryptionData } from "@/services/encryption-data";

import { setListLink } from "@/redux/link/slice";
import { setOrganization } from "@/redux/organization/slice";
import { setLogoPartner } from "@/redux/dashboard/slice";

type Props = {
  idDashboard: string;
};
const Dashboard: NextPage<Props> = ({ idDashboard }) => {
  const router = useRouter();
  const dispacth: Dispatch<any> = useDispatch();

  const [dashboard, setDashboard] = useState<DashboardInterface>();
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEnterPass, setIsEnterPass] = useState<boolean>(false);

  const isFirst = useRef<boolean>(false);
  const isOwn = Boolean(dashboard?.password);

  useEffect(() => {
    if (isFirst.current) return;
    isFirst.current = true;

    if (isEnterPass) {
      isFirst.current = false;
      return;
    }

    if (dashboard) return;

    const lsPass = get<string>(idDashboard);
    const decrypPass = lsPass ? decryptionData(lsPass) : null;

    console.log("getting dash");
    getDashboardByIdAPI(
      idDashboard,
      password && !lsPass ? password : decrypPass ? decrypPass : undefined,
    )
      .then((data) => {
        setDashboard(data);
        dispacth(setOrganization(data?.orgId));
        dispacth(setLogoPartner(data.logoPartnerUrl));
        if (password) {
          const encrypt = encryptionData(password);
          set<string>(idDashboard, encrypt);
        }
        if (data.links) dispacth(setListLink(data.links));
      })
      .catch((error) => {
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
  }, [dashboard, dispacth, idDashboard, isEnterPass, password, router]);

  useEffect(() => {
    return () => {
      dispacth(setOrganization({ logoUrl: null }));
      dispacth(setLogoPartner(null));
    };
  }, [dispacth]);

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
      <CollectionDashboard isOwn={isOwn} />
      {isOwn || (dashboard.links && dashboard.links?.length > 0) ? (
        <LinksDashboard isOwn={isOwn} />
      ) : (
        ""
      )}
    </main>
  );
};

export default Dashboard;
