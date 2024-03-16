"use client";

import { Dispatch, type FC, SetStateAction } from "react";

import styles from "./add-collection.module.scss";

import AddCollectionForm from "@/components/ui/dashboard/collection/add-collection/add-collection-form/AddCollectionForm";
import { useSelector } from "react-redux";
import { selectActionCollection } from "@/redux/collection/selectors";

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
  setIsShowControl: Dispatch<SetStateAction<number | null>>;
};
const AddCollection: FC<Props> = ({ setShow, setIsShowControl }) => {
  const currCollection = useSelector(selectActionCollection);

  return (
    <div className={styles.addCollection}>
      <h5 className={styles.addCollection_title}>
        {currCollection ? "Edit" : "Add"} collection
      </h5>
      <p className={styles.addCollection_text}>Creating your collection</p>
      <AddCollectionForm
        setShow={setShow}
        setIsShowControl={setIsShowControl}
      />
    </div>
  );
};

export default AddCollection;
