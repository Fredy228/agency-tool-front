import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "@/interfaces/user";

const initialState: UserInterface = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  sex: null,
  image: null,
  settings: null,
  verified: 0,
  accessToken: "",
  refreshToken: "",
  currentDevice: undefined,
  devices: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: () => {
      return { ...initialState };
    },
    setUser: (_state, { payload }: { payload: UserInterface }) => {
      return { ...payload };
    },
    updateUser: (state, { payload }: { payload: Partial<UserInterface> }) => {
      return { ...state, ...payload };
    },
  },
});

export const { removeUser, setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
