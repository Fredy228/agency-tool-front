import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClient: false,
};

export const crsSlice = createSlice({
  name: "crs",
  initialState,
  reducers: {
    setCRS: (state, { payload }) => {
      state.isClient = payload;
    },
  },
});

export const { setCRS } = crsSlice.actions;
export default crsSlice.reducer;
