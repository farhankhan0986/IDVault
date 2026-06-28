import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import Card from "../../../models/Card";

/* ─────────────────────────────────────────────────────────────────────────
   Demo personas — each one gets a User + a public Card.
   Images use randomuser.me (CC-licensed headshots).
   Call POST /api/seed  with  { secret: process.env.SEED_SECRET }
   to upsert all demo cards without duplicating.
───────────────────────────────────────────────────────────────────────── */

const DEMO_CARDS = [
  /* ── 1. Linus Torvalds ─────────────────────────────────────────── */
  {
    email:      "demo_linus@idvault.demo",
    name:       "Linus Torvalds",
    card: {
      cardType:     "developer",
      cardName:     "Open Source",
      fullName:     "Linus Torvalds",
      title:        "Creator of Linux & Git",
      bio:          "Pioneered the open-source movement. I wrote the Linux kernel because I needed a free OS — and it kind of took off. Pragmatic engineer, blunt code reviewer.",
      location:     "Portland, Oregon",
      contactEmail: "torvalds@linux-foundation.org",
      profileImage: "https://randomuser.me/api/portraits/men/50.jpg",
      github:       "https://github.com/torvalds",
      resumeLink:   "https://kernel.org",
      linkedin:     "https://linkedin.com/in/linustorvalds",
      techStack:    ["C", "Linux Kernel", "Git", "Assembly", "Bash", "Make"],
      openToWork:   false,
      links: [
        { label: "Linux Foundation", url: "https://linuxfoundation.org" },
        { label: "Subsurface Project",  url: "https://subsurface-divelog.org" },
        { label: "TED Talk",           url: "https://ted.com/speakers/linus_torvalds" },
      ],
      likesCount: 2341,
    },
  },

  /* ── 2. Elon Musk ──────────────────────────────────────────────── */
  {
    email: "demo_elon@idvault.demo",
    name:  "Elon Musk",
    card: {
      cardType:     "business",
      cardName:     "CEO & Founder",
      fullName:     "Elon Musk",
      title:        "CEO — Tesla, SpaceX & xAI",
      bio:          "Making life multiplanetary. Accelerating the world's transition to sustainable energy. Working on AGI at xAI. First principles thinking always.",
      location:     "Austin, Texas",
      contactEmail: "elon@x.com",
      profileImage: "https://randomuser.me/api/portraits/men/52.jpg",
      linkedin:     "https://linkedin.com/in/elonmusk",
      resumeLink:   "https://spacex.com",
      institution:  "SpaceX / Tesla / xAI",
      links: [
        { label: "Twitter", url: "https://x.com/elonmusk" },
        { label: "Tesla",       url: "https://tesla.com" },
        { label: "SpaceX",      url: "https://spacex.com" },
      ],
      likesCount: 5821,
    },
  },

  /* ── 3. Taylor Swift ───────────────────────────────────────────── */
  {
    email: "demo_taylor@idvault.demo",
    name:  "Taylor Swift",
    card: {
      cardType:     "creative",
      cardName:     "The Eras",
      fullName:     "Taylor Swift",
      title:        "Singer-Songwriter & Record Producer",
      bio:          "14× Grammy Award winner. Storyteller through music. Cat mom. Each album is a different chapter — thank you for coming on this journey with me.",
      location:     "Nashville, Tennessee",
      contactEmail: "contact@taylorswift.com",
      profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
      linkedin:     "https://linkedin.com/in/taylorswift",
      resumeLink:   "https://taylorswift.com",
      links: [
        { label: "Spotify",      url: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02" },
        { label: "Instagram",    url: "https://instagram.com/taylorswift" },
        { label: "Official Site",url: "https://taylorswift.com" },
      ],
      likesCount: 9234,
    },
  },

  /* ── 4. Sundar Pichai ──────────────────────────────────────────── */
  {
    email: "demo_sundar@idvault.demo",
    name:  "Sundar Pichai",
    card: {
      cardType:     "professional",
      cardName:     "Google CEO",
      fullName:     "Sundar Pichai",
      title:        "CEO, Alphabet & Google",
      bio:          "Leading Google's mission to organize the world's information. AI is the most transformative technology humanity has worked on. Believer in ambient computing.",
      location:     "Mountain View, California",
      contactEmail: "sundar@google.com",
      profileImage: "https://randomuser.me/api/portraits/men/44.jpg",
      linkedin:     "https://linkedin.com/in/sundarpichai",
      resumeLink:   "https://blog.google",
      institution:  "Google / Alphabet",
      links: [
        { label: "Google Blog",  url: "https://blog.google" },
        { label: "Twitter",  url: "https://twitter.com/sundarpichai" },
        { label: "Google AI",    url: "https://ai.google" },
      ],
      likesCount: 1563,
    },
  },

  /* ── 5. Sam Altman ─────────────────────────────────────────────── */
  {
    email: "demo_sam@idvault.demo",
    name:  "Sam Altman",
    card: {
      cardType:     "professional",
      cardName:     "AI Builder",
      fullName:     "Sam Altman",
      title:        "CEO, OpenAI",
      bio:          "Working toward AGI that benefits all of humanity. Previously President of Y Combinator. Investing in AI, energy, and longevity. The intelligence age is here.",
      location:     "San Francisco, California",
      contactEmail: "sam@openai.com",
      profileImage: "https://randomuser.me/api/portraits/men/28.jpg",
      linkedin:     "https://linkedin.com/in/samaltman",
      resumeLink:   "https://blog.samaltman.com",
      institution:  "OpenAI",
      links: [
        { label: "OpenAI",       url: "https://openai.com" },
        { label: "Twitter",  url: "https://x.com/sama" },
        { label: "Blog",         url: "https://blog.samaltman.com" },
      ],
      likesCount: 3472,
    },
  },

  /* ── 6. Satya Nadella ──────────────────────────────────────────── */
  {
    email: "demo_satya@idvault.demo",
    name:  "Satya Nadella",
    card: {
      cardType:     "professional",
      cardName:     "Microsoft CEO",
      fullName:     "Satya Nadella",
      title:        "CEO, Microsoft",
      bio:          "Empowering every person and organization on the planet to achieve more. The growth mindset is the foundation of everything. Cloud + AI is the platform shift of our generation.",
      location:     "Redmond, Washington",
      contactEmail: "satyan@microsoft.com",
      profileImage: "https://randomuser.me/api/portraits/men/46.jpg",
      linkedin:     "https://linkedin.com/in/satyanadella",
      resumeLink:   "https://news.microsoft.com",
      institution:  "Microsoft",
      links: [
        { label: "Twitter",     url: "https://twitter.com/satyanadella" },
        { label: "Microsoft Blog",  url: "https://news.microsoft.com" },
        { label: "Azure AI",        url: "https://azure.microsoft.com/ai" },
      ],
      likesCount: 1089,
    },
  },

  /* ── 7. Mark Zuckerberg ────────────────────────────────────────── */
  {
    email: "demo_zuck@idvault.demo",
    name:  "Mark Zuckerberg",
    card: {
      cardType:     "developer",
      cardName:     "Meta Founder",
      fullName:     "Mark Zuckerberg",
      title:        "Co-Founder & CEO, Meta Platforms",
      bio:          "Building technology to connect people. Working on the future of AI and social presence. Founder of Meta, Facebook, Instagram, WhatsApp.",
      location:     "Palo Alto, California",
      contactEmail: "zuck@meta.com",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      github:       "https://github.com/zuck",
      linkedin:     "https://linkedin.com/in/zuckerberg",
      resumeLink:   "https://meta.ai",
      techStack:    ["PHP", "React", "Hack", "Python", "C++", "PyTorch"],
      openToWork:   false,
      links: [
        { label: "Threads",   url: "https://threads.net/@zuck" },
        { label: "Meta AI",   url: "https://meta.ai" },
        { label: "Instagram", url: "https://instagram.com/zuck" },
      ],
      likesCount: 2187,
    },
  },

  /* ── 8. MrBeast (Jimmy Donaldson) ──────────────────────────────── */
  {
    email: "demo_mrbeast@idvault.demo",
    name:  "MrBeast",
    card: {
      cardType:     "creative",
      cardName:     "Creator",
      fullName:     "Jimmy Donaldson",
      title:        "YouTuber, Philanthropist & Entrepreneur",
      bio:          "Most subscribed individual on YouTube. I spend every waking moment making videos to entertain you — and using the revenue to change people's lives. Go check out Feastables!",
      location:     "Greenville, North Carolina",
      contactEmail: "beast@mrbeast.com",
      profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
      linkedin:     "https://linkedin.com/in/mrbeast",
      resumeLink:   "https://mrbeast.com",
      links: [
        { label: "YouTube",   url: "https://youtube.com/@MrBeast" },
        { label: "Instagram", url: "https://instagram.com/mrbeast" },
        { label: "Feastables",url: "https://feastables.com" },
      ],
      likesCount: 7823,
    },
  },

  /* ── 9. Virat Kohli ─────────────────────────────────────────────── */
  {
    email: "demo_virat@idvault.demo",
    name:  "Virat Kohli",
    card: {
      cardType:     "professional",
      cardName:     "Cricket Icon",
      fullName:     "Virat Kohli",
      title:        "Professional Cricketer & Brand Entrepreneur",
      bio:          "Chasing excellence every single day. 100+ international centuries. Passionate about fitness, cricket, and inspiring the next generation to never give up on their dreams.",
      location:     "Delhi, India",
      contactEmail: "virat@kohli.com",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedin:     "https://linkedin.com/in/viratkohli",
      resumeLink:   "https://viratkohli.com",
      institution:  "Royal Challengers Bengaluru / BCCI",
      links: [
        { label: "Instagram",  url: "https://instagram.com/virat.kohli" },
        { label: "Twitter",url: "https://twitter.com/imVkohli" },
        { label: "WROGN",      url: "https://mywrogn.com" },
      ],
      likesCount: 4215,
    },
  },
];

const DEMO_PASSWORD_HASH = bcrypt.hashSync("Demo@IDVault2025", 10);

export async function POST(req) {
  try {
    /* ── Auth guard ─────────────────────────────────────────────── */
    const secret = process.env.SEED_SECRET;
    if (!secret) {
      return NextResponse.json({ message: "SEED_SECRET env var not set" }, { status: 500 });
    }

    let body = {};
    try { body = await req.json(); } catch { /* empty body */ }

    if (body.secret !== secret) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const results = [];

    for (const demo of DEMO_CARDS) {
      /* ── Upsert user ──────────────────────────────────────────── */
      let user = await User.findOne({ email: demo.email });
      if (!user) {
        user = await User.create({
          name:     demo.name,
          email:    demo.email,
          password: DEMO_PASSWORD_HASH,
        });
      }

      /* ── Upsert card ──────────────────────────────────────────── */
      const existing = await Card.findOne({ userId: user._id });
      if (existing) {
        /* Update in case we changed demo data */
        await Card.updateOne(
          { _id: existing._id },
          { $set: { ...demo.card, isPublic: true, isActive: true } }
        );
        results.push({ name: demo.name, action: "updated", id: existing._id });
      } else {
        const card = await Card.create({
          ...demo.card,
          userId:   user._id,
          isPublic: true,
          isActive: true,
        });
        results.push({ name: demo.name, action: "created", id: card._id });
      }
    }

    return NextResponse.json({ ok: true, results }, { status: 200 });
  } catch (err) {
    console.error("[seed]", err);
    return NextResponse.json({ message: String(err) }, { status: 500 });
  }
}
