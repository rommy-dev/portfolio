import type { Project } from '@/components/ui/ProjectCard';

export const ALL_PROJECTS: (Project & { slug: string })[] = [
  {
    id: 1,
    slug: 'etat-civil-naissance',
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
    githubUrl: null,
    demoUrl: null,
    private: true,
    featured: true,
  },
  {
    id: 2,
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'Plateforme e-commerce complète : catalogue produits, panier persistant, paiement Stripe et interface d\'administration avec tableau de bord analytique.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'MySQL', 'Prisma'],
    category: 'Fullstack',
    year: '2025',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-secondary/20 via-secondary/10 to-primary/10',
    accentColor: 'text-secondary',
    githubUrl: 'https://github.com/rommy-dev/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    private: false,
    featured: false,
  },
  {
    id: 3,
    slug: 'task-management-app',
    title: 'Task Management App',
    description:
      'Application de gestion de tâches avec drag & drop, filtres avancés, et collaboration en temps réel.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'Frontend',
    year: '2025',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-tertiary/20 via-tertiary/10 to-secondary/10',
    accentColor: 'text-tertiary',
    githubUrl: 'https://github.com/rommy-dev/task-manager',
    demoUrl: 'https://task-manager-demo.vercel.app',
    private: false,
    featured: false,
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
    githubUrl: 'https://github.com/rommy-dev/portfolio',
    demoUrl: 'https://rommy.dev',
    private: false,
    featured: true,
  },
  {
    id: 5,
    slug: 'api-rest-blog',
    title: 'API REST Blog',
    description:
      'API RESTful pour application de blog avec authentification JWT, gestion des articles, commentaires et utilisateurs.',
    tech: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'JWT'],
    category: 'Backend',
    year: '2024',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-secondary/20 via-secondary/10 to-primary/10',
    accentColor: 'text-secondary',
    githubUrl: 'https://github.com/rommy-dev/blog-api',
    demoUrl: 'https://blog-api-docs.vercel.app',
    private: false,
    featured: false,
  },
];

export const CATEGORIES = ['Tous', 'Fullstack', 'Frontend', 'Backend'];

export const getFeaturedProjects = () => ALL_PROJECTS.filter(project => project.featured);

export const getProjectBySlug = (slug: string) => ALL_PROJECTS.find(project => project.slug === slug);
