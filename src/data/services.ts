/*
 * Contenu de la page /services.
 *
 * Mentions de brouillon (voir src/lib/draft.tsx) :
 * - [À CONFIRMER] ou [À CONFIRMER : …] : la phrase est publiable, un détail reste à vérifier.
 *   En production, la mention est retirée et les valeurs entre crochets ([30 jours]) restent affichées.
 * - [À COMPLÉTER : …] : une information manque. En production, la ligne entière est masquée.
 */

export type ProjectRef = { slug: string; note: string };

export type Offer = {
  id: string;
  label: string;
  title: string;
  forWho?: string;
  problem?: string;
  deliverables?: string[];
  body?: string;
  billing?: string;
  duration?: string;
  price: string;
  priceNote?: string;
  references: ProjectRef[];
};

export const OFFERS: Offer[] = [
  {
    id: 'gestion',
    label: 'Application de gestion',
    title: 'Application de gestion sur mesure',
    forWho:
      'PME, associations, centres de formation et cabinets qui gèrent clients, commandes, inscriptions ou stocks avec Excel ou du papier.',
    problem: 'Saisies en double, erreurs de calcul, pas de vue d’ensemble, historique introuvable.',
    deliverables: [
      'une application web en ligne de 5 à 8 écrans',
      'des comptes avec rôles (administrateur, utilisateur)',
      'l’enregistrement, la modification et la recherche des données',
      'des exports PDF et Excel et un tableau de bord de suivi',
      'la mise en ligne, un guide d’utilisation court et une séance de prise en main d’1 heure en visioconférence',
    ],
    duration: '5 à 8 semaines',
    price: 'à partir de 5 000 000 Ar',
    priceNote: '≈ 1 000 €',
    references: [
      { slug: 'tontitrack', note: 'contributions, dettes, pénalités, exports' },
      { slug: 'workspace-app', note: 'rôles, API, tests' },
    ],
  },
  {
    id: 'tableau-de-bord',
    label: 'Données',
    title: 'Tableau de bord et collecte de données',
    forWho:
      'Organisations qui collectent des réponses (enquêtes, formulaires) ou suivent des indicateurs dans des tableurs.',
    deliverables: [
      'un formulaire de collecte en ligne',
      'une base de données structurée',
      'un tableau de bord avec indicateurs et graphiques',
      'un export Excel sur plusieurs feuilles',
      'un accès par rôles',
    ],
    duration: '3 à 5 semaines',
    price: 'à partir de 3 000 000 Ar',
    priceNote: '≈ 600 €',
    references: [
      {
        slug: 'campuspulse',
        note: '9 thématiques, plus de 60 questions, tableau de bord administrateur, export Excel',
      },
    ],
  },
  {
    id: 'api',
    label: 'API et intégrations',
    title: 'API, intégrations et corrections',
    forWho:
      'Entreprises et agences qui ont déjà une application et ont besoin d’une API REST, d’une connexion entre deux outils, d’une correction ou d’un module supplémentaire (Laravel, Symfony, Node.js, React, Vue).',
    billing: 'À la journée, ou au forfait après analyse.',
    duration: 'selon la mission',
    price: '200 000 Ar par jour',
    priceNote: '≈ 40 € · 100 000 Ar la demi-journée · mission minimale : une demi-journée',
    references: [
      { slug: 'workspace-app', note: 'plus de 30 routes, 22 tests d’intégration' },
    ],
  },
  {
    id: 'maintenance',
    label: 'Option',
    title: 'Maintenance mensuelle',
    body: 'Surveillance, sauvegardes, mises à jour de sécurité et corrections jusqu’à 3 heures par mois.',
    duration: 'en continu',
    price: 'à partir de 200 000 Ar par mois',
    priceNote: '≈ 40 € · hébergement et nom de domaine facturés à part, à votre nom',
    references: [],
  },
];

