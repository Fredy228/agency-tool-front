import { PlanEnum } from "@/enum/plan-enum";

export type SettingsUserType = {
  restorePassAt: Date | null;
  plan: PlanEnum;
};
