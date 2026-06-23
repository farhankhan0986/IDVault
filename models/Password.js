import mongoose from "mongoose";

export const PASSWORD_CATEGORIES = [
  "Social",
  "Google",
  "Work",
  "Finance",
  "Shopping",
  "Email",
  "Entertainment",
  "Other",
];

const PasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Human-readable label, e.g. "Gmail - Personal", "Netflix", "Work Slack"
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // The username / email used to log in to that account
    username: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    // AES-256-GCM encrypted password string (iv:tag:ciphertext in base64)
    encryptedPassword: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: PASSWORD_CATEGORIES,
      default: "Other",
    },

    // Optional URL for the service, e.g. "https://mail.google.com"
    website: {
      type: String,
      trim: true,
    },

    // Optional private notes
    notes: {
      type: String,
      maxlength: 500,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Password ||
  mongoose.model("Password", PasswordSchema);
