import $api from "@/axios/base";
import { UserInterface } from "@/interfaces/user";

export const getUser = async (): Promise<UserInterface> => {
  const { data } = await $api.get("/api/user");

  return data;
};
