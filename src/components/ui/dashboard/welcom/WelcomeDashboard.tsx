import type { FC } from "react";

import Image from "next/image";

import styles from "./welcome-dashboard.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

import { IconArrowRightLong } from "@/components/reused/icons/icons";
import { DashboardInterface } from "@/interfaces/dashboard";
import BufferImg from "@/components/reused/buffer-img/BufferImg";
import { setImagePath } from "@/services/setImagePath";

type Props = {
  dashboard: DashboardInterface;
};
const WelcomeDashboard: FC<Props> = ({ dashboard }) => {
  return (
    <section className={styles.welcome}>
      <div className={styleContainer.container} style={{ height: "100%" }}>
        <div className={styles.welcome_inner}>
          <div className={styles.welcome_wrapperImg}>
            <div className={styles.welcome_imgBox}>
              {Number(dashboard.screenUrl) && dashboard.screenBuffer ? (
                <BufferImg
                  buffer={dashboard?.screenBuffer?.screen?.buffer}
                  customClass={styles.welcome_img}
                  width={519}
                  height={690}
                  alt={"Welcome Screen"}
                />
              ) : (
                <Image
                  className={styles.welcome_img}
                  src={setImagePath(dashboard.screenUrl)}
                  alt={"Welcome image"}
                  priority
                  quality={100}
                  width={"519"}
                  height={"690"}
                />
              )}
            </div>
          </div>
          <div className={styles.welcome_wrapperHello}>
            <div className={styles.welcome_helloBox}>
              <span className={styles.welcome_mottoFirst}>
                {dashboard.textOne}
              </span>
              <h1 className={styles.welcome_title}>{dashboard.textTwo}</h1>
              <p className={styles.welcome_mottoSecond}>
                {dashboard.textThree}
              </p>
            </div>
          </div>

          <div className={styles.welcome_letsGo}>
            So let&apos;s go
            <span className={styles.welcome_letsGoIcon}>
              <IconArrowRightLong />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeDashboard;
