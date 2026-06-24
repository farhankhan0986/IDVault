import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Card from "../../../../models/Card";

// GET /api/cards/public — fetch all public cards (no auth required)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const sort     = searchParams.get("sort")     || "recent";
    const q        = searchParams.get("q")        || "";
    const cardType = searchParams.get("cardType") || "";

    const query = { isPublic: true };

    if (q.trim()) {
      const regex = new RegExp(q.trim(), "i");
      query.$or = [
        { fullName: regex },
        { title: regex },
        { location: regex },
        { cardName: regex },
      ];
    }

    if (cardType && cardType !== "all") {
      query.cardType = cardType;
    }

    const sortOption =
      sort === "popular" ? { likesCount: -1 } : { createdAt: -1 };

    const cards = await Card.find(query)
      .sort(sortOption)
      .select("-likedBy")
      .limit(100)
      .lean();

    return NextResponse.json({ cards }, { status: 200 });
  } catch (error) {
    console.error("[cards/public GET]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
