import { ThemeDashboard } from "@/types/dashboard-types";
import { LinkInterface } from "@/interfaces/link";
import { OrganizationInterface } from "@/interfaces/organization";

export interface DashboardInterface {
  id: number;
  name: string;
  password: string;
  screenUrl: string;
  logoPartnerUrl: Buffer | null;
  textOne: string;
  textTwo: string;
  textThree: string;
  theme: ThemeDashboard;
  links?: LinkInterface[];
  orgId?: OrganizationInterface;
}
