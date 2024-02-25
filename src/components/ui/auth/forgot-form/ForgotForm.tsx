"use client";

import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

import styles from "./forgot-form.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";
import { userEmailSchema } from "@/joi/auth-schema";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { sendForgotCodeAPI } from "@/axios/auth";
import { isAxiosError } from "axios";
import LoaderOrig from "@/components/reused/loader/loader-button";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setEmailCode: Dispatch<SetStateAction<string | null>>;
};
const ForgotForm: FC<Props> = ({ setStep, setEmailCode }) => {
  const [email, setEmail] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInvalidInput("");
    setIsLoading(true);

    const { error } = userEmailSchema.validate({ email: email.trim() });

    if (error) {
      const nameField = error.message.split("|")[0];
      setInvalidInput(nameField);

      setIsLoading(false);
      return getToastify(error.message.split("|")[1], ToastifyEnum.ERROR, 5000);
    }

    try {
      await sendForgotCodeAPI(email.trim());
      setEmailCode(email.trim());
      getToastify("Code sent", ToastifyEnum.SUCCESS, 5000);
      setStep(2);
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
    <form
      className={`${formStyles.form} ${styles.forgotForm}`}
      onSubmit={onFormSubmit}
    >
      <label className={formStyles.form_label}>
        <span>Email</span>
        <input
          className={`${formStyles.form_input} ${
            invalidInput === "email" && formStyles.invalid
          }`}
          type="text"
          placeholder={"Enter your email"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value.trim())}
        />
      </label>
      <button
        className={`${formStyles.form_applyBtn} ${styles.forgotForm_button}`}
        type={"submit"}
        disabled={isLoading}
      >
        {isLoading ? <LoaderOrig color={"#0f5863"} /> : "Confirm"}
      </button>
    </form>
  );
};

export default ForgotForm;
