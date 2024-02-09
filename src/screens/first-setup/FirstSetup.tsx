"use client";

import type { FC } from "react";
import { redirect, useSearchParams } from "next/navigation";

import styles from "./first-setup.module.scss";

import SetupForm from "@/components/ui/auth/setup-form/SetupForm";
import LoaderPage from "@/components/reused/loader/loader-page";
import { useSelector } from "react-redux";
import { selectIsAuthorize, selectIsLoadingApp } from "@/redux/selector-param";

const FirstSetup: FC = () => {
  const searchParams = useSearchParams();

  const isLoadingApp = useSelector(selectIsLoadingApp);
  const isAuthorize = useSelector(selectIsAuthorize);

  const option = searchParams.get("option");

  if (isLoadingApp) return <LoaderPage />;
  if (!isLoadingApp && !isAuthorize) redirect("/auth/login");

  return (
    <div className={styles.setupForm}>
      <h1 className={styles.setupForm_title}>
        You can {option === "edit" ? "edit" : "create"} your own organization
      </h1>
      <SetupForm isEdit={option === "edit"} />
    </div>
  );
};

export default FirstSetup;
