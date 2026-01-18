// src/lib/portableTextComponents.tsx
import Link from "next/link";

export const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-10 scroll-mt-24 text-4xl font-semibold tracking-tight text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-6 scroll-mt-24 text-lg font-semibold tracking-tight text-gray-700">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
  <p className="my-1 leading-7 text-gray-700/80">{children}</p>
   ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-2 border-white/20 bg-white/3 px-5 py-4 text-gray-700/80">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className=" list-disc space-y-2 pl-6 text-gray-700/80">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 list-decimal space-y-2 pl-6 text-gray-700/80">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => <li className="leading-7">{children}</li>,
    number: ({ children }: any) => <li className="leading-7">{children}</li>,
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-700">{children}</strong>
    ),
    em: ({ children }: any) => <em className="text-gray-700/85">{children}</em>,
    code: ({ children }: any) => (
      <code className="rounded-md border border-white/10 bg-black/40 px-1.5 py-0.5 text-[0.9em] text-gray-700">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <Link
          href={value?.href || "#"}
          target={isExternal ? "_blank" : undefined}
          className="text-gray-700 underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
        >
          {children}
        </Link>
      );
    },
  },

  types: {
    code: ({ value }: any) => (
      <pre className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-gray-700/90">
        <code>{value?.code}</code>
      </pre>
    ),
  },
};
