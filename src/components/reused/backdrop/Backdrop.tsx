import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

import styles from "./backdrop.module.scss";

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
  backgroundColor?: string;
  backdropFilter?: string;
  zIndex?: string;
} & PropsWithChildren;
const Backdrop: FC<Props> = ({
  children,
  setShow,
  backgroundColor = "rgba(25, 25, 25, 0.30)",
  backdropFilter = "none",
  zIndex = "100",
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

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShow]);

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
