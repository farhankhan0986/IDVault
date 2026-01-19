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
