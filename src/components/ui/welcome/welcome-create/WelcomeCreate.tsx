import { type FC } from "react";

import styles from "./welcome-create.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";
import Link from "next/link";

const WelcomeCreate: FC = () => {
  return (
    <ul className={styles.welcomeCreate_list}>
      <li className={styles.welcomeCreate_item}>
        <h3 className={styles.welcomeCreate_title}>Your Dashboards</h3>
        <p className={styles.welcomeCreate_text}>
          You haven&apos;t created any dashboards yet, you need to do this
        </p>
        <Link
          href={"/welcome/new-dashboard"}
          className={`${styles.welcomeCreate_btn} ${formStyles.form_applyBtn}`}
        >
          Create new dashboards
        </Link>
      </li>
      <li className={styles.welcomeCreate_item}>
        <h3 className={styles.welcomeCreate_title}>Your Company</h3>
        <p className={styles.welcomeCreate_text}>
          Visualize your company&apos;s data conveniently and effortlessly
        </p>
        <button
          className={`${styles.welcomeCreate_btn} ${formStyles.form_cancelBtn}`}
          type={"button"}
        >
          Edit your company
        </button>
      </li>
    </ul>
  );
};

export default WelcomeCreate;
