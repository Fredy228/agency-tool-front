import $api from "@/axios/base";

import {
  CustomScreenInterface,
  OrganizationInterface,
} from "@/interfaces/organization";
import { CreateOrgType, UpdateOrgType } from "@/types/organization-types";

export const createOrganizationAPI = async ({
  name,
  logo,
}: CreateOrgType): Promise<OrganizationInterface> => {
  const formData = new FormData();
  formData.append("name", name);
  if (logo) formData.append("logo", logo);

  const { data } = await $api.post("/api/organization", formData);

  return data;
};

export const getOrganizationAPI = async (): Promise<OrganizationInterface> => {
  const { data } = await $api.get("/api/organization");

  return data;
};

export const updateOrganizationAPI = async ({
  name,
  logo,
}: UpdateOrgType): Promise<OrganizationInterface> => {
  const formData = new FormData();
  if (name) formData.append("name", name);
  if (logo) formData.append("logo", logo);

  const { data } = await $api.patch("/api/organization", formData);

  return data;
};

export const deleteLogoOrgAPI = async (): Promise<void> => {
  await $api.delete("/api/organization/logo");
};

export const uploadScreenDashbOrgAPI = async (
  image: File,
): Promise<CustomScreenInterface> => {
  const formData = new FormData();
  formData.append("screen", image);

  const { data } = await $api.post("/api/custom-screens/dashboard", formData);

  return data;
};

export const getScreensDashbOrgAPI = async (): Promise<
  CustomScreenInterface[]
> => {
  const { data } = await $api.get("/api/custom-screens/dashboard");

  return data;
};

export const deleteScreenDashbOrgAPI = async (id: number): Promise<void> => {
  await $api.delete(`/api/custom-screens/dashboard/${id}`);
};

export const uploadScreenCollectionOrgAPI = async (
  image: File,
): Promise<CustomScreenInterface> => {
  const formData = new FormData();
  formData.append("screen", image);

  const { data } = await $api.post("/api/custom-screens/collection", formData);

  return data;
};

export const getScreensCollectionOrgAPI = async (): Promise<
  CustomScreenInterface[]
> => {
  const { data } = await $api.get("/api/custom-screens/collection");

  return data;
};

export const deleteScreenCollectionOrgAPI = async (
  id: number,
): Promise<void> => {
  await $api.delete(`/api/custom-screens/collection/${id}`);
};
