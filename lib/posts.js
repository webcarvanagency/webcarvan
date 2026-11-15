import { defaultPosts, legacyStarterPosts } from "./defaults.js";

// Saved custom copy and draft flags win. Only unchanged starter copy is upgraded.
export function mergePosts(savedPosts) {
  const posts = new Map(defaultPosts.map((post) => [post.id, post]));
  for (const saved of savedPosts) {
    const bundled = posts.get(saved.id);
    const legacy = legacyStarterPosts.find((post) => post.id === saved.id);
    const unchangedStarter = bundled && legacy && saved.content === legacy.content && saved.title === legacy.title;
    posts.set(saved.id, unchangedStarter
      ? {
        ...bundled,
        ...saved,
        title: bundled.title,
        content: bundled.content,
        excerpt: saved.excerpt === legacy.excerpt ? bundled.excerpt : saved.excerpt,
        updatedAt: bundled.updatedAt,
      }
      : { ...bundled, ...saved });
  }
  return [...posts.values()];
}

export function isBundledPost(id) {
  return defaultPosts.some((post) => post.id === id);
}
