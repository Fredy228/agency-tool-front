import type { Dispatch, FC, SetStateAction } from "react";

import { motion } from "framer-motion";

import styles from "./select-list.module.scss";

import { TypeOptionSelectImg } from "@/types/custom-select-types";
import CurrentItemSelect from "@/components/reused/custom-select/current-item/CurrentItemSelect";

type Props = {
  options: TypeOptionSelectImg[];
  setCurrentValue: Dispatch<SetStateAction<TypeOptionSelectImg | null>>;
  setIsShowList: Dispatch<SetStateAction<boolean>>;
};
const CustomSelectList: FC<Props> = ({
  options,
  setCurrentValue,
  setIsShowList,
}) => {
  const handleChoose = (item: TypeOptionSelectImg) => {
    setCurrentValue(item);
    setIsShowList(false);
  };

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.customSelect_list}
    >
      {options.map((item, index) => (
        <li
          key={index}
          className={styles.customSelect_item}
          onClick={() => handleChoose(item)}
        >
          <CurrentItemSelect option={item} />
        </li>
      ))}
    </motion.ul>
  );
};

export default CustomSelectList;
