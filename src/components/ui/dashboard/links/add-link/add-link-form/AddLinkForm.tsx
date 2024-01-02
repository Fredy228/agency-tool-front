"use client";

import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import formStyles from "@/components/styles/form-common.module.scss";
import styles from "./add-link-form.module.scss";

import { getToastify, ToastifyEnum } from "@/services/toastify";
import CustomSelect from "@/components/reused/custom-select/CustomSelect";

import { listOptionsImg } from "@/components/ui/dashboard/links/add-link/add-link-form/listOptionsImg";
import { TypeOptionSelectImg } from "@/types/custom-select-types";

type Props = {
  setIsShowAddLink: Dispatch<SetStateAction<boolean>>;
};
const AddLinkForm: FC<Props> = ({ setIsShowAddLink }) => {
  const [image, setImage] = useState<TypeOptionSelectImg | null>(null);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [invalidInput, setInvalidInput] = useState<Array<string>>([]);

  const setInvalid = (name: string) => {
    setInvalidInput((prevState) => [...prevState, name]);

    let message = "";

    switch (name) {
      case "url":
        message = "The url is incorrect or empty.";
        break;
      case "name":
        message = "The name is incorrect or empty.";
        break;
      case "description":
        message = "The description is incorrect or empty.";
        break;
      default:
        return;
    }

    getToastify(message, ToastifyEnum.ERROR, 5000);
  };

  return (
    <form className={`${formStyles.form} ${styles.linkForm}`}>
      <label className={formStyles.form_label}>
        <span>Image</span>
      </label>
      <CustomSelect
        currentValue={image}
        setCurrentValue={setImage}
        options={listOptionsImg}
      />
      <label className={formStyles.form_label}>
        <span>Name</span>

        <input
          className={`${formStyles.form_input} ${
            invalidInput.includes("name") && formStyles.invalid
          }`}
          type="text"
          placeholder={"Enter your text"}
          value={name}
          name={"name"}
          required={true}
          onChange={(e) => setName(e.currentTarget.value)}
          onInvalid={(e) => setInvalid(e.currentTarget.name)}
        />
      </label>
      <label className={formStyles.form_label}>
        <span>URL</span>

        <input
          className={`${formStyles.form_input} ${
            invalidInput.includes("url") && formStyles.invalid
          }`}
          type="text"
          placeholder={"Enter your URL address"}
          value={url}
          name={"url"}
          required={true}
          onChange={(e) => setUrl(e.currentTarget.value)}
          onInvalid={(e) => setInvalid(e.currentTarget.name)}
        />
      </label>
      <label className={formStyles.form_label}>
        <span>Description</span>

        <textarea
          className={`${formStyles.form_input} ${formStyles.textarea} ${
            invalidInput.includes("description") && formStyles.invalid
          }`}
          placeholder={"Enter your description"}
          value={description}
          name={"description"}
          required={true}
          cols={2}
          onChange={(e) => setDescription(e.currentTarget.value)}
          onInvalid={(e) => setInvalid(e.currentTarget.name)}
        />
      </label>
      <div className={styles.linkForm_wrapperBtn}>
        <button
          className={`${formStyles.form_cancelBtn} ${styles.linkForm_buttonSign}`}
          type={"button"}
          onClick={() => setIsShowAddLink(false)}
        >
          Cancel
        </button>

        <button
          className={`${formStyles.form_applyBtn} ${styles.linkForm_buttonSign}`}
          type={"submit"}
          disabled={!image}
        >
          Save Link
        </button>
      </div>
    </form>
  );
};

export default AddLinkForm;
