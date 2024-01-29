import axios from "@/axios/base";
import { DashboardInterface } from "@/interfaces/dashboard";
import { CreateDashType } from "@/types/dashboard-types";

export const getAllDashboardsAPI = async (): Promise<
  Array<Pick<DashboardInterface, "id" | "name" | "screenUrl">>
> => {
  const { data } = await axios.get("/api/dashboard");

  return data;
};

export const createDashboardAPI = async ({
  name,
  password,
  screenUrl,
  textOne,
  textTwo,
  textThree,
  logoPartner,
}: CreateDashType) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("password", password);
  formData.append("textOne", textOne);
  formData.append("textTwo", textTwo);
  formData.append("textThree", textThree);
  formData.append("screenUrl", screenUrl);
  if (logoPartner) formData.append("logoPartner", logoPartner);

  const { data } = await axios.post("/api/dashboard", formData);

  return data;
};

export const deleteDashboardAPI = async (
  id: number | string,
): Promise<void> => {
  await axios.delete(`/api/dashboard/${id}`);
  return;
};
