import { cache } from "react";
import { defaultContent, defaultSettings } from "./defaults";
import { mergeDeep } from "./utils";

// Public website data is read with the Firestore REST API.
// Pages are cached and refreshed every 60 seconds (or instantly when
// the admin panel publishes changes).

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const isConfigured = Boolean(projectId && apiKey);
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

function decodeValue(value) {
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("mapValue" in value) return decodeFields(value.mapValue.fields);
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  return null;
}

function decodeFields(fields = {}) {
  const result = {};
  Object.keys(fields).forEach((key) => {
    result[key] = decodeValue(fields[key]);
  });
  return result;
}

function decodeDocument(document) {
  return { id: document.name.split("/").pop(), ...decodeFields(document.fields) };
}

async function firestoreGet(path) {
  const response = await fetch(`${baseUrl}/${path}${path.includes("?") ? "&" : "?"}key=${apiKey}`, {
    next: { revalidate: 60 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Firestore request failed: ${response.status}`);
  return response.json();
}

export const getSettings = cache(async () => {
  if (!isConfigured) return defaultSettings;
  try {
    const document = await firestoreGet("settings/site");
    return document ? mergeDeep(defaultSettings, decodeFields(document.fields)) : defaultSettings;
  } catch (error) {
    console.error("getSettings:", error.message);
    return defaultSettings;
  }
});

const getCollection = cache(async (name) => {
  if (!isConfigured) return defaultContent[name] || [];
  try {
    const data = await firestoreGet(`${name}?pageSize=300`);
    const items = (data?.documents || []).map(decodeDocument);
    return items.filter((item) => item.published !== false);
  } catch (error) {
    console.error(`getCollection(${name}):`, error.message);
    return defaultContent[name] || [];
  }
});

const byOrder = (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0);

export async function getServices() {
  return [...(await getCollection("services"))].sort(byOrder);
}

export async function getProjects() {
  return [...(await getCollection("projects"))].sort(byOrder);
}

export async function getFeaturedProjects(limit = 4) {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

export async function getTestimonials() {
  return [...(await getCollection("testimonials"))].sort(byOrder);
}

export async function getPosts() {
  const posts = await getCollection("posts");
  return [...posts].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

export async function getBySlug(type, slug) {
  const items = await getCollection(type);
  return items.find((item) => item.slug === slug) || null;
}
