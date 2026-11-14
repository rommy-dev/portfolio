import type { DomainId, Level, Skill } from '@/data/skills';

export type ProjectRef = { slug: string; title: string; href: string; isStage: boolean };

export type ResolvedEvidence = ProjectRef & { label: string; codeHref: string | null };

export type ResolvedSkill = Omit<Skill, 'evidence'> & { evidence: ResolvedEvidence[] };

export type LevelInfo = { id: Level; label: string; definition: string };
export type DomainInfo = { id: DomainId; label: string };
