import Link from "next/link";
import { fetchPublishedBlogs } from "@/lib/api";

export const metadata = {
  title: "Blog Ζευγαριών | Wed",
  description:
    "Ανακαλύψτε τις ιστορίες και τις εμπειρίες ζευγαριών που σχεδιάζουν τον γάμο τους.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { items: posts, total } = await fetchPublishedBlogs();

  const postLabel =
    total === 1 ? "1 άρθρο" : `${total} άρθρα`;

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blush/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-charcoal mb-4">
            Blog Ζευγαριών
          </h1>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Ανακαλύψτε τις ιστορίες και τις εμπειρίες ζευγαριών που σχεδιάζουν τη μεγάλη τους μέρα.
          </p>
          <p className="mt-4 text-sm text-charcoal/60">{postLabel}</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm hover:border-rose-300 hover:shadow-md transition-all"
            >
              <article>
                <h2 className="font-display text-2xl text-charcoal group-hover:text-rose transition-colors">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-charcoal/50">
                  {post.author_name} &middot;{" "}
                  {new Date(post.created_at).toLocaleDateString("el-GR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {post.excerpt ? (
                  <p className="mt-4 text-charcoal/80 line-clamp-3">{post.excerpt}</p>
                ) : (
                  <p className="mt-4 text-charcoal/80 line-clamp-3">{post.content}</p>
                )}
                <p className="mt-5 inline-flex items-center text-sm font-medium text-rose-700 group-hover:underline">
                  Διαβάστε περισσότερα →
                </p>
              </article>
            </Link>
          ))}

          {posts.length === 0 && (
            <p className="col-span-2 text-center text-charcoal/60 py-12">
              Δεν υπάρχουν δημοσιευμένα άρθρα αυτή τη στιγμή. Επιστρέψτε σύντομα!
            </p>
          )}
        </div>

        <div className="max-w-6xl mx-auto mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white transition-colors"
          >
            Επιστροφή στην αρχική
          </Link>
        </div>
      </section>
    </main>
  );
}
