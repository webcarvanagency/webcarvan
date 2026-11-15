export const ADSENSE_CLIENT = "ca-pub-7174653597500061";

export function blogAdConfiguration(settings) {
  const advertising = settings?.advertising || {};
  return {
    client: ADSENSE_CLIENT,
    slot: String(advertising.blogSlot || "").trim(),
    enabled: advertising.enabled === true
      && advertising.approved === true
      && advertising.cmpReady === true
      && /^\d+$/.test(String(advertising.blogSlot || "").trim()),
  };
}

export function isInsightsPath(pathname) {
  return pathname === "/insights" || /^\/insights\/[^/]+\/?$/.test(pathname);
}
