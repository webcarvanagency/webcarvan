"use client";

import { useId } from "react";
import ImageField, { ImagesField } from "./ImageField";
import ListField from "./ListField";
import IconField from "./IconField";
import RepeaterField from "./RepeaterField";
import { inputClass, labelClass } from "./styles";

export default function FormField({ field, value, onChange }) {
  const id = useId();

  function renderInput() {
    switch (field.type) {
      case "textarea":
        return <textarea id={id} rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
      case "longtext":
        return <textarea id={id} rows={10} value={value || ""} onChange={(e) => onChange(e.target.value)} className={`${inputClass} leading-relaxed`} />;
      case "number":
        return (
          <input
            id={id}
            type="number"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            className={`${inputClass} max-w-40`}
          />
        );
      case "toggle":
        return (
          <button
            id={id}
            type="button"
            role="switch"
            aria-checked={Boolean(value)}
            onClick={() => onChange(!value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-brand-600" : "bg-slate-300"}`}
          >
            <span className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5.5" : "translate-x-0.5"}`} />
          </button>
        );
      case "image":
        return <ImageField id={id} value={value} onChange={onChange} />;
      case "images":
        return <ImagesField value={value || []} onChange={onChange} />;
      case "list":
        return <ListField value={value || []} onChange={onChange} />;
      case "icon":
        return <IconField value={value} onChange={onChange} />;
      case "repeater":
        return <RepeaterField fields={field.fields} value={value || []} onChange={onChange} />;
      default:
        return (
          <input
            id={id}
            type={field.type === "url" ? "url" : field.type === "date" ? "date" : "text"}
            required={field.required}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        );
    }
  }

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>
      {renderInput()}
      {field.help && <p className="mt-1.5 text-xs text-slate-500">{field.help}</p>}
    </div>
  );
}
