"use client";

import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import styles from "./window-confirm.module.scss";

import LoaderOrig from "@/components/reused/loader/loader-button";

type Props = {
  question: string;
  setShow: Dispatch<SetStateAction<number | null>>;
  action: Function | null;
  isLoading: boolean;
};
const WindowConfirm: FC<Props> = ({ question, setShow, action, isLoading }) => {
  const handle = () => (action ? action() : null);

  return (
    <div className={styles.windowConfirm}>
      <p className={styles.windowConfirm_text}>{question}</p>
      <div className={styles.windowConfirm_wrapper}>
        <button
          className={styles.windowConfirm_cancelBtn}
          type={"button"}
          disabled={isLoading}
          onClick={() => setShow(null)}
        >
          Cancel
        </button>
        <button
          className={styles.windowConfirm_applyBtn}
          type={"button"}
          disabled={isLoading}
          onClick={handle}
        >
          {isLoading ? <LoaderOrig /> : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default WindowConfirm;
