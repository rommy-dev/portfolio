'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

const profileLinks = [
  { href: 'mailto:ram.rommynya@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://github.com/rommy-dev', label: 'Github', icon: Github },
  {
    href: 'https://www.linkedin.com/in/ny-aina-rommy-ramaromilanto-50509144b',
    label: 'Linkedin',
    icon: Linkedin,
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden min-h-dvh bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-80"
        />
      </div>

      <div className="absolute inset-0 z-0 lg:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />
        <Image
          src="/avatar.png"
          alt="Portrait de Rommy"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 0vw"
          className="object-cover grayscale contrast-[1.04] brightness-[0.7] saturate-0"
        />
      </div>

      <div className="relative z-10 mx-auto w-full min-h-dvh px-6 md:px-12 lg:px-16 pt-12 pb-16 md:pb-20 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
          <div className="relative z-10 hidden h-full max-w-[780px] flex-col justify-start pt-4 lg:flex lg:justify-between lg:pt-10">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--editorial-foreground-muted))] lg:mb-0">
              <span className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-2.5 py-1.5 text-[hsl(var(--editorial-foreground))]">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--editorial-primary))]" />
                Développeur Fullstack
              </span>
            </div>

            <div className="my-8 lg:my-0">
              <h1
                className="text-balance font-black leading-[0.9] tracking-[0.01em] text-[clamp(2.5rem,5vw+1rem,6.5rem)]"
                style={{
                  background: 'linear-gradient(90deg, #FFB394 0%, #FF956F 18%, #F2C4AF 42%, #FF8B5A 60%, #F2C4AF 78%, #FF956F 100%)',
                  backgroundSize: '220% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  animation: 'heroGradientShift 12s ease-in-out infinite alternate',
                }}
              >
                Architecture et Performance.
              </h1>

              <p className="mt-8 max-w-[620px] text-base leading-relaxed text-[hsl(var(--editorial-foreground-muted))] md:text-lg lg:text-[1.05rem]">
                Je transforme des besoins métiers complexes en produits fluides, fiables et orientés croissance.
                Mon travail associe architecture logicielle, interface utilisateur et performance pour livrer des expériences qui inspirent confiance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projets"
                className="inline-flex items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-primary-fg))] transition-colors hover:bg-[hsl(var(--editorial-primary-strong))] md:px-6"
              >
                Voir les projets
              </Link>
              <a
                href="/cv-rommy-ramaromilanto.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))] md:px-6"
              >
                Télécharger le CV
              </a>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 xl:gap-x-8">
                {profileLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 border-l border-[hsl(var(--editorial-border))] pl-3 pr-1 py-2 text-sm font-medium text-[hsl(var(--editorial-foreground))] transition-colors first:border-l-0 first:pl-0 hover:text-[hsl(var(--editorial-primary))] sm:pl-4 lg:pl-5"
                  >
                    <Icon className="h-4 w-4 text-[hsl(var(--editorial-primary))]" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex max-w-[780px] min-h-[calc(100dvh-10rem)] flex-col justify-between pt-0 lg:hidden">
            <div>
              <div className="mb-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--editorial-foreground-muted))]">
                <span className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-2.5 py-1.5 text-[hsl(var(--editorial-foreground))]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--editorial-primary))]" />
                  Développeur Fullstack
                </span>
              </div>

              <h1
                className="text-balance font-black leading-[0.9] tracking-[0.01em] text-[clamp(2.5rem,8vw+1rem,6.5rem)]"
                style={{
                  background: 'linear-gradient(90deg, #FFB394 0%, #FF956F 18%, #F2C4AF 42%, #FF8B5A 60%, #F2C4AF 78%, #FF956F 100%)',
                  backgroundSize: '220% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  animation: 'heroGradientShift 12s ease-in-out infinite alternate',
                }}
              >
                Architecture et Performance.
              </h1>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              <p className="max-w-[620px] text-foreground leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
                Je transforme des besoins métiers complexes en produits fluides, fiables et orientés croissance.
                Mon travail associe architecture logicielle, interface utilisateur et performance pour livrer des expériences qui inspirent confiance.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projets"
                  className="inline-flex items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-primary-fg))] transition-colors hover:bg-[hsl(var(--editorial-primary-strong))] md:px-6"
                >
                  Voir les projets
                </Link>
                <a
                  href="/cv-rommy-ramaromilanto.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))] md:px-6"
                >
                  Télécharger le CV
                </a>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 xl:gap-x-8">
                  {profileLinks.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group inline-flex items-center gap-2.5 border-l border-[hsl(var(--editorial-border))] pl-3 pr-1 py-2 text-sm font-medium text-[hsl(var(--editorial-foreground))] transition-colors first:border-l-0 first:pl-0 hover:text-[hsl(var(--editorial-primary))] sm:pl-4 lg:pl-5"
                    >
                      <Icon className="h-4 w-4 text-[hsl(var(--editorial-primary))]" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden justify-center lg:flex lg:justify-end">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,149,111,0.14),transparent_58%)] blur-2xl" />
            <div className="relative w-full max-w-[540px] overflow-hidden border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,149,111,0.12),transparent_30%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.38))]" />
              <Image
                src="/avatar.png"
                alt="Portrait de Rommy"
                width={700}
                height={860}
                priority
                className="h-[70vh] w-full max-h-[760px] object-cover grayscale contrast-[1.04] brightness-[0.9] saturate-0 md:h-[74vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}