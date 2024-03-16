"use client";

import { Dispatch, type FC, useEffect, useState } from "react";

import styles from "./collection-dashboard.module.scss";
import styleContainer from "@/components/styles/container.module.scss";
import styleSection from "@/components/styles/section-header.module.scss";

import CollectionList from "@/components/ui/dashboard/collection/collection-list/CollectionLIst";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import AddCollection from "@/components/ui/dashboard/collection/add-collection/AddCollection";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { actionCollection } from "@/redux/collection/slice";

type Props = {
  isOwn: boolean | undefined;
};
const CollectionDashboard: FC<Props> = ({ isOwn }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowControl, setIsShowControl] = useState<number | null>(null);

  const dispacth: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (isShowModal) return;

    dispacth(actionCollection(null));
  }, [dispacth, isShowModal]);

  return (
    <section className={styles.collection}>
      <div className={styleContainer.container}>
        <div className={styles.collection_inner}>
          <div className={styleSection.sectionHeader}>
            <div className={styleSection.sectionHeader_wrapperTitle}>
              <h2 className={styleSection.sectionHeader_title}>Collections</h2>
              <p className={styleSection.sectionHeader_text}>
                Whole information are here
              </p>
            </div>
            {isOwn && (
              <button
                className={styleSection.sectionHeader_btn}
                type={"button"}
                onClick={() => setIsShowModal(true)}
              >
                Add project
              </button>
            )}
          </div>
          <CollectionList
            setIsShowAdd={setIsShowModal}
            setIsShowIdx={setIsShowControl}
            isShowIdx={isShowControl}
          />
        </div>
      </div>

      {isShowModal && (
        <AnimatePresence>
          <ModalWindow
            setShow={setIsShowModal}
            scrollPage={true}
            backdropFilter={"blur(5px)"}
          >
            <AddCollection
              setShow={setIsShowModal}
              setIsShowControl={setIsShowControl}
            />
          </ModalWindow>
        </AnimatePresence>
      )}
    </section>
  );
};

export default CollectionDashboard;
