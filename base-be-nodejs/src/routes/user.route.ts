import { Router, Request, Response } from "express";
import { db } from "../db";
import { User } from "../entities/user.entity";
import { ResponseEntity } from "../entities/response.entity";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM t_user");
    const records = <User[]>result.rows;
    records.forEach((record) => {
      record.password = undefined; // Remove password from response
    });
    res.status(200).json(<ResponseEntity<User[]>>{
      data: records,
      status: 200,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<any>>{
      status: 500,
      message: err,
    });
  }
});

router.post("/save", async (req, res) => {
  const record = <User>req.body;

  try {
    if (record.id) {
      // UPDATE
      const result = await db.query(
        `UPDATE t_user
         SET code = $1,
             role_code = $2,
             full_name = $3,
             address = $4,
             phone = $5,
             email = $6,
             bank_account = $7,
             bank_name = $8,
             avatar = $9,
             updated_by = $12,
             updated_at = NOW()
         WHERE id = $13 AND deleted_at IS NULL
         RETURNING *`,
        [
          record.code,
          record.role_code,
          record.full_name,
          record.address,
          record.phone,
          record.email,
          record.bank_account,
          record.bank_name,
          record.avatar,
          record.updated_by,
          record.id,
        ]
      );

      res.status(200).json(<ResponseEntity<any>>{
        status: 200,
      });
    } else {
      // INSERT
      const result = await db.query(
        `INSERT INTO t_user (
          code,
          role_code,
          full_name,
          address,
          phone,
          email,
          bank_account,
          bank_name,
          avatar,
          user_name,
          password,
          created_by,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
        RETURNING *`,
        [
          record.code,
          record.role_code,
          record.full_name,
          record.address,
          record.phone,
          record.email,
          record.bank_account,
          record.bank_name,
          record.avatar,
          record.user_name,
          record.password,
          record.created_by,
        ]
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
  const record = <User>req.body;

  try {
    await db.query(
      `UPDATE t_user 
       SET deleted_at = NOW(), deleted_by = $1 
       WHERE id = $2 AND deleted_at IS NULL 
       RETURNING *`,
      [record.deleted_by, record.id]
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
