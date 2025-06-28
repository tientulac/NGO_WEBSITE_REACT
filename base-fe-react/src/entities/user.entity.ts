import { BaseEntity } from "./base.entity";

export interface User extends BaseEntity {
  code?: string;
  role_code?: string;
  full_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  bank_account?: string;
  bank_name?: string;
  avatar?: string;
  user_name?: string;
  password?: string;
}
