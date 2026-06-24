"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import CardPreview from "../components/CardPreview";
import {
  Lock,
  CreditCard,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  KeyRound,
  UserCircle2,
  Trash2,
  ChevronRight,
  Star,
} from "lucide-react";

// ── Greeting based on time of day ───────────────────────────────────────────
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Skeleton loader ──────────────────────────────────────────────────────────
function Skeleton({ className = "" }) {
  return (
    <div className={`rounded-lg bg-surface-2 animate-pulse ${className}`} />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
  }),
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser]           = useState(null);
  const [card, setCard]           = useState(null);
  const [cardCount, setCardCount] = useState(0);
  const [vaultCount, setVaultCount] = useState(null);
  const [favorites, setFavorites] = useState(0);
  const [loading, setLoading]     = useState(true);

  const handleDeleteAccount = () => {
    toast("Delete account", {
      description: "This will permanently delete your account and all data.",
      action: {
        label: "Delete",
        onClick: async () => {
          const res = await fetch("/api/auth/delete", { method: "DELETE", credentials: "include" });
          if (!res.ok) { toast.error("Failed to delete account"); return; }
          toast.success("Account deleted");
          router.push("/");
        },
      },
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const meRes = await fetch("/api/auth/me", { credentials: "include" });
        if (!meRes.ok) { router.push("/login"); return; }
        const meData = await meRes.json();
        setUser(meData.user);

        const [cardRes, vaultRes] = await Promise.all([
          fetch("/api/cards/my",        { credentials: "include" }),
          fetch("/api/passwords/list",  { credentials: "include" }),
        ]);

        if (cardRes.ok) {
          const cardData = await cardRes.json();
          const cards = cardData.cards || [];
          setCardCount(cards.length);
          setCard(cards[0] || null);
        }

        if (vaultRes.ok) {
          const vd = await vaultRes.json();
          const entries = vd.entries ?? [];
          setVaultCount(entries.length);
          setFavorites(entries.filter(e => e.isFavorite).length);
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-6">
        {/* header skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-3.5 w-32" />
          </div>
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
        {/* stat cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0,1,2].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        {/* card section skeleton */}
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  // ── Stat cards data ──────────────────────────────────────────────────────
  const STATS = [
    {
      icon: Lock,
      label: "Saved passwords",
      value: vaultCount ?? "-",
      sub: "AES-256 encrypted",
      href: "/vault",
      cta: "Open vault",
    },
    {
      icon: CreditCard,
      label: "Digital cards",
      value: cardCount > 0 ? cardCount : "None",
      sub: cardCount > 0 ? `${cardCount} card${cardCount !== 1 ? "s" : ""} created` : "Create your first card",
      href: cardCount > 0 ? "/dashboard/card" : "/create-card",
      cta: cardCount > 0 ? "View cards" : "Create card",
    },
    {
      icon: Star,
      label: "Favourites",
      value: favorites,
      sub: "Pinned passwords",
      href: "/vault",
      cta: "Open vault",
    },
  ];

  // ── Quick actions ────────────────────────────────────────────────────────
  const ACTIONS = [
    { icon: KeyRound,    label: "Add password",   href: "/vault",        primary: true },
    { icon: UserCircle2, label: cardCount > 0 ? "My cards" : "Create ID card", href: cardCount > 0 ? "/dashboard/card" : "/create-card" },
  ];

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <motion.div
        initial="hidden" animate="show" variants={fadeUp} custom={0}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold select-none flex-shrink-0 border border-border-subtle"
            style={{ backgroundColor: "var(--surface-2)" }}
          >
            {initials}
          </div>
          <div>
            <p className="text-xs text-muted-2">{greeting()}</p>
            <h1 className="text-lg font-semibold tracking-tight leading-tight">
              {user?.name ?? "-"}
            </h1>
          </div>
        </div>

        {/* Delete account - subtle, tucked away */}
        <button
          onClick={handleDeleteAccount}
          className="flex items-center gap-1.5 self-start sm:self-auto text-xs text-muted-2 hover:text-danger border border-border-subtle rounded-lg px-3 py-1.5 hover:border-danger/30 transition-colors"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <Trash2 size={11} />
          Delete account
        </button>
      </motion.div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map(({ icon: Icon, label, value, sub, href, cta }, i) => (
          <motion.div key={label} initial="hidden" animate="show" variants={fadeUp} custom={i + 1}>
            <Link
              href={href}
              className="flex flex-col rounded-2xl border border-border-subtle p-5 hover:border-border transition-all duration-200 group relative overflow-hidden"
              style={{ backgroundColor: "var(--surface)" }}
            >
              {/* Subtle dot-grid bg */}
              <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "16px 16px" }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl border border-border-subtle flex items-center justify-center" style={{ backgroundColor: "var(--surface-2)" }}>
                    <Icon size={16} className="text-muted" />
                  </div>
                  <ArrowUpRight size={14} className="text-muted-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-2xl font-semibold tabular-nums tracking-tight mb-0.5">{value}</p>
                <p className="text-xs text-muted">{label}</p>

                <div className="mt-auto pt-4 flex items-center gap-1 text-xs text-muted-2">
                  <span>{sub}</span>
                  <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── Quick actions ── */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} custom={4}>
        <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">Quick actions</p>
        <div className="flex flex-wrap gap-2">
          {ACTIONS.map(({ icon: Icon, label, href, primary }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                primary
                  ? "btn-primary border-transparent"
                  : "border-border-subtle hover:border-border hover:bg-surface-2"
              }`}
              style={!primary ? { backgroundColor: "var(--surface)" } : {}}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Security status strip ── */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} custom={5}>
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-2xl border border-border-subtle px-5 py-4"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg border border-border-subtle flex items-center justify-center" style={{ backgroundColor: "var(--surface-2)" }}>
              <ShieldCheck size={13} className="text-foreground" />
            </div>
            <span className="text-xs font-medium">Account secured</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-border-subtle" />
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {[
              "AES-256-GCM encryption",
              "JWT authentication",
              "Per-user data isolation",
            ].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-foreground opacity-30" />
                <span className="text-xs text-muted-2">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── ID Card section ── */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} custom={6}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-muted-2 uppercase tracking-wider">Your ID cards</p>
          {cardCount > 0 && (
            <Link href="/dashboard/card" className="flex items-center gap-1 text-xs text-muted-2 hover:text-foreground transition-colors">
              View all ({cardCount}) <ChevronRight size={12} />
            </Link>
          )}
        </div>

        {card ? (
          <div
            className="rounded-2xl border border-border-subtle overflow-hidden"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <div className="p-6">
              <CardPreview card={card} showActions={true} />
            </div>
          </div>
        ) : (
          /* Empty state */
          <div
            className="rounded-2xl border border-border-subtle border-dashed flex flex-col items-center justify-center py-14 px-6 text-center"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl border border-border-subtle flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--surface-2)" }}
            >
              <CreditCard size={20} className="text-muted-2" />
            </div>
            <p className="text-sm font-medium mb-1">No ID card yet</p>
            <p className="text-xs text-muted-2 mb-6 max-w-xs leading-relaxed">
              Create a shareable digital identity card with your name, role, contact info, and social links.
            </p>
            <Link href="/create-card" className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
              <Plus size={14} />
              Create your card
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
