import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'test-theorique',
  group: 'tests',
  order: 20,
  tool: { kind: 'score', props: { reco: 'r489' } },
  mini: { kind: 'mini:quota-r489' },
  related: ['examen-blanc', 'echec-caces', 'questions-reponses', 'formation-caces', 'caces-r489', 'abaque-de-charge'],
  sources: ['r489', 'r482', 'r486', 'r490', 'r485'],
  fr: {
    slug: 'test-theorique',
    nav: 'Test théorique : règles et note',
    card: 'Points par thème, seuil de 70, minimum dans chaque thème : le simulateur dit si la note réussit le test.',
    title: 'Test théorique CACES : seuil de 70 et minimum par thème',
    description: 'Test théorique CACES : 100 questions en une heure, réussi à 70 sur 100 avec la moitié de chaque thème. Simulez votre note par thème pour chaque recommandation.',
    h1: 'Test théorique du CACES : comment il est noté',
    intro: 'Entrez vos points dans chaque thème : le simulateur applique les deux règles des recommandations et dit si le test est réussi, et sinon ce qui manque.',
    resume: (h) => `Le test théorique du CACES est noté sur 100 points, une question valant un point. Les recommandations de l’Assurance Maladie posent deux conditions cumulées pour le réussir : obtenir au moins ${h.P.test.passScore} points au total, et obtenir dans chaque thème de la fiche d’évaluation une note au moins égale à la moyenne, c’est-à-dire la moitié des points du thème. En R489, cela veut dire au moins ${h.num(Math.ceil(h.pts('r489', 'cg') / 2))} points sur ${h.pts('r489', 'cg')} en connaissances générales, ${Math.ceil(h.pts('r489', 'tech') / 2)} sur ${h.pts('r489', 'tech')} en technologie et stabilité, ${Math.ceil(h.pts('r489', 'abaque') / 2)} sur ${h.pts('r489', 'abaque')} en abaque de charges et ${Math.ceil(h.pts('r489', 'expl') / 2)} sur ${h.pts('r489', 'expl')} en exploitation. Un candidat peut donc obtenir 85 sur 100 et échouer, s’il perd six points sur dix à l’abaque. Le test dure une unité de test, soit une heure à dix minutes près, et se passe en français dans un organisme testeur certifié, avec ${h.P.test.maxCandidatesPerTester} candidats au plus par testeur. Le simulateur ci-dessus applique ces règles à chacune des cinq recommandations.`,
    faqs: (h) => [
      { q: 'Peut-on réussir le CACES avec 70 pile ?', a: `Oui, si aucun thème n’est sous la moyenne : ${h.P.test.passScore} points sur 100 est le seuil, pas un plancher strict au-dessus. Avec exactement 70, il faut toutefois que les 30 erreurs soient réparties : si elles se concentrent dans un thème court, la règle de la moitié fait échouer. Le simulateur montre ce cas en rouge.` },
      { q: 'Que veut dire « note supérieure ou égale à la moyenne » par thème ?', a: 'Pour chaque thème de la fiche d’évaluation, il faut au moins la moitié des points de ce thème. Sur un thème de 15 points, 7,5 n’existant pas, il faut 8 bonnes réponses ; sur un thème de 10 points, il en faut 5. Une seule exigence non tenue suffit pour échouer, quelle que soit la note globale.' },
      { q: 'Le test théorique peut-il se passer à l’oral ?', a: 'Le test est rédigé en français et passé par écrit. Pour un candidat qui a des difficultés de compréhension du français écrit, les recommandations permettent que les questions soient énoncées à voix haute, dans la même langue. Il n’existe pas de version traduite du test.' },
      { q: 'Combien de questions compte chaque thème ?', a: 'Autant que de points, puisqu’une question vaut un point. En R489 : 15 en connaissances générales, 25 en technologie et stabilité, 10 sur l’abaque de charges, 50 en exploitation. Le mini-outil de cette page donne le détail de chaque thème et le point du référentiel le plus lourd.' },
    ],
    body: (h) => `
<h2>Les deux règles en pratique</h2>
<p>La règle des ${h.P.test.passScore} points vise le niveau général ; la règle de la moitié par thème empêche de compenser une lacune grave par des points faciles ailleurs. Un cariste qui ne sait pas lire une plaque de charge n’est pas en sécurité, même s’il connaît tous les panneaux. Les trois cas suivants le montrent, en R489.</p>
${h.table(['Cas', 'Total', 'Thème le plus faible', 'Résultat'], [['Bonne note, thèmes équilibrés', '78', 'Abaque 6 / 10', 'Réussi'], ['Bonne note, un thème faible', '86', 'Abaque 4 / 10', 'Échoué'], ['Note juste, thèmes équilibrés', '70', 'Connaissances générales 8 / 15', 'Réussi'], ['Note insuffisante', '68', 'Exploitation 33 / 50', 'Échoué']], 'Application des règles de réussite de la recommandation R.489A, annexe 3.', ['l', 'r', 'l', 'l'])}
<h2>Les barèmes, recommandation par recommandation</h2>
${h.grid('r489')}
${h.grid('r482')}
${h.grid('r486')}
${h.grid('r490')}
${h.grid('r485')}
<p>Le minimum indiqué est la moitié du thème, arrondie au point supérieur. Les thèmes les plus courts sont les plus piégeux : 4 points de fin de poste en R482, 6 points d’entretien en R486. Deux erreurs sur les 4 points de fin de poste suffisent encore, une troisième fait échouer.</p>
<!--tool:mini:errors-->
<h2>Le déroulement en salle</h2>
<p>Le test se passe dans un organisme testeur certifié, devant un testeur qui ne peut pas avoir été votre formateur, avec ${h.P.test.maxCandidatesPerTester} candidats au plus. Il dure une unité de test, et un candidat ne peut pas passer plus de ${h.P.test.maxUtPerDay} unités de test dans la même journée, épreuves pratiques comprises. L’ordre des épreuves, théorique ou pratique d’abord, est choisi par l’organisme. Une attestation de formation, interne ou externe, est demandée avant le test : les recommandations précisent qu’une simple formation au passage du test ne suffit pas.</p>
<p>Pour vous entraîner à ces deux règles en conditions réelles, faites un ${h.a('examen-blanc', 'examen blanc complet')} : il affiche la note de chaque thème avec son minimum. En cas d’échec réel, la page ${h.a('echec-caces', 'échec au CACES')} explique ce qui reste acquis.</p>`,
  },
  en: {
    slug: 'theory-test',
    nav: 'Theory test: rules and score',
    card: 'Points per theme, pass mark of 70, minimum in every theme: the simulator says whether your score passes.',
    title: 'CACES theory test: pass mark of 70 and minimum per theme',
    description: 'CACES theory test: 100 questions in one hour, passed with 70 out of 100 and half of every theme. Simulate your score theme by theme for each recommendation.',
    h1: 'The CACES theory test: how it is marked',
    intro: 'Enter your points in each theme: the simulator applies both rules of the recommendations and tells you whether the test is passed, and if not what is missing.',
    resume: (h) => `The CACES theory test is marked out of 100 points, one point per question. The French Health Insurance recommendations set two conditions that must both be met: at least ${h.P.test.passScore} points overall, and in every theme of the assessment sheet a score at least equal to the average, meaning half the points of the theme. In R489 that means at least ${Math.ceil(h.pts('r489', 'cg') / 2)} points out of ${h.pts('r489', 'cg')} in general knowledge, ${Math.ceil(h.pts('r489', 'tech') / 2)} out of ${h.pts('r489', 'tech')} in technology and stability, ${Math.ceil(h.pts('r489', 'abaque') / 2)} out of ${h.pts('r489', 'abaque')} on the load chart and ${Math.ceil(h.pts('r489', 'expl') / 2)} out of ${h.pts('r489', 'expl')} in operation. A candidate can therefore score 85 out of 100 and still fail, by losing six points out of ten on the load chart. The test lasts one test unit, one hour give or take ten minutes, and is sat in French at a certified testing body, with at most ${h.P.test.maxCandidatesPerTester} candidates per tester. The simulator above applies these rules to each of the five recommendations.`,
    faqs: (h) => [
      { q: 'Can I pass the CACES with exactly 70?', a: `Yes, as long as no theme is below half: ${h.P.test.passScore} out of 100 is the threshold itself. With exactly 70, however, the 30 mistakes must be spread out: if they cluster in a short theme, the half-marks rule fails you. The simulator shows that case in red.` },
      { q: 'What does “at least the average in each theme” mean?', a: 'For each theme of the assessment sheet you need at least half its points. On a 15-point theme, since 7.5 does not exist, you need 8 correct answers; on a 10-point theme, 5. Missing a single theme minimum is enough to fail, whatever the overall score.' },
      { q: 'Can the theory test be taken in English?', a: 'No. The test is written in French and sat in writing. For a candidate who has trouble understanding written French, the recommendations allow the questions to be read aloud, in French. There is no translated version, so it pays to learn the French terms used on this site’s French pages.' },
      { q: 'How many questions are in each theme?', a: 'As many as points, since each question is worth one point. In R489: 15 in general knowledge, 25 in technology and stability, 10 on the load chart and 50 in operation. The small tool on this page details each theme and its heaviest syllabus point.' },
    ],
    body: (h) => `
<h2>The two rules in practice</h2>
<p>The ${h.P.test.passScore}-point rule checks the overall level; the half-per-theme rule stops you making up for a serious gap with easy points elsewhere. A forklift driver who cannot read a capacity plate is not safe, even if they know every sign. The three cases below show it, in R489.</p>
${h.table(['Case', 'Total', 'Weakest theme', 'Result'], [['Good score, balanced themes', '78', 'Load chart 6 / 10', 'Pass'], ['Good score, one weak theme', '86', 'Load chart 4 / 10', 'Fail'], ['Borderline score, balanced themes', '70', 'General knowledge 8 / 15', 'Pass'], ['Score too low', '68', 'Operation 33 / 50', 'Fail']], 'Pass rules of recommendation R.489A, annex 3, applied.', ['l', 'r', 'l', 'l'])}
<h2>The marking schemes, recommendation by recommendation</h2>
${h.grid('r489')}
${h.grid('r482')}
${h.grid('r486')}
${h.grid('r490')}
${h.grid('r485')}
<p>The minimum shown is half the theme, rounded up to the next point. The shortest themes are the trickiest: 4 end-of-shift points in R482, 6 maintenance points in R486. Two mistakes on the 4 end-of-shift points are still fine; a third one fails you.</p>
<!--tool:mini:errors-->
<h2>How the session runs</h2>
<p>You sit the test at a certified testing body, in front of a tester who cannot have been your trainer, with at most ${h.P.test.maxCandidatesPerTester} candidates. It lasts one test unit, and a candidate cannot sit more than ${h.P.test.maxUtPerDay} test units in a single day, practical tests included. The body decides whether theory or practical comes first. A training certificate, in-house or external, is required before the test: the recommendations specify that a course limited to passing the test is not enough.</p>
<p>To practise both rules in real conditions, take a ${h.a('examen-blanc', 'full mock exam')}: it shows the score of every theme with its minimum. If you fail the real test, the ${h.a('echec-caces', 'failed CACES page')} explains what you keep.</p>`,
  },
});
