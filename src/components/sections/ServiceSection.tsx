'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    label: 'Application métier',
    title: 'Gestion sur mesure',
    description:
      "Vos process numérisés : workflows, rôles, formulaires complexes. Éprouvé au Ministère de l'Intérieur et à la DGBF.",
    stack: 'Symfony · React · MySQL',
  },
  {
    label: 'Tableau de bord',
    title: 'Excel vers web',
    description:
      'Vos fichiers deviennent une application partagée, à jour et sécurisée. Fini les versions qui circulent par mail.',
    stack: 'Next.js · Laravel · MySQL',
  },
  {
    label: 'API & intégrations',
    title: 'Vos outils connectés',
    description:
      'APIs REST sécurisées et documentées, synchronisation avec vos logiciels existants, authentification JWT.',
    stack: 'API Platform · PHP · JWT',
  },
];

/* Mobile : 1re offre pleine largeur, 2 et 3 côte à côte. Desktop : 3 colonnes. */
const CELL_LAYOUT = [
  'col-span-2 border-b pt-10 pb-10 md:col-span-1 md:border-b-0 md:py-12 md:pr-8 lg:pr-10',
  'pt-8 pb-10 pr-4 md:py-12 md:border-l md:px-8 lg:px-10',
  'pt-8 pb-10 pl-4 border-l md:py-12 md:px-8 lg:px-10',
];

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE },
  }),
} as const;
const viewed = new Set<string>();
const inView = (key: string, delay = 0) => ({
  initial: viewed.has(key) ? false : 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
  variants: fadeUp,
  custom: delay,
  onViewportEnter: () => {
    viewed.add(key);
  },
});

/* Appareils tactiles : pas de survol, la colonne s'active quand elle passe au centre de l'écran. */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(hover: none)');
    const update = () => setIsTouch(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return isTouch;
}

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const isTouch = useIsTouch();
  const centered = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const active = hovered || (isTouch && centered);

  return (
    <motion.article
      ref={ref}
      {...inView(`service-${index}`, 0.08 * index)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`relative flex flex-col border-[hsl(var(--editorial-border))] ${CELL_LAYOUT[index]}`}
    >
      {/* Ligne orange posée sur la bordure : se dessine vers la droite, se retire vers la gauche. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 -top-px h-px origin-left bg-[hsl(var(--editorial-primary))] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      <span className="font-mono text-[11px] text-[hsl(var(--editorial-foreground-muted))]">
        <span className="text-[hsl(var(--editorial-primary))]">{String(index + 1).padStart(2, '0')}</span>
        <span
          className={`ml-2 transition-colors duration-500 ${active ? 'text-[hsl(var(--editorial-primary))]' : ''}`}
        >
          {service.label}
        </span>
      </span>

      <h3 className="mt-8 text-[1.6rem] font-medium leading-[1.05] tracking-[-0.04em] text-[hsl(var(--editorial-foreground))] sm:text-3xl md:mt-14 lg:text-[2.6rem]">
        {service.title}
      </h3>

      <p className="mt-5 text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))] md:mt-6 md:text-[0.95rem]">
        {service.description}
      </p>

      <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.12em] text-[hsl(var(--editorial-foreground-muted))]">
        {service.stack}
      </p>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-[hsl(var(--editorial-bg))] py-24 text-[hsl(var(--editorial-foreground))] md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <motion.div
          {...inView('services-header', 0)}
          className="mb-16 grid gap-8 md:mb-24 md:grid-cols-[0.3fr_1fr] md:gap-12"
        >
          <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
            <span className="text-[hsl(var(--editorial-primary))]">01</span>
            <span className="ml-2">Services</span>
          </span>

          <div className="max-w-3xl">
            <h2 className="text-balance text-2xl font-medium leading-[1.2] tracking-[-0.03em] text-[hsl(var(--editorial-foreground))] md:text-[2.25rem]">
              Trois offres, un seul objectif : remplacer ce qui vous ralentit.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
              Je ne fais pas tout. Je conçois des outils métier qui remplacent les tableurs, les process
              manuels et les logiciels qui ne se parlent pas.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-primary))]"
            >
              Offres, tarifs et méthode
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 border-y border-[hsl(var(--editorial-border))] md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
