import axios from "axios";
import $api from "./base";

import { TLoginBody, TRegisterBody } from "@/types/auth-types";
import { UserInterface } from "@/interfaces/user";

export const loginUser = async (
  credentials: TLoginBody,
): Promise<UserInterface> => {
  const { data } = await axios.post("/api/auth/login", credentials, {
    withCredentials: true,
  });
  return data;
};

export const registerUser = async (
  credentials: TRegisterBody,
): Promise<UserInterface> => {
  const { data } = await axios.post("/api/auth/register", credentials, {
    withCredentials: true,
  });
  return data;
};

export const refreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const { data } = await axios.get("/api/auth/refresh", {
    withCredentials: true,
  });

  return data;
};

export const logoutUser = async (): Promise<void> => {
  await $api.get("/api/auth/logout");
};
