import { Dispatch, type FC, SetStateAction } from "react";
import Link from "next/link";

import styles from "@/screens/forgot-pass/auth-forgot.module.scss";

import ForgotForm from "@/components/ui/auth/forgot-form/ForgotForm";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
};
const ForgotPassStepOne: FC<Props> = ({ setStep, setEmail }) => {
  return (
    <>
      <p className={styles.authForgot_description}>
        Enter the email address you used to sign in. We will email you a
        password reset code.
      </p>
      <ForgotForm setStep={setStep} setEmailCode={setEmail} />
      <div className={styles.authForgot_wrapperLink}>
        <Link className={styles.authForgot_goBack} href={"/auth/login"}>
          Go back to <span>Sign in</span>
        </Link>
      </div>
    </>
  );
};

export default ForgotPassStepOne;
