const DEFAULT_TECHNOLOGY_COLOR = 'bg-surface text-foreground-muted border-border';

export const TECHNOLOGY_COLORS: Record<string, string> = {
  'API Platform': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Bootstrap: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'C/C++': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  Docker: 'bg-blue-600/10 text-blue-600 border-blue-600/20',
  'Framer Motion': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  Java: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  JavaScript: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Laravel: 'bg-red-500/10 text-red-500 border-red-500/20',
  MongoDB: 'bg-green-600/10 text-green-600 border-green-600/20',
  MySQL: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'Next.js': 'bg-foreground/8 text-foreground border-border',
  'Node.js': 'bg-green-500/10 text-green-500 border-green-500/20',
  PHP: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  PHPUnit: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  Prisma: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  Python: 'bg-blue-200/10 text-blue-700 border-blue-200/20',
  Railway: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  React: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
  Render: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  'Socket.io': 'bg-gray-500/10 text-foreground-muted border-border',
  Stripe: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  Symfony: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'Tailwind CSS': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  TypeScript: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Vite: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Vue: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'Vue.js': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const stripVersion = (technology: string) =>
  technology.replace(/\s+\d+(?:\.\d+)*(?:[-.][\w]+)?$/u, '');

export const getTechnologyColor = (technology: string) => {
  const normalizedTechnology = technology.trim();

  return (
    TECHNOLOGY_COLORS[normalizedTechnology] ??
    TECHNOLOGY_COLORS[stripVersion(normalizedTechnology)] ??
    DEFAULT_TECHNOLOGY_COLOR
  );
};
