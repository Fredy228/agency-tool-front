"use client";

import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthorize, selectIsLoadingApp } from "@/redux/selector-param";
import { redirect } from "next/navigation";
import LoaderPage from "@/components/reused/loader/loader-page";

export const ProtectWrapper = ({ children }: { children: ReactNode }) => {
  const isLoadingApp = useSelector(selectIsLoadingApp);
  const isAuthorize = useSelector(selectIsAuthorize);

  if (isLoadingApp) return <LoaderPage isFull={true} />;

  if (!isLoadingApp && !isAuthorize) redirect("/auth/login");

  return <>{children}</>;
};
