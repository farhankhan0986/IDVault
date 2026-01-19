import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    await connectDB();

    const deletedUser = await User.findByIdAndDelete(decoded.userId);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
