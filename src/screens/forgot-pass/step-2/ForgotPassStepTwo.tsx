"use client";

import { type FC, FormEvent, useState } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";

import styles from "@/screens/forgot-pass/auth-forgot.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

import { IconHidePass, IconShowPass } from "@/components/reused/icons/icons";
import { userResetPassSchema } from "@/joi/auth-schema";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { resetPasswordAPI } from "@/axios/auth";
import { useRouter } from "next/navigation";
import LoaderOrig from "@/components/reused/loader/loader-button";

type Props = {
  email: string | null;
};
const ForgotPassStepTwo: FC<Props> = ({ email }) => {
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<string>("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInvalidInput("");
    setIsLoading(true);

    if (!email) return;

    const { error } = userResetPassSchema.validate({
      code: code.trim(),
      password,
    });

    if (error) {
      const nameField = error.message.split("|")[0];
      setInvalidInput(nameField);

      setIsLoading(false);
      return getToastify(error.message.split("|")[1], ToastifyEnum.ERROR, 5000);
    }

    try {
      await resetPasswordAPI({ code: code.trim(), password, email });
      getToastify("Password reset", ToastifyEnum.SUCCESS, 5000);
      return router.push("/auth/login");
    } catch (e) {
      if (isAxiosError(e) && e.response?.data.message) {
        getToastify(e.response.data.message, ToastifyEnum.ERROR, 5000);
      } else {
        getToastify("Unknown error", ToastifyEnum.ERROR, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className={styles.authForgot_description}>
        Enter the reset code and new password
      </p>
      <form
        className={`${formStyles.form} ${styles.forgotForm}`}
        onSubmit={onFormSubmit}
      >
        <label className={formStyles.form_label}>
          <span>Code</span>
          <input
            className={`${formStyles.form_input} ${
              invalidInput === "code" && formStyles.invalid
            }`}
            type="text"
            placeholder={"Enter reset code"}
            name={"code"}
            value={code}
            onChange={(e) => setCode(e.currentTarget.value.trim())}
          />
        </label>
        <label className={formStyles.form_label}>
          <span>New password</span>
          <span className={formStyles.form_inputWrapIcon}>
            <input
              className={`${formStyles.form_input} ${
                formStyles.form_inputForIcon
              } ${invalidInput === "password" && styles.forgotForm}`}
              type={isShowPass ? "text" : "password"}
              placeholder={"Enter your password"}
              value={password}
              name={"password"}
              onChange={(e) => setPassword(e.currentTarget.value.trim())}
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

        <label className={formStyles.form_label}>
          <input
            className={`${formStyles.form_input} ${
              formStyles.form_inputForIcon
            } ${invalidInput === "password" && styles.forgotForm}`}
            type={isShowPass ? "text" : "password"}
            placeholder={"Reenter your password"}
            value={rePassword}
            name={"repeat-pass"}
            onChange={(e) => setRePassword(e.currentTarget.value.trim())}
          />
        </label>

        <button
          className={`${formStyles.form_applyBtn} ${styles.forgotForm_button}`}
          type={"submit"}
          disabled={isLoading || password !== rePassword}
        >
          {isLoading ? <LoaderOrig color={"#0f5863"} /> : "Confirm"}
        </button>
      </form>
      <div className={styles.authForgot_wrapperLink}>
        <Link className={styles.authForgot_goBack} href={"/auth/login"}>
          Go back to <span>Sign in</span>
        </Link>
      </div>
    </>
  );
};

export default ForgotPassStepTwo;
