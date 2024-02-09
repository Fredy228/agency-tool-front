import { SettingsUserType } from "@/types/user-types";

export interface UserInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  sex: number | null;
  image: string | null;
  verified: 0 | 1;
  settings: Partial<SettingsUserType> | null;
  accessToken: string;
  refreshToken: string;
  currentDevice?: UserDeviceInterface;
  devices?: Array<UserDeviceInterface>;
}

export interface UserDeviceInterface {
  id: number;
  deviceModel: string | null;
  createAt: Date;
  accessToken: string;
  refreshToken: string;
  userId: number;
}
