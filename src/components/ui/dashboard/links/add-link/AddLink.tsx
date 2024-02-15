import type { Dispatch, FC, SetStateAction } from "react";

import styles from "./add-link.module.scss";

import AddLinkForm from "@/components/ui/dashboard/links/add-link/add-link-form/AddLinkForm";

type Props = {
  setIsShowAddLink: Dispatch<SetStateAction<boolean>>;
  setIsShowIdx: Dispatch<SetStateAction<number | null>>;
};
const AddLink: FC<Props> = ({ setIsShowAddLink, setIsShowIdx }) => {
  return (
    <div className={styles.addLink}>
      <h5 className={styles.addLink_tite}>Add a link</h5>
      <p className={styles.addLink_text}>
        Link to external component documentation
      </p>
      <AddLinkForm
        setIsShowIdx={setIsShowIdx}
        setIsShowAddLink={setIsShowAddLink}
      />
    </div>
  );
};

export default AddLink;
