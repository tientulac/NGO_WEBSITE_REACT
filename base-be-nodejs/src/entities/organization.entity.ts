import { BaseEntity } from "./base.entity";

export interface Organization extends BaseEntity {
  title?: string;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
  address?: string;
  certification?: string;
  purpose?: string;
  logo?: string;
  total_amount?: number;
  status?: string;
}
