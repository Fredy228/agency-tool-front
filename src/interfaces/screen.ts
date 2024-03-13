import { DashboardInterface } from "@/interfaces/dashboard";
import { OrganizationInterface } from "@/interfaces/organization";

export interface CustomScreensInterface {
  id: number;
  buffer: Buffer;
  orgId?: OrganizationInterface;
  screensDashb?: ScreenDashbInterface[];
}

export interface ScreenDashbInterface {
  id: number;
  screen?: CustomScreensInterface;
  dashboard?: DashboardInterface;
}
