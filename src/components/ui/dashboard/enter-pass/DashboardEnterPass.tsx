"use client";

import {
  Dispatch,
  type FC,
  type FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import Link from "next/link";

import styles from "./dashboard-enter-pass.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

type Props = {
  setPassword: Dispatch<SetStateAction<string>>;
  setIsEnterPass: Dispatch<SetStateAction<boolean>>;
};
const DashboardEnterPass: FC<Props> = ({ setPassword, setIsEnterPass }) => {
  const [pass, setPass] = useState<string>("");

  const sendPassword: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setPassword(pass);
    setIsEnterPass(false);
  };

  return (
    <div className={styles.enterPass}>
      <div className={styles.enterPass_inner}>
        <form
          className={`${formStyles.form} ${styles.enterPass_form}`}
          onSubmit={sendPassword}
        >
          <label className={formStyles.form_label}>
            <span>Password of Dashboard</span>
            <input
              className={formStyles.form_input}
              type="text"
              value={pass}
              placeholder={"Enter password"}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
          <div className={styles.enterPass_wrapBtn}>
            <Link className={formStyles.form_cancelBtn} href={"/welcome"}>
              Cancel
            </Link>
            <button className={formStyles.form_applyBtn} type={"submit"}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardEnterPass;
