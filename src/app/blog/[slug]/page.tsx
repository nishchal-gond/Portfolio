import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { config } from "@/data/config";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${config.author}`,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [config.author],
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { "@type": "Person", name: config.author, url: config.site },
    url: `${config.site}/blog/${post.slug}`,
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 pt-28 pb-24 text-zinc-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>
      <p className="mt-8 text-sm text-zinc-500">{formatDate(post.date)}</p>
      <h1 className="mt-2 text-4xl md:text-5xl">{post.title}</h1>
      <article className="prose-post mt-10 font-sans">
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
