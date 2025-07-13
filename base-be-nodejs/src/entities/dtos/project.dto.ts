import { BaseEntity } from "../base.entity";
import { FeedbackReview } from "../feedbackReview.entity";
import { ProjectDetail } from "../projectDetail.entity";

export interface ProjectDTO extends BaseEntity {
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
  public?: boolean;

  // DTO
  detail: ProjectDetail;
  feedbackReviews: FeedbackReview[];
}
