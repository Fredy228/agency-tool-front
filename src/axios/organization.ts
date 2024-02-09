import $api from "@/axios/base";

import { OrganizationInterface } from "@/interfaces/organization";
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
