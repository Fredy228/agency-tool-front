export type CreateOrgType = {
  name: string;
  logo?: File | undefined;
};

export type UpdateOrgType = {
  name?: string | undefined;
  logo?: File | undefined;
};
