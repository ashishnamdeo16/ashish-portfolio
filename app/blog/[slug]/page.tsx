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
    description:description ?? "",
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

// ...imports stay same

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
    <div>
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black/70 pb-16">
      <HeaderClient />

      <main className="relative mx-auto max-w-6xl px-4 py-1 sm:py-1">
        {/* subtle background decoration */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 to-transparent blur-2xl" />

        {/* SINGLE COLUMN */}
        <section className="mt-6">
          {/* Top back link */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 py-2 text-sm text-white/90 transition hover:text-white"
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
              <h1 className="mx-auto text-balance text-center font-semibold tracking-tight text-white sm:text-3xl md:text-3xl">
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
  <div className="mx-auto w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.7)] sm:w-fit">
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

          {/* Off-white reading surface (more “tech doc” feel) */}
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
              <PortableText value={post.body ?? []} components={portableTextComponents} />
            </div>

            {/* Topics (Tags) at bottom */}
           
          </article>
          {/* Tags / Topics */}
{tags.length > 0 && (
  <section className="mx-auto mt-10 max-w-3xl">
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Tags
      </h2>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, id) => (
          <span
            key={id}
            className="
              group inline-flex items-center gap-2 rounded-full
              border border-white/10
              bg-white/[0.06]
              px-3 py-1.5
              text-xs font-medium
              text-white/80
              backdrop-blur
              transition
              hover:border-white/20
              hover:bg-white/[0.12]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400/80 transition group-hover:scale-110" />
            {tag.title}
          </span>
        ))}
      </div>
    </div>
   
  </section>
  
)}


          <div className="pointer-events-none mt-16 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </section>
      </main>
      
    </div>
    <Footer />
    </div>
  );
}

