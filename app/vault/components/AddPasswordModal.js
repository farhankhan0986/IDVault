"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

// ─── Service Presets ───────────────────────────────────────────────────────────
// Each preset auto-fills label, category, and website user only types username+password
const PRESETS = [
  // Google
  { label: "Google Account", category: "Google",        website: "https://google.com",          color: "#ea4335", abbr: "G"  },
  { label: "Google Work", category: "Google",        website: "https://google.com",          color: "#ea4335", abbr: "G"  },
  { label: "Gmail Personal", category: "Google",        website: "https://mail.google.com",          color: "#ea4335", abbr: "G"  },
  { label: "Gmail Work",     category: "Google",        website: "https://mail.google.com",          color: "#ea4335", abbr: "G"  },
  { label: "Google Drive",     category: "Google",        website: "https://drive.google.com",         color: "#4285f4", abbr: "GD" },
  { label: "Google Drive Work",     category: "Google",        website: "https://drive.google.com",         color: "#4285f4", abbr: "GD" },
  // Social
  { label: "Instagram",        category: "Social",        website: "https://instagram.com",            color: "#e1306c", abbr: "In" },
  { label: "Facebook",         category: "Social",        website: "https://facebook.com",             color: "#1877f2", abbr: "Fb" },
  { label: "Twitter/ X",      category: "Social",        website: "https://x.com",                   color: "#FFFFFF", abbr: "X"  },
  { label: "LinkedIn",         category: "Social",        website: "https://linkedin.com",             color: "#0077b5", abbr: "Li" },
  { label: "YouTube",          category: "Social",        website: "https://youtube.com",              color: "#ff0000", abbr: "YT" },
  { label: "Snapchat",         category: "Social",        website: "https://snapchat.com",             color: "#fffc00", abbr: "Sc", dark: true },
  { label: "WhatsApp",         category: "Social",        website: "https://web.whatsapp.com",         color: "#25d366", abbr: "Wa" },
  // Entertainment
  { label: "Netflix",          category: "Entertainment", website: "https://netflix.com",              color: "#e50914", abbr: "Nf" },
  { label: "Spotify",          category: "Entertainment", website: "https://spotify.com",              color: "#1db954", abbr: "Sp" },
  { label: "Prime Video",      category: "Entertainment", website: "https://primevideo.com",           color: "#00a8e0", abbr: "Pv" },
  { label: "Disney+ Hotstar",  category: "Entertainment", website: "https://hotstar.com",              color: "#0f3cc9", abbr: "Hs" },
  // Finance
  { label: "HDFC Bank",        category: "Finance",       website: "https://hdfcbank.com",             color: "#004c8f", abbr: "HD" },
  { label: "SBI Net Banking",  category: "Finance",       website: "https://onlinesbi.sbi",            color: "#2d6cc0", abbr: "SB" },
  { label: "ICICI Bank",       category: "Finance",       website: "https://icicibank.com",            color: "#f26522", abbr: "IC" },
  { label: "Paytm",            category: "Finance",       website: "https://paytm.com",                color: "#002970", abbr: "Pt" },
  { label: "GPay",             category: "Finance",       website: "https://pay.google.com",           color: "#4285f4", abbr: "GP" },
  // Shopping
  { label: "Amazon",           category: "Shopping",      website: "https://amazon.in",               color: "#ff9900", abbr: "Am" },
  { label: "Flipkart",         category: "Shopping",      website: "https://flipkart.com",             color: "#2874f0", abbr: "Fk" },
  { label: "Myntra",           category: "Shopping",      website: "https://myntra.com",               color: "#ff3f6c", abbr: "Mn" },
  // Work / Dev
  { label: "GitHub",           category: "Work",          website: "https://github.com",               color: "#24292f", abbr: "GH" },
  { label: "Slack",            category: "Work",          website: "https://slack.com",                color: "#4a154b", abbr: "Sl" },
  { label: "Notion",           category: "Work",          website: "https://notion.so",                color: "#191919", abbr: "No" },
  { label: "Figma",            category: "Work",          website: "https://figma.com",                color: "#f24e1e", abbr: "Fi" },
  // Email
  { label: "Outlook",          category: "Email",         website: "https://outlook.live.com",         color: "#0078d4", abbr: "Ol" },
  { label: "Yahoo Mail",       category: "Email",         website: "https://mail.yahoo.com",           color: "#720e9e", abbr: "Yh" },
  { label: "ProtonMail",       category: "Email",         website: "https://proton.me",                color: "#6d4aff", abbr: "Pm" },
];

