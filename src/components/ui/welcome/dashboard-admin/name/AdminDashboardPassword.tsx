"use client";

import { Dispatch, type FC, SetStateAction, useEffect, useRef } from "react";

import styles from "./admin-dashboard-name.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";

import EditTextBtns from "@/components/reused/edit-text-btns/EditTextBtns";
import AdminDashboardHint from "@/components/ui/welcome/dashboard-admin/hint/AdminDashboardHint";
import { scrollIntoView } from "@/services/scrollIntoView";
import { DashboardInterface } from "@/interfaces/dashboard";

type Props = {
  pass: string;
  setPass: Dispatch<SetStateAction<string>>;
  editText: string | null;
  setEditText: Dispatch<SetStateAction<string | null>>;
  invalidInput: string | null;
  edit?: boolean;
  dashboard?: DashboardInterface;
};

const AdminDashboardPassword: FC<Props> = ({
  pass,
  setPass,
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
    if (!invalidInput || invalidInput !== "password") return;
    scrollIntoView(sectionRef.current);
  }, [invalidInput]);

  return (
    <section id={"password"} ref={sectionRef} className={styles.adminName}>
      <h3
        className={`${styleSection.adminSection_title} ${
          invalidInput === "password" && styleSection.invalid
        }`}
      >
        Password of Dashboard
      </h3>
      <div className={styles.adminPass}>
        <div className={styles.adminName_wraperInput}>
          <input
            ref={inputRef}
            className={styles.adminName_input}
            type="text"
            placeholder={"Enter name of dashboard"}
            disabled={editText !== "password"}
            value={pass}
            onChange={(e) => setPass(e.currentTarget.value)}
          />

          <EditTextBtns
            isEdit={editText === "password"}
            setEdit={setEditText}
            name={"password"}
            setValue={setPass}
            fnFocus={fnFocus}
            isUpdate={edit}
            initialName={dashboard?.password}
          />
        </div>
        <div className={styles.adminPass_hint}>
          <AdminDashboardHint
            text={
              "Here you need to set a password for clients to access your dashboard"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPassword;
