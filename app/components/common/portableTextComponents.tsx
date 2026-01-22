// src/lib/portableTextComponents.tsx
import Link from "next/link";

function isExternalUrl(href?: string) {
  if (!href) return false;
  return href.startsWith("http://") || href.startsWith("https://");
}

function YouCanAddCopyLaterButton() {
  return null;
}

export const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-12 scroll-mt-28 text-4xl font-semibold tracking-tight text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-10 scroll-mt-28 text-xl font-semibold tracking-tight text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-8 scroll-mt-28 text-lg font-semibold tracking-tight text-gray-800">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="my-2 leading-7 text-lg  text-gray-800/85">{children}</p>
    ),

    // ✅ Quote style (block style = blockquote)
     blockquote: ({ children }: any) => (
  <figure className="relative my-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 px-5 py-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)]">
    {/* Subtle accent bar */}
    <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-white/40 to-white/10" />

    <blockquote className="pl-4 text-center text-[1.02rem] leading-7 text-gray-800/90">
      <span className="mr-1 inline-block align-top text-2xl leading-none text-gray-600/50">
    
      </span>
      {children}
      <span className="ml-1 inline-block align-bottom text-2xl leading-none text-gray-600/50">

      </span>
    </blockquote>
  </figure>
),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-base  text-gray-700/85">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 text-base  text-gray-700/85">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-7 marker:text-gray-400">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-7 marker:text-gray-400">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900/90">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800/90">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="rounded-md border border-black/10 bg-black/5 px-1.5 py-0.5 text-[0.9em] text-gray-900/90">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const href = value?.href || "#";
      const external = isExternalUrl(href);

      return (
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-medium text-gray-900 underline decoration-black/20 underline-offset-4 transition hover:decoration-black/50"
        >
          {children}
        </Link>
      );
    },
  },

  types: {
    // ✅ Code block type
    code: ({ value }: any) => {
      const filename = value?.filename as string | undefined;
      const language = value?.language as string | undefined;
      const code = value?.code as string | undefined;

      return (
        <section className="my-10 overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-black/5 to-black/0 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.35)]">
          {(filename || language) && (
            <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-black/5 px-4 py-2">
              <div className="min-w-0">
                {filename ? (
                  <p className="truncate text-sm font-medium text-gray-900/80">
                    {filename}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-gray-900/60">
                    Code
                  </p>
                )}
              </div>

              {language ? (
                <span className="shrink-0 rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {language}
                </span>
              ) : null}
            </div>
          )}

          <div className="relative">
            {/* Optional: Add a copy button later */}
            <YouCanAddCopyLaterButton />
            <pre className="overflow-x-auto px-4 py-4 text-[0.92rem] leading-6 text-gray-900/90">
              <code>{code}</code>
            </pre>
          </div>
        </section>
      );
    },

    // ✅ Image block type
    image: ({ value }: any) => {
      const url = value?.asset?.url as string | undefined;
      const alt = (value?.alt as string | undefined) || "Image";

      // If your GROQ doesn't include asset->url, you won't get url here.
      // In that case, update query to include: mainImage{asset->{url}, alt}
      if (!url) {
        return (
          <figure className="my-10 rounded-3xl border border-black/10 bg-black/5 p-6 text-sm text-gray-700">
            Image not available (missing asset URL in query)
          </figure>
        );
      }

      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-black/5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.35)]">
            {/* Using <img> keeps it simple because Sanity gives a full CDN url */}
            <img
              src={url}
              alt={alt}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>

          {alt ? (
            <figcaption className="mt-3 text-center text-xs text-gray-600/80">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },

    // ✅ Callout object type
    callout: ({ value }: any) => {
      const tone = (value?.tone as string | undefined) || "note";
      const title = value?.title as string | undefined;
      const body = value?.body;

      // Minimal “premium” tone mapping without hardcoding colors.
      // (We rely on borders/shadows/typography instead of bright colors)
      const toneLabel =
        tone === "tip"
          ? "Tip"
          : tone === "warning"
          ? "Warning"
          : tone === "important"
          ? "Important"
          : "Note";

      return (
        <aside className="my-10 rounded-3xl border border-black/10 bg-gradient-to-b from-black/5 to-black/0 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.35)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                {toneLabel}
              </p>

              {title ? (
                <h4 className="mt-2 text-lg font-semibold tracking-tight text-gray-900">
                  {title}
                </h4>
              ) : null}
            </div>

            <span className="shrink-0 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-xs font-medium text-gray-700">
              {tone}
            </span>
          </div>

          {/* Render callout body using the same PortableText components */}
          {body ? (
            <div className="mt-4 space-y-2 text-gray-700/85">
              {/* IMPORTANT:
                 This requires you to render callouts with PortableText.
                 If you're using <PortableText components={portableTextComponents} />
                 this will work because this is already inside PortableText context.
                 If not, tell me and I’ll show the nested renderer approach.
              */}
              {body}
            </div>
          ) : null}
        </aside>
      );
    },
  },
};
