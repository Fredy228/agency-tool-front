import $api from "@/axios/base";

import { LinkInterface } from "@/interfaces/link";
import { CreateLinkType, UpdateLinkType } from "@/types/link-types";

export const createLinkAPI = async (
  dataCreate: CreateLinkType,
): Promise<LinkInterface> => {
  const { idDashb, ...body } = dataCreate;

  const { data } = await $api.post(`/api/link/${idDashb}`, body);

  return data;
};

export const updateLinkAPI = async (
  dataCreate: UpdateLinkType,
): Promise<void> => {
  const { idLink, ...body } = dataCreate;

  await $api.patch(`/api/link/${idLink}`, body);
};

export const deleteLinkAPI = async (id: number): Promise<void> => {
  await $api.delete(`/api/link/${id}`);
};
