/*
 * English content of the /services page (same exports and types as services.ts).
 * Prices are in US dollars, converted from the ariary rates at about 4,600 Ar to $1
 * and rounded; the day rate matches the $12–$20 per hour benchmark.
 * Draft markers work as in services.ts (see src/lib/draft.tsx).
 */

import type { Fact, Offer, WorkStep } from './services';

export const OFFERS: Offer[] = [
  {
    id: 'gestion',
    label: 'Business application',
    title: 'Custom business application',
    forWho:
      'Small businesses, nonprofits, training centers and firms that manage clients, orders, enrollments or inventory with Excel or paper.',
    problem: 'Double data entry, calculation errors, no overview, history impossible to find.',
    deliverables: [
      'an online web application with 5 to 8 screens',
      'user accounts with roles (admin, user)',
      'data entry, editing and search',
      'PDF and Excel exports and a tracking dashboard',
      'deployment, a short user guide and a 1-hour onboarding session by video call',
    ],
    duration: '5 to 8 weeks',
    price: '$1,100 to $2,000',
    priceNote: 'The low end of the range covers the minimum scope described above.',
    references: [
      { slug: 'tontitrack', note: 'contributions, debts, penalties, exports' },
      { slug: 'workspace-app', note: 'roles, API, tests' },
    ],
  },
  {
    id: 'tableau-de-bord',
    label: 'Data',
    title: 'Dashboard and data collection',
    forWho:
      'Organizations that collect responses (surveys, forms) or track indicators in spreadsheets.',
    deliverables: [
      'an online data collection form',
      'a structured database',
      'a dashboard with indicators and charts',
      'a multi-sheet Excel export',
      'role-based access',
    ],
    duration: '3 to 5 weeks',
    price: '$650 to $1,300',
    priceNote: 'The low end of the range covers the minimum scope described above.',
    references: [
      {
        slug: 'campuspulse',
        note: '9 topics, over 60 questions, admin dashboard, Excel export',
      },
    ],
  },
  {
    id: 'api',
    label: 'APIs and integrations',
    title: 'APIs, integrations and fixes',
    forWho:
      'Companies and agencies that already have an application and need a REST API, a connection between two tools, a fix or an extra module (Laravel, Symfony, Node.js, React, Vue).',
    billing: 'Hourly or daily rate, or a fixed price after review.',
    duration: 'depends on the engagement',
    price: '$96 to $160 per day',
    priceNote: 'That is $12 to $20 per hour · half-day from $48 · minimum engagement: half a day',
    references: [
      { slug: 'workspace-app', note: 'over 30 routes, 22 integration tests' },
    ],
  },
  {
    id: 'maintenance',
    label: 'Add-on',
    title: 'Monthly maintenance',
    body: 'Monitoring, backups, security updates and fixes for up to 3 hours a month.',
    duration: 'ongoing',
    price: 'from $45 per month',
    priceNote: 'Hosting and domain name billed separately, in your name.',
    references: [],
  },
];

export const PRICING_INTRO =
  'Indicative prices, negotiable. They are the same for all my clients, in Madagascar and abroad, and they are not set in stone: tell me your budget and we’ll work it out together.';

export const PRICING_NOTES = [
  'The low end of each range covers the minimum scope described in the offer; the high end covers a broader scope (more screens, more integrations or a tighter deadline).',
  'The final quote reflects the estimated number of days, the day rate and a 20% buffer for the unexpected.',
  'If your budget is tighter, I’ll adjust the scope, the timeline or the payment schedule rather than cut corners on quality.',
  'Quotes are written and free. Anything outside the signed scope gets a priced change order before any work starts.',
  'Prices are in US dollars, converted from my ariary rates (about 4,600 Ar to $1). Clients in Madagascar can pay in ariary.',
  'No VAT charged: the service provider is not VAT-registered.',
];

export const REMOTE_INTRO =
  'I work remotely with clients in Madagascar and abroad, at the same prices and on the same terms.';

export const REMOTE: Fact[] = [
  {
    label: 'Time zone',
    text: 'UTC+3 (East Africa Time), no daylight saving. 1 to 2 hours ahead of Paris, 2 to 3 hours ahead of London, 7 to 8 hours ahead of New York.',
  },
  {
    label: 'Availability',
    text: 'Monday to Friday, 8 a.m. to 5 p.m. (UTC+3).',
  },
  {
    label: 'Languages',
    text: 'French: fluent.\nEnglish: professional written English; calls are possible, at a slower pace.',
  },
  {
    label: 'Payment',
    text: 'Through a freelance platform (with payment protection) or by invoice, with a deposit. International bank fees are paid by the client.',
  },
];

/* ── How a project runs ── */
export const WORK_STEPS: WorkStep[] = [
  {
    title: 'Discovery',
    summary:
      'A free 30-minute call or message exchange: your business, your current tools, the problem to solve.',
    outcome: 'A first idea of the scope.',
  },
  {
    title: 'Scoping and quote',
    summary: 'List of screens and features, scope, timeline, price.',
    outcome: 'A written quote within 3 business days.',
  },
  {
    title: 'Kickoff',
    summary: 'You sign the quote and pay the deposit.',
    outcome: 'A demo schedule.',
  },
  {
    title: 'Development',
    summary: 'Delivered in stages, with a demo every 1 to 2 weeks.',
    outcome: 'A testable online version from the very first stage.',
  },
  {
    title: 'Acceptance testing',
    summary: 'You test the application and report what needs fixing.',
    outcome: 'Fixes within the signed scope.',
  },
  {
    title: 'Delivery',
    summary: 'Go-live, user guide, onboarding.',
    outcome: 'Application live, with code and accounts in your name.',
  },
  {
    title: 'Support',
    summary: 'Bug fixes on the delivered scope for 30 days.',
    outcome: 'A point of contact after go-live.',
  },
];

