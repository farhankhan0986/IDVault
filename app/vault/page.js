"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import PasswordCard from "./components/PasswordCard";
import AddPasswordModal from "./components/AddPasswordModal";

const ALL_CATEGORIES = [
  "All",
  "Favourites",
  "Google",
  "Social",
  "Work",
  "Finance",
  "Shopping",
  "Email",
  "Entertainment",
  "Other",
];

export default function VaultPage() {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Auth + fetch
  useEffect(() => {
    const init = async () => {
      try {
        const meRes = await fetch("/api/auth/me", { credentials: "include" });
        if (!meRes.ok) {
          router.push("/login");
          return;
        }
        await fetchEntries();
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  async function fetchEntries() {
    try {
      const res = await fetch("/api/passwords/list", {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEntries(data.entries || []);
    } catch {
      toast.error("Failed to load vault");
    }
  }

  // Filtered entries
  const filtered = useMemo(() => {
    let list = [...entries];

    if (selectedCategory === "Favourites") {
      list = list.filter((e) => e.isFavorite);
    } else if (selectedCategory !== "All") {
      list = list.filter((e) => e.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.label?.toLowerCase().includes(q) ||
          e.username?.toLowerCase().includes(q) ||
          e.website?.toLowerCase().includes(q) ||
          e.category?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [entries, selectedCategory, searchQuery]);

  function handleEdit(entry) {
    setEditTarget(entry);
    setModalOpen(true);
  }

  function handleDelete(id) {
    setEntries((prev) => prev.filter((e) => e._id !== id));
  }

  function handleSaved() {
    setModalOpen(false);
    setEditTarget(null);
    fetchEntries();
  }

  function openAdd() {
    setEditTarget(null);
    setModalOpen(true);
  }

  // Counts per category for sidebar
  const counts = useMemo(() => {
    const c = { All: entries.length, Favourites: 0 };
    entries.forEach((e) => {
      c[e.category] = (c[e.category] || 0) + 1;
      if (e.isFavorite) c.Favourites++;
    });
    return c;
  }, [entries]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="w-10 h-10 border-2 border-border-subtle border-t-foreground rounded-full animate-spin mx-auto" />
          <p className="text-xs text-muted-2">Loading vault…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Password Vault
            </h1>
            <p className="text-xs text-muted mt-1">
              {entries.length} saved{" "}
              {entries.length === 1 ? "password" : "passwords"} · AES-256
              encrypted
            </p>
          </div>

          <button
            onClick={openAdd}
            className="btn-primary px-4 py-2 text-sm gap-2 flex-shrink-0 flex items-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add password
          </button>
        </div>

        <div className="flex gap-6">
          {/* ── Sidebar ── */}
          <aside className="hidden md:flex flex-col gap-1 w-44 flex-shrink-0">
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-2 px-2">
              Categories
            </p>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-150 text-left ${
                  selectedCategory === cat
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                <span>{cat}</span>
                {counts[cat] > 0 && (
                  <span
                    className={`text-xs tabular-nums ${
                      selectedCategory === cat ? "text-muted" : "text-muted-2"
                    }`}
                  >
                    {counts[cat]}
                  </span>
                )}
              </button>
            ))}
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Search + mobile category */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="input w-full pl-10 pr-4 py-2"
                  placeholder="Search by label, email, or website…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile category picker — custom dropdown */}
              <div ref={dropdownRef} className="relative md:hidden">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="input flex items-center justify-between gap-2 px-3 py-2 w-full min-w-[160px] cursor-pointer"
                >
                  <span className="text-sm text-foreground">
                    {selectedCategory}
                    {counts[selectedCategory] > 0 && (
                      <span className="ml-1.5 text-xs text-muted-2 tabular-nums">
                        ({counts[selectedCategory]})
                      </span>
                    )}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 text-muted-2 transition-transform duration-200 flex-shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-1.5 z-40 w-52 rounded-xl bg-surface border border-border-subtle shadow-2xl overflow-hidden py-1"
                    >
                      {ALL_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors duration-100 ${
                            selectedCategory === cat
                              ? "bg-surface-2 text-foreground"
                              : "text-muted hover:bg-surface-2/60 hover:text-foreground"
                          }`}
                        >
                          <span>{cat}</span>
                          {counts[cat] > 0 && (
                            <span
                              className={`text-xs tabular-nums px-1.5 py-0.5 rounded-md ${
                                selectedCategory === cat
                                  ? "bg-background text-muted"
                                  : "text-muted-2"
                              }`}
                            >
                              {counts[cat]}
                            </span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Google accounts spotlight */}
            {selectedCategory === "All" &&
              entries.filter((e) => e.category === "Google").length > 0 && (
                <div className="mb-6 p-4 rounded-xl border border-border-subtle bg-surface">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: "#ea4335" }}
                    >
                      G
                    </div>
                    <span className="text-xs font-medium text-muted">
                      Google accounts (
                      {entries.filter((e) => e.category === "Google").length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {entries
                      .filter((e) => e.category === "Google")
                      .map((entry) => (
                        <PasswordCard
                          key={entry._id}
                          entry={entry}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                  </div>
                </div>
              )}

            {/* Password grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-muted-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <p className="text-sm font-medium">No passwords here</p>
                <p className="text-xs text-muted-2 mt-1">
                  {searchQuery
                    ? "Try a different search term"
                    : selectedCategory === "All"
                    ? "Add your first password to get started"
                    : `No passwords in "${selectedCategory}" yet`}
                </p>
                {!searchQuery && selectedCategory === "All" && (
                  <button
                    onClick={openAdd}
                    className="btn-ghost mt-4 px-4 py-2 text-sm"
                  >
                    Add password →
                  </button>
                )}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filtered.map((entry, i) => (
                    <motion.div
                      key={entry._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                    >
                      <PasswordCard
                        entry={entry}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <AddPasswordModal
              initial={editTarget}
              onClose={() => {
                setModalOpen(false);
                setEditTarget(null);
              }}
              onSaved={handleSaved}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
