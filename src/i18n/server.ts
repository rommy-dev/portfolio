import { notFound } from 'next/navigation';
import { hasLocale, type Locale } from './config';

export type LangParams = { params: Promise<{ lang: string }> };

/** Langue d'une page à partir du segment [lang] ; 404 si elle n'est pas prise en charge. */
export async function resolveLocale(params: LangParams['params']): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}
