import { Router } from "express";
import { ResponseEntity } from "../entities/response.entity";
import { BaseService } from "../services/Base.service";
import { ProjectDetail } from "../entities/projectDetail.entity";
import { ProjectDetailClass } from "../models/ProjectDetailClass";

const router = Router();
const service = new BaseService<ProjectDetail, ProjectDetailClass>(
  ProjectDetailClass
);

router.get("/:campaign_id", async (req, res) => {
  try {
    const campaign_id = Number(req.params.campaign_id);
    const result = (await service.getAll()).find(
      (item) => item.project_id === campaign_id
    );
    res.status(200).json(<ResponseEntity<ProjectDetail>>{
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
