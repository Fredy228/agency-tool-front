import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "@/axios/user";

export const getMe = createAsyncThunk(
  "user/me",
  async (
    credentials: { accessToken: string; refreshToken: string },
    { rejectWithValue },
  ) => {
    try {
      const user = await getUser();
      return {
        ...user,
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
      };
    } catch (error) {
      return rejectWithValue("Error get user");
    }
  },
);
