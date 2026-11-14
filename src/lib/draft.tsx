/*
 * Mentions de brouillon dans un texte publié :
 * - [À CONFIRMER] / [À CONFIRMER : …] : détail à vérifier ; retiré en production.
 * - [À COMPLÉTER] / [À COMPLÉTER : …] : information manquante ; la ligne est masquée en production.
 * - [valeur] : valeur proposée (ex. [30 jours]) ; affichée sans crochets en production.
 * En développement, tout est surligné pour être repéré avant publication.
 */

export const IS_PROD = process.env.NODE_ENV === 'production';

const MARKER = /\[(?:À CONFIRMER|À COMPLÉTER)[^\]]*\]/g;
const MISSING = /\[À COMPLÉTER[^\]]*\]/;

/** Nombre de mentions restant dans une liste de textes. */
export const countMarkers = (texts: string[]) =>
  texts.reduce((n, t) => n + (t.match(MARKER)?.length ?? 0), 0);

/** Faux en production si une information manque : la ligne ne doit pas être publiée. */
export const isPublishable = (text: string) => !(IS_PROD && MISSING.test(text));

/** Espaces insécables dans les montants : « 5 000 000 Ar », « ≈ 1 000 € », « 20 % ». */
export const nbsp = (text: string) =>
  text.replace(/(\d) (?=\d{3}\b|Ar\b|€|%|\$)/g, '$1 ').replace(/≈ /g, '≈ ');

/** Texte final de production : mentions retirées, valeurs proposées sans crochets. */
export const clean = (text: string) =>
  nbsp(text.replace(/\s*\[(?:À CONFIRMER|À COMPLÉTER)[^\]]*\]/g, '').replace(/\[([^\]]+)\]/g, '$1'));

export function Draft({ text }: { text: string }) {
  if (IS_PROD) return <>{clean(text)}</>;

  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) => {
        if (!part.startsWith('[')) return nbsp(part);
        const inner = part.slice(1, -1);
        if (/^À (CONFIRMER|COMPLÉTER)/.test(inner)) {
          return (
            <mark
              key={i}
              className="mx-0.5 whitespace-nowrap border border-[hsl(var(--warning)/0.4)] bg-[hsl(var(--warning)/0.12)] px-1 font-mono text-[0.7em] text-[hsl(var(--warning))]"
            >
              {inner}
            </mark>
          );
        }
        return (
          <span key={i} className="underline decoration-[hsl(var(--warning))] decoration-dashed underline-offset-4">
            {inner}
          </span>
        );
      })}
    </>
  );
}
