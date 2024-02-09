import { DashboardInterface } from "@/interfaces/dashboard";
import { DashType } from "@/types/dashboard-types";
import $api from "@/axios/base";

export const getAllDashboardsAPI = async (): Promise<
  Array<Pick<DashboardInterface, "id" | "name" | "screenUrl">>
> => {
  const { data } = await $api.get("/api/dashboard");

  return data;
};

export const getDashboardByIdAPI = async (
  id: string | number,
  password: string | undefined,
): Promise<DashboardInterface> => {
  const { data } = await $api.get(`/api/dashboard/${id}`, {
    params: {
      password,
    },
  });

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
}: DashType) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("password", password);
  formData.append("textOne", textOne);
  formData.append("textTwo", textTwo);
  formData.append("textThree", textThree);
  formData.append("screenUrl", screenUrl);
  if (logoPartner) formData.append("logoPartner", logoPartner);

  const { data } = await $api.post("/api/dashboard", formData);

  return data;
};

export const deleteDashboardAPI = async (
  id: number | string,
): Promise<void> => {
  await $api.delete(`/api/dashboard/${id}`);
  return;
};

export const updateDashboardAPI = async (
  updatedData: Partial<DashType>,
  id: number | string,
): Promise<void> => {
  const formData = new FormData();

  Object.entries(updatedData).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  // if (name) formData.append("name", name);
  // if (password) formData.append("password", password);
  // if (textOne) formData.append("textOne", textOne);
  // if (textTwo) formData.append("textTwo", textTwo);
  // if (textThree) formData.append("textThree", textThree);
  // if (screenUrl) formData.append("screenUrl", screenUrl);
  // if (logoPartner) formData.append("logoPartner", logoPartner);

  await $api.patch(`/api/dashboard/${id}`, formData);
};
