/*
 * Compétences : une seule source de vérité pour la page /competences.
 * Règle : chaque compétence a au moins une preuve (projet), sauf le niveau
 * « En apprentissage ». Les titres et liens des projets sont lus dans les MDX
 * (src/content/projects) au rendu ; ici, on ne référence que leur slug.
 * Tout texte contenant « [À COMPLÉTER : … ] » n'est pas affiché en production.
 */

export type Level = 'livre' | 'en-projet' | 'apprentissage';

export type DomainId = 'backend' | 'frontend' | 'donnees' | 'tests-deploiement' | 'complementaires';

export type Evidence = {
  projectSlug: string;
  /** Ce que le projet prouve pour cette compétence. */
  label: string;
  /** Lien direct vers le code, si public. */
  href?: string;
};

export type Skill = {
  id: string;
  name: string;
  domain: DomainId;
  level: Level;
  /** Une phrase, sans superlatif. */
  summary: string;
  evidence: Evidence[];
  tags?: string[];
};

export const LEVELS: Record<Level, { label: string; definition: string }> = {
  livre: {
    label: 'Livré',
    definition: 'Utilisé dans un projet terminé et vérifiable (code public ou démo).',
  },
  'en-projet': {
    label: 'En projet',
    definition: 'Utilisé dans un projet de stage ou en cours ; le code n’est pas public.',
  },
  apprentissage: {
    label: 'En apprentissage',
    definition: 'Étudié, pas encore livré dans un projet.',
  },
};

export const LEVEL_ORDER: Level[] = ['livre', 'en-projet', 'apprentissage'];

export const DOMAINS: { id: DomainId; label: string }[] = [
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'donnees', label: 'Données' },
  { id: 'tests-deploiement', label: 'Tests et déploiement' },
  { id: 'complementaires', label: 'Domaines complémentaires' },
];

const GH = {
  tontitrack: 'https://github.com/rommy-dev/tontitrack',
  workspace: 'https://github.com/rommy-dev/workspace-app',
  campuspulse: 'https://github.com/rommy-dev/CampusPulse',
};

