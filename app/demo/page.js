"use client";

export default function DemoCardUI() {
  return (
    <div className="max-w-md mx-auto card overflow-hidden">
      {/* Header */}
      <div className="relative flex flex-col items-center text-center p-6">
        {/* Accent glow */}
        <div className="absolute -top-20 -right-20 h-40 w-40 bg-accent opacity-20 blur-3xl pointer-events-none" />

        <button className="flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-red-500/10 text-red-400 px-4 py-2 text-sm hover:bg-red-500/20 transition">
          Copy Share Link
        </button>

        <img
          src="/john.png"
          alt="Demo User"
          className="relative w-24 h-24 mt-3 rounded-full object-cover border border-border mb-4"
        />

        <h2 className="text-xl font-semibold tracking-tight">
          John Doe
        </h2>

        <p className="text-sm text-accent mt-1 flex items-center gap-1">
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
          Software Developer
        </p>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="text-sm text-muted leading-relaxed text-center">
          Passionate developer building clean, secure, and scalable digital
          experiences.
        </p>
      </div>

      {/* Contact */}
      <div className="mx-6 my-4 rounded-xl border border-border bg-surface p-4">
        <h3 className="text-xs font-medium text-muted mb-3">
          CONTACT INFORMATION
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
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
            <span>john@example.com</span>
          </div>

          <div className="flex items-center gap-3">
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
            <span>+1 234 567 890</span>
          </div>

          <div className="flex items-center gap-3">
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
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="px-6 pb-6">
        <h3 className="text-xs font-medium text-muted mb-3 text-center">
          CONNECT
        </h3>

        <div className="flex justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 hover:scale-105 rounded-full ease-in-out cursor-pointer duration-300 border border-border text-sm transition">
            LinkedIn
          </div>

          <div className="flex items-center gap-2 px-4 py-2 hover:scale-105 rounded-full ease-in-out cursor-pointer duration-300 border border-border text-sm transition">
            GitHub
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 space-y-3">
        <div className="flex gap-3">
          <button className="flex-1 rounded-lg border border-border hover:scale-105 ease-in-out cursor-pointer duration-300  px-4 py-2 text-sm">
            ✏️ Edit
          </button>
          <button className="flex-1 rounded-lg bg-red-500/10 hover:scale-105 ease-in-out cursor-pointer duration-300 text-red-400 px-4 py-2 text-sm">
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-surface py-3 text-center">
        <p className="text-xs text-muted">
          IDVault · Secure Digital Identity
        </p>
      </div>
    </div>
  );
}
