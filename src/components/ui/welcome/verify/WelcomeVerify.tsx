"use client";

import { Dispatch, type FC, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import styles from "./welcome-verify.module.scss";

const ModalWindow = dynamic(
  () => import("@/components/reused/modal-window/ModalWindow"),
  {
    ssr: false,
  },
);
import { IconCross } from "@/components/reused/icons/icons";
import VerifyWindow from "@/components/ui/welcome/verify/verify-window/VerifyWindow";

type Props = {
  setIsShowVerify: Dispatch<SetStateAction<boolean>>;
};
const WelcomeVerify: FC<Props> = ({ setIsShowVerify }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  return (
    <motion.div exit={{ height: 0 }} className={styles.verify}>
      <button
        className={styles.verify_btnApply}
        type={"button"}
        onClick={() => setIsShowModal(true)}
      >
        Verify email
      </button>
      <button
        className={styles.verify_btnClose}
        type={"button"}
        onClick={() => setIsShowVerify(false)}
      >
        <IconCross />
      </button>
      {isShowModal && (
        <AnimatePresence>
          <ModalWindow setShow={setIsShowModal} scrollPage={true}>
            <VerifyWindow setIsShowModal={setIsShowModal} />
          </ModalWindow>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default WelcomeVerify;
