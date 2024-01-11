import { configureStore } from "@reduxjs/toolkit";
// import { get } from "local-storage";

import userReducer from "@/redux/user/slice";
// import crsReducer from "@/redux/crs-slice";

// const savedState = get("reduxState");
// const initialState = savedState ? savedState : undefined;

export const store = configureStore({
  reducer: {
    user: userReducer,
    // crs: crsReducer,
  },
  // preloadedState: initialState,
});

// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem(
//     "reduxState",
//     JSON.stringify({ ...state, crs: { isClient: false } }),
//   );
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
