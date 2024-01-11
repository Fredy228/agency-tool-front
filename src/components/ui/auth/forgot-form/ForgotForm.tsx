"use client";

import { FC, useState } from "react";

import styles from "./forgot-form.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

type Props = {};
const ForgotForm: FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <form className={`${formStyles.form} ${styles.forgotForm}`}>
      <label className={formStyles.form_label}>
        <span>Email</span>
        <input
          className={`${formStyles.form_input} ${
            !isValidEmail && formStyles.invalid
          }`}
          type="email"
          required={true}
          placeholder={"Enter your email"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value.trim())}
          onInvalid={() => setIsValidEmail(false)}
        />
      </label>
      <button
        className={`${formStyles.form_applyBtn} ${styles.forgotForm_button}`}
        type={"submit"}
        disabled={true}
        onClick={() => setIsValidEmail(true)}
      >
        Confirm
      </button>
    </form>
  );
};

export default ForgotForm;
