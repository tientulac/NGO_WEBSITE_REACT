import { Router } from "express";
import { ResponseEntity } from "../entities/response.entity";
import { BaseService } from "../services/Base.service";
import { FeedbackReview } from "../entities/feedbackReview.entity";
import { FeedbackReviewClass } from "../models/FeedbackReviewClass";

const router = Router();
const service = new BaseService<FeedbackReview, FeedbackReviewClass>(
  FeedbackReviewClass
);

router.get("/:campaign_id", async (req, res) => {
  try {
    const campaign_id = Number(req.params.campaign_id);
    const result = (await service.getAll()).filter(
      (item) => item.project_id === campaign_id
    );
    res.status(200).json(<ResponseEntity<FeedbackReview>>{
      data: result,
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
