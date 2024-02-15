import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/redux/user/slice";
import paramReducer from "@/redux/slice-param";
import dashboardsReducer from "@/redux/dashboard/slice";
import linksReducer from "@/redux/link/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboards: dashboardsReducer,
    links: linksReducer,
    param: paramReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
