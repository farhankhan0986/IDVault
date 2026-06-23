"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) { setUser(null); return; }
        const data = await res.json();
        setUser(data.loggedIn ? data.user : null);
      } catch {
        setUser(null);
      }
    };
    fetchMe();
  }, [pathname]);

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/signup") return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    router.push("/login");
  };

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  const navLinks = user
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/vault", label: "Vault" },
        { href: "/dashboard/card", label: "My Card" },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-14">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          ID<span className="text-muted">Vault</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors duration-150 ${
                isActive(href)
                  ? "bg-surface-2 text-foreground font-medium"
                  : "text-muted hover:text-foreground hover:bg-surface"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop right actions hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {/* User initial avatar */}
              <div className="w-7 h-7 rounded-full bg-surface-2 border border-border-subtle flex items-center justify-center text-xs font-medium text-muted select-none">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>

              <button
                onClick={handleLogout}
                className="btn-ghost px-3 py-1.5 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary px-4 py-1.5 text-sm">
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile: show Sign in or hamburger only */}
        <div className="flex md:hidden items-center gap-2">
          {!user && (
            <Link href="/login" className="btn-primary px-4 py-1.5 text-sm">
              Sign in
            </Link>
          )}
          {user && (
            <button
              className="btn-icon w-8 h-8"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && user && (
        <div className="md:hidden border-t border-border-subtle bg-background px-5 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                isActive(href)
                  ? "bg-surface-2 text-foreground font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-2 text-left px-3 py-2 text-sm text-danger hover:bg-danger/5 rounded-md transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
