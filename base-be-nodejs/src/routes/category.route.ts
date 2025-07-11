import { Router } from "express";
import { ResponseEntity } from "../entities/response.entity";
import { BaseService } from "../services/Base.service";
import { Category } from "../entities/category.entity";
import { CategoryClass } from "../models/CategoryClass";

const router = Router();
const service = new BaseService<Category, CategoryClass>(CategoryClass);

router.get("/list", async (req, res) => {
  try {
    const result = await service.getAll();
    res.status(200).json(<ResponseEntity<Category[]>>{
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
