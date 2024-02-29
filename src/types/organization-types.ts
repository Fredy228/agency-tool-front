export type CreateOrgType = {
  name: string;
  logo?: File | null;
};

export type UpdateOrgType = {
  name?: string | undefined;
  logo?: File | null;
};
