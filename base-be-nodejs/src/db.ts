import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const db = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err: any) => console.error("❌ DB Error", err));
