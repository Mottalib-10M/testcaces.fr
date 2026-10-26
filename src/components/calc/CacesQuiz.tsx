/**
 * Test théorique CACES blanc et entraînement (outil principal du site).
 * - examen blanc : 100 questions tirées selon le barème de la fiche d'évaluation de la recommandation,
 *   60 minutes (1 unité de test = 1 heure ± 10 min), correction à la fin, notation officielle
 *   (70/100 et la moitié des points de chaque thème) ;
 * - entraînement : un thème, un point de grille ou une catégorie, correction à chaque réponse ;
 * - révision des erreurs : les questions manquées, gardées dans ce navigateur (localStorage).
 * Premier rendu = les questions tirées au build pour cette page (RECETTE §17.5). Rien n'est envoyé.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import Picto from '../ui/Picto';
import { buildExam, buildPractice, score, themeKeyOf, itemOf, GRIDS, RECOS, TEST, PASS, themeMin, type Question, type Reco } from '../../lib/engine/exam';
import { PLAQUES } from '../../lib/engine/physique';
import { loadBank } from '../../lib/bank';
import { readParams, updateURL } from '../../lib/url-state';

type Lang = 'en' | 'fr';
type Mode = 'exam' | 'practice' | 'errors';
const NB = ' ';
const KEY = 'fr-caces-v1';
interface Store { wrong: string[]; seen: number; runs: Array<{ reco: Reco; at: string; got: number; max: number; pass: boolean }> }
const readStore = (): Store => { try { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); return { wrong: s.wrong ?? [], seen: s.seen ?? 0, runs: s.runs ?? [] }; } catch { return { wrong: [], seen: 0, runs: [] }; } };
const writeStore = (s: Store) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* navigation privée : rien n'est gardé */ } };

