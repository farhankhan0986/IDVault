"use client";

import { useRouter } from "next/navigation";
import { BadgeCheck, Briefcase, ArrowRight, MapPin } from "lucide-react";

export default function CardPreview({ card }) {
  const router = useRouter();

  if (!card) return null;

  return (
    <div
      onClick={() => router.push("/dashboard/card")}
      className="group cursor-pointer rounded-xl border border-border-subtle bg-background p-4 hover:border-border transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={card.profileImage || "/default-avatar.png"}
            alt={card.fullName}
            className="w-12 h-12 rounded-full object-cover border border-border-subtle"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-background flex items-center justify-center border border-border-subtle">
            <BadgeCheck size={11} className="text-foreground" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{card.fullName}</p>
          {card.title && (
            <div className="flex items-center gap-1 mt-0.5">
              <Briefcase size={10} className="text-muted-2 flex-shrink-0" />
              <p className="text-xs text-muted truncate">{card.title}</p>
            </div>
          )}
          {card.location && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="text-muted-2 flex-shrink-0" />
              <p className="text-xs text-muted-2 truncate">{card.location}</p>
            </div>
          )}
        </div>

        {/* Arrow */}
        <ArrowRight
          size={16}
          className="text-muted-2 group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0"
        />
      </div>

      <p className="mt-3 text-xs text-muted-2">
        View or manage your digital card →
      </p>
    </div>
  );
}
