"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    floating_name: "",
    floating_email: "",
    floating_password: "",
    repeat_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.floating_password !== form.repeat_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          floating_name: form.floating_name.trim(),
          floating_email: form.floating_email.trim(),
          floating_password: form.floating_password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      router.push("/login");
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
            Create your <span className="text-accent">IDVault</span> account
          </h1>
          <p className="text-sm text-muted mt-1">
            Secure your digital IDs in one place
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-xs text-muted">Name</label>
            <input
              type="text"
              name="floating_name"
              value={form.floating_name}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-muted">Confirm password</label>
            <input
              type="password"
              name="repeat_password"
              value={form.repeat_password}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-xs text-muted">
            <input
              type="checkbox"
              required
              className="mt-1 accent-[var(--accent)]"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-accent hover:underline">
                Terms & Conditions
              </a>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2.5 mt-2 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-muted pt-2">
            Already have an account?{" "}
            <a href="/login" className="text-accent hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
