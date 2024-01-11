import { type FC } from "react";

import styles from "./welcome-edit.module.scss";

const WelcomeEdit: FC = () => {
  return (
    <ul className={styles.welcomeEdit_list}>
      <li className={styles.welcomeEdit_item}>
        <button className={`${styles.welcomeEdit_btn}`} type={"button"}>
          <span className={styles.welcomeEdit_text}>Create new dashboards</span>
        </button>
      </li>
      <li className={styles.welcomeEdit_item}>
        <button className={`${styles.welcomeEdit_btn}`} type={"button"}>
          <span className={styles.welcomeEdit_text}>Edit your company</span>
        </button>
      </li>
    </ul>
  );
};

export default WelcomeEdit;
