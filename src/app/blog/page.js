import Link from "next/link";
import Image from "next/image";
import RevealSection from "../components/RevealSection";
import JsonLd from "../components/JsonLd";
import { blogPosts } from "@/lib/blogData";

export const metadata = {
  title: "Blog & Guides",
  description: "Insights, trends, and inspiration from Melbourne's premier luxury event planners.",
};

export default function BlogPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://partyinstyle.com.au/blog" }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      
      <section className="py-stack-md max-w-container-max mx-auto px-6 md:px-margin-x text-center">
        <p className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-3">Our Journal</p>
        <h1 className="font-display-xl text-5xl md:text-7xl text-on-surface mb-4">
          Event <span className="gradient-text italic">Insights</span>
        </h1>
        <div className="gold-line-left mx-auto mt-4 mb-6" />
        <p className="font-body-lg text-base text-on-surface-variant font-light max-w-2xl mx-auto">
          Trends, inspiration, and expert advice for planning extraordinary celebrations.
        </p>
      </section>

      <section className="pb-stack-lg max-w-container-max mx-auto px-6 md:px-margin-x">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogPosts.map((post, i) => (
            <RevealSection key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-6 image-hover-zoom">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                <div className="space-y-3">
                  <p className="font-label-sm text-xs text-primary uppercase tracking-widest">
                    {new Date(post.date).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <h2 className="font-headline-md text-2xl text-on-surface group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] pt-2 flex items-center gap-2 group-hover:underline">
                    Read Article <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </p>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>
    </>
  );
}
