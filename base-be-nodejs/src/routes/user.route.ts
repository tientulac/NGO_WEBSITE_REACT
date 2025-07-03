import { Router, Request, Response } from "express";
import { db } from "../db";
import { User } from "../entities/user.entity";
import { ResponseEntity } from "../entities/response.entity";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM t_user");
    const records = <User[]>result.rows;
    records.forEach((record) => {
      record.password = undefined;
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
      await db.query(
        `UPDATE t_user
         SET 
             role_code = $1,
             full_name = $2,
             address = $3,
             phone = $4,
             email = $5,
             bank_account = $6,
             bank_name = $7,
             avatar = $8,
             is_active = $9,
             updated_by = $10,
             updated_at = NOW()
         WHERE id = $11 AND deleted_at IS NULL
         RETURNING *`,
        [
          record.role_code,
          record.full_name,
          record.address,
          record.phone,
          record.email,
          record.bank_account,
          record.bank_name,
          record.avatar,
          record.is_active,
          record.updated_by,
          record.id,
        ]
      );

      res.status(200).json(<ResponseEntity<any>>{
        status: 200,
      });
    } else {
      await db.query(
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
          is_active,
          created_by,
          created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13, $14, NOW()
        )
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
          record.is_active,
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

router.post("/login", async (req, res) => {
  const record = <User>req.body;

  try {
    const result = await db.query(
      `SELECT *
       FROM t_user
       WHERE user_name = $1 AND password = $2 AND is_active = true AND deleted_at IS NULL
       LIMIT 1`,
      [record.user_name, record.password]
    );

    if (result.rows.length === 0) {
      res.status(401).json({
        status: 401,
        message: "Tên đăng nhập hoặc mật khẩu không đúng.",
      });
    }

    const user = <User>result.rows[0];
    user.password = undefined;
    const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    user.token = token;
    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    res.status(500).json(<ResponseEntity<any>>{
      status: 500,
      message: err,
    });
  }
});

export default router;
