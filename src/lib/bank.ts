/**
 * Banque de questions CACES écrite par Radif Partners (src/data/bank/*.json). `BANK` (import statique)
 * sert au build : pages, compteurs et premier rendu de chaque outil. Dans le navigateur, `loadBank`
 * charge les fichiers à la demande, pour qu'une page n'embarque que les questions qu'elle affiche
 * tant qu'on ne relance pas un tirage. La typographie française (espaces insécables) est posée ici,
 * une fois, car le contenu des îlots React n'est pas retouché après le build.
 */
import type { Question, QText, Reco } from './engine/exam';
import { inReco, themeKeyOf, GRIDS, RECOS } from './engine/exam';
import B489 from '../data/bank/r489.json';
import B482 from '../data/bank/r482.json';
import B486 from '../data/bank/r486.json';
import B490 from '../data/bank/r490.json';
import B485 from '../data/bank/r485.json';

const NB = ' ';
export function frTypo(s: string): string {
  return s
    .replace(/'/g, '’')
    .replace(/ ([:;?!»])/g, `${NB}$1`)
    .replace(/« /g, `«${NB}`)
    .replace(/(\d) (?=(?:%|€|kg|t\b|m\b|mm\b|km|h\b|cv\b|ch\b|kW|°|ans?\b|mois\b|\d{3}(?!\d)))/g, `$1${NB}`);
}
export function enTypo(s: string): string {
  return s.replace(/(\d) (?=(?:kg|t\b|m\b|mm\b|km|hp\b|kW|°))/g, `$1${NB}`);
}
const tx = (t: QText, f: (s: string) => string): QText => ({ q: f(t.q), o: t.o.map(f), x: f(t.x) });
export const normalize = (q: Question): Question => ({ ...q, fr: tx(q.fr, frTypo), en: tx(q.en, enTypo) });

export const BANK: Question[] = ([...B489, ...B482, ...B486, ...B490, ...B485] as Question[]).map(normalize);

export async function loadBank(): Promise<Question[]> {
  const ms = await Promise.all([import('../data/bank/r489.json'), import('../data/bank/r482.json'), import('../data/bank/r486.json'), import('../data/bank/r490.json'), import('../data/bank/r485.json')]);
  return ms.flatMap((m) => m.default as Question[]).map(normalize);
}

export const bankOf = (reco: Reco) => BANK.filter((q) => inReco(q, reco));
/** Nombre de questions par recommandation, par thème et au total (lus dans la banque, jamais tapés). */
export function counts() {
  const per = Object.fromEntries(RECOS.map((r) => [r, bankOf(r).length])) as Record<Reco, number>;
  const theme = (r: Reco, t: string) => bankOf(r).filter((q) => themeKeyOf(q, r) === t).length;
  return { all: BANK.length, per, theme, items: (r: Reco) => GRIDS[r].themes.reduce((s, t) => s + t.items.length, 0) };
}
