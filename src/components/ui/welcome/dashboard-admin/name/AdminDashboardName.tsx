"use client";

import { Dispatch, type FC, SetStateAction, useEffect, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fnFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <section className={styles.adminName}>
      <h3 className={styleSection.adminSection_title}>Name of Dashboard</h3>
      <div className={styles.adminName_wraperInput}>
        <input
          ref={inputRef}
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
          fnFocus={fnFocus}
        />
      </div>
    </section>
  );
};

export default AdminDashboardName;
