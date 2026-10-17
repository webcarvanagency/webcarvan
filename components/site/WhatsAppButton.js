import { whatsappLink } from "@/lib/utils";

export default function WhatsAppButton({ contact }) {
  const href = whatsappLink(contact.whatsapp, contact.whatsappMessage);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 opacity-0 shadow-lg ring-1 ring-slate-200 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block sm:translate-x-2">
        Chat with us
      </span>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/30 transition-transform duration-300 group-hover:scale-110 motion-safe:after:absolute motion-safe:after:inset-0 motion-safe:after:animate-ping motion-safe:after:rounded-full motion-safe:after:bg-[#25D366] motion-safe:after:opacity-40">
        <svg viewBox="0 0 32 32" className="relative z-10 size-7" fill="currentColor" aria-hidden="true">
          <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.54 1.75 6.52L3 29l6.66-1.74A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.8c-2.03 0-4.02-.55-5.75-1.58l-.41-.25-3.95 1.03 1.05-3.85-.27-.4A10.73 10.73 0 0 1 5.2 16c0-5.96 4.86-10.81 10.84-10.81 5.96 0 10.8 4.85 10.8 10.81 0 5.97-4.84 10.8-10.8 10.8Zm5.93-8.09c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.16-.22.33-.84 1.06-1.03 1.27-.19.22-.38.25-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.87-1.62-1.93-1.81-2.26-.19-.33-.02-.5.14-.67.15-.14.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.5 5.56 4.91.78.34 1.38.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.13-.3-.21-.62-.37Z" />
        </svg>
      </span>
    </a>
  );
}
