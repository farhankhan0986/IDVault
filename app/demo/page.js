"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Copy,
  Check,
  Pencil,
  Trash2,
  BadgeCheck,
  Globe,
  Share2,
  FileText,
  ExternalLink,
} from "lucide-react";

function GithubIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.7 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zM8 19H5V9h3v10zM6.5 7.7c-1 0-1.7-.8-1.7-1.7 0-.9.7-1.7 1.7-1.7s1.7.8 1.7 1.7c0 .9-.7 1.7-1.7 1.7zM19 19h-3v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V19h-3V9h2.8v1.4h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.6V19z" />
    </svg>
  );
}

const DEMO = {
  name: "John Doe",
  role: "Software Developer",
  bio: "Passionate developer building clean, secure, and scalable digital experiences. Open to new opportunities.",
  email: "john@example.com",
  phone: "+1 234 567 890",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  github: "github.com/johndoe",
  linkedin: "linkedin.com/in/johndoe",
};

function ContactRow({ icon: Icon, label, value, href }) {
  const Tag = href ? "a" : "div";
  const props = href
    ? { href, target: "_blank", rel: "noreferrer" }
    : {};
  return (
    <Tag
      {...props}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border-subtle bg-surface-2 hover:bg-surface hover:border-border transition-colors group cursor-default"
      style={href ? { cursor: "pointer" } : {}}
    >
      <div className="w-7 h-7 rounded-lg bg-surface border border-border-subtle flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-muted" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted-2">{label}</p>
        <p className="text-xs font-medium truncate">{value}</p>
      </div>
      {href && (
        <ExternalLink size={11} className="text-muted-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      )}
    </Tag>
  );
}

export default function DemoPage() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.origin + "/demo");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 pt-14 pb-20">

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 mb-4">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground opacity-60" />
          </span>
          <span className="text-xs text-muted-2">Demo - Digital ID Card</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Your shareable identity</h1>
        <p className="text-sm text-muted mt-1.5 max-w-xs mx-auto leading-relaxed">
          One permanent link for your name, role, contacts, and social profiles.
        </p>
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-sm"
      >
        <div
          className="rounded-2xl border border-border-subtle bg-surface overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 56px rgba(0,0,0,0.5)" }}
        >

          {/* Cover band */}
          <div
            className="relative h-24"
            style={{
              backgroundColor: "var(--surface-2)",
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Share pill - top right */}
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-border-subtle px-2.5 py-1.5 text-xs font-medium text-muted-2 hover:text-foreground transition-colors"
              style={{ backgroundColor: "var(--surface)" }}
            >
              {copied ? <Check size={11} /> : <Share2 size={11} />}
              {copied ? "Copied!" : "Share"}
            </button>
          </div>

          {/* Body - avatar pulled up over cover */}
          <div className="px-5 pb-5 -mt-10 relative z-20">

            {/* Avatar + verified row */}
            <div className="flex items-start justify-between" style={{ marginTop: "-28px" }}>
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold select-none flex-shrink-0"
                style={{
                  backgroundColor: "var(--surface-2)",
                  border: "3px solid var(--surface)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                JD
              </div>

              {/* Verified badge aligned to top right */}
              <div className="mt-6 flex items-center gap-1.5 rounded-full border border-border-subtle px-2.5 py-1" style={{ backgroundColor: "var(--background)" }}>
                <BadgeCheck size={11} className="text-foreground" />
                <span className="text-[10px] font-medium">Verified</span>
              </div>
            </div>

            {/* Name + role */}
            <div className="mt-3 mb-4">
              <h2 className="text-base font-semibold tracking-tight">{DEMO.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Briefcase size={11} className="text-muted-2 flex-shrink-0" />
                <p className="text-xs text-muted">{DEMO.role}</p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-muted leading-relaxed border-t border-border-subtle pt-4 pb-4">
              {DEMO.bio}
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              <ContactRow icon={Mail}   label="Email"    value={DEMO.email}    href={`mailto:${DEMO.email}`} />
              <ContactRow icon={Phone}  label="Phone"    value={DEMO.phone}    href={`tel:${DEMO.phone}`} />
              <ContactRow icon={MapPin} label="Location" value={DEMO.location} />
              <ContactRow icon={Globe}  label="Website"  value={DEMO.website}  href={`https://${DEMO.website}`} />
            </div>

            {/* Social links */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Resume",   icon: <FileText size={14} />,                      href: "#" },
                { label: "GitHub",   icon: <GithubIcon className="w-3.5 h-3.5" />,      href: `https://${DEMO.github}` },
                { label: "LinkedIn", icon: <LinkedinIcon className="w-3.5 h-3.5" />,    href: `https://${DEMO.linkedin}` },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href === "#" ? undefined : href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-border-subtle py-3 hover:border-border transition-colors"
                  style={{ backgroundColor: "var(--surface-2)", cursor: href === "#" ? "default" : "pointer" }}
                >
                  <span className="text-muted">{icon}</span>
                  <span className="text-[10px] text-muted-2">{label}</span>
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                className="flex items-center justify-center gap-2 rounded-xl border border-border-subtle px-4 py-2.5 text-xs font-medium hover:border-border transition-colors"
                style={{ backgroundColor: "var(--background)" }}
              >
                <Pencil size={12} className="text-muted" />
                Edit card
              </button>
              <button
                className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: "rgba(248,113,113,0.06)",
                  borderColor: "rgba(248,113,113,0.25)",
                  color: "var(--danger)",
                }}
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          </div>

          {/* Card footer */}
          <div
            className="border-t border-border-subtle py-3 px-5 flex items-center justify-between"
            style={{ backgroundColor: "var(--surface-2)" }}
          >
            <p className="text-[10px] text-muted-2">IDVault · Secure Digital Identity</p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[10px] text-muted-2 hover:text-foreground transition-colors"
            >
              {copied ? <Check size={10} /> : <Copy size={10} />}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

        {/* CTA below card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-muted-2 mb-3">Want your own identity card?</p>
          <Link href="/signup" className="btn-primary px-6 py-2.5 text-sm">
            Create yours free →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
