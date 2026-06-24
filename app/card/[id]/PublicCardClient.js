"use client";

import { useEffect, useState, useCallback } from "react";
import CardUI from "../../components/CardUI";
import Link from "next/link";
import { Shield, Zap, Heart } from "lucide-react";

function CardSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl border border-border-subtle bg-surface overflow-hidden animate-pulse">
      {/* Hero band */}
      <div className="h-24 bg-surface-2" />

      {/* Avatar */}
      <div className="flex justify-center -mt-10 mb-4">
        <div className="w-20 h-20 rounded-full bg-border border-4 border-surface" />
      </div>

      {/* Name & title */}
      <div className="px-6 pb-4 flex flex-col items-center gap-2">
        <div className="h-5 w-36 bg-border rounded" />
        <div className="h-3.5 w-24 bg-border rounded" />
      </div>

      {/* Contact block */}
      <div className="mx-4 mb-4 rounded-xl border border-border-subtle overflow-hidden">
        <div className="h-8 bg-surface-2" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-t border-border-subtle">
            <div className="w-7 h-7 rounded-md bg-border" />
            <div className="flex-1 h-3 bg-border rounded" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border-subtle px-4 py-3">
        <div className="h-3 w-24 bg-border rounded" />
      </div>
    </div>
  );
}

const LIKE_KEY = (id) => `idvault_liked_${id}`;

export default function PublicCardClient({ id }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/cards/public/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCard(data.card);
          setLikesCount(data.card.likesCount ?? 0);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCard();

    // Restore liked state from localStorage
    const storedLiked = localStorage.getItem(LIKE_KEY(id));
    if (storedLiked === "true") setLiked(true);
  }, [id]);

  const handleLike = useCallback(async () => {
    if (liking) return;
    setLiking(true);
    try {
      const res = await fetch(`/api/cards/like/${id}`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLikesCount(data.likesCount);
      setLiked(data.liked);
      localStorage.setItem(LIKE_KEY(id), String(data.liked));
    } catch {
      // silently fail — non-critical
    } finally {
      setLiking(false);
    }
  }, [id, liking]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <CardSkeleton />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center">
          <Shield size={24} className="text-muted-2" />
        </div>
        <h1 className="text-lg font-semibold">Card not found</h1>
        <p className="text-sm text-muted max-w-xs">
          This digital ID card doesn&apos;t exist or has been set to private.
        </p>
        <Link href="/" className="btn-ghost px-5 py-2 text-sm mt-2">
          ← Back to IDVault
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-5">

      {/* The card */}
      <div className="w-full max-w-sm">
        <CardUI card={card} showActions={false} />
      </div>

      {/* ── Like strip ── */}
      <div className="w-full max-w-sm rounded-xl border border-border-subtle bg-surface px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart
            size={14}
            className={`transition-colors duration-200 ${liked ? "text-rose-400 fill-rose-400" : "text-muted-2"}`}
          />
          {/* <span className="text-sm font-semibold tabular-nums">{likesCount}</span>
          <span className="text-xs text-muted-2">
            {likesCount === 1 ? "like" : "likes"}
          </span> */}
        </div>
        <button
          onClick={handleLike}
          disabled={liking}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all duration-200 disabled:opacity-60 ${
            liked
              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
              : "bg-background border-border-subtle text-muted hover:text-foreground hover:border-border"
          }`}
        >
          <Heart
            size={12}
            className={`transition-all duration-200 ${liked ? "fill-rose-400" : ""} ${liking ? "animate-pulse" : ""}`}
          />
          {liked ? "Liked" : "Like this card"}
        </button>
      </div>

      {/* Powered-by / CTA strip */}
      <div className="w-full max-w-sm rounded-xl border border-border-subtle bg-surface p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center flex-shrink-0 mt-0.5">
            <Zap size={14} className="text-muted" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Create your own Digital ID</p>
            <p className="text-xs text-muted mt-0.5">
              Free · Encrypted · Always up to date
            </p>
          </div>
          <Link
            href="/signup"
            className="btn-primary px-3 py-1.5 text-xs flex-shrink-0 self-center"
          >
            Get started
          </Link>
        </div>
      </div>

      {/* Footer attribution */}
      <p className="text-xs text-muted-2">
        Powered by{" "}
        <Link href="/" className="hover:text-foreground transition">
          IDVault
        </Link>
      </p>
    </div>
  );
}
