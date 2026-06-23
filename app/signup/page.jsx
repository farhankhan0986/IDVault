"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: CreditCard,   text: "Digital ID card ready" },
  { icon: ShieldCheck,  text: "Password vault unlocked" },
  { icon: CheckCircle2, text: "All encrypted, always" },
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

function PasswordStrength({ password }) {
  if (!password) return null;
  let s = 0;
  if (password.length >= 8) s++;
  if (password.length >= 14) s++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
  if (/\d/.test(password)) s++;
  if (/[^a-zA-Z0-9]/.test(password)) s++;
  s = Math.min(s, 4);
  const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-emerald-500"];
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0,1,2,3,4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= s ? colors[s] : "bg-border-subtle"}`} />
        ))}
      </div>
      <p className="text-xs text-muted-2">{labels[s]}</p>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    floating_name: "",
    floating_email: "",
    floating_password: "",
    repeat_password: "",
  });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const passwordsMatch = !form.repeat_password || form.floating_password === form.repeat_password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.floating_password !== form.repeat_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res  = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          floating_name:     form.floating_name.trim(),
          floating_email:    form.floating_email.trim(),
          floating_password: form.floating_password,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Something went wrong"); return; }
      router.push("/login");
    } catch {
      setError("Server error. Please try again.");
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

        {/* Illustration area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div>
            <p className="text-xs font-medium text-muted-2 uppercase tracking-wider mb-3">
              Get started in seconds
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              One account.<br />Everything secured.
            </h2>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              Create your free IDVault account and stop forgetting passwords forever.
            </p>
          </div>

          {/* Timeline steps */}
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center flex-shrink-0">
                    <step.icon size={15} strokeWidth={1.8} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-4 bg-border-subtle" />
                  )}
                </div>
                <p className="text-sm text-muted">{step.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Stat chips */}
          <div className="flex gap-3 flex-wrap">
            {[
              { value: "Free", label: "forever" },
              { value: "AES-256", label: "encryption" },
              { value: "0", label: "ads" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-xl bg-background border border-border-subtle px-4 py-2.5">
                <p className="text-base font-semibold">{value}</p>
                <p className="text-xs text-muted-2">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-border-subtle pt-6">
          <p className="text-xs text-muted-2 italic leading-relaxed">
            &ldquo;Built by one developer. Zero investors. All for you.&rdquo;
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
            <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
            <p className="text-sm text-muted mt-1.5">Free, private, and encrypted</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-danger/5 border border-danger/20 px-3.5 py-2.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xs text-danger">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Full name</label>
              <input
                type="text"
                name="floating_name"
                value={form.floating_name}
                onChange={handleChange}
                required
                autoFocus
                autoComplete="name"
                placeholder="Farhan Khan"
                className="input w-full px-3.5 py-2.5"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Email address</label>
              <input
                type="email"
                name="floating_email"
                value={form.floating_email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input w-full px-3.5 py-2.5"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="floating_password"
                  value={form.floating_password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="input w-full px-3.5 py-2.5 pr-11"
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
              <PasswordStrength password={form.floating_password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="repeat_password"
                  value={form.repeat_password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  className={`input w-full px-3.5 py-2.5 pr-11 transition-colors ${
                    !passwordsMatch ? "border-danger/50 focus:border-danger/70" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-2 hover:text-foreground transition"
                  tabIndex={-1}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {!passwordsMatch && (
                <p className="text-xs text-danger mt-1.5">Passwords don&apos;t match</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 cursor-pointer accent-foreground flex-shrink-0"
              />
              <span className="text-xs text-muted leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-foreground underline underline-offset-4 hover:opacity-70 transition">
                  Terms &amp; Conditions
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !passwordsMatch}
              className="btn-primary w-full py-2.5 text-sm font-medium disabled:opacity-50 mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : "Create account"}
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

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground font-medium hover:opacity-70 transition underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
