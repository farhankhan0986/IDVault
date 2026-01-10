"use client";

import { useEffect, useState } from "react";
import CardUI from "@/app/components/CardUI";

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
      <div className="min-h-screen flex items-center justify-center">
        Loading card...
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
    <div className="min-h-screen bg-gray-00 flex items-center justify-center p-6">
      <CardUI card={card} showActions={false} />
    </div>
  );
}
