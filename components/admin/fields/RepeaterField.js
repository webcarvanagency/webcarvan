"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import FormField from "./FormField";
import { iconButton, moveItem } from "./ListField";

// A list of small objects, e.g. stats or process steps.
export default function RepeaterField({ fields, value = [], onChange }) {
  const update = (index, name, fieldValue) => onChange(value.map((item, i) => (i === index ? { ...item, [name]: fieldValue } : item)));

  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Item {index + 1}</span>
            <div className="flex">
              <button type="button" className={iconButton} onClick={() => onChange(moveItem(value, index, -1))} disabled={index === 0} aria-label="Move up">
                <ArrowUp className="size-4" />
              </button>
              <button
                type="button"
                className={iconButton}
                onClick={() => onChange(moveItem(value, index, 1))}
                disabled={index === value.length - 1}
                aria-label="Move down"
              >
                <ArrowDown className="size-4" />
              </button>
              <button type="button" className={`${iconButton} hover:text-red-600`} onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label="Remove">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {fields.map((field) => (
              <FormField key={field.name} field={field} value={item[field.name]} onChange={(fieldValue) => update(index, field.name, fieldValue)} />
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, {}])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800">
        <Plus className="size-4" />
        Add item
      </button>
    </div>
  );
}
