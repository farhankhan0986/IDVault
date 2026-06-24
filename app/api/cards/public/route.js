import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Card from "../../../../models/Card";

// GET /api/cards/public — fetch all public cards (no auth required)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "recent"; // "recent" | "popular"
    const q = searchParams.get("q") || "";

    const query = { isPublic: true };

    if (q.trim()) {
      const regex = new RegExp(q.trim(), "i");
      query.$or = [
        { fullName: regex },
        { title: regex },
        { location: regex },
      ];
    }

    const sortOption =
      sort === "popular" ? { likesCount: -1 } : { createdAt: -1 };

    const cards = await Card.find(query)
      .sort(sortOption)
      .select("-likedBy") // never expose IP list
      .limit(100)
      .lean();

    return NextResponse.json({ cards }, { status: 200 });
  } catch (error) {
    console.error("[cards/public GET]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
