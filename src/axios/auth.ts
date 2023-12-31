import axios, { setAuthHeader } from "@/axios/base";

import { TGoogleAuth, TLoginBody, TRegisterBody } from "@/types/auth-types";
import { UserInterface } from "@/interfaces/user";
import { generateJwtToken } from "@/services/jwtToken";

export const loginUser = async (
  credentials: TLoginBody,
): Promise<UserInterface> => {
  const { data } = await axios.post("/api/auth/login", credentials);
  return data;
};

export const registerUser = async (
  credentials: TRegisterBody,
): Promise<UserInterface> => {
  const { data } = await axios.post("/api/auth/register", credentials);
  return data;
};

export const googleAuth = async (
  payload: TGoogleAuth,
): Promise<UserInterface> => {
  const token = generateJwtToken(payload);

  setAuthHeader(token);

  const { data } = await axios.get("/api/auth/google");

  return data;
};

export const refreshToken = async (
  token: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  setAuthHeader(token);

  const { data } = await axios.get("/api/auth/refresh");

  return data;
};
