"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { inputClass } from "./styles";

export function moveItem(list, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
}

export const iconButton = "rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30";

// A simple list of text values, e.g. features or tags.
export default function ListField({ value = [], onChange }) {
  const update = (index, text) => onChange(value.map((item, i) => (i === index ? text : item)));

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <input value={item} onChange={(e) => update(index, e.target.value)} className={inputClass} />
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
      ))}
      <button type="button" onClick={() => onChange([...value, ""])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800">
        <Plus className="size-4" />
        Add item
      </button>
    </div>
  );
}
