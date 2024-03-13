type CollectionBase = {
  name: string;
  imageUrl: string;
};

export type CollectionCreateType = {
  idDashb: number;
} & CollectionBase;

export type CollectionUpdateType = {
  idCollection: number;
} & CollectionBase;
