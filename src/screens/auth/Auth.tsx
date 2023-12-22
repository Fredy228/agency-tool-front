"use client";

import type { NextPage } from "next";

import AuthForm from "@/components/ui/auth/auth-form/AuthFrom";

import styles from "./auth.module.scss";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {};
const Auth: NextPage<Props> = () => {
  const pathname = usePathname();
  const session = useSession();
  const isRegister = pathname === "/auth/register";

  console.log("session", session);

  return (
    <div className={styles.auth_form}>
      <h1 className={styles.auth_title}>
        {isRegister ? "Sign up" : "Sign in"}
      </h1>

      <AuthForm isRegister={isRegister} />
      {/*<button*/}
      {/*  type={"button"}*/}
      {/*  onClick={() =>*/}
      {/*    signOut({*/}
      {/*      callbackUrl: "/auth/login",*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  Sing out*/}
      {/*</button>*/}
    </div>
  );
};
export default Auth;
