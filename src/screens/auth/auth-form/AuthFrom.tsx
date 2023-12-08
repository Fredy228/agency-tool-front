"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import type { NextPage } from "next";
import type { FormEventHandler } from "react";

import styles from "./auth-form.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";
import { IconGoogle } from "@/components/reused/icons/icons";
import Link from "next/link";

type Props = {};
const AuthForm: NextPage<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const isRegister = pathname === "/auth/register";
  const session = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const isMatchesPass =
    isRegister && password === rePassword && password !== "";

  console.log("session", session);

  const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const answer = await signIn("credentials", {
      email,
      password,
      name,
      type: pathname.split("/")[2],
      redirect: false,
    });
    console.log("answer", answer);

    if (answer?.error) {
      if (answer.status === 401) {
        console.error("Error 401");
      } else {
        console.error("Unknown error");
      }
    }

    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const answer = await signIn("google", {
      callbackUrl,
    });

    if (answer?.error) {
      if (answer.status === 401) {
        console.error("Error 401");
      } else {
        console.error("Unknown error");
      }
    }

    setIsLoading(false);
  };

  return (
    <form
      className={`${formStyles.form} ${styles.authForm}`}
      onSubmit={submitForm}
    >
      <label className={formStyles.form_label}>
        <span>{isRegister ? "Email" : "Login"}</span>
        <input
          className={formStyles.form_input}
          type="text"
          required={true}
          placeholder={"Enter your email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value.trim())}
        />
      </label>
      {isRegister && (
        <label className={formStyles.form_label}>
          <span>Name</span>

          <input
            className={formStyles.form_input}
            type="text"
            placeholder={"Enter your name"}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </label>
      )}

      <label className={formStyles.form_label}>
        <span>Password</span>

        <input
          className={formStyles.form_input}
          required={true}
          type="password"
          placeholder={"Enter your password"}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value.trim())}
        />
      </label>
      {isRegister && (
        <label className={formStyles.form_label}>
          <input
            className={formStyles.form_input}
            required={true}
            type="password"
            placeholder={"Reenter your password"}
            value={rePassword}
            onChange={(e) => setRePassword(e.currentTarget.value.trim())}
          />
        </label>
      )}
      <Link href={"/forgot"} className={styles.authForm_forgot}>
        Forgot password?
      </Link>
      <button
        className={`${formStyles.form_applyBtn} ${styles.authForm_buttonSign}`}
        type={"submit"}
        disabled={isLoading && !isMatchesPass}
      >
        {isRegister ? "Sign up" : "Sign in"}
      </button>
      <div className={styles.authForm_separatorWrap}>
        <span className={styles.authForm_separator}>OR</span>
      </div>
      <button
        className={styles.authForm_buttonGoogle}
        type={"button"}
        onClick={signInWithGoogle}
      >
        <IconGoogle /> Sign in with Google
      </button>
    </form>
  );
};
export default AuthForm;