const RECO_NAME: Record<Lang, Record<Reco, string>> = {
  fr: { r489: 'R489 · chariots élévateurs', r482: 'R482 · engins de chantier', r486: 'R486 · nacelles (PEMP)', r490: 'R490 · grue de chargement', r485: 'R485 · gerbeurs accompagnants' },
  en: { r489: 'R489 · forklifts', r482: 'R482 · construction machinery', r486: 'R486 · MEWPs (aerial lifts)', r490: 'R490 · lorry loader crane', r485: 'R485 · pedestrian stackers' },
};
const T = {
  fr: {
    reco: 'Recommandation', theme: 'Thème', allThemes: 'Tous les thèmes', q: (i: number, n: number) => `Question ${i} sur ${n}`,
    next: 'Suivante', prev: 'Précédente', finish: 'Voir mon résultat', again: 'Nouvel examen blanc', againP: 'Nouvelle série', loading: 'Chargement des questions…',
    right: 'Bonne réponse.', wrong: 'Mauvaise réponse.', answer: `Bonne réponse${NB}:`, score: 'Votre note', answered: 'questions répondues',
    feedback: 'Correction', asYouGo: 'À chaque question', atEnd: 'À la fin', hidden: 'Réponse enregistrée. La correction vient à la fin, comme le jour du test.',
    passRule: `Réussite${NB}: 70 sur 100 et la moitié des points dans chaque thème`, practice: (n: number) => `Série d’entraînement de ${n} questions, correction immédiate`,
    status: { start: 'Choisissez une réponse pour commencer', on: 'En bonne voie', fail: 'Sous le seuil', pass: 'Test réussi', failTheme: 'Échec : un thème sous la moyenne', practiceDone: 'Série terminée', empty: 'Aucune erreur enregistrée' },
    byTheme: 'Note par thème (minimum)', review: 'Questions manquées', none: 'Aucune erreur.', timeLeft: 'Temps restant', timeUp: 'Temps écoulé : le test est noté tel quel, une question sans réponse vaut 0.',
    ref: 'Point du référentiel', plaque: 'Plaque de charge (fictive, pour l’exercice)', height: 'Hauteur', cdg: 'Centre de gravité',
    errorsEmpty: 'Vous n’avez pas encore de question manquée dans ce navigateur pour cette recommandation. Faites un examen blanc ou une série : chaque erreur viendra ici jusqu’à ce que vous y répondiez juste.',
    progress: 'Votre progression (dans ce navigateur)', runs: (n: number) => `${n} examen${n > 1 ? 's' : ''} blanc${n > 1 ? 's' : ''} terminé${n > 1 ? 's' : ''}`, best: 'Meilleure note', toReview: 'Questions à revoir', clear: 'Effacer ma progression',
    note: 'Questions écrites par Radif Partners à partir des recommandations de l’Assurance Maladie. Ce n’est pas le test officiel, qui se passe dans un organisme testeur certifié. Vos réponses restent dans ce navigateur.',
    pts: 'pts',
  },
  en: {
    reco: 'Recommendation', theme: 'Theme', allThemes: 'All themes', q: (i: number, n: number) => `Question ${i} of ${n}`,
    next: 'Next', prev: 'Previous', finish: 'See my result', again: 'New mock exam', againP: 'New set', loading: 'Loading the questions…',
    right: 'Correct.', wrong: 'Wrong answer.', answer: 'Right answer:', score: 'Your score', answered: 'questions answered',
    feedback: 'Marking', asYouGo: 'After each question', atEnd: 'At the end', hidden: 'Answer recorded. Marking comes at the end, as on test day.',
    passRule: 'Pass: 70 out of 100 and half the points in every theme', practice: (n: number) => `Practice set of ${n} questions, marked as you go`,
    status: { start: 'Pick an answer to start', on: 'On track', fail: 'Below the pass mark', pass: 'Test passed', failTheme: 'Fail: one theme below half marks', practiceDone: 'Set finished', empty: 'No mistakes saved yet' },
    byTheme: 'Score by theme (minimum)', review: 'Questions you missed', none: 'No mistakes.', timeLeft: 'Time left', timeUp: 'Time is up: the test is marked as it stands, an unanswered question scores 0.',
    ref: 'Syllabus point', plaque: 'Load chart (fictitious, for the exercise)', height: 'Height', cdg: 'Load centre',
    errorsEmpty: 'You have no missed question saved in this browser for this recommendation yet. Take a mock exam or a practice set: every mistake will come here until you answer it correctly.',
    progress: 'Your progress (in this browser)', runs: (n: number) => `${n} mock exam${n > 1 ? 's' : ''} completed`, best: 'Best score', toReview: 'Questions to review', clear: 'Clear my progress',
    note: 'Questions written by Radif Partners from the French Health Insurance recommendations. This is not the official test, which is sat at a certified testing body and is in French. Your answers stay in this browser.',
    pts: 'pts',
  },
} as const;

interface Props {
  lang?: Lang; reco: Reco; mode?: Mode; theme?: string | null; item?: string; match?: string;
  initial: Question[]; seed: number; recoSelect?: boolean; idPrefix?: string; size?: number;
}

