import type { NextPage } from "next";
import ForgotForm from "@/components/ui/auth/forgot-form/ForgotForm";

import styles from "./auth-forgot.module.scss";
import Link from "next/link";

type Props = {};
const AuthForgot: NextPage<Props> = () => {
  return (
    <div className={styles.authForgot}>
      <h1 className={styles.authForgot_title}>Forgot password?</h1>
      <p className={styles.authForgot_description}>
        Enter the email address you used to sign in. We will email you a
        password reset code.
      </p>
      <ForgotForm />
      <div className={styles.authForgot_wrapperLink}>
        <Link className={styles.authForgot_goBack} href={"/auth/login"}>
          Go back to <span>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default AuthForgot;
