/**
 * Questions et réponses, thème par thème : chaque question avec ses propositions, la bonne réponse,
 * le corrigé et le point du référentiel (dans le HTML, <details> natif lisible sans JavaScript).
 * Premier rendu = la recommandation et le thème choisis pour la page au build.
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import Picto from '../ui/Picto';
import { loadBank } from '../../lib/bank';
import { GRIDS, RECOS, inReco, themeKeyOf, itemOf, type Question, type Reco } from '../../lib/engine/exam';

type Lang = 'fr' | 'en';
const NB = ' ';
const NAME: Record<Lang, Record<Reco, string>> = {
  fr: { r489: 'R489 · chariots', r482: 'R482 · engins de chantier', r486: 'R486 · nacelles', r490: 'R490 · grue de chargement', r485: 'R485 · gerbeurs accompagnants' },
  en: { r489: 'R489 · forklifts', r482: 'R482 · construction machinery', r486: 'R486 · aerial lifts', r490: 'R490 · lorry loader crane', r485: 'R485 · pedestrian stackers' },
};

export default function BankBrowser({ lang = 'fr', reco: r0, theme: t0, initial, idPrefix = 'b' }: { lang?: Lang; reco: Reco; theme: string; initial: Question[]; idPrefix?: string }) {
  const fr = lang === 'fr';
  const [reco, setReco] = useState<Reco>(r0);
  const [theme, setTheme] = useState(t0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [loading, setLoading] = useState(false);
  const reload = async (r: Reco, t: string) => {
    setReco(r); setTheme(t); setLoading(true);
    const all = await loadBank();
    setQs(all.filter((q) => inReco(q, r) && themeKeyOf(q, r) === t)); setLoading(false);
  };
  const th = GRIDS[reco].themes.find((t) => t.key === theme);
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-reco`} label={fr ? 'Recommandation' : 'Recommendation'} value={reco} onChange={(v) => { const r = v as Reco; reload(r, GRIDS[r].themes[0].key); }} options={RECOS.map((k) => ({ value: k, label: NAME[lang][k] }))} />
          <SelectField id={`${idPrefix}-theme`} label={fr ? 'Thème' : 'Theme'} value={theme} onChange={(v) => reload(reco, v)} options={GRIDS[reco].themes.map((t) => ({ value: t.key, label: `${t[lang]} (${t.points}${NB}pts)` }))} />
        </form>
        {loading ? <p className="mt-4 text-navy-700">{fr ? 'Chargement…' : 'Loading…'}</p> : (
          <ol className="mt-4 space-y-2">
            {qs.map((q, i) => {
              const it = q.points[reco] ? itemOf(reco, q.points[reco]!) : undefined;
              return (
                <li key={q.id}>
                  <details className="rounded-lg border border-navy-200 bg-white">
                    <summary className="cursor-pointer px-4 py-3 font-medium text-navy-900"><span className="tabular-nums mr-2 text-navy-600">{i + 1}.</span>{q[lang].q}</summary>
                    <div className="px-4 pb-4 text-sm text-navy-800">
                      {q.img && <Picto id={q.img} size={72} label={fr ? 'Panneau ou pictogramme de la question' : 'Sign or pictogram for this question'} />}
                      <ul className="mb-2 mt-1 space-y-1">{q[lang].o.map((o, j) => <li key={j} className={j === q.answer ? 'font-semibold text-green-800' : 'text-navy-700'}>{j === q.answer ? `✓ ${fr ? `Réponse${NB}:` : 'Answer:'} ` : '· '}{o}</li>)}</ul>
                      <p>{q[lang].x}</p>
                      {it && <p className="mt-1 text-xs text-navy-600">{fr ? `Point du référentiel${NB}:` : 'Syllabus point:'} {it.item[lang]}</p>}
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        )}
      </div>
      <div data-resultat className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{NAME[lang][reco]}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{qs.length}</p>
        <p className="text-sm text-navy-700">{fr ? `questions sur le thème «${NB}${th?.fr ?? ''}${NB}»` : `questions on “${th?.en ?? ''}”`}</p>
        <p className="mt-2 text-xs text-navy-700">{fr ? `Ce thème pèse ${th?.points ?? 0}${NB}points sur 100 au test.` : `This theme is worth ${th?.points ?? 0} points out of 100 in the test.`}</p>
      </div>
    </div>
  );
}
