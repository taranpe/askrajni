import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET() {
  const [rows] = await db.query(
    "SELECT * FROM banners WHERE is_active=1 ORDER BY banner_type, position ASC"
  );
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const type = formData.get("banner_type") as string;
  const position = Number(formData.get("position"));

  if (!file || !type) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  const imageUrl = `/uploads/${fileName}`;

  // Remove old banner at same position
  await db.query(
    "DELETE FROM banners WHERE banner_type=? AND position=?",
    [type, position]
  );

  await db.query(
    "INSERT INTO banners (image_url, banner_type, position) VALUES (?,?,?)",
    [imageUrl, type, position]
  );

  return NextResponse.json({ success: true });
}
