import { Dispatch, FC, SetStateAction } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import styles from "./collection-list.module.scss";

import { listCollections } from "@/components/ui/dashboard/collection/collection-list/list-collections";
import CollectionLinkList from "@/components/ui/dashboard/collection/collection-list/link-list/CollectionLinkList";

import { selectListCollection } from "@/redux/collection/selectors";
import { setImagePath } from "@/services/setImagePath";
import BufferImg from "@/components/reused/buffer-img/BufferImg";
import { IconCross } from "@/components/reused/icons/icons";
import { AnimatePresence } from "framer-motion";
import PopapMenuWrap from "@/components/reused/popap-menu-wrap/PopapMenuWrap";
import ControlCollection from "@/components/ui/dashboard/collection/collection-list/ControlCollection";

type Props = {
  setIsShowIdx: Dispatch<SetStateAction<number | null>>;
  setIsShowAdd: Dispatch<SetStateAction<boolean>>;
  isShowIdx: number | null;
};
const CollectionList: FC<Props> = ({
  setIsShowIdx,
  isShowIdx,
  setIsShowAdd,
}) => {
  const collections = useSelector(selectListCollection);

  return (
    <ul className={styles.collectionList}>
      {collections.map((item, index) => (
        <li className={styles.collectionList_item} key={index}>
          <h3 className={styles.collectionList_name}>{item.name}</h3>
          {/*<CollectionLinkList links={item.links} />*/}
          <div className={styles.collectionList_wrapperImg}>
            {item?.imageBuffer?.screen && Number(item.image) ? (
              <BufferImg
                customClass={styles.collectionList_img}
                buffer={item.imageBuffer.screen.buffer}
              />
            ) : (
              <Image
                className={styles.collectionList_img}
                src={setImagePath(item.image)}
                alt={"Collection image"}
                width={"427"}
                height={"244"}
              />
            )}
          </div>

          <button
            type={"button"}
            className={styles.collectionList_button}
            onClick={() => setIsShowIdx(isShowIdx === item.id ? null : item.id)}
          >
            {isShowIdx === item.id ? (
              <IconCross />
            ) : (
              <span className={styles.collectionList_buttonIco}></span>
            )}
          </button>

          <AnimatePresence>
            {isShowIdx === item.id && (
              <PopapMenuWrap
                stylePop={{
                  top: "50px",
                  right: "15px",
                }}
                keyItem={item.id}
                setShowIdx={setIsShowIdx}
                isContains={false}
              >
                <ControlCollection
                  collection={item}
                  setIsShowAdd={setIsShowAdd}
                />
              </PopapMenuWrap>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default CollectionList;
