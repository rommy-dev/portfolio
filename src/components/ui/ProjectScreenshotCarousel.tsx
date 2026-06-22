'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Images, X } from 'lucide-react';

interface ProjectScreenshotCarouselProps {
  projectTitle: string;
  images: string[];
}

export function ProjectScreenshotCarousel({
  projectTitle,
  images,
}: ProjectScreenshotCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'ArrowLeft' && hasMultipleImages) goToPrevious();
      if (event.key === 'ArrowRight' && hasMultipleImages) goToNext();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [goToNext, goToPrevious, hasMultipleImages, isOpen]);

  if (images.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setActiveIndex(0);
          setIsOpen(true);
        }}
        className="group rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:border-primary/40 cursor-pointer"
        aria-label={`Ouvrir les captures d'écran du projet ${projectTitle}`}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground-subtle">
            <Images className="h-3.5 w-3.5" />
            Capture d&apos;écran du projet
          </div>
          <Expand className="h-3.5 w-3.5 text-foreground-subtle transition-colors group-hover:text-primary" />
        </div>

        <div className="relative overflow-hidden rounded-lg border border-border bg-background">
          <Image
            src={images[0]}
            alt={`Capture d'écran du projet ${projectTitle}`}
            width={1280}
            height={720}
            sizes="(min-width: 1024px) 260px, 100vw"
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-2 right-2 rounded-md border border-border bg-background/80 px-2 py-1 text-[10px] font-semibold text-foreground-muted backdrop-blur-sm">
            {images.length} image{images.length > 1 ? 's' : ''}
          </span>
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Carousel des captures d'écran du projet ${projectTitle}`}
        >
          <div className="absolute left-4 top-4 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-muted">
            {activeIndex + 1} / {images.length}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground cursor-pointer hover:bg-surface-raised"
            aria-label="Fermer le carousel"
          >
            <X className="h-5 w-5" />
          </button>

          {hasMultipleImages && (
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground md:flex cursor-pointer hover:bg-surface-raised"
              aria-label="Capture précédente"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="flex w-full max-w-6xl flex-col gap-4">
            <div className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
              <Image
                src={activeImage}
                alt={`Capture ${activeIndex + 1} du projet ${projectTitle}`}
                width={1600}
                height={900}
                sizes="100vw"
                priority
                className="max-h-[72vh] w-full object-contain"
              />
            </div>

            {hasMultipleImages && (
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground md:hidden cursor-pointer hover:bg-surface-raised"
                  aria-label="Capture précédente"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex max-w-[calc(100vw-7rem)] gap-2 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      onClick={() => setActiveIndex(index)}
                      className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-md border transition-colors cursor-pointer ${
                        index === activeIndex
                          ? 'border-primary'
                          : 'border-border opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Afficher la capture ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground md:hidden cursor-pointer hover:bg-surface-raised"
                  aria-label="Capture suivante"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {hasMultipleImages && (
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground md:flex cursor-pointer hover:bg-surface-raised"
              aria-label="Capture suivante"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
