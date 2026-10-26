/**
 * Simulateur de note du test théorique : points obtenus par thème → réussite ou échec selon la règle
 * des recommandations (70 sur 100 au total ET au moins la moitié des points de chaque thème).
 * Le barème des thèmes vient des grilles (annexe 3 de chaque recommandation).
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { GRIDS, RECOS, PASS, verdict, type Reco } from '../../lib/engine/exam';

type Lang = 'fr' | 'en';
const NB = ' ';
const NAME: Record<Lang, Record<Reco, string>> = {
  fr: { r489: 'R489 · chariots', r482: 'R482 · engins de chantier', r486: 'R486 · nacelles', r490: 'R490 · grue de chargement', r485: 'R485 · gerbeurs accompagnants' },
  en: { r489: 'R489 · forklifts', r482: 'R482 · construction machinery', r486: 'R486 · aerial lifts', r490: 'R490 · lorry loader crane', r485: 'R485 · pedestrian stackers' },
};
/** Valeurs de départ : 76 % de chaque thème, sauf le plus gros, à 60 % (cas d'école). */
const defaults = (r: Reco) => { const ts = GRIDS[r].themes; const big = ts.reduce((m, t, i) => (t.points > ts[m].points ? i : m), 0); return ts.map((t, i) => Math.round(t.points * (i === big ? 0.6 : 0.76))); };

export default function ScoreTool({ lang = 'fr', reco: r0 = 'r489', idPrefix = 'n' }: { lang?: Lang; reco?: Reco; idPrefix?: string }) {
  const fr = lang === 'fr';
  const [reco, setReco] = useState<Reco>(r0);
  const [pts, setPts] = useState<number[]>(() => defaults(r0));
  const v = useMemo(() => verdict(reco, pts), [reco, pts]);
  const ts = GRIDS[reco].themes;
  return (
    <div className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-reco`} label={fr ? 'Recommandation' : 'Recommendation'} value={reco} onChange={(x) => { const r = x as Reco; setReco(r); setPts(defaults(r)); }} options={RECOS.map((k) => ({ value: k, label: NAME[lang][k] }))} />
        {ts.map((t, i) => (
          <NumberField key={`${reco}-${t.key}`} id={`${idPrefix}-${t.key}`} label={fr ? `${t.fr} (sur ${t.points})` : `${t.en} (out of ${t.points})`} value={pts[i] ?? 0} max={t.points} unit={fr ? 'points' : 'points'} tag={fr ? 'fr-FR' : 'en-GB'}
            onChange={(x) => setPts((o) => o.map((y, j) => (j === i ? x : y)))} />
        ))}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-lg bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">{fr ? 'Résultat du test théorique' : 'Theory test result'}</p>
        <p className={`mt-1 text-3xl font-bold ${v.pass ? 'text-green-800' : 'text-red-700'}`}>{v.pass ? (fr ? 'Réussi' : 'Pass') : (fr ? 'Échoué' : 'Fail')}</p>
        <p className="tabular-nums mt-1 text-lg font-semibold text-navy-900">{v.total} / 100</p>
        <table className="mt-3 w-full text-sm"><thead><tr><th scope="col" className="text-left text-xs font-medium text-navy-600">{fr ? 'Thème' : 'Theme'}</th><th scope="col" className="text-right text-xs font-medium text-navy-600">{fr ? 'Note / mini' : 'Score / min'}</th></tr></thead>
          <tbody className="divide-y divide-navy-200">{v.rows.map((x) => <tr key={x.key}><td className="py-1.5 pr-2 text-navy-700">{x[lang]}</td><td className={`tabular-nums py-1.5 text-right ${x.ok ? 'text-navy-900' : 'font-semibold text-red-700'}`}>{x.got}/{x.max} · {x.min}</td></tr>)}</tbody></table>
        <p className="mt-2 text-xs text-navy-700">
          {v.pass ? (fr ? `Marge${NB}: ${v.total - PASS} point${v.total - PASS > 1 ? 's' : ''} au-dessus de 70, aucun thème sous la moyenne.` : `Margin: ${v.total - PASS} point${v.total - PASS === 1 ? '' : 's'} above 70, no theme below half marks.`)
            : v.missingTotal > 0 ? (fr ? `Il manque ${v.missingTotal} point${v.missingTotal > 1 ? 's' : ''} pour atteindre 70.` : `${v.missingTotal} more point${v.missingTotal === 1 ? '' : 's'} needed to reach 70.`) : ''}
          {!v.pass && v.failed.length > 0 && (fr ? ` Sous la moyenne${NB}: ${v.failed.map((x) => x.fr).join(', ')}. Ce seul thème suffit à faire échouer le test, même au-dessus de 70.` : ` Below half marks: ${v.failed.map((x) => x.en).join(', ')}. That theme alone fails the test, even above 70.`)}
        </p>
      </div>
    </div>
  );
}
