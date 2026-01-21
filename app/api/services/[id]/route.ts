import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } } // ✅ params must be { id: string }
) {
  try {
    const { id } = params; // no need to await

    // Convert id to number (assuming your DB uses numeric IDs)
    const serviceId = Number(id);
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }

    // Query the database
    const [rows]: any = await db.query(
      "SELECT * FROM services WHERE id = ? AND is_active = 1",
      [serviceId]
    );

    // Check if service exists
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Return first row (single service)
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
