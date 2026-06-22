import type { Project } from '@/components/ui/ProjectCard';

const normalizeSlug = (value: string) =>
  decodeURIComponent(value).trim().toLowerCase();

export const ALL_PROJECTS: (Project & { slug: string })[] = [
  {
    id: 1,
    slug: 'etat-civil-actes-naissance',
    title: 'État Civil — Actes de naissance',
    description:
      'Application gouvernementale de saisie rétroactive des actes d\'état civil pour le Ministère de l\'Intérieur malgache. Gestion sécurisée de données sensibles avec authentification par rôles et APIs REST conformes aux exigences de confidentialité.',
    tech: ['Symfony 7', 'API Platform', 'React', 'TypeScript', 'MySQL'],
    category: 'Fullstack',
    year: '2026',
    status: 'En cours',
    statusColor: 'text-accent bg-accent/10 border-accent/20',
    gradient: 'from-primary/20 via-primary/10 to-secondary/10',
    accentColor: 'text-primary',
    headerImage: '/projects/etat-civil-actes-naissance/header.webp',
    screenshotImages: [
      '/projects/etat-civil-actes-naissance/screenshots/screenshot-1.webp',
    ],
    githubUrl: null,
    demoUrl: null,
    private: true,
    featured: true,
  },
  {
    id: 2,
    slug: 'site-dgbf',
    title: 'Site du DGBF',
    description:
      'Refonte du portail institutionnel de la Direction Générale du Budget et des Finances. Portail public de transparence budgétaire, organigramme interactif, documents réglementaires et administration sécurisée avec une architecture Laravel API-first et Vue.',
    tech: ['Laravel 11', 'Vue 3', 'TypeScript', 'Vite', 'MySQL'],
    category: 'Fullstack',
    year: '2026',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-secondary/20 via-secondary/10 to-primary/10',
    accentColor: 'text-secondary',
    headerImage: '/projects/site-dgbf/header.webp',
    screenshotImages: [
      '/projects/site-dgbf/screenshots/screenshot-1.webp',
      '/projects/site-dgbf/screenshots/screenshot-2.webp',
      '/projects/site-dgbf/screenshots/screenshot-3.webp',
      '/projects/site-dgbf/screenshots/screenshot-4.webp',
      '/projects/site-dgbf/screenshots/screenshot-5.webp',
    ],
    githubUrl: null,
    demoUrl: 'https://www.dgbf.mg/',
    private: true,
    featured: true,
  },
  {
    id: 4,
    slug: 'portfolio-personnel',
    title: 'Portfolio Personnel',
    description:
      'Site portfolio personnel avec animations interactives, mode sombre/clair, et système de gestion de projets.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'Frontend',
    year: '2025',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-primary/20 via-primary/10 to-secondary/10',
    accentColor: 'text-primary',
    headerImage: '/projects/portfolio-personnel/header.webp',
    screenshotImages: [
      '/projects/portfolio-personnel/screenshots/screenshot-1.webp',
    ],
    githubUrl: 'https://github.com/rommy-dev/portfolio',
    demoUrl: 'https://rommy.dev',
    private: false,
    featured: true,
  },
  {
    id: 6,
    slug: 'workspace-app',
    title: 'Workspace App',
    description:
      'Application web collaborative de gestion de contenu : workspaces, pages, commentaires et invitations. PHP natif, MySQL et JavaScript vanilla, API REST et tests d\'integration.',
    tech: ['PHP 8.3', 'MySQL 8', 'JavaScript', 'PHPUnit 12'],
    category: 'Fullstack',
    year: '2026',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-tertiary/20 via-tertiary/10 to-primary/10',
    accentColor: 'text-tertiary',
    headerImage: '/projects/workspace-app/header.webp',
    screenshotImages: [
      '/projects/workspace-app/screenshots/screenshot-1.webp',
    ],
    githubUrl: 'https://github.com/rommy-dev/workspace-app',
    demoUrl: null,
    private: false,
    featured: false,
  },
];

export const CATEGORIES = ['Tous', 'Fullstack', 'Frontend', 'Backend'];

export const getFeaturedProjects = () => ALL_PROJECTS.filter(project => project.featured);

export const getProjectBySlug = (slug: string) => {
  const normalized = normalizeSlug(slug);
  return ALL_PROJECTS.find(project => normalizeSlug(project.slug) === normalized);
};
