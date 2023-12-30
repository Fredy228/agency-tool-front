import type { FC } from "react";

import styleSection from "@/components/styles/section-header.module.scss";
import styleContainer from "@/components/styles/container.module.scss";
import styles from "./link-dashboard.module.scss";
import LinkList from "@/components/ui/dashboard/links/link-list/LinkList";

const LinksDashboard: FC = () => {
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
            <button className={styleSection.sectionHeader_btn} type={"button"}>
              Add Link
            </button>
          </div>
          <LinkList />
        </div>
      </div>
    </section>
  );
};

export default LinksDashboard;
