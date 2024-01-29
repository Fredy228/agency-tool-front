"use client";

import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import styles from "./custom-selected.module.scss";

import { TypeOptionSelectImg } from "@/types/custom-select-types";

import CustomSelectList from "@/components/reused/custom-select/select-list/CustomSelectList";
import CurrentItemSelect from "@/components/reused/custom-select/current-item/CurrentItemSelect";
import { IconArrowDown } from "@/components/reused/icons/icons";
import PopapMenuWrap from "@/components/reused/popap-menu-wrap/PopapMenuWrap";

type Props = {
  options: TypeOptionSelectImg[];
  currentValue: TypeOptionSelectImg | null;
  setCurrentValue: Dispatch<SetStateAction<TypeOptionSelectImg | null>>;
};
const CustomSelect: FC<Props> = ({
  options,
  currentValue,
  setCurrentValue,
}) => {
  const [isShowList, setIsShowList] = useState<boolean>(false);

  return (
    <div className={styles.select}>
      <button
        className={`${styles.select_btn} ${isShowList ? styles.active : ""}`}
        type={"button"}
        onClick={() => setIsShowList((prevState) => !prevState)}
      >
        {currentValue ? (
          <CurrentItemSelect option={currentValue} />
        ) : (
          "Select image"
        )}
        <IconArrowDown />
      </button>
      <AnimatePresence>
        {isShowList && (
          <PopapMenuWrap
            stylePop={{ left: "0", width: "100%", top: "calc(100% + 10px)" }}
            keyItem={12324}
          >
            <CustomSelectList
              options={options}
              setCurrentValue={setCurrentValue}
              setIsShowList={setIsShowList}
            />
          </PopapMenuWrap>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
