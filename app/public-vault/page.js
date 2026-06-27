"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Heart, Search, Globe, TrendingUp, Clock,
  Briefcase, MapPin, ExternalLink, BadgeCheck, Users,
  Code2, Palette, GraduationCap, Building2,
} from "lucide-react";
import { CARD_TYPES, getCardType } from "../../lib/cardTypes";

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

/* ─── Card type icon map ─────────────────────────────────────────── */
const TYPE_ICONS = {
  professional: Briefcase,
  developer:    Code2,
  creative:     Palette,
  student:      GraduationCap,
  business:     Building2,
};

/* ─── Skeleton Card ─────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface overflow-hidden animate-pulse">
      <div className="h-28 bg-surface-2" />
      <div className="flex justify-center -mt-10 mb-3">
        <div className="w-20 h-20 rounded-full bg-border border-[3px] border-surface" />
      </div>
      <div className="px-5 pb-5 space-y-2 flex flex-col items-center">
        <div className="h-4 w-28 bg-border rounded" />
        <div className="h-3 w-20 bg-border rounded" />
        <div className="h-3 w-16 bg-border rounded mt-1" />
        <div className="w-full h-px bg-border-subtle mt-3" />
        <div className="h-9 w-full bg-border rounded-xl mt-2" />
      </div>
    </div>
  );
}

/* ─── Public Card Tile ──────────────────────────────────────────── */
function CardTile({ card, initialLiked, onLikeChange }) {
  const [liked, setLiked]   = useState(initialLiked);
  const [count, setCount]   = useState(card.likesCount ?? 0);
  const [loading, setLoading] = useState(false);

  const typeConfig = getCardType(card.cardType);
  const TypeIcon   = TYPE_ICONS[card.cardType] || Briefcase;

  async function handleLike(e) {
    e.preventDefault();
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
      className="group relative rounded-2xl border border-border-subtle bg-surface overflow-hidden flex flex-col transition-all duration-300 hover:border-border hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
    >
      {/* ── Banner ── */}
      <div className="relative h-28 flex-shrink-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${typeConfig.color}30 0%, ${typeConfig.color}08 50%, transparent 100%)` }}>
        {/* Animated shimmer layer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${typeConfig.color}18 0%, transparent 70%)` }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Decorative blobs */}
        <div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-30"
          style={{ background: typeConfig.color }}
        />
        <div
          className="absolute bottom-0 left-0 w-20 h-20 rounded-full blur-xl opacity-15"
          style={{ background: typeConfig.color }}
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span
            className="flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide"
            style={{
              borderColor: typeConfig.color + "60",
              color: typeConfig.color,
              backgroundColor: typeConfig.color + "18",
            }}
          >
            <TypeIcon size={9} />
            {typeConfig.label}
          </span>
        </div>
        {/* Like count pill — top right */}
        {count > 0 && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5 text-[9px] font-medium text-rose-400">
              <Heart size={8} className="fill-rose-400" />
              {count}
            </span>
          </div>
        )}
      </div>

      {/* ── Avatar ── */}
      <div className="relative flex justify-center -mt-10 mb-3 z-10">
        <div className="relative">
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-110"
            style={{ background: typeConfig.color }}
          />
          <img
            src={card.profileImage || "/default-avatar.png"}
            alt={card.fullName}
            className="relative w-20 h-20 rounded-full object-cover border-[3px] border-surface shadow-lg"
            style={{ boxShadow: `0 0 0 1px ${typeConfig.color}30` }}
          />
          {/* Verified badge */}
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface"
            style={{ background: typeConfig.color + "22", borderColor: "var(--surface)" }}
          >
            <BadgeCheck size={12} style={{ color: typeConfig.color }} />
          </div>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex-1 flex flex-col px-5 pb-5 items-center text-center gap-0.5">
        <h2 className="text-sm font-semibold tracking-tight leading-tight truncate max-w-full">
          {card.fullName}
        </h2>

        {card.title && (
          <div className="flex items-center gap-1 mt-1 text-muted">
            <Briefcase size={10} />
            <span className="text-xs truncate max-w-[160px]">{card.title}</span>
          </div>
        )}

        {card.location && (
          <div className="flex items-center gap-1 mt-0.5 text-muted-2">
            <MapPin size={10} />
            <span className="text-[11px] truncate max-w-[160px]">{card.location}</span>
          </div>
        )}

        {card.bio && (
          <p className="mt-2.5 text-[11px] text-muted leading-relaxed line-clamp-2 text-center">
            {card.bio}
          </p>
        )}

        {/* Card name pill */}
        {card.cardName && (
          <span
            className="mt-2 text-[9px] font-semibold rounded-full px-2.5 py-0.5 border tracking-wider uppercase"
            style={{
              color: typeConfig.color,
              borderColor: typeConfig.color + "40",
              backgroundColor: typeConfig.color + "10",
            }}
          >
            {card.cardName}
          </span>
        )}

        {/* ── Divider ── */}
        <div className="w-full mt-3 border-t border-border-subtle" />

        {/* ── Actions ── */}
        <div className="mt-3 flex w-full gap-2">
          <button
            onClick={handleLike}
            disabled={loading}
            className={`flex-shrink-0 flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-200 disabled:opacity-60 ${
              liked
                ? "border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                : "border-border-subtle bg-surface-2 text-muted hover:text-foreground hover:border-border"
            }`}
          >
            <Heart size={11} className={`transition-all ${liked ? "fill-rose-400" : ""} ${loading ? "animate-pulse" : ""}`} />
            {liked ? "Liked" : "Like"}
          </button>

          <div
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border-subtle px-3 py-2 text-xs font-medium text-muted group-hover:text-foreground group-hover:border-border group-hover:bg-surface-2 transition-all duration-200"
            style={{ "--hover-border": typeConfig.color + "50" }}
          >
            <ExternalLink size={11} />
            View Profile
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function PublicVaultPage() {
  const [cards, setCards]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort]     = useState("recent");
  const [cardType, setCardType] = useState("all");
  const [likedMap, setLikedMap] = useState({});

  const fetchCards = useCallback(async (sortVal, typeVal = "all") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort: sortVal });
      if (typeVal && typeVal !== "all") params.set("cardType", typeVal);
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
    fetchCards(sort, cardType);
    setLikedMap(getLikedIds());
  }, [sort, cardType, fetchCards]);

  // Client-side search filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(q) ||
        c.title?.toLowerCase().includes(q) ||
        c.location?.toLowerCase().includes(q) ||
        c.cardName?.toLowerCase().includes(q)
    );
  }, [cards, search]);

  function handleLikeChange(id, liked, count) {
    setLikedMap((prev) => ({ ...prev, [id]: liked }));
    setCards((prev) => prev.map((c) => (c._id === id ? { ...c, likesCount: count } : c)));
  }

  const typeFilters = [
    { id: "all", label: "All" },
    ...CARD_TYPES.map((t) => ({ id: t.id, label: t.label, color: t.color })),
  ];

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

          <div className="flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1.5 self-start sm:self-auto">
            <Users size={11} className="text-muted-2" />
            <span className="text-xs text-muted tabular-nums">
              {loading ? "—" : `${filtered.length} ${filtered.length === 1 ? "card" : "cards"}`}
            </span>
          </div>
        </div>

        {/* ── Search + Sort ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none" />
            <input
              className="input w-full pl-9 pr-4 py-2 text-sm"
              placeholder="Search by name, role, location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex rounded-lg border border-border-subtle bg-surface overflow-hidden flex-shrink-0 self-start sm:self-auto">
            {[
              { id: "recent",  label: "Recent",  icon: Clock },
              { id: "popular", label: "Popular", icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSort(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${
                  sort === id ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <Icon size={11} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Card Type Filter ── */}
        {/* <div className="flex flex-wrap gap-2 mb-7">
          {typeFilters.map(({ id, label, color }) => {
            const active = cardType === id;
            return (
              <button
                key={id}
                onClick={() => setCardType(id)}
                className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-medium transition-all duration-150"
                style={active && color ? {
                  borderColor: color + "60",
                  color: color,
                  backgroundColor: color + "12",
                } : active ? {
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface-2)",
                  color: "var(--foreground)",
                } : undefined}
              >
                {color && id !== "all" && (() => {
                  const Icon = TYPE_ICONS[id];
                  return Icon ? <Icon size={10} style={active ? { color } : undefined} /> : null;
                })()}
                {label}
              </button>
            );
          })}
        </div> */}

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center">
              <Globe size={22} className="text-muted-2" />
            </div>
            <div>
              <p className="text-sm font-medium">No cards found</p>
              <p className="text-xs text-muted-2 mt-1">
                {search || cardType !== "all"
                  ? "Try a different search or filter"
                  : "Be the first to make your card public!"}
              </p>
            </div>
            <Link href="/dashboard/card" className="btn-ghost px-5 py-2 text-sm">
              Go to My Cards →
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
