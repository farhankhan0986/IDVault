"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Link2,
  FileText,
  Pencil,
  Trash2,
  BadgeCheck,
  Globe,
  Calendar,
  Share2,
  Lock,
} from "lucide-react";

// Inline brand SVGs (lucide-react removed brand icons)
function GithubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.7 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}
function LinkedinIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zM8 19H5V9h3v10zM6.5 7.7c-1 0-1.7-.8-1.7-1.7 0-.9.7-1.7 1.7-1.7s1.7.8 1.7 1.7c0 .9-.7 1.7-1.7 1.7zM19 19h-3v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V19h-3V9h2.8v1.4h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.6V19z" />
    </svg>
  );
}

export default function CardUI({ card, showActions = false }) {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(card?.isPublic ?? false);
  const [togglingVisibility, setTogglingVisibility] = useState(false);

  if (!card) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/card/${card._id}`
      : "";

  async function handleToggleVisibility() {
    setTogglingVisibility(true);
    try {
      const res = await fetch("/api/cards/visibility", {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setIsPublic(data.isPublic);
      toast.success(data.message);
    } catch {
      toast.error("Failed to update visibility");
    } finally {
      setTogglingVisibility(false);
    }
  }

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const ta = document.createElement("textarea");
        ta.value = shareUrl;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast.success("Public link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleDelete = () => {
    toast("Delete this card?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          const res = await fetch("/api/cards/delete", {
            method: "DELETE",
            credentials: "include",
          });
          if (!res.ok) { toast.error("Failed to delete card"); return; }
          toast.success("Card deleted");
          router.push("/dashboard");
          router.refresh();
        },
      },
    });
  };

  // Format creation date
  const createdAt = card.createdAt
    ? new Date(card.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  const socialLinks = [
    card.linkedin && { href: card.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    card.github && { href: card.github, icon: GithubIcon, label: "GitHub" },
    card.resumeLink && { href: card.resumeLink, icon: FileText, label: "Resume", isLucide: true },
  ].filter(Boolean);

  const contactItems = [
    card.contactEmail && { icon: Mail, value: card.contactEmail, href: `mailto:${card.contactEmail}` },
    card.phone && { icon: Phone, value: card.phone, href: `tel:${card.phone}` },
    card.location && { icon: MapPin, value: card.location },
  ].filter(Boolean);

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xl">

      {/* ── HERO BAND ── */}
      <div className="relative h-24 bg-surface-2 flex-shrink-0">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Subtle centre shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.03] to-transparent" />

        {/* Visibility badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`badge text-xs ${
              isPublic
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-border-subtle text-muted-2"
            }`}
          >
            {isPublic ? (
              <><Globe size={10} /> Public</>
            ) : (
              <><Lock size={10} /> Private</>
            )}
          </span>
        </div>

        {/* IDVault watermark */}
        <div className="absolute bottom-3 left-4">
          <p className="text-xs text-muted-2 font-medium tracking-wider uppercase select-none">
            IDVault
          </p>
        </div>
      </div>

      {/* ── AVATAR ── */}
      <div className="relative flex justify-center -mt-10 mb-4 z-10">
        <div className="relative">
          <img
            src={card.profileImage || "/default-avatar.png"}
            alt={card.fullName}
            className="w-20 h-20 rounded-full object-cover border-4 border-surface shadow-lg"
          />
          {/* Verified badge */}
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface flex items-center justify-center border border-border-subtle"
            title="Verified Digital ID"
          >
            <BadgeCheck size={14} className="text-foreground" />
          </div>
        </div>
      </div>

      {/* ── IDENTITY ── */}
      <div className="text-center px-6 pb-5">
        <h2 className="text-lg font-semibold tracking-tight">{card.fullName}</h2>

        {card.title && (
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Briefcase size={12} className="text-muted-2" />
            <span className="text-sm text-muted">{card.title}</span>
          </div>
        )}

        {createdAt && (
          <div className="flex items-center justify-center gap-1 mt-1.5">
            <Calendar size={10} className="text-muted-2" />
            <span className="text-xs text-muted-2">Member since {createdAt}</span>
          </div>
        )}

        {card.bio && (
          <p className="mt-4 text-xs text-muted leading-relaxed border-t border-border-subtle pt-4">
            {card.bio}
          </p>
        )}
      </div>

      {/* ── CONTACT ── */}
      {contactItems.length > 0 && (
        <div className="mx-4 mb-4 rounded-xl border border-border-subtle bg-background overflow-hidden">
          <div className="px-4 py-2 border-b border-border-subtle">
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider">
              Contact
            </p>
          </div>
          <div className="divide-y divide-border-subtle">
            {contactItems.map(({ icon: Icon, value, href }, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-muted" />
                </div>
                {href ? (
                  <a
                    href={href}
                    className="text-xs text-foreground hover:text-muted transition truncate"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-xs text-foreground truncate">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SOCIAL LINKS ── */}
      {socialLinks.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-2.5">
            Links
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ href, icon: Icon, label, isLucide }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle bg-background text-xs text-muted hover:text-foreground hover:border-border transition-all duration-150"
              >
                {isLucide ? <Icon size={13} /> : <Icon size={13} />}
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── ACTIONS (owner-only) ── */}
      {showActions && (
        <div className="px-4 pb-4 space-y-2">

          {/* Visibility toggle */}
          <button
            onClick={handleToggleVisibility}
            disabled={togglingVisibility}
            className={`w-full flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-medium transition disabled:opacity-60 ${
              isPublic
                ? "border-emerald-500/30 bg-emerald-500/8 text-emerald-400 hover:bg-emerald-500/15"
                : "border-border-subtle bg-background text-muted hover:text-foreground hover:border-border"
            }`}
          >
            {isPublic ? <Globe size={13} /> : <Lock size={13} />}
            {togglingVisibility
              ? "Updating…"
              : isPublic
              ? "Public · Click to make Private"
              : "Private · Click to make Public"}
          </button>

          {/* Share row — only shown when public */}
          {isPublic && (
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-border-subtle bg-background px-4 py-2.5 text-xs text-muted hover:text-foreground hover:border-border transition"
            >
              <Share2 size={13} />
              Copy public link
              <Link2 size={11} className="ml-auto text-muted-2" />
            </button>
          )}

          {/* Edit / Delete row */}
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/edit-card")}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border-subtle px-4 py-2.5 text-xs text-muted hover:text-foreground hover:border-border transition"
            >
              <Pencil size={12} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border-subtle px-4 py-2.5 text-xs text-danger hover:bg-danger/5 hover:border-danger/30 transition"
            >
              <Trash2 size={12} />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div className="border-t border-border-subtle bg-background px-4 py-3 flex items-center justify-between">
        <p className="text-xs text-muted-2 select-none">
          IDVault · Digital Identity
        </p>
        <BadgeCheck size={13} className="text-muted-2" />
      </div>
    </div>
  );
}
