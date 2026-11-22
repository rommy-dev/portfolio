import { notFound } from 'next/navigation';

/* Toute URL inconnue d'une langue affiche la 404 traduite de [lang]/not-found.tsx. */
export default function CatchAll() {
  notFound();
}
