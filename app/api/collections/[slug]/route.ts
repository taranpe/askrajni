import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const [rows]: any = await db.query(
      `
      SELECT p.*
      FROM services p
      INNER JOIN collections c ON p.collection_id = c.id
      WHERE c.slug = ?
        AND p.is_active = 1
      ORDER BY p.id DESC
      `,
      [slug]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
