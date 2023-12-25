"use client";

import type { FC } from "react";
import { useState } from "react";

import formStyles from "@/components/styles/form-common.module.scss";
import styles from "./setup-form.module.scss";
import { IconDelete, IconUpload } from "@/components/reused/icons/icons";
import Image from "next/image";

type Props = {};
const SetupForm: FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<Array<string>>([]);
  const [logo, setLogo] = useState<File | undefined>(undefined);

  console.log("logo", logo);

  const handleSetLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileCurr = event.target.files;

    if (!fileCurr || !fileCurr[0]) return;

    const fileSizeInMB = fileCurr[0].size / (1024 * 1024);

    if (fileSizeInMB > 10) {
      console.log("Максимальний розмір файла 10 мб");
      return;
    }
    setLogo(fileCurr[0]);
  };

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
      <label className={formStyles.form_label}>
        <span>Logo</span>
        <input
          className={styles.setupForm_inputFile}
          type={"file"}
          accept="image/*"
          required={true}
          name={"logo"}
          onChange={handleSetLogo}
        />
        {!logo && (
          <div className={styles.setupForm_wrapperUpload}>
            <div className={styles.setupForm_customInputFile}>
              <IconUpload />
              <span>Upload logo</span>
            </div>
            <p className={styles.setupForm_inputFormats}>
              svg. &nbsp;png. &nbsp;jpg. &nbsp;webp.
            </p>
          </div>
        )}
      </label>
      {logo && (
        <div className={styles.setupForm_wrapperLogo}>
          <div className={styles.setupForm_currentLogo}>
            <Image
              className={styles.setupForm_imgLogo}
              src={URL.createObjectURL(logo)}
              alt={"Current logo"}
              width={"300"}
              height={"100"}
            />
          </div>
          <button
            type={"button"}
            className={styles.setupForm_btnDelete}
            onClick={() => setLogo(undefined)}
          >
            <IconDelete />
          </button>
        </div>
      )}

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
