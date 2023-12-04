export interface UserInterface {
  id: number;
  email: string;
  firstName: string;
  sex: number;
  image: string;
  verified: 0 | 1;
  firstSettings: 0 | 1;
  token: string;
  devices?: Array<UserDeviceInterface>;
}

export interface UserDeviceInterface {
  id: number;
  deviceModel: string;
  createAt: Date;
  token: string;
  userId: number;
}
