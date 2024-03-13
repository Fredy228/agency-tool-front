import { Dispatch, type FC, SetStateAction, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import styles from "./item-dashboard.module.scss";

import { DashboardInterface } from "@/interfaces/dashboard";
import { setImagePath } from "@/services/setImagePath";
import ControlDashboard from "@/components/ui/welcome/list-dashboard/control-dashboard/ControlDashboard";
import { IconCross } from "@/components/reused/icons/icons";
import PopapMenuWrap from "@/components/reused/popap-menu-wrap/PopapMenuWrap";
import BufferImg from "@/components/reused/buffer-img/BufferImg";

type Props = {
  item: Pick<DashboardInterface, "id" | "name" | "screenUrl" | "screenBuffer">;
  isShowCtrl: number | null;
  setIsShowCtrl: Dispatch<SetStateAction<number | null>>;
  toDashboard: (id: number) => void;
  index: number;
};
const ItemDashboard: FC<Props> = ({
  item,
  isShowCtrl,
  setIsShowCtrl,
  toDashboard,
  index,
}) => {
  const isCurrItem = isShowCtrl === item.id;

  return (
    <li className={styles.itemDashb}>
      <button
        className={styles.itemDashb_btnOption}
        type={"button"}
        onClick={() => setIsShowCtrl(isCurrItem ? null : item.id)}
      >
        {isCurrItem ? (
          <IconCross />
        ) : (
          <span className={styles.itemDashb_buttonIco}></span>
        )}
      </button>
      <div style={{ padding: "16px 16px 0 16px" }}>
        <h4 className={styles.itemDashb_title}>{item.name}</h4>
        <div className={styles.itemDashb_wrapCount}>
          <p className={styles.itemDashb_count}>Collections</p>
          <p className={styles.itemDashb_count}>Links</p>
        </div>
      </div>
      <div
        className={styles.itemDashb_wrapImage}
        onClick={() => toDashboard(item.id)}
      >
        {Number(item.screenUrl) && item.screenBuffer ? (
          <BufferImg
            buffer={item?.screenBuffer?.screen?.buffer}
            customClass={styles.itemDashb_image}
            width={427}
            height={244}
            alt={"Welcome Screen"}
          />
        ) : (
          <Image
            className={styles.itemDashb_image}
            src={setImagePath(item.screenUrl)}
            alt={"Welcome Screen"}
            width={"427"}
            height={"244"}
            priority={index <= 5}
          />
        )}
      </div>
      <AnimatePresence>
        {isCurrItem && (
          <PopapMenuWrap
            stylePop={{ top: "62px", right: "16px" }}
            keyItem={item.id}
            setShowIdx={setIsShowCtrl}
            isContains={false}
          >
            <ControlDashboard keyItem={item.id} />
          </PopapMenuWrap>
        )}
      </AnimatePresence>
    </li>
  );
};

export default ItemDashboard;
