/**
 * Dates du CACES :
 * - variant 'validity' : date d'obtention → échéance (5 ans, 10 ans en R.482), date conseillée pour
 *   réserver le recyclage, et limite de l'autorisation de conduite avec l'attestation médicale (5 ans) ;
 * - variant 'echec' : date de réussite d'une partie → date limite pour passer l'autre (12 mois), et
 *   date limite d'extension à une autre catégorie après un CACES initial (12 mois).
 * Premier rendu : jour du build (__BUILD_DAY__), puis le jour du navigateur après le montage (§17.4).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { validity, authorisation, keepPartUntil, extensionUntil, daysBetween, isIso } from '../../lib/engine/dates';
import { RECOS, type Reco } from '../../lib/engine/exam';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;
type Lang = 'fr' | 'en';
const NB = ' ';
const NAME: Record<Lang, Record<Reco, string>> = {
  fr: { r489: 'R489 · chariots (5 ans)', r482: 'R482 · engins de chantier (10 ans)', r486: 'R486 · nacelles (5 ans)', r490: 'R490 · grue de chargement (5 ans)', r485: 'R485 · gerbeurs accompagnants (5 ans)' },
  en: { r489: 'R489 · forklifts (5 years)', r482: 'R482 · construction machinery (10 years)', r486: 'R486 · aerial lifts (5 years)', r490: 'R490 · lorry loader crane (5 years)', r485: 'R485 · pedestrian stackers (5 years)' },
};
const dl = (iso: string, lang: Lang) => { const s = new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); return lang === 'fr' ? s.replace(/^1 /, '1er ') : s; };
const inputCls = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';

export default function ValidityTool({ lang = 'fr', reco: r0 = 'r489', variant = 'validity', idPrefix = 'v' }: { lang?: Lang; reco?: Reco; variant?: 'validity' | 'echec'; idPrefix?: string }) {
  const fr = lang === 'fr';
  const [today, setToday] = useState(__BUILD_DAY__);
  const [reco, setReco] = useState<Reco>(r0);
  const [got, setGot] = useState(variant === 'echec' ? '2026-09-15' : '2022-03-14');
  const [med, setMed] = useState('2025-11-20');
  const [lead, setLead] = useState('3');
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); }, []);
  const ok = isIso(got) && (variant === 'echec' || isIso(med));
  const v = useMemo(() => (ok ? validity(reco, got, today, Number(lead)) : null), [ok, reco, got, today, lead]);
  const au = useMemo(() => (ok && variant === 'validity' ? authorisation(reco, got, med) : null), [ok, reco, got, med, variant]);
  const keep = ok ? keepPartUntil(got) : null;
  const ext = ok ? extensionUntil(got) : null;
  const days = (iso: string) => daysBetween(today, iso);
  const left = (iso: string) => { const d = days(iso); return d < 0 ? (fr ? `dépassée depuis ${-d}${NB}jours` : `passed ${-d} days ago`) : fr ? `dans ${d}${NB}jours` : `in ${d} days`; };
  const field = (id: string, label: string, val: string, set: (s: string) => void) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={`self-start ${inputCls}`} /><span aria-hidden="true" /></div>
  );
  return (
    <div className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-reco`} label={fr ? 'Recommandation' : 'Recommendation'} value={reco} onChange={(x) => setReco(x as Reco)} options={RECOS.map((k) => ({ value: k, label: NAME[lang][k] }))} />
        {variant === 'validity' ? <>
          {field('got', fr ? 'Date d’obtention du CACES' : 'Date CACES obtained', got, setGot)}
          {field('med', fr ? 'Date de l’attestation médicale' : 'Medical certificate date', med, setMed)}
          <SelectField id={`${idPrefix}-lead`} label={fr ? 'Réserver le recyclage' : 'Book the refresher'} value={lead} onChange={setLead} options={['1', '2', '3', '6'].map((m) => ({ value: m, label: fr ? `${m}${NB}mois avant` : `${m} month${m === '1' ? '' : 's'} before` }))} />
        </> : field('got', fr ? 'Date de réussite de la partie obtenue' : 'Date you passed the first part', got, setGot)}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-lg bg-navy-50 p-4">
        {!ok ? <p className="text-sm text-navy-700">{fr ? 'Saisissez une date complète.' : 'Enter a full date.'}</p> : variant === 'validity' && v && au ? <>
          <p className="text-sm font-medium text-navy-600">{fr ? 'Échéance du CACES' : 'CACES expiry'}</p>
          <p className={`mt-1 text-2xl font-bold ${v.state === 'expired' ? 'text-red-700' : 'text-navy-900'}`}>{dl(v.end, lang)}</p>
          <p className="text-sm text-navy-700">{left(v.end)}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Réserver le recyclage avant' : 'Book the refresher by'}</td><td className="py-1.5 text-right text-navy-900">{dl(v.bookBy, lang)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Fin de l’attestation médicale' : 'Medical certificate ends'}</td><td className="py-1.5 text-right text-navy-900">{dl(au.medical, lang)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Autorisation de conduite à revoir' : 'Authorisation to review'}</td><td className="py-1.5 text-right font-semibold text-navy-900">{dl(au.limit, lang)}</td></tr>
          </tbody></table>
          <p className="mt-2 text-xs text-navy-700">{au.limitedBy === 'medical'
            ? (fr ? 'L’attestation médicale expire avant le CACES : c’est elle qui limite l’autorisation de conduite.' : 'The medical certificate expires before the CACES: it is what limits the operating authorisation.')
            : (fr ? 'Le CACES expire avant l’attestation médicale : il faut repasser le test pour garder l’autorisation.' : 'The CACES expires before the medical certificate: you must retake the test to keep the authorisation.')}
            {med < P.medical.since && (fr ? ` Un avis d’aptitude daté d’avant le 1er octobre 2025 tient lieu d’attestation pendant ${P.medical.oldAvisUntilYears}${NB}ans.` : ` A fitness opinion dated before 1 October 2025 counts as the certificate for ${P.medical.oldAvisUntilYears} years.`)}</p>
        </> : keep && ext && <>
          <p className="text-sm font-medium text-navy-600">{fr ? 'Passer l’autre partie au plus tard le' : 'Sit the other part by'}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900">{dl(keep, lang)}</p>
          <p className="text-sm text-navy-700">{left(keep)}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Partie acquise pendant' : 'Part kept for'}</td><td className="py-1.5 text-right text-navy-900">{fr ? `${P.test.keepPassedPartMonths}${NB}mois` : `${P.test.keepPassedPartMonths} months`}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-600">{fr ? 'Si c’était un CACES complet : autre catégorie avant' : 'If it was a full CACES: other category by'}</td><td className="py-1.5 text-right text-navy-900">{dl(ext, lang)}</td></tr>
          </tbody></table>
          <p className="mt-2 text-xs text-navy-700">{fr ? 'Le bénéfice de la partie réussie vaut auprès du même organisme testeur. Passé ce délai, il faut repasser la théorie et la pratique.' : 'The passed part is kept with the same testing body. After this date, both theory and practical must be sat again.'}</p>
        </>}
      </div>
    </div>
  );
}
