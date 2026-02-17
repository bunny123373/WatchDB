import { NextRequest, NextResponse } from "next/server";

// POST /api/admin/verify - Verify admin key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key } = body;

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Admin key is required" },
        { status: 400 }
      );
    }

    if (key === process.env.ADMIN_KEY) {
      return NextResponse.json({
        success: true,
        message: "Admin key verified",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin key" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error verifying admin key:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify admin key" },
      { status: 500 }
    );
  }
}
