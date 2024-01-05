import type { FC } from "react";

import styles from "./first-setup.module.scss";

import SetupForm from "@/components/ui/auth/setup-form/SetupForm";

type Props = {};
const FirstSetup: FC<Props> = () => {
  return (
    <div className={styles.setupForm}>
      <h1 className={styles.setupForm_title}>
        You can create your own organization
      </h1>
      <SetupForm />
    </div>
  );
};

export default FirstSetup;
