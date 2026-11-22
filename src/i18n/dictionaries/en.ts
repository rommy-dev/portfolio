import type { Dictionary } from './fr';

/* Interface texts in English. Same shape as fr.ts (checked by TypeScript). */

export const en: Dictionary = {
  meta: {
    title: 'Ny Aina Rommy Ramaromilanto — Fullstack Developer',
    description:
      'Fullstack web developer based in Antananarivo, Madagascar. Symfony, Laravel, React, Next.js. Available for remote freelance projects.',
    siteName: 'Ny Aina Rommy Ramaromilanto — Portfolio',
    ogDescription: 'Portfolio of Ny Aina Rommy Ramaromilanto, fullstack developer (React & Symfony).',
    services: {
      title: 'Services',
      description:
        'Custom business applications, dashboards and APIs for small businesses and organizations, delivered remotely. Indicative prices in USD, free written quote, milestone payments, demos at every stage.',
    },
    projects: {
      title: 'Projects',
      description:
        'Case studies: projects with a live demo and public code, and internship projects built for Malagasy public institutions.',
    },
    skills: {
      title: 'Skills',
      description:
        'Backend, frontend, data, testing and deployment skills, each one linked to the project that proves it.',
    },
    contact: {
      title: 'Contact',
      description:
        'Get in touch with Ny Aina Rommy Ramaromilanto, fullstack developer in Antananarivo: freelance projects, collaborations, job opportunities.',
    },
    projectNotFound: 'Project not found',
    notFound: 'Page not found',
  },

  nav: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
  },

  header: {
    homeAria: 'Home',
    contactCta: 'Get in touch',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  languageSwitcher: {
    navAria: 'Site language',
    fr: { short: 'FR', name: 'Français', label: 'Lire en français' },
    en: { short: 'EN', name: 'English', label: 'Read in English' },
  },

  footer: {
    tagline: 'Code that quietly does its job.',
    navAria: 'Footer',
    navHeading: 'Navigate',
    reachHeading: 'Reach me',
    rights: 'All rights reserved.',
    howBuilt: 'How this site is built',
    backToTop: 'Back to top',
  },

  hero: {
    headline: ['Architecture and', 'Performance.'],
    badge: 'Fullstack Developer',
    intro:
      'I turn complex business requirements into smooth, reliable products built to grow with you. My work combines software architecture, user interface and performance to deliver experiences people can trust.',
    viewProjects: 'View projects',
    downloadCv: 'Download resume',
    portraitAlt: 'Portrait of Rommy',
  },

  homeServices: {
    eyebrow: 'Services',
    title: 'Three offers, one goal: replace whatever slows you down.',
    intro:
      'I don’t do everything. I build business tools that replace spreadsheets, manual processes and software that doesn’t talk to each other.',
    link: 'Offers, pricing and process',
    cards: [
      {
        label: 'Business application',
        title: 'Custom management',
        description:
          'Your processes, digitized: workflows, roles, complex forms. Proven at Madagascar’s Ministry of the Interior and its Budget and Finance Directorate.',
        stack: 'Symfony · React · MySQL',
      },
      {
        label: 'Dashboard',
        title: 'From Excel to web',
        description:
          'Your files become a shared, up-to-date and secure application. No more spreadsheet versions bouncing around by email.',
        stack: 'Next.js · Laravel · MySQL',
      },
      {
        label: 'APIs & integrations',
        title: 'Connected tools',
        description:
          'Secure, documented REST APIs, sync with the software you already use, JWT authentication.',
        stack: 'API Platform · PHP · JWT',
      },
    ],
  },

  techStack: {
    eyebrow: 'Tech stack',
    title: 'Few tools, mastered in depth rather than piled up.',
    intro:
      'Every technology has its place in the chain: interface, business logic, data and delivery. I pick what will still be maintainable in five years, not what’s trending.',
    learningLabel: 'On my radar',
    learningText: 'I keep learning. Right now, I’m exploring:',
    themes: [
      {
        label: 'Frontend',
        alt: 'Screen showing a minimalist web interface, in black and white',
        description: 'Fast, accessible interfaces that are easy to maintain.',
      },
      {
        label: 'Backend',
        alt: 'Connected server racks, in black and white',
        description: 'Robust, secure and well-structured APIs.',
      },
      {
        label: 'Data',
        alt: 'Stacked and connected stone modules, in black and white',
        description: 'Rigorous data modeling and optimized queries.',
      },
      {
        label: 'Delivery',
        alt: 'Gantries lined up in perspective along a production line, in black and white',
        description: 'From commit to production, tested and frictionless.',
      },
    ],
  },

  featured: {
    eyebrow: 'Work',
    title: 'Featured projects',
    allProjects: 'All projects',
    problem: 'Problem',
    outcome: 'Outcome',
    stack: 'Stack',
    caseStudy: 'Case study',
    live: 'Live',
    seeAll: 'See all projects',
  },

  about: {
    curtainEyebrow: 'About',
    curtainTitle: 'I build behind the scenes',
    stageLine1: 'so your tools',
    stageLine2: 'move your teams forward.',
    portraitAlt: 'Portrait of Ny Aina Rommy Ramaromilanto',
    eyebrow: 'Who I am',
    lead: 'A fullstack developer in Antananarivo, I build business applications where mistakes are costly: civil registration, public finance, sensitive data.',
    quote: [
      'I’d rather write code your team understands at 2 a.m., when production goes down, than code that just looks impressive.',
      'I ask the uncomfortable questions before writing the first line, because software is only worth the decisions it makes possible.',
    ],
    pathLabel: 'Background',
    timeline: [
      {
        period: '2026 · Jan. — Mar.',
        place: 'Ministry of the Interior and Decentralization (Madagascar)',
        role: 'Web developer · Internship',
        description:
          'An application for back-entering birth certificates. Symfony 7 and API Platform on the server, React and TypeScript on the interface, secure APIs for sensitive civil registration data.',
      },
      {
        period: '2026 · Jan. — Mar.',
        place: 'Directorate General of Budget and Finance (Madagascar)',
        role: 'Web developer · Internship',
        description:
          'A redesign of the public portal: API-first architecture with Laravel 11 and Vue 3, admin area secured with Sanctum, interactive org chart, regulatory texts and budget transparency.',
      },
      {
        period: '2022 — 2025',
        place: 'Higher Polytechnic School of Antananarivo',
        role: 'Bachelor’s degree · Electronics and applied computer science',
        description:
          'Embedded systems, electronics and software: the habit of understanding a machine inside out before trusting it with anything.',
      },
    ],
    methodLabel: 'Approach',
    principles: [
      { label: 'Readable', text: 'Typed, tested and reviewed code that the next person can pick up without me.' },
      { label: 'Obvious', text: 'An interface that needs no user manual.' },
      { label: 'Iterative', text: 'Ship small, ship often, and always ship solid.' },
      { label: 'Documented', text: 'What isn’t written down always ends up lost.' },
    ],
    offscreenLabel: 'Off screen',
    interests: ['Music', 'Video games', 'Basketball', 'Travel'],
    ctaLead: 'Have a project in mind?',
    ctaStrong: 'Let’s talk.',
    contactCta: 'Get in touch',
  },

  cta: {
    contact: 'Get in touch',
    email: 'Email',
    offers: 'Offers and pricing',
  },

  projects: {
    title: 'Projects',
    intro:
      'Case studies that start from a problem, show the solution and state what you can verify: demo, code, tests, or what remains confidential.',
    filterAria: 'Filter projects',
    filters: { all: 'All', demo: 'Live demo', code: 'Public code', stage: 'Internship' },
    ctaTitle: 'Have a project in mind?',
    ctaAccent: 'Let’s talk.',
    ctaText: 'I’m available for new projects.',
  },

  projectLabels: {
    access: {
      'demo+code': 'Demo + code',
      code: 'Public code',
      'site-public': 'Public website',
      confidentiel: 'Confidential',
    },
    accessDescriptions: {
      'demo+code': 'Public code and live demo',
      code: 'Public code, no live demo',
      'site-public': 'Confidential code, public website online',
      confidentiel: 'Confidential code and application',
    },
    context: {
      personnel: 'Personal project',
      stage: 'Internship',
      académique: 'Academic',
    },
  },

  project: {
    draft: 'Draft: {count} item(s) to complete. Page hidden in production.',
    allProjects: 'All projects',
    crumb: 'Projects',
    viewCode: 'View code',
    viewDemo: 'View demo',
    confidentialCode: 'Confidential source code',
    coverAlt: 'Screenshot of {title}',
    factsLabel: 'Project facts',
    facts: {
      period: 'Period',
      context: 'Context',
      team: 'Team',
      access: 'Access',
      hosting: 'Hosting',
      role: 'Role',
      stack: 'Stack',
    },
    tocLabel: 'Contents',
    otherProjects: 'Other projects',
    prev: '← Previous project',
    next: 'Next project →',
    blocks: {
      demoAccount: 'Demo account',
      email: 'Email',
      password: 'Password',
      forWho: 'For',
      problem: 'Problem',
      outcome: 'Outcome',
      source: 'Source',
      keyDecision: 'Key decision',
      showTechDetails: 'Show technical details',
      choice: 'Choice',
      alternatives: 'Alternatives considered',
      reason: 'Reason',
      contactTitle: 'Need something similar?',
      contactAccent: 'Let’s talk.',
      contactText: 'Describe your project through the form, WhatsApp or email.',
    },
    gallery: {
      enlarge: 'Enlarge: {alt}',
      dialog: 'Screenshots of {title}',
      close: 'Close',
      prev: 'Previous screenshot',
      next: 'Next screenshot',
    },
  },

  skills: {
    title: 'Skills',
    intro: 'Every skill links to the project that proves it, or is marked “Learning”.',
    boardTitle: 'By area, with proof',
    domainsAria: 'Areas',
    languagesLabel: 'Languages',
    cefrTitle: '{level} level on the Common European Framework of Reference for Languages',
    ctaTitle: 'Something to build?',
    ctaAccent: 'Let’s talk.',
    card: {
      aria: '{name}, level {level}: see details',
      relatedAria: 'Projects related to {name}',
      noProject: 'No delivered project yet.',
      cursorView: 'View',
      cursorOpen: 'Open',
    },
    panel: {
      close: 'Close details',
      cursorClose: 'Close',
      cursorOpen: 'Open',
      builtWith: 'What I built with it',
      stageSuffix: ' · internship, confidential code',
      caseStudy: 'Case study',
      code: 'Code',
      noProject: 'No delivered project with this skill yet.',
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Let’s talk.',
    intro:
      'A freelance project, a collaboration or a job opening? Tell me what you need and I’ll reply personally within 48 business hours.',
    available: 'Available for new projects',
    reachTitle: 'Reach me',
    channels: {
      email: 'Email',
      emailNote: 'Reply within 48 business hours',
      whatsappNote: 'Quick chat',
      location: 'Location',
      locationNote: 'UTC+3 · Remote',
    },
    note: {
      before:
        'WhatsApp works best for a quick chat. For a detailed brief, a specification or attachments, please use ',
      link: 'email',
      after: '.',
    },
  },

  contactForm: {
    subjectLegend: 'Subject',
    subjects: {
      freelance: 'Freelance project',
      collaboration: 'Collaboration',
      job: 'Job opportunity',
      other: 'Other',
    },
    name: 'Full name',
    namePlaceholder: 'Jane Smith',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    message: 'Message',
    messagePlaceholder: 'Tell me about your project, timeline and budget…',
    successTitle: 'Message received.',
    successBefore: 'Thank you, I’ll get back to you within 48 business hours. A confirmation has been sent to ',
    successAfter: '.',
    another: 'Send another message',
    errorBefore: 'Sending failed. Please try again, or email me directly at ',
    sending: 'Sending…',
    submit: 'Send message',
    privacy: 'Your details are only used to reply to you and are never shared.',
  },

  briefForm: {
    name: 'Name and organization',
    namePlaceholder: 'Jane Smith, Brightside Training',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    activity: 'Your business in one sentence',
    activityPlaceholder: 'Training center, 300 students a year',
    problem: 'Current problem: what wastes your time',
    problemPlaceholder: 'Enrollments are typed into three Excel files and reminders are sent by hand…',
    multiple: ' · select all that apply',
    tools: { legend: 'Tools you use today', options: ['Excel', 'Paper', 'Other'] },
    users: { legend: 'Expected number of users', options: ['1 to 5', '6 to 20', '21 to 50', 'More than 50'] },
    deadline: {
      legend: 'Desired timeline',
      options: ['Under 1 month', '1 to 3 months', 'More than 3 months', 'Flexible'],
    },
    budgetLegend: 'Budget',
    channel: {
      legend: 'Preferred contact method',
      options: { whatsapp: 'WhatsApp', email: 'Email', call: 'Call' },
    },
    phone: { whatsapp: 'WhatsApp number', call: 'Phone number' },
    successTitle: 'Brief received.',
    successBefore:
      'Thank you. I’ll review it and get back to you{channel} with a few scoping questions. A confirmation has been sent to ',
    successChannel: ' by {channel}',
    successAfter: '.',
    another: 'Send another brief',
    errorBefore: 'Sending failed. Please try again, or email your brief to ',
    sending: 'Sending…',
    submit: 'Send my brief',
    note: 'Free and no commitment. Your details are only used to prepare the quote.',
    message: {
      /* Entre le libellé et la valeur (« Budget : … » en français). */
      separator: ': ',
      activity: 'Business',
      problem: 'Current problem',
      tools: 'Current tools',
      users: 'Expected users',
      deadline: 'Desired timeline',
      budget: 'Budget',
      channel: 'Preferred contact',
      phone: 'Phone',
    },
  },

  services: {
    draft:
      'Draft: {count} item(s) to confirm or complete in src/data/services.en.ts. “À COMPLÉTER” lines are hidden in production.',
    eyebrow: 'Services',
    region: 'Remote · Worldwide',
    title: 'Let’s work together.',
    lead: 'I build custom web applications that replace Excel files, notebooks and message threads: data tracking, dashboards, PDF and Excel exports, role-based accounts.',
    sub: 'This page explains what I deliver, at what price, how a project runs and how payment works.',
    ctaBrief: 'Describe my project',
    ctaPricing: 'See pricing',
    tocAria: 'Page contents',
    tocLabel: 'Contents',
    sections: {
      offers: { anchor: 'offers', label: 'What I deliver', title: 'What I deliver.' },
      pricing: { anchor: 'pricing', label: 'Pricing', title: 'Indicative pricing.' },
      remote: { anchor: 'remote', label: 'Remote work', title: 'Working remotely.' },
      process: { anchor: 'process', label: 'Process', title: 'How a project runs.' },
      payment: { anchor: 'payment', label: 'Payment', title: 'Payment.' },
      scope: {
        anchor: 'commitments',
        label: 'Commitments',
        title: 'Scope, changes and code ownership.',
      },
      after: { anchor: 'after-delivery', label: 'After delivery', title: 'After delivery.' },
      communication: { anchor: 'communication', label: 'Communication', title: 'Communication.' },
      faq: { anchor: 'faq', label: 'FAQ', title: 'Frequently asked questions.' },
      brief: { anchor: 'brief', label: 'Brief', title: 'Tell me about your project.' },
    },
    offer: {
      anchor: 'offer',
      forWho: 'Who it’s for',
      problem: 'The problem',
      included: 'What’s included',
      billing: 'Billing',
      deliverables: 'What you get',
      price: 'Indicative price',
      duration: 'Indicative timeline',
      refsOne: 'Comparable project',
      refsMany: 'Comparable projects',
    },
    pricingHead: ['Offer', 'Indicative price', 'Indicative timeline'],
    howPriceSet: 'How the price is set',
    /* Déroulé : libellé lu par les lecteurs d'écran devant chaque étape, et intitulé du résultat. */
    workStep: { step: 'Step {n}: ', outcome: 'You get' },
    expectations: 'What I need from you',
    scheduleLabel: 'Payment schedule',
    scheduleHead: ['Project amount', 'Schedule'],
    methodsLabel: 'Payment methods',
    methodsHead: ['Clients', 'Accepted methods'],
    channelsLabel: 'Channels',
    video: 'video calls on request.',
    directContact: 'Direct contact',
    legalLabel: 'Legal information',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'Page not found.',
    text: 'This page doesn’t exist or has been moved.',
    home: 'Back to home',
    projects: 'View projects',
  },
};
