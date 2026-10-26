import { definePage } from '../../lib/guide-types';
import { GRIDS, RECOS, type Reco } from '../../lib/engine/exam';

const n = (r: Reco, key: string) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === key)?.n ?? 0;
/** Points consacrés à l'entretien : thème « maint » s'il existe, sinon les points de vérification et d'incident du thème exploitation. */
const maintPts = (r: Reco) => GRIDS[r].themes.find((t) => t.key === 'maint')?.points ?? n(r, 'expl-verif') + n(r, 'expl-incident');
const maintWhere = (r: Reco, l: 'fr' | 'en') => (GRIDS[r].themes.some((t) => t.key === 'maint')
  ? (l === 'fr' ? 'Thème à part' : 'Separate theme')
  : (l === 'fr' ? 'Dans l’exploitation' : 'Within operation'));

export default definePage({
  id: 'fin-de-poste',
  group: 'themes',
  order: 80,
  tool: { kind: 'quiz', props: { reco: 'r486', mode: 'practice', theme: 'maint', size: 15 } },
  mini: { kind: 'mini:quota-r482' },
  related: ['securite-risques', 'elingage', 'caces-r486', 'caces-r490', 'caces-r482', 'stabilite-chariot'],
  sources: ['r486', 'r490', 'r482', 'r489'],
  fr: {
    slug: 'fin-de-poste',
    nav: 'Vérifications et fin de poste',
    card: 'Contrôles de prise de poste, anomalies à repérer, entretien journalier et mise à l’arrêt : le thème maintenance des différents CACES.',
    title: 'Fin de poste CACES : vérifications, entretien, anomalies',
    description: 'Fin de poste au CACES : vérifications de prise de poste, anomalies hydrauliques et de structure, entretien journalier, stationnement. R486, R490, R482, quiz.',
    h1: 'Prise et fin de poste : vérifier, entretenir, signaler',
    intro: 'Les questions viennent du thème entretien de la R486 (nacelles). Elles portent sur les anomalies à repérer avant et après l’utilisation de l’engin.',
    resume: (h) => `Un engin contrôlé au départ et rangé correctement à l’arrivée limite les pannes et les incidents en cours de poste. Toutes les recommandations CACES demandent au conducteur de faire des vérifications d’usage à la prise de poste, l’entretien quotidien de premier niveau et un compte rendu des anomalies. Le poids de ce sujet au test théorique varie fortement : ${h.pts('r490', 'maint')} points sur 100 en R490, où il forme un thème entier, ${h.pts('r486', 'maint')} en R486, ${h.pts('r482', 'maint')} en R482, et ${maintPts('r489')} en R489, répartis dans l’exploitation. Comme il s’agit de thèmes courts, la règle de la moitié est sévère : en R486, il faut ${h.min('r486', 'maint')} bonnes réponses sur ${h.pts('r486', 'maint')}, soit ${h.pts('r486', 'maint') - h.min('r486', 'maint') + 1} erreurs sur ${h.pts('r486', 'maint')} pour échouer, même avec une très bonne note globale. Les questions décrivent un défaut, une fuite, une fissure, un flexible gonflé, et demandent la bonne réaction : utiliser quand même, réparer soi-même, ou arrêter et prévenir.`,
    faqs: (h) => [
      { q: 'Le conducteur peut-il réparer lui-même une fuite hydraulique ?', a: 'Non. Le conducteur fait l’entretien de premier niveau prévu par la notice : niveaux, appoints, nettoyage, graissage pour certains engins. Une fuite, un flexible abîmé ou un raccord qui suinte relèvent de la maintenance. Il arrête l’engin, le met en sécurité, signale l’anomalie à son responsable et ne le réutilise qu’après réparation.' },
      { q: 'Qu’est-ce que le rapport de vérification périodique ?', a: 'C’est le compte rendu du contrôle réglementaire de l’engin de levage, réalisé à intervalles fixés par la réglementation par une personne compétente. À la prise de poste, le conducteur s’assure qu’il est à jour et lit ses observations : une restriction d’usage ou une réserve non levée peut interdire certaines opérations. Il se trouve souvent dans le registre de sécurité.' },
      { q: 'Où garer l’engin à la fin de la journée ?', a: 'À l’emplacement prévu, hors des voies de circulation, des issues de secours et de l’accès aux extincteurs, sur un sol plat. Fourches ou équipement posés au sol, plate-forme ou flèche repliée, frein de parc serré, moteur arrêté, clé retirée. Un engin électrique est mis en charge dans la zone dédiée, ventilée, en respectant les consignes du constructeur.' },
      { q: 'Que vérifier sur une nacelle avant de monter ?', a: `L’état de la structure et des suspentes, l’absence de fuite, les pneus ou bandages, les stabilisateurs, le fonctionnement des commandes de secours et de dépannage au sol, des limiteurs et de l’avertisseur, la charge de la batterie ou le carburant, et la météo. La page ${h.a('caces-nacelle', 'CACES nacelle')} détaille les catégories concernées.` },
    ],
    body: (h) => `
<h2>Prise de poste : les contrôles avant de démarrer</h2>
${h.table(['Contrôle', 'Ce que l’on cherche', 'Si ce n’est pas bon'], [['Documents', 'Notice, rapport de vérification à jour, sans réserve bloquante', 'Ne pas utiliser, prévenir'], ['Tour de l’engin', 'Fuite, choc, fissure, pneu ou bandage abîmé', 'Signaler, attendre l’avis du responsable'], ['Organes de levage', 'Chaînes, flexibles, vérins, crochet et linguet', 'Engin arrêté jusqu’à réparation'], ['Sécurités', 'Freins, direction, avertisseur, éclairage, ceinture, limiteurs', 'Aucune utilisation si une sécurité manque'], ['Énergie', 'Carburant, charge de la batterie', 'Faire le plein ou recharger dans la zone prévue'], ['Adéquation', 'Engin adapté à la charge, à la hauteur, à la portée', 'Demander un autre engin']], 'Synthèse des savoir-faire de prise de poste communs aux référentiels R482, R486, R489 et R490.', ['l', 'l', 'l'])}
<p>Le tour de l’engin se fait moteur arrêté, avant de monter. Il ne remplace pas la vérification réglementaire, qui reste à la charge de l’employeur, mais il détecte ce qui a changé depuis la veille : un choc dans un rack, une fuite sous le châssis, un pneu entaillé sur un chantier.</p>
<h2>Le poids de l’entretien au test, recommandation par recommandation</h2>
${h.table(['Recommandation', 'Où se trouve le sujet', 'Points', 'Minimum'], RECOS.map((r) => [r.toUpperCase(), maintWhere(r, 'fr'), maintPts(r), GRIDS[r].themes.some((t) => t.key === 'maint') ? h.min(r, 'maint') : '–']), 'Grilles des fiches d’évaluation théorique (annexe 3). En R489 et R485, le sujet est compté dans le thème exploitation, sans minimum propre.', ['l', 'l', 'r', 'r'])}
<p>Le thème le plus détaillé est celui de la R490, consacré aux défauts des flexibles hydrauliques, du châssis et des stabilisateurs, et de la structure de la grue. La R486 suit le même découpage pour la nacelle :</p>
${h.items('r486', 'maint')}
<!--tool:mini:quota-r490-->
<h2>Fin de poste : la mise à l’arrêt</h2>
<ol>
<li>Stationner sur un sol plat, à l’emplacement prévu, sans gêner la circulation ni les issues.</li>
<li>Poser au sol fourches, godet ou lame ; replier la plate-forme d’une nacelle ou ranger la grue en position de transport.</li>
<li>Serrer le frein de parc, mettre les commandes au neutre, couper le moteur, retirer la clé.</li>
<li>Faire l’entretien journalier : niveaux, appoints, nettoyage des vitres, des rétroviseurs et du poste, graissage si la notice le prévoit.</li>
<li>Mettre en charge la batterie dans la zone dédiée ou faire le plein selon les consignes.</li>
<li>Noter et transmettre toute anomalie, même mineure, sur le support prévu par l’entreprise.</li>
</ol>
<p>Le dernier point est celui que le test interroge le plus : une anomalie signalée peut être réparée avant le poste suivant, une anomalie tue ne l’est jamais. Les recommandations ${h.src('r486', 'R486')}, ${h.src('r490', 'R490')}, ${h.src('r482', 'R482')} et ${h.src('r489', 'R489')} décrivent ces opérations dans leur référentiel, et le test pratique les note. Pour le lien entre une anomalie et le droit de retrait, voir la page ${h.a('securite-risques', 'sécurité et prévention')} ; pour les accessoires de levage, la page ${h.a('elingage', 'élingage')}.</p>`,
  },
  en: {
    slug: 'pre-use-checks-end-of-shift',
    nav: 'Checks and end of shift',
    card: 'Pre-use checks, defects to spot, daily maintenance and shutting down: the maintenance theme of the various CACES.',
    title: 'CACES pre-use checks and end of shift: daily maintenance',
    description: 'CACES pre-use checks and end of shift: documents, hydraulic and structural defects, daily maintenance and safe parking. R486, R490 and R482 rules, with a quiz.',
    h1: 'Start and end of shift: check, maintain, report',
    intro: 'The questions come from the R486 (aerial lifts) maintenance theme. They deal with defects to spot before and after using the machine.',
    resume: (h) => `A machine checked at the start and properly put away at the end limits breakdowns and incidents during the shift. Every CACES recommendation asks the operator to carry out pre-use checks, daily first-level maintenance and to report defects. The weight of the topic in the theory test varies widely: ${h.pts('r490', 'maint')} points out of 100 in R490, where it is a full theme, ${h.pts('r486', 'maint')} in R486, ${h.pts('r482', 'maint')} in R482, and ${maintPts('r489')} in R489, spread within the operation theme. Because these themes are short, the half-marks rule is harsh: in R486 you need ${h.min('r486', 'maint')} correct answers out of ${h.pts('r486', 'maint')}, so ${h.pts('r486', 'maint') - h.min('r486', 'maint') + 1} mistakes out of ${h.pts('r486', 'maint')} fail the test, even with an excellent overall score. Questions describe a defect, a leak, a crack, a bulging hose, and ask for the right reaction: carry on regardless, repair it yourself, or stop and report. In the French test, fin de poste means end of shift and anomalie means defect.`,
    faqs: (h) => [
      { q: 'May the operator repair a hydraulic leak?', a: 'No. The operator carries out the first-level maintenance set by the instructions: fluid levels, top-ups, cleaning, greasing on some machines. A leak, a damaged hose or a weeping fitting is a job for maintenance staff. Stop the machine, make it safe, report the defect to your manager and only use it again once repaired.' },
      { q: 'What is the periodic inspection report?', a: 'It is the record of the statutory examination of the lifting machine, carried out at intervals set by the regulations by a competent person. At the start of a shift, the operator checks that it is up to date and reads its remarks: a usage restriction or an outstanding reservation may rule out some operations. It is often kept in the safety register.' },
      { q: 'Where should the machine be parked at the end of the day?', a: 'In its designated place, clear of traffic routes, emergency exits and access to extinguishers, on level ground. Forks or attachment on the ground, platform or boom stowed, parking brake on, engine off, key removed. An electric machine is put on charge in the dedicated, ventilated area, following the manufacturer’s instructions.' },
      { q: 'What should I check on an aerial lift before going up?', a: `The state of the structure and the chains or cables, no leaks, tyres, outriggers, the ground-level emergency and rescue controls, limiters and horn, battery charge or fuel, and the weather forecast for the whole job. The ${h.a('caces-nacelle', 'aerial lift CACES page')} details the categories concerned.` },
    ],
    body: (h) => `
<h2>Start of shift: checks before moving off</h2>
${h.table(['Check', 'What to look for', 'If it fails'], [['Documents', 'Instructions, inspection report up to date, no blocking reservation', 'Do not use, report'], ['Walk-round', 'Leak, impact, crack, damaged tyre', 'Report, wait for the manager’s decision'], ['Lifting parts', 'Chains, hoses, cylinders, hook and safety catch', 'Machine stopped until repaired'], ['Safety devices', 'Brakes, steering, horn, lights, seat belt, limiters', 'No use if any device is missing'], ['Energy', 'Fuel, battery charge', 'Refuel or recharge in the designated area'], ['Suitability', 'Machine suited to the load, height and outreach', 'Ask for another machine']], 'Summary of the start-of-shift skills shared by the R482, R486, R489 and R490 syllabuses.', ['l', 'l', 'l'])}
<p>The walk-round is done with the engine off, before climbing aboard. It does not replace the statutory inspection, which remains the employer’s responsibility, but it picks up what has changed since the day before: a knock against racking, a leak under the chassis, a tyre cut on site.</p>
<h2>Weight of maintenance in the test, recommendation by recommendation</h2>
${h.table(['Recommendation', 'Where the topic sits', 'Points', 'Minimum'], RECOS.map((r) => [r.toUpperCase(), maintWhere(r, 'en'), maintPts(r), GRIDS[r].themes.some((t) => t.key === 'maint') ? h.min(r, 'maint') : '–']), 'Grids of the theory assessment sheets (annex 3). In R489 and R485, the topic counts within the operation theme, with no minimum of its own.', ['l', 'l', 'r', 'r'])}
<p>The most detailed theme is R490’s, covering defects in hydraulic hoses, chassis and outriggers, and the crane structure. R486 uses the same split for aerial lifts:</p>
${h.items('r486', 'maint')}
<!--tool:mini:quota-r490-->
<h2>End of shift: shutting down</h2>
<ol>
<li>Park on level ground in the designated place, without blocking traffic or exits.</li>
<li>Lower forks, bucket or blade to the ground; stow an aerial lift’s platform or fold the crane into its travel position.</li>
<li>Apply the parking brake, set controls to neutral, stop the engine, remove the key.</li>
<li>Do the daily maintenance: levels, top-ups, cleaning windows, mirrors and cab, greasing if the instructions require it.</li>
<li>Put the battery on charge in the dedicated area or refuel as instructed.</li>
<li>Record and pass on any defect, however minor, using the company’s reporting method.</li>
</ol>
<p>The last step is the one the test asks about most: a reported defect can be fixed before the next shift, a hidden one never is. The ${h.src('r486', 'R486')}, ${h.src('r490', 'R490')}, ${h.src('r482', 'R482')} and ${h.src('r489', 'R489')} recommendations describe these tasks in their syllabus, and the practical test marks them. For the link between a defect and the right to withdraw, see the ${h.a('securite-risques', 'safety and prevention page')}; for lifting accessories, the ${h.a('elingage', 'slinging page')}.</p>`,
  },
});
