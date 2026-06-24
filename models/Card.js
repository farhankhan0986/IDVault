import mongoose from "mongoose";

const DigitalCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    contactEmail: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    resumeLink: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    // Stores IP or fingerprint strings to prevent duplicate likes
    likedBy: {
      type: [String],
      default: [],
      select: false, // never leak this to clients
    },
  },
  { timestamps: true }
);

export default mongoose.models.DigitalCard ||
  mongoose.model("DigitalCard", DigitalCardSchema);
