"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CardUI from "@/app/components/CardUI";
import { ArrowLeft, Plus, CreditCard } from "lucide-react";

function CardSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl border border-border-subtle bg-surface overflow-hidden animate-pulse">
      <div className="h-24 bg-surface-2" />
      <div className="flex justify-center -mt-10 mb-4">
        <div className="w-20 h-20 rounded-full bg-border border-4 border-surface" />
      </div>
      <div className="px-6 pb-5 flex flex-col items-center gap-2">
        <div className="h-5 w-32 bg-border rounded" />
        <div className="h-3.5 w-24 bg-border rounded" />
        <div className="h-3 w-20 bg-border rounded mt-1" />
      </div>
      <div className="mx-4 mb-4 rounded-xl border border-border-subtle overflow-hidden">
        <div className="h-8 bg-surface-2" />
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-t border-border-subtle">
            <div className="w-7 h-7 rounded-md bg-border flex-shrink-0" />
            <div className="flex-1 h-3 bg-border rounded" />
          </div>
        ))}
      </div>
      <div className="border-t border-border-subtle px-4 py-3">
        <div className="h-3 w-24 bg-border rounded" />
      </div>
    </div>
  );
}

export default function MyCardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards/my", { credentials: "include" });
        if (!res.ok) { router.push("/dashboard"); return; }
        const data = await res.json();
        setCards(data.cards || []);
      } catch {
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [router]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Your Digital Cards</h1>
            <p className="text-xs text-muted mt-1">
              {loading
                ? "Loading…"
                : cards.length === 0
                ? "No cards yet — create your first one"
                : `${cards.length} card${cards.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Link
            href="/create-card"
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm flex-shrink-0"
          >
            <Plus size={14} />
            New card
          </Link>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-2xl border border-border-subtle border-dashed flex flex-col items-center justify-center py-20 px-6 text-center bg-surface">
            <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-center mb-4">
              <CreditCard size={20} className="text-muted-2" />
            </div>
            <p className="text-sm font-medium mb-1">No cards yet</p>
            <p className="text-xs text-muted-2 mb-6 max-w-xs leading-relaxed">
              Create a shareable digital identity card with your name, role, contact info, and social links.
            </p>
            <Link href="/create-card" className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
              <Plus size={14} />
              Create your first card
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cards.map((card) => (
              <CardUI key={card._id} card={card} showActions />
            ))}
          </div>
        )}

        {/* Back link */}
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm font-medium text-muted transition-all duration-200 hover:bg-surface-2 hover:text-foreground hover:shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
