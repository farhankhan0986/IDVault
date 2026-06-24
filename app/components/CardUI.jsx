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
  Pencil,
  Trash2,
  BadgeCheck,
  Globe,
  Calendar,
  Share2,
  Lock,
  ExternalLink,
} from "lucide-react";
import { LINK_PRESETS } from "./LinksBuilder";


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

      {/* ── LINKS ── */}
      {(() => {
        // Merge new links array + old fixed fields (backward compat)
        const allLinks = [];
        if (card.links && card.links.length > 0) {
          card.links.forEach((l) => {
            if (l.url) allLinks.push({ label: l.label, url: l.url });
          });
        } else {
          if (card.linkedin)   allLinks.push({ label: "LinkedIn",  url: card.linkedin });
          if (card.github)     allLinks.push({ label: "GitHub",    url: card.github });
          if (card.resumeLink) allLinks.push({ label: "Resume",    url: card.resumeLink });
        }

        if (allLinks.length === 0) return null;

        return (
          <div className="px-4 pb-5">
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">
              Links
            </p>
            <div className="flex flex-col gap-2">
              {allLinks.map(({ label, url }, i) => {
                const preset =
                  LINK_PRESETS.find(
                    (p) => p.label.toLowerCase() === label?.toLowerCase()
                  ) || LINK_PRESETS.find((p) => p.id === "custom");
                const { Icon, color, lucide } = preset;
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border-subtle bg-background px-3.5 py-2.5 hover:border-border hover:bg-surface transition-all duration-150 group"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: color + "18",
                        border: `1px solid ${color}30`,
                      }}
                    >
                      <span style={{ color }}>
                        {lucide ? <Icon size={13} /> : <Icon />}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{label}</p>
                      <p className="text-[10px] text-muted-2 truncate">{url.replace(/^https?:\/\//, "")}</p>
                    </div>
                    <ExternalLink
                      size={11}
                      className="text-muted-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        );
      })()}

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
