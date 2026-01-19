"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCardPage() {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const fd = new FormData();
    fd.append("fullName", form.fullName || "");
    fd.append("title", form.title || "");
    fd.append("bio", form.bio || "");
    fd.append("contactEmail", form.contactEmail || "");
    fd.append("phone", form.phone || "");
    fd.append("location", form.location || "");
    fd.append("linkedin", form.linkedin || "");
    fd.append("github", form.github || "");
    fd.append("resumeLink", form.resumeLink || "");

    if (e.target.profileImage.files[0]) {
      fd.append("profileImage", e.target.profileImage.files[0]);
    }

    try {
      const res = await fetch("/api/cards/create", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Failed to create card");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-2xl mx-auto card p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Digital Card
          </h1>
          <p className="text-sm text-muted mt-1">
            This information will appear on your public digital ID
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted">Full name</label>
              <input
                name="fullName"
                required
                onChange={handleChange}
                className="input w-full mt-1 px-3 py-2"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-xs text-muted">Title / Role</label>
              <input
                name="title"
                onChange={handleChange}
                className="input w-full mt-1 px-3 py-2"
                placeholder="Software Developer"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs text-muted">Bio</label>
            <textarea
              name="bio"
              rows={4}
              maxLength={500}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2 resize-none"
              placeholder="Short introduction about yourself"
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted">Public email</label>
              <input
                name="contactEmail"
                type="email"
                onChange={handleChange}
                className="input w-full mt-1 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-xs text-muted">Phone</label>
              <input
                name="phone"
                type="tel"
                onChange={handleChange}
                className="input w-full mt-1 px-3 py-2"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs text-muted">Location</label>
            <input
              name="location"
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
            />
          </div>

          {/* Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted">LinkedIn</label>
              <input
                name="linkedin"
                type="url"
                onChange={handleChange}
                className="input w-full mt-1 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-xs text-muted">GitHub</label>
              <input
                name="github"
                type="url"
                onChange={handleChange}
                className="input w-full mt-1 px-3 py-2"
              />
            </div>
            <div>
            <label className="text-xs text-muted">Resume Link</label>
            <input
              name="resumeLink"
              type="url"
              onChange={handleChange}
              placeholder="https://drive.google.com/file/d/..."
              className="input w-full mt-1 px-3 py-2"
            />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="text-xs text-muted">Profile image</label>

            <label className="mt-2 flex items-center justify-center gap-3 cursor-pointer rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-sm hover:bg-border transition">
              <span>
                {profileImage ? "Change image" : "Click to upload image"}
              </span>

              <input
                type="file"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setProfileImage(e.target.files[0].name);
                  }
                }}
              />
            </label>

            {profileImage && (
              <p className="mt-2 text-xs text-muted">
                Selected: {profileImage}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-6 py-2 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Digital Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
