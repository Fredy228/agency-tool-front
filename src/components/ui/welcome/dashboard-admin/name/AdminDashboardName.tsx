import { Dispatch, type FC, SetStateAction } from "react";

import styles from "./admin-dashboard-name.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";

import EditTextBtns from "@/components/reused/edit-text-btns/EditTextBtns";

type Props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  editText: string | null;
  setEditText: Dispatch<SetStateAction<string | null>>;
};

const AdminDashboardName: FC<Props> = ({
  name,
  setName,
  editText,
  setEditText,
}) => {
  return (
    <section className={styles.adminName}>
      <h3 className={styleSection.adminSection_title}>Name of Dashboard</h3>
      <div className={styles.adminName_wraperInput}>
        <input
          className={styles.adminName_input}
          type="text"
          placeholder={"Enter name of dashboard"}
          disabled={editText !== "name"}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <EditTextBtns
          isEdit={editText === "name"}
          setEdit={setEditText}
          name={"name"}
          setValue={setName}
        />
      </div>
    </section>
  );
};

export default AdminDashboardName;
