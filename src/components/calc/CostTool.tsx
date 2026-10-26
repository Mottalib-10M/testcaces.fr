/**
 * Prix d'un CACES et reste à charge :
 * 1. prix médian et quartiles des offres du catalogue Mon Compte Formation (open data Caisse des
 *    Dépôts, Licence Ouverte) pour la catégorie, initial ou recyclage, en France ou dans une région ;
 * 2. financement CPF (plafond de 1 500 € pour les certifications du Répertoire spécifique,
 *    participation forfaitaire de 150 € sauf exonération), autres financeurs, reste à charge.
 * Aucun organisme n'est nommé ni recommandé.
 */
import { useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { CERTS, REGIONS, CPF_DATE, priceOf, cpfShare } from '../../lib/engine/money';
import { RECOS, type Reco } from '../../lib/engine/exam';
import P from '../../data/params-2026.json';

type Lang = 'fr' | 'en';
const NB = ' ';
const NAME: Record<Lang, Record<Reco, string>> = {
  fr: { r489: 'R489 · chariots', r482: 'R482 · engins de chantier', r486: 'R486 · nacelles', r490: 'R490 · grue de chargement', r485: 'R485 · gerbeurs accompagnants' },
  en: { r489: 'R489 · forklifts', r482: 'R482 · construction machinery', r486: 'R486 · aerial lifts', r490: 'R490 · lorry loader crane', r485: 'R485 · pedestrian stackers' },
};
const catLabel = (c: string, lang: Lang) => (c === 'grue' ? (lang === 'fr' ? 'Grue de chargement' : 'Loader crane') : `${lang === 'fr' ? 'Catégorie' : 'Category'} ${c}`);
const eur = (v: number, lang: Lang) => (lang === 'fr' ? `${new Intl.NumberFormat('fr-FR').format(Math.round(v)).replace(/ /g, NB)}${NB}€` : `€${new Intl.NumberFormat('en-GB').format(Math.round(v))}`);
const dl = (iso: string, lang: Lang) => new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function CostTool({ lang = 'fr', reco: r0 = 'r489', cat: c0 = '3', idPrefix = 'c', price: p0, status: st0 = 'salarie' }: { lang?: Lang; reco?: Reco; cat?: string; idPrefix?: string; price?: number; status?: 'salarie' | 'chomeur' | 'abonde' }) {
  const fr = lang === 'fr';
  const [reco, setReco] = useState<Reco>(r0);
  const [cat, setCat] = useState(c0);
  const [type, setType] = useState<'ini' | 'rec'>('ini');
  const [region, setRegion] = useState('');
  const stats = useMemo(() => priceOf(reco, cat, type, region || undefined), [reco, cat, type, region]);
  const [price, setPrice] = useState<number>(p0 ?? priceOf(r0, c0, 'ini')?.prix?.med ?? 800);
  const [rights, setRights] = useState(1200);
  const [status, setStatus] = useState(st0);
  const [other, setOther] = useState(0);
  const out = cpfShare({ price, rights, exempt: status !== 'salarie', other });
  const cats = CERTS.filter((c) => c.reco === reco && c.ini?.prix).map((c) => c.cat);
  const regs = Object.entries(REGIONS);
  const pick = (r: Reco, c: string, t: 'ini' | 'rec', g: string) => { const s = priceOf(r, c, t, g || undefined); if (s?.prix) setPrice(s.prix.med); };
  return (
    <div className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-reco`} label={fr ? 'Recommandation' : 'Recommendation'} value={reco} onChange={(v) => { const r = v as Reco; const c = CERTS.find((x) => x.reco === r && x.ini?.prix)!.cat; setReco(r); setCat(c); pick(r, c, type, region); }} options={RECOS.map((k) => ({ value: k, label: NAME[lang][k] }))} />
        <SelectField id={`${idPrefix}-cat`} label={fr ? 'Catégorie' : 'Category'} value={cat} onChange={(v) => { setCat(v); pick(reco, v, type, region); }} options={cats.map((c) => ({ value: c, label: catLabel(c, lang) }))} />
        <SelectField id={`${idPrefix}-type`} label={fr ? 'Formation' : 'Course'} value={type} onChange={(v) => { const t = v as 'ini' | 'rec'; setType(t); pick(reco, cat, t, region); }} options={[{ value: 'ini', label: fr ? 'Initiale (premier CACES)' : 'Initial (first CACES)' }, { value: 'rec', label: fr ? 'Recyclage' : 'Refresher' }]} />
        <SelectField id={`${idPrefix}-region`} label={fr ? 'Région' : 'Region'} value={region} onChange={(v) => { setRegion(v); pick(reco, cat, type, v); }} options={[{ value: '', label: fr ? 'Toute la France' : 'All of France' }, ...regs.map(([k, n]) => ({ value: k, label: n }))]} />
        <NumberField id={`${idPrefix}-price`} label={fr ? 'Prix de la formation retenue' : 'Price of the chosen course'} value={price} onChange={setPrice} unit="€" max={20000} tag={fr ? 'fr-FR' : 'en-GB'} />
        <NumberField id={`${idPrefix}-rights`} label={fr ? 'Droits CPF disponibles' : 'CPF balance available'} value={rights} onChange={setRights} unit="€" max={20000} tag={fr ? 'fr-FR' : 'en-GB'} />
        <SelectField id={`${idPrefix}-status`} label={fr ? 'Votre situation' : 'Your situation'} value={status} onChange={(v) => setStatus(v as typeof status)} options={[{ value: 'salarie', label: fr ? 'Salarié ou indépendant' : 'Employee or self-employed' }, { value: 'chomeur', label: fr ? 'Demandeur d’emploi' : 'Jobseeker' }, { value: 'abonde', label: fr ? 'Abondement de l’employeur' : 'Employer top-up' }]} />
        <NumberField id={`${idPrefix}-other`} label={fr ? 'Autre financement (employeur, OPCO, France Travail…)' : 'Other funding (employer, OPCO, France Travail…)'} value={other} onChange={setOther} unit="€" max={20000} tag={fr ? 'fr-FR' : 'en-GB'} />
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-lg bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">{fr ? 'Reste à votre charge' : 'Left for you to pay'}</p>
        <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{eur(out.rest, lang)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Payé par le CPF' : 'Paid by the CPF'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{eur(out.cpf, lang)}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Participation forfaitaire' : 'Flat contribution'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{eur(out.participation, lang)}</td></tr>
          {out.other > 0 && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Autre financement' : 'Other funding'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{eur(out.other, lang)}</td></tr>}
          {stats?.prix && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? `Prix médian${stats.national ? '' : ' (région)'}` : `Median price${stats.national ? '' : ' (region)'}`}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{eur(stats.prix.med, lang)}</td></tr>}
          {stats?.prix && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Moitié des offres entre' : 'Middle half of offers'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{eur(stats.prix.q1, lang)} – {eur(stats.prix.q3, lang)}</td></tr>}
          {stats?.heures && <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Durée médiane' : 'Median length'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{stats.heures.med}{NB}h</td></tr>}
        </tbody></table>
        <p className="mt-2 text-xs text-navy-700">
          {out.capped && (fr ? `Plafond CPF de ${eur(P.cpf.rsCap, lang)} atteint pour un CACES. ` : `CPF cap of ${eur(P.cpf.rsCap, lang)} reached for a CACES. `)}
          {stats?.prix ? (fr ? `${stats.offers} offres ${stats.national ? 'en France' : 'dans la région'}, catalogue CPF du ${dl(CPF_DATE, lang)}.` : `${stats.offers} offers ${stats.national ? 'in France' : 'in the region'}, CPF catalogue of ${dl(CPF_DATE, lang)}.`) : (fr ? 'Pas assez d’offres pour un prix régional : prix national affiché.' : 'Too few offers for a regional price: national price shown.')}
        </p>
      </div>
    </div>
  );
}