export const CLIENT_EXPECTATIONS =
  'One point of contact, feedback within 3 business days, samples of your current files and written sign-off at each stage.';

/* ── Payment ── */
export const PAYMENT_SCHEDULE: { amount: string; schedule: string }[] = [
  {
    amount: '$450 and above',
    schedule: '40% upfront, 30% at the mid-project demo, 30% on final approval',
  },
  { amount: 'Under $450', schedule: '50% upfront, 50% on delivery' },
  {
    amount: 'Day-rate engagements',
    schedule: 'Invoiced at the end of the engagement, or weekly for longer engagements',
  },
];

export const PAYMENT_METHODS: { clients: string; methods: string }[] = [
  {
    clients: 'International',
    methods: 'Freelance platform, or international bank transfer against invoice',
  },
  {
    clients: 'Madagascar',
    methods: 'MVola, Orange Money; bank transfer in ariary',
  },
];

export const PAYMENT_NOTES = [
  'The deposit kicks off the work. Code and accounts are handed over once payment is complete.',
  'Payment details are on the invoice, never on this site.',
  'Every payment comes with an invoice.',
  'Late payment: work is paused after 7 days overdue.',
];

/* ── Commitments ── */
export const SCOPE: Fact[] = [
  {
    label: 'Scope',
    text: 'Defined in writing in the quote. Changes requested later are priced before they are made.',
  },
  { label: 'Revisions', text: '2 rounds of revisions per stage are included.' },
  {
    label: 'Ownership',
    text: 'The code and accounts (domain name, hosting, database) are in your name. Code ownership transfers once payment is complete.',
  },
  {
    label: 'Confidentiality',
    text: 'I’m happy to sign an NDA. I never show a client project in my portfolio without written consent.',
  },
];

export const AFTER_DELIVERY: Fact[] = [
  { label: 'Support', text: 'Bug fixes on the delivered scope for 30 days.' },
  { label: 'Maintenance', text: 'Optional: see offer 04, Monthly maintenance.' },
  { label: 'Documentation', text: 'User guide and code repository handed over at delivery.' },
];

/* Channels (WhatsApp, email) come from src/lib/contact.ts. */
export const COMMUNICATION: Fact[] = [
  { label: 'Availability', text: 'Monday to Friday, 8 a.m. to 5 p.m., UTC+3.' },
  { label: 'Response time', text: 'Within 48 business hours.' },
  { label: 'Updates', text: 'A written progress update every week.' },
];

export const FAQ: { question: string; answer: string }[] = [
  {
    question: 'What is the minimum budget?',
    answer:
      'A dashboard starts at around $650. For smaller needs, I offer half-day engagements from $48.',
  },
  {
    question: 'Are your prices negotiable?',
    answer:
      'They are indicative. The quote depends on the scope, the timeline and the length of the engagement. Tell me your budget: I can adjust screens, features, timeline or payment schedule to find something that works for you.',
  },
  {
    question: 'I don’t have a specification. Is that a problem?',
    answer:
      'Not at all. The discovery and scoping steps are there to build it. You get a list of screens and features to approve along with the quote.',
  },
  {
    question: 'Which currencies can I pay in?',
    answer:
      'International clients pay in US dollars or another foreign currency, through a freelance platform or by bank transfer. Clients in Madagascar can pay in ariary by MVola, Orange Money or bank transfer.',
  },
  {
    question: 'Do you work with clients outside Madagascar?',
    answer:
      'Yes, at the same prices and on the same terms. I work on UTC+3, in French and written English, with payment through a freelance platform or by invoice.',
  },
  {
    question: 'Who owns the code?',
    answer:
      'You do, once payment is complete. Generic, non-confidential components that I reuse from one project to the next remain mine.',
  },
  {
    question: 'Who pays for hosting and the domain name?',
    answer:
      'You do, directly with the provider, on an account in your name. I take care of the setup.',
  },
  {
    question: 'What if my needs change along the way?',
    answer: 'The change is priced in writing. You decide whether to go ahead before I start on it.',
  },
  {
    question: 'Do you build brochure websites?',
    answer: 'Only as an add-on to an application.',
  },
  {
    question: 'Is my data protected?',
    answer:
      'It is hosted on accounts in your name, with role-based access. I’m happy to sign an NDA.',
  },
  {
    question: 'What happens after go-live?',
    answer: 'A support period, then optional monthly maintenance if you want it.',
  },
];

export const BRIEF_INTRO = 'Describe what you need in a few lines. I reply within 48 business hours.';

export const BUDGETS: readonly string[] = [
  'Under $650',
  '$650 to $1,100',
  '$1,100 to $2,200',
  'Over $2,200',
  'Not sure yet',
];

export const LEGAL = [
  'Service provider: Ny Aina Rommy Ramaromilanto, Antananarivo, Madagascar.',
];
