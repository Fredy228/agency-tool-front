"use client";

import { Dispatch, type FC, SetStateAction, useState } from "react";

import styles from "@/components/ui/welcome/verify/verify-window/verify-step/verify-step.module.scss";
import { sendVerificationCodeAPI } from "@/axios/auth";
import LoaderOrig from "@/components/reused/loader/loader-button";
import { isAxiosError } from "axios";
import { getToastify, ToastifyEnum } from "@/services/toastify";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
};
const VerifyStepOne: FC<Props> = ({ setStep, setIsShowModal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async () => {
    try {
      setIsLoading(true);
      await sendVerificationCodeAPI();
      setStep(2);
    } catch (e) {
      if (isAxiosError(e) && e.response?.data?.message) {
        getToastify(e.response?.data?.message, ToastifyEnum.ERROR);
      } else {
        getToastify("Unknown error", ToastifyEnum.ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.verifyStep}>
      <p className={styles.verifyStep_text}>
        We will send a code to confirm your email
      </p>
      <div className={styles.verifyStep_wrapBtn}>
        <button
          className={styles.verifyStep_cancelBtn}
          type={"button"}
          disabled={isLoading}
          onClick={() => setIsShowModal(false)}
        >
          Cancel
        </button>
        <button
          className={styles.verifyStep_applyBtn}
          type={"button"}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? <LoaderOrig color={"#004853"} /> : "Send code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyStepOne;
