"use client";

import type { NextPage } from "next";
import { usePathname, redirect, useRouter } from "next/navigation";

import styles from "./auth.module.scss";

import AuthForm from "@/components/ui/auth/auth-form/AuthFrom";
import LoaderPage from "@/components/reused/loader/loader-page";
import { useSelector } from "react-redux";
import { selectIsAuthorize, selectIsLoadingApp } from "@/redux/selector-param";

const Auth: NextPage = () => {
  const pathname = usePathname();
  const isLoadingApp = useSelector(selectIsLoadingApp);
  const isAuthorize = useSelector(selectIsAuthorize);

  const isRegister = pathname === "/auth/register";

  if (isLoadingApp) return <LoaderPage />;
  if (isAuthorize && !isLoadingApp) return redirect("/welcome");

  return (
    <div className={styles.auth_form}>
      <h1 className={styles.auth_title}>
        {isRegister ? "Sign up" : "Sign in"}
      </h1>

      <AuthForm isRegister={isRegister} />
    </div>
  );
};
export default Auth;
