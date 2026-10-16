"use client";

import { Icon, iconOptions } from "@/lib/icons";

export default function IconField({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {iconOptions.map((name) => (
        <button
          key={name}
          type="button"
          title={name}
          onClick={() => onChange(name)}
          className={`flex size-10 items-center justify-center rounded-lg border transition-colors ${
            value === name ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
          }`}
        >
          <Icon name={name} className="size-4.5" />
        </button>
      ))}
    </div>
  );
}
