"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CardUI({ card, showActions = false }) {
  const router = useRouter();

  if (!card) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/card/${card._id}`
      : "";

  const handleCopy = async () => {
  if (typeof window === "undefined") return;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
    } else {
      // Fallback for older browsers / http
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    toast.success("Public link copied!");
  } catch (err) {
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

          if (!res.ok) {
            toast.error("Failed to delete card");
            return;
          }

          toast.success("Card deleted");
          router.push("/dashboard");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="max-w-md mx-auto card overflow-hidden">
      {/* Header */}
      <div className="relative flex flex-col items-center text-center p-6">
        {/* Accent glow */}
        <div className="absolute -top-20 -right-20 h-40 w-40 bg-accent opacity-20 blur-3xl pointer-events-none" />

        {showActions && (
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-500/10 text-red-400 px-4 py-2 text-sm hover:bg-red-500/20 cursor-pointer transition"
          >
            Copy Share Link
          </button>
        )}

        <img
          src={card.profileImage || "/default-avatar.png"}
          alt={card.fullName}
          className="relative w-24 h-24 mt-3 rounded-full object-cover border border-border mb-4"
        />

       <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <span className="relative flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-accent/30 blur-[6px]" />
            <img
              src="/check.png"
              alt="Verified"
              title="Verified Digital ID"
              className="relative w-4 h-4 rounded-full text-accent bg-background ring-1 ring-accent/40 p-[2px]"
            />
          </span>
          {card.fullName}
        </h2>

        {card.title && (
          <p className="text-sm text-accent mt-1 flex items-center gap-1">
            {/* Briefcase Icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12h.01M6 12h.01M18 12h.01M4 7h16v10H4zM9 7V5a3 3 0 016 0v2"
              />
            </svg>
            {card.title}
          </p>
        )}
      </div>

      {/* Bio */}
      {card.bio && (
        <div className="px-6 pb-4">
          <p className="text-sm text-muted leading-relaxed text-center">
            {card.bio}
          </p>
        </div>
      )}

      {/* Contact */}
      <div className="mx-6 my-4 rounded-xl border border-border bg-surface p-4">
        <h3 className="text-xs font-medium text-muted mb-3">
          CONTACT INFORMATION
        </h3>

        <div className="space-y-3 text-sm">
          {card.contactEmail && (
            <div className="flex items-center gap-3">
              {/* Email */}
              <svg
                className="w-4 h-4 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
              <span className="truncate">{card.contactEmail}</span>
            </div>
          )}

          {card.phone && (
            <div className="flex items-center gap-3">
              {/* Phone */}
              <svg
                className="w-4 h-4 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 7.87 6.38 14.25 14.25 14.25.98 0 1.78-.8 1.78-1.78v-2.64a1.78 1.78 0 00-1.4-1.74l-2.8-.56a1.78 1.78 0 00-1.76.74l-.62.93a11.1 11.1 0 01-5.2-5.2l.93-.62a1.78 1.78 0 00.74-1.76l-.56-2.8A1.78 1.78 0 006.78 2.25H4.03c-.98 0-1.78.8-1.78 1.78z"
                />
              </svg>
              <span>{card.phone}</span>
            </div>
          )}

          {card.location && (
            <div className="flex items-center gap-3">
              {/* Location */}
              <svg
                className="w-4 h-4 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s6-5.33 6-10a6 6 0 10-12 0c0 4.67 6 10 6 10z"
                />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
              <span>{card.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      {(card.linkedin || card.github) && (
        <div className="px-6 pb-6">
          <h3 className="text-xs font-medium text-muted mb-3 text-center">
            CONNECT
          </h3>

          <div className="flex justify-center gap-3">
            {card.linkedin && (
              <a
                href={card.linkedin}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm hover:bg-border transition"
              >
                {/* LinkedIn */}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zM8 19H5V9h3v10zM6.5 7.7c-1 0-1.7-.8-1.7-1.7 0-.9.7-1.7 1.7-1.7s1.7.8 1.7 1.7c0 .9-.7 1.7-1.7 1.7zM19 19h-3v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V19h-3V9h2.8v1.4h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.6V19z" />
                </svg>
                LinkedIn
              </a>
            )}

            {card.github && (
              <a
                href={card.github}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm hover:bg-border transition"
              >
                {/* GitHub */}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.7 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C23.5 5.7 18.3.5 12 .5z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="px-6 pb-6 space-y-3">
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/edit-card")}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-border transition"
            >
              ✏️ Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-500/10 text-red-400 px-4 py-2 text-sm hover:bg-red-500/20 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-border bg-surface py-3 text-center">
        <p className="text-xs text-muted">IDVault · Secure Digital Identity</p>
      </div>
    </div>
  );
}
