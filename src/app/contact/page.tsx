'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MessageSquare,
  Briefcase,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

/* ─── Config ─────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ram.rommynya@gmail.com',
    href: 'mailto:ram.rommynya@gmail.com',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'hover:border-primary/40',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/rommy-dev',
    href: 'https://github.com/rommy-dev',
    color: 'text-foreground',
    bg: 'bg-foreground/8',
    border: 'hover:border-foreground/20',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Ny Aina Rommy Ramaromilanto',
    href: 'https://linkedin.com/in/rommy-r',
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    border: 'hover:border-sky-500/40',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Antananarivo, Madagascar',
    href: null,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: '',
  },
];

const SUBJECTS = [
  { icon: Briefcase, label: 'Projet freelance' },
  { icon: MessageSquare, label: 'Collaboration' },
  { icon: User, label: 'Opportunité d\'emploi' },
  { icon: Mail, label: 'Autre' },
];

/* ─── Helpers ────────────────────────────────────────────── */
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

type FormState = 'idle' | 'loading' | 'success' | 'error';

/* ─── Page ───────────────────────────────────────────────── */
export default function ContactPage() {
  const [subject, setSubject] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState('loading');
    try {
      const dataToSend = { ...formData, subject };
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero header ── */}
      <section className="relative md:pt-32 pt-2 pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/8 blur-[80px]" />
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-secondary/8 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...inView(0)}>
            <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
              Contact
            </span>
          </motion.div>
          <motion.h1
            {...inView(0.06)}
            className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-foreground"
          >
            Travaillons ensemble
          </motion.h1>
          <motion.p
            {...inView(0.1)}
            className="mt-3 text-foreground-muted max-w-lg"
          >
            Disponible pour des missions freelance, des collaborations ou des
            opportunités d&apos;emploi. Réponse sous 24h.
          </motion.p>

          {/* Availability badge */}
          <motion.div {...inView(0.14)} className="mt-5 flex items-center gap-2 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-sm text-foreground-muted">
              Actuellement <span className="font-semibold text-success">disponible</span> pour de nouveaux projets
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

        {/* ── Form ── */}
        <motion.div {...inView(0.15)}>
          <AnimatePresence mode="wait">

            {/* Success state */}
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-success/30 bg-success/5 py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15"
                >
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </motion.div>
                <div>
                  <p className="text-xl font-bold text-foreground">Message envoyé !</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    Je reviendrai vers vous dans les plus brefs délais.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFormState('idle');
                    setFormData({ name: '', email: '', message: '' });
                    setSubject('');
                  }}
                  className="text-sm text-primary hover:underline hover:cursor-pointer"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Subject selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Objet de votre message
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SUBJECTS.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSubject(label)}
                        className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all duration-200
                          ${subject === label
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-surface text-foreground-muted hover:border-primary/40 hover:bg-surface hover:text-foreground'
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">
                      Nom complet <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jean Rakoto"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-foreground-subtle
                        focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10
                        transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="vous@exemple.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-foreground-subtle
                        focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10
                        transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">
                      Message <span className="text-accent">*</span>
                    </label>
                    <span className={`text-xs ${formData.message.length > 450 ? 'text-accent' : 'text-foreground-subtle'}`}>
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={500}
                    rows={6}
                    placeholder="Décrivez votre projet ou votre demande…"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle
                      focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10
                      transition-all duration-200"
                  />
                </div>

                {/* Error banner */}
                {formState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Une erreur est survenue. Réessayez ou écrivez-moi directement par email.
                  </motion.div>
                )}

                {/* Submit */}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-foreground-subtle">
                    Vos données ne sont jamais partagées.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    loading={formState === 'loading'}
                    disabled={!formData.name || !formData.email || !formData.message}
                    iconRight={<Send className="h-4 w-4" />}
                  >
                    Envoyer
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Sidebar ── */}
        <div className="flex flex-col gap-5">

          {/* Contact info cards */}
          <motion.div {...inView(0.2)} className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
              Me retrouver
            </p>
            {CONTACT_INFO.map(({ icon: Icon, label, value, href, color, bg, border }) => {
              const inner = (
                <div
                  className={`group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 ${border} transition-all duration-200`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-current/20 ${bg} ${color}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">
                      {label}
                    </p>
                    <p className={`text-sm font-medium truncate ${href ? 'group-hover:text-primary' : ''} text-foreground transition-colors`}>
                      {value}
                    </p>
                  </div>
                  {href && (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-foreground-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </motion.div>

          {/* Response time card */}
          <motion.div
            {...inView(0.28)}
            className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-foreground-subtle" />
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
                Temps de réponse
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { channel: 'Email',    time: '< 24h', color: 'bg-success' },
                { channel: 'LinkedIn', time: '< 48h', color: 'bg-sky-500' },
              ].map(({ channel, time, color }) => (
                <div key={channel} className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">{channel}</span>
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Preferred contact note */}
        <motion.div
          {...inView(0.34)}
          className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-5 group"
        >
          <div aria-hidden className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary-10 blur-2xl" />
          <p className="relative text-xs font-bold uppercase tracking-widest text-primary mb-2">
            <span className='inline-block transition-transform duration-300 group-hover:scale-150'>✦</span> Contact privilégié
          </p>
          <p className="relative text-sm text-foreground-muted leading-relaxed">
            Pour toute demande urgente ou un échange rapide, l&apos;email reste
            le moyen le plus direct.
          </p>
          <a
            href="mailto:ram.rommynya@gmail.com"
            className="relative mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            ram.rommynya@gmail.com
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}