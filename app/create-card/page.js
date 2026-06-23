"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  FileText,
  Mail,
  Phone,
  MapPin,
  Users2,
  Code2,
  Link2,
  ImagePlus,
  CheckCircle2,
} from "lucide-react";

function Field({ icon: Icon, label, required, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted mb-1.5">
        <Icon size={11} className="text-muted-2" />
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function CreateCardPage() {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file.name);
    setPreviewUrl(URL.createObjectURL(file));
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
      const res = await fetch("/api/cards/create", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Something went wrong"); return; }
      router.push("/dashboard");
    } catch {
      setError("Failed to create card");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight">Create Digital Card</h1>
          <p className="text-xs text-muted mt-1">
            This information will appear on your public digital ID
          </p>
        </div>

        {error && (
          <div className="mb-4 text-xs text-danger bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* ── Profile Image ── */}
            <div className="card-flat p-5">
              <p className="text-xs font-medium text-muted mb-3 uppercase tracking-wider">Photo</p>
              <label className="flex items-center gap-4 cursor-pointer">
                {/* Preview */}
                <div className="w-16 h-16 rounded-full border border-dashed border-border bg-surface-2 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlus size={20} className="text-muted-2" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {profileImage ? profileImage : "Upload profile photo"}
                  </p>
                  <p className="text-xs text-muted-2 mt-0.5">JPG, PNG, WEBP recommended 400×400</p>
                </div>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* ── Identity ── */}
            <div className="card-flat p-5 space-y-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">Identity</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field icon={User} label="Full name" required>
                  <input name="fullName" required onChange={handleChange} className="input w-full px-3 py-2" placeholder="Farhan Khan" />
                </Field>
                <Field icon={Briefcase} label="Title / Role">
                  <input name="title" onChange={handleChange} className="input w-full px-3 py-2" placeholder="Software Developer" />
                </Field>
              </div>
              <Field icon={FileText} label="Bio">
                <textarea
                  name="bio"
                  rows={3}
                  maxLength={500}
                  onChange={handleChange}
                  className="input w-full px-3 py-2 resize-none"
                  placeholder="Short introduction about yourself…"
                />
                <p className="text-xs text-muted-2 mt-1">{(form.bio || "").length}/500</p>
              </Field>
            </div>

            {/* ── Contact ── */}
            <div className="card-flat p-5 space-y-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">Contact</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field icon={Mail} label="Public email">
                  <input name="contactEmail" type="email" onChange={handleChange} className="input w-full px-3 py-2" placeholder="you@example.com" />
                </Field>
                <Field icon={Phone} label="Phone">
                  <input name="phone" type="tel" onChange={handleChange} className="input w-full px-3 py-2" placeholder="+91 98765 43210" />
                </Field>
              </div>
              <Field icon={MapPin} label="Location">
                <input name="location" onChange={handleChange} className="input w-full px-3 py-2" placeholder="Mumbai, India" />
              </Field>
            </div>

            {/* ── Links ── */}
            <div className="card-flat p-5 space-y-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">Links</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field icon={Users2} label="LinkedIn">
                  <input name="linkedin" type="url" onChange={handleChange} className="input w-full px-3 py-2" placeholder="https://linkedin.com/in/…" />
                </Field>
                <Field icon={Code2} label="GitHub">
                  <input name="github" type="url" onChange={handleChange} className="input w-full px-3 py-2" placeholder="https://github.com/…" />
                </Field>
              </div>
              <Field icon={Link2} label="Resume Link">
                <input name="resumeLink" type="url" onChange={handleChange} placeholder="https://drive.google.com/…" className="input w-full px-3 py-2" />
              </Field>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => router.back()} className="btn-ghost px-5 py-2 text-sm">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary px-6 py-2 text-sm gap-2 disabled:opacity-50">
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    Create Card
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
