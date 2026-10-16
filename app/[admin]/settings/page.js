"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { LoaderCircle, Save } from "lucide-react";
import { db } from "@/lib/firebase";
import { settingsTabs } from "@/lib/admin-config";
import { defaultSettings } from "@/lib/defaults";
import { publishChanges } from "@/lib/admin-api";
import { getValue, mergeDeep, setValue } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";
import FormField from "@/components/admin/fields/FormField";
import { primaryButton } from "@/components/admin/fields/styles";

export default function SettingsPage() {
  const { notify } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState(settingsTabs[0].id);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "settings", "site"))
      .then((snapshot) => setSettings(mergeDeep(defaultSettings, snapshot.exists() ? snapshot.data() : {})))
      .catch((error) => notify(error.message, "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "site"), { ...settings, updatedAt: Date.now() });
      await publishChanges();
      notify("Settings saved and published");
    } catch (error) {
      notify(error.message, "error");
    }
    setSaving(false);
  }

  if (!settings) {
    return (
      <div className="flex justify-center py-20">
        <LoaderCircle className="size-7 animate-spin text-brand-600" />
      </div>
    );
  }

  const tab = settingsTabs.find((item) => item.id === activeTab);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Site Settings" description="Control every text, image and contact detail on the website.">
        <button type="button" onClick={handleSave} disabled={saving} className={primaryButton}>
          {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Changes
        </button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Settings sections" className="flex gap-2 overflow-x-auto lg:flex-col">
          {settingsTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                activeTab === item.id ? "bg-brand-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100 lg:bg-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-bold text-slate-900">{tab.label}</h2>
          <div className="grid gap-6">
            {tab.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={getValue(settings, field.name)}
                onChange={(value) => setSettings(setValue(settings, field.name, value))}
              />
            ))}
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6">
            <button type="button" onClick={handleSave} disabled={saving} className={primaryButton}>
              {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
