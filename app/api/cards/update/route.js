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

    const fullName    = formData.get("fullName");
    const title       = formData.get("title");
    const bio         = formData.get("bio");
    const contactEmail= formData.get("contactEmail");
    const phone       = formData.get("phone");
    const location    = formData.get("location");
    const linkedin    = formData.get("linkedin");
    const github      = formData.get("github");
    const resumeLink  = formData.get("resumeLink");
    const imageFile   = formData.get("profileImage");

    // Parse flexible links — strip empty-url entries; keep up to 3
    let links = null;
    try {
      const raw = formData.get("links");
      if (raw !== null) {
        links = JSON.parse(raw)
          .filter((l) => l && typeof l.label === "string" && typeof l.url === "string" && l.url.trim() !== "")
          .map(({ label, url }) => ({ label: label.trim(), url: url.trim() })) // strip _id from old docs
          .slice(0, 3);
      }
    } catch { /* ignore malformed JSON */ }

    // Build $set payload for scalar fields
    const $set = {};
    if (fullName     !== null) $set.fullName     = fullName;
    if (title        !== null) $set.title        = title;
    if (bio          !== null) $set.bio          = bio;
    if (contactEmail !== null) $set.contactEmail = contactEmail;
    if (phone        !== null) $set.phone        = phone;
    if (location     !== null) $set.location     = location;
    if (linkedin     !== null) $set.linkedin     = linkedin;
    if (github       !== null) $set.github       = github;
    if (resumeLink   !== null) $set.resumeLink   = resumeLink;
    // Always write links via $set to bypass Mongoose change-tracking for subdoc arrays
    if (links !== null) $set.links = links;

    // Upload new profile image if provided
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "idvault/cards", resource_type: "image" },
          (err, result) => { if (err) reject(err); else resolve(result); }
        ).end(buffer);
      });
      $set.profileImage = uploadResult.secure_url;
    }

    // Direct MongoDB $set — avoids all Mongoose change-tracking issues
    await Card.updateOne({ userId }, { $set });

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
