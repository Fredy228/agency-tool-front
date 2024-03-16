import { DashboardInterface } from "@/interfaces/dashboard";
import { ScreenInterface } from "@/interfaces/screen";

export interface CollectionInterface {
  id: number;
  name: string;
  image: string;
  imageBuffer?: ScreenInterface;
  dashbId?: DashboardInterface;
}
