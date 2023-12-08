"use client";

import { signOut } from "next-auth/react";

import type { NextPage } from "next";

import styles from "./auth.module.scss";
import AuthForm from "@/screens/auth/auth-form/AuthFrom";

type Props = {};
const Auth: NextPage<Props> = () => {
  return (
    <main>
      <div className={styles.auth_wrapperForm}>
        <h1 className={styles.auth_title}>Sign in</h1>

        <AuthForm />
        <button
          type={"button"}
          onClick={() =>
            signOut({
              callbackUrl: "/auth/login",
            })
          }
        >
          Sing out
        </button>
      </div>
    </main>
  );
};
export default Auth;
