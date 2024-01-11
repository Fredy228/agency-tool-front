import { createSlice } from "@reduxjs/toolkit";
import { getMe } from "@/redux/user/operations";
import { UserInterface } from "@/interfaces/user";

const initialState: UserInterface = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  sex: null,
  image: null,
  verified: 0,
  firstSettings: 0,
  accessToken: "",
  refreshToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      if (payload) {
        console.log("payload", payload);
        return { ...payload };
      }
    });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
