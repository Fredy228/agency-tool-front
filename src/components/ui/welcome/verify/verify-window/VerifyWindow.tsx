"use client";

import { Dispatch, type FC, SetStateAction, useState } from "react";

import styles from "./verify-window.module.scss";

import VerifyStepOne from "@/components/ui/welcome/verify/verify-window/verify-step/step-one/VerifyStepOne";
import VerifyStepTwo from "@/components/ui/welcome/verify/verify-window/verify-step/step-two/VerifyStepTwo";

type Props = {
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
};
const VerifyWindow: FC<Props> = ({ setIsShowModal }) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className={styles.verifyWindow}>
      <h2 className={styles.verifyWindow_title}>Verify email</h2>
      {step === 1 && (
        <VerifyStepOne setStep={setStep} setIsShowModal={setIsShowModal} />
      )}
      {step === 2 && <VerifyStepTwo setIsShowModal={setIsShowModal} />}
    </div>
  );
};

export default VerifyWindow;
