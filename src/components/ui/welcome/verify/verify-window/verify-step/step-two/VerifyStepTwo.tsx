"use client";

import { Dispatch, type FC, FormEvent, SetStateAction, useState } from "react";
import { isAxiosError } from "axios";

import formStyles from "@/components/styles/form-common.module.scss";
import styles from "@/components/ui/welcome/verify/verify-window/verify-step/verify-step.module.scss";

import LoaderOrig from "@/components/reused/loader/loader-button";
import { userCodeSchema } from "@/joi/auth-schema";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { checkVerificationCode } from "@/axios/auth";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/user/slice";

type Props = {
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
};
const VerifyStepTwo: FC<Props> = ({ setIsShowModal }) => {
  const [code, setCode] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispacth: Dispatch<any> = useDispatch();

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInvalidInput("");
    setIsLoading(true);

    const { error } = userCodeSchema.validate({
      code: code.trim(),
    });

    if (error) {
      const nameField = error.message.split("|")[0];
      setInvalidInput(nameField);

      setIsLoading(false);
      return getToastify(error.message.split("|")[1], ToastifyEnum.ERROR, 5000);
    }

    try {
      await checkVerificationCode(code);
      getToastify("Email verified", ToastifyEnum.SUCCESS, 5000);
      dispacth(updateUser({ verified: 1 }));
      setIsShowModal(false);
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
      style={{ width: "100%" }}
      className={`${formStyles.form}`}
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
      <button
        className={styles.verifyStep_applyBtn}
        type={"submit"}
        disabled={isLoading}
      >
        {isLoading ? <LoaderOrig color={"#004853"} /> : "Confirm"}
      </button>
    </form>
  );
};

export default VerifyStepTwo;
