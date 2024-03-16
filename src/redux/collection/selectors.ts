import { RootState } from "@/redux/store";

export const selectListCollection = (state: RootState) =>
  state.collections.list;
export const selectActionCollection = (state: RootState) =>
  state.collections.current;

export const selectIdDashb = (state: RootState) =>
  state.collections.idDashboard;
