import { Router } from "express";
import { ResponseEntity } from "../entities/response.entity";
import { BaseService } from "../services/Base.service";
import { Project } from "../entities/project.entity";
import { ProjectClass } from "../models/ProjectClass";
import { ProjectDTO } from "../entities/dtos/project.dto";
import { ProjectDetail } from "../entities/projectDetail.entity";
import { ProjectDetailClass } from "../models/ProjectDetailClass";
import { FeedbackReview } from "../entities/feedbackReview.entity";
import { FeedbackReviewClass } from "../models/FeedbackReviewClass";

const router = Router();
const service = new BaseService<Project, ProjectClass>(ProjectClass);
const detailService = new BaseService<ProjectDetail, ProjectDetailClass>(
  ProjectDetailClass
);
const feedbackReviewService = new BaseService<
  FeedbackReview,
  FeedbackReviewClass
>(FeedbackReviewClass);

router.get("/list", async (req, res) => {
  try {
    const result = await service.getAll();

    const campaigns = <ProjectDTO[]>(
      result.filter(
        (item) =>
          item.field_type?.toUpperCase() === "CAMPAIGN" && item.public === true
      )
    );

    await Promise.all(
      campaigns.map(async (item) => {
        item.detail = <ProjectDetail>(
          await detailService.findOne("project_id", item.id ?? 0)
        );
        item.feedbackReviews = (await feedbackReviewService.getAll()).filter(
          (feedback) => feedback.project_id === item.id
        );
      })
    );

    res.status(200).json(<ResponseEntity<ProjectDTO[]>>{
      data: campaigns,
      status: 200,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<null>>{
      status: 500,
      message: (err as Error).message,
    });
  }
});

router.get("/:campaign_id", async (req, res) => {
  try {
    const campaign_id = Number(req.params.campaign_id);
    const result = await service.findOne("id", campaign_id);
    const campaign = <ProjectDTO>result;
    campaign.detail = <ProjectDetail>(
      await detailService.findOne("project_id", campaign.id ?? 0)
    );
    campaign.feedbackReviews = (await feedbackReviewService.getAll()).filter(
      (feedback) => feedback.project_id === campaign.id
    );
    res.status(200).json(<ResponseEntity<ProjectDTO>>{
      data: campaign,
      status: 200,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<null>>{
      status: 500,
      message: err,
    });
  }
});

export default router;
