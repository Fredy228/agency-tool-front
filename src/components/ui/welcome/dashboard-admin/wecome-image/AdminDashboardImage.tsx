"use client";

import { Dispatch, type FC, SetStateAction, useState } from "react";
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

SwiperCore.use([Navigation, FreeMode]);

type Props = {
  screenUrl: string;
  setScreenUrl: Dispatch<SetStateAction<string>>;
};
const AdminDashboardImage: FC<Props> = ({ screenUrl, setScreenUrl }) => {
  const [screens, setScreens] = useState<string[]>([...listWelcomeScreen]);

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
            style={{}}
          >
            {screens.map((item, index) => (
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
                    objectFit={"cover"}
                  />
                  <div className={styles.adminScreen_check}>
                    {item === screenUrl && <IconTick />}
                  </div>
                  {!listWelcomeScreen.includes(item) && (
                    <button
                      className={styles.adminScreen_cross}
                      type={"button"}
                    >
                      <IconCross />
                    </button>
                  )}
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
        <button className={styles.adminScreen_create} type={"button"}>
          <IconPlus />
          Add image
        </button>
      </div>
    </section>
  );
};

export default AdminDashboardImage;
