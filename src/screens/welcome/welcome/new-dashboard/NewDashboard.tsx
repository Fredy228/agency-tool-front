"use client";

import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";

import styles from "./new-dashborad.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

import AdminDashboardHeader from "@/components/ui/welcome/dashboard-admin/header/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/ui/welcome/dashboard-admin/sidebar/AdminDashboardSidebar";
import AdminDashBoardBuild from "@/components/ui/welcome/dashboard-admin/dashboard-build/AdminDashBoardBuild";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { getOrganizationAPI } from "@/axios/organization";
import LoaderPage from "@/components/reused/loader/loader-page";
import { useRouter } from "next/navigation";

const NewDashboard: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const getOrg = async () => {
      const data = await getOrganizationAPI();
      if (!data) router.push("/welcome");
      setIsLoading(false);
    };

    getOrg().catch(async (e) => {
      if (isAxiosError(e) && e.response) {
        if (e.response.status === 404) {
          router.push("/welcome");
        } else {
          setIsLoading(false);
          getToastify("Unknown error", ToastifyEnum.ERROR);
        }
      }
    });
  }, [router]);

  if (isLoading)
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
            <AdminDashBoardBuild name={name} setName={setName} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewDashboard;
