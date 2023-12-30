import type { FC } from "react";

import styles from "./collection-link-list.module.scss";
import { IconOpenLink } from "@/components/reused/icons/icons";

type Props = {
  links: string[];
};
const CollectionLinkList: FC<Props> = ({ links }) => {
  return (
    <ul className={styles.links_list}>
      {links.map((link, index) => (
        <li key={index} className={styles.links_item}>
          {link} <IconOpenLink />
        </li>
      ))}
    </ul>
  );
};

export default CollectionLinkList;
