/**
 * route.ts — Route API POST /api/contact
 *
 * Traitement complet du formulaire de contact :
 * 1. Validation stricte côté serveur (indépendante du client)
 * 2. Rate limiting par IP (3 req/h, in-memory)
 * 3. Sanitization HTML des inputs
 * 4. Envoi d'emails via Resend (notification + confirmation)
 * 5. Gestion d'erreurs sécurisée (pas de stack trace exposée)
 *
 * Le champ `locale` (fr | en, français par défaut) fixe la langue des messages d'erreur et de
 * l'e-mail de confirmation. La notification envoyée à Rommy reste en français.
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/sanitize';
import { buildNotificationEmail, buildConfirmationEmail } from '@/lib/email-templates';
import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/i18n/config';

/* ─── Configuration ─────────────────────────────────────── */

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'ram.rommynya@gmail.com';
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME ?? 'Rommy - Portfolio';
const EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS ?? 'contact@rommy.dev';
const EMAIL_FROM = `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`;

/** Sujets autorisés (clés envoyées par les formulaires) et leur libellé dans chaque langue. */
const SUBJECTS = {
  freelance: { fr: 'Projet freelance', en: 'Freelance project' },
  collaboration: { fr: 'Collaboration', en: 'Collaboration' },
  job: { fr: 'Opportunité d\'emploi', en: 'Job opportunity' },
  other: { fr: 'Autre', en: 'Other' },
  quote: { fr: 'Demande de devis', en: 'Quote request' }, // brief envoyé depuis /services
} as const satisfies Record<string, Record<Locale, string>>;
type SubjectKey = keyof typeof SUBJECTS;
const isSubject = (value: string): value is SubjectKey => Object.hasOwn(SUBJECTS, value);
const LOCALES_LIST = 'fr, en';

/* ─── Messages renvoyés au visiteur ─────────────────────── */

const MESSAGES = {
  fr: {
    body: 'Le corps de la requête doit être un objet JSON.',
    extraFields: (fields: string) => `Champ(s) non autorisé(s) : ${fields}`,
    nameRequired: 'Le nom est requis.',
    nameShort: 'Le nom doit contenir au moins 2 caractères.',
    nameLong: 'Le nom ne peut pas dépasser 100 caractères.',
    emailRequired: 'L\'email est requis.',
    emailLong: 'L\'email ne peut pas dépasser 254 caractères.',
    emailInvalid: 'Le format de l\'email est invalide.',
    messageRequired: 'Le message est requis.',
    messageShort: 'Le message doit contenir au moins 10 caractères.',
    messageLong: (max: number) => `Le message ne peut pas dépasser ${max} caractères.`,
    subjectType: 'Le sujet doit être une chaîne de caractères.',
    subjectInvalid: (values: string) => `Sujet invalide. Valeurs acceptées : ${values}`,
    rateLimited: 'Trop de requêtes. Veuillez réessayer plus tard.',
    invalidJson: 'Le corps de la requête doit être du JSON valide.',
    invalidData: 'Données invalides.',
    notConfigured: 'Le service d\'envoi d\'email n\'est pas configuré.',
    sendFailed: 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
    success: 'Message envoyé avec succès.',
    unexpected: 'Une erreur inattendue est survenue. Veuillez réessayer.',
    confirmationSubject: 'Votre message a bien été reçu — Rommy',
  },
  en: {
    body: 'The request body must be a JSON object.',
    extraFields: (fields: string) => `Field(s) not allowed: ${fields}`,
    nameRequired: 'Name is required.',
    nameShort: 'Name must be at least 2 characters long.',
    nameLong: 'Name cannot exceed 100 characters.',
    emailRequired: 'Email is required.',
    emailLong: 'Email cannot exceed 254 characters.',
    emailInvalid: 'Email format is invalid.',
    messageRequired: 'Message is required.',
    messageShort: 'Message must be at least 10 characters long.',
    messageLong: (max: number) => `Message cannot exceed ${max} characters.`,
    subjectType: 'Subject must be a string.',
    subjectInvalid: (values: string) => `Invalid subject. Accepted values: ${values}`,
    rateLimited: 'Too many requests. Please try again later.',
    invalidJson: 'The request body must be valid JSON.',
    invalidData: 'Invalid data.',
    notConfigured: 'The email service is not configured.',
    sendFailed: 'Your message could not be sent. Please try again.',
    success: 'Message sent successfully.',
    unexpected: 'An unexpected error occurred. Please try again.',
    confirmationSubject: 'Your message has been received — Rommy',
  },
} satisfies Record<Locale, unknown>;
type Messages = (typeof MESSAGES)[Locale];

