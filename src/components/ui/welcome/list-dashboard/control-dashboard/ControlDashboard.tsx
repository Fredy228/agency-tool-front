"use client";

import { Dispatch, type FC, useState } from "react";
import { useDispatch } from "react-redux";
import { isAxiosError } from "axios";
import dynamic from "next/dynamic";

import styles from "@/components/styles/ctrl-item.module.scss";

import {
  IconDelete,
  IconEdit,
  IconShare,
} from "@/components/reused/icons/icons";
const ModalWindow = dynamic(
  () => import("@/components/reused/modal-window/ModalWindow"),
  {
    ssr: false,
  },
);
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";
import { deleteDashboardAPI } from "@/axios/dashboad";
import { deleteDasboards } from "@/redux/dashboard/slice";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import CopyToClipboard from "@/components/reused/copy-to-clipboard/CopyToClipboard";
import Link from "next/link";

type Props = {
  keyItem: number;
};
const ControlDashboard: FC<Props> = ({ keyItem }) => {
  const [isShowConfirm, setIsShowConfirm] = useState<number | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("");

  const dispacth: Dispatch<any> = useDispatch();

  const handleDelete = () => {
    setCurrentModal("delete");
    setQuestion("Are you sure you want to delete?");
    setIsShowConfirm(keyItem);
  };

  const handleShare = () => {
    setCurrentModal("share");
    setIsShowConfirm(keyItem);
  };

  const actionDelete = async () => {
    try {
      setIsLoading(true);
      await deleteDashboardAPI(keyItem);
      dispacth(deleteDasboards(keyItem));
      getToastify("Deleted successful", ToastifyEnum.SUCCESS, 3000);
    } catch (e) {
      if (isAxiosError(e) && e.message) {
        console.log("e", e);
        getToastify(e.message, ToastifyEnum.ERROR, 5000);
      } else {
        getToastify("Unknown error", ToastifyEnum.ERROR, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.ctrlItem}>
        <ul className={styles.ctrlItem_list}>
          <li className={styles.ctrlItem_item}>
            <button
              className={styles.ctrlItem_btn}
              type={"button"}
              onClick={handleShare}
            >
              <IconShare /> Share
            </button>
          </li>
          <li className={styles.ctrlItem_item}>
            <Link
              href={`/dashboard/edit/${keyItem}`}
              className={styles.ctrlItem_btn}
              type={"button"}
            >
              <IconEdit /> Edit
            </Link>
          </li>
          <li className={styles.ctrlItem_item}>
            <button
              className={styles.ctrlItem_btn}
              type={"button"}
              onClick={handleDelete}
            >
              <IconDelete /> Delete
            </button>
          </li>
        </ul>
      </div>
      {isShowConfirm === keyItem && currentModal === "delete" && (
        <ModalWindow scrollPage={true} setShowIdx={setIsShowConfirm}>
          <WindowConfirm
            key={keyItem}
            setShow={setIsShowConfirm}
            question={question}
            isLoading={isLoading}
            action={actionDelete}
          />
        </ModalWindow>
      )}

      {isShowConfirm === keyItem && currentModal === "share" && (
        <ModalWindow scrollPage={true} setShowIdx={setIsShowConfirm}>
          <CopyToClipboard link={`dashboard/${keyItem}`} />
        </ModalWindow>
      )}
    </>
  );
};

export default ControlDashboard;
