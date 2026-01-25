import Link from "next/link";
import { sanity } from "@/lib/sanity.client";
import { POSTS_QUERY } from "@/lib/sanity.queries";


import { Metadata } from "next";
import Header from "../components/layout/Header";

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
    <div className="min-h-screen bg-linear-to-b from-black via-gray-600 to-black/70 pb-16">
      <Header darkMode={true} />
    <div className="min-h-screen bg-linear-to-b">
    <main className="mx-auto max-w-5xl px-4 py-12">
      
      {/* Top header */}
     <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
  {/* LEFT SIDE */}
  <div>
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-400">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      Writing notes & builds
    </div>

    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-300">
      Personal Tech Blog
    </h1>

    <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300">
      Short, practical posts on building backend systems, Next.js, Java,
      interview prep, and lessons learned while shipping projects.
    </p>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col items-end gap-2">
    

    {/* <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-400 transition hover:border-neutral-300 hover:text-neutral-100"
    >
      Home
    </Link> */}
  </div>
</header>


      {/* Divider */}
      <div className="mt-10 h-px w-full bg-neutral-200/70" />

      {/* Posts grid */}
      <section className="mt-8">
        {posts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <p className="text-sm text-neutral-600">
              No posts yet. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((p) => (
              <article
                key={p._id}
                className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* subtle top gradient */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-neutral-50 to-transparent" />

                <Link href={`/blog/${p.slug}`} className="block p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold tracking-tight text-neutral-900 transition group-hover:text-black">
                      {p.title}
                    </h2>

                    <span className="rounded-lg border px-2 py-1 text-[11px] text-neutral-600">
                      Read
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600">
                    {p.publishedAt ? (
                      <span className="rounded-full border bg-white px-2 py-1">
                        {new Date(p.publishedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </span>
                    ) : null}

                    {/* //Need to to pUT CAtegory HERE */}
                    {/* {p.author?.name ? (
                      <span className="rounded-full border bg-white px-2 py-1">
                        {p.author.name}
                      </span>
                    ) : null} */}

                    {/* <span className="rounded-full border bg-white px-2 py-1 font-mono">
                      /blog/{p.slug}
                    </span> */}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-neutral-600">
                   {p.metaDescription || 'No description available.'}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
                    <span className="font-mono text-xs text-neutral-500">→</span>
                    Open post
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
    </div>
  </div>
  );
}
