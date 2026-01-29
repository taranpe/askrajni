import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

/* =========================
   GET – list collections
========================= */
export async function GET() {
  const [rows] = await db.query(
    "SELECT * FROM collections ORDER BY id DESC"
  );
  return NextResponse.json(rows);
}

/* =========================
   POST – create OR update
========================= */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const id = formData.get("id") as string | null;
    const image = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json(
        { error: "Name required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    let image_url: string | null = null;

    /* ===== Image upload ===== */
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = Date.now() + "-" + image.name.replace(/\s/g, "");
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);
      image_url = `/uploads/${fileName}`;
    }

    /* ===== UPDATE ===== */
    if (id) {
      if (image_url) {
        await db.query(
          "UPDATE collections SET name=?, slug=?, image_url=? WHERE id=?",
          [name, slug, image_url, id]
        );
      } else {
        await db.query(
          "UPDATE collections SET name=?, slug=? WHERE id=?",
          [name, slug, id]
        );
      }

      return NextResponse.json({ success: true, updated: true });
    }

    /* ===== CREATE ===== */
    await db.query(
      "INSERT INTO collections (name, slug, image_url) VALUES (?, ?, ?)",
      [name, slug, image_url]
    );

    return NextResponse.json({ success: true, created: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE – delete collection
========================= */
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID required" },
      { status: 400 }
    );
  }

  await db.query("DELETE FROM collections WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
