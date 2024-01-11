export interface UserInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  sex: number | null;
  image: string | null;
  verified: 0 | 1;
  firstSettings: 0 | 1;
  accessToken: string;
  refreshToken: string;
  devices?: Array<UserDeviceInterface>;
}

export interface UserDeviceInterface {
  id: number;
  deviceModel: string | null;
  createAt: Date;
  token: string;
  userId: number;
}

export interface SessionInterface {
  id: string;
  email: string;
  image: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}
