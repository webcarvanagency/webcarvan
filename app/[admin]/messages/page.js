"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Inbox, LoaderCircle, Mail, MailOpen, MessageCircle, Phone, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { whatsappLink } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";

export default function MessagesPage() {
  const { notify } = useAdmin();
  const [messages, setMessages] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (snapshot) => setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (error) => notify(error.message, "error")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = messages?.find((message) => message.id === selectedId);

  async function openMessage(message) {
    setSelectedId(message.id);
    if (!message.read) await updateDoc(doc(db, "messages", message.id), { read: true });
  }

  async function toggleRead(message) {
    await updateDoc(doc(db, "messages", message.id), { read: !message.read });
  }

  async function removeMessage(message) {
    if (!window.confirm("Delete this message?")) return;
    await deleteDoc(doc(db, "messages", message.id));
    setSelectedId(null);
    notify("Message deleted");
  }

  if (messages === null) {
    return (
      <div className="flex justify-center py-20">
        <LoaderCircle className="size-7 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Messages" description="Enquiries sent through the contact form." />

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Inbox className="mx-auto size-10 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-900">No messages yet</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <ul className="max-h-[70vh] divide-y divide-slate-100 overflow-y-auto rounded-2xl border border-slate-200 bg-white">
            {messages.map((message) => (
              <li key={message.id}>
                <button
                  type="button"
                  onClick={() => openMessage(message)}
                  className={`flex w-full flex-col gap-1 p-4 text-left hover:bg-slate-50 ${selectedId === message.id ? "bg-brand-50" : ""}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className={`truncate text-sm ${message.read ? "text-slate-700" : "font-bold text-slate-900"}`}>{message.name}</span>
                    {!message.read && <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-label="Unread" />}
                  </span>
                  <span className="truncate text-xs text-slate-500">{message.service || message.email}</span>
                  <span className="text-xs text-slate-400">{new Date(message.createdAt).toLocaleString()}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            {selected ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                    <p className="text-sm text-slate-500">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleRead(selected)}
                      className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
                      aria-label={selected.read ? "Mark as unread" : "Mark as read"}
                    >
                      {selected.read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                    </button>
                    <button type="button" onClick={() => removeMessage(selected)} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <dl className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-5 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-xs text-slate-500">Email</dt>
                    <dd className="mt-1 font-medium break-all text-slate-900">{selected.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Phone</dt>
                    <dd className="mt-1 font-medium text-slate-900">{selected.phone || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Service</dt>
                    <dd className="mt-1 font-medium text-slate-900">{selected.service || "-"}</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm leading-relaxed whitespace-pre-line text-slate-700">{selected.message}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
                    <Mail className="size-4" />
                    Reply by Email
                  </a>
                  {selected.phone && (
                    <>
                      <a
                        href={whatsappLink(selected.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </a>
                      <a href={`tel:${selected.phone}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        <Phone className="size-4" />
                        Call
                      </a>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-60 flex-col items-center justify-center text-center text-slate-400">
                <MailOpen className="size-10" />
                <p className="mt-3 text-sm">Select a message to read it.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
