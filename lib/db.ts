import mysql from "mysql2/promise";
export const dynamic = "force-dynamic";

export const db = mysql.createPool({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,

  // ✅ REQUIRED for Vercel + Aiven
  ssl: {
    rejectUnauthorized: false,
  },

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});
