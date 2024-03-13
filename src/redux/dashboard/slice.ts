import { createSlice } from "@reduxjs/toolkit";
import { DashboardInterface } from "@/interfaces/dashboard";

type DashReduxType = {
  list: Array<
    Pick<DashboardInterface, "id" | "name" | "screenUrl" | "screenBuffer">
  >;
  logoPartner: Buffer | null;
};

const initialState: DashReduxType = {
  list: [],
  logoPartner: null,
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
    setLogoPartner: (state, { payload }) => {
      state.logoPartner = payload;
    },
  },
});

export const { setLogoPartner, setListDashb, deleteDasboards } =
  dashboardsSlice.actions;

export default dashboardsSlice.reducer;
