import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";
import RevealSection from "../../../components/RevealSection";
import JsonLd from "../../../components/JsonLd";

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
      "@type": "Organization",
      name: post.author,
      url: "https://partyinstyle.com.au"
    },
    publisher: {
      "@type": "Organization",
      name: "Party in Style",
      logo: {
        "@type": "ImageObject",
        url: "https://partyinstyle.com.au/logo.webp"
      }
    },
    description: post.excerpt
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />
      
      <article className="pb-stack-lg pt-24 max-w-[800px] mx-auto px-6 md:px-margin-x">
        <RevealSection>
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-label-sm text-xs uppercase tracking-widest mb-8 transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Journal
          </Link>
          
          <div className="mb-6 flex items-center gap-4">
            <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">
              {new Date(post.date).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <div className="w-1 h-1 rounded-full bg-primary/50" />
            <p className="font-label-sm text-xs text-primary uppercase tracking-widest">
              {post.author}
            </p>
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
            className="prose prose-invert prose-lg max-w-none prose-p:font-body-md prose-p:text-on-surface-variant prose-p:font-light prose-p:leading-relaxed prose-headings:font-headline-md prose-headings:text-on-surface prose-headings:font-normal prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </RevealSection>
      </article>
    </>
  );
}
