import { BaseEntity } from "./base.entity";

export interface Role extends BaseEntity {
  code?: string;
  name?: string;
}
