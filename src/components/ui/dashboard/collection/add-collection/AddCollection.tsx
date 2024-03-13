import { Dispatch, type FC, SetStateAction } from "react";

import styles from "./add-collection.module.scss";

import AddCollectionForm from "@/components/ui/dashboard/collection/add-collection/add-collection-form/AddCollectionForm";

type Props = {
  isEdit?: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};
const AddCollection: FC<Props> = ({ isEdit = false, setShow }) => {
  return (
    <div className={styles.addCollection}>
      <h5 className={styles.addCollection_title}>Add collection</h5>
      <p className={styles.addCollection_text}>Creating your collection</p>
      <AddCollectionForm isEdit={isEdit} setShow={setShow} />
    </div>
  );
};

export default AddCollection;
