"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { ArrowLeft, ExternalLink, ImageOff, LoaderCircle, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collections } from "@/lib/admin-config";
import { publishChanges } from "@/lib/admin-api";
import { slugify } from "@/lib/utils";
import { useAdmin } from "./AdminShell";
import PageHeader from "./PageHeader";
import FormField from "./fields/FormField";
import { dangerButton, primaryButton, secondaryButton } from "./fields/styles";

function newItem(fields, count) {
  const item = {};
  fields.forEach((field) => {
    if (field.type === "toggle") item[field.name] = field.name === "published";
    if (field.type === "list" || field.type === "images") item[field.name] = [];
  });
  item.order = count + 1;
  if (fields.some((field) => field.name === "rating")) item.rating = 5;
  if (fields.some((field) => field.name === "date")) item.date = new Date().toISOString().slice(0, 10);
  return item;
}

export default function CollectionManager({ name }) {
  const config = collections[name];
  const { notify } = useAdmin();
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return onSnapshot(
      collection(db, name),
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(b.date || "").localeCompare(String(a.date || "")));
        setItems(list);
      },
      (error) => notify(error.message, "error")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const hasSlug = config.fields.some((field) => field.name === "slug");

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const { id, ...data } = editing;
      if (hasSlug) {
        data.slug = slugify(data.slug || data[config.titleField]);
        const duplicate = items.find((item) => item.slug === data.slug && item.id !== id);
        if (duplicate) throw new Error(`The URL slug "${data.slug}" is already used.`);
      }
      data.updatedAt = Date.now();
      const ref = id ? doc(db, name, id) : doc(collection(db, name));
      await setDoc(ref, data);
      await publishChanges();
      notify(`${config.singular} saved`);
      setEditing(null);
    } catch (error) {
      notify(error.message, "error");
    }
    setSaving(false);
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item[config.titleField]}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, name, item.id));
      await publishChanges();
      notify(`${config.singular} deleted`);
      setEditing(null);
    } catch (error) {
      notify(error.message, "error");
    }
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className="mx-auto max-w-4xl">
        <button type="button" onClick={() => setEditing(null)} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="size-4" />
          Back to {config.title}
        </button>
        <PageHeader title={editing.id ? `Edit ${config.singular}` : `New ${config.singular}`} />
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          {config.fields.map((field) => (
            <FormField key={field.name} field={field} value={editing[field.name]} onChange={(value) => setEditing({ ...editing, [field.name]: value })} />
          ))}
        </div>
        <div className="sticky bottom-0 mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur">
          <button type="submit" disabled={saving} className={primaryButton}>
            {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save {config.singular}
          </button>
          <button type="button" onClick={() => setEditing(null)} className={secondaryButton}>
            Cancel
          </button>
          {editing.id && (
            <button type="button" onClick={() => handleDelete(editing)} className={`${dangerButton} ml-auto`}>
              <Trash2 className="size-4" />
              Delete
            </button>
          )}
        </div>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={config.title} description={config.description}>
        <button type="button" onClick={() => setEditing(newItem(config.fields, items?.length || 0))} className={primaryButton}>
          <Plus className="size-4" />
          Add {config.singular}
        </button>
      </PageHeader>

      {items === null ? (
        <div className="flex justify-center py-20">
          <LoaderCircle className="size-7 animate-spin text-brand-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-slate-900">No {config.title.toLowerCase()} yet</p>
          <p className="mt-1 text-sm text-slate-500">Click &quot;Add {config.singular}&quot; to create the first one.</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 p-4">
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                {item[config.imageField] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item[config.imageField]} alt="" className="size-full object-cover" />
                ) : (
                  <ImageOff className="size-5 text-slate-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900">{item[config.titleField]}</p>
                <p className="truncate text-sm text-slate-500">{item[config.subtitleField]}</p>
              </div>
              <span
                className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline ${
                  item.published === false ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {item.published === false ? "Draft" : "Published"}
              </span>
              <div className="flex gap-1">
                {config.path && item.slug && item.published !== false && (
                  <a
                    href={`${config.path}/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    aria-label="View on website"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
                <button type="button" onClick={() => setEditing(item)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Edit">
                  <Pencil className="size-4" />
                </button>
                <button type="button" onClick={() => handleDelete(item)} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
