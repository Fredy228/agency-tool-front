import type { FC } from "react";

import styles from "./link-list.module.scss";

import { listLink } from "@/components/ui/dashboard/links/link-list/list-link";
import { IconOpenLink } from "@/components/reused/icons/icons";
import socialIcon from "@/components/reused/icons/social-icon";

const LinkList: FC = () => {
  return (
    <ul className={styles.link_list}>
      {listLink.map((item, index) => (
        <li key={index} className={styles.link_item}>
          <a
            href="https://www.google.com/?authuser=0"
            className={styles.link_link}
            target={"_blank"}
          >
            <div className={styles.link_icon}>{socialIcon[item.icon]}</div>
            <div className={styles.link_info}>
              <div className={styles.link_wrapperName}>
                <h4 className={styles.link_name}>{item.name}</h4>
                <div className={styles.link_iconLink}>
                  <IconOpenLink />
                </div>
              </div>
              <p className={styles.link_descrip}>{item.description}</p>
            </div>
          </a>
          <button type={"button"} className={styles.link_button}>
            <span className={styles.link_buttonIco}></span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
