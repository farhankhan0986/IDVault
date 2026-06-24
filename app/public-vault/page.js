"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Search,
  Globe,
  TrendingUp,
  Clock,
  Briefcase,
  MapPin,
  ExternalLink,
  BadgeCheck,
  Users,
} from "lucide-react";

/* ─── localStorage helpers ─────────────────────────────────────── */
const LIKE_KEY = (id) => `idvault_liked_${id}`;

function getLikedIds() {
  if (typeof window === "undefined") return {};
  const out = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith("idvault_liked_")) {
      const id = k.replace("idvault_liked_", "");
      out[id] = localStorage.getItem(k) === "true";
    }
  }
  return out;
}

/* ─── Skeleton Card ─────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface overflow-hidden animate-pulse">
      <div className="h-20 bg-surface-2" />
      <div className="flex justify-center -mt-9 mb-3">
        <div className="w-16 h-16 rounded-full bg-border border-4 border-surface" />
      </div>
      <div className="px-5 pb-5 space-y-2 flex flex-col items-center">
        <div className="h-4 w-28 bg-border rounded" />
        <div className="h-3 w-20 bg-border rounded" />
        <div className="h-3 w-16 bg-border rounded mt-1" />
        <div className="h-8 w-full bg-border rounded-lg mt-3" />
      </div>
    </div>
  );
}

/* ─── Public Card Tile ──────────────────────────────────────────── */
function CardTile({ card, initialLiked, onLikeChange }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(card.likesCount ?? 0);
  const [loading, setLoading] = useState(false);

  async function handleLike(e) {
    e.preventDefault(); // don't navigate
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cards/like/${card._id}`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCount(data.likesCount);
      setLiked(data.liked);
      localStorage.setItem(LIKE_KEY(card._id), String(data.liked));
      onLikeChange?.(card._id, data.liked, data.likesCount);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link
      href={`/card/${card._id}`}
      className="group relative rounded-2xl border border-border-subtle bg-surface overflow-hidden flex flex-col transition-all duration-200 hover:border-border hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
    >
      {/* Hero band */}
      <div className="relative h-20 bg-surface-2 flex-shrink-0">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
        {/* Like count badge */}
        {/* <div className="absolute top-2.5 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm border border-border-subtle rounded-full px-2 py-0.5">
          <Heart size={9} className={`transition-colors ${liked ? "fill-rose-400 text-rose-400" : "text-muted-2"}`} />
          <span className="text-[10px] tabular-nums text-muted font-medium">{count}</span>
        </div> */}
      </div>

      {/* Avatar */}
      <div className="relative flex justify-center -mt-8 mb-2 z-10">
        <div className="relative">
          <img
            src={card.profileImage || "/default-avatar.png"}
            alt={card.fullName}
            className="w-16 h-16 rounded-full object-cover border-4 border-surface shadow"
          />
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-surface flex items-center justify-center border border-border-subtle"
            title="Verified Digital ID"
          >
            <BadgeCheck size={11} className="text-foreground" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col px-4 pb-4 items-center text-center">
        <h2 className="text-sm font-semibold tracking-tight truncate max-w-full">{card.fullName}</h2>

        {card.title && (
          <div className="flex items-center gap-1 mt-0.5 text-muted">
            <Briefcase size={10} />
            <span className="text-xs truncate max-w-full">{card.title}</span>
          </div>
        )}

        {card.location && (
          <div className="flex items-center gap-1 mt-0.5 text-muted-2">
            <MapPin size={10} />
            <span className="text-[11px] truncate max-w-full">{card.location}</span>
          </div>
        )}

        {card.bio && (
          <p className="mt-2 text-[11px] text-muted leading-relaxed line-clamp-2 text-center">
            {card.bio}
          </p>
        )}

        {/* Actions row */}
        <div className="mt-3 flex w-full gap-2">
          {/* Like button */}
          <button
            onClick={handleLike}
            disabled={loading}
            className={`flex-shrink-0 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 disabled:opacity-60 ${
              liked
                ? "border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                : "border-border-subtle bg-background text-muted hover:text-foreground hover:border-border"
            }`}
          >
            <Heart
              size={11}
              className={`transition-all ${liked ? "fill-rose-400" : ""} ${loading ? "animate-pulse" : ""}`}
            />
            {liked ? "Liked" : "Like"}
          </button>

          {/* View card */}
          <div className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-border-subtle bg-background px-3 py-1.5 text-xs text-muted group-hover:text-foreground group-hover:border-border transition-all duration-200">
            <ExternalLink size={10} />
            View card
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function PublicVaultPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent"); // "recent" | "popular"
  const [likedMap, setLikedMap] = useState({});

  // Fetch on mount + whenever sort changes (server-side sort)
  const fetchCards = useCallback(async (sortVal, q = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort: sortVal, q });
      const res = await fetch(`/api/cards/public?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCards(data.cards || []);
    } catch {
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards(sort);
    setLikedMap(getLikedIds());
  }, [sort, fetchCards]);

  // Client-side search filter (fast, no re-fetch)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(q) ||
        c.title?.toLowerCase().includes(q) ||
        c.location?.toLowerCase().includes(q)
    );
  }, [cards, search]);

  function handleLikeChange(id, liked, count) {
    setLikedMap((prev) => ({ ...prev, [id]: liked }));
    setCards((prev) =>
      prev.map((c) => (c._id === id ? { ...c, likesCount: count } : c))
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Header ── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-surface-2 border border-border-subtle flex items-center justify-center">
                <Globe size={12} className="text-muted" />
              </div>
              <span className="text-xs font-medium text-muted uppercase tracking-wider">Public Vault</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Discover People</h1>
            <p className="text-sm text-muted mt-1">
              Browse public digital ID cards from the IDVault community
            </p>
          </div>

          {/* Stats pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1.5 self-start sm:self-auto">
            <Users size={11} className="text-muted-2" />
            <span className="text-xs text-muted tabular-nums">
              {loading ? "—" : `${cards.length} ${cards.length === 1 ? "card" : "cards"}`}
            </span>
          </div>
        </div>

        {/* ── Filters bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-7">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none"
            />
            <input
              className="input w-full pl-9 pr-4 py-2 text-sm"
              placeholder="Search by name, role, or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sort tabs */}
          <div className="flex rounded-lg border border-border-subtle bg-surface overflow-hidden flex-shrink-0 self-start sm:self-auto">
            {[
              { id: "recent",  label: "Recent",  icon: Clock },
              { id: "popular", label: "Popular", icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSort(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${
                  sort === id
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Icon size={11} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center">
              <Globe size={22} className="text-muted-2" />
            </div>
            <div>
              <p className="text-sm font-medium">No public cards yet</p>
              <p className="text-xs text-muted-2 mt-1">
                {search
                  ? "Try a different search term"
                  : "Be the first to make your card public!"}
              </p>
            </div>
            <Link href="/dashboard/card" className="btn-ghost px-5 py-2 text-sm">
              Go to My Card →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((card) => (
              <CardTile
                key={card._id}
                card={card}
                initialLiked={likedMap[card._id] ?? false}
                onLikeChange={handleLikeChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
