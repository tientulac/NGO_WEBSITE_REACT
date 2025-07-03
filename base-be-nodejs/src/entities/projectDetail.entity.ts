import { BaseEntity } from "./base.entity";

export interface ProjectDetail extends BaseEntity {
  project_id?: number;
  title?: string;
  name?: string;
  description?: string;
  purpose?: string;
  total_donat?: number;
  finalcial_goal?: number;
  address?: string;
  status?: string;
}
