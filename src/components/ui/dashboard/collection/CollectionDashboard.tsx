import { FC } from "react";

import styles from "./collection-dashboard.module.scss";
import styleContainer from "@/components/styles/container.module.scss";
import styleSection from "@/components/styles/section-header.module.scss";

import CollectionList from "@/components/ui/dashboard/collection/collection-list/CollectionLIst";

type Props = {};
const CollectionDashboard: FC<Props> = ({}) => {
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
            <button className={styleSection.sectionHeader_btn} type={"button"}>
              Add project
            </button>
          </div>
          <CollectionList />
        </div>
      </div>
    </section>
  );
};

export default CollectionDashboard;
