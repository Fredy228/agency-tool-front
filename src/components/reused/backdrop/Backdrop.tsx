import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

import styles from "./backdrop.module.scss";
import noScroll from "@/services/no-scroll";

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
  backgroundColor?: string;
  backdropFilter?: string;
  zIndex?: string;
  scrollPage?: boolean;
} & PropsWithChildren;
const Backdrop: FC<Props> = ({
  children,
  setShow,
  backgroundColor = "rgba(25, 25, 25, 0.30)",
  backdropFilter = "none",
  zIndex = "100",
  scrollPage = false,
}) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setShow(false);
    }
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Escape") {
        setShow(false);
      }
    }
    if (scrollPage) noScroll(true);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (scrollPage) noScroll(false);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShow, scrollPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor, backdropFilter, zIndex }}
      className={styles.backdrop}
      onClick={handleBackdropClick}
    >
      {children}
    </motion.div>
  );
};
export default Backdrop;
