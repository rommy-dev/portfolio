import { NotFoundContent } from '@/components/layout/NotFoundContent';
import { getDictionary } from '@/i18n/dictionaries';

/*
 * not-found.tsx ne reçoit pas les paramètres de la route : les deux versions (quelques
 * phrases) sont transmises et le composant client choisit d'après le segment [lang].
 */
export default function NotFound() {
  return (
    <NotFoundContent
      texts={{
        fr: { ...getDictionary('fr').notFound, meta: getDictionary('fr').meta.notFound },
        en: { ...getDictionary('en').notFound, meta: getDictionary('en').meta.notFound },
      }}
    />
  );
}
