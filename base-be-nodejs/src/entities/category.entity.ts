import { BaseEntity } from "./base.entity";

export interface Category extends BaseEntity {
  parent_cate_id?: number;
  name?: string;
  description?: string;
  url?: string;
  pos?: number;
}
