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

export const sendVerificationCodeAPI = async (): Promise<void> => {
  await $api.get("/api/auth/verification");
};

export const checkVerificationCode = async (code: string): Promise<void> => {
  await $api.post("/api/auth/verification", { code });
};

export const sendForgotCodeAPI = async (email: string): Promise<void> => {
  await $api.post("/api/auth/forgot-pass", { email });
};

export const resetPasswordAPI = async (body: {
  email: string;
  password: string;
  code: string;
}): Promise<void> => {
  await $api.patch("/api/auth/forgot-pass", body);
};
