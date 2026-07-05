/**
 * email-templates.ts — Templates HTML pour les emails du formulaire de contact.
 *
 * Deux templates :
 * 1. Notification email → Rommy (avec toutes les infos + métadonnées audit)
 * 2. Confirmation email → Visiteur (accusé de réception)
 *
 * Design rules :
 * - Inline styles uniquement (compatibilité clients email)
 * - Tables pour le layout (compatibilité Outlook)
 * - Palette du portfolio : primary bleu marine #1E3A8A, fond clair #F8FAFC
 * - Tous les inputs doivent être pré-sanitisés avec escapeHtml()
 */

/* ─── Types ─────────────────────────────────────────────── */

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  subject: string;
  /** Date formatée en français (ex: "2 juillet 2026 à 23:45") */
  date: string;
  /** Adresse IP du visiteur */
  ip: string;
}

/* ─── Couleurs du design system ─────────────────────────── */

const COLORS = {
  primary: '#1E3A8A',
  primaryLight: '#DBEAFE',
  primaryDark: '#1E2A5E',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  textMuted: '#64748B',
  textSubtle: '#94A3B8',
  success: '#16A34A',
  successLight: '#DCFCE7',
} as const;

/* ─── Template 1 : Notification → Rommy ─────────────────── */

export function buildNotificationEmail(data: ContactEmailData): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.background};font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${COLORS.background};">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card principale -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;width:100%;background-color:${COLORS.surface};border-radius:12px;border:1px solid ${COLORS.border};overflow:hidden;">

          <!-- Header avec accent bar -->
          <tr>
            <td style="background:linear-gradient(135deg,${COLORS.primary},${COLORS.primaryDark});padding:28px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.7);">📬 Nouveau message</p>
                    <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#FFFFFF;line-height:1.3;">${data.subject || 'Message sans sujet'}</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Corps du message -->
          <tr>
            <td style="padding:32px;">

              <!-- Info expéditeur -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:16px;background-color:${COLORS.primaryLight};border-radius:8px;border-left:4px solid ${COLORS.primary};">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${COLORS.textMuted};">Expéditeur</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:${COLORS.text};">${data.name}</p>
                    <p style="margin:4px 0 0;">
                      <a href="mailto:${data.email}" style="font-size:14px;color:${COLORS.primary};text-decoration:none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Sujet -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${COLORS.textMuted};">Sujet</p>
                    <p style="margin:0;font-size:14px;color:${COLORS.text};font-weight:500;">${data.subject || '—'}</p>
                  </td>
                </tr>
              </table>

              <!-- Séparateur -->
              <hr style="border:none;border-top:1px solid ${COLORS.border};margin:0 0 24px;">

              <!-- Message -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${COLORS.textMuted};">Message</p>
                    <div style="padding:16px;background-color:${COLORS.background};border-radius:8px;border:1px solid ${COLORS.border};">
                      <p style="margin:0;font-size:14px;line-height:1.7;color:${COLORS.text};white-space:pre-wrap;word-wrap:break-word;">${data.message}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Bouton répondre -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || 'Votre message')}" style="display:inline-block;padding:12px 28px;background-color:${COLORS.primary};color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
                      ↩ Répondre à ${data.name}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Séparateur -->
              <hr style="border:none;border-top:1px solid ${COLORS.border};margin:0 0 20px;">

              <!-- Métadonnées audit -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${COLORS.textSubtle};">Métadonnées</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:${COLORS.textSubtle};width:100px;">Date</td>
                        <td style="padding:4px 0;font-size:12px;color:${COLORS.textMuted};font-weight:500;">${data.date}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:${COLORS.textSubtle};width:100px;">Adresse IP</td>
                        <td style="padding:4px 0;font-size:12px;color:${COLORS.textMuted};font-family:'Courier New',monospace;">${data.ip}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:${COLORS.textSubtle};width:100px;">Source</td>
                        <td style="padding:4px 0;font-size:12px;color:${COLORS.textMuted};">rommy.dev/contact</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background-color:${COLORS.background};border-top:1px solid ${COLORS.border};">
              <p style="margin:0;font-size:11px;color:${COLORS.textSubtle};text-align:center;">
                Email généré automatiquement depuis le formulaire de contact de rommy.dev
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/* ─── Template 2 : Confirmation → Visiteur ──────────────── */

export function buildConfirmationEmail(data: Pick<ContactEmailData, 'name' | 'subject'>): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message bien reçu !</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.background};font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${COLORS.background};">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card principale -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;width:100%;background-color:${COLORS.surface};border-radius:12px;border:1px solid ${COLORS.border};overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 0;text-align:center;">
              <!-- Icône succès -->
              <div style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;background-color:${COLORS.successLight};border-radius:50%;font-size:28px;margin-bottom:16px;">✓</div>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:${COLORS.text};line-height:1.3;">Message bien reçu !</h1>
              <p style="margin:8px 0 0;font-size:14px;color:${COLORS.textMuted};line-height:1.5;">
                Merci ${data.name}, votre message a été envoyé avec succès.
              </p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding:28px 32px;">

              <!-- Récapitulatif -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:16px;background-color:${COLORS.background};border-radius:8px;border:1px solid ${COLORS.border};">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${COLORS.textSubtle};">Récapitulatif</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:3px 0;font-size:13px;color:${COLORS.textSubtle};width:70px;">Objet</td>
                        <td style="padding:3px 0;font-size:13px;color:${COLORS.text};font-weight:500;">${data.subject || 'Non spécifié'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message de suivi -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:${COLORS.text};">
                      J'ai bien pris connaissance de votre message et je vous répondrai dans les
                      <strong style="color:${COLORS.primary};">24 heures</strong>.
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:${COLORS.text};">
                      Si votre demande est urgente, n'hésitez pas à me contacter directement par email à
                      <a href="mailto:ram.rommynya@gmail.com" style="color:${COLORS.primary};text-decoration:none;font-weight:600;">ram.rommynya@gmail.com</a>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Séparateur -->
              <hr style="border:none;border-top:1px solid ${COLORS.border};margin:0 0 24px;">

              <!-- Signature -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0;font-size:14px;color:${COLORS.text};">À bientôt,</p>
                    <p style="margin:8px 0 0;font-size:16px;font-weight:700;color:${COLORS.primary};">Rommy</p>
                    <p style="margin:2px 0 0;font-size:12px;color:${COLORS.textMuted};">Développeur Fullstack · Antananarivo</p>
                    <p style="margin:4px 0 0;">
                      <a href="https://rommy.dev" style="font-size:12px;color:${COLORS.primary};text-decoration:none;">rommy.dev</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background-color:${COLORS.background};border-top:1px solid ${COLORS.border};">
              <p style="margin:0;font-size:11px;color:${COLORS.textSubtle};text-align:center;line-height:1.5;">
                Cet email est un accusé de réception automatique envoyé depuis
                <a href="https://rommy.dev" style="color:${COLORS.textMuted};text-decoration:none;">rommy.dev</a>.
                <br>Vous recevez cet email car vous avez utilisé le formulaire de contact.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
