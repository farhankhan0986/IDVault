import mongoose from "mongoose";

const DigitalCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // NOTE: unique index removed to allow multiple cards per user.
      // If upgrading an existing DB, drop the old index:
      //   db.digitalcards.dropIndex("userId_1")
    },
    cardType: {
      type: String,
      enum: ["professional", "developer", "creative", "student", "business"],
      default: "professional",
    },
    cardName: {
      type: String,
      trim: true,
      maxlength: 50,
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
    // Flexible link slots — max 3
    links: {
      type: [{ label: String, url: String }],
      default: [],
      validate: [(v) => v.length <= 3, "Maximum 3 links allowed"],
    },
    // Type-specific extra fields
    techStack: {
      type: [String],
      default: [],
      validate: [(v) => v.length <= 8, "Max 8 items"],
    },
    institution: {
      type: String,
      trim: true,
      default: "",
    },
    openToWork: {
      type: Boolean,
      default: false,
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
    likedBy: {
      type: [String],
      default: [],
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DigitalCard ||
  mongoose.model("DigitalCard", DigitalCardSchema);
