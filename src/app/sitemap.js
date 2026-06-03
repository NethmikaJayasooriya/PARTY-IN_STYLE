import { blogPosts } from "@/lib/blogData";

export default function sitemap() {
  const routes = [
    { url: "https://partyinstyle.com.au", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://partyinstyle.com.au/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://partyinstyle.com.au/gallery", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://partyinstyle.com.au/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://partyinstyle.com.au/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://partyinstyle.com.au/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `https://partyinstyle.com.au/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
