import type { Dispatch, FC, SetStateAction } from "react";
import { motion } from "framer-motion";

import styles from "./add-link.module.scss";

import AddLinkForm from "@/components/ui/dashboard/links/add-link/add-link-form/AddLinkForm";

type Props = {
  setIsShowAddLink: Dispatch<SetStateAction<boolean>>;
};
const AddLink: FC<Props> = ({ setIsShowAddLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.addLink}
    >
      <h5 className={styles.addLink_tite}>Add a link</h5>
      <p className={styles.addLink_text}>
        Link to external component documentation
      </p>
      <AddLinkForm setIsShowAddLink={setIsShowAddLink} />
    </motion.div>
  );
};

export default AddLink;
