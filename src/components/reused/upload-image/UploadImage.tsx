import React, { Dispatch, type FC, SetStateAction } from "react";
import Image from "next/image";

import formStyles from "@/components/styles/form-common.module.scss";
import styles from "./upload-image.module.scss";

import { IconDelete, IconUpload } from "@/components/reused/icons/icons";
import { getToastify, ToastifyEnum } from "@/services/toastify";

type Props = {
  logo: File | null;
  setLogo: Dispatch<SetStateAction<File | null>>;
  setBufferImg: Dispatch<SetStateAction<Buffer | null>>;
  bufferImg: Buffer | null;
  name?: string;
  isBig?: boolean;
  isRequired?: boolean;
  handleDeleteLogo: () => void;
};
const UploadImage: FC<Props> = ({
  logo,
  setLogo,
  name,
  bufferImg,
  setBufferImg,
  isBig,
  isRequired = true,
  handleDeleteLogo,
}) => {
  let imageUrl = null;
  if (bufferImg) {
    const base64Image = Buffer.from(bufferImg).toString("base64");
    imageUrl = `data:image/webp;base64,${base64Image}`;
  }

  const handleSetLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileCurr = event.target.files;

    if (!fileCurr || !fileCurr[0]) return;

    const fileSizeInMB = fileCurr[0].size / (1024 * 1024);

    if (fileSizeInMB > 5) {
      getToastify("Maximum file size 5 MB", ToastifyEnum.ERROR, 5000);
      return;
    }
    setLogo(fileCurr[0]);
    setBufferImg(null);
  };

  const handleDelete = () => {
    if (bufferImg) return handleDeleteLogo();

    setLogo(null);
    setBufferImg(null);
  };

  return (
    <>
      <label className={formStyles.form_label}>
        {name && <span>{name}</span>}
        <input
          className={styles.uploadImage_inputFile}
          type={"file"}
          accept="image/jpeg, image/png, image/jpg, image/svg+xml, image/webp, image/svg"
          name={"logo"}
          onChange={handleSetLogo}
        />
        {!logo && !bufferImg && (
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
      {(logo || imageUrl) && (
        <div
          className={styles.uploadImage_wrapperLogo}
          style={{ height: isBig ? "184px" : "106px" }}
        >
          <div className={styles.uploadImage_currentLogo}>
            <Image
              className={styles.uploadImage_imgLogo}
              src={
                (logo && URL.createObjectURL(logo)) ||
                (imageUrl && imageUrl) ||
                ""
              }
              alt={"Current logo"}
              width={"300"}
              height={"100"}
              unoptimized={true}
            />
          </div>
          <button
            type={"button"}
            className={styles.uploadImage_btnDelete}
            onClick={handleDelete}
          >
            <IconDelete />
          </button>
        </div>
      )}
    </>
  );
};

export default UploadImage;
