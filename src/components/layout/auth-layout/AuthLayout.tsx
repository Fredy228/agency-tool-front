import Image from "next/image";

import type { FC, PropsWithChildren } from "react";

import styles from "./auth-layout.module.scss";
import styleContainer from "@/components/styles/container.module.scss";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.authLayout}>
      <div className={styleContainer.container}>
        <div className={styles.authLayout_inner}>
          <div className={styles.authLayout_wrapperChild}>{children}</div>
          <div className={styles.authLayout_wrapperDecor}>
            <div className={styles.authLayout_decor}>
              <Image
                className={styles.authLayout_decorImg}
                src={`${process.env.NEXTAUTH_URL}/img/auth/creavive.jpg`}
                alt={"Creative"}
                width={"519"}
                height={"600"}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