export const PRICING_NOTES = [
  '« À partir de » correspond au périmètre minimal décrit dans chaque offre. Le devis final tient compte du nombre de journées estimées, du tarif journalier et d’une marge de 20 % pour les imprévus.',
  'Le devis est écrit et gratuit. Tout ce qui sort du périmètre signé fait l’objet d’un avenant chiffré avant d’être réalisé.',
  'Les prix sont en ariary. Les équivalents en euros sont indicatifs (environ 5 000 Ar pour 1 €).',
  'TVA non applicable : prestataire non assujetti.',
];

export type Fact = { label: string; text: string };

export const INTERNATIONAL_INTRO =
  'Pour les clients hors de Madagascar, je prends d’abord des missions courtes : corrections, API, modules, tableaux de bord.';

export const INTERNATIONAL: Fact[] = [
  { label: 'Tarif', text: 'À partir de 15 $ de l’heure (≈ 14 €). Les projets plus larges sont chiffrés au forfait sur devis.' },
  { label: 'Fuseau horaire', text: 'UTC+3.' },
  { label: 'Disponibilité', text: 'Du lundi au vendredi, de 8 h à 17 h (UTC+3).' },
  { label: 'Langues', text: 'Français.' },
  { label: 'Anglais', text: 'Écrit professionnel ; échanges oraux possibles, à un rythme plus lent.' },
  {
    label: 'Paiement',
    text: 'Via la plateforme de mise en relation (protection des fonds incluse) ou sur facture, avec acompte. Les frais bancaires internationaux sont à la charge du client.',
  },
];

/* ── Déroulé d'un projet ── */
export type WorkStep = { title: string; summary: string; outcome: string };

export const WORK_STEPS: WorkStep[] = [
  {
    title: 'Échange',
    summary:
      'Appel ou message de 30 minutes, gratuit : votre activité, vos outils actuels, le problème à résoudre.',
    outcome: 'Une première idée du périmètre.',
  },
  {
    title: 'Cadrage et devis',
    summary: 'Liste des écrans et fonctions, périmètre, délai, prix.',
    outcome: 'Un devis écrit sous 3 jours ouvrés.',
  },
  {
    title: 'Lancement',
    summary: 'Signature du devis et versement de l’acompte.',
    outcome: 'Un calendrier de démonstrations.',
  },
  {
    title: 'Développement',
    summary: 'Livraison par étapes, démonstration toutes les 1 à 2 semaines.',
    outcome: 'Une version testable en ligne dès la première étape.',
  },
  {
    title: 'Recette',
    summary: 'Vous testez et signalez les corrections.',
    outcome: 'Corrections dans le périmètre signé.',
  },
  {
    title: 'Livraison',
    summary: 'Mise en ligne, guide d’utilisation, prise en main.',
    outcome: 'Application en service, code et accès à votre nom.',
  },
  {
    title: 'Support',
    summary: 'Correction des anomalies du périmètre livré pendant 30 jours.',
    outcome: 'Un interlocuteur après la mise en ligne.',
  },
];

export const CLIENT_EXPECTATIONS =
  'Un référent disponible, des retours sous 3 jours ouvrés, des exemples de vos fichiers actuels et une validation écrite à chaque étape.';

/* ── Paiement ── */
export const PAYMENT_SCHEDULE: { amount: string; schedule: string }[] = [
  {
    amount: 'À partir de 2 000 000 Ar',
    schedule: '40 % à la commande, 30 % à la démonstration intermédiaire, 30 % à la validation finale',
  },
  { amount: 'Moins de 2 000 000 Ar', schedule: '50 % à la commande, 50 % à la livraison' },
  {
    amount: 'Missions à la journée',
    schedule: 'Facturation en fin de mission, ou chaque semaine pour les missions longues',
  },
];

export const PAYMENT_METHODS: { clients: string; methods: string }[] = [
  {
    clients: 'Madagascar',
    methods:
      'MVola, Orange Money ; virement bancaire en ariary',
  },
  {
    clients: 'International',
    methods:
      'Plateforme de mise en relation, ou virement international sur facture',
  },
];

export const PAYMENT_NOTES = [
  'L’acompte déclenche le début du travail. Le code et les accès sont transférés après le paiement intégral.',
  'Les coordonnées de paiement figurent sur la facture, jamais sur ce site.',
  'Chaque paiement donne lieu à une facture.',
  'Retard de paiement : le travail est suspendu après 7 jours de retard.',
];

