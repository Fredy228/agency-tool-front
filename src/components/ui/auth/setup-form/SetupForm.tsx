"use client";

import { type FC, type FormEventHandler, useState } from "react";
import Link from "next/link";

import styles from "./setup-form.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

import UploadImage from "@/components/reused/upload-image/UploadImage";
import { orgCreateSchema } from "@/joi/organization-schema";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { createOrganizationAPI } from "@/axios/organization";

const SetupForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<Array<string>>([]);

  console.log("logo", logo);

  const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setInvalidInput([]);

    const { error } = orgCreateSchema.validate({ name });

    console.log("err", error);

    if (error) {
      const nameField = error.message.split("|")[0];
      setInvalidInput((prevState) => [...prevState, nameField]);

      setIsLoading(false);
      return getToastify(error.message.split("|")[1], ToastifyEnum.ERROR, 5000);
    }

    const data = await createOrganizationAPI({ name, logo });

    console.log("data", data);
  };

  return (
    <form
      className={`${formStyles.form} ${styles.setupForm}`}
      onSubmit={submitForm}
    >
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
          // required={true}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <UploadImage
        logo={logo}
        setLogo={setLogo}
        name={"Logo"}
        isRequired={false}
      />
      <div className={styles.setupForm_wrapperBtn}>
        <button
          className={`${formStyles.form_applyBtn} ${styles.setupForm_buttonSign}`}
          type={"submit"}
        >
          Confirm
        </button>

        <Link
          href={isLoading ? "" : "/welcome"}
          className={`${formStyles.form_cancelBtn} ${styles.setupForm_buttonSign}`}
        >
          Skip
        </Link>
      </div>
    </form>
  );
};

export default SetupForm;
