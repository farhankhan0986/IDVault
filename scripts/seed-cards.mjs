import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
const envVars = readFileSync(envPath, "utf-8");
for (const line of envVars.split("\n")) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not found in .env.local");

const DigitalCardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cardType: { type: String, enum: ["professional", "developer", "creative", "student", "business"], default: "professional" },
    cardName: { type: String, trim: true, maxlength: 50 },
    fullName: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    bio: { type: String, maxlength: 500, trim: true },
    contactEmail: { type: String, trim: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    linkedin: { type: String },
    github: { type: String },
    resumeLink: { type: String },
    profileImage: { type: String },
    links: { type: [{ label: String, url: String }], default: [] },
    techStack: { type: [String], default: [] },
    institution: { type: String, trim: true, default: "" },
    openToWork: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    likesCount: { type: Number, default: 0 },
    likedBy: { type: [String], default: [], select: false },
  },
  { timestamps: true }
);

const Card = mongoose.models.DigitalCard || mongoose.model("DigitalCard", DigitalCardSchema);

const MOCK_USER_ID = new mongoose.Types.ObjectId("000000000000000000000001");

const cards = [
  {
    userId: MOCK_USER_ID,
    cardType: "professional",
    cardName: "Leadership Card",
    fullName: "Simon Sinek",
    title: "Author & Leadership Expert",
    bio: "Optimist. Author of Start With Why. Helping leaders inspire action and build organizations where people feel they belong.",
    contactEmail: "simon@simonsinek.com",
    location: "New York, USA",
    linkedin: "https://linkedin.com/in/simonsinek",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Simon_Sinek_2011.jpg/440px-Simon_Sinek_2011.jpg",
    links: [
      { label: "Website", url: "https://simonsinek.com" },
      { label: "Books", url: "https://simonsinek.com/books" },
    ],
    isPublic: true,
    likesCount: 142,
  },
  {
    userId: MOCK_USER_ID,
    cardType: "developer",
    cardName: "Kernel Dev",
    fullName: "Linus Torvalds",
    title: "Creator of Linux & Git",
    bio: "I'm a software engineer who happens to have created Linux and Git. Bad taste in code is my biggest pet peeve.",
    contactEmail: "torvalds@linux-foundation.org",
    location: "Portland, Oregon, USA",
    github: "https://github.com/torvalds",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/440px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg",
    techStack: ["C", "Linux", "Git", "Assembly", "Bash"],
    links: [
      { label: "GitHub", url: "https://github.com/torvalds" },
      { label: "Linux Kernel", url: "https://kernel.org" },
    ],
    isPublic: true,
    likesCount: 389,
  },
  {
    userId: MOCK_USER_ID,
    cardType: "creative",
    cardName: "Vision Card",
    fullName: "Steve Jobs",
    title: "Co-founder, Apple Inc.",
    bio: "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The ones who see things differently.",
    contactEmail: "steve@apple.com",
    location: "Cupertino, California, USA",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/440px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
    links: [
      { label: "Apple", url: "https://apple.com" },
      { label: "Pixar", url: "https://pixar.com" },
    ],
    isPublic: true,
    likesCount: 521,
  },
  {
    userId: MOCK_USER_ID,
    cardType: "student",
    cardName: "Med Student → YouTuber",
    fullName: "Ali Abdaal",
    title: "Doctor, YouTuber & Author",
    bio: "Ex-doctor turned YouTuber. I make videos about productivity, studying, and building a life you enjoy. Author of Feel-Good Productivity.",
    contactEmail: "ali@aliabdaal.com",
    location: "London, UK",
    linkedin: "https://linkedin.com/in/aliabdaal",
    institution: "University of Cambridge",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ali_Abdaal_in_2022.jpg/440px-Ali_Abdaal_in_2022.jpg",
    links: [
      { label: "YouTube", url: "https://youtube.com/@aliabdaal" },
      { label: "Website", url: "https://aliabdaal.com" },
      { label: "Website", url: "https://feelgoodproductivity.com" },
    ],
    openToWork: false,
    isPublic: true,
    likesCount: 274,
  },
  {
    userId: MOCK_USER_ID,
    cardType: "creative",
    cardName: "King Khan",
    fullName: "Shah Rukh Khan",
    title: "Actor & Film Producer",
    bio: "Har pal yahan, jee bhar jiyo. Bollywood actor with 30+ years of cinema. Co-owner of Kolkata Knight Riders. Living proof that dreams don't have deadlines.",
    contactEmail: "srk@redchillies.com",
    location: "Mumbai, India",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Shah_Rukh_Khan_graces_the_launch_of_Blackberry_Bold_9900_%28cropped%29.jpg/440px-Shah_Rukh_Khan_graces_the_launch_of_Blackberry_Bold_9900_%28cropped%29.jpg",
    links: [
      { label: "Instagram", url: "https://instagram.com/iamsrk" },
      { label: "Twitter", url: "https://x.com/iamsrk" },
      { label: "Website", url: "https://redchillies.com" },
    ],
    isPublic: true,
    likesCount: 612,
  },
  {
    userId: MOCK_USER_ID,
    cardType: "professional",
    cardName: "CR7",
    fullName: "Cristiano Ronaldo",
    title: "Professional Footballer",
    bio: "5x Ballon d'Or winner. All-time top scorer in football history. Playing for Al Nassr. Founder of CR7 brand. SIUUU.",
    contactEmail: "cr7@cristianoronaldo.com",
    location: "Riyadh, Saudi Arabia",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/440px-Cristiano_Ronaldo_2018.jpg",
    links: [
      { label: "Instagram", url: "https://instagram.com/cristiano" },
      { label: "Website", url: "https://cristianoronaldo.com" },
    ],
    isPublic: true,
    likesCount: 734,
  },
  {
    userId: MOCK_USER_ID,
    cardType: "professional",
    cardName: "La Pulga",
    fullName: "Lionel Messi",
    title: "Professional Footballer",
    bio: "8x Ballon d'Or winner. FIFA World Cup Champion 2022. Playing for Inter Miami. The greatest of all time.",
    contactEmail: "messi@intermiami.com",
    location: "Miami, Florida, USA",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Messi_vs_Nigeria_2018.jpg/440px-Messi_vs_Nigeria_2018.jpg",
    links: [
      { label: "Instagram", url: "https://instagram.com/leomessi" },
      { label: "Website", url: "https://intermiamicf.com" },
    ],
    isPublic: true,
    likesCount: 891,
  },
  {
    userId: MOCK_USER_ID,
    cardType: "business",
    cardName: "Ventures",
    fullName: "Elon Musk",
    title: "CEO, Tesla & SpaceX",
    bio: "Making life multiplanetary. Building sustainable energy. Accelerating the world's transition to electric vehicles. Also running Twitter somehow.",
    contactEmail: "elon@x.com",
    location: "Austin, Texas, USA",
    linkedin: "https://linkedin.com/in/elonmusk",
    github: "https://github.com/elonmusk",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    links: [
      { label: "Website", url: "https://tesla.com" },
      { label: "Website", url: "https://spacex.com" },
      { label: "Twitter / X", url: "https://x.com/elonmusk" },
    ],
    isPublic: true,
    likesCount: 893,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  console.log("Connected to MongoDB");

  // Remove existing mock cards to avoid duplicates
  await Card.deleteMany({ userId: MOCK_USER_ID });
  console.log("Cleared old mock cards");

  const inserted = await Card.insertMany(cards);
  console.log(`✓ Inserted ${inserted.length} mock cards:`);
  inserted.forEach((c) => console.log(`  - ${c.fullName} (${c.cardType}) → ${c._id}`));

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
