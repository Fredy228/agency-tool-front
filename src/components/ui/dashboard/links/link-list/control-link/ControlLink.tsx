"use client";

import { Dispatch, type FC, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { isAxiosError } from "axios";

import styles from "@/components/styles/ctrl-item.module.scss";

import {
  IconDelete,
  IconEdit,
  IconShare,
} from "@/components/reused/icons/icons";
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import CopyToClipboard from "@/components/reused/copy-to-clipboard/CopyToClipboard";
import { LinkInterface } from "@/interfaces/link";
import { deleteLinkAPI } from "@/axios/link";
import { actionLink, deleteLink } from "@/redux/link/slice";

type Props = {
  link: LinkInterface;
  setIsShowAddLink: Dispatch<SetStateAction<boolean>>;
};
const ControlLink: FC<Props> = ({ link, setIsShowAddLink }) => {
  const [isShowConfirm, setIsShowConfirm] = useState<number | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("");

  const dispacth: Dispatch<any> = useDispatch();

  const handleDelete = () => {
    setCurrentModal("delete");
    setQuestion("Are you sure you want to delete?");
    setIsShowConfirm(link.id);
  };

  const handleShare = () => {
    setCurrentModal("share");
    setIsShowConfirm(link.id);
  };

  const handleEdit = () => {
    dispacth(actionLink(link));
    setIsShowAddLink(true);
  };

  const actionDelete = async () => {
    try {
      setIsLoading(true);
      await deleteLinkAPI(link.id);
      dispacth(deleteLink(link.id));
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
            <button
              className={styles.ctrlItem_btn}
              type={"button"}
              onClick={handleEdit}
            >
              <IconEdit /> Edit
            </button>
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
      {isShowConfirm === link.id && currentModal === "delete" && (
        <ModalWindow scrollPage={true} setShowIdx={setIsShowConfirm}>
          <WindowConfirm
            key={link.id}
            setShow={setIsShowConfirm}
            question={question}
            isLoading={isLoading}
            action={actionDelete}
          />
        </ModalWindow>
      )}

      {isShowConfirm === link.id && currentModal === "share" && (
        <ModalWindow scrollPage={true} setShowIdx={setIsShowConfirm}>
          <CopyToClipboard link={link.url} />
        </ModalWindow>
      )}
    </>
  );
};

export default ControlLink;
