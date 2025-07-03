import { BaseEntity } from "./base.entity";

export interface Project extends BaseEntity {
  cate_id?: number;
  title?: string;
  name?: string;
  description?: string;
  thumbnail?: string;
  video_url?: string;
  organization_id?: number;
  status?: string;
  field_type?: string;
  deadline?: Date;
}
