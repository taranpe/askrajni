import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM services WHERE is_active = 1 ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const price = formData.get("price");
    const old_price = formData.get("old_price");
    const discount = formData.get("discount");
    const description = formData.get("description");  
    
    const image = formData.get("image") as File;

    if (!title || !price || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + image.name.replace(/\s/g, "");
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const uploadPath = path.join(uploadDir, fileName);

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    fs.writeFileSync(uploadPath, buffer);

    await db.query(
      `INSERT INTO services (title, image_url, price, old_price, discount, description, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [title, `/uploads/${fileName}`, price, old_price, discount, description] // ✅ description included
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

    const formData = await req.formData();
    const title = formData.get("title");
    const price = formData.get("price");
    const old_price = formData.get("old_price");
    const discount = formData.get("discount");
    const description = formData.get("description"); // ✅ added
    const image = formData.get("image") as File | null;

    if (!title || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let image_url = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = Date.now() + "-" + image.name.replace(/\s/g, "");
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const uploadPath = path.join(uploadDir, fileName);

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      fs.writeFileSync(uploadPath, buffer);

      image_url = `/uploads/${fileName}`;
    }

    let query = "UPDATE services SET title=?, price=?, old_price=?, discount=?, description=?";
    const params: any[] = [title, price, old_price, discount, description]; // ✅ description included

    if (image_url) {
      query += ", image_url=?";
      params.push(image_url);
    }

    query += " WHERE id=?";
    params.push(id);

    await db.query(query, params);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

    // Soft delete by setting is_active = 0
    await db.query("UPDATE services SET is_active=0 WHERE id=?", [id]);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
