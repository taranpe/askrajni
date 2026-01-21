import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  context: { params: Params | Promise<Params> }
) {
  try {
    // ✅ Handle both Promise & object (Next.js 16 fix)
    const resolvedParams =
      context.params instanceof Promise
        ? await context.params
        : context.params;

    const { id } = resolvedParams;

    const serviceId = Number(id);
    if (!id || isNaN(serviceId)) {
      return NextResponse.json(
        { success: false, message: "Invalid service ID" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT * FROM services WHERE id = ? AND is_active = 1",
      [serviceId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("GET /api/services/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
