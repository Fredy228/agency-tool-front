import type { FC } from "react";

import styles from "./current-item.module.scss";

import { TypeOptionSelectImg } from "@/types/custom-select-types";
import socialIcon from "@/components/reused/icons/social-icon";

type Props = {
  option: TypeOptionSelectImg;
};
const CurrentItemSelect: FC<Props> = ({ option }) => {
  return (
    <div className={styles.currentItem}>
      {socialIcon[option.img]}
      <span className={styles.currentItem_name}>{option.name}</span>
    </div>
  );
};

export default CurrentItemSelect;
