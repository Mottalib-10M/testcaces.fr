/**
 * Test théorique CACES blanc : tirage reproductible et notation des recommandations de l'Assurance
 * Maladie (R.489A, R.482B, R.486B, R.490A, R.485A, annexe 3 « fiche d'évaluation des connaissances
 * théoriques ») : 100 questions à 1 point, tirées point de grille par point de grille selon le barème ;
 * réussite à 70/100 ET au moins la moitié des points de chaque thème. Questions, propositions et
 * corrigés écrits par Radif Partners (src/data/bank/*.json), grilles dans src/data/grilles/*.json.
 */
import P from '../../data/params-2026.json';
import G489 from '../../data/grilles/r489.json';
import G482 from '../../data/grilles/r482.json';
import G486 from '../../data/grilles/r486.json';
import G490 from '../../data/grilles/r490.json';
import G485 from '../../data/grilles/r485.json';

export type Reco = 'r489' | 'r482' | 'r486' | 'r490' | 'r485';
export const RECOS: Reco[] = ['r489', 'r482', 'r486', 'r490', 'r485'];
export type Lang = 'fr' | 'en';
export interface GridItem { key: string; fr: string; en: string; n: number }
export interface GridTheme { key: string; fr: string; en: string; points: number; items: GridItem[] }
export interface Grid { reco: Reco; titre: { fr: string; en: string }; themes: GridTheme[] }
export interface QText { q: string; o: string[]; x: string }
export interface Question {
  id: string;
  points: Partial<Record<Reco, string>>;
  answer: number;
  fr: QText;
  en: QText;
  img?: string;
  plaque?: string;
}

export const GRIDS: Record<Reco, Grid> = { r489: G489 as Grid, r482: G482 as Grid, r486: G486 as Grid, r490: G490 as Grid, r485: G485 as Grid };
export const TEST = P.test;
export const PASS = P.test.passScore;

/** Thème d'un point de grille, pour une recommandation. */
const THEME_OF: Record<string, string> = {};
for (const r of RECOS) for (const t of GRIDS[r].themes) for (const i of t.items) THEME_OF[`${r}|${i.key}`] = t.key;
export const themeKeyOf = (q: Question, reco: Reco) => { const k = q.points[reco]; return k ? THEME_OF[`${reco}|${k}`] : undefined; };
export const themeOf = (reco: Reco, key: string) => GRIDS[reco].themes.find((t) => t.key === key);
export const itemOf = (reco: Reco, key: string) => { for (const t of GRIDS[reco].themes) { const i = t.items.find((x) => x.key === key); if (i) return { theme: t, item: i }; } return undefined; };
export const inReco = (q: Question, reco: Reco) => !!q.points[reco] && !!THEME_OF[`${reco}|${q.points[reco]}`];

/** Générateur pseudo-aléatoire mulberry32 : même graine, même tirage (lien partagé, hydratation). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function shuffle<T>(xs: T[], r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Graine stable tirée d'un texte (id de page) : le build et le navigateur tirent la même première série. */
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}

/**
 * Examen blanc : pour chaque point de grille de barème n, n questions tirées parmi celles qui le
 * travaillent ; s'il en manque, complément pris dans le même thème. Ordre : thème par thème, comme la
 * fiche d'évaluation, questions mélangées à l'intérieur d'un thème.
 */
export function buildExam(bank: Question[], reco: Reco, seed: number): Question[] {
  const r = rng(seed);
  const out: Question[] = [];
  const used = new Set<string>();
  for (const t of GRIDS[reco].themes) {
    const chosen: Question[] = [];
    for (const it of t.items) {
      const pool = shuffle(bank.filter((q) => q.points[reco] === it.key && !used.has(q.id)), r).slice(0, it.n);
      for (const q of pool) { used.add(q.id); chosen.push(q); }
    }
    if (chosen.length < t.points) {
      const extra = shuffle(bank.filter((q) => themeKeyOf(q, reco) === t.key && !used.has(q.id)), r).slice(0, t.points - chosen.length);
      for (const q of extra) { used.add(q.id); chosen.push(q); }
    }
    out.push(...shuffle(chosen, r));
  }
  return out;
}

