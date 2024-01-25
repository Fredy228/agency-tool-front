import { signOut } from "next-auth/react";
import { isAxiosError } from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "@/axios/user";

export const getMe = createAsyncThunk(
  "user/me",
  async (
    credentials: { accessToken: string; refreshToken: string },
    { rejectWithValue },
  ) => {
    try {
      const user = await getUser(credentials.refreshToken);
      return {
        ...user,
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          await signOut();
        }
      }
      return rejectWithValue("Error get user");
    }
  },
);
