import { type FC } from "react";
import Image from "next/image";

import styles from "./item-dashboard.module.scss";

import { DashboardInterface } from "@/interfaces/dashboard";
import { setImagePath } from "@/services/setImagePath";

type Props = {
  item: Pick<DashboardInterface, "id" | "name" | "screenUrl">;
};
const ItemDashboard: FC<Props> = ({ item }) => {
  return (
    <li className={styles.itemDashb}>
      <button className={styles.itemDashb_btnOption} type={"button"}>
        <span className={styles.itemDashb_buttonIco}></span>
      </button>
      <div style={{ padding: "16px 16px 0 16px" }}>
        <h4 className={styles.itemDashb_title}>{item.name}</h4>
        <div className={styles.itemDashb_wrapCount}>
          <p className={styles.itemDashb_count}>Collections</p>
          <p className={styles.itemDashb_count}>Links</p>
        </div>
      </div>
      <div className={styles.itemDashb_wrapImage}>
        <Image
          className={styles.itemDashb_image}
          src={setImagePath(item.screenUrl)}
          alt={"Welcome Screen"}
          width={"427"}
          height={"244"}
          priority={true}
        />
      </div>
    </li>
  );
};

export default ItemDashboard;
