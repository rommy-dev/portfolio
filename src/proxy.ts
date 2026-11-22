import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALE_COOKIE } from '@/i18n/config';
import { internalSegment, localizePath, publicSegment } from '@/i18n/routes';

/*
 * Routage par langue :
 * - /…        → français, réécrit vers /fr/… (dossier app/[lang]) ;
 * - /en/…     → anglais, segments traduits (/en/projects → /en/projets) ;
 * - /fr/…     → redirigé vers l'URL sans préfixe (une seule URL par page) ;
 * - cookie NEXT_LOCALE=en (choix explicite du visiteur) : une URL française redirige vers l'anglais.
 * Pas de détection par Accept-Language : la version anglaise se partage par son lien /en.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [first, ...rest] = pathname.split('/').filter(Boolean);
  const url = request.nextUrl.clone();

  if (first === DEFAULT_LOCALE) {
    url.pathname = `/${rest.join('/')}`;
    return NextResponse.redirect(url, 308);
  }

  if (first === 'en') {
    const [segment, ...tail] = rest;
    if (segment) {
      /* Segment français sous /en (ex. /en/projets) : redirection vers l'URL anglaise. */
      const english = publicSegment('en', segment);
      if (english && english !== segment) {
        url.pathname = `/en/${[english, ...tail].join('/')}`;
        return NextResponse.redirect(url, 308);
      }
    }
    url.pathname = `/en/${[segment && internalSegment('en', segment), ...tail].filter(Boolean).join('/')}`;
    return NextResponse.rewrite(url);
  }

  if (request.cookies.get(LOCALE_COOKIE)?.value === 'en') {
    url.pathname = localizePath(pathname, 'en');
    return NextResponse.redirect(url, 307);
  }

  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /* Pages uniquement : ni API, ni fichiers internes de Next, ni fichiers statiques (avec extension). */
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