/* ── Engagements ── */
export const SCOPE: Fact[] = [
  {
    label: 'Périmètre',
    text: 'Défini par écrit dans le devis. Les modifications demandées ensuite sont chiffrées avant d’être réalisées.',
  },
  { label: 'Corrections', text: '2 tours de corrections par étape sont inclus.' },
  {
    label: 'Propriété',
    text: 'Le code et les accès (nom de domaine, hébergement, base de données) sont à votre nom. Le transfert du code est effectif après paiement intégral.',
  },
  {
    label: 'Confidentialité',
    text: 'Un accord de confidentialité peut être signé. Je ne présente aucun projet client dans mon portfolio sans accord écrit.',
  },
];

export const AFTER_DELIVERY: Fact[] = [
  { label: 'Support', text: 'Correction des anomalies du périmètre livré pendant 30 jours.' },
  { label: 'Maintenance', text: 'En option : voir l’offre 04, Maintenance mensuelle.' },
  { label: 'Documentation', text: 'Guide d’utilisation et dépôt du code remis à la livraison.' },
];

/* Les canaux (WhatsApp, e-mail) viennent de src/lib/contact.ts. */
export const COMMUNICATION: Fact[] = [
  { label: 'Disponibilité', text: 'Du lundi au vendredi, de 8 h à 17 h, fuseau UTC+3.' },
  { label: 'Réponse', text: 'Sous 24 heures ouvrées.' },
  { label: 'Suivi', text: 'Un point d’avancement écrit chaque semaine.' },
];

export const FAQ: { question: string; answer: string }[] = [
  {
    question: 'Quel est le budget minimum ?',
    answer:
      'Un tableau de bord commence à 3 000 000 Ar. En dessous, je propose des missions à la journée à 200 000 Ar.',
  },
  {
    question: 'Je n’ai pas de cahier des charges. Est-ce un problème ?',
    answer:
      'Non. L’étape d’échange et de cadrage sert à le construire. Vous recevez une liste d’écrans et de fonctions à valider avec le devis.',
  },
  {
    question: 'Puis-je payer en ariary ?',
    answer: 'Oui, par MVola, Orange Money, Airtel Money ou virement bancaire.',
  },
  {
    question: 'Qui possède le code ?',
    answer:
      'Vous, après paiement intégral. Les composants génériques non confidentiels que je réutilise d’un projet à l’autre restent à moi.',
  },
  {
    question: 'Qui paie l’hébergement et le nom de domaine ?',
    answer:
      'Vous, directement auprès du fournisseur, avec un compte à votre nom. Je m’occupe de la configuration.',
  },
  {
    question: 'Que se passe-t-il si mes besoins changent en cours de route ?',
    answer: 'Le changement est chiffré par écrit. Vous décidez de l’accepter ou non avant que je le réalise.',
  },
  {
    question: 'Faites-vous des sites vitrines ?',
    answer: 'Seulement en complément d’une application.',
  },
  {
    question: 'Mes données sont-elles protégées ?',
    answer:
      'Elles sont hébergées sur des comptes à votre nom, avec des accès par rôles. Un accord de confidentialité peut être signé.',
  },
  {
    question: 'Que se passe-t-il après la mise en ligne ?',
    answer: 'Une période de support puis, si vous le souhaitez, la maintenance mensuelle.',
  },
];

export const BRIEF_INTRO = 'Décrivez votre besoin en quelques lignes. Je réponds sous 48 heures ouvrées.';
export const BOOKING_LINK = '[À COMPLÉTER : lien de réservation d’appel]';

export const BUDGETS = [
  'Moins de 3 000 000 Ar',
  '3 à 5 000 000 Ar',
  '5 à 10 000 000 Ar',
  'Plus de 10 000 000 Ar',
  'Je ne sais pas',
] as const;

export const LEGAL = [
  'Prestataire : Ny Aina Rommy Ramaromilanto, Antananarivo.',
  'Statut, NIF et STAT : [À COMPLÉTER].',
];
