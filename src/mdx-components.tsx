import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const BASE_COMPONENTS: MDXComponents = {
    /* ── Headings ─────────────────────────────────────────── */
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="group relative mt-12 mb-4 text-xl md:text-2xl font-bold text-foreground leading-snug scroll-mt-24 first:mt-0">
        {/* Barre accent à gauche */}
        <span
          aria-hidden
          className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-linear-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"
        />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground scroll-mt-24">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-base font-semibold text-foreground-muted uppercase tracking-wider">
        {children}
      </h4>
    ),

    /* ── Paragraph ────────────────────────────────────────── */
    p: ({ children }) => (
      <p className="mb-5 text-base text-foreground-muted leading-[1.8]">
        {children}
      </p>
    ),

    /* ── Lists ────────────────────────────────────────────── */
    ul: ({ children }) => (
      <ul className="mb-5 flex flex-col gap-2 pl-0">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-5 flex flex-col gap-2 list-none pl-0 counter-reset-[item]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 text-sm text-foreground-muted leading-relaxed">
        <span
          aria-hidden
          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
        />
        <span>{children}</span>
      </li>
    ),

    /* ── Blockquote ───────────────────────────────────────── */
    blockquote: ({ children }) => (
      <blockquote className="relative my-6 overflow-hidden rounded-xl border border-border bg-surface px-6 py-5">
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-linear-to-b from-primary to-secondary"
        />
        <div className="text-sm italic text-foreground-muted leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),

    /* ── Inline code ──────────────────────────────────────── */
    code: ({ children }) => (
      <code className="rounded-md bg-primary/10 border border-primary/20 px-1.5 py-0.5 font-mono text-[0.82em] text-primary font-semibold">
        {children}
      </code>
    ),

    /* ── Code block ───────────────────────────────────────── */
    pre: ({ children }) => (
      <pre className="group relative my-6 overflow-x-auto rounded-xl border border-border bg-[hsl(222_40%_4%)] p-5 text-sm font-mono leading-relaxed shadow-lg">
        {children}
      </pre>
    ),

    /* ── Horizontal rule ──────────────────────────────────── */
    hr: () => (
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <div className="flex gap-1">
          <span className="h-1 w-1 rounded-full bg-primary/40" />
          <span className="h-1 w-1 rounded-full bg-primary/40" />
          <span className="h-1 w-1 rounded-full bg-primary/40" />
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>
    ),

    /* ── Links ────────────────────────────────────────────── */
    a: ({ href = '', children }) => {
      const isExternal = href.startsWith('http');
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors font-medium"
          >
            {children}
            <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors font-medium"
        >
          {children}
        </Link>
      );
    },

    /* ── Table ────────────────────────────────────────────── */
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-surface border-b border-border">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-foreground-subtle">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-foreground-muted border-t border-border/50">
        {children}
      </td>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-surface/60 transition-colors">{children}</tr>
    ),

    /* ── Strong / Em ──────────────────────────────────────── */
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="not-italic text-foreground font-medium border-b border-dashed border-foreground-subtle/50">
        {children}
      </em>
    ),
};

export const mdxComponents: MDXComponents = BASE_COMPONENTS;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...BASE_COMPONENTS,
    /* ── Spread any custom overrides passed in ────────────── */
    ...components,
  };
}
