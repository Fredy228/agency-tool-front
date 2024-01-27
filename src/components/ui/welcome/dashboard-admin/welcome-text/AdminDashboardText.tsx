import { Dispatch, type FC, SetStateAction, useEffect, useRef } from "react";
import Image from "next/image";

import styles from "./admin-dashboard-text.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";

import EditTextBtns from "@/components/reused/edit-text-btns/EditTextBtns";

import examplePhoto from "./welcome-example.png";
import { scrollIntoView } from "@/services/scrollIntoView";

type Props = {
  textOne: string;
  textTwo: string;
  textThree: string;
  setTextOne: Dispatch<SetStateAction<string>>;
  setTextTwo: Dispatch<SetStateAction<string>>;
  setTextThree: Dispatch<SetStateAction<string>>;
  editText: string | null;
  setEditText: Dispatch<SetStateAction<string | null>>;
  invalidInput: string | null;
};
const AdminDashboardText: FC<Props> = (props) => {
  const refOne = useRef<HTMLTextAreaElement | null>(null);
  const refTwo = useRef<HTMLTextAreaElement | null>(null);
  const refThree = useRef<HTMLTextAreaElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { invalidInput } = props;

  const fnFocus = (name: string) => {
    switch (name) {
      case "textOne":
        refOne.current?.focus();
        break;
      case "textTwo":
        refTwo.current?.focus();
        break;
      case "textThree":
        refThree.current?.focus();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (
      !invalidInput ||
      !["textOne", "textTwo", "textThree"].includes(invalidInput)
    )
      return;

    scrollIntoView(sectionRef.current);
  }, [invalidInput]);

  return (
    <section id={"text"} ref={sectionRef} className={styles.adminText}>
      <h3
        className={`${styleSection.adminSection_title} ${
          invalidInput &&
          ["textOne", "textTwo", "textThree"].includes(invalidInput) &&
          styleSection.invalid
        }`}
      >
        Text on Welcome Screen
      </h3>
      <div className={styles.adminText_wrapper}>
        <ul className={styles.adminText_list}>
          <li className={styles.adminText_item}>
            <div className={styles.adminText_wrapNumber}>
              <span className={styles.adminText_number}>01</span>
            </div>
            <textarea
              className={styles.adminText_textarea}
              placeholder={"Enter your text"}
              rows={2}
              disabled={props.editText !== "textOne"}
              value={props.textOne}
              onChange={(e) => props.setTextOne(e.currentTarget.value)}
              ref={refOne}
            />
            <EditTextBtns
              isEdit={props.editText === "textOne"}
              setEdit={props.setEditText}
              name={"textOne"}
              setValue={props.setTextOne}
              fnFocus={fnFocus}
            />
          </li>
          <li className={styles.adminText_item}>
            <div className={styles.adminText_wrapNumber}>
              <span className={styles.adminText_number}>02</span>
            </div>
            <textarea
              className={styles.adminText_textarea}
              placeholder={"Enter your text"}
              rows={2}
              value={props.textTwo}
              disabled={props.editText !== "textTwo"}
              onChange={(e) => props.setTextTwo(e.currentTarget.value)}
              ref={refTwo}
            />
            <EditTextBtns
              isEdit={props.editText === "textTwo"}
              setEdit={props.setEditText}
              name={"textTwo"}
              setValue={props.setTextTwo}
              fnFocus={fnFocus}
            />
          </li>
          <li className={styles.adminText_item}>
            <div className={styles.adminText_wrapNumber}>
              <span className={styles.adminText_number}>03</span>
            </div>
            <textarea
              className={styles.adminText_textarea}
              placeholder={"Enter your text"}
              rows={2}
              value={props.textThree}
              disabled={props.editText !== "textThree"}
              onChange={(e) => props.setTextThree(e.currentTarget.value)}
              ref={refThree}
            />
            <EditTextBtns
              isEdit={props.editText === "textThree"}
              setEdit={props.setEditText}
              name={"textThree"}
              setValue={props.setTextThree}
              fnFocus={fnFocus}
            />
          </li>
        </ul>
        <div className={styles.adminText_wrapImg}>
          <Image
            className={styles.adminText_img}
            src={examplePhoto}
            alt={"Example photo"}
            width={"276"}
            height={"171"}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardText;
