"use client";

import { Dispatch, type FC, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./control-dashboard.module.scss";

import { IconDelete, IconEdit } from "@/components/reused/icons/icons";
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";
import { deleteDashboardAPI } from "@/axios/dashboad";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import { deleteDasboards } from "@/redux/dashboard/slice";
import { isAxiosError } from "axios";
import { getToastify, ToastifyEnum } from "@/services/toastify";

type Props = {
  keyItem: number;
};
const ControlDashboard: FC<Props> = ({ keyItem }) => {
  const [isShowConfirm, setIsShowConfirm] = useState<number | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispacth: Dispatch<any> = useDispatch();

  const handleDelete = () => {
    setQuestion("Are you sure you want to delete?");
    setIsShowConfirm(keyItem);
  };

  const actionDelete = async () => {
    try {
      setIsLoading(true);
      await deleteDashboardAPI(keyItem);
      dispacth(deleteDasboards(keyItem));
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
      <div className={styles.ctrlDashb}>
        <ul className={styles.ctrlDashb_list}>
          <li className={styles.ctrlDashb_item}>
            <button className={styles.ctrlDashb_btn} type={"button"}>
              <IconEdit /> Edit
            </button>
          </li>
          <li className={styles.ctrlDashb_item}>
            <button
              className={styles.ctrlDashb_btn}
              type={"button"}
              onClick={handleDelete}
            >
              <IconDelete /> Delete
            </button>
          </li>
        </ul>
      </div>
      {isShowConfirm === keyItem && (
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
    </>
  );
};

export default ControlDashboard;
