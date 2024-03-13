"use client";

import React, {
  Dispatch,
  type FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperCore from "swiper";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/free-mode";

import styles from "./admin-dashboard-image.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";

import { listWelcomeScreen } from "@/components/ui/welcome/dashboard-admin/wecome-image/list";
import {
  IconArrowDown,
  IconCross,
  IconPlus,
  IconTick,
} from "@/components/reused/icons/icons";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { CustomScreenInterface } from "@/interfaces/organization";
import {
  deleteScreenCollectionOrgAPI,
  deleteScreenDashbOrgAPI,
  getScreensDashbOrgAPI,
  uploadScreenDashbOrgAPI,
} from "@/axios/organization";
import { outputError } from "@/services/output-error";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";

SwiperCore.use([Navigation, FreeMode]);

type Props = {
  screenUrl: string;
  setScreenUrl: Dispatch<SetStateAction<string>>;
};
const AdminDashboardImage: FC<Props> = ({ screenUrl, setScreenUrl }) => {
  const [screens, setScreens] = useState<CustomScreenInterface[]>([]);
  const [uploadScreen, setUploadScreen] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowConfirm, setIsShowConfirm] = useState<number | null>(null);
  const [currDeleteScreen, setCurrDeleteScreen] = useState<number | null>(null);
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
      await deleteScreenDashbOrgAPI(currDeleteScreen);
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

  useEffect(() => {
    if (isFirst.current) return;
    isFirst.current = true;

    setIsLoading(true);
    getScreensDashbOrgAPI()
      .then((data) => {
        setScreens(data.reverse());
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
    uploadScreenDashbOrgAPI(uploadScreen)
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
    <section id={"screen"} className={styles.adminScreen}>
      <h3 className={styleSection.adminSection_title}>Welcome Screen</h3>
      <div className={styles.adminScreen_wrapper}>
        <div className={styles.adminScreen_wrapperSlider}>
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
                    className={styles.adminScreen_slide}
                    onClick={() => setScreenUrl(String(id))}
                  >
                    <Image
                      className={styles.adminScreen_img}
                      src={imageUrl}
                      alt={"Welcome Screen"}
                      width={"144"}
                      height={"188"}
                      priority={true}
                    />
                    <div className={styles.adminScreen_check}>
                      {String(id) === screenUrl && <IconTick />}
                    </div>
                  </div>
                  <button
                    className={styles.adminScreen_cross}
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
                  className={styles.adminScreen_slide}
                  onClick={() => setScreenUrl(item)}
                >
                  <Image
                    className={styles.adminScreen_img}
                    src={`${process.env.NEXTAUTH_URL}/${item}`}
                    alt={"Welcome Screen"}
                    width={"144"}
                    height={"188"}
                    priority={index <= 4}
                  />
                  <div className={styles.adminScreen_check}>
                    {item === screenUrl && <IconTick />}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.adminScreen_boxBg}></div>

          <div className={`${styles["swiper-button-prev"]}`}>
            <button
              className={styles.adminScreen_btn}
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
        <label className={styles.adminScreen_create}>
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
    </section>
  );
};

export default AdminDashboardImage;
