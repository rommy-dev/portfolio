'use client';

import { Component, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

/*
 * Curseur personnalisé de la page Compétences.
 * - Actif uniquement si (pointer: fine) et sans reduced-motion ; jamais sur écran tactile.
 * - Le curseur système n'est masqué (classe sur <html>) que lorsqu'il est actif, et il
 *   est rétabli au démontage ou si le composant échoue (error boundary).
 * - Un seul écouteur mousemove ; l'état est calculé dans requestAnimationFrame.
 * États : data-cursor="Libellé" (étiquette), lien ou bouton (anneau agrandi),
 * texte sélectionnable (barre verticale).
 */

const HIDE_CLASS = 'has-custom-cursor';
const TEXT_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'LI', 'DD', 'DT', 'SPAN', 'BLOCKQUOTE', 'FIGCAPTION']);

type CursorState = { kind: 'default' } | { kind: 'link' } | { kind: 'text' } | { kind: 'label'; label: string };

function readState(target: Element | null): CursorState {
  if (!target) return { kind: 'default' };
  const labelled = target.closest<HTMLElement>('[data-cursor]');
  if (labelled?.dataset.cursor) return { kind: 'label', label: labelled.dataset.cursor };
  if (target.closest('a, button, [role="button"], summary, label, select')) return { kind: 'link' };
  if (target.closest('input, textarea')) return { kind: 'text' };
  const hasOwnText = Array.from(target.childNodes).some(
    (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
  );
  if (TEXT_TAGS.has(target.tagName) && hasOwnText) return { kind: 'text' };
  return { kind: 'default' };
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const [state, setState] = useState<CursorState>({ kind: 'default' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add(HIDE_CLASS);
    let frame = 0;
    let pos = { x: -100, y: -100 };
    let target: Element | null = null;
    let lastKey = '';

    const onMove = (e: MouseEvent) => {
      pos = { x: e.clientX, y: e.clientY };
      target = e.target as Element | null;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        x.set(pos.x);
        y.set(pos.y);
        setVisible(true);
        const next = readState(target);
        const key = next.kind === 'label' ? `label:${next.label}` : next.kind;
        if (key !== lastKey) {
          lastKey = key;
          setState(next);
        }
      });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove(HIDE_CLASS);
    };
  }, [x, y]);

  const ringScale = state.kind === 'link' ? 1.6 : state.kind === 'label' ? 2.4 : state.kind === 'text' ? 0 : 1;

  return createPortal(
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference">
      {/* Anneau (32 px) qui suit avec un ressort. */}
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-white"
          animate={{ scale: visible ? ringScale : 0, opacity: visible ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        />
        <AnimatePresence>
          {visible && state.kind === 'label' && (
            <motion.span
              key={state.label}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Point (8 px), ou barre verticale au-dessus du texte. */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-white"
          animate={{
            opacity: visible && state.kind !== 'label' ? 1 : 0,
            scaleX: state.kind === 'text' ? 0.25 : 1,
            scaleY: state.kind === 'text' ? 2.6 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>,
    document.body,
  );
}

/* Si le curseur plante, on rétablit immédiatement le curseur système. */
class CursorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    document.documentElement.classList.remove(HIDE_CLASS);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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

  if (!enabled) return null;
  return (
    <CursorBoundary>
      <Cursor />
    </CursorBoundary>
  );
}
