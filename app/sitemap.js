import { getPosts, getProjects, getServices, getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap() {
  const [settings, services, projects, posts] = await Promise.all([getSettings(), getServices(), getProjects(), getPosts()]);
  const siteUrl = getSiteUrl(settings);
  const now = new Date();

  const pages = ["", "/services", "/work", "/about", "/insights", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...pages,
    ...services.map((item) => ({ url: `${siteUrl}/services/${item.slug}`, lastModified: now, priority: 0.7 })),
    ...projects.map((item) => ({ url: `${siteUrl}/work/${item.slug}`, lastModified: now, priority: 0.6 })),
    ...posts.map((item) => ({ url: `${siteUrl}/insights/${item.slug}`, lastModified: item.date ? new Date(item.date) : now, priority: 0.6 })),
  ];
}
