"use client";

import { useState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";

const emptyForm = { name: "", email: "", phone: "", service: "", message: "" };

const inputClass =
  "w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none";

export default function ContactForm({ services = [] }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    try {
      // Firebase is loaded only when the form is sent, keeping it out of the page bundle.
      const [{ addDoc, collection }, { db }] = await Promise.all([import("firebase/firestore"), import("@/lib/firebase")]);
      if (!db) throw new Error("Firebase is not configured");
      await addDoc(collection(db, "messages"), { ...form, createdAt: Date.now(), read: false });
      setForm(emptyForm);
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-14 text-center">
        <CircleCheck className="size-12 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-navy-900">Thank you! Your message has been sent.</h3>
        <p className="mt-2 text-sm text-slate-600">We will get back to you as soon as possible.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-800">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy-900">
          Full Name
        </label>
        <input id="name" name="name" required maxLength={100} value={form.name} onChange={update} className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy-900">
          Email Address
        </label>
        <input id="email" name="email" type="email" required maxLength={150} value={form.email} onChange={update} className={inputClass} placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy-900">
          Phone / WhatsApp
        </label>
        <input id="phone" name="phone" maxLength={30} value={form.phone} onChange={update} className={inputClass} placeholder="+92 300 0000000" />
      </div>
      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium text-navy-900">
          Service Needed
        </label>
        <select id="service" name="service" value={form.service} onChange={update} className={inputClass}>
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy-900">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          value={form.message}
          onChange={update}
          className={inputClass}
          placeholder="Tell us about your project, goals and timeline..."
        />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {status === "sending" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-600" role="alert">
            Sorry, the message could not be sent. Please email or WhatsApp us directly.
          </p>
        )}
      </div>
    </form>
  );
}
