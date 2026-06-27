"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CreditCard, Zap } from "lucide-react";

const FEATURES = [
  { icon: Lock,       title: "AES-256 encrypted vault", desc: "Every password locked before it touches the server." },
  { icon: CreditCard, title: "Digital ID card",          desc: "One shareable link for your professional identity." },
  { icon: Zap,        title: "One-click copy",           desc: "Access any password instantly, no friction." },
];

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function validate(form) {
  const errs = {};
  if (!form.floating_email.trim()) {
    errs.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.floating_email.trim())) {
    errs.email = "Enter a valid email address";
  }
  if (!form.floating_password) {
    errs.password = "Password is required";
  } else if (form.floating_password.length < 6) {
    errs.password = "Password must be at least 6 characters";
  }
  return errs;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ floating_email: "", floating_password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    // clear field error on change
    if (errors[e.target.name === "floating_email" ? "email" : "password"]) {
      setErrors((prev) => ({ ...prev, [e.target.name === "floating_email" ? "email" : "password"]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.message || "Invalid credentials"); return; }
      router.refresh();
      router.push("/dashboard");
    } catch {
      setServerError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[44%] flex-shrink-0 bg-surface border-r border-border-subtle px-12 py-12"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--border-subtle) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ID<span className="text-muted">Vault</span>
        </Link>

        {/* Feature list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div>
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">
              Why IDVault?
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              Your identity &<br />passwords, secured.
            </h2>
          </div>

          <div className="space-y-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-background border border-border-subtle flex items-center justify-center text-base flex-shrink-0">
                  <f.icon size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-sm font-medium">{f.title}</p>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom quote */}
        <div className="border-t border-border-subtle pt-6">
          <p className="text-xs text-muted-2 italic leading-relaxed">
            &ldquo;No ads. No tracking. Just your data, encrypted and yours.&rdquo;
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background">

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden text-lg font-semibold tracking-tight mb-10">
          ID<span className="text-muted">Vault</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted mt-1.5">Sign in to your vault</p>
          </div>

          {/* Server error */}
          {serverError && (
            <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-danger/5 border border-danger/20 px-3.5 py-2.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xs text-danger">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="floating_email"
                value={form.floating_email}
                onChange={handleChange}
                autoFocus
                autoComplete="email"
                placeholder="you@example.com"
                className={`input w-full px-3.5 py-2.5 ${errors.email ? "border-danger/50 focus:border-danger/70" : ""}`}
              />
              {errors.email && <p className="text-xs text-danger mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="floating_password"
                  value={form.floating_password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className={`input w-full px-3.5 py-2.5 pr-11 ${errors.password ? "border-danger/50 focus:border-danger/70" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-2 hover:text-foreground transition"
                  tabIndex={-1}
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger mt-1.5">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-sm font-medium disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-2">or</span>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-foreground font-medium hover:opacity-70 transition underline underline-offset-4">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
