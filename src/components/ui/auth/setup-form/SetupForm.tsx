"use client";

import type { FC } from "react";
import { useState } from "react";

import formStyles from "@/components/styles/form-common.module.scss";
import styles from "./setup-form.module.scss";
import { IconDelete, IconUpload } from "@/components/reused/icons/icons";
import Image from "next/image";
import UploadImage from "@/components/reused/upload-image/UploadImage";

type Props = {};
const SetupForm: FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<Array<string>>([]);
  const [logo, setLogo] = useState<File | undefined>(undefined);

  console.log("logo", logo);

  return (
    <form className={`${formStyles.form} ${styles.setupForm}`}>
      <label className={formStyles.form_label}>
        <span>Name of Organization</span>

        <input
          className={`${formStyles.form_input} ${
            invalidInput.includes("name") && formStyles.invalid
          }`}
          type="text"
          placeholder={"Enter your organization's name"}
          value={name}
          name={"name"}
          required={true}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <UploadImage logo={logo} setLogo={setLogo} name={"Logo"} />
      <div className={styles.setupForm_wrapperBtn}>
        <button
          className={`${formStyles.form_applyBtn} ${styles.setupForm_buttonSign}`}
          type={"submit"}
        >
          Confirm
        </button>

        <button
          className={`${formStyles.form_cancelBtn} ${styles.setupForm_buttonSign}`}
          type={"button"}
        >
          Skip
        </button>
      </div>
    </form>
  );
};

export default SetupForm;
