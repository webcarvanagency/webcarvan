import test from "node:test";
import assert from "node:assert/strict";
import { mergePosts } from "../lib/posts.js";
import { defaultPosts, legacyStarterPosts } from "../lib/defaults.js";
import { blogAdConfiguration, isInsightsPath } from "../lib/adsense.js";

test("unchanged starter text upgrades without losing saved SEO or draft state", () => {
  const saved = { ...legacyStarterPosts[0], published: false, seoTitle: "Custom search title" };
  const result = mergePosts([saved]).find((post) => post.id === saved.id);
  assert.equal(result.content, defaultPosts[0].content);
  assert.equal(result.seoTitle, saved.seoTitle);
  assert.equal(result.published, false);
  assert.equal(saved.content, legacyStarterPosts[0].content);
});

test("admin copy, new posts, and unpublished bundled guides remain authoritative", () => {
  const custom = { ...defaultPosts[0], title: "My title", content: "My independently edited copy", published: false };
  const extra = { id: "custom-post", title: "Custom", slug: "custom", content: "Saved content", published: true };
  const result = mergePosts([custom, extra]);
  assert.equal(result.find((post) => post.id === custom.id).content, custom.content);
  assert.equal(result.find((post) => post.id === custom.id).published, false);
  assert.equal(result.find((post) => post.id === extra.id).content, extra.content);
  assert.equal(new Set(result.map((post) => post.id)).size, result.length);
});

test("ads stay off until approval, consent setup, explicit enablement and real slot are provided", () => {
  const ready = { enabled: true, approved: true, cmpReady: true, blogSlot: "1234567890" };
  assert.equal(blogAdConfiguration({ advertising: ready }).enabled, true);
  assert.equal(blogAdConfiguration({}).enabled, false);
  for (const key of ["enabled", "approved", "cmpReady"]) {
    assert.equal(blogAdConfiguration({ advertising: { ...ready, [key]: false } }).enabled, false);
  }
  for (const slot of ["", "placeholder", "123<script>"]) {
    assert.equal(blogAdConfiguration({ advertising: { ...ready, blogSlot: slot } }).enabled, false);
  }
});

test("only the Insights listing and individual article paths can render ads", () => {
  for (const path of ["/insights", "/insights/launch-guide", "/insights/launch-guide/"]) assert.equal(isInsightsPath(path), true);
  for (const path of ["/", "/services", "/contact", "/privacy-policy", "/admin", "/insights-extra", "/insights/a/b"]) assert.equal(isInsightsPath(path), false);
});
