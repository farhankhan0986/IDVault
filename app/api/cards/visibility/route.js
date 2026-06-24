import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import Card from "../../../../models/Card";

function getAuthUserId(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET).userId;
  } catch {
    return null;
  }
}

// PATCH /api/cards/visibility — toggle isPublic for a specific card
export async function PATCH(req) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let cardId;
    try {
      const body = await req.json();
      cardId = body?.id;
    } catch { /* no body */ }

    const query = cardId
      ? { userId, _id: cardId }
      : { userId };

    const card = await Card.findOne(query);
    if (!card) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    card.isPublic = !card.isPublic;
    await card.save();

    return NextResponse.json(
      {
        message: card.isPublic ? "Card is now public" : "Card is now private",
        isPublic: card.isPublic,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[cards/visibility]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
