"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    floating_email: "",
    floating_password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      router.refresh();
      router.push("/dashboard");
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md card p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back to <span className="text-accent">IDVault</span>
          </h1>
          <p className="text-sm text-muted mt-1">
            Log in to access your secure IDs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs text-muted">Email address</label>
            <input
              type="email"
              name="floating_email"
              value={form.floating_email}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-muted">Password</label>
            <input
              type="password"
              name="floating_password"
              value={form.floating_password}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
              required
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              className="accent-accent cursor-pointer"
            />
            <span>Remember me</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2.5 mt-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-muted pt-2">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
