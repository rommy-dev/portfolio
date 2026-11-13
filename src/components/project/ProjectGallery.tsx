'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { ProjectScreenshot } from '@/lib/projects';

interface ProjectGalleryProps {
  projectTitle: string;
  screenshots: ProjectScreenshot[];
}

/* Galerie de captures légendées et datées, avec visionneuse plein écran. */
export function ProjectGallery({ projectTitle, screenshots }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = screenshots.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) => (current === null ? null : (current + delta + count) % count)),
    [count]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, step]);

  if (count === 0) return null;
  const active = openIndex === null ? null : screenshots[openIndex];

  return (
    <>
      <div className="not-prose my-8 grid grid-cols-1 gap-x-6 gap-y-8 first:mt-0 sm:grid-cols-2">
        {screenshots.map((shot, index) => (
          <figure key={shot.src} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative cursor-zoom-in overflow-hidden border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] transition-colors hover:border-[hsl(var(--editorial-primary)/0.6)]"
              aria-label={`Agrandir : ${shot.alt}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1280}
                height={720}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="aspect-video w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <Expand className="absolute right-2 top-2 h-7 w-7 bg-[hsl(var(--editorial-bg)/0.8)] p-1.5 text-[hsl(var(--editorial-foreground))] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <figcaption className="text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
              {shot.caption}
              <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--editorial-primary))]">
                Capture : {shot.date}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {active && openIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[hsl(var(--editorial-bg)/0.96)] p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Captures du projet ${projectTitle}`}
          onClick={close}
        >
          <div className="absolute left-4 top-4 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] px-3 py-1.5 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
            {openIndex + 1} / {count}
          </div>
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] text-[hsl(var(--editorial-foreground-muted))] hover:text-[hsl(var(--editorial-primary))]"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          <figure
            className="flex w-full max-w-6xl flex-col gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={1600}
              height={900}
              sizes="100vw"
              priority
              className="max-h-[75vh] w-full border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] object-contain"
            />
            <figcaption className="text-center text-sm text-[hsl(var(--editorial-foreground-muted))]">
              {active.caption}{' '}
              <span className="font-mono text-xs text-[hsl(var(--editorial-primary))]">· {active.date}</span>
            </figcaption>
            {count > 1 && (
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] text-[hsl(var(--editorial-foreground-muted))] hover:text-[hsl(var(--editorial-primary))]"
                  aria-label="Capture précédente"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] text-[hsl(var(--editorial-foreground-muted))] hover:text-[hsl(var(--editorial-primary))]"
                  aria-label="Capture suivante"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
