import { BaseEntity } from "./base.entity";

export interface Payment extends BaseEntity {
  name?: string;
  description?: string;
  thumbnail?: string;
  type?: string;
}
