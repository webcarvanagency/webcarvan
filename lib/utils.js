export function slugify(text = "") {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function getSiteUrl(settings) {
  const url = process.env.NEXT_PUBLIC_SITE_URL || settings?.seo?.siteUrl || "https://webcarvan.com";
  return url.replace(/\/$/, "");
}

export function whatsappLink(number, text = "") {
  const digits = (number || "").replace(/[^0-9]/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

// Split plain text into paragraphs. Lines starting with "## " become headings.
export function textToBlocks(text = "") {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      block.startsWith("## ")
        ? { type: "heading", text: block.replace(/^##\s+/, "") }
        : { type: "paragraph", text: block }
    );
}

// Merge saved settings over the defaults so every field always exists.
export function mergeDeep(base, extra) {
  if (Array.isArray(base) || Array.isArray(extra)) return extra ?? base;
  if (typeof base !== "object" || base === null) return extra ?? base;
  const result = { ...base };
  Object.keys(extra || {}).forEach((key) => {
    const value = extra[key];
    if (value === undefined || value === null) return;
    result[key] =
      typeof value === "object" && !Array.isArray(value) ? mergeDeep(base[key] || {}, value) : value;
  });
  return result;
}

export function getValue(object, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), object);
}

export function setValue(object, path, value) {
  const keys = path.split(".");
  const copy = { ...object };
  let current = copy;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = { ...(current[key] || {}) };
      current = current[key];
    }
  });
  return copy;
}
