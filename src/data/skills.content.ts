import { DEFAULT_LOCALE, type Locale } from '@/i18n/config';
import { DOMAINS, LANGUAGES, LEVELS, SKILLS, type Skill } from './skills';
import * as en from './skills.en';

/*
 * Compétences dans la langue demandée. Le français est la source (skills.ts) ; l'anglais
 * superpose ses textes, par identifiant de compétence. Une compétence sans traduction, ou dont
 * le nombre de preuves diffère, fait échouer le build plutôt que d'afficher du français.
 */

function translateSkill(skill: Skill): Skill {
  const text = en.SKILLS[skill.id];
  if (!text) throw new Error(`[skills] traduction anglaise manquante : ${skill.id} (src/data/skills.en.ts)`);
  if (text.evidence.length !== skill.evidence.length) {
    throw new Error(`[skills] ${skill.id} : ${skill.evidence.length} preuve(s) en français, ${text.evidence.length} en anglais.`);
  }
  return {
    ...skill,
    name: text.name ?? skill.name,
    summary: text.summary,
    evidence: skill.evidence.map((e, i) => ({ ...e, label: text.evidence[i] })),
    tags: text.tags ?? skill.tags,
  };
}

export function getSkillsContent(locale: Locale) {
  if (locale === DEFAULT_LOCALE) return { SKILLS, DOMAINS, LEVELS, LANGUAGES };
  return {
    SKILLS: SKILLS.map(translateSkill),
    DOMAINS: DOMAINS.map((d) => ({ ...d, label: en.DOMAINS[d.id] })),
    LEVELS: en.LEVELS,
    LANGUAGES: en.LANGUAGES,
  };
}
