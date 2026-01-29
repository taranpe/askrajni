import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const [rows]: any = await db.query(
    `
    SELECT p.*
    FROM services p
    INNER JOIN collections c ON p.collection_id = c.id
    WHERE c.slug = ?
    ORDER BY p.id DESC
    `,
    [slug]
  );

  return NextResponse.json(rows);
}
