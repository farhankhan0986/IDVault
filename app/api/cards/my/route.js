import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import Card from "../../../../models/Card";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.userId;

    await connectDB();

    const userCard = await Card.findOne({ userId });

    if (!userCard) {
      return NextResponse.json({ card: null }, { status: 200 });
    }

    return NextResponse.json({ card: userCard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user card:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
