import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // no need to await

    // Convert id to number if using SQL
    const serviceId = Number(id);
    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const [rows]: any = await db.query(
      "SELECT * FROM services WHERE id = ? AND is_active = 1",
      [serviceId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
