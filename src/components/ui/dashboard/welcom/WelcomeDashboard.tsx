import type { FC } from "react";

import Image from "next/image";

import styles from "./welcome-dashboard.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

import welcomeImage from "./welcome.png";
import { IconArrowRightLong } from "@/components/reused/icons/icons";

type Props = {};
const WelcomeDashboard: FC<Props> = ({}) => {
  return (
    <section className={styles.welcome}>
      <div className={styleContainer.container} style={{ height: "100%" }}>
        <div className={styles.welcome_inner}>
          <div className={styles.welcome_wrapperImg}>
            <div className={styles.welcome_imgBox}>
              <Image
                className={styles.welcome_img}
                src={welcomeImage}
                alt={"Welcome image"}
                width={"519"}
                height={"690"}
              />
            </div>
          </div>
          <div className={styles.welcome_wrapperHello}>
            <div className={styles.welcome_helloBox}>
              <span className={styles.welcome_mottoFirst}>
                Don&apos;t Waste Time on Fruitless Searches.
              </span>
              <h1 className={styles.welcome_title}>
                Welcome, where everything finds its <span>perfect home!</span>
              </h1>
              <p className={styles.welcome_mottoSecond}>
                Save, group, and share links with ease. Join us and make your
                space more organized
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
