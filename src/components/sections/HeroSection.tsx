'use client';

import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#090909] text-[#F2F0EC]">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at 72% 24%, rgba(255,149,111,0.14), transparent 28%), radial-gradient(circle at 18% 80%, rgba(255,149,111,0.05), transparent 30%), #090909',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="mx-auto w-full px-6 md:px-12 lg:px-16 pt-12 pb-16 md:pb-20 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
          <div className="relative z-10 flex h-full max-w-[780px] flex-col justify-between pt-4 lg:pt-10">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#A6A19B] lg:mb-0">
              <span className="inline-flex items-center gap-2 border border-[#292929] bg-[#111111] px-2.5 py-1.5 text-[#F2F0EC]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF956F]" />
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

              <p className="mt-8 max-w-[620px] text-base leading-relaxed text-[#A6A19B] md:text-lg lg:text-[1.05rem]">
                Je transforme des besoins métiers complexes en produits fluides, fiables et orientés croissance.
                Mon travail associe architecture logicielle, interface utilisateur et performance pour livrer des expériences qui inspirent confiance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projets"
                className="inline-flex items-center justify-center border border-[#292929] bg-[#FF956F] px-5 py-3 text-sm font-semibold text-[#090909] transition-colors hover:bg-[#FFB394] md:px-6"
              >
                Voir les projets
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#292929] bg-[#111111] px-5 py-3 text-sm font-semibold text-[#F2F0EC] transition-colors hover:border-[#FF956F] hover:text-[#FF956F] md:px-6"
              >
                Me contacter
              </Link>
            </div>

          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,149,111,0.14),transparent_58%)] blur-2xl" />
            <div className="relative w-full max-w-[540px] overflow-hidden border border-[#292929] bg-[#111111] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
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