// app/api/cards/update/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";
import Card from "../../../../models/Card";

export async function PUT(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    await connectDB();

    const card = await Card.findOne({ userId });
    if (!card) {
      return NextResponse.json(
        { message: "Card not found" },
        { status: 404 }
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
    const resumeLink = formData.get("resumeLink");

    if (fullName !== null) card.fullName = fullName;
    if (title !== null) card.title = title;
    if (bio !== null) card.bio = bio;
    if (contactEmail !== null) card.contactEmail = contactEmail;
    if (phone !== null) card.phone = phone;
    if (location !== null) card.location = location;
    if (linkedin !== null) card.linkedin = linkedin;
    if (github !== null) card.github = github;
    if (resumeLink !== null) card.resumeLink = resumeLink;

    // Update image only if a new one is sent
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

      card.profileImage = uploadResult.secure_url;
    }

    await card.save();
    return NextResponse.json(
      { message: "Card updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update card error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
