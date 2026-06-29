import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";
import RevealSection from "../../components/RevealSection";
import JsonLd from "../../components/JsonLd";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  // Await the params object before accessing properties
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  // Await the params object before accessing properties
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partyinstyle.com.au/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://partyinstyle.com.au/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://partyinstyle.com.au/blog/${post.slug}` }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: `https://partyinstyle.com.au${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Founder & Lead Stylist",
      worksFor: { "@type": "Organization", name: "Party in Style", "@id": "https://partyinstyle.com.au/#business" },
      url: "https://partyinstyle.com.au/about"
    },
    publisher: {
      "@type": "Organization",
      name: "Party in Style",
      logo: {
        "@type": "ImageObject",
        url: "https://partyinstyle.com.au/logo.webp"
      }
    },
    description: post.excerpt,
    articleSection: post.category,
    keywords: (post.keywords || []).join(", "),
    mainEntityOfPage: `https://partyinstyle.com.au/blog/${post.slug}`
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      
      <article className="pb-stack-lg pt-24 max-w-[800px] mx-auto px-6 md:px-margin-x">
        <RevealSection>
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-label-sm text-xs uppercase tracking-widest mb-8 transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Journal
          </Link>
          
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            {post.category && (
              <span className="font-label-sm text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full text-on-primary-container" style={{ background: "linear-gradient(135deg, #E6C766, #C9A24B)" }}>
                {post.category}
              </span>
            )}
            <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">
              {new Date(post.date).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <div className="w-1 h-1 rounded-full bg-primary/50" />
            <p className="font-label-sm text-xs text-primary uppercase tracking-widest">{post.author}</p>
            {post.readTime && (
              <>
                <div className="w-1 h-1 rounded-full bg-primary/50" />
                <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">{post.readTime}</p>
              </>
            )}
          </div>
          
          <h1 className="font-display-xl text-4xl md:text-6xl text-on-surface mb-8 leading-tight">
            {post.title}
          </h1>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </RevealSection>

        <RevealSection delay={300}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </RevealSection>

        {post.faq && post.faq.length > 0 && (
          <RevealSection delay={400}>
            <div className="mt-14 pt-10 border-t border-outline/20">
              <h2 className="font-headline-md text-2xl text-on-surface mb-6">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4">
                {post.faq.map((f, i) => (
                  <details key={i} className="faq-details group glass-panel rounded-xl overflow-hidden">
                    <summary className="faq-summary font-headline-md text-base md:text-lg text-on-surface p-5 md:p-6 cursor-pointer list-none flex justify-between items-center gap-4 outline-none">
                      {f.q}
                      <span className="material-symbols-outlined text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                    </summary>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-on-surface-variant font-body-md text-sm leading-relaxed border-t border-outline/20 pt-4">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </RevealSection>
        )}

        <RevealSection delay={500}>
          <div className="mt-14 rounded-2xl p-8 md:p-10 text-center glass-panel">
            <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface mb-3">Planning a party in Melbourne?</h2>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 max-w-md mx-auto">We design, style, set up and pack down themed kids&#39; parties across Melbourne&#39;s south-east.</p>
            <Link href="/contact" className="btn-gold inline-flex items-center gap-2 font-label-sm text-xs font-semibold px-8 py-3.5 rounded-lg uppercase tracking-[0.2em] metallic-sheen">
              Get a Free Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </RevealSection>
      </article>
    </>
  );
}
