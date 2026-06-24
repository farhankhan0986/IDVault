import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Card from "../../../../../models/Card";

function getVisitorId(req) {
  // Use forwarded IP (Vercel / proxies) or fallback to remoteAddress
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// POST /api/cards/like/[id] — like or un-like a public card
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const visitorId = getVisitorId(req);

    await connectDB();

    // Explicitly select likedBy (marked select:false in schema)
    const card = await Card.findById(id).select("+likedBy");

    if (!card || !card.isPublic) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    // Guard: old documents may not have the likedBy array yet
    if (!Array.isArray(card.likedBy)) {
      card.likedBy = [];
    }

    const alreadyLiked = card.likedBy.includes(visitorId);

    if (alreadyLiked) {
      // Un-like
      card.likedBy = card.likedBy.filter((v) => v !== visitorId);
      card.likesCount = Math.max(0, (card.likesCount ?? 0) - 1);
    } else {
      // Like
      card.likedBy.push(visitorId);
      card.likesCount = (card.likesCount ?? 0) + 1;
    }

    await card.save();

    return NextResponse.json(
      { likesCount: card.likesCount, liked: !alreadyLiked },
      { status: 200 }
    );
  } catch (error) {
    console.error("[cards/like]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
