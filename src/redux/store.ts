import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/redux/user/slice";
import dashboardsReducer from "@/redux/dashboard/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboards: dashboardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
