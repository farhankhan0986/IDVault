"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" },
  }),
};

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Password Vault",
    desc: "Store every password, labelled and categorised. AES-256 encrypted before it touches the database.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    title: "Digital ID Card",
    desc: "A single shareable link that holds your name, role, bio, and social profiles always up to date.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Private by Design",
    desc: "No ads, no tracking. JWT authentication and per-user encrypted storage.",
  },
];

const HOW_IT_WORKS = [
  ["Create an account", "Sign up in seconds. No credit card required."],
  ["Save your passwords", "Add passwords with labels and categories. Multiple Google accounts? No problem."],
  ["Access anywhere", "Your vault is always with you. Copy passwords in one click."],
];

// Fake vault entries for the hero visual
const DEMO_ENTRIES = [
  { label: "Gmail Personal", user: "johndoe@gmail.com", cat: "Google", color: "#ea4335" },
  { label: "GitHub", user: "johndoe0986", cat: "Work", color: "#8b5cf6" },
  { label: "Netflix", user: "johndoe@gmail.com", cat: "Entertainment", color: "#ec4899" },
  { label: "HDFC Bank", user: "acc_••••4821", cat: "Finance", color: "#10b981" },
  { label: "Gmail Work", user: "johndoe@company.com", cat: "Google", color: "#ea4335" },
];

