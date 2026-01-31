import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

/* =========================
   GET – list collections
========================= */
export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM collections ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}

/* =========================
   POST – create collection
========================= */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    let image_url: string | null = null;

    /* 🔥 Upload image to Cloudinary */
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "askrajni/collections" },
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

      image_url = uploadResult.secure_url;
    }

    await db.query(
      "INSERT INTO collections (name, slug, image_url) VALUES (?, ?, ?)",
      [name, slug, image_url]
    );

    return NextResponse.json({ success: true, created: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* =========================
   PUT – update collection
========================= */
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const image = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    let image_url: string | null = null;

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "askrajni/collections" },
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

      image_url = uploadResult.secure_url;
    }

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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* =========================
   DELETE – delete collection
========================= */
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.query("DELETE FROM collections WHERE id=?", [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
