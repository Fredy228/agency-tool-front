export interface OrganizationInterface {
  id: number;
  name: string;
  logoUrl: Buffer | null;
  createAt?: Date;
  updateAt?: Date;
  customScreens?: CustomScreenInterface;
  collectionScreens?: CustomScreenInterface;
}

export interface CustomScreenInterface {
  id: number;
  buffer: Buffer;
}
