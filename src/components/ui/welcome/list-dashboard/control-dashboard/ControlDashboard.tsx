import { type FC } from "react";
import { motion } from "framer-motion";

import styles from "./control-dashboard.module.scss";

import { IconDelete, IconEdit } from "@/components/reused/icons/icons";

type Props = {
  keyMotion: string | number;
};
const ControlDashboard: FC<Props> = ({ keyMotion }) => {
  return (
    <motion.div
      key={keyMotion}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.ctrlDashb}
    >
      <ul className={styles.ctrlDashb_list}>
        <li className={styles.ctrlDashb_item}>
          <button className={styles.ctrlDashb_btn} type={"button"}>
            <IconEdit /> Edit
          </button>
        </li>
        <li className={styles.ctrlDashb_item}>
          <button className={styles.ctrlDashb_btn} type={"button"}>
            <IconDelete /> Delete
          </button>
        </li>
      </ul>
    </motion.div>
  );
};

export default ControlDashboard;
