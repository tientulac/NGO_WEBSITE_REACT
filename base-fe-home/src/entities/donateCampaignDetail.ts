import { BaseEntity } from "./base.entity";

export interface DonateCampaignDetail extends BaseEntity {
  donor?: string;
  amount?: string;
  time?: string;
}
