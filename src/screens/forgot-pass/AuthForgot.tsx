"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import styles from "./auth-forgot.module.scss";
import ForgotForm from "@/components/ui/auth/forgot-form/ForgotForm";
import LoaderPage from "@/components/reused/loader/loader-page";
import { useSelector } from "react-redux";
import { selectIsAuthorize, selectIsLoadingApp } from "@/redux/selector-param";

type Props = {};
const AuthForgot: NextPage<Props> = () => {
  const isLoadingApp = useSelector(selectIsLoadingApp);
  const isAuthorize = useSelector(selectIsAuthorize);

  if (isLoadingApp) return <LoaderPage />;
  if (!isLoadingApp && isAuthorize) redirect("/welcome");

  return (
    <div className={styles.authForgot}>
      <h1 className={styles.authForgot_title}>Forgot password?</h1>
      <p className={styles.authForgot_description}>
        Enter the email address you used to sign in. We will email you a
        password reset code.
      </p>
      <ForgotForm />
      <div className={styles.authForgot_wrapperLink}>
        <Link className={styles.authForgot_goBack} href={"/auth/login"}>
          Go back to <span>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default AuthForgot;
