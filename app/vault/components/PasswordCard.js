"use client";

import { useState } from "react";
import { toast } from "sonner";

// Category icons (text-based, no emoji overload)
const CATEGORY_META = {
  Google: { label: "Google", color: "#ea4335", letter: "G" },
  Social: { label: "Social", color: "#1d9bf0", letter: "S" },
  Work: { label: "Work", color: "#8b5cf6", letter: "W" },
  Finance: { label: "Finance", color: "#10b981", letter: "F" },
  Shopping: { label: "Shopping", color: "#f59e0b", letter: "Sh" },
  Email: { label: "Email", color: "#6366f1", letter: "E" },
  Entertainment: { label: "Entertainment", color: "#ec4899", letter: "En" },
  Other: { label: "Other", color: "#71717a", letter: "O" },
};

function Avatar({ category, label }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.Other;
  // If Google, show the brand "G" with brand red
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: meta.color + "22", border: `1px solid ${meta.color}33` }}
    >
      <span style={{ color: meta.color }}>{meta.letter}</span>
    </div>
  );
}

export default function PasswordCard({ entry, onEdit, onDelete }) {
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function copyPassword() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(entry.password);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = entry.password || "";
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
        } catch (err) {
          throw err;
        } finally {
          textArea.remove();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Password copied");
    } catch {
      toast.error("Clipboard access denied");
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${entry.label}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/passwords/${entry._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      toast.success("Deleted");
      onDelete(entry._id);
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  const maskedPass = "•".repeat(Math.min(entry.password?.length || 12, 16));

  return (
    <div className="card-flat p-4 flex flex-col gap-3 hover:border-border transition-colors duration-200">
      {/* Top row */}
      <div className="flex items-start gap-3">
        <Avatar category={entry.category} label={entry.label} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium truncate">{entry.label}</p>
            {entry.isFavorite && (
              <span className="text-xs text-muted-2" title="Favourite">
                ★
              </span>
            )}
            <span className="badge ml-auto">{entry.category}</span>
          </div>

          {entry.username && (
            <p className="text-xs text-muted mt-0.5 truncate">{entry.username}</p>
          )}

          {entry.website && (
            <a
              href={entry.website.startsWith("http") ? entry.website : `https://${entry.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-2 hover:text-foreground transition truncate block mt-0.5"
            >
              {entry.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </div>

      {/* Password row */}
      <div className="flex items-center gap-2 bg-background rounded-md px-3 py-2 border border-border-subtle">
        <span className="flex-1 font-mono text-sm text-foreground tracking-widest truncate">
          {showPass ? entry.password : maskedPass}
        </span>

        <button
          onClick={() => setShowPass((v) => !v)}
          className="btn-icon w-7 h-7 text-xs flex-shrink-0"
          title={showPass ? "Hide" : "Show"}
        >
          {showPass ? (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>

        <button
          onClick={copyPassword}
          className="btn-icon w-7 h-7 flex-shrink-0"
          title="Copy password"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
      </div>

      {/* Notes */}
      {entry.notes && (
        <p className="text-xs text-muted-2 leading-relaxed">{entry.notes}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-border-subtle">
        <button
          onClick={() => onEdit(entry)}
          className="btn-ghost px-3 py-1 text-xs flex-1"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-3 py-1 text-xs flex-1 rounded-md border border-border-subtle text-danger hover:bg-danger/5 transition disabled:opacity-50"
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
