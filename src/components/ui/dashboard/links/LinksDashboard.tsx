"use client";

import { type FC, useState } from "react";
import { AnimatePresence } from "framer-motion";

import styleSection from "@/components/styles/section-header.module.scss";
import styleContainer from "@/components/styles/container.module.scss";
import styles from "./link-dashboard.module.scss";

import LinkList from "@/components/ui/dashboard/links/link-list/LinkList";
import AddLink from "@/components/ui/dashboard/links/add-link/AddLink";
import Backdrop from "@/components/reused/backdrop/Backdrop";

const LinksDashboard: FC = () => {
  const [isShowAddLink, setIsShowAddLink] = useState<boolean>(false);

  return (
    <section className={styles.links}>
      <div className={styleContainer.container}>
        <div className={styles.links_inner}>
          <div className={styleSection.sectionHeader}>
            <div className={styleSection.sectionHeader_wrapperTitle}>
              <h2 className={styleSection.sectionHeader_title}>Links</h2>
              <p className={styleSection.sectionHeader_text}>
                You have 8 files
              </p>
            </div>
            <button
              className={styleSection.sectionHeader_btn}
              type={"button"}
              onClick={() => setIsShowAddLink(true)}
            >
              Add Link
            </button>
          </div>
          <LinkList />
        </div>
      </div>
      <AnimatePresence>
        {isShowAddLink && (
          <>
            <AddLink setIsShowAddLink={setIsShowAddLink} />{" "}
            <Backdrop
              backdropFilter={"blur(5px)"}
              scrollPage={true}
              setShow={setIsShowAddLink}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LinksDashboard;
