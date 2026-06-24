"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Link2,
  ChevronDown,
  Globe,
  FileText,
} from "lucide-react";

/* ── Brand SVG icons ── */
function LinkedinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zM8 19H5V9h3v10zM6.5 7.7c-1 0-1.7-.8-1.7-1.7 0-.9.7-1.7 1.7-1.7s1.7.8 1.7 1.7c0 .9-.7 1.7-1.7 1.7zM19 19h-3v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V19h-3V9h2.8v1.4h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.6V19z" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.7 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function DribbbleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm7.521 5.372a10.04 10.04 0 012.189 5.443c-.32-.063-3.521-.714-6.742-.309-.07-.172-.136-.35-.208-.526a32.06 32.06 0 00-.612-1.39c3.568-1.454 5.197-3.548 5.373-3.218zm-1.338-1.24C17.916 4.425 16.296 6.3 12.9 7.606c-1.544-2.834-3.255-5.174-3.516-5.528A10.018 10.018 0 0112 2c2.402 0 4.605.845 6.183 2.132zM7.892 2.76c.252.342 1.937 2.69 3.498 5.46C7.026 9.32 3.54 9.296 3.18 9.288A10.048 10.048 0 017.892 2.76zM2.002 12.02v-.26c.348.008 4.46.058 8.538-.98.24.468.466.94.674 1.41a19.977 19.977 0 00-.774.252c-4.2 1.356-6.426 5.057-6.61 5.373A10.001 10.001 0 012 12zM12 22.004a9.99 9.99 0 01-6.168-2.12c.144-.308 1.776-3.434 6.374-5.07.022-.008.042-.02.064-.026a35.764 35.764 0 011.66 6.336 9.94 9.94 0 01-1.93.88zm3.798-.68a37.432 37.432 0 00-1.558-5.972c3.01-.48 5.646.308 5.974.408a10.02 10.02 0 01-4.416 5.564z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/* ── Preset catalogue ── */
export const LINK_PRESETS = [
  { id: "linkedin",   label: "LinkedIn",    placeholder: "https://linkedin.com/in/yourname",  Icon: LinkedinIcon,  color: "#0077b5" },
  { id: "github",     label: "GitHub",      placeholder: "https://github.com/yourname",        Icon: GithubIcon,    color: "#6e7681" },
  { id: "twitter",    label: "Twitter / X", placeholder: "https://x.com/yourhandle",           Icon: TwitterIcon,   color: "#1d9bf0" },
  { id: "portfolio",  label: "Portfolio",   placeholder: "https://yoursite.com",               Icon: Globe,         color: "#8b5cf6", lucide: true },
  { id: "resume",     label: "Resume",      placeholder: "https://drive.google.com/…",         Icon: FileText,      color: "#10b981", lucide: true },
  { id: "dribbble",   label: "Dribbble",    placeholder: "https://dribbble.com/yourname",      Icon: DribbbleIcon,  color: "#ea4c89" },
  { id: "youtube",    label: "YouTube",     placeholder: "https://youtube.com/@yourchannel",   Icon: YoutubeIcon,   color: "#ff0000" },
  { id: "instagram",  label: "Instagram",   placeholder: "https://instagram.com/yourname",     Icon: InstagramIcon, color: "#e1306c" },
  { id: "custom",     label: "Custom link", placeholder: "https://…",                          Icon: Link2,         color: "#71717a", lucide: true },
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
          {lucide ? <Icon size={13} /> : <Icon />}
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
