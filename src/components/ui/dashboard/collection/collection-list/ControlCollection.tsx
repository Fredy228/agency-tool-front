"use client";

import { Dispatch, type FC, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "@/components/styles/ctrl-item.module.scss";

import { IconDelete, IconEdit } from "@/components/reused/icons/icons";
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { outputError } from "@/services/output-error";
import { CollectionInterface } from "@/interfaces/collection";
import { actionCollection, deleteCollection } from "@/redux/collection/slice";
import { deleteCollectionAPI } from "@/axios/collection";

type Props = {
  collection: CollectionInterface;
  setIsShowAdd: Dispatch<SetStateAction<boolean>>;
};
const ControlCollection: FC<Props> = ({ collection, setIsShowAdd }) => {
  const [isShowConfirm, setIsShowConfirm] = useState<number | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("");

  const dispacth: Dispatch<any> = useDispatch();

  const handleDelete = () => {
    setCurrentModal("delete");
    setQuestion("Are you sure you want to delete?");
    setIsShowConfirm(collection.id);
  };

  const handleEdit = () => {
    dispacth(actionCollection(collection));
    setIsShowAdd(true);
  };

  const actionDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCollectionAPI(collection.id);
      dispacth(deleteCollection(collection.id));
      getToastify("Deleted successful", ToastifyEnum.SUCCESS, 3000);
    } catch (e) {
      outputError(e);
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
      {isShowConfirm === collection.id && currentModal === "delete" && (
        <ModalWindow scrollPage={true} setShowIdx={setIsShowConfirm}>
          <WindowConfirm
            key={collection.id}
            setShow={setIsShowConfirm}
            question={question}
            isLoading={isLoading}
            action={actionDelete}
          />
        </ModalWindow>
      )}
    </>
  );
};

export default ControlCollection;
