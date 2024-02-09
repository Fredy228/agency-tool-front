"use client";

import { type FC, useState } from "react";

import styles from "./list-dashboard.module.scss";

import { DashboardInterface } from "@/interfaces/dashboard";
import ItemDashboard from "@/components/ui/welcome/list-dashboard/item-dashboard/ItemDashboard";
import { useRouter } from "next/navigation";

type Props = {
  dashboards: Array<Pick<DashboardInterface, "id" | "name" | "screenUrl">>;
};
const ListDashboards: FC<Props> = ({ dashboards }) => {
  const [isShowCtrl, setIsShowCtrl] = useState<number | null>(null);
  const router = useRouter();

  const toDashboard = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <section className={styles.listDashb}>
      <h2 className={styles.listDashb_title}>Dashboards</h2>
      <ul className={styles.listDashb_list}>
        {dashboards.map((item, index) => (
          <ItemDashboard
            key={item.id}
            item={item}
            isShowCtrl={isShowCtrl}
            setIsShowCtrl={setIsShowCtrl}
            toDashboard={toDashboard}
            index={index}
          />
        ))}
      </ul>
    </section>
  );
};

export default ListDashboards;
