import { FC } from "react";

import styles from "./loader-text.module.scss";

type Props = {};
const LoaderText: FC<Props> = () => {
  return (
    <span className={styles.loader}>
      <span className={styles.loader_inner}></span>
    </span>
  );
};
export default LoaderText;
