import { RootState } from "@/redux/store";

export const selectListDashb = (state: RootState) => state.dashboards.list;
