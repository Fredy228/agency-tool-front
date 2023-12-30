import { FC } from "react";

import styles from "./collection-list.module.scss";

import { listCollections } from "@/components/ui/dashboard/collection/collection-list/list-collections";
import Image from "next/image";
import CollectionLinkList from "@/components/ui/dashboard/collection/collection-list/link-list/CollectionLinkList";

type Props = {};
const CollectionList: FC<Props> = ({}) => {
  return (
    <ul className={styles.collectionList}>
      {listCollections.map((item, index) => (
        <li className={styles.collectionList_item} key={index}>
          <h3 className={styles.collectionList_name}>{item.name}</h3>
          <CollectionLinkList links={item.links} />
          <div className={styles.collectionList_wrapperImg}>
            <Image
              className={styles.collectionList_img}
              src={`${process.env.NEXTAUTH_URL}/${item.imgUrl}`}
              alt={"Collection image"}
              width={"427"}
              height={"244"}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CollectionList;
