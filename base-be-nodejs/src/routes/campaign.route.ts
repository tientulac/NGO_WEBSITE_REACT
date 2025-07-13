import { Router } from "express";
import { ResponseEntity } from "../entities/response.entity";
import { BaseService } from "../services/Base.service";
import { Project } from "../entities/project.entity";
import { ProjectClass } from "../models/ProjectClass";

const router = Router();
const service = new BaseService<Project, ProjectClass>(ProjectClass);

router.get("/list", async (req, res) => {
  try {
    const result = await service.getAll();
    res.status(200).json(<ResponseEntity<Project[]>>{
      data: result.filter(
        (item) =>
          item.field_type?.toUpperCase() === "CAMPAIGN" && item.public === true
      ),
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
