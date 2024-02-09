"use client";

import type { FC } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import styles from "./avatar.module.scss";

import { IconDefaultAvatar } from "@/components/reused/icons/icons";
import { UserInterface } from "@/interfaces/user";
import { selectIsAuthorize } from "@/redux/selector-param";

type Props = {
  user: UserInterface;
};
const Avatar: FC<Props> = ({ user }) => {
  const isAuthorize = useSelector(selectIsAuthorize);
  return (
    <div className={styles.avatar}>
      <span className={styles.avatar_default}>
        {isAuthorize ? (
          <>
            {user.image ? (
              <Image
                src={user.image}
                alt={"Avatar"}
                width={"32"}
                height={"32"}
                unoptimized={true}
              />
            ) : (
              <span>{user.firstName[0]}</span>
            )}
          </>
        ) : (
          <IconDefaultAvatar />
        )}
      </span>
    </div>
  );
};

export default Avatar;
