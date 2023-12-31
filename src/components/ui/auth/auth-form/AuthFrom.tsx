"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import type { NextPage } from "next";
import type { FormEventHandler } from "react";

import styles from "./auth-form.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

import {
  IconGoogle,
  IconHidePass,
  IconShowPass,
} from "@/components/reused/icons/icons";
import { getToastify, ToastifyEnum } from "@/services/toastify";

type Props = {
  isRegister: boolean;
};
const AuthForm: NextPage<Props> = ({ isRegister }) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<Array<string>>([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const isMatchesPass = (isRegister && password === rePassword) || !isRegister;

  const setInvalid = (name: string) => {
    setInvalidInput((prevState) => [...prevState, name]);

    let message = "";

    switch (name) {
      case "email":
        message = "The email is incorrect or empty.";
        break;
      case "name":
        message = "The name is incorrect or empty.";
        break;
      case "password":
        message =
          "Password may have a minimum of 8 characters, including at least one capital letter and one number";
        break;
      default:
        return;
    }

    getToastify(message, ToastifyEnum.ERROR, 5000);
  };

  const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setInvalidInput([]);

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
          className={`${formStyles.form_input} ${
            invalidInput.includes("email") && formStyles.invalid
          }`}
          type="email"
          required={true}
          placeholder={"Enter your email"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value.trim())}
          onInvalid={(e) => setInvalid(e.currentTarget.name)}
        />
      </label>
      {isRegister && (
        <label className={formStyles.form_label}>
          <span>Name</span>

          <input
            className={`${formStyles.form_input} ${
              invalidInput.includes("name") && formStyles.invalid
            }`}
            type="text"
            placeholder={"Enter your name"}
            value={name}
            name={"name"}
            required={true}
            onChange={(e) => setName(e.currentTarget.value)}
            onInvalid={(e) => setInvalid(e.currentTarget.name)}
          />
        </label>
      )}

      <label className={formStyles.form_label}>
        <span>Password</span>
        <span className={formStyles.form_inputWrapIcon}>
          <input
            className={`${formStyles.form_input} ${
              formStyles.form_inputForIcon
            } ${invalidInput.includes("password") && formStyles.invalid}`}
            required={true}
            type={isShowPass ? "text" : "password"}
            placeholder={"Enter your password"}
            value={password}
            name={"password"}
            pattern={"(?=.*\\d)(?=.*[A-Z])[A-Za-z\\d]{8,30}"}
            onChange={(e) => setPassword(e.currentTarget.value.trim())}
            onInvalid={(e) => setInvalid(e.currentTarget.name)}
          />
          <button
            type={"button"}
            className={formStyles.form_inputIcon}
            onClick={() => setIsShowPass((prevState) => !prevState)}
          >
            {isShowPass ? <IconShowPass /> : <IconHidePass />}
          </button>
        </span>
      </label>
      {isRegister && (
        <label className={formStyles.form_label}>
          <input
            className={`${formStyles.form_input} ${
              formStyles.form_inputForIcon
            } ${invalidInput.includes("repeat-pass") && formStyles.invalid}`}
            required={true}
            type={isShowPass ? "text" : "password"}
            placeholder={"Reenter your password"}
            value={rePassword}
            name={"repeat-pass"}
            onChange={(e) => setRePassword(e.currentTarget.value.trim())}
            onInvalid={(e) => setInvalid(e.currentTarget.name)}
          />
        </label>
      )}
      {!isRegister && (
        <Link href={"/auth/forgot"} className={styles.authForm_forgot}>
          Forgot password?
        </Link>
      )}

      <Link
        className={styles.authForm_linkRedirect}
        href={isRegister ? "/auth/login" : "/auth/register"}
      >
        {isRegister
          ? "Do you have an account? Sign in"
          : "You don't have an account? Create one."}
      </Link>
      <button
        className={`${formStyles.form_applyBtn} ${styles.authForm_buttonSign}`}
        type={"submit"}
        disabled={isLoading || !isMatchesPass}
        onClick={() => setInvalidInput([])}
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
