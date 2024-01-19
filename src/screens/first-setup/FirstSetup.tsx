"use client";

import type { FC } from "react";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

import styles from "./first-setup.module.scss";

import SetupForm from "@/components/ui/auth/setup-form/SetupForm";
import LoaderPage from "@/components/reused/loader/loader-page";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/user/selectors";

const FirstSetup: FC = () => {
  const { status } = useSession();
  const user = useSelector(selectUser);
  const searchParams = useSearchParams();

  const option = searchParams.get("option");

  if (status === "loading" || (status === "authenticated" && !user.accessToken))
    return <LoaderPage />;
  if (status === "unauthenticated") redirect("/auth/login");

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
