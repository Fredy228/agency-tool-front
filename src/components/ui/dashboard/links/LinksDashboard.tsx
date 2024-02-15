"use client";

import { Dispatch, type FC, SetStateAction, useState } from "react";
import { AnimatePresence } from "framer-motion";

import styleSection from "@/components/styles/section-header.module.scss";
import styleContainer from "@/components/styles/container.module.scss";
import styles from "./link-dashboard.module.scss";

import LinkList from "@/components/ui/dashboard/links/link-list/LinkList";
import AddLink from "@/components/ui/dashboard/links/add-link/AddLink";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import { useSelector } from "react-redux";
import { selectListLink } from "@/redux/link/selectors";

type Props = {
  isOwn: boolean | undefined;
};
const LinksDashboard: FC<Props> = ({ isOwn }) => {
  const [isShowAddLink, setIsShowAddLink] = useState<boolean>(false);
  const [isShowIdx, setIsShowIdx] = useState<number | null>(null);

  const links = useSelector(selectListLink);

  return (
    <section className={styles.links}>
      <div className={styleContainer.container}>
        <div className={styles.links_inner}>
          <div className={styleSection.sectionHeader}>
            <div className={styleSection.sectionHeader_wrapperTitle}>
              <h2 className={styleSection.sectionHeader_title}>Links</h2>

              <p className={styleSection.sectionHeader_text}>
                You have {links.length} links
              </p>
            </div>
            {isOwn && (
              <button
                className={styleSection.sectionHeader_btn}
                type={"button"}
                onClick={() => setIsShowAddLink(true)}
              >
                Add Link
              </button>
            )}
          </div>
          <LinkList
            isShowIdx={isShowIdx}
            setIsShowIdx={setIsShowIdx}
            links={links}
            setIsShowAddLink={setIsShowAddLink}
          />
        </div>
      </div>
      <AnimatePresence>
        {isShowAddLink && (
          <ModalWindow
            setShow={setIsShowAddLink}
            backdropFilter={"blur(5px)"}
            scrollPage={true}
          >
            <AddLink
              setIsShowIdx={setIsShowIdx}
              setIsShowAddLink={setIsShowAddLink}
            />
          </ModalWindow>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LinksDashboard;
