import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanity } from "@/lib/sanity.client";
import { POST_BY_SLUG_QUERY } from "@/lib/sanity.queries";
import HeaderClient from "@/app/components/layout/HeaderClient";
import { portableTextComponents } from "@/app/components/common/portableTextComponents";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await sanity.fetch(POST_BY_SLUG_QUERY, { slug });
  return {
    title: post?.title ?? "Post",
    description: post?.excerpt ?? "",
    openGraph: {
      title: post?.title ?? "Post",
      description: post?.excerpt ?? "",
    },
  };
}

export const revalidate = 60;

type Post = {
  title: string;
  publishedAt?: string;
  author?: { name?: string };
  mainImage?: { asset?: { url?: string }; alt?: string };
  body?: any[];
  tags?: { title: string }[];
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post: Post | null = await sanity.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) return notFound();

  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const tags = post.tags ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black/70 pb-16">
      <HeaderClient />

      <main className="relative mx-auto max-w-6xl px-4 py-1 sm:py-1">
        {/* subtle background decoration */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 to-transparent blur-2xl" />

        {/* 2-column layout */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          {/* LEFT SIDEBAR */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide text-white/90">
                  Tags
                </h2>
              </div>

              {tags.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag, id) => (
                    <span
                      key={id}
                      className="
                        inline-flex items-center rounded-full
                        border border-white/10
                        bg-white/4
                        px-3 py-1
                        text-xs font-medium
                        text-white/70
                        backdrop-blur
                      "
                    >
                      #{tag.title}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-xs text-white/50">No tags added yet.</p>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section>
            {/* Top back link */}
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 py-2 text-sm text-white/90 transition hover:text-white"
            >
              <span
                aria-hidden
                className="transition group-hover:-translate-x-0.5"
              >
                ←
              </span>
              <span className="underline-offset-4 group-hover:underline">
                Back to blog
              </span>
            </Link>

            <header className="py-2">
              <div className="flex flex-col gap-5">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {post.title}
                </h1>

                {(dateLabel || post.author?.name) && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/60">
                    {dateLabel ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                        {dateLabel}
                      </span>
                    ) : null}

                    {post.author?.name ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400/90" />
                        {post.author.name}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </header>

            {post.mainImage?.asset?.url ? (
              <figure className="mt-5">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.7)]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt ?? "Cover image"}
                    width={1200}
                    height={400}
                    className="h-[220px] w-full object-cover sm:h-[320px] md:h-[380px]"
                    priority
                  />
                </div>
              </figure>
            ) : null}

            {/* ✅ Off-white reading surface */}
            <article
              className="
                mt-10 max-w-none
                rounded-3xl
                bg-[#fafafa]
                px-6 py-10 sm:px-10
                text-gray-800
                shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]
              "
            >
              <div className="mx-auto w-full max-w-3xl">
                <PortableText
                  value={post.body ?? []}
                  components={portableTextComponents}
                />
              </div>
            </article>

            <div className="pointer-events-none mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </section>
        </div>
      </main>
    </div>
  );
}
