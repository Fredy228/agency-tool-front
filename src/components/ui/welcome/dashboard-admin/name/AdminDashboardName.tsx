"use client";

import { Dispatch, type FC, SetStateAction, useEffect, useRef } from "react";

import styles from "./admin-dashboard-name.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";

import EditTextBtns from "@/components/reused/edit-text-btns/EditTextBtns";
import { scrollIntoView } from "@/services/scrollIntoView";
import { DashboardInterface } from "@/interfaces/dashboard";
import dashboard from "@/screens/dashboard/Dashboard";

type Props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  editText: string | null;
  setEditText: Dispatch<SetStateAction<string | null>>;
  invalidInput: string | null;
  edit?: boolean;
  dashboard?: DashboardInterface;
};

const AdminDashboardName: FC<Props> = ({
  name,
  setName,
  editText,
  setEditText,
  invalidInput,
  edit,
  dashboard,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const fnFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!invalidInput || invalidInput !== "name") return;
    scrollIntoView(sectionRef.current);
  }, [invalidInput]);

  return (
    <section id={"name"} ref={sectionRef} className={styles.adminName}>
      <h3
        className={`${styleSection.adminSection_title} ${
          invalidInput === "name" && styleSection.invalid
        }`}
      >
        Name of Dashboard
      </h3>
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
          isUpdate={edit}
          initialName={dashboard?.name}
        />
      </div>
    </section>
  );
};

export default AdminDashboardName;
