import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import Password from "../../../../models/Password";
import { encrypt } from "../../../../lib/encryption";

function getAuthUserId(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { label, username, password, category, website, notes, isFavorite } = body;

    if (!label || !password) {
      return NextResponse.json(
        { message: "Label and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const encryptedPassword = encrypt(password);

    const entry = await Password.create({
      userId,
      label: label.trim(),
      username: username?.trim() || "",
      encryptedPassword,
      category: category || "Other",
      website: website?.trim() || "",
      notes: notes?.trim() || "",
      isFavorite: isFavorite || false,
    });

    return NextResponse.json(
      {
        message: "Password saved",
        entry: {
          _id: entry._id,
          label: entry.label,
          username: entry.username,
          category: entry.category,
          website: entry.website,
          notes: entry.notes,
          isFavorite: entry.isFavorite,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[passwords/create]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
