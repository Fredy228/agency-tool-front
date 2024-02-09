import { Dispatch, type FC, SetStateAction } from "react";

import styles from "./edit-text-btns.module.scss";
import { IconCross, IconSave } from "@/components/reused/icons/icons";

type Props = {
  isEdit: boolean;
  setEdit: Dispatch<SetStateAction<string | null>>;
  name: string;
  setValue: Dispatch<SetStateAction<string>>;
  fnFocus: Function;
  isUpdate?: boolean;
  initialName?: string;
};
const EditTextBtns: FC<Props> = ({
  isEdit,
  name,
  setEdit,
  setValue,
  fnFocus,
  isUpdate = false,
  initialName,
}) => {
  const handleCancel = () => {
    setEdit(null);
    setValue(initialName ? initialName : "");
  };

  const handleEdit = async () => {
    await setEdit(name);
    fnFocus(name);
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
          onClick={handleEdit}
        >
          {isUpdate ? "Edit" : "Add"}
        </button>
      )}
    </div>
  );
};

export default EditTextBtns;
