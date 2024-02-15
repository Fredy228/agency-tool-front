import { ThemeDashboard } from "@/types/dashboard-types";
import { LinkInterface } from "@/interfaces/link";

export interface DashboardInterface {
  id: number;
  name: string;
  password: string;
  screenUrl: string;
  logoPartnerUrl: string;
  textOne: string;
  textTwo: string;
  textThree: string;
  theme: ThemeDashboard;
  links?: LinkInterface[];
}
