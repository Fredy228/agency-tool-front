import { type FC } from "react";
import { CopyToClipboard as ReactCopyToClipboard } from "react-copy-to-clipboard";

import styles from "./copy-to-clipboard.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";
import { getToastify, ToastifyEnum } from "@/services/toastify";

type Props = {
  link: string;
};
const CopyToClipboard: FC<Props> = ({ link }) => {
  const handleCopyToClipboard = (_text: string, result: boolean) => {
    result
      ? getToastify("The link copied", ToastifyEnum.SUCCESS)
      : getToastify("Copy error", ToastifyEnum.ERROR);
  };

  return (
    <div className={styles.clipboard}>
      <p className={styles.clipboard_title}>Share link</p>
      <input
        id={"input-clip"}
        className={formStyles.form_input}
        style={{ textAlign: "center" }}
        type={"text"}
        value={`${process.env.NEXTAUTH_URL}/${link}`}
        readOnly={true}
      />
      <ReactCopyToClipboard
        text={`${process.env.NEXTAUTH_URL}/${link}`}
        onCopy={handleCopyToClipboard}
      >
        <button
          className={`${formStyles.form_applyBtn} ${styles.clipboard_copy}`}
          type={"button"}
        >
          Copy to clipboard
        </button>
      </ReactCopyToClipboard>
    </div>
  );
};

export default CopyToClipboard;
