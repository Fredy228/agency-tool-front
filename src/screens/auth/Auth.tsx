"use client";

import type { NextPage } from "next";
import { usePathname, redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import styles from "./auth.module.scss";

import AuthForm from "@/components/ui/auth/auth-form/AuthFrom";
import LoaderPage from "@/components/reused/loader/loader-page";

const Auth: NextPage = () => {
  const pathname = usePathname();
  const session = useSession();

  const isRegister = pathname === "/auth/register";

  if (session.status === "loading") return <LoaderPage />;
  if (session.status === "authenticated") redirect("/welcome");

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
