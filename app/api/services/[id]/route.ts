import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // ✅ correct

  const [rows]: any = await db.query(
    "SELECT * FROM services WHERE id = ? AND is_active = 1",
    [id]
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}
