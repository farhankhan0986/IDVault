"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  User,
  Briefcase,
  FileText,
  Mail,
  Phone,
  MapPin,
  ImagePlus,
  Save,
  Link2,
} from "lucide-react";
import LinksBuilder from "../components/LinksBuilder";

function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted mb-1.5">
        <Icon size={11} className="text-muted-2" />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function EditCardPage() {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [links, setLinks] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch("/api/cards/my", { credentials: "include" });
      if (!res.ok) { router.push("/dashboard"); return; }
      const data = await res.json();
      setForm(data.card);
      setPreview(data.card.profileImage || null);

      // Migrate old fixed fields into the new links array
      const existing = data.card.links ?? [];
      if (existing.length > 0) {
        setLinks(existing);
      } else {
        const migrated = [];
        if (data.card.linkedin) migrated.push({ label: "LinkedIn", url: data.card.linkedin });
        if (data.card.github)   migrated.push({ label: "GitHub",   url: data.card.github });
        if (data.card.resumeLink) migrated.push({ label: "Resume", url: data.card.resumeLink });
        setLinks(migrated.slice(0, 3));
      }

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
    fd.append("links", JSON.stringify(links));
    if (profileImage) fd.append("profileImage", profileImage);

    const res = await fetch("/api/cards/update", {
      method: "PUT",
      credentials: "include",
      body: fd,
    });

    setSaving(false);

    if (res.ok) {
      toast.success("Card updated successfully!");
      router.push("/dashboard/card");
    } else {
      toast.error("Failed to update card. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-border-subtle border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight">Edit Digital Card</h1>
          <p className="text-xs text-muted mt-1">
            Update how your identity appears on IDVault
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* ── Profile Image ── */}
            <div className="card-flat p-5">
              <p className="text-xs font-medium text-muted mb-3 uppercase tracking-wider">Photo</p>
              <label className="flex items-center gap-4 cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-dashed border-border bg-surface-2 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <ImagePlus size={16} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <ImagePlus size={20} className="text-muted-2" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {profileImage ? "Image selected" : "Change photo"}
                  </p>
                  <p className="text-xs text-muted-2 mt-0.5">Click to upload a new image</p>
                </div>
                <input
                  type="file"
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
                <Field icon={User} label="Full name">
                  <input name="fullName" value={form.fullName || ""} onChange={handleChange} required className="input w-full px-3 py-2" />
                </Field>
                <Field icon={Briefcase} label="Title / Role">
                  <input name="title" value={form.title || ""} onChange={handleChange} className="input w-full px-3 py-2" />
                </Field>
              </div>
              <Field icon={FileText} label="Bio">
                <textarea
                  name="bio"
                  value={form.bio || ""}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full px-3 py-2 resize-none"
                />
                <p className="text-xs text-muted-2 mt-1">{(form.bio || "").length}/500</p>
              </Field>
            </div>

            {/* ── Contact ── */}
            <div className="card-flat p-5 space-y-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">Contact</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field icon={Mail} label="Public email">
                  <input name="contactEmail" value={form.contactEmail || ""} onChange={handleChange} className="input w-full px-3 py-2" />
                </Field>
                <Field icon={Phone} label="Phone">
                  <input name="phone" value={form.phone || ""} onChange={handleChange} className="input w-full px-3 py-2" />
                </Field>
              </div>
              <Field icon={MapPin} label="Location">
                <input name="location" value={form.location || ""} onChange={handleChange} className="input w-full px-3 py-2" />
              </Field>
            </div>

            {/* ── Links ── */}
            <div className="card-flat p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Link2 size={11} className="text-muted-2" />
                  Links
                </p>
                <span className="text-[10px] text-muted-2">Up to 3</span>
              </div>
              <LinksBuilder value={links} onChange={setLinks} />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => router.back()} className="btn-ghost px-5 py-2 text-sm">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary px-6 py-2 text-sm disabled:opacity-50">
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={14} />
                    Save Changes
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
