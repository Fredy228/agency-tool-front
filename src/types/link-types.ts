import { LinkInterface } from "@/interfaces/link";

export type CreateLinkType = {
  idDashb: number | string;
} & Omit<LinkInterface, "id">;

export type UpdateLinkType = {
  idLink: number | string;
} & Partial<LinkInterface>;
