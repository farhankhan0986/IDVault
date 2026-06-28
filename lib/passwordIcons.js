import {
  FaGoogle, FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
  FaYoutube, FaWhatsapp, FaAmazon, FaGithub,
  FaSlack, FaEnvelope, FaKey, FaShoppingBag, FaPlay,
  FaBriefcase, FaUsers, FaUniversity, FaCreditCard,
} from "react-icons/fa";
import {
  SiNetflix, SiGmail, SiGoogledrive, SiGooglepay,
  SiFlipkart, SiNotion, SiFigma, SiProtonmail, SiPaytm,
  SiSpotify, SiX, SiSnapchat,
} from "react-icons/si";

export const LABEL_ICONS = {
  // Google
  "google account":    { Icon: FaGoogle,      color: "#ea4335" },
  "google work":       { Icon: FaGoogle,      color: "#ea4335" },
  "gmail personal":    { Icon: SiGmail,       color: "#ea4335" },
  "gmail work":        { Icon: SiGmail,       color: "#ea4335" },
  "google drive":      { Icon: SiGoogledrive, color: "#4285f4" },
  "google drive work": { Icon: SiGoogledrive, color: "#4285f4" },
  // Social
  "instagram":         { Icon: FaInstagram,   color: "#e1306c" },
  "facebook":          { Icon: FaFacebook,    color: "#1877f2" },
  "twitter":           { Icon: FaTwitter,     color: "#1da1f2" },
  "x":                 { Icon: SiX,           color: "#000000" },
  "linkedin":          { Icon: FaLinkedin,    color: "#0077b5" },
  "youtube":           { Icon: FaYoutube,     color: "#ff0000" },
  "snapchat":          { Icon: SiSnapchat,    color: "#FFCA28" },
  "whatsapp":          { Icon: FaWhatsapp,    color: "#25d366" },
  // Entertainment
  "netflix":           { Icon: SiNetflix,     color: "#e50914" },
  "spotify":           { Icon: SiSpotify,     color: "#1db954" },
  "prime video":       { Icon: FaAmazon,      color: "#00a8e0" },
  "disney+ hotstar":   { Icon: FaPlay,        color: "#0f3cc9" },
  "hotstar":           { Icon: FaPlay,        color: "#0f3cc9" },
  // Finance
  "hdfc bank":         { Icon: FaUniversity,  color: "#004c8f" },
  "sbi net banking":   { Icon: FaUniversity,  color: "#2d6cc0" },
  "icici bank":        { Icon: FaUniversity,  color: "#f26522" },
  "paytm":             { Icon: SiPaytm,       color: "#00baf2" },
  "gpay":              { Icon: SiGooglepay,   color: "#4285f4" },
  // Shopping
  "amazon":            { Icon: FaAmazon,      color: "#ff9900" },
  "flipkart":          { Icon: SiFlipkart,    color: "#2874f0" },
  "myntra":            { Icon: FaShoppingBag, color: "#ff3f6c" },
  // Work / Dev
  "github":            { Icon: FaGithub,      color: "#6e7681" },
  "slack":             { Icon: FaSlack,       color: "#4a154b" },
  "notion":            { Icon: SiNotion,      color: "#71717a" },
  "figma":             { Icon: SiFigma,       color: "#f24e1e" },
  // Email
  "outlook":           { Icon: FaEnvelope,    color: "#0078d4" },
  "yahoo mail":        { Icon: FaEnvelope,    color: "#720e9e" },
  "protonmail":        { Icon: SiProtonmail,  color: "#6d4aff" },
};

export const CATEGORY_ICONS = {
  Google:        { Icon: FaGoogle,      color: "#4285f4" },
  Social:        { Icon: FaUsers,       color: "#1d9bf0" },
  Entertainment: { Icon: FaPlay,        color: "#8b5cf6" },
  Finance:       { Icon: FaCreditCard,  color: "#10b981" },
  Shopping:      { Icon: FaShoppingBag, color: "#f59e0b" },
  Work:          { Icon: FaBriefcase,   color: "#6366f1" },
  Email:         { Icon: FaEnvelope,    color: "#0078d4" },
  Other:         { Icon: FaKey,         color: "#71717a" },
};

export function getPasswordIcon(label, category) {
  const key = label?.toLowerCase().trim();
  return LABEL_ICONS[key] || CATEGORY_ICONS[category] || CATEGORY_ICONS.Other;
}
