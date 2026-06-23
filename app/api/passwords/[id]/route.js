import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../../lib/db";
import Password from "../../../../../models/Password";
import { encrypt } from "../../../../../lib/encryption";

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

// PUT /api/passwords/[id] update a password entry
export async function PUT(req, { params }) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { label, username, password, category, website, notes, isFavorite } = body;

    await connectDB();

    const entry = await Password.findOne({ _id: id, userId });
    if (!entry) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (label !== undefined) entry.label = label.trim();
    if (username !== undefined) entry.username = username.trim();
    if (password !== undefined) entry.encryptedPassword = encrypt(password);
    if (category !== undefined) entry.category = category;
    if (website !== undefined) entry.website = website.trim();
    if (notes !== undefined) entry.notes = notes.trim();
    if (isFavorite !== undefined) entry.isFavorite = isFavorite;

    await entry.save();

    return NextResponse.json({ message: "Updated" }, { status: 200 });
  } catch (error) {
    console.error("[passwords/[id] PUT]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/passwords/[id] delete a password entry
export async function DELETE(req, { params }) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectDB();

    const result = await Password.findOneAndDelete({ _id: id, userId });
    if (!result) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("[passwords/[id] DELETE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
