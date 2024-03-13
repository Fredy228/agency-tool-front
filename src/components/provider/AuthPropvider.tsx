"use client";

import { Dispatch, type ReactNode, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { isAxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { getUser } from "@/axios/user";
import { get, set } from "local-storage";

import { setUser } from "@/redux/user/slice";
import { setAuthorize, setLoadingApp } from "@/redux/slice-param";

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  const dispacth: Dispatch<any> = useDispatch();
  const searchParams = useSearchParams();
  const tokenGoogle = searchParams.get("token");

  const isFirst = useRef<boolean>(false);

  useEffect(() => {
    if (!tokenGoogle && !get<string>("token")) {
      dispacth(setAuthorize(false));
      dispacth(setLoadingApp(false));
      return;
    }

    if (isFirst.current) return;
    isFirst.current = true;

    if (tokenGoogle && !get<string>("token")) {
      set<string>("token", tokenGoogle);
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      url.searchParams.delete("paramToRemove");
      window.history.replaceState({}, "", url.toString());
    }
    const getUserCurrent = async () => {
      console.time("getting_user");
      try {
        const user = await getUser();
        dispacth(setUser(user));
        dispacth(setAuthorize(true));
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401) {
          dispacth(setAuthorize(false));
        } else {
          console.error(e);
        }
      } finally {
        dispacth(setLoadingApp(false));
        console.timeEnd("getting_user");
      }
    };
    getUserCurrent();
  }, [dispacth, tokenGoogle]);

  return <>{children}</>;
};
