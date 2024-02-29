import { createPortal } from "react-dom";
import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
} from "react";
import { motion } from "framer-motion";

import styles from "./modal-window.module.scss";

import noScroll from "@/services/no-scroll";
import { IconCross } from "@/components/reused/icons/icons";

const modalRoot = document.querySelector("#modal-root");

type Props = {
  setShow?: Dispatch<SetStateAction<boolean>>;
  setShowIdx?: Dispatch<SetStateAction<number | null>>;
  backgroundColor?: string;
  backdropFilter?: string;
  zIndex?: string;
  scrollPage?: boolean;
} & PropsWithChildren;

const ModalWindow: FC<Props> = ({
  children,
  setShow,
  setShowIdx,
  backgroundColor = "rgba(25, 25, 25, 0.30)",
  backdropFilter = "none",
  zIndex = "100",
  scrollPage = false,
}) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      if (setShowIdx) setShowIdx(null);
      if (setShow) setShow(false);
    }
  };

  const handleCloseBtn = () => {
    if (setShowIdx) setShowIdx(null);
    if (setShow) setShow(false);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Escape") {
        if (setShowIdx) setShowIdx(null);
        if (setShow) setShow(false);
      }
    }
    if (scrollPage) noScroll(true);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (scrollPage) noScroll(false);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShow, scrollPage, setShowIdx]);

  console.log("modalRoot", modalRoot);
  if (!modalRoot) return;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor, backdropFilter, zIndex }}
      className={styles.modal_backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal_modal}>
        <button
          className={styles.modal_btn}
          type={"button"}
          onClick={handleCloseBtn}
        >
          <IconCross />
        </button>
        {children}
      </div>
    </motion.div>,
    modalRoot,
  );
};

export default ModalWindow;
