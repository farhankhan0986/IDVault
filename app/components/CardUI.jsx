"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Mail, Phone, MapPin, Briefcase, Link2, Pencil, Trash2,
  BadgeCheck, Globe, Calendar, Share2, Lock, ExternalLink,
  Code2, Palette, GraduationCap, Building2, Sparkles,
} from "lucide-react";
import { LINK_PRESETS } from "./LinksBuilder";
import { getCardType } from "../../lib/cardTypes";

const TYPE_ICONS = {
  professional: Briefcase,
  developer:    Code2,
  creative:     Palette,
  student:      GraduationCap,
  business:     Building2,
};

/* ── Per-type hero band configuration ──────────────────────────── */
function HeroBand({ card, typeColor, isPublic, showActions }) {
  const type = card.cardType || "professional";
  const TypeIcon = TYPE_ICONS[type] || Briefcase;

  /* gradient wash */
  const gradient = {
    professional: `linear-gradient(135deg, ${typeColor}22 0%, transparent 65%)`,
    developer:    `linear-gradient(135deg, ${typeColor}2e 0%, ${typeColor}0a 55%, transparent 80%)`,
    creative:     `linear-gradient(135deg, ${typeColor}40 0%, #ec489918 65%, transparent 100%)`,
    student:      `linear-gradient(150deg, ${typeColor}2a 0%, transparent 70%)`,
    business:     `linear-gradient(to right, ${typeColor}2a 0%, transparent 68%)`,
  }[type] || `linear-gradient(135deg, ${typeColor}22 0%, transparent 65%)`;

  /* dot/line pattern */
  const patterns = {
    professional: { img: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)", size: "20px 20px", opacity: 0.20 },
    developer:    { img: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)", size: "13px 13px", opacity: 0.32 },
    creative:     { img: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)", size: "30px 30px", opacity: 0.12 },
    student:      { img: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)", size: "18px 18px", opacity: 0.22 },
    business:     { img: `repeating-linear-gradient(0deg, transparent 0px, transparent 14px, ${typeColor}18 14px, ${typeColor}18 15px)`, size: "auto", opacity: 1 },
  };
  const pat = patterns[type] || patterns.professional;

  const showOpenTo = card.openToWork && (type === "developer" || type === "student");
  const openToLabel = type === "student" ? "Open to internships" : "Open to work";

  return (
    <div className="relative h-24 bg-surface-2 flex-shrink-0 overflow-hidden">
      {/* gradient wash */}
      <div className="absolute inset-0" style={{ background: gradient }} />
      {/* pattern */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: pat.img, backgroundSize: pat.size, opacity: pat.opacity }}
      />
      {/* subtle sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.025] to-transparent" />

      {/* type badge — top left */}
      <div className="absolute top-3 left-3">
        <span
          className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium"
          style={{ borderColor: typeColor + "55", color: typeColor, backgroundColor: typeColor + "18" }}
        >
          <TypeIcon size={9} />
          {getCardType(type).label}
        </span>
      </div>

      {/* visibility badge — top right (only in owner view) */}
      {showActions && (
        <div className="absolute top-3 right-3">
          <span
            className={`badge text-[10px] flex items-center gap-1 ${
              isPublic
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-border-subtle text-muted-2"
            }`}
          >
            {isPublic ? <><Globe size={9} />Public</> : <><Lock size={9} />Private</>}
          </span>
        </div>
      )}

      {/* open-to badge — bottom right */}
      {showOpenTo && (
        <div className="absolute bottom-2.5 right-3">
          <span
            className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium"
            style={{ borderColor: typeColor + "55", color: typeColor, backgroundColor: typeColor + "18" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: typeColor }}
            />
            {openToLabel}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Type-specific tags section ─────────────────────────────────── */
function TypeTagsSection({ card, typeColor }) {
  const tags = card.techStack;
  if (!tags || tags.length === 0) return null;

  const cfgs = {
    developer: {
      label: "Tech Stack",
      tagCls: "font-mono rounded-md",
      padding: "px-2 py-[3px]",
    },
    creative: {
      label: "Tools & Mediums",
      tagCls: "rounded-full",
      padding: "px-2.5 py-[3px]",
    },
    student: {
      label: "Skills & Interests",
      tagCls: "rounded-md",
      padding: "px-2 py-[3px]",
    },
  };
  const cfg = cfgs[card.cardType];
  if (!cfg) return null;

  return (
    <div className="mx-4 mb-4">
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: typeColor + "30", backgroundColor: typeColor + "08" }}
      >
        <div
          className="px-4 py-2 border-b"
          style={{ borderColor: typeColor + "25" }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: typeColor + "cc" }}
          >
            {cfg.label}
          </p>
        </div>
        <div className="px-4 py-3 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`text-[11px] font-medium ${cfg.tagCls} ${cfg.padding}`}
              style={{
                color: typeColor,
                backgroundColor: typeColor + "18",
                border: `1px solid ${typeColor}35`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function CardUI({ card, showActions = false }) {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(card?.isPublic ?? false);
  const [togglingVisibility, setTogglingVisibility] = useState(false);

  if (!card) return null;

  const typeConfig = getCardType(card.cardType);
  const typeColor  = typeConfig.color;

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: card._id }),
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
        ta.focus(); ta.select();
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
          const res = await fetch(`/api/cards/delete?id=${card._id}`, {
            method: "DELETE",
            credentials: "include",
          });
          if (!res.ok) { toast.error("Failed to delete card"); return; }
          toast.success("Card deleted");
          router.push("/dashboard/card");
          router.refresh();
        },
      },
    });
  };

  const createdAt = card.createdAt
    ? new Date(card.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;

  const contactItems = [
    card.contactEmail && { icon: Mail,  value: card.contactEmail, href: `mailto:${card.contactEmail}` },
    card.phone        && { icon: Phone, value: card.phone,        href: `tel:${card.phone}` },
    card.location     && { icon: MapPin, value: card.location },
  ].filter(Boolean);

  const allLinks = [];
  if (card.links && card.links.length > 0) {
    card.links.forEach((l) => { if (l.url) allLinks.push({ label: l.label, url: l.url }); });
  } else {
    if (card.linkedin)   allLinks.push({ label: "LinkedIn", url: card.linkedin });
    if (card.github)     allLinks.push({ label: "GitHub",   url: card.github });
    if (card.resumeLink) allLinks.push({ label: "Resume",   url: card.resumeLink });
  }

  const displayName = card.cardName || `${typeConfig.label} Card`;

  /* Institution icon */
  const InstIcon = card.cardType === "student" ? GraduationCap : Building2;

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xl">

      {/* ── HERO ── */}
      <HeroBand card={card} typeColor={typeColor} isPublic={isPublic} showActions={showActions} />

      {/* ── AVATAR ── */}
      <div className="relative flex justify-center -mt-10 mb-4 z-10">
        <div className="relative">
          <img
            src={card.profileImage || "/default-avatar.png"}
            alt={card.fullName}
            className="w-20 h-20 rounded-full object-cover border-4 border-surface shadow-lg"
          />
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

        {/* institution — student & business only */}
        {card.institution && (card.cardType === "student" || card.cardType === "business") && (
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <InstIcon size={12} className="text-muted-2" />
            <span className="text-sm text-muted">{card.institution}</span>
          </div>
        )}

        {createdAt && (
          <div className="flex items-center justify-center gap-1 mt-1.5">
            <Calendar size={10} className="text-muted-2" />
            <span className="text-xs text-muted-2">Member since {createdAt}</span>
          </div>
        )}

        {card.bio && (
          <p
            className="mt-4 text-xs text-muted leading-relaxed border-t pt-4"
            style={{ borderColor: typeColor + "25" }}
          >
            {card.bio}
          </p>
        )}
      </div>

      {/* ── TYPE-SPECIFIC TAGS (developer / creative / student) ── */}
      <TypeTagsSection card={card} typeColor={typeColor} />

      {/* ── CONTACT ── */}
      {contactItems.length > 0 && (
        <div className="mx-4 mb-4 rounded-xl border border-border-subtle bg-background overflow-hidden">
          <div className="px-4 py-2 border-b border-border-subtle">
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider">Contact</p>
          </div>
          <div className="divide-y divide-border-subtle">
            {contactItems.map(({ icon: Icon, value, href }, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-muted" />
                </div>
                {href ? (
                  <a href={href} className="text-xs text-foreground hover:text-muted transition truncate">
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
      {allLinks.length > 0 && (
        <div className="px-4 pb-5">
          <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">Links</p>
          <div className="flex gap-2">
            {allLinks.map(({ label, url }, i) => {
              const preset =
                LINK_PRESETS.find((p) => p.label.toLowerCase() === label?.toLowerCase()) ||
                LINK_PRESETS.find((p) => p.id === "custom");
              const { Icon, color, lucide } = preset;
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 flex-1 rounded-xl border border-border-subtle bg-background px-2 py-3 hover:border-border hover:bg-surface transition-all duration-150"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: color + "18", border: `1px solid ${color}30` }}
                  >
                    <span style={{ color }}>{lucide ? <Icon size={14} /> : <Icon />}</span>
                  </div>
                  <p className="text-[11px] font-medium text-foreground text-center leading-tight">{label}</p>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ACTIONS (owner only) ── */}
      {showActions && (
        <div className="px-4 pb-4 space-y-2">
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

          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/edit-card?id=${card._id}`)}
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
      <div
        className="border-t bg-background px-4 py-3 flex items-center justify-between"
        style={{ borderColor: typeColor + "22" }}
      >
        <p className="text-xs text-muted-2 select-none font-medium">{displayName}</p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-2 select-none">IDVault</span>
          <BadgeCheck size={12} className="text-muted-2" />
        </div>
      </div>
    </div>
  );
}
