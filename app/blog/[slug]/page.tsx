import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanity } from "@/lib/sanity.client";
import { POST_BY_SLUG_QUERY } from "@/lib/sanity.queries";
import HeaderClient from "@/app/components/layout/HeaderClient";
import { portableTextComponents } from "@/app/components/common/portableTextComponents";
import { Metadata } from "next";
import Footer from "@/app/components/layout/Footer";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanity.fetch(POST_BY_SLUG_QUERY, { slug });
  const description = post?.metaDescription?.trim();

  return {
    title: post?.title ?? "Post",
    description: description ?? "",
    openGraph: {
      title: post?.title ?? "Post",
      description: description ?? "",
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-16 transition-colors duration-300">
      <HeaderClient />

      <main className="relative mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <section className="mt-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 py-2 prose-caption text-[var(--muted)] transition hover:text-[var(--accent)]"
          >
            <span aria-hidden className="transition group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="underline-offset-4 group-hover:underline">
              Back to blog
            </span>
          </Link>

          <header className="py-3">
            <div className="flex flex-col gap-5">
              <h1 className="mx-auto text-balance text-center font-semibold tracking-tight text-[var(--text)] sm:text-3xl md:text-3xl">
                {post.title}
              </h1>

              {(dateLabel || post.author?.name) && (
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 prose-caption text-[var(--muted)]">
                  {dateLabel ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      {dateLabel}
                    </span>
                  ) : null}
                  {post.author?.name ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      {post.author.name}
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </header>

          {post.mainImage?.asset?.url ? (
            <figure className="mt-5">
              <div className="mx-auto w-full overflow-hidden rounded-3xl border border-[var(--border)] sm:w-fit">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt ?? "Cover image"}
                  width={1200}
                  height={600}
                  className="h-auto w-full object-contain sm:w-auto sm:max-w-4xl"
                  priority
                  sizes="(max-width: 640px) 100vw, 896px"
                />
              </div>
            </figure>
          ) : null}

          <article className="mt-10 max-w-none rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-[var(--text)] sm:px-10">
            <div className="mx-auto w-full max-w-prose">
              <PortableText value={post.body ?? []} components={portableTextComponents} />
            </div>
          </article>

          {tags.length > 0 && (
            <section className="mx-auto mt-12 max-w-prose">
              <div className="flex flex-col gap-3">
                <h2 className="prose-caption font-semibold uppercase tracking-widest text-[var(--muted)]">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, id) => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1.5 prose-caption font-medium text-[var(--text)] transition hover:border-[var(--accent)]/40"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          <div className="pointer-events-none mt-16 h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
        </section>
      </main>

      <Footer darkModeFlag={true} />
    </div>
  );
}
