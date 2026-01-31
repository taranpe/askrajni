import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

/* ===================== GET ===================== */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        services.*,
        collections.name AS collection_name
      FROM services
      LEFT JOIN collections 
        ON services.collection_id = collections.id
      WHERE services.is_active = 1
      ORDER BY services.id DESC
    `);

    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 500 });
  }
}

/* ===================== POST ===================== */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const old_price = formData.get("old_price") as string;
    const discount = formData.get("discount") as string;
    const description = formData.get("description") as string;
    const collection_id = formData.get("collection_id") as string;
    const image = formData.get("image") as File;

    if (!title || !price || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🔥 Upload image to Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "askrajni/services" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    const image_url = uploadResult.secure_url;

    await db.query(
      `INSERT INTO services 
      (title, image_url, price, old_price, discount, description, collection_id, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        title,
        image_url,
        price,
        old_price,
        discount,
        description,
        collection_id || null,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

/* ===================== PUT ===================== */
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID missing" }, { status: 400 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const old_price = formData.get("old_price") as string;
    const discount = formData.get("discount") as string;
    const description = formData.get("description") as string;
    const collection_id = formData.get("collection_id") as string;
    const image = formData.get("image") as File | null;

    let image_url: string | null = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "askrajni/services" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      image_url = uploadResult.secure_url;
    }

    let query = `
      UPDATE services 
      SET title=?, price=?, old_price=?, discount=?, description=?, collection_id=?
    `;

    const params: any[] = [
      title,
      price,
      old_price,
      discount,
      description,
      collection_id || null,
    ];

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

/* ===================== DELETE ===================== */
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID missing" }, { status: 400 });
    }

    await db.query("UPDATE services SET is_active=0 WHERE id=?", [id]);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
