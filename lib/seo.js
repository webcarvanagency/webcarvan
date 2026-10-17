// Keyword sets used in page metadata. Each page gets the site-wide keywords
// from Settings > SEO plus a focused list for its own topic.

export const pageKeywords = {
  home: [
    "web design agency Pakistan",
    "website development company Lahore",
    "affordable website design",
    "custom website development",
    "Next.js development agency",
    "Shopify experts Pakistan",
    "digital marketing agency Lahore",
    "small business website design",
  ],
  services: [
    "web development services",
    "website design services",
    "e-commerce website development",
    "Shopify store setup",
    "SEO services Pakistan",
    "social media marketing services",
    "responsive website design",
    "web app development",
    "website redesign services",
  ],
  work: [
    "web design portfolio",
    "website development portfolio",
    "Shopify store examples",
    "e-commerce case studies",
    "React and Next.js projects",
    "web agency case studies",
  ],
  about: [
    "about Web Caravan",
    "Pakistan based web agency",
    "freelance web developers Lahore",
    "trusted website developers",
    "small web design team",
  ],
  insights: [
    "web design tips",
    "Shopify tips for beginners",
    "SEO guide for small business",
    "website speed optimization",
    "digital marketing blog",
  ],
  contact: [
    "hire web developer",
    "get a website quote",
    "website design cost Pakistan",
    "contact web design agency",
    "WhatsApp web developer",
    "free website consultation",
  ],
};

// Extra keywords for the default services, matched by slug.
export const serviceKeywords = {
  "web-development": [
    "custom web development",
    "Next.js website development",
    "React developers",
    "business website development",
    "full stack web development",
    "MongoDB and Firebase apps",
    "fast loading websites",
  ],
  "ecommerce-shopify": [
    "Shopify store development",
    "Shopify theme customization",
    "online store setup",
    "e-commerce website design",
    "Shopify experts",
    "payment gateway integration",
    "Shopify store optimization",
  ],
  "digital-marketing": [
    "SEO services",
    "search engine optimization agency",
    "social media marketing agency",
    "Google ranking services",
    "content marketing strategy",
    "local SEO Lahore",
    "digital marketing for small business",
  ],
};

function toList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : String(value).split(",");
}

// Combine keyword lists, trim them and drop duplicates (case-insensitive).
export function buildKeywords(...lists) {
  const seen = new Set();
  return lists
    .flatMap(toList)
    .map((keyword) => String(keyword).trim())
    .filter((keyword) => {
      const key = keyword.toLowerCase();
      if (!keyword || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
