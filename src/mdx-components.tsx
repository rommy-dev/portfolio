import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/*
 * Typographie éditoriale des études de cas : fond sombre de l'accueil, texte de lecture
 * généreux, angles droits et accent orange. Les titres « ## » sont rendus par la page
 * (rangées numérotées) ; ici, seuls les niveaux inférieurs sont stylés.
 */
const BASE_COMPONENTS: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-12 mb-5 text-3xl font-black tracking-[-0.05em] text-[hsl(var(--editorial-foreground))] first:mt-0 md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-14 mb-5 text-2xl font-black tracking-[-0.05em] text-[hsl(var(--editorial-foreground))] first:mt-0 md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-12 mb-4 text-xl font-bold tracking-[-0.03em] text-[hsl(var(--editorial-foreground))] first:mt-0 md:text-2xl">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-8 mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]">
      {children}
    </h4>
  ),

  p: ({ children }) => (
    <p className="mb-6 text-[1.05rem] leading-[1.75] text-[hsl(var(--editorial-foreground-muted))] last:mb-0 md:text-lg">
      {children}
    </p>
  ),

  ul: ({ children }) => <ul className="mb-7 flex flex-col border-t border-[hsl(var(--editorial-border))]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-7 flex flex-col border-t border-[hsl(var(--editorial-border))]">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-4 border-b border-[hsl(var(--editorial-border))] py-3 text-[0.98rem] leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
      <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-[hsl(var(--editorial-primary))]" />
      <span className="min-w-0">{children}</span>
    </li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-[hsl(var(--editorial-primary))] pl-6 text-xl font-light leading-relaxed text-[hsl(var(--editorial-foreground))] md:text-2xl">
      {children}
    </blockquote>
  ),

  code: ({ children }) => (
    <code className="border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] px-1.5 py-0.5 font-mono text-[0.82em] text-[hsl(var(--editorial-primary))]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-8 overflow-x-auto border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] p-5 font-mono text-sm leading-relaxed text-[hsl(var(--editorial-foreground))] [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      {children}
    </pre>
  ),

  hr: () => <hr className="my-12 border-[hsl(var(--editorial-border))]" />,

  a: ({ href = '', children }) => {
    const className =
      'text-[hsl(var(--editorial-foreground))] underline decoration-[hsl(var(--editorial-primary)/0.5)] underline-offset-4 transition-colors hover:text-[hsl(var(--editorial-primary))] hover:decoration-[hsl(var(--editorial-primary))]';
    if (href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} inline-flex items-baseline gap-0.5`}>
          {children}
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 self-center opacity-70" />
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  },

  table: ({ children }) => (
    <div className="my-8 w-full overflow-x-auto border-y border-[hsl(var(--editorial-border))]">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-[hsl(var(--editorial-foreground-muted))] first:pl-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-t border-[hsl(var(--editorial-border))] px-4 py-3 align-top leading-relaxed text-[hsl(var(--editorial-foreground-muted))] first:pl-0 first:text-[hsl(var(--editorial-foreground))]">
      {children}
    </td>
  ),
  tr: ({ children }) => <tr>{children}</tr>,

  strong: ({ children }) => (
    <strong className="font-semibold text-[hsl(var(--editorial-foreground))]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-[hsl(var(--editorial-foreground))]">{children}</em>,
};

export const mdxComponents: MDXComponents = BASE_COMPONENTS;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...BASE_COMPONENTS, ...components };
}
