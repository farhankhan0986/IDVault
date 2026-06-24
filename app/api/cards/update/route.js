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

    const formData = await req.formData();

    const cardId      = formData.get("cardId");
    const cardType    = formData.get("cardType");
    const cardName    = formData.get("cardName");
    const fullName    = formData.get("fullName");
    const title       = formData.get("title");
    const bio         = formData.get("bio");
    const contactEmail= formData.get("contactEmail");
    const phone       = formData.get("phone");
    const location    = formData.get("location");
    const institution = formData.get("institution");
    const openToWork  = formData.get("openToWork");
    const linkedin    = formData.get("linkedin");
    const github      = formData.get("github");
    const resumeLink  = formData.get("resumeLink");
    const imageFile   = formData.get("profileImage");

    let techStack = null;
    try {
      const raw = formData.get("techStack");
      if (raw !== null) techStack = JSON.parse(raw).filter(Boolean).slice(0, 8);
    } catch { /* ignore */ }

    // Find the specific card (or fall back to first card for old callers)
    const query = cardId
      ? { userId, _id: cardId }
      : { userId };
    const card = await Card.findOne(query);
    if (!card) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    // Parse flexible links — strip empty-url entries, keep up to 3
    let links = null;
    try {
      const raw = formData.get("links");
      if (raw !== null) {
        links = JSON.parse(raw)
          .filter((l) => l && typeof l.label === "string" && typeof l.url === "string" && l.url.trim() !== "")
          .map(({ label, url }) => ({ label: label.trim(), url: url.trim() }))
          .slice(0, 3);
      }
    } catch { /* ignore malformed JSON */ }

    const $set = {};
    if (cardType    !== null) $set.cardType    = cardType;
    if (cardName    !== null) $set.cardName    = cardName;
    if (fullName    !== null) $set.fullName    = fullName;
    if (title       !== null) $set.title       = title;
    if (bio         !== null) $set.bio         = bio;
    if (contactEmail!== null) $set.contactEmail= contactEmail;
    if (phone       !== null) $set.phone       = phone;
    if (location    !== null) $set.location    = location;
    if (institution !== null) $set.institution = institution;
    if (openToWork  !== null) $set.openToWork  = openToWork === "true";
    if (techStack   !== null) $set.techStack   = techStack;
    if (linkedin    !== null) $set.linkedin    = linkedin;
    if (github      !== null) $set.github      = github;
    if (resumeLink  !== null) $set.resumeLink  = resumeLink;

    if (links !== null) {
      $set.links = links;
      // Clear legacy fields so they don't reappear when new-style links are deleted
      if (linkedin === null) $set.linkedin = "";
      if (github === null) $set.github = "";
      if (resumeLink === null) $set.resumeLink = "";
    }

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

    await Card.updateOne({ _id: card._id }, { $set });

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