/** Langue demandée par le formulaire ; lue avant la validation pour traduire les erreurs. */
const localeOf = (body: unknown): Locale => {
  const value = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).locale : undefined;
  return typeof value === 'string' && hasLocale(value) ? value : DEFAULT_LOCALE;
};

/** Le brief de /services est plus long qu'un simple message (le formulaire de contact reste à 500). */
const MAX_MESSAGE_LENGTH = 2000;

/** Champs autorisés dans le body (whitelist stricte) */
const ALLOWED_FIELDS = new Set(['name', 'email', 'message', 'subject', 'locale']);

/* ─── Validation ────────────────────────────────────────── */

/**
 * Regex de validation email — RFC 5322 simplifiée.
 * Couvre la grande majorité des adresses valides sans être
 * excessivement permissive.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

interface ValidationError {
  field: string;
  message: string;
}

interface ValidatedData {
  name: string;
  email: string;
  message: string;
  subject: SubjectKey | '';
  locale: Locale;
}

/**
 * Valide et nettoie les données du formulaire.
 * Retourne soit les données validées, soit un tableau d'erreurs.
 */
function validateContactData(
  body: unknown,
  t: Messages,
): { data: ValidatedData } | { errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  // Vérifier que le body est un objet
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { errors: [{ field: 'body', message: t.body }] };
  }

  const obj = body as Record<string, unknown>;

  // Vérifier qu'il n'y a pas de champs supplémentaires (protection contre l'injection)
  const extraFields = Object.keys(obj).filter((key) => !ALLOWED_FIELDS.has(key));
  if (extraFields.length > 0) {
    errors.push({
      field: 'body',
      message: t.extraFields(extraFields.join(', ')),
    });
  }

  // ── name ──
  if (typeof obj.name !== 'string' || obj.name.trim().length === 0) {
    errors.push({ field: 'name', message: t.nameRequired });
  } else {
    const name = obj.name.trim();
    if (name.length < 2) {
      errors.push({ field: 'name', message: t.nameShort });
    } else if (name.length > 100) {
      errors.push({ field: 'name', message: t.nameLong });
    }
  }

  // ── email ──
  if (typeof obj.email !== 'string' || obj.email.trim().length === 0) {
    errors.push({ field: 'email', message: t.emailRequired });
  } else {
    const email = obj.email.trim();
    if (email.length > 254) {
      errors.push({ field: 'email', message: t.emailLong });
    } else if (!EMAIL_REGEX.test(email)) {
      errors.push({ field: 'email', message: t.emailInvalid });
    }
  }

  // ── message ──
  if (typeof obj.message !== 'string' || obj.message.trim().length === 0) {
    errors.push({ field: 'message', message: t.messageRequired });
  } else {
    const message = obj.message.trim();
    if (message.length < 10) {
      errors.push({ field: 'message', message: t.messageShort });
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      errors.push({ field: 'message', message: t.messageLong(MAX_MESSAGE_LENGTH) });
    }
  }

  // ── subject (optionnel) ──
  if (obj.subject !== undefined && obj.subject !== '') {
    if (typeof obj.subject !== 'string') {
      errors.push({ field: 'subject', message: t.subjectType });
    } else if (!isSubject(obj.subject)) {
      errors.push({
        field: 'subject',
        message: t.subjectInvalid(Object.keys(SUBJECTS).join(', ')),
      });
    }
  }

  // ── locale (optionnelle) ──
  if (obj.locale !== undefined && (typeof obj.locale !== 'string' || !hasLocale(obj.locale))) {
    errors.push({ field: 'locale', message: `locale: ${LOCALES_LIST}` });
  }

  if (errors.length > 0) {
    return { errors };
  }

  // Données validées et nettoyées
  return {
    data: {
      name: (obj.name as string).trim(),
      email: (obj.email as string).trim().toLowerCase(),
      message: (obj.message as string).trim(),
      subject: typeof obj.subject === 'string' && isSubject(obj.subject) ? obj.subject : '',
      locale: typeof obj.locale === 'string' && hasLocale(obj.locale) ? obj.locale : DEFAULT_LOCALE,
    },
  };
}

