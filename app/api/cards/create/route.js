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

    const formData = await req.formData();

    const cardType   = formData.get("cardType")   || "professional";
    const cardName   = formData.get("cardName")   || "";
    const fullName   = formData.get("fullName");
    const title      = formData.get("title");
    const bio        = formData.get("bio");
    const contactEmail = formData.get("contactEmail");
    const phone      = formData.get("phone");
    const location   = formData.get("location");
    const institution = formData.get("institution") || "";
    const openToWork  = formData.get("openToWork") === "true";
    const imageFile  = formData.get("profileImage");

    let techStack = [];
    try {
      const raw = formData.get("techStack");
      if (raw) techStack = JSON.parse(raw).filter(Boolean).slice(0, 8);
    } catch { /* ignore */ }

    let links = [];
    try {
      const raw = formData.get("links");
      if (raw) links = JSON.parse(raw).filter((l) => l.label && l.url).slice(0, 3);
    } catch { /* ignore malformed */ }

    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return NextResponse.json(
        { message: "Invalid phone number format" },
        { status: 400 }
      );
    }

    if (!fullName) {
      return NextResponse.json(
        { message: "Full name is required" },
        { status: 400 }
      );
    }

    // One card per user
    const existing = await Card.findOne({ userId });
    if (existing) {
      return NextResponse.json(
        { message: "You already have a card. Edit your existing card instead." },
        { status: 409 }
      );
    }

    let imageUrl = "/default-avatar.png";

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "idvault/cards", resource_type: "image" },
          (err, result) => { if (err) reject(err); else resolve(result); }
        ).end(buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    await Card.create({
      userId,
      cardType,
      cardName,
      fullName,
      title,
      bio,
      contactEmail,
      phone,
      location,
      institution,
      openToWork,
      techStack,
      links,
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
