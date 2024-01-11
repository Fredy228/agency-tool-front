"use client";

import { useSession } from "next-auth/react";
import { Dispatch, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAuthHeader } from "@/axios/base";
import { SessionInterface } from "@/interfaces/user";

import { getMe } from "@/redux/user/operations";
import { removeUser } from "@/redux/user/slice";
import { refreshToken } from "@/axios/auth";

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  const { data, status, update } = useSession();
  console.log("status", status);
  const dispacth: Dispatch<any> = useDispatch();

  const userSession = data?.user as SessionInterface | null;

  const actionAuthenticated = async () => {
    if (!userSession) return;
    dispacth(
      getMe({
        accessToken: userSession?.accessToken,
        refreshToken: userSession?.refreshToken,
      }),
    );
  };

  const actionRefreshToken = async (refresh: string) => {
    if (!userSession || userSession?.accessToken || status !== "authenticated")
      return;

    const tokens = await refreshToken(refresh);
    update(tokens).catch(console.error);
  };

  useEffect(() => {
    if (status === "authenticated" && userSession?.accessToken) {
      setAuthHeader(userSession.accessToken);
      actionAuthenticated().catch(console.log);
    }

    if (
      status === "authenticated" &&
      !userSession?.accessToken &&
      userSession?.refreshToken
    ) {
      actionRefreshToken(userSession?.refreshToken).catch(console.error);
    }
  }, [data]);

  useEffect(() => {
    if (status === "unauthenticated") {
      dispacth(removeUser());
    }
  }, [status]);

  return <>{children}</>;
};
