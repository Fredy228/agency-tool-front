import axios from "@/axios/base";

import { UserInterface } from "@/interfaces/user";

export const getUser = async (token: string): Promise<UserInterface> => {
  const { data } = await axios.get("/api/user", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