/* ─── Formatage date ────────────────────────────────────── */

/**
 * Formate une date en français (pour la notification envoyée à Rommy).
 * Exemple : "2 juillet 2026 à 23:45"
 */
function formatDateFR(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Indian/Antananarivo', // UTC+3
  });
}

/* ─── Route Handler ─────────────────────────────────────── */

export async function POST(request: NextRequest) {
  /* Langue des messages : celle du formulaire dès que le JSON est lu, le français avant. */
  let t: Messages = MESSAGES[DEFAULT_LOCALE];
  try {
    // ── 1. Parser le body JSON ──
    let body: unknown;
    let invalidJson = false;
    try {
      body = await request.json();
      t = MESSAGES[localeOf(body)];
    } catch {
      invalidJson = true;
    }

    // ── 2. Rate limiting ──
    const clientIp = getClientIp(request.headers);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: t.rateLimited,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfter ?? 3600),
            'X-RateLimit-Remaining': '0',
          },
        },
      );
    }

    if (invalidJson) {
      return NextResponse.json({ error: t.invalidJson }, { status: 400 });
    }

    // ── 3. Validation ──
    const result = validateContactData(body, t);

    if ('errors' in result) {
      return NextResponse.json(
        {
          error: t.invalidData,
          details: result.errors,
        },
        { status: 400 },
      );
    }

    const { data } = result;

    // ── 4. Préparer les données pour les templates ──
    const now = new Date();
    /* Notification en français pour Rommy ; confirmation dans la langue du visiteur. */
    const emailData = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      message: escapeHtml(data.message),
      subject: data.subject ? SUBJECTS[data.subject].fr : '',
      date: formatDateFR(now),
      ip: escapeHtml(clientIp),
      locale: data.locale,
    };

    // ── 5. Envoi des emails via Resend ──
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[Contact API] RESEND_API_KEY is not configured.');
      return NextResponse.json(
        { error: t.notConfigured },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    // Email de notification → Rommy
    const { error: notifError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      replyTo: data.email, // Email non-échappé pour que le replyTo fonctionne
      subject: `[Portfolio] ${emailData.subject || 'Nouveau message'}${data.locale === 'fr' ? '' : ` (${data.locale.toUpperCase()})`} — ${data.name}`,
      html: buildNotificationEmail(emailData),
    });

    if (notifError) {
      console.error('[Contact API] Resend notification error:', notifError.message);
      return NextResponse.json(
        { error: t.sendFailed },
        { status: 500 },
      );
    }

    // Email de confirmation → Visiteur
    const { error: confirmError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: data.email, // Email non-échappé
      subject: t.confirmationSubject,
      html: buildConfirmationEmail({
        name: emailData.name,
        subject: data.subject ? SUBJECTS[data.subject][data.locale] : '',
        locale: data.locale,
      }),
    });

    if (confirmError) {
      // L'email de notification a été envoyé — on log l'erreur
      // mais on ne fait pas échouer la requête pour le visiteur
      console.error('[Contact API] Resend confirmation error:', confirmError.message);
    }

    // ── 6. Réponse succès ──
    return NextResponse.json(
      { message: t.success },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      },
    );
  } catch (error) {
    // Ne jamais exposer les détails internes de l'erreur
    console.error('[Contact API] Unexpected error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: t.unexpected },
      { status: 500 },
    );
  }
}
