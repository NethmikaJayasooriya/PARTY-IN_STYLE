export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: "https://partyinstyle.com.au/sitemap.xml",
    host: "https://partyinstyle.com.au",
  };
}
