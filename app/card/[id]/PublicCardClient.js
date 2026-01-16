"use client";

import { useEffect, useState } from "react";
import CardUI from "../../components/CardUI";
import Link from "next/link";


export default function PublicCardClient({ id }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCard = async () => {
      const res = await fetch(`/api/cards/public/${id}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setCard(data.card);
      setLoading(false);
    };

    fetchCard();
  }, [id]);

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

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Card not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 space-y-8">
  {/* Card */}
  <CardUI card={card} showActions={false} />

  {/* Public CTA */}
  <div className="w-full max-w-md rounded-xl border border-border bg-surface p-4 text-center">
    <p className="text-sm font-medium">
      ✨ Create your own Digital ID
    </p>

    <p className="mt-1 text-xs text-muted mb-3">
      Free · Secure · Shareable
    </p>

    <Link href="/" className="btn-primary mt-3 px-5 py-2 text-sm inline-block">
      Get Your Free ID →
    </Link>
  </div>
</div>

  );
}
