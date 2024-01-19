"use client";

import { type NextPage } from "next";
import { useEffect, useState } from "react";

import styles from "./welcome.module.scss";

import WelcomeCreate from "@/components/ui/welcome/welcome-create/WelcomeCreate";
import WelcomeEdit from "@/components/ui/welcome/welcome-edit/WelcomeEdit";
import LoaderPage from "@/components/reused/loader/loader-page";
import { getOrganizationAPI } from "@/axios/organization";
import { isAxiosError } from "axios";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { OrganizationInterface } from "@/interfaces/organization";

const Welcome: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [org, setOrg] = useState<OrganizationInterface | null>(null);

  useEffect(() => {
    const getOrg = async () => {
      const data = await getOrganizationAPI();
      if (data) setOrg(data);
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

  if (isLoading) return <LoaderPage />;

  return (
    <div>
      <WelcomeCreate org={org} />
      {/*<WelcomeEdit />*/}
    </div>
  );
};

export default Welcome;
