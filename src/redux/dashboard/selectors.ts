import { RootState } from "@/redux/store";

export const selectListDashb = (state: RootState) => state.dashboards.list;
export const selectLogoPartner = (state: RootState) =>
  state.dashboards.logoPartner;
