import { BaseEntity } from "./base.entity";

export interface FeedBackReview extends BaseEntity {
  user_id?: number;
  project_id?: number;
  organization_id?: number;
  rating?: number;
  content?: string;
  is_public?: boolean;
}
