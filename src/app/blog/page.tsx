import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/blog";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: `Blog | ${config.author}`,
  description: `Notes on AI systems, automation and web development by ${config.author}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="container mx-auto max-w-3xl px-4 pt-28 pb-24 text-zinc-300">
      <h1 className="text-4xl md:text-6xl">Blog</h1>
      <p className="mt-4 text-zinc-500 font-sans">
        Notes on AI systems, automation and building for the web.
      </p>
      {posts.length === 0 ? (
        <p className="mt-16 text-zinc-500">No posts yet. Check back soon.</p>
      ) : (
        <ul className="mt-16 space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="text-sm text-zinc-500">
                  {formatDate(post.date)}
                  {post.draft && " · draft"}
                </p>
                <h2 className="mt-1 text-2xl group-hover:underline underline-offset-4">
                  {post.title}
                </h2>
                <p className="mt-2 text-zinc-400 font-sans">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
