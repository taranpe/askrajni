// lib/db.ts
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load .env file from project root
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST as string,           // TypeScript needs "as string"
  port: Number(process.env.DB_PORT) || 20387,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
});
