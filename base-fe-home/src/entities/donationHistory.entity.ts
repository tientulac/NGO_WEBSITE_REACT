import { BaseEntity } from "./base.entity";

export interface DonationHistory extends BaseEntity {
  user_id?: number;
  project_detail_id?: number;
  organization_id?: number;
  amount?: number;
  donate_method?: string;
  transaction_code?: string;
  note?: string;
  donate_time?: Date;
  is_anonymous?: boolean;
  status?: string;
}
