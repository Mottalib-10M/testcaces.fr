/**
 * Dates du CACES, toutes calculées en UTC sur des dates « AAAA-MM-JJ » (jamais de décalage d'un jour).
 * - fin de validité : date d'obtention + 5 ans (R.489, R.485, R.486, R.490) ou 10 ans (R.482), la date
 *   d'obtention étant celle de la réussite à la seconde épreuve (théorie ou pratique) ;
 * - partie réussie gardée 12 mois si l'autre partie est échouée ; théorie gardée 12 mois après un
 *   CACES initial pour une autre catégorie de la même recommandation ;
 * - attestation d'absence de contre-indications médicales : 5 ans (Code du travail, art. R4323-56) ;
 *   un avis d'aptitude délivré avant le 1er octobre 2025 en tient lieu 5 ans après sa délivrance.
 */
import P from '../../data/params-2026.json';
import type { Reco } from './exam';

const parse = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return { y, m, d }; };
const fmt = (y: number, m: number, d: number) => `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const lastDay = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
export const isIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T00:00:00Z`));

/** Ajoute des mois ; un 31 qui n'existe pas devient le dernier jour du mois (29 février → 28 février). */
export function addMonths(iso: string, months: number): string {
  const { y, m, d } = parse(iso);
  const t = y * 12 + (m - 1) + months;
  const ny = Math.floor(t / 12), nm = (t % 12) + 1;
  return fmt(ny, nm, Math.min(d, lastDay(ny, nm)));
}
export const addYears = (iso: string, years: number) => addMonths(iso, Math.round(years * 12));
export function addDays(iso: string, days: number): string {
  const t = Date.parse(`${iso}T00:00:00Z`) + days * 86400000;
  return new Date(t).toISOString().slice(0, 10);
}
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
export const minIso = (a: string, b: string) => (a < b ? a : b);

export const validityYears = (reco: Reco) => P.recos[reco].validityYears;
/** Échéance : date anniversaire des 5 ans (10 ans en R.482) comptés depuis la date d'obtention. */
export const caceEnd = (reco: Reco, obtained: string) => addYears(obtained, validityYears(reco));

/** Attestation médicale : 5 ans. Avis d'aptitude antérieur au 1er octobre 2025 : 5 ans aussi, à compter de sa délivrance. */
export const medicalEnd = (issued: string) => addYears(issued, issued < P.medical.since ? P.medical.oldAvisUntilYears : P.medical.attestationYears);

export interface Validity {
  end: string;
  /** date conseillée pour s'inscrire au recyclage (mois d'avance choisis) */
  bookBy: string;
  daysLeft: number;
  state: 'valid' | 'soon' | 'expired';
}
export function validity(reco: Reco, obtained: string, today: string, leadMonths = 3): Validity {
  const end = caceEnd(reco, obtained);
  const bookBy = addMonths(end, -leadMonths);
  const daysLeft = daysBetween(today, end);
  return { end, bookBy, daysLeft, state: daysLeft < 0 ? 'expired' : today >= bookBy ? 'soon' : 'valid' };
}

/** Autorisation de conduite : tient tant que le CACES (s'il sert d'évaluation) et l'attestation médicale sont valables. */
export function authorisation(reco: Reco, obtained: string, medicalIssued: string) {
  const c = caceEnd(reco, obtained);
  const m = medicalEnd(medicalIssued);
  return { caces: c, medical: m, limit: minIso(c, m), limitedBy: m < c ? 'medical' as const : 'caces' as const };
}

/** Échec à une seule partie : la partie réussie reste acquise 12 mois (même organisme testeur). */
export const keepPartUntil = (passed: string) => addMonths(passed, P.test.keepPassedPartMonths);
/** Après un CACES initial : théorie gardée 12 mois pour une autre catégorie de la même recommandation. */
export const extensionUntil = (initial: string) => addMonths(initial, P.test.extensionTheoryMonths);

/** R.490 : pratique repoussée à 10 ans pour un conducteur à temps plein (50 jours de grue par an sur 5 ans, théorie repassée). */
export function r490Extended(obtained: string, daysPerYear: number[]) {
  const ok = daysPerYear.length >= 5 && daysPerYear.slice(0, 5).every((d) => d >= P.recos.r490.extendedDaysPerYear);
  return { ok, theoryBy: caceEnd('r490', obtained), practicalBy: ok ? addYears(obtained, P.recos.r490.practicalExtendedYears) : caceEnd('r490', obtained) };
}
