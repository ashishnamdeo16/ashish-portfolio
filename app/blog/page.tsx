import Link from "next/link";
import { sanity } from "@/lib/sanity.client";
import { POSTS_QUERY } from "@/lib/sanity.queries";
import { Metadata } from "next";
import HeaderClient from "../components/layout/HeaderClient";
import Footer from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ashish Namdeo | Blog",
  description: "Technical blogs on backend, Java, and system design",
};

export const revalidate = 60;

type PostCard = {
  metaDescription: string;
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  author?: { name?: string };
  mainImage?: { asset?: { url?: string }; alt?: string };
};

export default async function BlogPage() {
  const posts: PostCard[] = await sanity.fetch(POSTS_QUERY);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-16 transition-colors duration-300">
      <HeaderClient />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 prose-caption text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Writing notes & builds
            </div>
            <h1 className="mt-6 prose-section text-[var(--text)]">
              Personal Tech Blog
            </h1>
            <p className="mt-4 max-w-prose prose-body text-[var(--muted)]">
              Short, practical posts on building backend systems, Next.js, Java,
              interview prep, and lessons learned while shipping projects.
            </p>
          </div>
        </header>

        <div className="mt-10 h-px w-full bg-[var(--border)]" />

        <section className="mt-8">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="prose-body text-[var(--muted)]">
                No posts yet. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((p) => (
                <article
                  key={p._id}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--accent)]/5 hover:border-[var(--accent)]/30"
                >
                  <Link href={`/blog/${p.slug}`} className="block p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="prose-sub font-semibold text-[var(--text)] transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-1">
                        {p.title}
                      </h2>
                      <span className="rounded-lg border border-[var(--border)] px-2 py-1 prose-caption text-[var(--muted)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                        Read
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 prose-caption text-[var(--muted)]">
                      {p.publishedAt ? (
                        <span className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-2 py-1">
                          {new Date(p.publishedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-5 prose-body text-[var(--muted)]">
                      {p.metaDescription || "No description available."}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 prose-body font-medium text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1">
                      <span className="font-mono text-xs inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      Open post
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer darkModeFlag={true} />
    </div>
  );
}
