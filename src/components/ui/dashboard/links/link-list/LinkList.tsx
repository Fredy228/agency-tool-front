import { Dispatch, FC, SetStateAction, useState } from "react";

import styles from "./link-list.module.scss";

import { IconCross, IconOpenLink } from "@/components/reused/icons/icons";
import socialIcon from "@/components/reused/icons/social-icon";
import { LinkInterface } from "@/interfaces/link";
import LoaderPage from "@/components/reused/loader/loader-page";
import PopapMenuWrap from "@/components/reused/popap-menu-wrap/PopapMenuWrap";
import { AnimatePresence } from "framer-motion";
import ControlLink from "@/components/ui/dashboard/links/link-list/control-link/ControlLink";

type Props = {
  links: LinkInterface[];
  setIsShowAddLink: Dispatch<SetStateAction<boolean>>;
  setIsShowIdx: Dispatch<SetStateAction<number | null>>;
  isShowIdx: number | null;
};
const LinkList: FC<Props> = ({
  links,
  setIsShowAddLink,
  setIsShowIdx,
  isShowIdx,
}) => {
  if (!links) return <LoaderPage />;
  return (
    <ul className={styles.link_list}>
      {links.map((item, index) => (
        <li key={index} className={styles.link_item}>
          <a href={item.url} className={styles.link_link} target={"_blank"}>
            <div className={styles.link_icon}>{socialIcon[item.image]}</div>
            <div className={styles.link_info}>
              <div className={styles.link_wrapperName}>
                <h4 className={styles.link_name}>{item.name}</h4>
                <div className={styles.link_iconLink}>
                  <IconOpenLink />
                </div>
              </div>
              <p className={styles.link_descrip}>{item.description}</p>
            </div>
          </a>
          <button
            type={"button"}
            className={styles.link_button}
            onClick={() => setIsShowIdx(isShowIdx === item.id ? null : item.id)}
          >
            {isShowIdx === item.id ? (
              <IconCross />
            ) : (
              <span className={styles.link_buttonIco}></span>
            )}
          </button>

          <AnimatePresence>
            {isShowIdx === item.id && (
              <PopapMenuWrap
                stylePop={{
                  top: "50%",
                  right: "52px",
                  transform: "translateY(-50%)",
                }}
                keyItem={item.id}
                setShowIdx={setIsShowIdx}
                isContains={false}
              >
                <ControlLink link={item} setIsShowAddLink={setIsShowAddLink} />
              </PopapMenuWrap>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