/** Série d'entraînement : un thème (ou tous), éventuellement un point de grille ou un filtre de texte. */
export function buildPractice(bank: Question[], reco: Reco, theme: string | null, seed: number, size: number, opts: { item?: string; match?: RegExp; ids?: string[] } = {}): Question[] {
  const r = rng(seed);
  let pool = bank.filter((q) => inReco(q, reco));
  if (opts.ids) { const s = new Set(opts.ids); pool = pool.filter((q) => s.has(q.id)); }
  if (theme) pool = pool.filter((q) => themeKeyOf(q, reco) === theme);
  if (opts.item) pool = pool.filter((q) => q.points[reco] === opts.item);
  if (opts.match) {
    const m = opts.match;
    const hit = pool.filter((q) => m.test(`${q.fr.q} ${q.fr.o.join(' ')} ${q.fr.x} ${q.plaque ?? ''}`));
    const rest = pool.filter((q) => !hit.includes(q));
    const first = shuffle(hit, r).slice(0, Math.min(hit.length, Math.ceil(size * 0.6)));
    return shuffle([...first, ...shuffle(rest, r).slice(0, size - first.length)], r);
  }
  return shuffle(pool, r).slice(0, size);
}

export interface ThemeScore { key: string; fr: string; en: string; got: number; max: number; ok: boolean }
export interface Score { got: number; max: number; pass: boolean; scaled: number; themes: ThemeScore[] }
/**
 * Notation. Examen complet : réussite à 70 points sur 100 et au moins la moitié des points de chaque
 * thème. Série partielle : mêmes règles ramenées au nombre de questions posées (indicatif).
 */
export function score(qs: Question[], answers: Array<number | null>, reco: Reco): Score {
  const themes: ThemeScore[] = GRIDS[reco].themes.map((t) => ({ key: t.key, fr: t.fr, en: t.en, got: 0, max: 0, ok: true }));
  let got = 0;
  qs.forEach((q, i) => {
    const t = themes.find((x) => x.key === themeKeyOf(q, reco));
    const ok = answers[i] === q.answer;
    if (ok) got++;
    if (t) { t.max++; if (ok) t.got++; }
  });
  for (const t of themes) t.ok = t.max === 0 || t.got * 2 >= t.max;
  const max = qs.length;
  const scaled = max ? Math.round((got / max) * 100) : 0;
  const pass = max > 0 && got * 100 >= PASS * max && themes.every((t) => t.ok);
  return { got, max, pass, scaled, themes: themes.filter((t) => t.max > 0) };
}

/** Points de thème nécessaires (la moitié, arrondie au point supérieur). */
export const themeMin = (points: number) => Math.ceil(points * P.test.themeMinShare);
/** Taille de l'examen (100) et nombre d'erreurs permises au total (30). */
export const examSize = () => P.test.questions;
export const errorsAllowed = () => P.test.questions - PASS;

/** Réussite au test théorique à partir des points obtenus par thème (simulateur de note). */
export function verdict(reco: Reco, gotByTheme: number[]) {
  const ts = GRIDS[reco].themes;
  const rows = ts.map((t, i) => {
    const got = Math.max(0, Math.min(t.points, Math.round(gotByTheme[i] ?? 0)));
    return { key: t.key, fr: t.fr, en: t.en, got, max: t.points, min: themeMin(t.points), ok: got >= themeMin(t.points) };
  });
  const total = rows.reduce((s, x) => s + x.got, 0);
  return { rows, total, pass: total >= PASS && rows.every((x) => x.ok), missingTotal: Math.max(0, PASS - total), failed: rows.filter((x) => !x.ok) };
}
