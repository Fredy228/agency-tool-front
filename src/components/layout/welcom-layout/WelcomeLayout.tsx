"use client";

import { type FC, type PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import styles from "./welcome-layout.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

import { selectUser } from "@/redux/user/selectors";
import WelcomeVerify from "@/components/ui/welcome/verify/WelcomeVerify";

const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(selectUser);
  const [isShowVerify, setIsShowVerify] = useState<boolean>(true);

  return (
    <main className={styles.welcomeLayout}>
      <div className={styleContainer.container}>
        <div className={styles.welcomeLayout_inner}>
          <AnimatePresence>
            {!user.verified && isShowVerify && (
              <WelcomeVerify setIsShowVerify={setIsShowVerify} />
            )}
          </AnimatePresence>
          <p className={styles.welcomeLayout_text}>
            Don&apos;t Waste Time on Fruitless Searches.
          </p>
          <h2 className={styles.welcomeLayout_title}>
            Welcome, {user?.firstName}
          </h2>
        </div>
        {children}
      </div>
    </main>
  );
};

export default WelcomeLayout;
