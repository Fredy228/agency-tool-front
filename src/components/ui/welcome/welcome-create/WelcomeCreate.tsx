import { type FC } from "react";
import Link from "next/link";

import styles from "./welcome-create.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

type Props = {
  isOrg: boolean;
  isVerify: boolean;
};
const WelcomeCreate: FC<Props> = ({ isOrg, isVerify }) => {
  return (
    <ul className={styles.welcomeCreate_list}>
      <li className={styles.welcomeCreate_item}>
        <h3 className={styles.welcomeCreate_title}>Your Dashboards</h3>
        <p className={styles.welcomeCreate_text}>
          You haven&apos;t created any dashboards yet, you need to do this
        </p>
        <Link
          href={isOrg ? "/welcome/new-dashboard" : ""}
          className={`${styles.welcomeCreate_btn} ${formStyles.form_applyBtn}`}
          style={
            isOrg
              ? {}
              : {
                  backgroundColor: "rgba(25, 25, 25, 0.2)",
                  borderColor: "rgba(25, 25, 25, 0.2)",
                }
          }
        >
          Create new dashboards
        </Link>
      </li>
      <li className={styles.welcomeCreate_item}>
        <h3 className={styles.welcomeCreate_title}>Your Company</h3>
        <p className={styles.welcomeCreate_text}>
          Visualize your company&apos;s data conveniently and effortlessly
        </p>
        <Link
          href={isOrg ? "/auth/first-setup?option=edit" : "/auth/first-setup"}
          className={`${styles.welcomeCreate_btn} ${
            isOrg ? formStyles.form_cancelBtn : formStyles.form_applyBtn
          }`}
        >
          {isOrg ? "Edit your company" : "Create your company"}
        </Link>
      </li>
    </ul>
  );
};

export default WelcomeCreate;
