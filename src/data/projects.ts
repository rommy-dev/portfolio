import type { Project } from '@/components/ui/ProjectCard';

const normalizeSlug = (value: string) =>
  decodeURIComponent(value).trim().toLowerCase();

export const ALL_PROJECTS: (Project & { slug: string })[] = [
  {
    id: 1,
    slug: 'tontitrack',
    title: 'TontiTrack',
    description:
      'Plateforme de gestion de tontines et prêts collectifs — stack MERN prête pour la production. Suivi des contributions, calcul automatique des dettes, gestion des pénalités, notifications planifiées, exports comptables PDF/Excel et support multi-devise.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'TailwindCSS', 'Zustand', 'TanStack React Query', 'Docker', 'Nginx'],
    category: 'Fullstack',
    year: '2026',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-secondary/20 via-secondary/10 to-primary/10',
    accentColor: 'text-secondary',
    headerImage: '/projects/tontitrack/header.png',
    screenshotImages: [
      '/projects/tontitrack/screenshots/screenshot-1.webp',
      '/projects/tontitrack/screenshots/screenshot-2.webp',
      '/projects/tontitrack/screenshots/screenshot-3.webp',
      '/projects/tontitrack/screenshots/screenshot-4.webp',
    ],
    githubUrl: 'https://github.com/rommy-dev/tontitrack',
    demoUrl: 'https://tontitrack-client.onrender.com',
    private: false,
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
    gradient: 'from-primary/20 via-primary/10 to-secondary/10',
    accentColor: 'text-primary',
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
    id: 3,
    slug: 'etat-civil-actes-naissance',
    title: 'État Civil — Actes de naissance',
    description:
      'Application gouvernementale de saisie rétroactive des actes d\'état civil pour le Ministère de l\'Intérieur malgache. Gestion sécurisée de données sensibles avec authentification par rôles et APIs REST conformes aux exigences de confidentialité.',
    tech: ['Symfony 7', 'API Platform', 'React', 'TypeScript', 'MySQL'],
    category: 'Fullstack',
    year: '2026',
    status: 'En cours',
    statusColor: 'text-accent bg-accent/10 border-accent/20',
    gradient: 'from-tertiary/20 via-tertiary/10 to-primary/10',
    accentColor: 'text-tertiary',
    headerImage: '/projects/etat-civil-actes-naissance/header.webp',
    screenshotImages: [
      '/projects/etat-civil-actes-naissance/screenshots/screenshot-1.webp',
      '/projects/etat-civil-actes-naissance/screenshots/screenshot-2.webp',
      '/projects/etat-civil-actes-naissance/screenshots/screenshot-3.webp',
      '/projects/etat-civil-actes-naissance/screenshots/screenshot-4.webp',
      '/projects/etat-civil-actes-naissance/screenshots/screenshot-5.webp',
    ],
    githubUrl: null,
    demoUrl: null,
    private: true,
    featured: true,
  },
  {
    id: 4,
    slug: 'workspace-app',
    title: 'Workspace App',
    description:
      'Application web collaborative de gestion de contenu : workspaces, pages, commentaires et invitations. PHP natif, MySQL et JavaScript vanilla, API REST et tests d\'intégration.',
    tech: ["PHP 8.3", "MySQL 8", "JavaScript", "PHPUnit 12", "Docker", "Render", "Railway"],
    category: 'Fullstack',
    year: '2026',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-accent/20 via-accent/10 to-primary/10',
    accentColor: 'text-accent',
    headerImage: '/projects/workspace-app/header.webp',
    screenshotImages: [
      '/projects/workspace-app/screenshots/screenshot-1.webp',
      '/projects/workspace-app/screenshots/screenshot-2.webp',
      '/projects/workspace-app/screenshots/screenshot-3.webp',
    ],
    githubUrl: 'https://github.com/rommy-dev/workspace-app',
    demoUrl: 'https://workspace-app-7602.onrender.com',
    private: false,
    featured: false,
  },
  {
    id: 5,
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