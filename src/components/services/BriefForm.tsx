'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { BUDGETS } from '@/data/services';
import {
  choiceClass,
  choiceGridClass,
  fieldClass,
  labelClass,
  submitClass,
} from '@/components/contact/formStyles';

const EASE = [0.22, 1, 0.36, 1] as const;

const TOOLS = ['Excel', 'Papier', 'Autre'] as const;
const USERS = ['1 à 5', '6 à 20', '21 à 50', 'Plus de 50'] as const;
const DEADLINES = ['Moins d’1 mois', '1 à 3 mois', 'Plus de 3 mois', 'Flexible'] as const;
const CHANNELS = ['WhatsApp', 'E-mail', 'Appel'] as const;

const MAX_PROBLEM = 800;

type FormState = 'idle' | 'loading' | 'success' | 'error';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  activity: '',
  problem: '',
  tools: [] as string[],
  users: '',
  deadline: '',
  budget: '',
  channel: '',
};

/* Le brief passe par /api/contact : un seul message structuré, sujet « Demande de devis ». */
function composeMessage(b: typeof EMPTY) {
  const line = (label: string, value: string) => (value ? `${label} : ${value}` : null);
  return [
    line('Activité', b.activity),
    `Problème actuel :\n${b.problem}`,
    line('Outils actuels', b.tools.join(', ')),
    line('Utilisateurs prévus', b.users),
    line('Délai souhaité', b.deadline),
    line('Budget', b.budget),
    line('Contact préféré', b.channel),
    line('Téléphone', b.phone),
  ]
    .filter(Boolean)
    .join('\n');
}

function Choices({
  legend,
  options,
  value,
  onChange,
  cols = 'grid-cols-2 sm:grid-cols-4',
  multiple = false,
}: {
  legend: string;
  options: readonly string[];
  value: string | string[];
  onChange: (next: string) => void;
  cols?: string;
  multiple?: boolean;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className={`${labelClass} mb-2`}>
        {legend}
        {multiple && <span className="opacity-60"> · plusieurs choix possibles</span>}
      </legend>
      <div className={`${choiceGridClass} ${cols}`}>
        {options.map((option) => {
          const active = Array.isArray(value) ? value.includes(option) : value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={choiceClass(active)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function BriefForm() {
  const [brief, setBrief] = useState(EMPTY);
  const [formState, setFormState] = useState<FormState>('idle');

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setBrief((b) => ({ ...b, [key]: e.target.value }));
  const pick = (key: 'users' | 'deadline' | 'budget' | 'channel') => (option: string) =>
    setBrief((b) => ({ ...b, [key]: b[key] === option ? '' : option }));
  const toggleTool = (tool: string) =>
    setBrief((b) => ({
      ...b,
      tools: b.tools.includes(tool) ? b.tools.filter((t) => t !== tool) : [...b.tools, tool],
    }));

  const needsPhone = brief.channel === 'WhatsApp' || brief.channel === 'Appel';
  const incomplete =
    brief.name.trim().length < 2 ||
    !brief.email ||
    !brief.activity.trim() ||
    brief.problem.trim().length < 10 ||
    (needsPhone && !brief.phone.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (incomplete) return;
    setFormState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: brief.name,
          email: brief.email,
          subject: 'Demande de devis',
          message: composeMessage(brief),
        }),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col gap-6 border-t border-[hsl(var(--editorial-border))] pt-10"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--editorial-primary))] text-[hsl(var(--editorial-primary))]">
            <Check className="h-5 w-5" />
          </span>
          <div>
            <p className="text-3xl font-semibold tracking-[-0.04em]">Brief reçu.</p>
            <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
              Merci. Je l’étudie et je reviens vers vous
              {brief.channel ? ` par ${brief.channel.toLowerCase()}` : ''} avec les questions de cadrage. Une
              confirmation vient d’être envoyée à{' '}
              <span className="text-[hsl(var(--editorial-foreground))]">{brief.email}</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setBrief(EMPTY);
              setFormState('idle');
            }}
            className="w-fit cursor-pointer text-sm text-[hsl(var(--editorial-primary))] transition-colors hover:text-[hsl(var(--editorial-primary-strong))]"
          >
            Envoyer un autre brief
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
          className="flex flex-col gap-7"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="brief-name" className={labelClass}>
                Nom et organisation
              </label>
              <input
                id="brief-name"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Jean Rakoto, Centre Fanilo"
                value={brief.name}
                onChange={set('name')}
                className={`${fieldClass} h-12`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="brief-email" className={labelClass}>
                E-mail
              </label>
              <input
                id="brief-email"
                type="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                value={brief.email}
                onChange={set('email')}
                className={`${fieldClass} h-12`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="brief-activity" className={labelClass}>
              Activité en une phrase
            </label>
            <input
              id="brief-activity"
              required
              maxLength={150}
              placeholder="Centre de formation, 300 apprenants par an"
              value={brief.activity}
              onChange={set('activity')}
              className={`${fieldClass} h-12`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor="brief-problem" className={labelClass}>
                Problème actuel : ce qui vous fait perdre du temps
              </label>
              <span className="font-mono text-xs tabular-nums text-[hsl(var(--editorial-foreground-muted)/0.6)]">
                {brief.problem.length}/{MAX_PROBLEM}
              </span>
            </div>
            <textarea
              id="brief-problem"
              required
              rows={5}
              maxLength={MAX_PROBLEM}
              placeholder="Les inscriptions sont saisies dans trois fichiers Excel, les relances se font à la main…"
              value={brief.problem}
              onChange={set('problem')}
              className={`${fieldClass} resize-none py-3 leading-relaxed`}
            />
          </div>

          <Choices
            legend="Outils utilisés aujourd’hui"
            options={TOOLS}
            value={brief.tools}
            onChange={toggleTool}
            cols="grid-cols-3"
            multiple
          />
          <Choices legend="Nombre d’utilisateurs prévus" options={USERS} value={brief.users} onChange={pick('users')} />
          <Choices legend="Délai souhaité" options={DEADLINES} value={brief.deadline} onChange={pick('deadline')} />
          <Choices
            legend="Budget"
            options={BUDGETS}
            value={brief.budget}
            onChange={pick('budget')}
            cols="grid-cols-1 sm:grid-cols-2"
          />
          <Choices
            legend="Moyen de contact préféré"
            options={CHANNELS}
            value={brief.channel}
            onChange={pick('channel')}
            cols="grid-cols-3"
          />

          <AnimatePresence initial={false}>
            {needsPhone && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2 pb-1">
                  <label htmlFor="brief-phone" className={labelClass}>
                    Numéro {brief.channel === 'WhatsApp' ? 'WhatsApp' : 'de téléphone'}
                  </label>
                  <input
                    id="brief-phone"
                    type="tel"
                    required
                    maxLength={30}
                    autoComplete="tel"
                    placeholder="+261 34 00 000 00"
                    value={brief.phone}
                    onChange={set('phone')}
                    className={`${fieldClass} h-12`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                  L’envoi a échoué. Réessayez, ou envoyez votre brief à{' '}
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

          <button type="submit" disabled={incomplete || formState === 'loading'} className={submitClass}>
            {formState === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
              </>
            ) : (
              <>
                Envoyer mon brief
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <p className="-mt-3 text-[13px] leading-relaxed text-[hsl(var(--editorial-foreground-muted)/0.75)]">
            Gratuit et sans engagement. Vos informations servent uniquement à préparer le devis.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
