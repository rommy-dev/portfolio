/**
 * route.ts — Route API POST /api/contact
 *
 * Traitement complet du formulaire de contact :
 * 1. Validation stricte côté serveur (indépendante du client)
 * 2. Rate limiting par IP (3 req/h, in-memory)
 * 3. Sanitization HTML des inputs
 * 4. Envoi d'emails via Resend (notification + confirmation)
 * 5. Gestion d'erreurs sécurisée (pas de stack trace exposée)
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/sanitize';
import { buildNotificationEmail, buildConfirmationEmail } from '@/lib/email-templates';

/* ─── Configuration ─────────────────────────────────────── */

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'ram.rommynya@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM ?? 'Rommy | Portfolio <contact@rommy.dev>';

/** Liste exhaustive des sujets autorisés */
const VALID_SUBJECTS = [
  'Projet freelance',
  'Collaboration',
  'Opportunité d\'emploi',
  'Autre',
] as const;

/** Champs autorisés dans le body (whitelist stricte) */
const ALLOWED_FIELDS = new Set(['name', 'email', 'message', 'subject']);

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
  subject: string;
}

/**
 * Valide et nettoie les données du formulaire.
 * Retourne soit les données validées, soit un tableau d'erreurs.
 */
function validateContactData(body: unknown): { data: ValidatedData } | { errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  // Vérifier que le body est un objet
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { errors: [{ field: 'body', message: 'Le corps de la requête doit être un objet JSON.' }] };
  }

  const obj = body as Record<string, unknown>;

  // Vérifier qu'il n'y a pas de champs supplémentaires (protection contre l'injection)
  const extraFields = Object.keys(obj).filter((key) => !ALLOWED_FIELDS.has(key));
  if (extraFields.length > 0) {
    errors.push({
      field: 'body',
      message: `Champ(s) non autorisé(s) : ${extraFields.join(', ')}`,
    });
  }

  // ── name ──
  if (typeof obj.name !== 'string' || obj.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Le nom est requis.' });
  } else {
    const name = obj.name.trim();
    if (name.length < 2) {
      errors.push({ field: 'name', message: 'Le nom doit contenir au moins 2 caractères.' });
    } else if (name.length > 100) {
      errors.push({ field: 'name', message: 'Le nom ne peut pas dépasser 100 caractères.' });
    }
  }

  // ── email ──
  if (typeof obj.email !== 'string' || obj.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'L\'email est requis.' });
  } else {
    const email = obj.email.trim();
    if (email.length > 254) {
      errors.push({ field: 'email', message: 'L\'email ne peut pas dépasser 254 caractères.' });
    } else if (!EMAIL_REGEX.test(email)) {
      errors.push({ field: 'email', message: 'Le format de l\'email est invalide.' });
    }
  }

  // ── message ──
  if (typeof obj.message !== 'string' || obj.message.trim().length === 0) {
    errors.push({ field: 'message', message: 'Le message est requis.' });
  } else {
    const message = obj.message.trim();
    if (message.length < 10) {
      errors.push({ field: 'message', message: 'Le message doit contenir au moins 10 caractères.' });
    } else if (message.length > 500) {
      errors.push({ field: 'message', message: 'Le message ne peut pas dépasser 500 caractères.' });
    }
  }

  // ── subject (optionnel) ──
  if (obj.subject !== undefined && obj.subject !== '') {
    if (typeof obj.subject !== 'string') {
      errors.push({ field: 'subject', message: 'Le sujet doit être une chaîne de caractères.' });
    } else if (!(VALID_SUBJECTS as readonly string[]).includes(obj.subject)) {
      errors.push({
        field: 'subject',
        message: `Sujet invalide. Valeurs acceptées : ${VALID_SUBJECTS.join(', ')}`,
      });
    }
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
      subject: typeof obj.subject === 'string' && obj.subject !== '' ? obj.subject : '',
    },
  };
}

/* ─── Formatage date ────────────────────────────────────── */

/**
 * Formate une date en français.
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
  try {
    // ── 1. Rate limiting ──
    const clientIp = getClientIp(request.headers);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Trop de requêtes. Veuillez réessayer plus tard.',
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

    // ── 2. Parser le body JSON ──
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Le corps de la requête doit être du JSON valide.' },
        { status: 400 },
      );
    }

    // ── 3. Validation ──
    const result = validateContactData(body);

    if ('errors' in result) {
      return NextResponse.json(
        {
          error: 'Données invalides.',
          details: result.errors,
        },
        { status: 400 },
      );
    }

    const { data } = result;

    // ── 4. Préparer les données pour les templates ──
    const now = new Date();
    const emailData = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      message: escapeHtml(data.message),
      subject: escapeHtml(data.subject),
      date: formatDateFR(now),
      ip: escapeHtml(clientIp),
    };

    // ── 5. Envoi des emails via Resend ──
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[Contact API] RESEND_API_KEY is not configured.');
      return NextResponse.json(
        { error: 'Le service d\'envoi d\'email n\'est pas configuré.' },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    // Email de notification → Rommy
    const { error: notifError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      replyTo: data.email, // Email non-échappé pour que le replyTo fonctionne
      subject: `[Portfolio] ${data.subject || 'Nouveau message'} — ${data.name}`,
      html: buildNotificationEmail(emailData),
    });

    if (notifError) {
      console.error('[Contact API] Resend notification error:', notifError.message);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
        { status: 500 },
      );
    }

    // Email de confirmation → Visiteur
    const { error: confirmError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: data.email, // Email non-échappé
      subject: 'Votre message a bien été reçu — Rommy',
      html: buildConfirmationEmail({
        name: emailData.name,
        subject: emailData.subject,
      }),
    });

    if (confirmError) {
      // L'email de notification a été envoyé — on log l'erreur
      // mais on ne fait pas échouer la requête pour le visiteur
      console.error('[Contact API] Resend confirmation error:', confirmError.message);
    }

    // ── 6. Réponse succès ──
    return NextResponse.json(
      { message: 'Message envoyé avec succès.' },
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
      { error: 'Une erreur inattendue est survenue. Veuillez réessayer.' },
      { status: 500 },
    );
  }
}
