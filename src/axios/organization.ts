import axios from "@/axios/base";
import { OrganizationInterface } from "@/interfaces/organization";
import { CreateOrgType } from "@/types/organization-types";

export const createOrganizationAPI = async ({
  name,
  logo,
}: CreateOrgType): Promise<OrganizationInterface> => {
  const formData = new FormData();
  formData.append("name", name);
  if (logo) formData.append("logo", logo);

  const { data } = await axios.post("/api/organization", formData);

  return data;
};
