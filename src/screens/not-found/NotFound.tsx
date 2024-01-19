import type { NextPage } from "next";
import Link from "next/link";

import styles from "./not-found.module.scss";

type Props = {};
const NotFound: NextPage<Props> = () => {
  return (
    <div
      className={styles.notFound}
      style={{
        backgroundImage: `url(${process.env.NEXTAUTH_URL}/img/not-found/bg-404.png)`,
      }}
    >
      <div className={styles.notFound_inner}>
        <h1 className={styles.notFound_status}>404</h1>
        <h2 className={styles.notFound_message}>
          Oops, this page could <br /> not be found.
        </h2>
        <p className={styles.notFound_text}>
          The page you are looking for might have been <br /> removed had its
        </p>
        <Link className={styles.notFound_btn} href={"/welcome"}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
