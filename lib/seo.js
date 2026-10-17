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
    "mobile app development company",
    "custom software development Pakistan",
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
    "mobile app development services",
    "custom software solutions",
    "Meta and Google ads management",
    "branding and logo design",
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
  "website-design-development": [
    "website design and development",
    "business website design",
    "corporate website development",
    "landing page design",
    "WordPress website development",
    "Webflow website design",
    "website redesign and maintenance",
  ],
  "mobile-app-development": [
    "mobile app development company",
    "Android app development",
    "iOS app development",
    "cross-platform app development",
    "e-commerce mobile app",
    "app development Pakistan",
  ],
  "ecommerce-solutions": [
    "e-commerce website development",
    "Shopify store development",
    "WooCommerce development",
    "online store design",
    "payment gateway integration",
    "inventory management system",
  ],
  "digital-marketing-advertising": [
    "digital marketing agency",
    "Meta ads management",
    "Facebook and Instagram ads",
    "Google Ads management",
    "SEO services",
    "lead generation campaigns",
    "social media marketing agency",
  ],
  "custom-software-solutions": [
    "custom software development",
    "CRM development",
    "ERP software development",
    "business management software",
    "admin dashboard development",
    "API integration services",
    "workflow automation",
  ],
  "branding-creative-design": [
    "branding agency",
    "logo design services",
    "brand identity design",
    "UI/UX design services",
    "social media creatives",
    "app interface design",
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
