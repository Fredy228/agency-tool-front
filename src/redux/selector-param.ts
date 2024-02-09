import { RootState } from "@/redux/store";

export const selectIsAuthorize = (state: RootState) => state.param.isAuthorize;
export const selectIsLoadingApp = (state: RootState) =>
  state.param.isLoadingApp;
