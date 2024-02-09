"use client";

import { type NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

import styles from "@/screens/welcome/welcome/new-dashboard/new-dashborad.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

import AdminDashboardHeader from "@/components/ui/welcome/dashboard-admin/header/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/ui/welcome/dashboard-admin/sidebar/AdminDashboardSidebar";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import LoaderPage from "@/components/reused/loader/loader-page";
import AdminDashBoardBuildEdit from "@/components/ui/welcome/dashboard-admin/dashboard-build/AdminDashboardBuildEdit";
import { getDashboardByIdAPI } from "@/axios/dashboad";
import { DashboardInterface } from "@/interfaces/dashboard";

type Props = {
  idDashboard: string;
};
const DashboardEdit: NextPage<Props> = ({ idDashboard }) => {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboard, setDashboard] = useState<DashboardInterface | null>(null);

  const isFirst = useRef<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (isFirst.current) return;
    isFirst.current = true;

    const getDashboard = async () => {
      try {
        const data = await getDashboardByIdAPI(idDashboard, undefined);
        console.log("data", data);
        if (!data.password) return router.push("/welcome");
        setDashboard(data);
        setName(data.name);
      } catch (e) {
        if (isAxiosError(e) && e.response?.status) {
          const statusCode = e.response?.status;
          if ([403, 400, 404].includes(statusCode)) {
            getToastify("Dashboard not found", ToastifyEnum.ERROR);
            return router.push("/welcome");
          }
          if (statusCode === 401) return router.push("/auth/login");
        } else {
          getToastify("Unknown error", ToastifyEnum.ERROR);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getDashboard();
  }, [idDashboard, router]);

  if (isLoading || !dashboard)
    return (
      <div style={{ height: "calc(100vh - 90px)", width: "100vw" }}>
        <LoaderPage />
      </div>
    );

  return (
    <main className={styles.newDashboard}>
      <div className={styleContainer.container}>
        <div className={styles.newDashboard_inner}>
          <AdminDashboardHeader name={name} />
          <div className={styles.newDashboard_flex}>
            <AdminDashboardSidebar />
            <AdminDashBoardBuildEdit
              name={name}
              setName={setName}
              dashboard={dashboard}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardEdit;
