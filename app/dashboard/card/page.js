"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardUI from "@/app/components/CardUI";
import { ArrowLeft } from "lucide-react";

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
        {[1, 2, 3].map((i) => (
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

export default function MyCardPage() {
  const router = useRouter();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch("/api/cards/my", { credentials: "include" });
        if (!res.ok) { router.push("/dashboard"); return; }
        const data = await res.json();
        if (data.card) setCard(data.card);
      } catch {
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-sm mx-auto">
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-sm mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Your Digital Card</h1>
          <p className="text-xs text-muted mt-1">
            This is how your identity appears on IDVault
          </p>
        </div>

        {/* Card or empty state */}
        {card ? (
          <CardUI card={card} showActions />
        ) : (
          <div className="card-flat p-8 text-center">
            <p className="text-sm text-muted mb-4">No card found.</p>
            <button
              onClick={() => router.push("/create-card")}
              className="btn-primary px-5 py-2 text-sm"
            >
              Create your first card
            </button>
          </div>
        )}

        {/* Back link */}
        <button
  onClick={() => router.push("/dashboard")}
  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm font-medium text-muted transition-all duration-200 hover:bg-surface-2 hover:text-foreground hover:shadow-sm"
>
  <ArrowLeft size={16} />
  <span>Back to Dashboard</span>
</button>
      </div>
    </div>
  );
}
