import { Dispatch, type FC, SetStateAction } from "react";

import styles from "./edit-text-btns.module.scss";
import { IconCross, IconSave } from "@/components/reused/icons/icons";

type Props = {
  isEdit: boolean;
  setEdit: Dispatch<SetStateAction<string | null>>;
  name: string;
  setValue: Dispatch<SetStateAction<string>>;
  isUpdate?: boolean;
};
const EditTextBtns: FC<Props> = ({
  isEdit,
  name,
  setEdit,
  setValue,
  isUpdate = false,
}) => {
  const handleCancel = () => {
    setEdit(null);
    setValue("");
  };

  return (
    <div className={styles.editBtns}>
      {isEdit ? (
        <>
          <button
            key={1}
            className={styles.editBtns_cancel}
            type={"button"}
            name={"cancel"}
            onClick={handleCancel}
          >
            <IconCross />
          </button>
          <button
            key={2}
            className={styles.editBtns_save}
            type={"button"}
            name={"save"}
            onClick={() => setEdit(null)}
          >
            <IconSave />
          </button>
        </>
      ) : (
        <button
          key={3}
          className={styles.editBtns_edit}
          type={"button"}
          name={"edit"}
          onClick={() => setEdit(name)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditTextBtns;
