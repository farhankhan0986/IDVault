"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";

export default function TagInput({ value = [], onChange, placeholder = "Add tag…", maxTags = 8, color }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  function addTag(raw) {
    const tag = raw.trim().replace(/,+$/, "").trim();
    if (!tag || value.map((v) => v.toLowerCase()).includes(tag.toLowerCase()) || value.length >= maxTags) return;
    onChange([...value, tag]);
    setInput("");
  }

  function removeTag(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  function handleBlur() {
    if (input.trim()) addTag(input);
  }

  const accent = color || "#71717a";

  return (
    <div
      className="input flex flex-wrap gap-1.5 p-2 min-h-[44px] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <span
          key={i}
          className="flex items-center gap-1 rounded-md px-2 py-[3px] text-xs font-medium flex-shrink-0"
          style={{
            color: accent,
            backgroundColor: accent + "18",
            border: `1px solid ${accent}35`,
          }}
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(i); }}
            className="opacity-50 hover:opacity-100 transition-opacity leading-none"
          >
            <X size={9} strokeWidth={3} />
          </button>
        </span>
      ))}
      {value.length < maxTags && (
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent text-sm outline-none min-w-[80px] placeholder:text-muted-2"
        />
      )}
    </div>
  );
}
