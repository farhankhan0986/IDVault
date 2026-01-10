import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Card from "../../../../../models/Card";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const card = await Card.findById(id);

    if (!card || !card.isActive) {
      return NextResponse.json(
        { message: "Card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ card }, { status: 200 });
  } catch (error) {
    console.error("Public card error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
