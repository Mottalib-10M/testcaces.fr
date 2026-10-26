/**
 * « Quel CACES pour quel engin ? » : l'engin → recommandation, catégorie, dispenses, formation
 * complémentaire éventuelle, durée de validité et prix médian constaté au catalogue CPF.
 * Données : src/data/engins.ts (annexe 1 des recommandations) et cpf-caces.json.
 */
import { useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ENGINS, FAMILLES, type Famille } from '../../data/engins';
import { priceOf } from '../../lib/engine/money';
import P from '../../data/params-2026.json';
import type { Reco } from '../../lib/engine/exam';

type Lang = 'fr' | 'en';
const NB = ' ';
const FAM: Record<Lang, Record<Famille, string>> = {
  fr: { entrepot: 'Entrepôt et magasin', chantier: 'Chantier et carrière', hauteur: 'Travail en hauteur', levage: 'Levage' },
  en: { entrepot: 'Warehouse and store', chantier: 'Construction site and quarry', hauteur: 'Working at height', levage: 'Lifting' },
};
const money = (v: number, lang: Lang) => (lang === 'fr' ? `${new Intl.NumberFormat('fr-FR').format(v).replace(/ /g, NB)}${NB}€` : `€${new Intl.NumberFormat('en-GB').format(v)}`);

export default function FinderTool({ lang = 'fr', start = 'frontal-6', hrefs = {}, idPrefix = 'f' }: { lang?: Lang; start?: string; hrefs?: Record<string, string>; idPrefix?: string }) {
  const fr = lang === 'fr';
  const first = ENGINS.find((e) => e.id === start) ?? ENGINS[0];
  const [fam, setFam] = useState<Famille>(first.famille);
  const [id, setId] = useState(first.id);
  const e = ENGINS.find((x) => x.id === id) ?? first;
  const price = useMemo(() => (e.reco && e.cat ? priceOf(e.reco, e.cat, 'ini') : null), [e]);
  const years = e.reco ? P.recos[e.reco as Reco].validityYears : null;
  const code = e.reco ? `R${e.reco.slice(1)}` : '';
  const href = e.reco ? hrefs[e.reco] : undefined;
  return (
    <div className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form className="grid content-start gap-3" onSubmit={(ev) => ev.preventDefault()}>
        <SelectField id={`${idPrefix}-fam`} label={fr ? 'Où travaillez-vous ?' : 'Where do you work?'} value={fam} onChange={(v) => { const f = v as Famille; setFam(f); setId(ENGINS.find((x) => x.famille === f)!.id); }} options={FAMILLES.map((f) => ({ value: f, label: FAM[lang][f] }))} />
        <SelectField id={`${idPrefix}-engin`} label={fr ? 'Quel engin conduisez-vous ?' : 'Which machine do you operate?'} value={id} onChange={setId} options={ENGINS.filter((x) => x.famille === fam).map((x) => ({ value: x.id, label: x[lang] }))} />
        <p className="text-xs text-navy-600">{fr ? 'Classement lu dans l’annexe 1 de chaque recommandation de l’Assurance Maladie (versions de 2026).' : 'Classification read in annex 1 of each French Health Insurance recommendation (2026 versions).'}</p>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-lg bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">{fr ? 'CACES à passer' : 'CACES you need'}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{e.reco ? `${code} ${e.cat === 'grue' ? '' : (fr ? 'cat.' : 'cat.') + NB + e.cat}`.trim() : (fr ? 'Hors CACES' : 'No CACES')}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {years && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Validité' : 'Valid for'}</td><td className="py-1.5 text-right text-navy-900">{fr ? `${years}${NB}ans` : `${years} years`}</td></tr>}
          {e.aussi && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Aussi couvert par' : 'Also covered by'}</td><td className="py-1.5 text-right text-navy-900">{e.aussi.join(', ')}</td></tr>}
          {price?.prix && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Prix médian (CPF)' : 'Median price (CPF)'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(price.prix.med, lang)}</td></tr>}
          {price?.heures && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Durée médiane' : 'Median length'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{price.heures.med}{NB}h</td></tr>}
        </tbody></table>
        {e.note && <p className="mt-2 text-sm text-navy-800">{e.note[lang]}</p>}
        {href && <a href={href} className="mt-3 inline-block text-sm font-medium text-accent-700 underline">{fr ? `S’entraîner au test ${code}` : `Practise the ${code} test`}</a>}
      </div>
    </div>
  );
}
