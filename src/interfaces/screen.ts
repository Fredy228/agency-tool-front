import { DashboardInterface } from "@/interfaces/dashboard";
import { OrganizationInterface } from "@/interfaces/organization";

export interface CustomScreensInterface {
  id: number;
  buffer: Buffer;
  orgId?: OrganizationInterface;
  screensDashb?: ScreenInterface[];
}

export interface ScreenInterface {
  id: number;
  screen?: CustomScreensInterface;
  dashboard?: DashboardInterface;
}
