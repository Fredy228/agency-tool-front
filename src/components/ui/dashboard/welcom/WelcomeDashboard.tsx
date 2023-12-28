import type { FC } from "react";

import Image from "next/image";

import styles from "./welcome-dashboard.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

type Props = {};
const WelcomeDashboard: FC<Props> = ({}) => {
  return (
    <section className={styles.welcome}>
      <div className={styleContainer.container}>
        <div className={styles.welcome_inner}>
          <div className={styles.welcome_wrapperImg}>
            <div className={styles.welcome_imgBox}>
              {/*<Image src={""} alt={""} width={""} height={""} />*/}
            </div>
          </div>
          <div className={styles.welcome_wrapperHello}>
            <span>Don&apos;t Waste Time on Fruitless Searches.</span>
            <h1>Welcome, where everything finds its perfect home!</h1>
            <p>
              Save, group, and share links with ease. Join us and make your
              space more organized
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeDashboard;