const CATEGORY_ORDER = ["Google", "Social", "Entertainment", "Finance", "Shopping", "Work", "Email"];

const STRENGTH_LABELS = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
const STRENGTH_COLORS = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-emerald-500"];
const CATEGORIES = ["Social", "Google", "Work", "Finance", "Shopping", "Email", "Entertainment", "Other"];

function measureStrength(p) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (p.length >= 14) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^a-zA-Z0-9]/.test(p)) s++;
  return Math.min(s, 4);
}

function generatePassword(length = 20) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-_=+?";
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => charset[b % charset.length]).join("");
}

// Group presets by category
const grouped = CATEGORY_ORDER.map((cat) => ({
  cat,
  items: PRESETS.filter((p) => p.category === cat),
}));

export default function AddPasswordModal({ onClose, onSaved, initial = null }) {
  const isEdit = !!initial;

  // Step 1 = pick preset (only for new entry), Step 2 = fill details
  const [step, setStep] = useState(isEdit ? 2 : 1);
  const [activeCategory, setActiveCategory] = useState("Google");

  const [form, setForm] = useState({
    label:      initial?.label      || "",
    username:   initial?.username   || "",
    password:   initial?.password   || "",
    category:   initial?.category   || "Other",
    website:    initial?.website    || "",
    notes:      initial?.notes      || "",
    isFavorite: initial?.isFavorite || false,
  });
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving]     = useState(false);

  const strength = measureStrength(form.password);

  function set(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function applyPreset(preset) {
    setForm((f) => ({
      ...f,
      label:    preset.label,
      category: preset.category,
      website:  preset.website,
    }));
    setStep(2);
  }

  function skipToManual() {
    setStep(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.label.trim() || !form.password.trim()) {
      toast.error("Label and password are required");
      return;
    }
    setSaving(true);
    try {
      const url    = isEdit ? `/api/passwords/${initial._id}` : "/api/passwords/create";
      const method = isEdit ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to save");
        return;
      }
      toast.success(isEdit ? "Password updated" : "Password saved");
      onSaved();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const currentGroupItems = grouped.find((g) => g.cat === activeCategory)?.items || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-lg rounded-xl bg-surface border border-border-subtle shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle flex-shrink-0">
          <div className="flex items-center gap-3">
            {step === 2 && !isEdit && (
              <button
                onClick={() => setStep(1)}
                className="btn-icon w-7 h-7 text-muted-2"
                title="Back"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            <h2 className="text-sm font-semibold">
              {isEdit ? "Edit password" : step === 1 ? "Pick a service" : "Fill in details"}
            </h2>
            {!isEdit && (
              <span className="text-xs text-muted-2 bg-surface-2 border border-border-subtle rounded-full px-2 py-0.5">
                {step}/2
              </span>
            )}
          </div>
          <button onClick={onClose} className="btn-icon text-base leading-none" aria-label="Close">
            ×
          </button>
        </div>

        {/* ══════════════ STEP 1 Service picker ══════════════ */}
        {step === 1 && (
          <div className="flex flex-col overflow-hidden flex-1">

            {/* Category tabs */}
            <div className="flex gap-1 overflow-x-auto px-4 pt-4 pb-2 flex-shrink-0 scrollbar-hide">
              {CATEGORY_ORDER.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-surface-2 text-foreground border border-border"
                      : "text-muted-2 hover:text-muted hover:bg-surface-2/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service chips grid */}
            <div className="overflow-y-auto flex-1 px-4 pb-4">
              <div className="grid grid-cols-2 gap-2 pt-2">
                {currentGroupItems.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset)}
                    className="flex items-center gap-3 rounded-xl border border-border-subtle bg-background px-3 py-3 hover:border-border hover:bg-surface-2 transition-all duration-150 text-left group"
                  >
                    {/* Icon circle */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: preset.color + "22",
                        color: preset.dark ? "#fff" : preset.color,
                        border: `1px solid ${preset.color}33`,
                      }}
                    >
                      {preset.abbr}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{preset.label}</p>
                      <p className="text-xs text-muted-2 truncate">
                        {preset.website.replace(/^https?:\/\//, "")}
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 text-muted-2 opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Skip to manual */}
            <div className="px-4 pb-4 pt-2 border-t border-border-subtle flex-shrink-0">
              <button
                onClick={skipToManual}
                className="w-full py-2 text-xs text-muted-2 hover:text-foreground transition flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Enter manually
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 2 Details form ══════════════ */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
            <div className="p-5 space-y-4">

              {/* Selected service preview (if a preset was picked) */}
              {form.label && !isEdit && (
                <div className="flex items-center gap-3 rounded-xl bg-background border border-border-subtle px-3 py-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: (PRESETS.find(p => p.label === form.label)?.color || "#71717a") + "22",
                      color: PRESETS.find(p => p.label === form.label)?.color || "#71717a",
                    }}
                  >
                    {form.label[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{form.label}</p>
                    <p className="text-xs text-muted-2">{form.category} · {form.website.replace(/^https?:\/\//, "") || "no website"}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-muted-2 hover:text-foreground transition"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Label shown if manually entered or editing */}
              {(isEdit || !PRESETS.find(p => p.label === form.label)) && (
                <div>
                  <label className="block text-xs text-muted mb-1.5 font-medium">
                    Label <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="input w-full px-3 py-2"
                    placeholder="e.g. Gmail Personal"
                    value={form.label}
                    onChange={(e) => set("label", e.target.value)}
                    autoFocus={!form.label}
                  />
                </div>
              )}

              {/* Username / Email */}
              <div>
                <label className="block text-xs text-muted mb-1.5 font-medium">
                  Username / Email
                </label>
                <input
                  className="input w-full px-3 py-2"
                  placeholder="you@gmail.com"
                  value={form.username}
                  onChange={(e) => set("username", e.target.value)}
                  autoFocus={!!form.label && !isEdit}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-muted font-medium">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { set("password", generatePassword()); setShowPass(true); }}
                    className="text-xs text-muted-2 hover:text-foreground transition flex items-center gap-1"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Generate strong
                  </button>
                </div>
                <div className="relative">
                  <input
                    className="input w-full px-3 py-2 pr-14 font-mono text-sm"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-2 hover:text-foreground transition"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Strength bar */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            i <= strength ? STRENGTH_COLORS[strength] : "bg-border-subtle"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-2">{STRENGTH_LABELS[strength]}</p>
                  </div>
                )}
              </div>

              {/* Category + Website collapsed row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted mb-1.5 font-medium">Category</label>
                  <select
                    className="input w-full px-3 py-2 cursor-pointer text-sm"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1.5 font-medium">Website</label>
                  <input
                    className="input w-full px-3 py-2 text-sm"
                    placeholder="https://…"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-muted mb-1.5 font-medium">Notes</label>
                <textarea
                  className="input w-full px-3 py-2 resize-none text-sm"
                  rows={2}
                  placeholder="Recovery email, 2FA backup code…"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>

              {/* Favourite */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isFavorite}
                  onChange={(e) => set("isFavorite", e.target.checked)}
                  className="w-4 h-4 rounded accent-foreground cursor-pointer"
                />
                <span className="text-xs text-muted">Mark as favourite</span>
              </label>
            </div>

            {/* Sticky actions */}
            <div className="flex gap-3 px-5 pb-5 pt-2 border-t border-border-subtle flex-shrink-0">
              <button type="button" onClick={onClose} className="btn-ghost flex-1 px-4 py-2 text-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1 px-4 py-2 text-sm disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : isEdit ? "Update" : "Save password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
