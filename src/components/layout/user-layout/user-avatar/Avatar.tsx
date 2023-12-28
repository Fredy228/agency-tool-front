import type { FC } from "react";

import styles from "./avatar.module.scss";

type Props = {};
const Avatar: FC<Props> = ({}) => {
  return (
    <div className={styles.avatar}>
      <span className={styles.avatar_default}>A</span>
    </div>
  );
};

export default Avatar;
