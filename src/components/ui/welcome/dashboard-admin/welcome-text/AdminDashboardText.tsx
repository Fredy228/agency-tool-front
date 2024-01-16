import { type FC } from "react";
import Image from "next/image";

import styles from "./admin-dashboard-text.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";

import examplePhoto from "./welcome-example.png";

const AdminDashboardText: FC = () => {
  return (
    <section className={styles.adminText}>
      <h3 className={styleSection.adminSection_title}>
        Text on Welcome Screen
      </h3>
      <div className={styles.adminText_wrapper}>
        <ul className={styles.adminText_list}>
          <li className={styles.adminText_item}>
            <span className={styles.adminText_number}>01</span>
            <textarea
              className={styles.adminText_textarea}
              placeholder={"Enter your text"}
              rows={2}
            />
            <button className={styles.adminText_btnEdit} type={"button"}>
              Edit
            </button>
          </li>
          <li className={styles.adminText_item}>
            <span className={styles.adminText_number}>02</span>
            <textarea
              className={styles.adminText_textarea}
              placeholder={"Enter your text"}
            />
            <button className={styles.adminText_btnEdit} type={"button"}>
              Edit
            </button>
          </li>
          <li className={styles.adminText_item}>
            <span className={styles.adminText_number}>03</span>
            <textarea
              className={styles.adminText_textarea}
              placeholder={"Enter your text"}
            />
            <button className={styles.adminText_btnEdit} type={"button"}>
              Edit
            </button>
          </li>
        </ul>
        <div className={styles.adminText_wrapImg}>
          <Image
            className={styles.adminText_img}
            src={examplePhoto}
            alt={"Example photo"}
            width={"276"}
            height={"171"}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardText;
