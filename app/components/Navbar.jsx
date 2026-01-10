"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.loggedIn ? data.user : null);
      } catch {
        setUser(null);
      }
    };

    fetchMe();
  }, [pathname]);

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/login");
  };

  const linkClass = (href) =>
    `text-sm transition ${
      pathname === href
        ? "text-accent"
        : "text-muted hover:text-foreground"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          ID<span className="text-accent">Vault</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>

              <Link
                href="/dashboard/card"
                className={linkClass("/dashboard/card")}
              >
                My Card
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-border px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-primary px-4 py-2 text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
