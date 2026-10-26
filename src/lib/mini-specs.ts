/**
 * Mini-outils des pages (RECETTE §9.3) : un sujet = un calcul, toujours lu dans params-2026.json, les
 * grilles, cpf-caces.json ou les moteurs du site, jamais une seconde formule. Français et anglais ici.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { GRIDS, RECOS, PASS, themeMin, examSize, type Reco } from './engine/exam';
import { cpfShare, cpfRightsAfter, priceOf, CERTS } from './engine/money';
import { readPlate, maxHeight, stopping, PLAQUES } from './engine/physique';
import { money, formatNumberL, pct } from './format-l';

type L = 'en' | 'fr';
const fr = (l: L) => l === 'fr';
const N = (v: number, l: L, d = 0) => formatNumberL(v, l, d);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const s = (n: number) => (n > 1 ? 's' : '');
const RNAME: Record<L, Record<Reco, string>> = {
  fr: { r489: 'R489 chariots', r482: 'R482 engins de chantier', r486: 'R486 nacelles', r490: 'R490 grue de chargement', r485: 'R485 gerbeurs accompagnants' },
  en: { r489: 'R489 forklifts', r482: 'R482 construction machinery', r486: 'R486 aerial lifts', r490: 'R490 loader crane', r485: 'R485 pedestrian stackers' },
};
const recoOpts = (l: L) => RECOS.map((r, i) => ({ value: String(i), label: RNAME[l][r] }));
const yrs = (n: number, l: L) => (fr(l) ? `${N(n, l)} an${n >= 2 ? 's' : ''}` : `${N(n, l)} year${n === 1 ? '' : 's'}`);
const catName = (c: string, l: L) => (c === 'grue' ? (fr(l) ? 'grue de chargement' : 'loader crane') : `${fr(l) ? 'catégorie' : 'category'} ${c}`);

const SPECS: Record<string, (l: L) => MiniSpec> = {
  /** Réussi ou non au total : 70 sur 100. */
  pass: (l) => ({
    title: fr(l) ? 'Ma note suffit-elle au test théorique ?' : 'Is my score enough for the theory test?', cta: fr(l) ? 'Faire un examen blanc de 100 questions' : 'Take a 100-question mock exam', ctaPage: 'examen-blanc',
    inputs: [{ id: 'right', label: fr(l) ? 'Bonnes réponses sur 100' : 'Correct answers out of 100', def: 72, max: examSize(), unit: '/ 100' }],
    run: (v) => {
      const r = clamp(Math.round(v.right ?? 0), 0, 100), ok = r >= PASS;
      return fr(l)
        ? { head: ['Au total', ok ? 'Seuil atteint' : 'Sous le seuil'], rows: [['Seuil', `${PASS} sur 100`], [ok ? 'Marge' : 'Il manque', `${Math.abs(r - PASS)} point${s(Math.abs(r - PASS))}`], ['Erreurs permises au total', `${100 - PASS}`]], note: 'Il faut aussi la moitié des points dans chaque thème : un thème sous la moyenne fait échouer, même à 90.' }
        : { head: ['Overall', ok ? 'Pass mark reached' : 'Below the pass mark'], rows: [['Pass mark', `${PASS} out of 100`], [ok ? 'Margin' : 'Missing', `${Math.abs(r - PASS)} point${Math.abs(r - PASS) === 1 ? '' : 's'}`], ['Mistakes allowed overall', `${100 - PASS}`]], note: 'You also need half the points in every theme: one theme below half fails the test, even at 90.' };
    },
  }),
  /** Erreurs encore permises en cours d'épreuve. */
  errors: (l) => ({
    title: fr(l) ? 'Combien d’erreurs me reste-t-il ?' : 'How many mistakes can I still make?', cta: fr(l) ? 'S’entraîner par thème' : 'Practise by theme', ctaPage: 'questions-reponses',
    inputs: [{ id: 'wrong', label: fr(l) ? 'Erreurs déjà faites' : 'Mistakes made so far', def: 12, max: 100 }],
    run: (v) => {
      const w = clamp(Math.round(v.wrong ?? 0), 0, 100), left = 100 - PASS - w;
      return fr(l)
        ? { head: ['Erreurs encore permises', left < 0 ? 'Aucune' : String(left)], rows: [['Plafond', `${100 - PASS} erreurs sur 100`], ['Note maximale possible', `${100 - w} / 100`]], note: left < 0 ? 'Le seuil de 70 n’est plus atteignable.' : 'Sans compter la règle de la moitié des points par thème.' }
        : { head: ['Mistakes still allowed', left < 0 ? 'None' : String(left)], rows: [['Limit', `${100 - PASS} mistakes out of 100`], ['Best possible score', `${100 - w} / 100`]], note: left < 0 ? 'The mark of 70 can no longer be reached.' : 'Not counting the half-marks-per-theme rule.' };
    },
  }),
  /** Validité selon la recommandation. */
  validite: (l) => ({
    title: fr(l) ? 'Jusqu’à quand mon CACES est-il valable ?' : 'Until when is my CACES valid?', cta: fr(l) ? 'Calculer la date exacte' : 'Work out the exact date', ctaPage: 'duree-validite',
    inputs: [{ id: 'reco', label: fr(l) ? 'Recommandation' : 'Recommendation', def: 0, options: recoOpts(l) }, { id: 'year', label: fr(l) ? 'Année d’obtention' : 'Year obtained', def: 2022, max: 2026 }],
    run: (v) => {
      const r = RECOS[clamp(Math.round(v.reco ?? 0), 0, 4)], y = Math.round(v.year ?? 2022), n = P.recos[r].validityYears, end = y + n;
      return fr(l)
        ? { head: ['Échéance', `${end}`], rows: [['Validité', yrs(n, l)], ['Recyclage', end <= P.year ? 'à faire maintenant' : `avant la date anniversaire de ${end}`]], note: 'Date exacte : même jour et même mois que l’obtention.' }
        : { head: ['Expiry', `${end}`], rows: [['Valid for', yrs(n, l)], ['Refresher', end <= P.year ? 'due now' : `before the ${end} anniversary`]], note: 'Exact date: same day and month as when it was obtained.' };
    },
  }),
  /** Reste à charge avec le CPF. */
  cpf: (l) => ({
    title: fr(l) ? 'Combien me coûte un CACES avec mon CPF ?' : 'What does a CACES cost me with my CPF?', cta: fr(l) ? 'Comparer les prix par catégorie et région' : 'Compare prices by category and region', ctaPage: 'caces-prix',
    inputs: [{ id: 'price', label: fr(l) ? 'Prix de la formation' : 'Course price', def: 800, unit: '€', max: 20000 }, { id: 'rights', label: fr(l) ? 'Droits CPF' : 'CPF balance', def: 1000, unit: '€', max: 20000 }, { id: 'jobseeker', label: fr(l) ? 'Demandeur d’emploi ?' : 'Jobseeker?', def: 0, options: fr(l) ? [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] }],
    run: (v) => {
      const o = cpfShare({ price: v.price ?? 0, rights: v.rights ?? 0, exempt: (v.jobseeker ?? 0) === 1 });
      return fr(l)
        ? { head: ['Reste à charge', money(o.rest, l)], rows: [['Payé par le CPF', money(o.cpf, l)], ['Dont participation forfaitaire', money(o.participation, l)], ['Plafond CPF pour un CACES', money(P.cpf.rsCap, l)]] }
        : { head: ['Left to pay', money(o.rest, l)], rows: [['Paid by the CPF', money(o.cpf, l)], ['Of which flat contribution', money(o.participation, l)], ['CPF cap for a CACES', money(P.cpf.rsCap, l)]] };
    },
  }),
  /** Droits CPF accumulés. */
  droits: (l) => ({
    title: fr(l) ? 'Combien ai-je sur mon CPF ?' : 'How much is on my CPF?', cta: fr(l) ? 'Calculer le reste à charge' : 'Work out what is left to pay', ctaPage: 'financement',
    inputs: [{ id: 'years', label: fr(l) ? 'Années travaillées à mi-temps ou plus' : 'Years worked at least half-time', def: 3, max: 50 }, { id: 'low', label: fr(l) ? 'Sans diplôme de niveau CAP ?' : 'No vocational qualification (CAP level)?', def: 0, options: fr(l) ? [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] }],
    run: (v) => {
      const low = (v.low ?? 0) === 1, r = cpfRightsAfter(Math.round(v.years ?? 0), low), use = Math.min(r, P.cpf.rsCap);
      return fr(l)
        ? { head: ['Droits estimés', money(r, l)], rows: [['Utilisables pour un CACES', money(use, l)], ['Crédit annuel', money(low ? P.cpf.annualCreditLowQualified : P.cpf.annualCredit, l)], ['Plafond du compte', money(low ? P.cpf.ceilingLowQualified : P.cpf.ceiling, l)]], note: 'Estimation sans formation déjà payée : le solde exact est sur moncompteformation.gouv.fr.' }
        : { head: ['Estimated balance', money(r, l)], rows: [['Usable for a CACES', money(use, l)], ['Yearly credit', money(low ? P.cpf.annualCreditLowQualified : P.cpf.annualCredit, l)], ['Account ceiling', money(low ? P.cpf.ceilingLowQualified : P.cpf.ceiling, l)]], note: 'Estimate with no course already paid: the exact balance is on moncompteformation.gouv.fr.' };
    },
  }),
  /** Lecture d'une plaque de charge fictive. */
  plaque: (l) => ({
    title: fr(l) ? 'Cette charge passe-t-elle sur la plaque ?' : 'Is this load within the load chart?', cta: fr(l) ? 'Questions d’abaque' : 'Load chart questions', ctaPage: 'abaque-de-charge',
    inputs: [
      { id: 'p', label: fr(l) ? 'Plaque (fictive)' : 'Chart (fictitious)', def: 0, options: ['P1', 'P2', 'P3'].map((k, i) => ({ value: String(i), label: `${k} · ${PLAQUES[k][l]}` })) },
      { id: 'mass', label: fr(l) ? 'Masse de la charge' : 'Load mass', def: 1800, unit: 'kg', max: 10000 },
      { id: 'cdg', label: fr(l) ? 'Centre de gravité' : 'Load centre', def: 600, unit: 'mm', max: 2000 },
      { id: 'h', label: fr(l) ? 'Hauteur de levée' : 'Lift height', def: 4, unit: 'm', max: 20, decimals: 1 },
    ],
    run: (v) => {
      const id = ['P1', 'P2', 'P3'][clamp(Math.round(v.p ?? 0), 0, 2)];
      const r = readPlate(id, v.h ?? 0, v.cdg ?? 0), mh = maxHeight(id, v.cdg ?? 0, v.mass ?? 0), ok = !!r && (v.mass ?? 0) <= r.kg;
      return fr(l)
        ? { head: ['Manutention', !r ? 'Hors plaque' : ok ? 'Possible' : 'Interdite'], rows: [['Charge maximale lue', r ? `${N(r.kg, l)} kg` : '–'], ['Hauteur maximale pour cette charge', mh != null ? `${N(mh, l, 1)} m` : 'aucune'], ['Règle', 'ligne et colonne égales ou supérieures']] }
        : { head: ['Handling', !r ? 'Off the chart' : ok ? 'Allowed' : 'Not allowed'], rows: [['Maximum load read', r ? `${N(r.kg, l)} kg` : '–'], ['Maximum height for this load', mh != null ? `${N(mh, l, 1)} m` : 'none'], ['Rule', 'row and column equal or above']] };
    },
  }),
  /** Distance d'arrêt. */
  freinage: (l) => ({
    title: fr(l) ? 'Quelle distance pour m’arrêter ?' : 'How far do I travel before stopping?', cta: fr(l) ? 'Règles de circulation' : 'Traffic rules', ctaPage: 'circulation-signalisation',
    inputs: [
      { id: 'v', label: fr(l) ? 'Vitesse' : 'Speed', def: 12, unit: 'km/h', max: 60 },
      { id: 't', label: fr(l) ? 'Temps de réaction' : 'Reaction time', def: 1, unit: 's', max: 5, decimals: 1, help: fr(l) ? 'Fatigue, téléphone, alcool : il s’allonge.' : 'Tiredness, phone, alcohol: it gets longer.' },
      { id: 'a', label: fr(l) ? 'Décélération (sol, pneus, charge)' : 'Deceleration (floor, tyres, load)', def: 1.5, unit: 'm/s²', max: 10, decimals: 1, help: fr(l) ? 'Hypothèse : plus faible sur sol mouillé ou en pente.' : 'Assumption: lower on a wet floor or a slope.' },
    ],
    run: (v) => {
      const d = stopping(v.v ?? 0, v.t ?? 0, v.a ?? 0);
      return fr(l)
        ? { head: ['Distance d’arrêt', Number.isFinite(d.total) ? `${N(d.total, l, 1)} m` : '–'], rows: [['Pendant la réaction', `${N(d.reaction, l, 1)} m`], ['Pendant le freinage', Number.isFinite(d.braking) ? `${N(d.braking, l, 1)} m` : '–']], note: 'À vitesse doublée, la distance de freinage est multipliée par quatre.' }
        : { head: ['Stopping distance', Number.isFinite(d.total) ? `${N(d.total, l, 1)} m` : '–'], rows: [['While reacting', `${N(d.reaction, l, 1)} m`], ['While braking', Number.isFinite(d.braking) ? `${N(d.braking, l, 1)} m` : '–']], note: 'Double the speed and the braking distance is four times longer.' };
    },
  }),
  /** Autorisation de conduite : CACES et attestation médicale. */
  autorisation: (l) => ({
    title: fr(l) ? 'Mon employeur peut-il m’autoriser à conduire ?' : 'Can my employer authorise me to operate?', cta: fr(l) ? 'Vérifier les dates exactes' : 'Check the exact dates', ctaPage: 'duree-validite',
    inputs: [
      { id: 'reco', label: fr(l) ? 'Recommandation' : 'Recommendation', def: 0, options: recoOpts(l) },
      { id: 'cy', label: fr(l) ? 'Âge du CACES' : 'Age of the CACES', def: 4, unit: fr(l) ? 'ans' : 'years', max: 30, decimals: 1 },
      { id: 'my', label: fr(l) ? 'Âge de l’attestation médicale' : 'Age of the medical certificate', def: 5.5, unit: fr(l) ? 'ans' : 'years', max: 30, decimals: 1 },
    ],
    run: (v) => {
      const r = RECOS[clamp(Math.round(v.reco ?? 0), 0, 4)], cOk = (v.cy ?? 0) < P.recos[r].validityYears, mOk = (v.my ?? 0) < P.medical.attestationYears, ok = cOk && mOk;
      return fr(l)
        ? { head: ['Autorisation', ok ? 'Possible' : 'Pas en l’état'], rows: [['CACES', cOk ? `valable (${yrs(P.recos[r].validityYears, l)})` : 'échu : recyclage'], ['Attestation médicale', mOk ? `valable (${yrs(P.medical.attestationYears, l)})` : 'échue : visite au service de santé au travail'], ['Délivrée par', 'l’employeur, par écrit']] }
        : { head: ['Authorisation', ok ? 'Possible' : 'Not as things stand'], rows: [['CACES', cOk ? `valid (${yrs(P.recos[r].validityYears, l)})` : 'expired: refresher'], ['Medical certificate', mOk ? `valid (${yrs(P.medical.attestationYears, l)})` : 'expired: occupational health visit'], ['Issued by', 'the employer, in writing']] };
    },
  }),
  /** Catégorie R489 selon l'engin. */
  r489cat: (l) => ({
    title: fr(l) ? 'Quelle catégorie de CACES R489 ?' : 'Which R489 CACES category?', cta: fr(l) ? 'Tous les engins' : 'Every machine', ctaPage: 'quel-caces',
    inputs: [
      { id: 'type', label: fr(l) ? 'Type de chariot' : 'Truck type', def: 4, options: (fr(l) ? ['Transpalette ou préparateur au sol', 'Gerbeur à conducteur porté', 'Chariot à plateau porteur', 'Tracteur industriel', 'Chariot frontal en porte-à-faux', 'Chariot à mât rétractable', 'Chariot à poste de conduite élevable'] : ['Pallet truck or low-level picker', 'Ride-on stacker', 'Platform truck', 'Tow tractor', 'Counterbalance forklift', 'Reach truck', 'Elevating operator position truck']).map((x, i) => ({ value: String(i), label: x })) },
      { id: 'cap', label: fr(l) ? 'Capacité nominale ou de traction' : 'Rated or towing capacity', def: 2.5, unit: 't', max: 60, decimals: 1 },
      { id: 'lift', label: fr(l) ? 'Hauteur de levée ou de plancher' : 'Lift or platform height', def: 4, unit: 'm', max: 20, decimals: 2 },
    ],
    run: (v) => {
      const t = Math.round(v.type ?? 0), cap = v.cap ?? 0, h = v.lift ?? 0;
      let c = '', note = '';
      if (t === 0) { c = h <= 1.2 ? '1A' : '1B'; }
      else if (t === 1) c = '1B';
      else if (t === 2) { c = cap <= 2 ? '2A' : ''; note = cap > 2 ? (fr(l) ? 'Plus de 2 t : hors catégorie 2A.' : 'Above 2 t: outside category 2A.') : ''; }
      else if (t === 3) { c = cap <= 25 ? '2B' : ''; note = cap > 25 ? (fr(l) ? 'Plus de 25 t tractées : hors catégorie 2B.' : 'Above 25 t towed: outside category 2B.') : ''; }
      else if (t === 4) c = cap <= 6 ? '3' : '4';
      else if (t === 5) c = '5';
      else c = h > 1.2 ? '6' : '1A';
      if (t === 6 && h <= 1.2) note = fr(l) ? 'Plancher jusqu’à 1,20 m : 1A plus une formation complémentaire.' : 'Platform up to 1.20 m: 1A plus extra training.';
      return fr(l)
        ? { head: ['CACES R489', c ? `Catégorie ${c}` : 'Hors R489'], rows: [['Validité', yrs(P.recos.r489.validityYears, l)], ['Test théorique', 'le même pour toutes les catégories']], note: note || undefined }
        : { head: ['R489 CACES', c ? `Category ${c}` : 'Not R489'], rows: [['Valid for', yrs(P.recos.r489.validityYears, l)], ['Theory test', 'the same for every category']], note: note || undefined };
    },
  }),
  /** Catégorie R485 selon la levée. */
  r485cat: (l) => ({
    title: fr(l) ? 'Quelle catégorie de CACES R485 ?' : 'Which R485 CACES category?', cta: fr(l) ? 'Test R485 blanc' : 'R485 mock test', ctaPage: 'caces-r485',
    inputs: [{ id: 'lift', label: fr(l) ? 'Hauteur de levée du gerbeur' : 'Stacker lift height', def: 3.2, unit: 'm', max: 15, decimals: 2 }, { id: 'platform', label: fr(l) ? 'Plate-forme rabattable pour monter dessus ?' : 'Fold-down platform to ride on?', def: 0, options: fr(l) ? [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] }],
    run: (v) => {
      const h = v.lift ?? 0, pf = (v.platform ?? 0) === 1;
      const res = pf ? (h <= 1.2 ? 'R489 1A' : 'R489 1B') : h <= 1.2 ? (fr(l) ? 'Hors CACES (R.366)' : 'No CACES (R.366)') : h <= 2.5 ? (fr(l) ? 'R485 catégorie 1' : 'R485 category 1') : (fr(l) ? 'R485 catégorie 2' : 'R485 category 2');
      return fr(l)
        ? { head: ['Certificat', res], rows: [['Seuils de levée', '1,20 m et 2,50 m'], ['La catégorie 2 couvre', 'aussi la catégorie 1']] }
        : { head: ['Certificate', res], rows: [['Lift thresholds', '1.20 m and 2.50 m'], ['Category 2 covers', 'category 1 too']] };
    },
  }),
  /** Catégorie R486 selon groupe et type. */
  pemp: (l) => ({
    title: fr(l) ? 'Quelle catégorie de CACES nacelle ?' : 'Which aerial lift CACES category?', cta: fr(l) ? 'Test R486 blanc' : 'R486 mock test', ctaPage: 'caces-r486',
    inputs: [
      { id: 'g', label: fr(l) ? 'Mouvement de la plate-forme' : 'Platform movement', def: 1, options: fr(l) ? [{ value: '0', label: 'Vertical seulement (ciseaux, mât) : groupe A' }, { value: '1', label: 'Multidirectionnel (bras, flèche) : groupe B' }] : [{ value: '0', label: 'Vertical only (scissor, mast): group A' }, { value: '1', label: 'Multi-directional (boom): group B' }] },
      { id: 't', label: fr(l) ? 'Translation' : 'Travel', def: 2, options: fr(l) ? [{ value: '0', label: 'Seulement en position basse : type 1' }, { value: '1', label: 'Plate-forme levée, commande au châssis : type 2' }, { value: '2', label: 'Plate-forme levée, commande dans la nacelle : type 3' }] : [{ value: '0', label: 'Only when stowed: type 1' }, { value: '1', label: 'Raised, driven from the chassis: type 2' }, { value: '2', label: 'Raised, driven from the platform: type 3' }] },
    ],
    run: (v) => {
      const g = Math.round(v.g ?? 0), t = Math.round(v.t ?? 0);
      const c = t === 1 ? null : g === 0 ? 'A' : 'B';
      return fr(l)
        ? { head: ['CACES R486', c ? `Catégorie ${c}` : 'Hors CACES'], rows: [['Validité', yrs(P.recos.r486.validityYears, l)], ['Hors production (déplacement, porte-engins)', 'catégorie C']], note: c ? undefined : 'Le type 2 est exclu : formation propre à la nacelle.' }
        : { head: ['R486 CACES', c ? `Category ${c}` : 'No CACES'], rows: [['Valid for', yrs(P.recos.r486.validityYears, l)], ['Non-production (moving, transporter)', 'category C']], note: c ? undefined : 'Type 2 is excluded: machine-specific training.' };
    },
  }),
  /** Catégorie R482 selon l'engin et la masse. */
  r482cat: (l) => ({
    title: fr(l) ? 'Quelle catégorie de CACES engins de chantier ?' : 'Which construction machinery CACES category?', cta: fr(l) ? 'Test R482 blanc' : 'R482 mock test', ctaPage: 'caces-r482',
    inputs: [
      { id: 'e', label: fr(l) ? 'Engin' : 'Machine', def: 0, options: (fr(l) ? ['Pelle hydraulique', 'Chargeuse sur pneus', 'Chargeuse-pelleteuse', 'Compacteur', 'Moto-basculeur (dumper)', 'Bouteur', 'Niveleuse', 'Tombereau', 'Chariot télescopique ou à mât tout-terrain'] : ['Hydraulic excavator', 'Wheel loader', 'Backhoe loader', 'Compactor', 'Site dumper', 'Bulldozer', 'Motor grader', 'Dump truck', 'Telehandler or rough-terrain forklift']).map((x, i) => ({ value: String(i), label: x })) },
      { id: 'm', label: fr(l) ? 'Masse en service (ou charge utile du dumper)' : 'Operating mass (or dumper payload)', def: 8, unit: 't', max: 200, decimals: 1 },
    ],
    run: (v) => {
      const e = Math.round(v.e ?? 0), m = v.m ?? 0, small = m <= 6;
      const c = [small ? 'A' : 'B1', small ? 'A' : 'C1', small ? 'A' : 'C1', small ? 'A' : 'D', small ? 'A' : 'E', 'C2', 'C3', 'E', 'F'][e] ?? 'A';
      return fr(l)
        ? { head: ['CACES R482', `Catégorie ${c}`], rows: [['Seuil des engins compacts', '6 t'], ['Validité', yrs(P.recos.r482.validityYears, l)]] }
        : { head: ['R482 CACES', `Category ${c}`], rows: [['Compact machine threshold', '6 t'], ['Valid for', yrs(P.recos.r482.validityYears, l)]] };
    },
  }),
  /** Grue de chargement : diagramme de charges fictif G1. */
  grue: (l) => ({
    title: fr(l) ? 'La grue peut-elle lever cette charge à cette portée ?' : 'Can the crane lift this load at this outreach?', cta: fr(l) ? 'Test R490 blanc' : 'R490 mock test', ctaPage: 'caces-r490',
    inputs: [{ id: 'r', label: fr(l) ? 'Portée' : 'Outreach', def: 6, unit: 'm', max: 30, decimals: 1 }, { id: 'kg', label: fr(l) ? 'Masse de la charge et des accessoires' : 'Load plus lifting accessories', def: 1500, unit: 'kg', max: 20000 }],
    run: (v) => {
      const r = readPlate('G1', v.r ?? 0, 0), ok = !!r && (v.kg ?? 0) <= r.kg;
      return fr(l)
        ? { head: ['Levage', !r ? 'Hors diagramme' : ok ? 'Possible' : 'Interdit'], rows: [['Charge maximale lue', r ? `${N(r.kg, l)} kg` : '–'], ['Lecture', 'portée égale ou supérieure']], note: 'Diagramme fictif pour l’exercice ; les accessoires de levage comptent dans la charge.' }
        : { head: ['Lift', !r ? 'Off the chart' : ok ? 'Allowed' : 'Not allowed'], rows: [['Maximum load read', r ? `${N(r.kg, l)} kg` : '–'], ['Reading', 'outreach equal or above']], note: 'Fictitious chart for the exercise; lifting accessories count in the load.' };
    },
  }),
  /** Durée du test (unités de test) et prix médian d'une catégorie. */
  ...Object.fromEntries(RECOS.map((reco) => [`ut-${reco}`, (l: L): MiniSpec => {
    const cats = P.recos[reco].cats;
    return {
      title: fr(l) ? `Combien de temps dure le test ${RNAME[l][reco].split(' ')[0]} ?` : `How long is the ${RNAME[l][reco].split(' ')[0]} test?`, cta: fr(l) ? 'Prix et financement' : 'Price and funding', ctaPage: 'caces-prix',
      inputs: [{ id: 'c', label: fr(l) ? 'Catégorie' : 'Category', def: Math.max(0, cats.indexOf(reco === 'r489' ? '3' : cats[0])), options: cats.map((c, i) => ({ value: String(i), label: catName(c, l) })) }],
      run: (v) => {
        const c = cats[clamp(Math.round(v.c ?? 0), 0, cats.length - 1)];
        const ut = (P.recos[reco].ut as Record<string, number>);
        const total = ut.theory + (ut[c] ?? 0);
        const p = priceOf(reco, c, 'ini');
        return fr(l)
          ? { head: ['Test complet', `${N(total, l, total % 1 ? 2 : 0)} UT`], rows: [['Théorie', `${N(ut.theory, l)} UT (1 h ± 10 min)`], ['Pratique', `${N(ut[c] ?? 0, l, 2)} UT`], ['Formation médiane (CPF)', p?.heures ? `${p.heures.med} h, ${money(p.prix!.med, l)}` : '–']], note: `${P.test.maxUtPerDay} UT au plus par candidat et par jour.` }
          : { head: ['Full test', `${N(total, l, total % 1 ? 2 : 0)} TU`], rows: [['Theory', `${N(ut.theory, l)} TU (1 h ± 10 min)`], ['Practical', `${N(ut[c] ?? 0, l, 2)} TU`], ['Median course (CPF)', p?.heures ? `${p.heures.med} h, ${money(p.prix!.med, l)}` : '–']], note: `At most ${P.test.maxUtPerDay} test units per candidate per day.` };
      },
    };
  }])),
  /** Poids des thèmes d'une recommandation. */
  ...Object.fromEntries(RECOS.map((reco) => [`quota-${reco}`, (l: L): MiniSpec => {
    const ts = GRIDS[reco].themes;
    return {
      title: fr(l) ? `Combien de points par thème au test ${RNAME[l][reco].split(' ')[0]} ?` : `How many points per theme in the ${RNAME[l][reco].split(' ')[0]} test?`, cta: fr(l) ? 'S’entraîner sur ce thème' : 'Practise this theme', ctaPage: 'questions-reponses',
      inputs: [{ id: 't', label: fr(l) ? 'Thème' : 'Theme', def: ts.length - 1 > 0 ? ts.findIndex((t) => t.key === 'expl') >= 0 ? ts.findIndex((t) => t.key === 'expl') : 0 : 0, options: ts.map((t, i) => ({ value: String(i), label: t[l] })) }],
      run: (v) => {
        const t = ts[clamp(Math.round(v.t ?? 0), 0, ts.length - 1)];
        const big = [...t.items].sort((a, b) => b.n - a.n)[0];
        return fr(l)
          ? { head: ['Points au test', `${t.points} / 100`], rows: [['Minimum à obtenir', `${themeMin(t.points)} points`], ['Points du référentiel', `${t.items.length}`], ['Le plus lourd', `${big.fr} (${big.n})`]] }
          : { head: ['Points in the test', `${t.points} / 100`], rows: [['Minimum to score', `${themeMin(t.points)} points`], ['Syllabus points', `${t.items.length}`], ['Heaviest', `${big.en} (${big.n})`]] };
      },
    };
  }])),
};

export function getSpec(kind: string, lang: L): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`mini-spec inconnu : ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
export { pct, CERTS };
