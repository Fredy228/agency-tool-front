"use client";

import { signOut, useSession } from "next-auth/react";
import { Dispatch, ReactNode, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { isAxiosError } from "axios";

import { setAuthHeader } from "@/axios/base";

import { SessionInterface } from "@/interfaces/user";
import { getMe } from "@/redux/user/operations";
import { removeUser } from "@/redux/user/slice";
import { refreshToken } from "@/axios/auth";

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  const { data, status, update } = useSession();
  const dispacth: Dispatch<any> = useDispatch();
  const refUpdate = useRef(false);
  console.log("status", status);

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
    if (refUpdate.current) return;
    try {
      const tokens = await refreshToken(refresh);
      refUpdate.current = true;
      update(tokens)
        .then(() => {
          refUpdate.current = false;
        })
        .catch(console.error);
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        if (e.response.status === 401 && !refUpdate.current) {
          signOut()
            .then(() => (refUpdate.current = false))
            .catch(console.error);
        }
        refUpdate.current = false;
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated" && !userSession) {
      signOut().catch(console.error);
    }

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
