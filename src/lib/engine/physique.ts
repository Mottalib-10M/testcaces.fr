/**
 * Calculs de manutention pour l'entraînement (pas pour décider d'une manutention réelle : seule la
 * plaque de charge de l'engin fait foi).
 * - lecture d'une plaque de charge fictive (src/data/bank/plaques.json) : on lit la ligne de hauteur
 *   égale ou immédiatement supérieure et la colonne de centre de gravité égale ou immédiatement
 *   supérieure, comme on lit une plaque réelle (jamais d'interpolation vers le haut) ;
 * - distance d'arrêt : distance parcourue pendant le temps de réaction + distance de freinage
 *   v² / (2 a), avec une décélération a choisie par le visiteur (elle dépend du sol, des pneus, de la
 *   charge et de l'engin : la recommandation demande de connaître ces paramètres, pas une valeur).
 */
import PL from '../../data/bank/plaques.json';

export interface Plaque { fr: string; en: string; cols: number[]; colUnit: string; rowUnit: string; rows: Array<[number, number[]]> }
export const PLAQUES = Object.fromEntries(Object.entries(PL).filter(([k]) => !k.startsWith('_'))) as unknown as Record<string, Plaque>;

/** Charge maximale lue sur la plaque pour une hauteur (m) et un centre de gravité (mm). null = hors plaque. */
export function readPlate(id: string, height: number, cdg: number): { kg: number; row: number; col: number } | null {
  const p = PLAQUES[id];
  if (!p) return null;
  const r = p.rows.findIndex(([h]) => height <= h + 1e-9);
  if (r < 0) return null;
  const c = p.cols.length === 1 ? 0 : p.cols.findIndex((x) => cdg <= x + 1e-9);
  if (c < 0) return null;
  return { kg: p.rows[r][1][c], row: r, col: c };
}
/** Manutention possible ? masse ≤ capacité lue. */
export function canLift(id: string, height: number, cdg: number, mass: number) {
  const r = readPlate(id, height, cdg);
  return { plate: r, ok: !!r && mass <= r.kg, margin: r ? r.kg - mass : null };
}
/** Hauteur maximale accessible pour une masse et un centre de gravité donnés. */
export function maxHeight(id: string, cdg: number, mass: number): number | null {
  const p = PLAQUES[id];
  if (!p) return null;
  const c = p.cols.length === 1 ? 0 : p.cols.findIndex((x) => cdg <= x + 1e-9);
  if (c < 0) return null;
  let best: number | null = null;
  for (const [h, v] of p.rows) if (mass <= v[c]) best = h;
  return best;
}

/** Distance d'arrêt (m) : réaction + freinage. v en km/h, réaction en s, décélération en m/s². */
export function stopping(kmh: number, reaction: number, decel: number) {
  const v = Math.max(0, kmh) / 3.6;
  const r = v * Math.max(0, reaction);
  const b = decel > 0 ? (v * v) / (2 * decel) : Infinity;
  return { reaction: r, braking: b, total: r + b, ms: v };
}
