import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchBlogById } from "@/lib/api";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
  try {
    const post = await fetchBlogById(params.id);
    return {
      title: `${post.title} | Wed Blog`,
      description: post.excerpt ?? post.content.slice(0, 160),
    };
  } catch {
    return { title: "Blog | Wed" };
  }
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = await fetchBlogById(params.id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors mb-10"
        >
          ← Επιστροφή στο Blog
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-charcoal mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-charcoal/50">
            {post.author_name} &middot;{" "}
            {new Date(post.created_at).toLocaleDateString("el-GR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {post.excerpt && (
            <p className="mt-6 text-lg text-charcoal/70 italic border-l-4 border-rose pl-4">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="text-charcoal/80 leading-relaxed whitespace-pre-wrap text-base">
          {post.content}
        </div>
      </article>
    </main>
  );
}
