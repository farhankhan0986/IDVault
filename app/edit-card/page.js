"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  User, Briefcase, FileText, Mail, Phone, MapPin,
  ImagePlus, Save, Link2, Code2, Palette,
  GraduationCap, Building2, Tag,
} from "lucide-react";
import LinksBuilder from "../components/LinksBuilder";
import TagInput from "../components/TagInput";
import { CARD_TYPES } from "../../lib/cardTypes";

const TYPE_ICONS = {
  professional: Briefcase,
  developer:    Code2,
  creative:     Palette,
  student:      GraduationCap,
  business:     Building2,
};

function Field({ icon: Icon, label, hint, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted mb-1.5">
        <Icon size={11} className="text-muted-2" />
        {label}
      </label>
      {children}
      {hint && <p className="text-[10px] text-muted-2 mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ value, onChange, color }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="relative flex-shrink-0 rounded-full border transition-all duration-200"
      style={{
        width: "42px", height: "24px",
        borderColor: value ? color + "60" : "var(--border-subtle)",
        backgroundColor: value ? color + "22" : "var(--surface-2)",
      }}
    >
      <span
        className="absolute top-[3px] rounded-full transition-all duration-200"
        style={{
          width: "18px", height: "18px",
          left: value ? "21px" : "3px",
          backgroundColor: value ? color : "var(--border)",
        }}
      />
    </button>
  );
}

function TypeSection({ type, techStack, setTechStack, institution, setInstitution, openToWork, setOpenToWork }) {
  const TypeIcon = TYPE_ICONS[type.id] || Briefcase;
  const hasInst  = !!type.institutionLabel;
  const hasTags  = !!type.tagLabel;
  const hasOpen  = !!type.openToLabel;

  if (!hasInst && !hasTags && !hasOpen) return null;

  return (
    <div
      className="card-flat p-5 space-y-4"
      style={{ borderColor: type.color + "30", backgroundColor: type.color + "05" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
        style={{ color: type.color }}
      >
        <TypeIcon size={11} />
        {type.label} Details
      </p>

      {hasInst && (
        <Field
          icon={type.id === "student" ? GraduationCap : Building2}
          label={type.institutionLabel}
        >
          <input
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder={type.institutionPlaceholder}
            className="input w-full px-3 py-2"
          />
        </Field>
      )}

      {hasTags && (
        <Field
          icon={Tag}
          label={type.tagLabel}
          hint="Press Enter or comma to add · up to 8"
        >
          <TagInput
            value={techStack}
            onChange={setTechStack}
            placeholder={type.tagPlaceholder}
            color={type.color}
            maxTags={8}
          />
        </Field>
      )}

      {hasOpen && (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium">{type.openToLabel}</p>
            <p className="text-[10px] text-muted-2 mt-0.5">{type.openToSub}</p>
          </div>
          <Toggle value={openToWork} onChange={setOpenToWork} color={type.color} />
        </div>
      )}
    </div>
  );
}

function EditCardContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const cardId       = searchParams.get("id");

  const [cardType, setCardType]   = useState("professional");
  const [form, setForm]           = useState({});
  const [links, setLinks]         = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [institution, setInstitution] = useState("");
  const [openToWork, setOpenToWork]   = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);

  const selectedType = CARD_TYPES.find((t) => t.id === cardType) || CARD_TYPES[0];

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch("/api/cards/my", { credentials: "include" });
      if (!res.ok) { router.push("/dashboard"); return; }
      const data = await res.json();
      const cards = data.cards || [];

      const card = cardId
        ? cards.find((c) => c._id === cardId) || cards[0]
        : cards[0];

      if (!card) { router.push("/dashboard"); return; }

      setForm(card);
      setCardType(card.cardType || "professional");
      setPreview(card.profileImage || null);
      setTechStack(card.techStack || []);
      setInstitution(card.institution || "");
      setOpenToWork(card.openToWork || false);

      // Merge new-style links with any legacy fields not already covered
      const existing   = card.links ?? [];
      const usedLabels = new Set(existing.map((l) => l.label?.toLowerCase()));
      const merged     = [...existing];
      if (card.linkedin && !usedLabels.has("linkedin"))
        merged.push({ label: "LinkedIn", url: card.linkedin });
      if (card.github && !usedLabels.has("github"))
        merged.push({ label: "GitHub", url: card.github });
      if (card.resumeLink && !usedLabels.has("resume"))
        merged.push({ label: "Resume", url: card.resumeLink });
      setLinks(merged.slice(0, 3));

      setLoading(false);
    };
    fetchCard();
  }, [router, cardId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    fd.append("cardId",       form._id || "");
    fd.append("cardType",     cardType);
    fd.append("cardName",     form.cardName     || "");
    fd.append("fullName",     form.fullName     || "");
    fd.append("title",        form.title        || "");
    fd.append("bio",          form.bio          || "");
    fd.append("contactEmail", form.contactEmail || "");
    fd.append("phone",        form.phone        || "");
    fd.append("location",     form.location     || "");
    fd.append("institution",  institution);
    fd.append("openToWork",   String(openToWork));
    fd.append("techStack",    JSON.stringify(techStack));
    fd.append("links",        JSON.stringify(links));
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

        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight">Edit Digital Card</h1>
          <p className="text-xs text-muted mt-1">Update how your identity appears on IDVault</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* ── Card Type ── */}
            <div className="card-flat p-5">
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-4">Card type</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CARD_TYPES.map((type) => {
                  const Icon   = TYPE_ICONS[type.id];
                  const active = cardType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setCardType(type.id)}
                      className="flex flex-col items-start gap-2 rounded-xl border border-border-subtle cursor-pointer p-3.5 text-left transition-all duration-150"
                      style={{
                        borderColor: active ? type.color + "80" : undefined,
                        backgroundColor: active ? type.color + "0f" : undefined,
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: type.color + (active ? "28" : "15"),
                          border: `1px solid ${type.color}30`,
                        }}
                      >
                        <Icon size={15} style={{ color: type.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: active ? type.color : undefined }}>
                          {type.label}
                        </p>
                        <p className="text-[10px] text-muted-2 leading-tight mt-0.5">{type.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Card Label ── */}
            <div className="card-flat p-5">
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-3">Card label</p>
              <Field icon={Link2} label="Card name (optional)">
                <input
                  name="cardName"
                  value={form.cardName || ""}
                  onChange={handleChange}
                  placeholder={`e.g. "Work Card", "Portfolio", "Conference"`}
                  className="input w-full px-3 py-2"
                  maxLength={50}
                />
              </Field>
            </div>

            {/* ── Photo ── */}
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
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            {/* ── Identity ── */}
            <div className="card-flat p-5 space-y-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">Identity</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field icon={User} label="Full name">
                  <input
                    name="fullName"
                    value={form.fullName || ""}
                    onChange={handleChange}
                    required
                    className="input w-full px-3 py-2"
                  />
                </Field>
                <Field icon={Briefcase} label={selectedType.titleLabel || "Title / Role"}>
                  <input
                    name="title"
                    value={form.title || ""}
                    onChange={handleChange}
                    className="input w-full px-3 py-2"
                    placeholder={selectedType.placeholderTitle}
                  />
                </Field>
              </div>
              <Field icon={FileText} label="Bio">
                <textarea
                  name="bio"
                  value={form.bio || ""}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full px-3 py-2 resize-none"
                  placeholder={selectedType.placeholderBio}
                />
                <p className="text-[10px] text-muted-2 mt-1">{(form.bio || "").length}/500</p>
              </Field>
            </div>

            {/* ── Type-specific section ── */}
            <TypeSection
              type={selectedType}
              techStack={techStack}
              setTechStack={setTechStack}
              institution={institution}
              setInstitution={setInstitution}
              openToWork={openToWork}
              setOpenToWork={setOpenToWork}
            />

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

            {/* ── Actions ── */}
            <div className="flex justify-end gap-3 pb-4">
              <button type="button" onClick={() => router.back()} className="btn-ghost px-5 py-2 text-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary px-6 py-2 text-sm disabled:opacity-50"
                style={!saving ? { backgroundColor: selectedType.color } : {}}
              >
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

export default function EditCardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-border-subtle border-t-foreground rounded-full animate-spin" />
        </div>
      }
    >
      <EditCardContent />
    </Suspense>
  );
}
