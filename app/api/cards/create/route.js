import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";
import Card from "../../../../models/Card";

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    await connectDB();

    // Prevent multiple cards
    const existing = await Card.findOne({ userId });
    if (existing) {
      return NextResponse.json(
        { message: "Card already exists" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const title = formData.get("title");
    const bio = formData.get("bio");
    const contactEmail = formData.get("contactEmail");
    const phone = formData.get("phone");
    const location = formData.get("location");
    const linkedin = formData.get("linkedin");
    const github = formData.get("github");
    const imageFile = formData.get("profileImage");

    if (!fullName) {
      return NextResponse.json(
        { message: "Full name is required" },
        { status: 400 }
      );
    }

    // ⬆️ Upload image to Cloudinary
    let imageUrl = "/default-avatar.png";

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "idvault/cards",
            resource_type: "image",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    await Card.create({
      userId,
      fullName,
      title,
      bio,
      contactEmail,
      phone,
      location,
      linkedin,
      github,
      profileImage: imageUrl,
    });

    return NextResponse.json(
      { message: "Card created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create card error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
