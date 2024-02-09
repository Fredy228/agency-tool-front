import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingApp: true,
  isAuthorize: false,
};

export const paramSlice = createSlice({
  name: "param",
  initialState,
  reducers: {
    setLoadingApp: (state, { payload }) => {
      state.isLoadingApp = payload;
    },
    setAuthorize: (state, { payload }) => {
      state.isAuthorize = payload;
    },
  },
});

export const { setLoadingApp, setAuthorize } = paramSlice.actions;

export default paramSlice.reducer;
