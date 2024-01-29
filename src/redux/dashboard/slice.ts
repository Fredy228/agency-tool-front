import { createSlice } from "@reduxjs/toolkit";
import { DashboardInterface } from "@/interfaces/dashboard";

type DashReduxType = {
  list: Array<Pick<DashboardInterface, "id" | "name" | "screenUrl">>;
};

const initialState: DashReduxType = {
  list: [],
};

export const dashboardsSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    setListDashb: (
      state,
      {
        payload,
      }: {
        payload: Array<Pick<DashboardInterface, "id" | "name" | "screenUrl">>;
      },
    ) => {
      state.list = payload;
    },
    deleteDasboards: (state, { payload }: { payload: number }) => {
      state.list = state.list.filter((item) => item.id !== payload);
    },
  },
});

export const { setListDashb, deleteDasboards } = dashboardsSlice.actions;

export default dashboardsSlice.reducer;
