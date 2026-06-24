"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Lock,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Globe,
} from "lucide-react";

export default function Navbar() {
  const [user, setUser]         = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname  = usePathname();
  const router    = useRouter();
  const dropRef   = useRef(null);

  // ── Fetch user ──────────────────────────────────────────────────────────
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
    setMenuOpen(false);
    setUserOpen(false);
  }, [pathname]);

  // ── Scroll shadow ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close user dropdown on outside click ────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Hide on auth pages
  if (pathname === "/login" || pathname === "/signup") return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    router.push("/login");
  };

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  // Always-visible public link
  const PUBLIC_LINK = { href: "/public-vault", label: "Discover", icon: Globe };

  const NAV_LINKS = user
    ? [
        { href: "/dashboard",      label: "Dashboard", icon: LayoutDashboard },
        { href: "/vault",          label: "Vault",     icon: Lock },
        { href: "/dashboard/card", label: "My Card",   icon: CreditCard },
        PUBLIC_LINK,
      ]
    : [PUBLIC_LINK];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "border-b border-border-subtle"
            : "border-b border-transparent"
        }`}
        style={{
          backgroundColor: scrolled
            ? "rgba(9,9,11,0.92)"
            : "rgba(9,9,11,0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-14">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            {/* Wordmark icon */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold border border-border-subtle group-hover:border-border transition-colors"
              style={{ backgroundColor: "var(--surface-2)" }}
            >
              ID
            </div>
            <span className="text-sm font-semibold tracking-tight">
              ID<span className="text-muted">Vault</span>
            </span>
          </Link>

          {/* ── Desktop nav links (center) ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                  isActive(href)
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground hover:bg-surface"
                }`}
                style={isActive(href) ? { backgroundColor: "var(--surface-2)" } : {}}
              >
                <Icon size={13} />
                {label}
              </Link>
            ))}
          </div>

          {/* ── Desktop right side ── */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              /* User dropdown */
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setUserOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-lg border border-border-subtle px-2.5 py-1.5 hover:border-border hover:bg-surface transition-all duration-150"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  {/* Avatar */}
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                    style={{ backgroundColor: "var(--surface-2)" }}
                  >
                    {initials}
                  </div>
                  <span className="text-sm text-muted max-w-[100px] truncate">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`text-muted-2 transition-transform duration-150 ${userOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                {userOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+6px)] w-52 rounded-xl border border-border-subtle shadow-xl overflow-hidden"
                    style={{ backgroundColor: "var(--surface)" }}
                  >
                    {/* User info header */}
                    <div
                      className="px-4 py-3 border-b border-border-subtle"
                      style={{ backgroundColor: "var(--surface-2)" }}
                    >
                      <p className="text-xs font-medium truncate">{user.name}</p>
                      <p className="text-[11px] text-muted-2 truncate mt-0.5">{user.email}</p>
                    </div>

                    {/* Nav items */}
                    <div className="p-1">
                      {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setUserOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(href)
                              ? "bg-surface-2 text-foreground font-medium"
                              : "text-muted hover:text-foreground hover:bg-surface-2"
                          }`}
                        >
                          <Icon size={13} />
                          {label}
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="p-1 border-t border-border-subtle">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-danger hover:bg-surface-2 transition-colors"
                      >
                        <LogOut size={13} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface border border-transparent hover:border-border-subtle transition-all duration-150"
                >
                  Sign in
                </Link>
                <Link href="/signup" className="btn-primary px-4 py-1.5 text-sm">
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile right side ── */}
          <div className="flex md:hidden items-center gap-2">
            {!user ? (
              <>
                <Link
                  href="/public-vault"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border-subtle text-xs text-muted hover:text-foreground hover:bg-surface transition-all ${
                    isActive("/public-vault") ? "bg-surface text-foreground" : ""
                  }`}
                >
                  <Globe size={12} />
                  Discover
                </Link>
                <Link href="/login" className="btn-primary px-4 py-1.5 text-sm">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                {/* Mobile avatar pill */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold border border-border-subtle"
                  style={{ backgroundColor: "var(--surface-2)" }}
                >
                  {initials}
                </div>
                {/* Hamburger */}
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-subtle hover:border-border hover:bg-surface transition-colors"
                  style={{ backgroundColor: "var(--surface)" }}
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={15} /> : <Menu size={15} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && user && (
          <div
            className="md:hidden border-t border-border-subtle px-4 pb-4 pt-3"
            style={{ backgroundColor: "rgba(9,9,11,0.97)" }}
          >
            {/* User info */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border-subtle mb-3" style={{ backgroundColor: "var(--surface-2)" }}>
              <div className="w-8 h-8 rounded-lg border border-border-subtle flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ backgroundColor: "var(--surface)" }}>
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{user.name}</p>
                <p className="text-[11px] text-muted-2 truncate">{user.email}</p>
              </div>
            </div>

            {/* Nav links */}
            <div className="space-y-0.5 mb-3">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive(href)
                      ? "bg-surface-2 text-foreground font-medium"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              ))}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-danger hover:bg-surface transition-colors border border-transparent hover:border-border-subtle"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
