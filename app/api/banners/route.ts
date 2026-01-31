import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

/* =====================
   GET – active banners
===================== */
export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM banners WHERE is_active=1 ORDER BY banner_type, position ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}

/* =====================
   POST – upload banner
===================== */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File;
    const type = formData.get("banner_type") as string;
    const position = Number(formData.get("position"));

    if (!file || !type) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    /* 🔥 Upload to Cloudinary */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "askrajni/banners" },
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    /* Remove old banner at same position */
    await db.query(
      "DELETE FROM banners WHERE banner_type=? AND position=?",
      [type, position]
    );

    await db.query(
      "INSERT INTO banners (image_url, banner_type, position, is_active) VALUES (?,?,?,1)",
      [imageUrl, type, position]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
