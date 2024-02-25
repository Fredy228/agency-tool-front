"use client";

import type { NextPage } from "next";
import { redirect } from "next/navigation";

import styles from "./auth-forgot.module.scss";

import LoaderPage from "@/components/reused/loader/loader-page";
import { useSelector } from "react-redux";
import { selectIsAuthorize, selectIsLoadingApp } from "@/redux/selector-param";
import ForgotPassStepOne from "@/screens/forgot-pass/step-1/ForgotPassStepOne";
import { useState } from "react";
import ForgotPassStepTwo from "@/screens/forgot-pass/step-2/ForgotPassStepTwo";

const AuthForgot: NextPage = () => {
  const isLoadingApp = useSelector(selectIsLoadingApp);
  const isAuthorize = useSelector(selectIsAuthorize);

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string | null>(null);

  if (isLoadingApp) return <LoaderPage />;
  if (!isLoadingApp && isAuthorize) redirect("/welcome");

  return (
    <div className={styles.authForgot}>
      <h1 className={styles.authForgot_title}>Forgot password?</h1>
      {step === 1 && (
        <ForgotPassStepOne setStep={setStep} setEmail={setEmail} />
      )}
      {step === 2 && <ForgotPassStepTwo email={email} />}
    </div>
  );
};

export default AuthForgot;
