"use client";

import { useState } from "react";
import {
  Plus, Trash2, Link2, ChevronDown, Globe, FileText, Building2,
} from "lucide-react";
import {
  FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaDribbble,
  FaYoutube, FaTiktok, FaBehance, FaMedium, FaDiscord,
  FaTelegram, FaWhatsapp, FaReddit, FaPinterest, FaSnapchat,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

/* ── Preset catalogue ── */
export const LINK_PRESETS = [
  // Social
  { id: "linkedin",   label: "LinkedIn",    placeholder: "https://linkedin.com/in/yourname",    Icon: FaLinkedin,  color: "#0077b5", size: true },
  { id: "github",     label: "GitHub",      placeholder: "https://github.com/yourname",          Icon: FaGithub,    color: "#6e7681", size: true },
  { id: "twitter",    label: "Twitter", placeholder: "https://x.com/yourhandle",             Icon: FaXTwitter,  color: "#e7e9ea", size: true },
  { id: "instagram",  label: "Instagram",   placeholder: "https://instagram.com/yourname",       Icon: FaInstagram, color: "#e1306c", size: true },
  { id: "facebook",   label: "Facebook",    placeholder: "https://facebook.com/yourname",        Icon: FaFacebook,  color: "#1877f2", size: true },
  { id: "youtube",    label: "YouTube",     placeholder: "https://youtube.com/@yourchannel",     Icon: FaYoutube,   color: "#ff0000", size: true },
  { id: "tiktok",     label: "TikTok",      placeholder: "https://tiktok.com/@yourname",         Icon: FaTiktok,    color: "#ffffff", size: true },
  { id: "discord",    label: "Discord",     placeholder: "https://discord.gg/yourserver",        Icon: FaDiscord,   color: "#5865f2", size: true },
  { id: "whatsapp",   label: "WhatsApp",    placeholder: "https://wa.me/yourphone",              Icon: FaWhatsapp,  color: "#25d366", size: true },
  { id: "telegram",   label: "Telegram",    placeholder: "https://t.me/yourname",                Icon: FaTelegram,  color: "#26a5e4", size: true },
  { id: "reddit",     label: "Reddit",      placeholder: "https://reddit.com/u/yourname",        Icon: FaReddit,    color: "#ff4500", size: true },
  { id: "pinterest",  label: "Pinterest",   placeholder: "https://pinterest.com/yourname",       Icon: FaPinterest, color: "#e60023", size: true },
  { id: "snapchat",   label: "Snapchat",    placeholder: "https://snapchat.com/add/yourname",    Icon: FaSnapchat,  color: "#fffc00", size: true },
  // Creative / Professional
  { id: "dribbble",   label: "Dribbble",    placeholder: "https://dribbble.com/yourname",        Icon: FaDribbble,  color: "#ea4c89", size: true },
  { id: "behance",    label: "Behance",     placeholder: "https://behance.net/yourname",         Icon: FaBehance,   color: "#1769ff", size: true },
  { id: "medium",     label: "Medium",      placeholder: "https://medium.com/@yourname",         Icon: FaMedium,    color: "#ffffff", size: true },
  // General
  { id: "portfolio",  label: "Portfolio",   placeholder: "https://yoursite.com",                 Icon: Globe,       color: "#8b5cf6", lucide: true },
  { id: "resume",     label: "Resume",      placeholder: "https://drive.google.com/…",           Icon: FileText,    color: "#10b981", lucide: true },
  { id: "company",    label: "Company",     placeholder: "https://yourcompany.com",              Icon: Building2,   color: "#f59e0b", lucide: true },
  { id: "website",    label: "Website",     placeholder: "https://yourwebsite.com",              Icon: Globe,       color: "#6366f1", lucide: true },
  { id: "custom",     label: "Custom link", placeholder: "https://…",                            Icon: Link2,       color: "#71717a", lucide: true },
];

function presetFor(label) {
  return (
    LINK_PRESETS.find((p) => p.label.toLowerCase() === label?.toLowerCase()) ||
    LINK_PRESETS.find((p) => p.id === "custom")
  );
}

/* ── Single link row ── */
function LinkRow({ link, index, onChange, onRemove, disableAdd }) {
  const [typeOpen, setTypeOpen] = useState(false);
  const preset = presetFor(link.label);
  const { Icon, color, lucide } = preset;

  return (
    <div className="flex items-center gap-2 bg-background border border-border-subtle rounded-xl px-3 py-2.5 group hover:border-border transition-colors">
      {/* Type selector */}
      <div className="relative flex-shrink-0">
        <button
          type="button"
          onClick={() => setTypeOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium hover:bg-surface-2 transition-colors"
          style={{ color }}
        >
          {(lucide || preset.size) ? <Icon size={13} /> : <Icon />}
          <span className="hidden sm:inline max-w-[80px] truncate">{link.label || "Type"}</span>
          <ChevronDown size={10} className="text-muted-2" />
        </button>

        {typeOpen && (
          <div className="absolute top-full left-0 mt-1 z-50 w-44 rounded-xl bg-surface border border-border-subtle shadow-2xl py-1 overflow-hidden">
            {LINK_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onChange(index, { label: p.label, url: link.url });
                  setTypeOpen(false);
                }}
                className={`flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors hover:bg-surface-2 ${
                  link.label === p.label ? "bg-surface-2 text-foreground" : "text-muted"
                }`}
              >
                <span style={{ color: p.color }}>
                  {p.lucide ? <p.Icon size={13} /> : <p.Icon />}
                </span>
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-border-subtle flex-shrink-0" />

      {/* URL input */}
      <input
        type="text"
        value={link.url}
        placeholder={preset.placeholder}
        onChange={(e) => onChange(index, { label: link.label, url: e.target.value })}
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-2 outline-none min-w-0"
      />

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-muted-2 hover:text-danger hover:bg-danger/10 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={11} />
      </button>
    </div>
  );
}

/* ── Main LinksBuilder ── */
export default function LinksBuilder({ value = [], onChange }) {
  const MAX = 3;

  function addLink() {
    if (value.length >= MAX) return;
    onChange([...value, { label: "Custom link", url: "" }]);
  }

  function updateLink(index, updated) {
    const next = [...value];
    next[index] = updated;
    onChange(next);
  }

  function removeLink(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      {value.map((link, i) => (
        <LinkRow
          key={i}
          link={link}
          index={i}
          onChange={updateLink}
          onRemove={removeLink}
        />
      ))}

      {value.length < MAX && (
        <button
          type="button"
          onClick={addLink}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-border-subtle px-4 py-2.5 text-xs text-muted-2 hover:text-foreground hover:border-border hover:bg-surface transition-all duration-150"
        >
          <Plus size={13} />
          Add link
          <span className="ml-auto text-[10px] tabular-nums text-muted-2">
            {value.length}/{MAX}
          </span>
        </button>
      )}

      {value.length === MAX && (
        <p className="text-center text-[10px] text-muted-2 py-1">
          Maximum {MAX} links reached
        </p>
      )}
    </div>
  );
}
