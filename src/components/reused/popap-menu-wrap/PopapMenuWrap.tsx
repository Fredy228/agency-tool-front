"use client";

import {
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";

import styles from "./popap-menu-wrap.module.scss";

type Props = {
  setShow?: Dispatch<SetStateAction<boolean>>;
  setShowIdx?: Dispatch<SetStateAction<number | null>>;
  stylePop: Record<string, string>;
  keyItem: number | string;
  isContains?: boolean;
} & PropsWithChildren;
const PopapMenuWrap: FC<Props> = ({
  children,
  setShow,
  setShowIdx,
  stylePop,
  keyItem,
  isContains = true,
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isContains) return;
    const listenerFn = (event: MouseEvent) => {
      const target = event.target as Node;

      if (wrapRef.current && !wrapRef.current.contains(target)) {
        if (setShow) setShow(false);
        if (setShowIdx) setShowIdx(null);
      }
    };

    document.addEventListener("click", listenerFn);

    return () => {
      document.removeEventListener("click", listenerFn);
    };
  }, [setShow, setShowIdx]);

  return (
    <motion.div
      key={keyItem}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.wrapMenuPop}
      style={{ ...stylePop }}
      ref={wrapRef}
    >
      {children}
    </motion.div>
  );
};

export default PopapMenuWrap;
