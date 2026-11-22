/*
 * English texts of the /skills page. Structure (levels, areas, proof links) stays in skills.ts;
 * this file only holds the translations, keyed by skill id. skills.content.ts merges both and
 * fails the build if a skill has no translation or a different number of proofs.
 */

import type { DomainId, Level } from './skills';

export const LEVELS: Record<Level, { label: string; definition: string }> = {
  livre: {
    label: 'Delivered',
    definition: 'Used in a finished, verifiable project (public code or live demo).',
  },
  'en-projet': {
    label: 'In project',
    definition: 'Used in an internship or ongoing project; the code is not public.',
  },
  apprentissage: {
    label: 'Learning',
    definition: 'Studied, not yet delivered in a project.',
  },
};

export const DOMAINS: Record<DomainId, string> = {
  backend: 'Backend',
  frontend: 'Frontend',
  donnees: 'Data',
  'tests-deploiement': 'Testing and deployment',
  complementaires: 'Related skills',
};

export type SkillText = {
  name?: string;
  summary: string;
  /** One label per proof, in the same order as in skills.ts. */
  evidence: string[];
  tags?: string[];
};

export const SKILLS: Record<string, SkillText> = {
  /* ── Backend ── */
  php: {
    name: 'Plain PHP',
    summary: 'Router, authentication middleware, sessions and PDO data access written without a framework (MVC architecture).',
    evidence: ['Router and 33 API routes'],
  },
  node: {
    summary: 'Express API split into modules (authentication, groups, contributions, exports, notifications), Zod validation and rate limiting.',
    evidence: ['Modular Express server'],
  },
  jwt: {
    name: 'JWT authentication',
    summary: 'Short-lived access token, rotating refresh token in an HttpOnly cookie, revocation of all sessions.',
    evidence: ['Refresh token rotation', 'JWT in an HttpOnly cookie (internship)'],
    tags: ['Refresh token', 'HttpOnly cookie', 'bcrypt'],
  },
  rest: {
    name: 'REST APIs',
    summary: 'REST contracts with explicit HTTP status codes, access control on every route and testing with Postman.',
    evidence: ['PHP API tested end to end', '42 Express routes', 'Postman test plan (internship)'],
    tags: ['CRUD', 'HTTP status codes', 'Postman'],
  },
  laravel: {
    summary: 'Laravel 11 REST API secured with Sanctum for the admin console of a public portal.',
    evidence: ['DGBF portal (internship)'],
  },
  symfony: {
    summary: 'Civil registration API with Doctrine, validation rules and a clerk / registrar approval workflow, built during an internship.',
    evidence: ['Ministry application (internship)'],
  },

  /* ── Frontend ── */
  javascript: {
    summary: 'Framework-free interface: state, rendering and API calls split into three modules.',
    evidence: ['Vanilla frontend'],
  },
  react: {
    summary: 'Interfaces connected to APIs: multi-step form, dashboards, protected routes.',
    evidence: ['React application', '9-step questionnaire', 'React interface (internship)'],
  },
  typescript: {
    summary: 'Typed components and API calls on the React and Vue frontends of the internship projects.',
    evidence: ['React + TypeScript (internship)', 'Vue + TypeScript (internship)'],
  },
  vue: {
    summary: 'Public pages and admin console of an institutional portal, consuming a Laravel API.',
    evidence: ['DGBF portal (internship)'],
  },
  tailwind: {
    summary: 'Responsive interfaces built with Tailwind utility classes.',
    evidence: ['TontiTrack interface', 'CampusPulse interface'],
  },
  state: {
    summary: 'Client state with Zustand and server request caching with TanStack Query.',
    evidence: ['TontiTrack client'],
  },
  recharts: {
    summary: 'Dashboard charts: breakdowns, monthly trends, status rings.',
    evidence: ['Statistics by topic', 'Dashboard charts'],
  },

  /* ── Data ── */
  mysql: {
    summary: 'Relational schema with foreign keys and cascading deletes, prepared statements.',
    evidence: ['6 related tables', 'Portal database (internship)', 'Civil registration database (internship)'],
    tags: ['Data modeling', 'PDO', 'Doctrine', 'Eloquent'],
  },
  mongodb: {
    summary: 'Mongoose models and transactions for append-only financial records, on MongoDB Atlas.',
    evidence: ['MongoDB transactions'],
  },
  postgres: {
    summary: 'Row Level Security policies, aggregation RPC functions and versioned migrations.',
    evidence: ['Migrations, RLS and RPC functions'],
  },
  exports: {
    name: 'Excel and PDF exports',
    summary: 'Multi-sheet Excel workbooks with ExcelJS and PDF documents generated with PDFKit.',
    evidence: ['PDF and Excel exports', 'Excel export of responses'],
  },

  /* ── Testing and deployment ── */
  jest: {
    summary: 'API integration tests on an in-memory MongoDB database (MongoMemoryServer) and unit tests of the calculations.',
    evidence: ['32 passing tests'],
    tags: ['MongoMemoryServer', 'Integration'],
  },
  phpunit: {
    summary: 'HTTP integration tests on a dedicated database, including denied access.',
    evidence: ['23 passing tests'],
  },
  vitest: {
    summary: 'React component tests: login, dashboard, group list.',
    evidence: ['Client tests'],
  },
  docker: {
    summary: 'Development and production environments with Docker Compose, started with a single command.',
    evidence: ['Dev and prod Compose files', 'Compose app + MySQL'],
  },
  nginx: {
    summary: 'Serves the compiled React frontend in production, falling back to index.html for client-side routes.',
    evidence: ['Nginx configuration'],
  },
  deploy: {
    name: 'Deployment on Render and Vercel',
    summary: 'Containerized API and frontend on Render, React application on Vercel, deployed from GitHub.',
    evidence: ['Demo on Render', 'Demo on Vercel'],
  },
  git: {
    summary: 'Tracked commit history on every public project, including 162 commits on TontiTrack.',
    evidence: ['Commit history'],
  },
  'github-actions': {
    summary: 'No project has continuous integration yet: tests are run by hand.',
    evidence: [],
  },

  /* ── Related skills ── */
  rbac: {
    name: 'Role-based access control',
    summary: 'Permissions checked on the server: workspace member roles, RLS policies, clerk / registrar workflow.',
    evidence: ['Viewer, editor, admin', 'Row Level Security policies', 'Four business roles (internship)'],
  },
  documentation: {
    summary: 'User guide for non-technical staff, API test plan and deployment procedure.',
    evidence: ['Documentation handed over to the Ministry (internship)'],
  },
  linux: {
    name: 'Linux server',
    summary: 'Ubuntu deployment procedure with Nginx, HTTPS and firewall written during an internship, not yet carried out.',
    evidence: [],
  },
};

export const LANGUAGES: { name: string; level: string; cefr: string | null }[] = [
  { name: 'Malagasy', level: 'Native', cefr: null },
  { name: 'French', level: 'Fluent', cefr: 'B2' },
  { name: 'English', level: 'Intermediate', cefr: 'B1' },
];
