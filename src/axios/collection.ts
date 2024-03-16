import $api from "@/axios/base";
import {
  CollectionCreateType,
  CollectionUpdateType,
} from "@/types/collection-types";
import { CollectionInterface } from "@/interfaces/collection";
import { CustomScreensInterface } from "@/interfaces/screen";

export const createCollectionAPI = async (
  body: CollectionCreateType,
): Promise<CollectionInterface> => {
  const { idDashb, ...arg } = body;

  const { data } = await $api.post(`/api/collection/${idDashb}`, arg);

  return data;
};

export const updateCollectionAPI = async (
  body: Partial<CollectionUpdateType>,
): Promise<undefined | CustomScreensInterface> => {
  const { idCollection, ...arg } = body;

  const { data } = await $api.patch(`/api/collection/${idCollection}`, arg);

  return data;
};

export const getOneCollectionAPI = async (
  idCollection: number,
  password: string | undefined,
): Promise<CollectionInterface> => {
  const { data } = await $api.get(`/api/collection/${idCollection}`, {
    params: {
      password,
    },
  });

  return data;
};

export const deleteCollectionAPI = async (idCollection: number) => {
  await $api.delete(`/api/collection/${idCollection}`);
};
