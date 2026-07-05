/**
 * sanitize.ts — Échappement HTML pour prévenir les injections XSS
 * dans les templates email.
 *
 * Échappe les 5 caractères dangereux en HTML :
 * & → &amp;   < → &lt;   > → &gt;   " → &quot;   ' → &#39;
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_ESCAPE_REGEX = /[&<>"']/g;

/**
 * Échappe les caractères HTML dangereux d'une chaîne.
 * Utilisé avant toute injection de contenu utilisateur dans un template HTML email.
 */
export function escapeHtml(input: string): string {
  return input.replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP[char] ?? char);
}
