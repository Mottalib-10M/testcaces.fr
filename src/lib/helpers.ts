/** Outils d'écriture remis à chaque page : liens, chiffres lus dans params-2026.json, grilles, prix CPF, tableaux. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { counts } from './bank';
import { GRIDS, themeMin, type Reco } from './engine/exam';
import { priceOf, CPF_DATE } from './engine/money';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>, lang: Locale) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="border-b border-navy-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(lang: Locale, strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Identifiant de page inconnu dans un lien : ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const eur = (n: number) => money(n, lang);
  const c = counts();
  /** Tableau du barème d'une recommandation : thème, points, minimum, nombre de points du référentiel. */
  const grid = (r: Reco) => table(
    lang === 'fr' ? ['Thème', 'Points', 'Minimum', 'Points du référentiel'] : ['Theme', 'Points', 'Minimum', 'Syllabus points'],
    GRIDS[r].themes.map((t) => [t[lang], t.points, themeMin(t.points), t.items.length]),
    lang === 'fr' ? `Barème du test théorique ${r.toUpperCase().replace('R', 'R.')} (fiche d’évaluation, annexe 3)` : `${r.toUpperCase().replace('R', 'R.')} theory test marking (assessment sheet, annex 3)`,
    ['l', 'r', 'r', 'r'], lang);
  /** Détail des points d'un thème. */
  const items = (r: Reco, theme: string) => {
    const t = GRIDS[r].themes.find((x) => x.key === theme)!;
    return table(lang === 'fr' ? ['Point du référentiel', 'Points'] : ['Syllabus point', 'Points'], t.items.map((i) => [i[lang], i.n]), `${t[lang]} · ${t.points} ${lang === 'fr' ? 'points sur 100' : 'points out of 100'}`, ['l', 'r'], lang);
  };
  /** Tableau des prix CPF d'une recommandation (initial et recyclage). */
  const prices = (r: Reco) => table(
    lang === 'fr' ? ['Catégorie', 'Prix médian initial', 'Moitié des offres', 'Durée médiane', 'Recyclage médian'] : ['Category', 'Median initial price', 'Middle half', 'Median length', 'Median refresher'],
    P.recos[r].cats.map((cat) => { const i = priceOf(r, cat, 'ini'), rc = priceOf(r, cat, 'rec'); return [cat === 'grue' ? (lang === 'fr' ? 'Grue de chargement' : 'Loader crane') : cat, i?.prix ? eur(i.prix.med) : '–', i?.prix ? `${eur(i.prix.q1)} – ${eur(i.prix.q3)}` : '–', i?.heures ? `${i.heures.med} h` : '–', rc?.prix ? eur(rc.prix.med) : '–']; }),
    lang === 'fr' ? `Offres du catalogue Mon Compte Formation au ${dateL(CPF_DATE, lang)} (Caisse des Dépôts, Licence Ouverte)` : `Mon Compte Formation catalogue offers on ${dateL(CPF_DATE, lang)} (Caisse des Dépôts, Licence Ouverte)`,
    ['l', 'r', 'r', 'r', 'r'], lang);
  return {
    lang, a, ext, src, P, eur, grid, items, prices,
    num: (n: number, d = 0) => formatNumberL(n, lang, d),
    pc: (x: number, d = 0) => pct(x, lang, d),
    date: (iso: string) => dateL(iso, lang),
    table: (h: string[], r: Array<Array<string | number>>, cap?: string, al: Array<'l' | 'r'> = []) => table(h, r, cap, al, lang),
    count: c,
    price: (r: Reco, cat: string, t: 'ini' | 'rec' = 'ini') => priceOf(r, cat, t),
    cpfDate: dateL(CPF_DATE, lang),
    retrieved: dateL(P.retrieved_at, lang),
    theme: (r: Reco, key: string) => GRIDS[r].themes.find((t) => t.key === key)!,
    years: (r: Reco) => P.recos[r].validityYears,
    /** « Connaissances générales 15 · Technologie… 25 · … » */
    themesLine: (r: Reco) => GRIDS[r].themes.map((t) => `${t[lang]} ${t.points}`).join(' · '),
    pts: (r: Reco, key: string) => GRIDS[r].themes.find((t) => t.key === key)?.points ?? 0,
    /** Prix médian CPF formaté (ou « – »), durée médiane en heures, nombre d'offres. */
    med: (r: Reco, cat: string, t: 'ini' | 'rec' = 'ini') => { const x = priceOf(r, cat, t); return x?.prix ? eur(x.prix.med) : '–'; },
    hrs: (r: Reco, cat: string, t: 'ini' | 'rec' = 'ini') => { const x = priceOf(r, cat, t); return x?.heures ? `${x.heures.med}${lang === 'fr' ? '\u00a0h' : ' hours'}` : '–'; },
    offers: (r: Reco, cat: string, t: 'ini' | 'rec' = 'ini') => priceOf(r, cat, t)?.prix?.n ?? 0,
    min: (r: Reco, key: string) => themeMin(GRIDS[r].themes.find((t) => t.key === key)?.points ?? 0),
  };
}
export type Helpers = ReturnType<typeof helpers>;
