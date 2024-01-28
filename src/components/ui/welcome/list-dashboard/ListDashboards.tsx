"use client";

import { type FC, useState } from "react";

import styles from "./list-dashboard.module.scss";

import { DashboardInterface } from "@/interfaces/dashboard";
import ItemDashboard from "@/components/ui/welcome/list-dashboard/item-dashboard/ItemDashboard";

type Props = {
  dashboards: Array<Pick<DashboardInterface, "id" | "name" | "screenUrl">>;
};
const ListDashboards: FC<Props> = ({ dashboards }) => {
  const [isShowCtrl, setIsShowCtrl] = useState<number | null>(null);

  return (
    <section className={styles.listDashb}>
      <h2 className={styles.listDashb_title}>Dashboards</h2>
      <ul className={styles.listDashb_list}>
        {dashboards.map((item) => (
          <ItemDashboard
            key={item.id}
            item={item}
            isShowCtrl={isShowCtrl}
            setIsShowCtrl={setIsShowCtrl}
          />
        ))}
      </ul>
    </section>
  );
};

export default ListDashboards;