export const SKILLS: Skill[] = [
  /* ── Backend ── */
  {
    id: 'php',
    name: 'PHP natif',
    domain: 'backend',
    level: 'livre',
    summary: 'Routeur, middleware d’authentification, sessions et accès PDO écrits sans framework (architecture MVC).',
    evidence: [
      { projectSlug: 'workspace-app', label: 'Routeur et 33 routes d’API', href: `${GH.workspace}/blob/main/public/index.php` },
    ],
    tags: ['MVC', 'Routing', 'Sessions', 'PDO'],
  },
  {
    id: 'node',
    name: 'Node.js / Express',
    domain: 'backend',
    level: 'livre',
    summary: 'API Express découpée en modules (authentification, groupes, cotisations, exports, notifications), validation Zod et limitation de débit.',
    evidence: [{ projectSlug: 'tontitrack', label: 'Serveur Express par modules', href: `${GH.tontitrack}/tree/main/server/src/modules` }],
    tags: ['Express', 'Zod', 'Helmet'],
  },
  {
    id: 'jwt',
    name: 'Authentification JWT',
    domain: 'backend',
    level: 'livre',
    summary: 'Jeton d’accès court, refresh token en cookie HttpOnly renouvelé par rotation, révocation de toutes les sessions.',
    evidence: [
      { projectSlug: 'tontitrack', label: 'Rotation des refresh tokens', href: `${GH.tontitrack}/blob/main/server/src/modules/auth/auth.service.js` },
      { projectSlug: 'etat-civil-actes-naissance', label: 'JWT en cookie HttpOnly (stage)' },
    ],
    tags: ['Refresh token', 'Cookie HttpOnly', 'bcrypt'],
  },
  {
    id: 'rest',
    name: 'APIs REST',
    domain: 'backend',
    level: 'livre',
    summary: 'Contrats REST avec codes HTTP explicites, contrôle d’accès sur chaque route et vérification avec Postman.',
    evidence: [
      { projectSlug: 'workspace-app', label: 'API PHP testée de bout en bout', href: `${GH.workspace}/tree/main/tests/Integration` },
      { projectSlug: 'tontitrack', label: '42 routes Express', href: `${GH.tontitrack}/tree/main/server/src/modules` },
      { projectSlug: 'etat-civil-actes-naissance', label: 'Plan de tests Postman (stage)' },
    ],
    tags: ['CRUD', 'Codes HTTP', 'Postman'],
  },
  {
    id: 'laravel',
    name: 'Laravel + Sanctum',
    domain: 'backend',
    level: 'en-projet',
    summary: 'API REST Laravel 11 protégée par Sanctum pour la console d’administration d’un portail public.',
    evidence: [{ projectSlug: 'site-dgbf', label: 'Portail de la DGBF (stage)' }],
    tags: ['Laravel 11', 'Eloquent', 'Sanctum'],
  },
  {
    id: 'symfony',
    name: 'Symfony 7 / API Platform',
    domain: 'backend',
    level: 'en-projet',
    summary: 'API d’état civil avec Doctrine, règles de validation et circuit secrétaire / officier, en contexte de stage.',
    evidence: [{ projectSlug: 'etat-civil-actes-naissance', label: 'Application du Ministère (stage)' }],
    tags: ['Doctrine', 'API Platform'],
  },

  /* ── Frontend ── */
  {
    id: 'javascript',
    name: 'JavaScript',
    domain: 'frontend',
    level: 'livre',
    summary: 'Interface sans framework : état, rendu et appels API séparés en trois modules.',
    evidence: [{ projectSlug: 'workspace-app', label: 'Frontend vanilla', href: `${GH.workspace}/tree/main/frontend` }],
    tags: ['DOM', 'Fetch API'],
  },
  {
    id: 'react',
    name: 'React',
    domain: 'frontend',
    level: 'livre',
    summary: 'Interfaces connectées à des API : formulaire en plusieurs étapes, tableaux de bord, routes protégées.',
    evidence: [
      { projectSlug: 'tontitrack', label: 'Application React', href: `${GH.tontitrack}/tree/main/client/src` },
      { projectSlug: 'campuspulse', label: 'Questionnaire en 9 étapes', href: `${GH.campuspulse}/blob/main/frontend/src/pages/Formulaire.jsx` },
      { projectSlug: 'etat-civil-actes-naissance', label: 'Interface React (stage)' },
    ],
    tags: ['Vite', 'React Router'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    domain: 'frontend',
    level: 'en-projet',
    summary: 'Typage des composants et des appels API sur les frontends React et Vue des projets de stage.',
    evidence: [
      { projectSlug: 'etat-civil-actes-naissance', label: 'React + TypeScript (stage)' },
      { projectSlug: 'site-dgbf', label: 'Vue + TypeScript (stage)' },
    ],
  },
  {
    id: 'vue',
    name: 'Vue 3',
    domain: 'frontend',
    level: 'en-projet',
    summary: 'Pages publiques et console d’administration d’un portail institutionnel, consommant une API Laravel.',
    evidence: [{ projectSlug: 'site-dgbf', label: 'Portail de la DGBF (stage)' }],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    domain: 'frontend',
    level: 'livre',
    summary: 'Interfaces responsives construites avec les classes utilitaires de Tailwind.',
    evidence: [
      { projectSlug: 'tontitrack', label: 'Interface TontiTrack', href: `${GH.tontitrack}/tree/main/client` },
      { projectSlug: 'campuspulse', label: 'Interface CampusPulse', href: `${GH.campuspulse}/tree/main/frontend` },
    ],
  },
  {
    id: 'state',
    name: 'Zustand / TanStack Query',
    domain: 'frontend',
    level: 'livre',
    summary: 'État client avec Zustand et cache des requêtes serveur avec TanStack Query.',
    evidence: [{ projectSlug: 'tontitrack', label: 'Client TontiTrack', href: `${GH.tontitrack}/tree/main/client/src` }],
  },
  {
    id: 'recharts',
    name: 'Recharts',
    domain: 'frontend',
    level: 'livre',
    summary: 'Graphiques de tableaux de bord : répartitions, évolutions mensuelles, anneaux de statut.',
    evidence: [
      { projectSlug: 'campuspulse', label: 'Statistiques par thématique', href: `${GH.campuspulse}/blob/main/frontend/src/pages/Statistiques.jsx` },
      { projectSlug: 'tontitrack', label: 'Graphiques du tableau de bord', href: `${GH.tontitrack}/tree/main/client/src/components/charts` },
    ],
  },

  /* ── Données ── */
  {
    id: 'mysql',
    name: 'MySQL',
    domain: 'donnees',
    level: 'livre',
    summary: 'Schéma relationnel avec clés étrangères et suppressions en cascade, requêtes préparées.',
    evidence: [
      { projectSlug: 'workspace-app', label: '6 tables reliées', href: `${GH.workspace}/blob/main/database/workspace_app.sql` },
      { projectSlug: 'site-dgbf', label: 'Base du portail (stage)' },
      { projectSlug: 'etat-civil-actes-naissance', label: 'Base de l’état civil (stage)' },
    ],
    tags: ['Modélisation', 'PDO', 'Doctrine', 'Eloquent'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB / Mongoose',
    domain: 'donnees',
    level: 'livre',
    summary: 'Modèles Mongoose et transactions pour des écritures financières en ajout seul, sur MongoDB Atlas.',
    evidence: [{ projectSlug: 'tontitrack', label: 'Transactions MongoDB', href: `${GH.tontitrack}/blob/main/server/src/modules/contributions/contribution.service.js` }],
    tags: ['Transactions', 'Atlas'],
  },
  {
    id: 'postgres',
    name: 'PostgreSQL / Supabase',
    domain: 'donnees',
    level: 'livre',
    summary: 'Policies Row Level Security, fonctions RPC d’agrégation et migrations versionnées.',
    evidence: [{ projectSlug: 'campuspulse', label: 'Migrations, RLS et fonctions RPC', href: `${GH.campuspulse}/tree/main/supabase/migrations` }],
    tags: ['RLS', 'RPC', 'Migrations'],
  },
  {
    id: 'exports',
    name: 'Exports Excel et PDF',
    domain: 'donnees',
    level: 'livre',
    summary: 'Classeurs Excel en plusieurs feuilles avec ExcelJS et documents PDF générés avec PDFKit.',
    evidence: [
      { projectSlug: 'tontitrack', label: 'Exports PDF et Excel', href: `${GH.tontitrack}/blob/main/server/src/modules/exports/export.service.js` },
      { projectSlug: 'campuspulse', label: 'Export Excel des réponses', href: `${GH.campuspulse}/blob/main/frontend/src/lib/excelExport.js` },
    ],
    tags: ['ExcelJS', 'PDFKit'],
  },

  /* ── Tests et déploiement ── */
  {
    id: 'jest',
    name: 'Jest + Supertest',
    domain: 'tests-deploiement',
    level: 'livre',
    summary: 'Tests d’intégration de l’API sur une base MongoDB en mémoire (MongoMemoryServer) et tests unitaires des calculs.',
    evidence: [{ projectSlug: 'tontitrack', label: '32 tests qui passent', href: `${GH.tontitrack}/tree/main/server/tests` }],
    tags: ['MongoMemoryServer', 'Intégration'],
  },
  {
    id: 'phpunit',
    name: 'PHPUnit',
    domain: 'tests-deploiement',
    level: 'livre',
    summary: 'Tests d’intégration HTTP sur une base dédiée, y compris les accès refusés.',
    evidence: [{ projectSlug: 'workspace-app', label: '23 tests qui passent', href: `${GH.workspace}/tree/main/tests/Integration` }],
  },
  {
    id: 'vitest',
    name: 'Vitest + Testing Library',
    domain: 'tests-deploiement',
    level: 'livre',
    summary: 'Tests de composants React : connexion, tableau de bord, liste des groupes.',
    evidence: [{ projectSlug: 'tontitrack', label: 'Tests du client', href: `${GH.tontitrack}/tree/main/client/src` }],
  },
  {
    id: 'docker',
    name: 'Docker / Docker Compose',
    domain: 'tests-deploiement',
    level: 'livre',
    summary: 'Environnements de développement et de production en Docker Compose, lancés en une commande.',
    evidence: [
      { projectSlug: 'tontitrack', label: 'Compose dev et prod', href: `${GH.tontitrack}/blob/main/docker-compose.prod.yml` },
      { projectSlug: 'workspace-app', label: 'Compose app + MySQL', href: `${GH.workspace}/blob/main/docker-compose.yml` },
    ],
  },
  {
    id: 'nginx',
    name: 'Nginx',
    domain: 'tests-deploiement',
    level: 'livre',
    summary: 'Sert le frontend React compilé en production, avec renvoi vers index.html pour les routes du client.',
    evidence: [{ projectSlug: 'tontitrack', label: 'Configuration Nginx', href: `${GH.tontitrack}/blob/main/client/nginx.conf` }],
  },
  {
    id: 'deploy',
    name: 'Déploiement Render et Vercel',
    domain: 'tests-deploiement',
    level: 'livre',
    summary: 'API et frontend conteneurisés sur Render, application React sur Vercel, déployés depuis GitHub.',
    evidence: [
      { projectSlug: 'tontitrack', label: 'Démo sur Render' },
      { projectSlug: 'campuspulse', label: 'Démo sur Vercel' },
    ],
  },
  {
    id: 'git',
    name: 'Git / GitHub',
    domain: 'tests-deploiement',
    level: 'livre',
    summary: 'Historique de commits suivi sur chaque projet public, dont 162 commits sur TontiTrack.',
    evidence: [{ projectSlug: 'tontitrack', label: 'Historique des commits', href: `${GH.tontitrack}/commits/main` }],
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    domain: 'tests-deploiement',
    level: 'apprentissage',
    summary: 'Aucun projet n’a encore d’intégration continue : les tests se lancent à la main.',
    evidence: [],
  },

  /* ── Domaines complémentaires ── */
  {
    id: 'rbac',
    name: 'Contrôle d’accès par rôles',
    domain: 'complementaires',
    level: 'livre',
    summary: 'Droits vérifiés côté serveur : rôles des membres d’un espace, policies RLS, circuit secrétaire / officier.',
    evidence: [
      { projectSlug: 'workspace-app', label: 'Lecteur, éditeur, admin' },
      { projectSlug: 'campuspulse', label: 'Policies Row Level Security' },
      { projectSlug: 'etat-civil-actes-naissance', label: 'Quatre rôles métier (stage)' },
    ],
  },
  {
    id: 'documentation',
    name: 'Documentation',
    domain: 'complementaires',
    level: 'en-projet',
    summary: 'Guide utilisateur pour des agents non techniques, plan de tests d’API et procédure de déploiement.',
    evidence: [{ projectSlug: 'etat-civil-actes-naissance', label: 'Documentation remise au Ministère (stage)' }],
  },
  {
    id: 'linux',
    name: 'Linux serveur',
    domain: 'complementaires',
    level: 'apprentissage',
    summary: 'Procédure de déploiement Ubuntu avec Nginx, HTTPS et pare-feu rédigée en stage, pas encore exécutée.',
    evidence: [],
  },
];

/* ── Comment je travaille ── */
export const WORK_STEPS: { title: string; summary: string }[] = [
  { title: 'Échange sur le besoin', summary: 'Comprendre le problème, les utilisateurs et les délais avant de proposer une solution.' },
  { title: 'Devis écrit', summary: 'Le périmètre, le prix et les étapes sont écrits et validés avant de commencer.' },
  { title: 'Acompte', summary: 'Le travail démarre après le versement de l’acompte prévu au devis.' },
  { title: 'Livraison par étapes', summary: 'Chaque étape est montrée en démonstration, pour corriger tôt.' },
  { title: 'Validation avant livraison finale', summary: 'Vous validez l’ensemble avant la mise en ligne définitive.' },
  { title: 'Support après livraison', summary: '[À COMPLÉTER : durée et conditions du support]' },
];

/* ── Langues ── (niveaux du Cadre européen commun de référence, CECRL) */
export const LANGUAGES: { name: string; level: string; cefr: string | null }[] = [
  { name: 'Malgache', level: 'Langue maternelle', cefr: null },
  { name: 'Français', level: 'Courant', cefr: 'B1' },
  { name: 'Anglais', level: 'Intermédiaire', cefr: 'B2' },
];

export const TODO_PATTERN = /\[À COMPLÉTER\s*:\s*([^\]]+)\]/;
export const hasTodo = (text: string) => TODO_PATTERN.test(text);
