const serviceImages = {
  "website-design-development": "/images/content/service-website-design.webp",
  "mobile-app-development": "/images/content/service-mobile-apps.webp",
  "ecommerce-solutions": "/images/content/service-ecommerce.webp",
  "digital-marketing-advertising": "/images/content/service-digital-marketing.webp",
  "custom-software-solutions": "/images/content/service-custom-software.webp",
  "branding-creative-design": "/images/content/service-branding.webp",
};

const postImages = {
  "why-your-business-needs-a-fast-website": "/images/content/blog-fast-website.webp",
  "shopify-store-checklist": "/images/content/blog-shopify-launch.webp",
};

export function getServiceImage(service) {
  return service?.image || serviceImages[service?.slug] || serviceImages["website-design-development"];
}

export function getPostImage(post) {
  return post?.image || postImages[post?.slug] || "";
}
