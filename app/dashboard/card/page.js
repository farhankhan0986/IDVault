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
  if (loading) {
  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-md mx-auto card overflow-hidden animate-pulse">
        {/* Header */}
        <div className="relative flex flex-col items-center text-center p-6">
          <div className="absolute -top-20 -right-20 h-40 w-40 bg-border opacity-20 blur-3xl" />

          {/* Action button placeholder */}
          <div className="w-full h-9 rounded-lg bg-border mb-4" />

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-border mb-4" />

          {/* Name */}
          <div className="h-5 w-2/3 bg-border rounded mb-2" />

          {/* Title */}
          <div className="h-4 w-1/2 bg-border rounded" />
        </div>

        {/* Bio */}
        <div className="px-6 pb-4 space-y-2">
          <div className="h-3 w-full bg-border rounded" />
          <div className="h-3 w-5/6 bg-border rounded" />
          <div className="h-3 w-2/3 bg-border rounded mx-auto" />
        </div>

        {/* Contact */}
        <div className="mx-6 my-4 rounded-xl border border-border bg-surface p-4 space-y-3">
          <div className="h-3 w-1/3 bg-border rounded mb-2" />
          <div className="h-4 w-full bg-border rounded" />
          <div className="h-4 w-5/6 bg-border rounded" />
          <div className="h-4 w-2/3 bg-border rounded" />
        </div>

        {/* Social */}
        <div className="px-6 pb-6">
          <div className="h-3 w-1/3 bg-border rounded mx-auto mb-3" />
          <div className="flex justify-center gap-3">
            <div className="h-9 w-24 bg-border rounded-full" />
            <div className="h-9 w-24 bg-border rounded-full" />
            <div className="h-9 w-24 bg-border rounded-full" />
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6">
          <div className="flex gap-3">
            <div className="flex-1 h-9 bg-border rounded-lg" />
            <div className="flex-1 h-9 bg-border rounded-lg" />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-surface py-3">
          <div className="h-3 w-1/2 bg-border rounded mx-auto" />
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
