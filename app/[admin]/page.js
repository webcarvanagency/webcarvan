"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, doc, getCountFromServer, getDoc, query, where, writeBatch } from "firebase/firestore";
import { ArrowRight, Briefcase, DatabaseZap, Inbox, Layers, LoaderCircle, MessageSquareQuote, Newspaper, RefreshCw, Settings } from "lucide-react";
import { db } from "@/lib/firebase";
import { defaultContent, defaultSettings } from "@/lib/defaults";
import { publishChanges } from "@/lib/admin-api";
import { useAdmin } from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";
import { primaryButton, secondaryButton } from "@/components/admin/fields/styles";

const cards = [
  { key: "services", label: "Services", href: "/services", Icon: Layers },
  { key: "projects", label: "Projects", href: "/projects", Icon: Briefcase },
  { key: "testimonials", label: "Testimonials", href: "/testimonials", Icon: MessageSquareQuote },
  { key: "posts", label: "Insights", href: "/insights", Icon: Newspaper },
  { key: "unread", label: "Unread Messages", href: "/messages", Icon: Inbox },
];

async function fetchCounts() {
  const counts = {};
  for (const name of ["services", "projects", "testimonials", "posts"]) {
    counts[name] = (await getCountFromServer(collection(db, name))).data().count;
  }
  counts.unread = (await getCountFromServer(query(collection(db, "messages"), where("read", "==", false)))).data().count;
  const hasSettings = (await getDoc(doc(db, "settings", "site"))).exists();
  return { counts, hasSettings };
}

export default function DashboardPage() {
  const { user, notify, basePath } = useAdmin();
  const [counts, setCounts] = useState(null);
  const [hasSettings, setHasSettings] = useState(true);
  const [busy, setBusy] = useState("");

  function loadCounts() {
    return fetchCounts()
      .then((result) => {
        setCounts(result.counts);
        setHasSettings(result.hasSettings);
      })
      .catch((error) => notify(error.message, "error"));
  }

  useEffect(() => {
    loadCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function importStarterContent() {
    if (!window.confirm("Import the starter content? Existing items with the same IDs will be replaced.")) return;
    setBusy("import");
    try {
      const batch = writeBatch(db);
      if (!hasSettings) batch.set(doc(db, "settings", "site"), defaultSettings);
      Object.entries(defaultContent).forEach(([name, items]) => {
        items.forEach(({ id, ...data }) => batch.set(doc(db, name, id), data));
      });
      await batch.commit();
      await publishChanges();
      await loadCounts();
      notify("Starter content imported");
    } catch (error) {
      notify(error.message, "error");
    }
    setBusy("");
  }

  async function refreshWebsite() {
    setBusy("refresh");
    await publishChanges();
    notify("Website refreshed");
    setBusy("");
  }

  const isEmpty = counts && !hasSettings && counts.services + counts.projects + counts.testimonials + counts.posts === 0;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Dashboard" description={`Welcome back, ${user.email}`}>
        <button type="button" onClick={refreshWebsite} disabled={busy !== ""} className={secondaryButton}>
          <RefreshCw className={`size-4 ${busy === "refresh" ? "animate-spin" : ""}`} />
          Refresh Website
        </button>
      </PageHeader>

      {isEmpty && (
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:flex-row sm:items-center">
          <DatabaseZap className="size-10 shrink-0 text-brand-600" />
          <div className="flex-1">
            <h2 className="font-bold text-slate-900">Your database is empty</h2>
            <p className="mt-1 text-sm text-slate-600">Import the starter content to fill the website instantly, then edit everything from here.</p>
          </div>
          <button type="button" onClick={importStarterContent} disabled={busy !== ""} className={primaryButton}>
            {busy === "import" && <LoaderCircle className="size-4 animate-spin" />}
            Import Starter Content
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ key, label, href, Icon }) => (
          <Link key={key} href={basePath + href} className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md">
            <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 text-2xl font-bold text-slate-900">{counts ? counts[key] : "–"}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href={`${basePath}/settings`} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md">
          <Settings className="size-8 text-brand-600" />
          <div className="flex-1">
            <h2 className="font-bold text-slate-900">Site Settings</h2>
            <p className="text-sm text-slate-500">Logo, hero, about, contact details, social links and SEO.</p>
          </div>
          <ArrowRight className="size-5 text-slate-400 transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6">
          <DatabaseZap className="size-8 text-brand-600" />
          <div className="flex-1">
            <h2 className="font-bold text-slate-900">Starter Content</h2>
            <p className="text-sm text-slate-500">Re-import the sample services, projects, reviews and articles.</p>
          </div>
          <button type="button" onClick={importStarterContent} disabled={busy !== ""} className={secondaryButton}>
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
