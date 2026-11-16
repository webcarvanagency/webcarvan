"use client";

import { trackAnalyticsEvent } from "@/lib/analytics";

export default function TrackedContactLink({ href, label, value }) {
  function handleClick() {
    if (href.startsWith("mailto:")) {
      trackAnalyticsEvent("email_click", { link_location: "contact_page" });
    } else if (href.startsWith("tel:")) {
      trackAnalyticsEvent("phone_click", { link_location: "contact_page" });
    } else if (href.startsWith("http")) {
      trackAnalyticsEvent("whatsapp_click", { link_location: "contact_page" });
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="mt-1 block font-medium break-words text-white hover:text-brand-300"
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {value}
      <span className="sr-only"> ({label})</span>
    </a>
  );
}
