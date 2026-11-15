'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/*
 * Le curseur (et framer-motion qu'il utilise) n'est téléchargé que si l'appareil a une souris
 * et n'a pas demandé à réduire les animations : rien n'est chargé sur mobile.
 * Le détail du comportement est documenté dans CursorView.tsx.
 */
const CursorView = dynamic(() => import('./CursorView'), { ssr: false });

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  return enabled ? <CursorView /> : null;
}
