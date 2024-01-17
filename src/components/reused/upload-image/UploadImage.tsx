import React, { Dispatch, type FC, SetStateAction } from "react";
import Image from "next/image";

import formStyles from "@/components/styles/form-common.module.scss";
import styles from "./upload-image.module.scss";

import { IconDelete, IconUpload } from "@/components/reused/icons/icons";
import { getToastify, ToastifyEnum } from "@/services/toastify";

type Props = {
  logo: File | undefined;
  setLogo: Dispatch<SetStateAction<File | undefined>>;
  name?: string;
  isBig?: boolean;
};
const UploadImage: FC<Props> = ({ logo, setLogo, name, isBig }) => {
  const handleSetLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileCurr = event.target.files;

    if (!fileCurr || !fileCurr[0]) return;

    const fileSizeInMB = fileCurr[0].size / (1024 * 1024);

    if (fileSizeInMB > 10) {
      getToastify("Maximum file size 10 MB", ToastifyEnum.ERROR, 5000);
      return;
    }
    setLogo(fileCurr[0]);
  };

  return (
    <>
      <label className={formStyles.form_label}>
        {name && <span>{name}</span>}
        <input
          className={styles.uploadImage_inputFile}
          type={"file"}
          accept="image/*"
          required={true}
          name={"logo"}
          onChange={handleSetLogo}
        />
        {!logo && (
          <div
            className={styles.uploadImage_wrapperUpload}
            style={{ height: isBig ? "184px" : "106px" }}
          >
            <div
              className={styles.uploadImage_customInputFile}
              style={{ height: isBig ? "160px" : "82px" }}
            >
              <IconUpload />
              <span>Upload image</span>
            </div>
            <p className={styles.uploadImage_inputFormats}>
              svg. &nbsp;png. &nbsp;jpg. &nbsp;webp.
            </p>
          </div>
        )}
      </label>
      {logo && (
        <div
          className={styles.uploadImage_wrapperLogo}
          style={{ height: isBig ? "184px" : "106px" }}
        >
          <div className={styles.uploadImage_currentLogo}>
            <Image
              className={styles.uploadImage_imgLogo}
              src={URL.createObjectURL(logo)}
              alt={"Current logo"}
              width={"300"}
              height={"100"}
            />
          </div>
          <button
            type={"button"}
            className={styles.uploadImage_btnDelete}
            onClick={() => setLogo(undefined)}
          >
            <IconDelete />
          </button>
        </div>
      )}
    </>
  );
};

export default UploadImage;
