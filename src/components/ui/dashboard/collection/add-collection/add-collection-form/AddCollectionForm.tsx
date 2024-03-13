"use client";

import React, {
  Dispatch,
  type FC,
  type FormEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperCore from "swiper";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/free-mode";

import styles from "./add-collection-form.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

import LoaderOrig from "@/components/reused/loader/loader-button";
import { listWelcomeScreen } from "@/components/ui/welcome/dashboard-admin/wecome-image/list";
import {
  IconArrowDown,
  IconCross,
  IconPlus,
  IconTick,
} from "@/components/reused/icons/icons";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import {
  collectionCreateSchema,
  collectionUpdateSchema,
} from "@/joi/collection-schema";
import {
  deleteScreenCollectionOrgAPI,
  getScreensCollectionOrgAPI,
  uploadScreenCollectionOrgAPI,
} from "@/axios/organization";
import { CustomScreenInterface } from "@/interfaces/organization";
import { outputError } from "@/services/output-error";
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";

SwiperCore.use([Navigation, FreeMode]);

type Props = {
  isEdit: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};
const AddCollectionForm: FC<Props> = ({ isEdit, setShow }) => {
  const [name, setName] = useState<string>("");
  const [currentScreen, setCurrentScreen] = useState<string>("");
  const [screens, setScreens] = useState<CustomScreenInterface[]>([]);

  const [uploadScreen, setUploadScreen] = useState<File | null>(null);
  const [currDeleteScreen, setCurrDeleteScreen] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<string | null>(null);
  const [isShowConfirm, setIsShowConfirm] = useState<number | null>(null);
  const isFirst = useRef<boolean>(false);

  const handleSetScreen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileCurr = event.target.files;

    if (!fileCurr || !fileCurr[0]) return;

    const fileSizeInMB = fileCurr[0].size / (1024 * 1024);

    if (fileSizeInMB > 5) {
      getToastify("Maximum file size 5 MB", ToastifyEnum.ERROR, 5000);
      return;
    }
    setUploadScreen(fileCurr[0]);
  };

  const handleDeleteScreen = async () => {
    if (!currDeleteScreen) return;
    try {
      setIsLoading(true);
      await deleteScreenCollectionOrgAPI(currDeleteScreen);
      setScreens((prevState) =>
        prevState.filter((i) => i.id !== currDeleteScreen),
      );
    } catch (e) {
      outputError(e);
    } finally {
      setIsLoading(false);
      setIsShowConfirm(null);
    }
  };

  const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setInvalidInput("");

    let joiError;

    if (isEdit) {
      const { error } = collectionUpdateSchema.validate({ name });
      joiError = error;
    } else {
      const { error } = collectionCreateSchema.validate({ name });
      joiError = error;
    }

    if (joiError) {
      const nameField = joiError.message.split("|")[0];
      setInvalidInput(nameField);

      setIsLoading(false);
      return getToastify(
        joiError.message.split("|")[1],
        ToastifyEnum.ERROR,
        5000,
      );
    }
  };

  useEffect(() => {
    if (isFirst.current) return;
    isFirst.current = true;

    setIsLoading(true);
    getScreensCollectionOrgAPI()
      .then((data) => {
        setScreens(data);
      })
      .catch((e) => {
        outputError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!uploadScreen) return;

    setIsLoading(true);
    uploadScreenCollectionOrgAPI(uploadScreen)
      .then((data) => {
        setScreens((prevState) => [data, ...prevState]);
      })
      .catch((e) => {
        outputError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uploadScreen]);

  return (
    <div className={styles.collectionForm}>
      <form
        className={`${formStyles.form} ${styles.collectionForm_form}`}
        onSubmit={submitForm}
      >
        <label className={formStyles.form_label}>
          <span>Name of Collection</span>
          <input
            className={`${formStyles.form_input} ${
              invalidInput === "name" && formStyles.invalid
            }`}
            type="text"
            placeholder={"Enter your collection's name"}
            value={name}
            name={"name"}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <div className={styles.collectionForm_wrapper}>
          <div className={styles.collectionForm_wrapperSlider}>
            <Swiper
              slidesPerView={"auto"}
              navigation={{
                prevEl: `.${styles["swiper-button-prev"]}`,
                nextEl: `.${styles["swiper-button-next"]}`,
              }}
              spaceBetween={20}
              freeMode={true}
            >
              {screens.map(({ id, buffer }) => {
                const base64Image = Buffer.from(buffer).toString("base64");
                const imageUrl = `data:image/webp;base64,${base64Image}`;
                return (
                  <SwiperSlide
                    key={id}
                    style={{ width: "144px", position: "relative" }}
                  >
                    <div
                      className={styles.collectionForm_slide}
                      onClick={() => setCurrentScreen(String(id))}
                    >
                      <Image
                        className={styles.collectionForm_img}
                        src={imageUrl}
                        alt={"Welcome Screen"}
                        width={"144"}
                        height={"188"}
                        priority={true}
                      />
                      <div className={styles.collectionForm_check}>
                        {String(id) === currentScreen && <IconTick />}
                      </div>
                    </div>
                    <button
                      className={styles.collectionForm_cross}
                      type={"button"}
                      onClick={() => {
                        setCurrDeleteScreen(id);
                        setIsShowConfirm(1);
                      }}
                    >
                      <IconCross />
                    </button>
                  </SwiperSlide>
                );
              })}
              {listWelcomeScreen.map((item, index) => (
                <SwiperSlide key={item} style={{ width: "144px" }}>
                  <div
                    className={styles.collectionForm_slide}
                    onClick={() => setCurrentScreen(item)}
                  >
                    <Image
                      className={styles.collectionForm_img}
                      src={`${process.env.NEXTAUTH_URL}/${item}`}
                      alt={"Welcome Screen"}
                      width={"144"}
                      height={"188"}
                      priority={index <= 4}
                    />
                    <div className={styles.collectionForm_check}>
                      {item === currentScreen && <IconTick />}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.collectionForm_boxBg}></div>

            <div className={`${styles["swiper-button-prev"]}`}>
              <button
                className={styles.collectionForm_btn}
                type="button"
                name={"button-prev"}
              >
                <IconArrowDown />
              </button>
            </div>
            <div className={`${styles["swiper-button-next"]}`}>
              <button type="button" name={"button-next"}>
                <IconArrowDown />
              </button>
            </div>
          </div>
          <label className={styles.collectionForm_create}>
            <input
              style={{ display: "none" }}
              type={"file"}
              accept="image/jpeg, image/png, image/jpg, image/svg+xml, image/webp, image/svg"
              onChange={handleSetScreen}
            />
            <IconPlus />
            Add image
          </label>
        </div>
        <div className={styles.collectionForm_wrapperBtn}>
          <button
            type={"button"}
            disabled={isLoading}
            className={`${formStyles.form_cancelBtn}`}
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            className={`${formStyles.form_applyBtn}`}
            type={"submit"}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderOrig color={"#fff"} />
            ) : (
              <>{isEdit ? "Edit" : "Confirm"}</>
            )}
          </button>
        </div>
      </form>
      {isShowConfirm && (
        <ModalWindow scrollPage={true} setShowIdx={setIsShowConfirm}>
          <WindowConfirm
            setShow={setIsShowConfirm}
            question={"Are you sure you want to delete it?"}
            isLoading={isLoading}
            action={handleDeleteScreen}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default AddCollectionForm;
