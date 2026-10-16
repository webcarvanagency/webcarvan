"use client";

import { useState } from "react";
import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { uploadImage } from "@/lib/admin-api";
import { useAdmin } from "../AdminShell";
import { inputClass } from "./styles";

export function ImageUploadButton({ onUploaded, label = "Upload Image" }) {
  const { notify } = useAdmin();
  const [uploading, setUploading] = useState(false);

  async function handleFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      onUploaded(await uploadImage(file));
      notify("Image uploaded");
    } catch (error) {
      notify(error.message, "error");
    }
    setUploading(false);
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
      {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
      {uploading ? "Uploading..." : label}
      <input type="file" accept="image/*" className="sr-only" onChange={handleFile} disabled={uploading} />
    </label>
  );
}

export default function ImageField({ id, value, onChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="size-full object-contain" />
        ) : (
          <ImagePlus className="size-6 text-slate-400" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap gap-2">
          <ImageUploadButton onUploaded={onChange} />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3.5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 className="size-4" />
              Remove
            </button>
          )}
        </div>
        <input id={id} type="url" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="or paste an image URL" className={inputClass} />
      </div>
    </div>
  );
}

export function ImagesField({ value = [], onChange }) {
  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((image, index) => (
            <li key={image + index} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="absolute top-2 right-2 rounded-md bg-white/90 p-1.5 text-red-600 shadow"
                aria-label="Remove image"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <ImageUploadButton label="Add Image" onUploaded={(url) => onChange([...value, url])} />
    </div>
  );
}
