import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import Password from "../../../../models/Password";
import { decrypt } from "../../../../lib/encryption";

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

export async function GET(req) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // optional filter

    await connectDB();

    const query = { userId };
    if (category && category !== "All") {
      query.category = category;
    }

    const entries = await Password.find(query).sort({ updatedAt: -1 });

    // Decrypt passwords before returning
    const decrypted = entries.map((e) => {
      let password = "";
      try {
        password = decrypt(e.encryptedPassword);
      } catch {
        password = ""; // decryption failed corrupted record
      }
      return {
        _id: e._id,
        label: e.label,
        username: e.username,
        password,
        category: e.category,
        website: e.website,
        notes: e.notes,
        isFavorite: e.isFavorite,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      };
    });

    return NextResponse.json({ entries: decrypted }, { status: 200 });
  } catch (error) {
    console.error("[passwords/list]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
