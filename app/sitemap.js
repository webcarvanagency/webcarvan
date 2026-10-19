import { getPosts, getProjects, getServices, getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 3600;

// Turns a date string into a Date, or undefined when it is missing or invalid.
function toDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// The most recent of several dates (used for listing pages).
function latest(...dates) {
  const valid = dates.flat().filter(Boolean);
  return valid.length ? new Date(Math.max(...valid.map((date) => date.getTime()))) : undefined;
}

export default async function sitemap() {
  const [settings, services, projects, posts] = await Promise.all([getSettings(), getServices(), getProjects(), getPosts()]);
  const siteUrl = getSiteUrl(settings);

  const absolute = (url) => (url?.startsWith("/") ? `${siteUrl}${url}` : url);
  const images = (...urls) => {
    const list = urls.flat().filter(Boolean).map(absolute);
    return list.length ? list : undefined;
  };

  const settingsDate = toDate(settings.updatedAt);
  const serviceDates = services.map((item) => toDate(item.updatedAt));
  const projectDates = projects.map((item) => toDate(item.updatedAt));
  const postDates = posts.map((item) => toDate(item.updatedAt) || toDate(item.date));

  const entry = (path, { lastModified, changeFrequency = "monthly", priority = 0.5, pictures } = {}) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
    images: pictures,
  });

  return [
    entry("", {
      lastModified: latest(settingsDate, serviceDates, projectDates, postDates),
      changeFrequency: "weekly",
      priority: 1,
      pictures: images(settings.hero.image, settings.seo.ogImage),
    }),
    entry("/services", { lastModified: latest(settingsDate, serviceDates), priority: 0.9 }),
    entry("/work", { lastModified: latest(settingsDate, projectDates), priority: 0.8 }),
    entry("/about", { lastModified: settingsDate, changeFrequency: "yearly", priority: 0.7, pictures: images(settings.about.image) }),
    entry("/insights", { lastModified: latest(postDates), changeFrequency: "weekly", priority: 0.7 }),
    entry("/contact", { lastModified: settingsDate, changeFrequency: "yearly", priority: 0.8 }),

    ...services.map((item) =>
      entry(`/services/${item.slug}`, { lastModified: toDate(item.updatedAt), priority: 0.9, pictures: images(item.image) })
    ),
    ...projects.map((item) =>
      entry(`/work/${item.slug}`, { lastModified: toDate(item.updatedAt), priority: 0.6, pictures: images(item.image, item.gallery || []) })
    ),
    ...posts.map((item) =>
      entry(`/insights/${item.slug}`, {
        lastModified: toDate(item.updatedAt) || toDate(item.date),
        changeFrequency: "yearly",
        priority: 0.6,
        pictures: images(item.image),
      })
    ),
  ];
}
