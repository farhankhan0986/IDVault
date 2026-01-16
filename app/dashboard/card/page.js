"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardUI from "@/app/components/CardUI";

export default function MyCardPage() {
  const router = useRouter();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch("/api/cards/my", {
          credentials: "include",
          // cache: "no-store",
        });

        if (!res.ok) {
          router.push("/dashboard");
          return;
        }

        const data = await res.json();

        if (!data.card) {
          return;
        }

        setCard(data.card);
        console.log(data.card)
      } catch {
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [router]);

  /* Loading */
  if (loading ) {
    return (
      <div className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-md mx-auto animate-pulse rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-border rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-border rounded w-2/3" />
                <div className="h-3 bg-border rounded w-1/2" />
              </div>
            </div>

            <div className="mt-4 h-3 bg-border rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Your Digital Card
          </h1>
          <p className="text-sm text-muted mt-1">
            This is how your identity appears on IDVault
          </p>
        </div>

        {/* Card */}
        <div className="flex justify-center">
          {card && <CardUI card={card} showActions />}
          {!card && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-muted">No card found.</p>
              <button
                onClick={() => router.push("/create-card")}
                className="btn-primary cursor-pointer px-6 py-2"
              >
                Create your first card
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-muted hover:text-foreground transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
