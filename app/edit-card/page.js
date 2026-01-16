"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditCardPage() {
  const router = useRouter();

  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing card
  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch("/api/cards/my", {
        credentials: "include",
      });

      if (!res.ok) {
        router.push("/dashboard");
        return;
      }

      const data = await res.json();
      setForm(data.card);
      setPreview(data.card.profileImage || null);
      setLoading(false);
    };

    fetchCard();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    if (profileImage) {
      fd.append("profileImage", profileImage);
    }

    const res = await fetch("/api/cards/update", {
      method: "PUT",
      credentials: "include",
      body: fd,
    });

    if (res.ok) {
      router.push("/dashboard/card");
    } else {
      toast.error("Failed to update card. Please try again.");
    }

    toast.success("Card updated successfully!");
    setSaving(false);
  };

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-sm text-muted">
          Loading card…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto card p-6 md:p-8 space-y-4"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Digital Card
          </h1>
          <p className="text-sm text-muted mt-1">
            Update how your identity appears on IDVault
          </p>
        </div>

        {/* Profile Image */}
        <div>
          <label className="text-xs text-muted">Profile image</label>

          <label className="mt-2 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-8 cursor-pointer hover:bg-border transition">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover border border-border"
              />
            ) : (
              <span className="text-sm text-muted">
                Click to upload image
              </span>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Fields */}
        <div>
          <label className="text-xs text-muted">Full name</label>
          <input
            name="fullName"
            value={form.fullName || ""}
            onChange={handleChange}
            className="input w-full mt-1 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="text-xs text-muted">Title / Role</label>
          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            className="input w-full mt-1 px-3 py-2"
          />
        </div>

        <div>
          <label className="text-xs text-muted">Bio</label>
          <textarea
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
            rows={4}
            className="input w-full mt-1 px-3 py-2 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted">Public email</label>
            <input
              name="contactEmail"
              value={form.contactEmail || ""}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-xs text-muted">Phone</label>
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted">Location</label>
          <input
            name="location"
            value={form.location || ""}
            onChange={handleChange}
            className="input w-full mt-1 px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted">LinkedIn</label>
            <input
              name="linkedin"
              value={form.linkedin || ""}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-xs text-muted">GitHub</label>
            <input
              name="github"
              value={form.github || ""}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-xs text-muted">Resume Link</label>
            <input
              name="resumeLink"
              value={form.resumeLink || ""}
              onChange={handleChange}
              className="input w-full mt-1 px-3 py-2"
            />
          </div>


        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-border transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-6 py-2 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
