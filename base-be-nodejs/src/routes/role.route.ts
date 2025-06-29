import { Router, Request, Response } from "express";
import { db } from "../db";
import { Role } from "../entities/role.entity";
import { ResponseEntity } from "../entities/response.entity";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM t_role WHERE deleted_at IS NULL OR deleted_at::text = ''"
    );
    const roles = <Role[]>result.rows;

    res.status(200).json(<ResponseEntity<Role[]>>{
      data: roles,
      status: 200,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<null>>{
      status: 500,
      message: err,
    });
  }
});

router.post("/save", async (req, res) => {
  const role = <Role>req.body;
  try {
    if (role.id) {
      await db.query(
        `UPDATE t_role SET code = $1, name = $2, updated_by = $3, updated_at = NOW()
       WHERE id = $4`,
        [role.code, role.name, role.updated_by, role.id]
      );
      res.status(200).json(<ResponseEntity<any>>{
        status: 200,
      });
    } else {
      await db.query(
        `INSERT INTO t_role (code, name, created_by, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
        [role.code, role.name, role.created_by]
      );
      res.status(200).json(<ResponseEntity<any>>{
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).json(<ResponseEntity<any>>{
      status: 500,
      message: err,
    });
  }
});

router.post("/delete", async (req, res) => {
  const role = <Role>req.body;

  try {
    await db.query(
      `UPDATE t_role 
       SET deleted_at = NOW(), deleted_by = $1 
       WHERE id = $2`,
      [role.deleted_by, role.id]
    );
    res.status(200).json(<ResponseEntity<any>>{
      status: 200,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<any>>{
      status: 500,
      message: err,
    });
  }
});

export default router;
