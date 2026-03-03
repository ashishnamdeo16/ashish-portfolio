// src/lib/portableTextComponents.tsx
import Link from "next/link";

function isExternalUrl(href?: string) {
  if (!href) return false;
  return href.startsWith("http://") || href.startsWith("https://");
}

export const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-12 mb-6 scroll-mt-28 prose-section text-[var(--text)]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-4 scroll-mt-28 prose-sub font-semibold text-[var(--text)]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-10 mb-3 scroll-mt-28 prose-sub font-semibold text-[var(--text)]">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-8 mb-2 scroll-mt-28 prose-body font-semibold text-[var(--text)]">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="my-5 prose-body text-[var(--text)]/90">{children}</p>
    ),

    blockquote: ({ children }: any) => (
      <figure className="relative my-8 rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-6 py-5">
        <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[var(--accent)]/40" />
        <blockquote className="pl-4 text-center prose-body text-[var(--text)]/90">
          {children}
        </blockquote>
      </figure>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 list-disc space-y-2 pl-6 prose-body text-[var(--text)]/90">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 list-decimal space-y-2 pl-6 prose-body text-[var(--text)]/90">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-[var(--leading-read)] marker:text-[var(--muted)]">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-[var(--leading-read)] marker:text-[var(--muted)]">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-[var(--text)]">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-[var(--text)]">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="rounded-md border border-[var(--border)] bg-[var(--surface2)] px-1.5 py-0.5 prose-caption text-[var(--text)]">
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
          className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-4 hover:decoration-[var(--accent)]"
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
        <section className="my-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface2)]">
          {(filename || language) && (
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <div className="min-w-0">
                {filename ? (
                  <p className="truncate prose-caption font-medium text-[var(--text)]">{filename}</p>
                ) : (
                  <p className="prose-caption font-medium text-[var(--muted)]">Code</p>
                )}
              </div>
              {language ? (
                <span className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface2)] px-2.5 py-1 prose-caption font-medium text-[var(--muted)]">
                  {language}
                </span>
              ) : null}
            </div>
          )}
          <pre className="overflow-x-auto px-4 py-4 prose-body text-[var(--text)]">
            <code>{code}</code>
          </pre>
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
          <figure className="my-10 rounded-3xl border border-[var(--border)] bg-[var(--surface2)] p-6 prose-caption text-[var(--muted)]">
            Image not available (missing asset URL in query)
          </figure>
        );
      }

      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface2)]">
            {/* Using <img> keeps it simple because Sanity gives a full CDN url */}
            <img
              src={url}
              alt={alt}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>

          {alt ? (
            <figcaption className="mt-3 text-center prose-caption text-[var(--muted)]">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },

    // ✅ Table block type (@sanity/table)
    table: ({ value }: any) => {
      const rows = (value?.rows ?? (value?.value?.rows)) as { _key?: string; cells: string[] }[] | undefined;
      const safeRows = Array.isArray(rows) ? rows : [];

      if (safeRows.length === 0) {
        return (
          <div className="my-10 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface2)]/50 px-6 py-8 text-center prose-caption text-[var(--muted)]">
            Empty table
          </div>
        );
      }

      const [head, ...restRows] = safeRows;
      const headCells = Array.isArray(head?.cells) ? head.cells : [];
      const bodyRows = restRows.filter(
        (row) => Array.isArray(row?.cells) && row.cells.some((c) => String(c ?? "").trim() !== "")
      );

      return (
        <div className="my-10 overflow-x-auto rounded-3xl border border-[var(--border)] bg-[var(--surface2)]">
          <table className="w-full min-w-[300px] border-collapse">
            <thead>
              <tr>
                {headCells.map((cell, i) => (
                  <th
                    key={i}
                    className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left prose-caption font-semibold text-[var(--text)]"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr
                  key={(row as { _key?: string })._key ?? rowIndex}
                  className="border-b border-[var(--border)] last:border-b-0"
                >
                  {(Array.isArray(row?.cells) ? row.cells : []).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 prose-body text-[var(--text)]/90"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <aside className="my-10 rounded-3xl border border-[var(--border)] bg-[var(--surface2)] p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="prose-caption font-semibold uppercase tracking-wide text-[var(--muted)]">
                {toneLabel}
              </p>

              {title ? (
                <h4 className="mt-3 prose-sub font-semibold text-[var(--text)]">
                  {title}
                </h4>
              ) : null}
            </div>

            <span className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 prose-caption font-medium text-[var(--muted)]">
              {tone}
            </span>
          </div>

          {/* Render callout body using the same PortableText components */}
          {body ? (
            <div className="mt-4 space-y-2 prose-body text-[var(--text)]/85">
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
