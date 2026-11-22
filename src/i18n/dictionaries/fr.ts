/*
 * Textes de l'interface en français. Le dictionnaire anglais (en.ts) a le même type :
 * une clé manquante d'un côté est une erreur TypeScript.
 * Les `{clé}` sont remplacés par `format()` (src/i18n/config.ts).
 * Les contenus longs vivent ailleurs : src/data/* (services, compétences) et src/content/projects (MDX).
 */

export const fr = {
  meta: {
    title: 'Ny Aina Rommy Ramaromilanto — Développeur Fullstack',
    description:
      'Développeur web fullstack basé à Antananarivo, Madagascar. Symfony, React, Next.js. Disponible pour missions freelance et opportunités.',
    siteName: 'Ny Aina Rommy Ramaromilanto — Portfolio',
    ogDescription: 'Portfolio de Ny Aina Rommy Ramaromilanto, développeur fullstack React & Symfony.',
    services: {
      title: 'Services',
      description:
        'Applications de gestion, tableaux de bord et API sur mesure pour PME et organisations, à Madagascar et à l’international. Prix indicatifs en ariary, devis écrit gratuit, paiement par étapes, livraison avec démonstration.',
    },
    projects: {
      title: 'Projets',
      description:
        'Études de cas : projets avec démo et code public, et projets réalisés en stage pour des institutions malgaches.',
    },
    skills: {
      title: 'Compétences',
      description:
        'Compétences backend, frontend, données, tests et déploiement, chacune reliée au projet qui la prouve.',
    },
    contact: {
      title: 'Contact',
      description:
        'Contacter Ny Aina Rommy Ramaromilanto, développeur fullstack à Antananarivo : missions freelance, collaborations, opportunités.',
    },
    projectNotFound: 'Projet non trouvé',
    notFound: 'Page introuvable',
  },

  nav: {
    home: 'Accueil',
    services: 'Services',
    projects: 'Projets',
    skills: 'Compétences',
    contact: 'Contact',
  },

  header: {
    homeAria: 'Accueil',
    contactCta: 'Me contacter',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },

  languageSwitcher: {
    navAria: 'Langue du site',
    /* Libellés lus dans la langue cible (attribut lang sur chaque lien). */
    fr: { short: 'FR', name: 'Français', label: 'Lire en français' },
    en: { short: 'EN', name: 'English', label: 'Read in English' },
  },

  footer: {
    tagline: 'Du code qui travaille en silence.',
    navAria: 'Pied de page',
    navHeading: 'Naviguer',
    reachHeading: 'Me joindre',
    rights: 'Tous droits réservés.',
    howBuilt: 'Comment ce site est construit',
    backToTop: 'Retour en haut',
  },

  hero: {
    headline: ['Architecture et', 'Performance.'],
    badge: 'Développeur Fullstack',
    intro:
      'Je transforme des besoins métiers complexes en produits fluides, fiables et orientés croissance. Mon travail associe architecture logicielle, interface utilisateur et performance pour livrer des expériences qui inspirent confiance.',
    viewProjects: 'Voir les projets',
    downloadCv: 'Télécharger le CV',
    portraitAlt: 'Portrait de Rommy',
  },

  homeServices: {
    eyebrow: 'Services',
    title: 'Trois offres, un seul objectif : remplacer ce qui vous ralentit.',
    intro:
      'Je ne fais pas tout. Je conçois des outils métier qui remplacent les tableurs, les process manuels et les logiciels qui ne se parlent pas.',
    link: 'Offres, tarifs et méthode',
    cards: [
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
    ],
  },

  techStack: {
    eyebrow: 'Stack technique',
    title: "Peu d'outils, maîtrisés en profondeur plutôt qu'empilés.",
    intro:
      "Chaque technologie a sa place dans la chaîne : l'interface, la logique métier, les données et la livraison. Je choisis ce qui reste maintenable dans cinq ans, pas ce qui est à la mode.",
    learningLabel: 'En veille',
    learningText: "J'apprends en continu. En ce moment, j'explore :",
    themes: [
      {
        label: 'Frontend',
        alt: 'Écran affichant une interface web minimaliste, en noir et blanc',
        description: 'Des interfaces rapides, accessibles et faciles à maintenir.',
      },
      {
        label: 'Backend',
        alt: 'Baies de serveurs reliées entre elles, en noir et blanc',
        description: 'Des APIs robustes, sécurisées et bien structurées.',
      },
      {
        label: 'Données',
        alt: 'Modules de pierre empilés et reliés, en noir et blanc',
        description: 'Une modélisation rigoureuse et des requêtes optimisées.',
      },
      {
        label: 'Livraison',
        alt: 'Portiques alignés en perspective le long d’une chaîne, en noir et blanc',
        description: 'Du commit à la production, testé et sans friction.',
      },
    ],
  },

  featured: {
    eyebrow: 'Réalisations',
    title: 'Projets en vedette',
    allProjects: 'Tous les projets',
    problem: 'Problème',
    outcome: 'Résultat',
    stack: 'Stack',
    caseStudy: 'Étude de cas',
    live: 'Live',
    seeAll: 'Voir tous les projets',
  },

  about: {
    curtainEyebrow: 'À propos',
    curtainTitle: 'Je construis en coulisses',
    stageLine1: 'pour que vos outils',
    stageLine2: 'fassent avancer vos équipes.',
    portraitAlt: 'Portrait de Ny Aina Rommy Ramaromilanto',
    eyebrow: 'Qui je suis',
    lead: "Développeur fullstack à Antananarivo, je conçois des applications métier là où l'erreur coûte cher : état civil, finances publiques, données sensibles.",
    quote: [
      'Je préfère un code que votre équipe comprend à deux heures du matin, quand la production tombe, à un code qui impressionne.',
      "Je pose les questions qui dérangent avant d'écrire la première ligne, parce qu'un logiciel ne vaut que par les décisions qu'il rend possibles.",
    ],
    pathLabel: 'Parcours',
    timeline: [
      {
        period: '2026 · Jan. — Mars',
        place: "Ministère de l'Intérieur et de la Décentralisation",
        role: 'Développeur web · Stage',
        description:
          "Une application de saisie rétroactive des actes de naissance. Symfony 7 et API Platform côté serveur, React et TypeScript côté interface, des API sécurisées pour des données d'état civil sensibles.",
      },
      {
        period: '2026 · Jan. — Mars',
        place: 'Direction Générale du Budget et des Finances',
        role: 'Développeur web · Stage',
        description:
          'La refonte du portail public : architecture API-first en Laravel 11 et Vue 3, administration sécurisée par Sanctum, organigramme interactif, textes réglementaires et transparence budgétaire.',
      },
      {
        period: '2022 — 2025',
        place: "École Supérieure Polytechnique d'Antananarivo",
        role: 'Licence · Électronique et informatique appliquée',
        description:
          "Systèmes embarqués, électronique et logiciel : l'habitude de comprendre une machine jusqu'au bout avant de lui confier quoi que ce soit.",
      },
    ],
    methodLabel: 'Méthode',
    principles: [
      { label: 'Lisible', text: 'Un code typé, testé et relu, que la prochaine personne reprend sans moi.' },
      { label: 'Évident', text: "Une interface qui se passe de mode d'emploi." },
      { label: 'Itératif', text: 'Livrer petit, souvent, et toujours solide.' },
      { label: 'Documenté', text: "Ce qui n'est pas écrit finit toujours par se perdre." },
    ],
    offscreenLabel: 'Hors écran',
    interests: ['Musique', 'Jeux vidéo', 'Basketball', 'Voyages'],
    ctaLead: 'Un projet en tête ?',
    ctaStrong: 'Parlons-en.',
    contactCta: 'Me contacter',
  },

  /* Appels à l'action répétés en bas des pages. */
  cta: {
    contact: 'Me contacter',
    email: 'E-mail',
    offers: 'Offres et tarifs',
  },

  projects: {
    title: 'Projets',
    intro:
      "Des études de cas qui partent d'un problème, montrent la solution et disent ce qui est vérifiable : démo, code, tests, ou ce qui reste confidentiel.",
    filterAria: 'Filtrer les projets',
    filters: { all: 'Tous', demo: 'Démo en ligne', code: 'Code public', stage: 'Stage' },
    ctaTitle: 'Vous avez un projet en tête ?',
    ctaAccent: 'Parlons-en.',
    ctaText: 'Je suis disponible pour de nouvelles missions.',
  },

  projectLabels: {
    access: {
      'demo+code': 'Démo + code',
      code: 'Code public',
      'site-public': 'Site public',
      confidentiel: 'Confidentiel',
    },
    accessDescriptions: {
      'demo+code': 'Code public et démo en ligne',
      code: 'Code public, pas de démo en ligne',
      'site-public': 'Code confidentiel, site public en ligne',
      confidentiel: 'Code et application confidentiels',
    },
    context: {
      personnel: 'Projet personnel',
      stage: 'Stage',
      académique: 'Académique',
    },
  },

  project: {
    draft: 'Brouillon : {count} élément(s) à compléter. Page masquée en production.',
    allProjects: 'Tous les projets',
    crumb: 'Projets',
    viewCode: 'Voir le code',
    viewDemo: 'Voir la démo',
    confidentialCode: 'Code source confidentiel',
    coverAlt: 'Capture de {title}',
    factsLabel: 'Fiche projet',
    facts: {
      period: 'Période',
      context: 'Contexte',
      team: 'Équipe',
      access: 'Accès',
      hosting: 'Hébergement',
      role: 'Rôle',
      stack: 'Stack',
    },
    tocLabel: 'Sommaire',
    otherProjects: 'Autres projets',
    prev: '← Projet précédent',
    next: 'Projet suivant →',
    blocks: {
      demoAccount: 'Compte de démo',
      email: 'E-mail',
      password: 'Mot de passe',
      forWho: 'Pour qui',
      problem: 'Problème',
      outcome: 'Résultat',
      source: 'Source',
      keyDecision: 'Décision clé',
      showTechDetails: 'Afficher les détails techniques',
      choice: 'Choix',
      alternatives: 'Alternatives écartées',
      reason: 'Raison',
      contactTitle: 'Un besoin similaire ?',
      contactAccent: 'Parlons-en.',
      contactText: 'Décrivez votre projet via le formulaire, WhatsApp ou e-mail.',
    },
    gallery: {
      enlarge: 'Agrandir : {alt}',
      dialog: 'Captures du projet {title}',
      close: 'Fermer',
      prev: 'Capture précédente',
      next: 'Capture suivante',
    },
  },

  skills: {
    title: 'Compétences',
    intro: 'Chaque compétence renvoie au projet qui la prouve, ou est marquée « En apprentissage ».',
    boardTitle: 'Par domaine, avec leurs preuves',
    domainsAria: 'Domaines',
    languagesLabel: 'Langues',
    cefrTitle: 'Niveau {level} du Cadre européen commun de référence pour les langues',
    ctaTitle: 'Un projet à construire ?',
    ctaAccent: 'Parlons-en.',
    card: {
      aria: '{name}, niveau {level} : voir le détail',
      relatedAria: 'Projets liés à {name}',
      noProject: 'Pas encore de projet livré.',
      cursorView: 'Voir',
      cursorOpen: 'Ouvrir',
    },
    panel: {
      close: 'Fermer le détail',
      cursorClose: 'Fermer',
      cursorOpen: 'Ouvrir',
      builtWith: "Ce que j'ai construit avec",
      stageSuffix: ' · stage, code confidentiel',
      caseStudy: 'Étude de cas',
      code: 'Code',
      noProject: 'Pas encore de projet livré avec cette compétence.',
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Parlons-en.',
    intro:
      'Une mission freelance, une collaboration ou un poste ? Décrivez votre besoin, je vous réponds personnellement sous 24 h.',
    available: 'Disponible pour de nouveaux projets',
    reachTitle: 'Me joindre',
    channels: {
      email: 'E-mail',
      emailNote: 'Réponse sous 48 h ouvrées',
      whatsappNote: 'Échange rapide',
      location: 'Localisation',
      locationNote: 'UTC+3 · Remote',
    },
    note: {
      before:
        'Pour un échange rapide, WhatsApp. Pour un brief détaillé, un cahier des charges ou des pièces jointes, préférez l\'',
      link: 'e-mail',
      after: '.',
    },
  },

  contactForm: {
    subjectLegend: 'Objet',
    subjects: {
      freelance: 'Projet freelance',
      collaboration: 'Collaboration',
      job: "Opportunité d'emploi",
      other: 'Autre',
    },
    name: 'Nom complet',
    namePlaceholder: 'Jean Rakoto',
    email: 'E-mail',
    emailPlaceholder: 'vous@exemple.com',
    message: 'Message',
    messagePlaceholder: 'Décrivez votre projet, vos délais, votre budget…',
    successTitle: 'Message reçu.',
    successBefore: "Merci, je reviens vers vous sous 24 h. Une confirmation vient d'être envoyée à ",
    successAfter: '.',
    another: 'Envoyer un autre message',
    errorBefore: "L'envoi a échoué. Réessayez, ou écrivez-moi directement à ",
    sending: 'Envoi…',
    submit: 'Envoyer le message',
    privacy: 'Vos données servent uniquement à vous répondre et ne sont jamais partagées.',
  },

  briefForm: {
    name: 'Nom et organisation',
    namePlaceholder: 'Jean Rakoto, Centre Fanilo',
    email: 'E-mail',
    emailPlaceholder: 'vous@exemple.com',
    activity: 'Activité en une phrase',
    activityPlaceholder: 'Centre de formation, 300 apprenants par an',
    problem: 'Problème actuel : ce qui vous fait perdre du temps',
    problemPlaceholder: 'Les inscriptions sont saisies dans trois fichiers Excel, les relances se font à la main…',
    multiple: ' · plusieurs choix possibles',
    tools: { legend: 'Outils utilisés aujourd’hui', options: ['Excel', 'Papier', 'Autre'] },
    users: { legend: 'Nombre d’utilisateurs prévus', options: ['1 à 5', '6 à 20', '21 à 50', 'Plus de 50'] },
    deadline: {
      legend: 'Délai souhaité',
      options: ['Moins d’1 mois', '1 à 3 mois', 'Plus de 3 mois', 'Flexible'],
    },
    budgetLegend: 'Budget',
    channel: {
      legend: 'Moyen de contact préféré',
      options: { whatsapp: 'WhatsApp', email: 'E-mail', call: 'Appel' },
    },
    phone: { whatsapp: 'Numéro WhatsApp', call: 'Numéro de téléphone' },
    successTitle: 'Brief reçu.',
    /* {channel} : « par whatsapp », vide si aucun moyen choisi. */
    successBefore:
      'Merci. Je l’étudie et je reviens vers vous{channel} avec les questions de cadrage. Une confirmation vient d’être envoyée à ',
    successChannel: ' par {channel}',
    successAfter: '.',
    another: 'Envoyer un autre brief',
    errorBefore: 'L’envoi a échoué. Réessayez, ou envoyez votre brief à ',
    sending: 'Envoi…',
    submit: 'Envoyer mon brief',
    note: 'Gratuit et sans engagement. Vos informations servent uniquement à préparer le devis.',
    /* Libellés du message reçu par e-mail. */
    message: {
      /* Entre le libellé et la valeur (« Budget : … » en français). */
      separator: ' : ',
      activity: 'Activité',
      problem: 'Problème actuel',
      tools: 'Outils actuels',
      users: 'Utilisateurs prévus',
      deadline: 'Délai souhaité',
      budget: 'Budget',
      channel: 'Contact préféré',
      phone: 'Téléphone',
    },
  },

  services: {
    draft:
      'Brouillon : {count} mention(s) à confirmer ou compléter dans src/data/services.ts. Les lignes « À COMPLÉTER » sont masquées en production.',
    eyebrow: 'Services',
    region: 'Madagascar · International',
    title: 'Travaillons ensemble.',
    lead: 'Je développe des applications web sur mesure qui remplacent les fichiers Excel, les cahiers et les échanges par message : suivi des données, tableaux de bord, exports PDF et Excel, comptes avec rôles.',
    sub: 'Cette page indique ce que je livre, à quel prix, comment un projet se déroule et comment le paiement s’organise.',
    ctaBrief: 'Décrire mon projet',
    ctaPricing: 'Voir les tarifs',
    tocAria: 'Sommaire de la page',
    tocLabel: 'Sommaire',
    sections: {
      offers: { anchor: 'offres', label: 'Ce que je livre', title: 'Ce que je livre.' },
      pricing: { anchor: 'tarifs', label: 'Tarifs', title: 'Tarifs indicatifs.' },
      remote: { anchor: 'distance', label: 'À distance', title: 'Travailler à distance.' },
      process: { anchor: 'deroule', label: 'Méthode', title: 'Comment se déroule un projet.' },
      payment: { anchor: 'paiement', label: 'Paiement', title: 'Paiement.' },
      scope: {
        anchor: 'engagements',
        label: 'Engagements',
        title: 'Périmètre, modifications et propriété du code.',
      },
      after: { anchor: 'apres', label: 'Après la livraison', title: 'Après la livraison.' },
      communication: { anchor: 'communication', label: 'Communication', title: 'Communication.' },
      faq: { anchor: 'faq', label: 'Questions', title: 'Questions fréquentes.' },
      brief: { anchor: 'brief', label: 'Brief', title: 'Parlons de votre projet.' },
    },
    offer: {
      anchor: 'offre',
      forWho: 'Pour qui',
      problem: 'Le problème',
      included: 'Ce qui est inclus',
      billing: 'Mode de facturation',
      deliverables: 'Ce que vous recevez',
      price: 'Prix indicatif',
      duration: 'Délai indicatif',
      refsOne: 'Réalisation comparable',
      refsMany: 'Réalisations comparables',
    },
    pricingHead: ['Offre', 'Prix indicatif', 'Délai indicatif'],
    howPriceSet: 'Comment le prix est fixé',
    /* Déroulé : libellé lu par les lecteurs d'écran devant chaque étape, et intitulé du résultat. */
    workStep: { step: 'Étape {n} : ', outcome: 'Vous obtenez' },
    expectations: 'Ce que j’attends de vous',
    scheduleLabel: 'Échéancier',
    scheduleHead: ['Montant du projet', 'Échéancier'],
    methodsLabel: 'Moyens de paiement',
    methodsHead: ['Clients', 'Moyens acceptés'],
    channelsLabel: 'Canaux',
    video: 'visioconférence sur demande.',
    directContact: 'Contact direct',
    legalLabel: 'Informations légales',
  },

  notFound: {
    eyebrow: 'Erreur 404',
    title: 'Page introuvable.',
    text: 'Cette page n’existe pas ou a été déplacée.',
    home: 'Retour à l’accueil',
    projects: 'Voir les projets',
  },
};

export type Dictionary = typeof fr;