export default function HomePage() {
  const [showSupport, setShowSupport] = useState(false);
  const [visibleEntry, setVisibleEntry] = useState(0);
  const supportRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (showSupport) {
      supportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showSupport]);

  // Cycle through vault entries in the hero visual
  useEffect(() => {
    const t = setInterval(() => {
      setVisibleEntry((v) => (v + 1) % DEMO_ENTRIES.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-background text-foreground overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bottom-12 overflow-hidden px-5 pt-24 pb-5 lg:pb-20">

        {/* ── BG dot grid ── */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── BG glow blob ── */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 65%)", filter: "blur(60px)" }}
        />

        {/* ── Two-column on desktop, single column on mobile ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ════ LEFT: Copy ════ */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 mb-6"
            >
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground opacity-70" />
              </span>
              <span className="text-xs text-muted tracking-wide">Identity · Password Manager</span>
            </motion.div>

            {/* Headline - tighter on mobile */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight"
            >
              One vault.
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
              >
                Zero
              </span>
              {" forgotten"}
              <br />
              passwords.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-5 text-[15px] text-muted leading-relaxed max-w-[360px]"
            >
              Store every password encrypted and categorised - plus a shareable
              digital ID card for your professional identity.
            </motion.p>

            {/* CTA - stacked on mobile, inline on sm+ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <Link
                href="/signup"
                className="btn-primary px-7 py-3 text-sm font-medium text-center"
              >
                Get started - it&apos;s free
              </Link>
              <Link
                href="/dashboard"
                className="btn-ghost px-6 py-3 text-sm text-center"
              >
                Open vault →
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-x-5 gap-y-2"
            >
              {["AES-256 encrypted", "No ads ever", "Privacy-first"].map((label) => (
                <div key={label} className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-foreground opacity-40" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-xs text-muted-2">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════ RIGHT: Vault preview - shown on md+, mini preview on mobile ════ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] flex-shrink-0 relative"
          >
            {/* Floating chip - top right */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              className="absolute -top-3 -right-2 sm:-right-4 z-20 rounded-xl border border-border-subtle bg-surface px-3 py-2 shadow-2xl"
            >
              <p className="text-[10px] text-muted-2 mb-0.5">Encryption</p>
              <p className="text-sm font-semibold leading-none">AES-256</p>
            </motion.div>

            {/* Floating chip - bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.4 }}
              className="absolute -bottom-3 -left-2 sm:-left-4 z-20 rounded-xl border border-border-subtle bg-surface px-3 py-2 shadow-2xl"
            >
              <p className="text-[10px] text-muted-2 mb-0.5">Passwords saved</p>
              <p className="text-sm font-semibold leading-none tabular-nums">2,400+</p>
            </motion.div>

            {/* App shell */}
            <div
              className="rounded-2xl border border-border-subtle bg-surface overflow-hidden"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.55)" }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-border-subtle bg-surface-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="h-5 rounded-md bg-background border border-border-subtle flex items-center px-2 gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-muted-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span className="text-[11px] text-muted-2 truncate">idvault.app/vault</span>
                  </div>
                </div>
              </div>

              {/* Vault body */}
              <div className="p-3.5 space-y-2">
                {/* Search */}
                <div className="flex items-center gap-2 rounded-lg bg-background border border-border-subtle px-3 py-2 mb-3">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-muted-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span className="text-xs text-muted-2">Search passwords…</span>
                </div>

                {/* Entries */}
                {DEMO_ENTRIES.map((entry, i) => (
                  <motion.div
                    key={entry.label}
                    animate={{
                      opacity: i === visibleEntry ? 1 : 0.38,
                      scale: i === visibleEntry ? 1 : 0.985,
                    }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3 rounded-lg bg-background border border-border-subtle px-3 py-2.5"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={{ background: entry.color + "22", color: entry.color }}
                    >
                      {entry.label[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{entry.label}</p>
                      <p className="text-[11px] text-muted-2 truncate">{entry.user}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[11px] text-muted-2 font-mono tracking-widest">
                        {i === visibleEntry ? "••••••••" : "••••••"}
                      </span>
                      {i === visibleEntry && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-5 h-5 rounded-md flex items-center justify-center bg-surface-2 border border-border-subtle"
                        >
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Footer */}
                <div className="flex items-center justify-center gap-1.5 pt-1.5">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-muted-2" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="text-[11px] text-muted-2">AES-256 encrypted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5"
        >
          <span className="text-[11px] text-muted-2 tracking-wide">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted-2" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURE CARDS ─── */}
      <section className="py-24 px-5 hidden lg:block" >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">What you get</p>
            <h2 className="text-3xl font-semibold tracking-tight">Everything in one place</h2>
            <p className="text-sm text-muted mt-2 max-w-sm mx-auto">No bloat. Just the tools you actually need.</p>
          </motion.div>

          {/* Big two-card row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            {/* Card 1 - Password Vault */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="rounded-2xl border border-border-subtle bg-surface p-6 overflow-hidden relative group"
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "18px 18px" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border-subtle flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Password Vault</h3>
                    <p className="text-xs text-muted-2">AES-256 encrypted</p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Every password stored with a label, category, and website - so you never forget which account is which. Multiple Gmail accounts? No problem.
                </p>
                {/* Mini vault UI */}
                <div className="rounded-xl bg-background border border-border-subtle overflow-hidden">
                  {[
                    { l: "Gmail - Personal", u: "johndoe@gmail.com", c: "#ea4335" },
                    { l: "Netflix", u: "johndoe@gmail.com", c: "#e50914" },
                    { l: "HDFC Bank", u: "acc ••••4821", c: "#10b981" },
                  ].map((e, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-border-subtle" : ""}`}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: e.c + "22", color: e.c }}>{e.l[0]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{e.l}</p>
                        <p className="text-[11px] text-muted-2 truncate">{e.u}</p>
                      </div>
                      <span className="text-[11px] text-muted-2 font-mono tracking-widest">••••••••</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Digital ID Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
              className="rounded-2xl border border-border-subtle bg-surface p-6 overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "18px 18px" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border-subtle flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Digital ID Card</h3>
                    <p className="text-xs text-muted-2">Shareable in one link</p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Your name, role, bio, email, phone, and social links - all on one elegant card. Share it with anyone via a permanent URL.
                </p>
                {/* Mini card preview */}
                <div className="rounded-xl bg-background border border-border-subtle overflow-hidden">
                  <div className="h-10 bg-surface-2 border-b border-border-subtle" />
                  <div className="px-4 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-surface-2 border border-border -mt-7 flex-shrink-0 flex items-center justify-center text-sm font-bold">JD</div>
                    <div className="-mt-2">
                      <p className="text-xs font-semibold">John Doe</p>
                      <p className="text-[11px] text-muted-2">Software Developer</p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-[10px] text-muted-2 bg-surface-2 border border-border-subtle rounded-full px-2 py-0.5">Verified</div>
                    </div>
                  </div>
                  <div className="px-4 pb-3 grid grid-cols-3 gap-2">
                    {["LinkedIn", "GitHub", "Resume"].map(l => (
                      <div key={l} className="rounded-lg border border-border-subtle bg-surface-2 py-1.5 text-center text-[10px] text-muted-2">{l}</div>
                    ))}
                  </div>
                </div>
                <div className="px-4 pt-6 pb-4">
  <Link
    href="/demo"
    className="flex items-center justify-center gap-2 w-full rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:bg-surface-2 hover:shadow-md hover:-translate-y-0.5"
  >
    <span>View Demo Card</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </Link>
</div>
              </div>
            </motion.div>
          </div>

          {/* Three-card row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: "Private by design",
                desc: "No ads, no analytics, no third parties. Your data never leaves your account.",
                tag: "Zero tracking",
              },
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
                title: "Instant search",
                desc: "Find any password across all your categories in milliseconds.",
                tag: "< 50ms",
              },
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
                title: "One-click copy",
                desc: "Copy any password to clipboard instantly. No friction, no extra steps.",
                tag: "One click",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
                className="rounded-2xl border border-border-subtle bg-background p-5 flex flex-col gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-muted">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{card.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="text-[10px] font-medium text-muted-2 border border-border-subtle rounded-full px-2.5 py-1">{card.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIGITAL CARD SHOWCASE ─── */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">Your Digital Card</p>
            <h2 className="text-3xl font-semibold tracking-tight">One link for everything about you</h2>
            <p className="text-sm text-muted mt-2 max-w-sm mx-auto">Share your identity, contacts, and links - no app install needed.</p>
          </motion.div>

          {/* ── 4-card masonry-style grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Card A - Live preview (wide) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="md:col-span-7 rounded-2xl border border-border-subtle bg-surface overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "18px 18px" }} />
              {/* Cover band */}
              <div className="h-20 bg-surface-2 border-b border-border-subtle relative">
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "14px 14px" }} />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 border border-border-subtle rounded-lg px-2.5 py-1.5 text-xs text-muted-2" style={{ backgroundColor: 'var(--surface)' }}>
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  Share
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex items-start justify-between mb-4 -mt-10 relative z-20">
                  <div className="w-14 h-14 rounded-2xl bg-surface-2 border-2 border-surface flex items-center justify-center text-base font-bold">FK</div>
                  <div className="mt-8 flex items-center gap-1.5 rounded-full border border-border-subtle px-2.5 py-1" style={{ backgroundColor: 'var(--background)' }}>
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-foreground" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-[10px] font-medium">Verified</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold">John Doe</h3>
                <p className="text-xs text-muted mt-0.5 mb-4">Software Developer</p>
                <p className="text-xs text-muted leading-relaxed border-t border-border-subtle pt-4 mb-4">
                  Building clean, secure digital products. Open to new opportunities.
                </p>
                <div className="space-y-2">
                  {[
                    { icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>, label: 'Email', val: 'johndoe@gmail.com' },
                    { icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s6-5.33 6-10a6 6 0 10-12 0c0 4.67 6 10 6 10z"/><circle cx="12" cy="11" r="2.5"/></svg>, label: 'Location', val: 'New York, USA' },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border-subtle" style={{ backgroundColor: 'var(--surface-2)' }}>
                      <div className="w-7 h-7 rounded-lg border border-border-subtle flex items-center justify-center text-muted flex-shrink-0" style={{ backgroundColor: 'var(--surface)' }}>{icon}</div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-2">{label}</p>
                        <p className="text-xs font-medium">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {['Resume','GitHub','LinkedIn'].map(l => (
                    <div key={l} className="flex flex-col items-center gap-1.5 rounded-xl border border-border-subtle py-3" style={{ backgroundColor: 'var(--surface-2)' }}>
                      <div className="w-3.5 h-3.5 rounded bg-border" />
                      <span className="text-[10px] text-muted-2">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right column - stacked cards */}
            <div className="md:col-span-5 flex flex-col gap-4">

              {/* Card B - Shareable link card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }} viewport={{ once: true }}
                className="rounded-2xl border border-border-subtle p-5 flex flex-col gap-4"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl border border-border-subtle flex items-center justify-center" style={{ backgroundColor: 'var(--surface-2)' }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Shareable link</h3>
                    <p className="text-xs text-muted-2">One URL, always up to date</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border-subtle px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: 'var(--background)' }}>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-muted-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                  <span className="text-xs font-mono text-muted truncate">idvault.app/card/johndoe</span>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-muted-2 ml-auto flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Share with recruiters, colleagues, or clients. No app install required - just a link.
                </p>
              </motion.div>

              {/* Card C - What's on your card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }} viewport={{ once: true }}
                className="rounded-2xl border border-border-subtle p-5 flex-1"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-4">What's on your card</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Name & role',       done: true  },
                    { label: 'Bio',               done: true  },
                    { label: 'Email & phone',     done: true  },
                    { label: 'Location',          done: true  },
                    { label: 'Website',           done: true  },
                    { label: 'GitHub & LinkedIn', done: true  },
                    { label: 'Resume link',       done: false },
                  ].map(({ label, done }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        done ? 'border-foreground/40' : 'border-border-subtle'
                      }`}>
                        {done && (
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-foreground" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs ${done ? 'text-foreground' : 'text-muted-2'}`}>{label}</span>
                      {!done && <span className="ml-auto text-[10px] text-muted-2 border border-border-subtle rounded-full px-2 py-0.5">Optional</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Card D - CTA card (full width) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }} viewport={{ once: true }}
              className="md:col-span-12 rounded-2xl border border-border-subtle overflow-hidden relative"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "20px 20px" }} />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6">
                <div>
                  <p className="text-xs text-muted-2 uppercase tracking-wider mb-1">Ready to go</p>
                  <h3 className="text-lg font-semibold tracking-tight">Create your digital ID card in 2 minutes</h3>
                  <p className="text-sm text-muted mt-1">Free forever. No setup, no code, no friction.</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link href="/demo" className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2 whitespace-nowrap">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    View demo
                  </Link>
                  <Link href="/signup" className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap">
                    Create card free
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECURITY SECTION ─── */}
      <section className="py-20 px-5 mx-4 md:mx-6 rounded-3xl bg-surface mb-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "20px 20px" }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }} viewport={{ once: true }}
            >
              <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">Security first</p>
              <h2 className="text-3xl font-semibold tracking-tight leading-snug mb-5">
                Your passwords are<br />encrypted before saving.
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-8">
                Every password is encrypted server-side with AES-256-GCM before it&apos;s stored. Even if someone accessed the database, they&apos;d see nothing useful.
              </p>
              <div className="space-y-4">
                {[
                  { label: "AES-256-GCM encryption", desc: "Military-grade cipher on every password field" },
                  { label: "JWT authentication", desc: "Stateless, secure session management" },
                  { label: "No plaintext storage", desc: "Passwords never stored in readable form" },
                  { label: "Per-user isolation", desc: "Each user's data is fully separate" },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-background border border-border-subtle flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Encryption flow visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                { step: "01", label: "You type your password", value: "my_password_123", icon: "✏️", plain: true },
                { step: "02", label: "We encrypt it (AES-256-GCM)", value: "3a9f1c…b84e2d", icon: "🔐", dim: true },
                { step: "03", label: "Stored in database", value: "{ cipher: '3a9f…', iv: 'f91a…' }", icon: "🗄", dim: true },
              ].map(({ step, label, value, icon, plain, dim }) => (
                <div
                  key={step}
                  className={`rounded-xl border p-4 ${plain ? "border-border bg-background" : "border-border-subtle bg-surface-2"}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-2">{step}</span>
                    <p className="text-xs font-medium">{label}</p>
                  </div>
                  <div className={`rounded-lg border border-border-subtle bg-background px-3 py-2 font-mono text-xs ${dim ? "text-muted-2" : "text-foreground"}`}>
                    {value}
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-border-subtle bg-background p-4 flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <p className="text-xs text-muted">Only you can decrypt - with your account credentials.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">Get started</p>
            <h2 className="text-3xl font-semibold tracking-tight">Up and running in 60 seconds</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                n: "01", title: "Create a free account", desc: "Sign up with your email. No credit card, no verification delays.",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
              },
              {
                n: "02", title: "Add your passwords", desc: "Pick a service from 27 presets or add manually. Label, categorise, done.",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
              },
              {
                n: "03", title: "Access anywhere, instantly", desc: "Search, copy, and share. Your entire vault available at any time.",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-border-subtle bg-background p-6 relative overflow-hidden"
              >
                {/* Step number watermark */}
                <div className="absolute top-4 right-5 text-6xl font-bold text-border-subtle select-none leading-none">{step.n}</div>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-muted mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM → SOLUTION STRIP ─── */}
      <section className="px-5 mb-6">
        <div className="max-w-6xl mx-auto rounded-3xl border border-border-subtle bg-surface overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-subtle">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }} viewport={{ once: true }}
              className="p-8"
            >
              <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-4">The problem</p>
              <h3 className="text-xl font-semibold mb-4">You forget passwords constantly</h3>
              <ul className="space-y-3">
                {[
                  "Multiple Google accounts - impossible to track",
                  "Same password reused across dozens of sites",
                  "\"Forgot password\" is now a daily ritual",
                  "Different password variations you can't remember",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-danger/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }} viewport={{ once: true }}
              className="p-8"
            >
              <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-4">The solution</p>
              <h3 className="text-xl font-semibold mb-4">IDVault remembers everything</h3>
              <ul className="space-y-3">
                {[
                  "Label every account - Personal, Work, Backup",
                  "Categories keep passwords organised by service",
                  "Copy any password in one click, anytime",
                  "Generate strong passwords you never need to remember",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground/50 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Stop forgetting.<br />Start storing.
          </h2>
          <p className="text-sm text-muted mb-8 max-w-sm mx-auto leading-relaxed">
            Free forever. No ads. No clutter. Just your vault and your digital identity - secured.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup" className="btn-primary px-8 py-3 text-sm font-medium w-full sm:w-auto text-center">
              Create free account →
            </Link>
            <Link href="/login" className="btn-ghost px-7 py-3 text-sm w-full sm:w-auto text-center">
              Sign in
            </Link>
          </div>
          <p className="text-xs text-muted-2 mt-5">No credit card · No verification delay · No paywalls</p>
        </motion.div>
      </section>

      {/* ─── SUPPORT ─── */}
      <section ref={supportRef} className="py-16 px-5 mb-10">
        <div className="max-w-md mx-auto rounded-2xl border border-border-subtle bg-surface p-8 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="w-12 h-12 rounded-2xl bg-background border border-border-subtle flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </div>
            <p className="text-xs text-muted-2 uppercase tracking-wider mb-2">Open source · Independent</p>
            <h2 className="text-xl font-semibold mb-3">Built without investors</h2>
            <p className="text-sm text-muted leading-relaxed mb-6">
              IDVault is maintained by a single developer. No ads, no tracking, no paywalls. If it helps you, consider buying a coffee.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setShowSupport(true)}
                className="btn-primary px-6 py-2.5 text-sm"
              >
                Buy me a coffee
              </button>
              <Link href="/signup" className="btn-ghost px-6 py-2.5 text-sm">
                Get started free →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SUPPORT MODAL ─── */}
      {showSupport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && setShowSupport(false)}
        >
          <div className="w-full max-w-sm rounded-xl bg-surface border border-border-subtle p-6 text-center shadow-2xl">
            <h3 className="text-base font-semibold mb-1">Support IDVault</h3>
            <p className="text-xs text-muted mb-4">Scan the QR or use the UPI ID</p>
            <img src="/upi-qr.png" alt="UPI QR" className="mx-auto my-4 w-36 h-36 rounded-lg" />
            {/* <p className="text-sm font-mono text-muted">farhankhan080304@oksbi</p> */}
            <button onClick={() => setShowSupport(false)} className="mt-5 btn-ghost w-full py-2 text-sm">
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
