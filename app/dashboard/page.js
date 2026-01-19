"use client";

import { useEffect, useState } from "react";
import CardPreview from "../components/CardPreview";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  const handleDeleteAccount = () => {
    toast("Delete Account clicked", {
      description: "This will trigger account deletion flow.",
      action: {
        label: "Delete",
        onClick: async () => {
          const res = await fetch("/api/auth/delete", {
            method: "DELETE",
            credentials: "include",
          });
          if (!res.ok) {
            toast.error("Failed to delete account");
            return;
          }
          toast.success("Account deleted successfully");
          router.push("/");
        },
      },
    });
  };

  const [user, setUser] = useState(null);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Auth check
        const meRes = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!meRes.ok) {
          router.push("/login");
          return;
        }

        const meData = await meRes.json();
        setUser(meData.user);

        // Fetch card
        const cardRes = await fetch("/api/cards/my", {
          credentials: "include",
          // cache: "no-store",
        });

        if (cardRes.ok) {
          const data = await cardRes.json();
          setCard(data.card);
        } else {
          setCard(null);
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  /* Loading Skeleton */
  if (loading) {
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
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-sm text-muted mt-1">
              Manage your digital identity with IDVault
            </p>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="rounded-xl cursor-pointer border border-red-400 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
          >
            Delete Account
          </button>
        </div>

        {/* Content */}
        {card ? (
          <div className="card p-6">
            <CardPreview card={card} showActions={true} />
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="text-sm text-muted mb-4">
              You haven’t created a digital card yet.
            </p>
            <button
              onClick={() => router.push("/create-card")}
              className="btn-primary px-6 py-2"
            >
              Create your first card
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
