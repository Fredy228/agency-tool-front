export type ThemeDashboard = {
  color_main: string;
  color_second: string;
};

export type CreateDashType = {
  name: string;
  password: string;
  screenUrl: string;
  logoPartner: File | undefined;
  textOne: string;
  textTwo: string;
  textThree: string;
};
