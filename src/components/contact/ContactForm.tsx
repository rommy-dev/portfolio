'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { choiceClass, choiceGridClass, fieldClass, labelClass, submitClass } from './formStyles';

/* Doit rester aligné sur VALID_SUBJECTS dans /api/contact. */
const SUBJECTS = ['Projet freelance', 'Collaboration', "Opportunité d'emploi", 'Autre'] as const;

const MAX_MESSAGE = 500;
const EASE = [0.22, 1, 0.36, 1] as const;

type FormState = 'idle' | 'loading' | 'success' | 'error';

const EMPTY = { name: '', email: '', message: '' };

export function ContactForm() {
  const [subject, setSubject] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState(EMPTY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject }),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  const reset = () => {
    setFormState('idle');
    setFormData(EMPTY);
    setSubject('');
  };

  const incomplete = !formData.name || !formData.email || !formData.message;
  const nearLimit = formData.message.length > MAX_MESSAGE - 50;

  return (
    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col gap-6 border-t border-[hsl(var(--editorial-border))] pt-10"
          role="status"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--editorial-primary))] text-[hsl(var(--editorial-primary))]">
            <Check className="h-5 w-5" />
          </span>
          <div>
            <p className="text-3xl font-semibold tracking-[-0.04em] text-[hsl(var(--editorial-foreground))]">
              Message reçu.
            </p>
            <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
              Merci, je reviens vers vous sous 24&nbsp;h. Une confirmation vient d&apos;être envoyée à{' '}
              <span className="text-[hsl(var(--editorial-foreground))]">{formData.email}</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="w-fit cursor-pointer text-sm text-[hsl(var(--editorial-primary))] transition-colors hover:text-[hsl(var(--editorial-primary-strong))]"
          >
            Envoyer un autre message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex flex-col gap-6"
        >
          {/* ── Objet ── */}
          <fieldset className="flex flex-col gap-2">
            <legend className={`${labelClass} mb-2`}>Objet</legend>
            <div className={`${choiceGridClass} grid-cols-2`}>
              {SUBJECTS.map((label) => {
                const active = subject === label;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSubject(active ? '' : label)}
                    className={choiceClass(active)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* ── Nom + e-mail ── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClass}>
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jean Rakoto"
                value={formData.name}
                onChange={handleChange}
                className={`${fieldClass} h-12`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClass}>
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                value={formData.email}
                onChange={handleChange}
                className={`${fieldClass} h-12`}
              />
            </div>
          </div>

          {/* ── Message ── */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <span
                className={`font-mono text-xs tabular-nums ${
                  nearLimit
                    ? 'text-[hsl(var(--editorial-primary))]'
                    : 'text-[hsl(var(--editorial-foreground-muted)/0.6)]'
                }`}
              >
                {formData.message.length}/{MAX_MESSAGE}
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              required
              maxLength={MAX_MESSAGE}
              rows={6}
              placeholder="Décrivez votre projet, vos délais, votre budget…"
              value={formData.message}
              onChange={handleChange}
              className={`${fieldClass} resize-none py-3 leading-relaxed`}
            />
          </div>

          {/* ── Erreur ── */}
          <AnimatePresence>
            {formState === 'error' && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 border-l-2 border-[hsl(var(--error))] pl-3 text-sm text-[hsl(var(--editorial-foreground-muted))]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--error))]" />
                <span>
                  L&apos;envoi a échoué. Réessayez, ou écrivez-moi directement à{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary-strong))]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Envoi ── */}
          <button
            type="submit"
            disabled={incomplete || formState === 'loading'}
            className={submitClass}
          >
            {formState === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
              </>
            ) : (
              <>
                Envoyer le message
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p className="text-[13px] leading-relaxed text-[hsl(var(--editorial-foreground-muted)/0.75)]">
            Vos données servent uniquement à vous répondre et ne sont jamais partagées.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