function PlateTable({ id, lang }: { id: string; lang: Lang }) {
  const p = PLAQUES[id];
  if (!p) return null;
  const L = T[lang];
  const nf = (v: number, d = 0) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v).replace(/ /g, NB);
  const single = p.cols.length === 1;
  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-navy-200 bg-navy-50 p-3">
      <p className="text-xs font-semibold text-navy-800">{L.plaque} · {p[lang]}</p>
      <table className="mt-2 w-full text-sm tabular-nums">
        <thead><tr><th scope="col" className="px-2 py-1 text-left text-xs text-navy-700">{single ? (lang === 'fr' ? 'Portée (m)' : 'Outreach (m)') : `${L.height} (m) \\ ${L.cdg} (mm)`}</th>{single ? <th scope="col" className="px-2 py-1 text-right text-xs text-navy-700">kg</th> : p.cols.map((c) => <th key={c} scope="col" className="px-2 py-1 text-right text-xs text-navy-700">{nf(c)}</th>)}</tr></thead>
        <tbody>{p.rows.map(([h, v]) => <tr key={h} className="border-t border-navy-200"><th scope="row" className="px-2 py-1 text-left font-medium text-navy-800">{single ? nf(h, 1) : `≤${NB}${nf(h, 1)}`}</th>{v.map((x, i) => <td key={i} className="px-2 py-1 text-right text-navy-900">{nf(x)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function CacesQuiz({ lang = 'fr', reco: r0, mode = 'exam', theme: t0 = null, item, match, initial, seed: s0, recoSelect = false, idPrefix = 'q', size = 20 }: Props) {
  const L = T[lang];
  const [reco, setReco] = useState<Reco>(r0);
  const [theme, setTheme] = useState<string | null>(t0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [answers, setAnswers] = useState<Array<number | null>>(() => initial.map(() => null));
  const [cur, setCur] = useState(0);
  const [instant, setInstant] = useState(mode !== 'exam');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [store, setStore] = useState<Store>({ wrong: [], seen: 0, runs: [] });
  const started = useRef<number | null>(null);
  const seedRef = useRef(s0);
  const saved = useRef(false);
  const isExam = mode === 'exam';
  const re = match ? new RegExp(match, 'i') : undefined;

  const draw = async (r: Reco, th: string | null, seed: number, st?: Store) => {
    setLoading(true);
    const bank = await loadBank();
    const ids = mode === 'errors' ? (st ?? readStore()).wrong : undefined;
    const next = isExam ? buildExam(bank, r, seed) : buildPractice(bank, r, th, seed, mode === 'errors' ? 100 : size, { item, match: re, ids });
    seedRef.current = seed; saved.current = false;
    setQs(next); setAnswers(next.map(() => null)); setCur(0); setDone(false); setLoading(false); started.current = null; setLeft(null);
  };
  useEffect(() => {
    const st = readStore(); setStore(st);
    const u = readParams(window.location.search);
    const s = Number(u.get('seed')); const rr = u.get('reco') as Reco | null;
    const r = recoSelect && rr && RECOS.includes(rr) ? rr : r0;
    if (r !== r0) setReco(r);
    if (mode === 'errors' || (s && s !== s0) || r !== r0) draw(r, t0, s || s0, st);
  }, []);
  useEffect(() => { // chronomètre : démarre à la première réponse, arrête l'épreuve à zéro
    if (!isExam || done) return;
    const id = window.setInterval(() => {
      if (started.current == null) return;
      const rem = TEST.minutes * 60 - Math.floor((Date.now() - started.current) / 1000);
      setLeft(Math.max(0, rem)); if (rem <= 0) setDone(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isExam, done]);

  const n = qs.length;
  const sc = score(qs, answers, reco);
  const answeredN = answers.filter((a) => a !== null).length;
  const wrongN = answeredN - sc.got;
  const showAll = instant || done;
  const full = isExam && n === TEST.questions;
  const status: keyof typeof L.status = mode === 'errors' && !n ? 'empty' : !answeredN ? 'start'
    : (done || answeredN === n) ? (isExam ? (sc.pass ? 'pass' : sc.got * 100 >= PASS * n ? 'failTheme' : 'fail') : 'practiceDone')
    : !showAll ? 'start' : wrongN * 100 > (100 - PASS) * n ? 'fail' : 'on';

  // Progression locale : erreurs à revoir (retirées dès qu'on y répond juste) et examens terminés.
  const record = (q: Question, ok: boolean) => setStore((s) => {
    const wrong = ok ? s.wrong.filter((x) => x !== q.id) : s.wrong.includes(q.id) ? s.wrong : [...s.wrong, q.id];
    const next = { ...s, wrong, seen: s.seen + 1 }; writeStore(next); return next;
  });
  useEffect(() => {
    if (!done || saved.current) return;
    saved.current = true;
    setStore((s) => {
      let wrong = [...s.wrong];
      qs.forEach((q, i) => { const ok = answers[i] === q.answer; wrong = ok ? wrong.filter((x) => x !== q.id) : wrong.includes(q.id) ? wrong : [...wrong, q.id]; });
      const runs = full ? [...s.runs, { reco, at: new Date().toISOString().slice(0, 10), got: sc.got, max: n, pass: sc.pass }].slice(-30) : s.runs;
      const next = { ...s, wrong, runs }; writeStore(next); return next;
    });
  }, [done]);

  const q = qs[cur];
  const a = q ? answers[cur] : null;
  const choose = (i: number) => {
    if (!q || done || (showAll && a !== null)) return;
    if (started.current == null) started.current = Date.now();
    setAnswers((o) => o.map((x, j) => (j === cur ? i : x)));
    if (showAll) record(q, i === q.answer);
    if (!showAll && cur < n - 1) window.setTimeout(() => setCur((c) => Math.min(c + 1, n - 1)), 250);
  };
  const newTest = () => { const s = Math.floor(Math.random() * 2 ** 31); updateURL({ seed: s, reco: recoSelect && reco !== r0 ? reco : undefined }); draw(reco, theme, s); };
  const mm = left == null ? TEST.minutes * 60 : left;
  const clock = `${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}`;
  const good = status === 'pass' || status === 'on' || status === 'practiceDone';
  const tone = status === 'start' || status === 'empty' ? 'text-navy-700' : good ? 'text-green-800' : 'text-red-700';
  const tx = (x: Question) => x[lang];
  const refOf = (x: Question) => { const k = x.points[reco]; const it = k ? itemOf(reco, k) : undefined; return it ? `${reco.toUpperCase().replace('R', 'R.')} · ${it.theme[lang]} · ${it.item[lang]}` : ''; };
  const runs = store.runs.filter((x) => x.reco === reco);
  const best = runs.reduce((m, x) => Math.max(m, x.got), 0);
  const toReview = store.wrong.length;

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {(recoSelect || mode === 'practice' && !item && !match) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {recoSelect && <SelectField id={`${idPrefix}-reco`} label={L.reco} value={reco} onChange={(v) => { const r = v as Reco; setReco(r); setTheme(null); updateURL({ reco: r === r0 ? undefined : r }); draw(r, null, seedRef.current); }} options={RECOS.map((k) => ({ value: k, label: RECO_NAME[lang][k] }))} />}
            {mode === 'practice' && !item && !match && <SelectField id={`${idPrefix}-theme`} label={L.theme} value={theme ?? ''} onChange={(v) => { const th = v || null; setTheme(th); draw(reco, th, seedRef.current); }} options={[{ value: '', label: L.allThemes }, ...GRIDS[reco].themes.map((t) => ({ value: t.key, label: `${t[lang]} (${t.points}${NB}${L.pts})` }))]} />}
          </div>
        )}
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-navy-700">
            <span>{n ? L.q(cur + 1, n) : RECO_NAME[lang][reco]}{q ? ` · ${GRIDS[reco].themes.find((t) => t.key === themeKeyOf(q, reco))?.[lang] ?? ''}` : ''}</span>
            {isExam && (
              <span className="inline-grid grid-flow-col auto-cols-fr overflow-hidden rounded-lg border border-navy-300 text-xs" role="group" aria-label={L.feedback}>
                <button type="button" aria-pressed={!instant} onClick={() => setInstant(false)} className={`h-full px-2.5 py-1.5 ${!instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.atEnd}</button>
                <button type="button" aria-pressed={instant} onClick={() => setInstant(true)} className={`h-full px-2.5 py-1.5 ${instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.asYouGo}</button>
              </span>
            )}
          </div>
          {loading && <p className="mt-3 text-navy-700">{L.loading}</p>}
          {!loading && mode === 'errors' && !n && <p className="mt-3 text-navy-800">{L.errorsEmpty}</p>}
          {q && !loading && (
            <fieldset className="mt-3">
              <legend className="text-lg font-semibold leading-snug text-navy-900">{tx(q).q}</legend>
              {q.img && <div className="mt-3"><Picto id={q.img} size={104} label={lang === 'fr' ? 'Panneau ou pictogramme de la question' : 'Sign or pictogram for this question'} /></div>}
              {q.plaque && <PlateTable id={q.plaque} lang={lang} />}
              <div className="mt-4 grid gap-2">
                {tx(q).o.map((o, i) => {
                  const picked = a === i, isRight = i === q.answer, shown = showAll && a !== null;
                  const cls = !shown ? (picked ? 'border-accent-700 bg-accent-50 text-navy-900' : 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50') : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                  return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}><span className="mr-2 font-semibold">{'ABCD'[i]}.</span>{o}</button>;
                })}
              </div>
              {a !== null && (
                <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                  {showAll ? <><p><strong>{a === q.answer ? L.right : L.wrong}</strong>{a !== q.answer && <> {L.answer} {tx(q).o[q.answer]}.</>} {tx(q).x}</p><p className="mt-1 text-xs text-navy-600">{L.ref}{lang === 'fr' ? `${NB}: ` : ': '}{refOf(q)}</p></> : <p>{L.hidden}</p>}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.prev}</button>}
                {cur < n - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
                {!done && answeredN > 0 && (cur === n - 1 || answeredN === n) && <button type="button" onClick={() => setDone(true)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.finish}</button>}
                {mode !== 'errors' && <button type="button" onClick={newTest} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{isExam ? L.again : L.againP}</button>}
              </div>
              {isExam && n > 1 && (
                <nav className="mt-4 flex flex-wrap gap-1" aria-label={lang === 'fr' ? 'Aller à la question' : 'Go to question'}>
                  {qs.map((x, i) => {
                    const st = answers[i] === null ? 'border-navy-200 bg-white text-navy-700' : !showAll ? 'border-accent-300 bg-accent-50 text-navy-900' : answers[i] === x.answer ? 'border-green-600 bg-green-50 text-green-900' : 'border-red-600 bg-red-50 text-red-900';
                    return <button key={x.id} type="button" onClick={() => setCur(i)} aria-current={i === cur ? 'true' : undefined} className={`h-8 w-8 rounded border text-xs tabular-nums ${st} ${i === cur ? 'ring-2 ring-accent-500' : ''}`}>{i + 1}</button>;
                  })}
                </nav>
              )}
            </fieldset>
          )}
        </div>
        {done && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            {left === 0 && <p className="mb-2 font-medium text-red-700">{L.timeUp}</p>}
            <p className="font-semibold text-navy-900">{L.review}</p>
            {qs.every((x, i) => answers[i] === x.answer) ? <p className="mt-2 text-navy-700">{L.none}</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{qs.map((x, i) => (answers[i] !== x.answer ? <li key={x.id}><span className="font-medium">{tx(x).q}</span> {L.answer} {tx(x).o[x.answer]}. <span className="text-navy-700">{tx(x).x}</span></li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.score} · {RECO_NAME[lang][reco]}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{showAll ? sc.got : answeredN}<span className="text-xl font-semibold text-navy-700"> / {showAll ? Math.max(answeredN, 0) : n}</span></p>
        <p className="text-sm text-navy-700">{answeredN} / {n} {L.answered}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(answeredN / Math.max(1, n)) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${tone}`}>{L.status[status]}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-700">{isExam ? L.passRule : L.practice(n)}</td></tr>
          {isExam && <tr><td className="tabular-nums py-1.5 text-navy-700">{L.timeLeft}{lang === 'fr' ? `${NB}: ` : ': '}{clock}</td></tr>}
        </tbody></table>
        {(done || showAll) && answeredN > 0 && sc.themes.length > 0 && (
          <div className="mt-3"><p className="text-sm font-semibold text-navy-900">{L.byTheme}</p>
            <ul className="mt-1 space-y-1 text-xs text-navy-700">{sc.themes.map((b) => <li key={b.key} className="flex justify-between gap-2"><span>{b[lang]}</span><span className={`tabular-nums ${b.ok ? '' : 'font-semibold text-red-700'}`}>{b.got}/{b.max} ({themeMin(b.max)})</span></li>)}</ul></div>
        )}
        <div className="mt-3 border-t border-accent-200 pt-3 text-xs text-navy-700">
          <p className="font-semibold text-navy-900">{L.progress}</p>
          <p className="mt-1">{L.runs(runs.length)}{runs.length ? ` · ${L.best}${lang === 'fr' ? `${NB}: ` : ': '}${best}/100` : ''}</p>
          <p>{L.toReview}{lang === 'fr' ? `${NB}: ` : ': '}<span className="tabular-nums">{toReview}</span></p>
          {(runs.length > 0 || toReview > 0) && <button type="button" onClick={() => { const e = { wrong: [], seen: 0, runs: [] }; writeStore(e); setStore(e); }} className="mt-1 underline">{L.clear}</button>}
        </div>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
