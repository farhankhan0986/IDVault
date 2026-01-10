"use client";

import { useRouter } from "next/navigation";

export default function CardPreview({ card }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/dashboard/card")}
      className="group cursor-pointer max-w-md rounded-2xl border border-border bg-surface p-5 hover:border-accent transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <img
          src={card.profileImage || "/default-avatar.png"}
          alt={card.fullName}
          className="w-14 h-14 rounded-full object-cover border border-border"
        />

        <div className="flex-1">
          <h3 className="font-medium tracking-tight">
            {card.fullName}
          </h3>
          <p className="text-sm text-muted">
            {card.title || "Digital Identity"}
          </p>
        </div>

        {/* Arrow Indicator */}
        <div className="text-muted group-hover:text-accent transition">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        Click to view full digital card
      </p>
    </div>
  );
}
