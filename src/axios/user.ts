import axios from "@/axios/base";

import { UserInterface } from "@/interfaces/user";

export const getUser = async (): Promise<UserInterface> => {
  const { data } = await axios.get("/api/user");

  return data;
};
