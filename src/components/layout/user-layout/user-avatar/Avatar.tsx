import type { FC } from "react";

import styles from "./avatar.module.scss";
import { IconDefaultAvatar } from "@/components/reused/icons/icons";
import { UserInterface } from "@/interfaces/user";
import Image from "next/image";

type Props = {
  user: UserInterface;
};
const Avatar: FC<Props> = ({ user }) => {
  return (
    <div className={styles.avatar}>
      <span className={styles.avatar_default}>
        {user && !user.email && <IconDefaultAvatar />}
        {user && user.image && (
          <Image src={user.image} alt={"Avatar"} width={"32"} height={"32"} />
        )}
        {user && user.email && !user.image && <span>{user.firstName[0]}</span>}
      </span>
    </div>
  );
};

export default Avatar;
